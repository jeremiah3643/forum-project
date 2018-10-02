import React, { Component } from 'react';
import PostCard from './cardcomponents/PostCard';
import ThreadTitle from './cardcomponents/ThreadTitle';


export default class InsideThread extends Component {
    state = {
        posts: [],
        info: [],
        postMessage: "",
        newPost: false,
        date: new Date(),
        edit: false,
        editInfo: "",
        editText: "",
        editId: ""
    }
    inputChange = (event) => {
        let values = {}
        values[event.target.id] = event.target.value
        this.setState(values)
    }
    editPost = (e) => {
        let editId = e.target.parentNode.id
        let postText = document.getElementById(`post--${editId}`).textContent
        if (this.state.edit) {
            this.setState({ edit: false })
        }
        else {
            this.setState({
                edit: true,
                editText: postText,
                editId: editId
            })
        }
    }

    patchEdit = () => {
        let editInfo = this.state.editInfo
        let editId = this.state.editId
        let patch = {
            "message": editInfo,
            "oldMessage": this.state.editText
        }
        fetch(`http://localhost:8088/posts/${editId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patch)
        })
            .then(this.setState({
                edit: false,
            }))
    }




    showInsideThread = () => {
        let threadId = this.props.page
        fetch(`http://localhost:8088/posts?threadId=${threadId}`)
            .then(r => r.json())
            .then(results => {
                this.setState({
                    posts: results,
                    // info:results.threadId
                })
            })
            .then(
                fetch(`http://localhost:8088/threads?id=${this.props.page}`)
                    .then(j => j.json())
                    .then(response => {
                        this.setState({
                            info: response
                        })
                    })
            )
    }
    postDecider = () => {
        if (this.state.newPost) {
            return <button onClick={this.createPost} className="ui button">Back</button>
        }
        else {
            return <button onClick={this.createPost} className="ui button">Post</button>
        }
    }
    postForm = () => {
        if (this.state.newPost) {
            return <section className="ui form">
                <textarea  className="field" onChange={this.postChange} id="postMessage" placeholder="Message"></textarea>
                <button className="ui button" onClick={this.postUpload}>Submit</button>
            </section>
        }
    }
    postUpload = (e) => {
        let user = this.props.userId
        fetch(`http://localhost:8088/users?id=${user}`)
            .then(result => result.json())
            .then(response => {
                fetch(`http://localhost:8088/posts`, {
                    method: 'POST',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: this.state.postMessage,
                        postAuthorName: response[0].username,
                        postAuthorId: this.props.userId,
                        threadId: this.props.page,
                        timeStamp: Date.now(),
                        oldMessage: "",
                        threadAuthorName:this.state.info[0].threadAuthorName,
                        threadTitle:this.state.info[0].title,
                        threadMessage:this.state.info[0].message

                    })
                })
            }
            ).then(
                alert("Successful Post!"),
                this.setState({
                    newPost: false
                })
            ).then(this.showInsideThread())
    }
    postChange = (event) => {
        let stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }
    createPost = (e) => {
        if (this.state.newPost) {
            this.setState({ newPost: false })
        }
        else { this.setState({ newPost: true }) }
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            5000
        );
        this.showInsideThread()
    }
    tick() {
        this.setState({
            date: new Date()
        })
        this.showInsideThread()
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    render() {
        const postList = this.state.posts
        const titleThread = this.state.info
        return <section>
            <button className="ui button" onClick={this.props.backButton}>Back</button>
            <div>
                <div id="threadBox">
                    {titleThread.map(thread =>
                        <ThreadTitle edit={this.state.edit} key={thread.id} thread={thread} />)}

                </div>

            </div>
            <div>
                {postList.map(post =>
                    <PostCard patchEdit={this.patchEdit} activeUser={this.props.activeUser} editText={this.state.editText} edit={this.state.edit} inputChange={this.inputChange} editId={this.state.editId} editPost={this.editPost} key={post.id} post={post} />)}
            </div>
            {this.postDecider()}
            {this.postForm()}

        </section>
    }
}

