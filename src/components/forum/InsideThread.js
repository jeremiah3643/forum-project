import React, { Component } from 'react';
import PostCard from './cardcomponents/PostCard';
import ThreadTitle from './cardcomponents/ThreadTitle';


export default class InsideThread extends Component {
    state = {
        posts: [],
        info: [],
        postMessage: "",
        newPost: false,
        date: new Date()

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
    postForm = () => {
        if (this.state.newPost) {
            return <section>
                <textarea onChange={this.postChange} id="postMessage" placeholder="Message"></textarea>
                <button onClick={this.postUpload}>Submit</button>
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
        this.setState({ newPost: true })
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
                <button onClick={this.props.backButton}>Back</button>
            <div>
                <div id="threadBox">
                    {titleThread.map(thread =>
                        <ThreadTitle key={thread.id} thread={thread} />)}
                </div>
            </div>
            <div>
                {postList.map(post =>
                    <PostCard key={post.id} post={post} />)}
            </div>
            <button onClick={this.createPost}>Post</button>
            {this.postForm()}
        </section>
    }
}

