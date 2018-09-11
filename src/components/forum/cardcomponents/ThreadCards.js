import React, { Component } from 'react';

export default class ThreadCard extends Component {
    render() {
        return (
            <div key={this.props.thread.id} id={this.props.thread.id}>
                <a href="#" onClick={this.props.enterThread}>{this.props.thread.title}</a>
                <p>{this.props.thread.message}</p>
                <footer>Author: {this.props.thread.threadAuthorName}</footer>
            </div>
        )
    }
}