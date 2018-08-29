import React, { Component } from 'react';

export default class PostCard extends Component {
    render() {
        return (
            <div key={this.props.post.id} id={this.props.post.id}>
                <p>{this.props.post.message}</p>

            </div>
        )
    }
}
