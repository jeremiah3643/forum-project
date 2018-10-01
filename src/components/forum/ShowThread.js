import React, { Component } from 'react';
import ThreadCard from './cardcomponents/ThreadCards';
import InsideThread from './InsideThread';
import './threadForm.css'
export default class ShowThread extends Component {
    state = {
        threadPost: false,
        threads: [],
        dataLoaded: false,
        page: "",
        clicked: false,
        threadTitle: "",
        threadMessage: "",
        newThread: false,
        date: new Date(),
        followed: [],
        change: false
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            5000
        );
        this.displayThread()
        this.followLoad()
    }
    loadThreads = () => {
        return fetch(`http://localhost:8088/threads`)
            .then(r => r.json())
            .then(loadedThreads => {
                let thread = loadedThreads.reverse()
                return thread
            }
            )
    }
    enterThread = (e) => {
        let pagination = e.target.parentNode.id
        this.setState({
            page: pagination,
            clicked: true
        })
    }
    displayThread = () => {
        this.loadThreads()
            .then(thread => {
                this.setState({
                    threads: thread,
                    dataLoaded: true,

                })
            })
    }
    followButton = (e) => {
        let following = parseInt(e.target.parentNode.id)
        let userinfo = this.props.activeUser
        return fetch(`http://localhost:8088/followThreads?threadId=${following}`)
            .then(r => r.json())
            .then(result => {
                if (result.length) {
                    alert("Already Following")
                }
                else {
                    let newFollow = {
                        "threadId": following,
                        "followId": userinfo
                    }
                    fetch(`http://localhost:8088/followThreads`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newFollow)
                    })
                        .then(() => {
                            this.handleForce()
                        }
                        )
                }
            }
            )
    }
handleForce(){
    this.forceUpdate()
}

    postUpload = (e) => {
        let user = this.props.userId
        fetch(`http://localhost:8088/users?id=${user}`)
            .then(result => result.json())
            .then(response => {
                fetch(`http://localhost:8088/threads`, {
                    method: 'POST',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: this.state.threadTitle,
                        message: this.state.threadMessage,
                        threadAuthorName: response[0].username,
                        threadAuthorId: user,
                        timeStamp: Date.now(),

                    })
                })
            }
            )
            .then(() => {
                alert("Successful Post!")
                this.setState({
                    newThread: false,
                })
            }
            )
    }
    createThread = (e) => {
        if (this.state.newThread) {
            this.setState({ newThread: false })
        }
        else { this.setState({ newThread: true }) }
    }
    threadForm = () => {
        if (this.state.newThread === true) {
            return <section className="threadForm">
                <div className="ui form">
                    <div className="field">
                        <input onChange={this.threadChange} id="threadTitle" placeholder="Title"></input>
                        <textarea onChange={this.threadChange} id="threadMessage" placeholder="Message"></textarea>
                        <button className="ui button" onClick={this.postUpload}>Submit</button>
                    </div>
                </div>
            </section>
        }
    }
    backButton = () => {
        this.setState({
            clicked: false
        })
    }
    threadChange = (event) => {
        let stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }
    // componentWillUnmount() {
    //     clearInterval(this.timerID);
    // }
    tick() {
        this.setState({
            date: new Date()
        })
        this.displayThread();
    }
    buttonThread = () => {
        if (this.state.newThread) {
            return <button className="ui button" onClick={this.createThread}>Back</button>
        }
        else {
            return <button className="ui button" onClick={this.createThread}>Start A Thread!</button>
        }
    }
    followLoad = () => {
        return fetch(`http://localhost:8088/followThreads`)
            .then(r => r.json())
            .then(result => {
                this.setState({ followed: result })
            })
    }
    unfollowButton = (e) => {
        let deleteId = parseInt(e.target.parentNode.id)
        return fetch(`http://localhost:8088/followThreads?threadId=${deleteId}`)
            .then(r => r.json())
            .then(result => {
                fetch(`http://localhost:8088/followThreads/${result[0].id}`, {
                    method: 'DELETE',
                })
                    .then(() => {
                        this.handleForce()
                    }
                    )
            })
    }
    render() {
        const newThreads = this.state.threads
        // eslint-disable-next-line
        {
            if (this.state.clicked) {
                return <div><InsideThread activeUser={this.props.activeUser} backButton={this.backButton} userId={this.props.userId} page={this.state.page} /></div>
            }
            else if (this.state.dataLoaded) {
                return <div id="threadBox">
                    {this.buttonThread()}
                    {this.threadForm()}
                    {newThreads.map(thread =>
                        <ThreadCard followed={this.state.followed} unfollowButton={this.unfollowButton} followButton={this.followButton} key={thread.id} thread={thread} activeUser={this.props.activeUser} newThread={this.state.newThread} enterThread={this.enterThread} />)}
                </div>
            }
            else {
                return <div>Loading</div>
            }
        }
    }

}