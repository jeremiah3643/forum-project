import React, { Component } from 'react';

export default class ThreadTitle extends Component {

    render() {
        
        return (
            <div key={this.props.thread.id}>
                <h2>{this.props.thread.title}</h2>
                <h3>{this.props.thread.message}</h3>
                <footer>Author: {this.props.thread.threadAuthorName}</footer>
            </div>

        )
    }
}