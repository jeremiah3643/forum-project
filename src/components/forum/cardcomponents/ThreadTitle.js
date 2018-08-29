import React, { Component } from 'react';

export default class ThreadTitle extends Component {
    loadTitle = () => {
        let threadId = this.props.page
       return fetch(`http://localhost:8088/threads/${threadId}`)
            .then(r => r.json())
    }
    showTitle = () => {
        this.loadTitle().then(
            thread => {
                return <div>
                    <h3>${thread.title}</h3>
                    <p>${thread.message}</p>
                    <footer>Author: ${thread.threadAuthorName}</footer>
                </div>
            }
        )
    }
    render() {

        return (
            <div>{this.showTitle()}</div>

        )
    }
}