import React, { Component } from 'react';
import ThreadCard from './cardcomponents/ThreadCards';
import InsideThread from './InsideThread';

export default class ShowThread extends Component {
    constructor(props) {
        super(props)

        this.state = {
            threadPost: false,
            threads: [],
            dataLoaded: false,
            page: "",
            clicked: false,
            threadTitle: "",
            threadMessage: "",
            newThread: false,
            date: new Date()
        }
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            5000
        );
        this.displayThread()
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
        console.log(e.target.parentNode.id)
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
                    dataLoaded: true
                })

            })
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
                        threadAuthorId: this.state.userId,
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
        this.setState({ newThread: true })
    }
    threadForm = () => {
        if (this.state.newThread === true) {
            return <section>
                <input onChange={this.threadChange} id="threadTitle" placeholder="Title"></input>
                <textarea onChange={this.threadChange} id="threadMessage" placeholder="Message"></textarea>
                <button onClick={this.postUpload}>Submit</button>
            </section>
        }
    }
    backButton = (e) => {
        
        this.setState({
            clicked: false
        })
    }

    threadChange = (event) => {
        let stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.setState({
            date: new Date()
        })
        this.displayThread();
    }
    render() {

        const newThreads = this.state.threads
        {
            if (this.state.clicked) {
                return <div><InsideThread clicked={this.state.clicked} backbutton={this.backButton} userId={this.props.userId} page={this.state.page} /></div>
            }
            else if (this.state.dataLoaded) {
                return <div id="threadBox">
                    <button onClick={this.createThread}>Start A Thread!</button>
                    {this.threadForm()}
                    {newThreads.map(thread =>
                        <ThreadCard key={thread.id} thread={thread} newThread={this.state.newThread} enterThread={this.enterThread} />)}
                </div>
            }
            else {
                return <div>Loading</div>
            }
        }
    }

}