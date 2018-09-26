import React, { Component } from 'react';
import './cardcomponents.css';
export default class ThreadTitle extends Component {

    render() {
        return (
            <div id="threadTitle" className="ui cards centered black" key={this.props.thread.id}>
                <div className="card">
                    <h2 className="header">Title:  {this.props.thread.title}</h2>
                    <h3 className="description">{this.props.thread.message}</h3>
                    <footer className="meta" >Author: {this.props.thread.threadAuthorName}</footer>
                </div>
            </div>
        )
    }
}