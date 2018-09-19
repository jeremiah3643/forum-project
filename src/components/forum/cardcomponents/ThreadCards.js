import React, { Component } from 'react';

export default class ThreadCard extends Component {





    regularThread = () => {
        return <div key={this.props.thread.id} id={this.props.thread.id}>
            <a href="#" onClick={this.props.enterThread}>{this.props.thread.title}</a>
            <p>{this.props.thread.message}</p>
            <footer>Author: {this.props.thread.threadAuthorName}</footer>
        </div>
    }
    ownerThread = () => {
        return <div key={this.props.thread.id} id={this.props.thread.id}>
            <a href="#" onClick={this.props.enterThread}>{this.props.thread.title}</a>
            <p>{this.props.thread.message}</p>
            <footer>Author: {this.props.thread.threadAuthorName}</footer>
            {/* <button onClick={this.props.editThread}>Edit</button> */}
        </div>

    }

    cardMaker = () => {

        if (this.props.activeUser === this.props.thread.threadAuthorId) {
            return this.ownerThread()
        }
        else {
            return this.regularThread()
        }

    }


    render() {

        return (
            this.cardMaker()
        )
    }
}