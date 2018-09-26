import React, { Component } from 'react';
import './cardcomponents.css';

export default class ThreadCard extends Component {





    regularThread = () => {
        return <div className="ui cards centered blue" key={this.props.thread.id} id={this.props.thread.id}>
            <div className="regularThread card" >
                <div key={this.props.thread.id} id={this.props.thread.id} className="content">
                    <h2 className="header" onClick={this.props.enterThread}>{this.props.thread.title}</h2>
                    <p className="description">{this.props.thread.message}</p>
                    <footer className="meta">Author: {this.props.thread.threadAuthorName}</footer>
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
                    {/* <button onClick={this.props.editThread}>Edit</button> */}
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
    render() {
        return (
            this.cardMaker()
        )
    }
}