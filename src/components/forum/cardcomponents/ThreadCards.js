import React, { Component } from 'react';
import './cardcomponents.css';

export default class ThreadCard extends Component {
    followDecider = () => {

    }
    fetchFollow = () => {
        let button = []
        let follows = this.props.followed
        if (!follows.length) {
            button.push(
                <div key={this.props.thread.Id}>
                    <button className="ui button" onClick={this.props.followButton}>Follow</button>
                </div>)

        }
        else {
            for (let i = 0; i < follows.length; i++) {
                const follow = follows[i];
                if (follow.threadId === this.props.thread.id && this.props.activeUser === this.props.thread.threadAuthorId) {
                    button.push(<div key={this.props.thread.id}> <button key={i} className="ui button" onClick={this.props.unfollowButton} >Unfollow</button>
                    </div>)
                }
                else {
                    button.push(<div key={this.props.thread.id}>
                        <button key={i} className="ui button" onClick={this.props.followButton}>Follow</button>
                    </div>)
                }
            }
        }
        return button


    }

    regularThread = () => {
        return <div className="ui cards centered blue" key={this.props.thread.id} id={this.props.thread.id}>
            <div className="regularThread card" >
                <div key={this.props.thread.id} id={this.props.thread.id} className="content">
                    <h2 className="header" onClick={this.props.enterThread}>{this.props.thread.title}</h2>
                    <p className="description">{this.props.thread.message}</p>
                    <footer className="meta">Author: {this.props.thread.threadAuthorName}</footer>
                    {this.fetchFollow()}
                </div>
            </div>
        </div>
    }
    ownerThread = () => {
        return <div className="ui cards centered red" key={this.props.thread.id} id={this.props.thread.id}>
            <div className="ownerThread card">
                <div key={this.props.thread.id} id={this.props.thread.id} className="content">
                    <h2 className="header" onClick={this.props.enterThread}>{this.props.thread.title}</h2>
                    <p className="description">{this.props.thread.message}</p>
                    <footer className="meta">Author: {this.props.thread.threadAuthorName}</footer>
                    {this.fetchFollow()}
                </div>
            </div>
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
    componentDidMount() {
        this.cardMaker()
    }


    render() {
        return (

            this.cardMaker()

        )
    }
}