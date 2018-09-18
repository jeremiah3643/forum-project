import React, { Component } from 'react';

export default class PostCard extends Component {







    ownerPost = () => {
        return <div key={this.props.post.id} id={this.props.post.id}>
            <p id="post--${this.props.post.id}">{this.props.post.message}</p>
            <footer>{this.props.post.postAuthorName}</footer>
            <button onClick={this.props.editPost}>Edit</button>
        </div>
    }
    regularPost = () => {

        return <div key={this.props.post.id} id={this.props.post.id}>
            <p>{this.props.post.message}</p>
            <footer>{this.props.post.postAuthorName}</footer>
        </div>
    }
    postDecider = () => {

        if (this.props.activeUser === this.props.post.postAuthorId) {
            return this.ownerPost()
        }
        else {
            return this.regularPost()
        }
    }



    render() {
        return (
            this.postDecider()
        )
    }
}
