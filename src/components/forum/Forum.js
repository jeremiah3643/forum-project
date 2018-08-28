import React, { Component } from 'react';
import ShowThread from './ShowThread';

export default class Forum extends Component {
    state = {
        newThread: false,
        threadTitle: "",
        threadMessage: "",
        userId: ""
    }
    load = function () {
        if (this.props.activeUser === null) {
            this.setState = { currentView: "Login" }
        }
        else {
            let info = JSON.parse(sessionStorage.getItem("userInfo"))
            fetch(`http://localhost:8088/users/${info.userId}`)
                .then(r => r.json()).then(response => {
                    this.setState({
                        userId: response.id
                    })
                }
                )
        }
    }.bind(this)

    componentDidMount() {
        this.load()
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

    createThread = (e) => {
        this.setState({ newThread: true })
    }
    threadChange = (event) => {
        let stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }
    postUpload = (e) => {
        e.preventDefault()
        let user = this.state.userId
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

                    })
                })
            }
            )
            .then(
                alert("Successful Post!"),
                this.setState({ newThread: false }))
    }
    render() {
        return (
            <div>
                <button onClick={this.createThread}>Start A Thread!</button>
                {this.threadForm()}
                <section><ShowThread /></section>

            </div>
        )
    }
}
