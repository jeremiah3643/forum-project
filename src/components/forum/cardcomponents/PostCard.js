import React, { Component } from 'react';

export default class PostCard extends Component {
    editForm = (postId) => {
        // eslint-disable-next-line
        if (this.props.edit && parseInt(this.props.editId) === postId) {
            return <div>
                <div>
                    <input id="editInfo" onChange={this.props.inputChange} placeholder={this.props.editText}></input>
                    <button onClick={this.props.patchEdit}>Submit</button>
                </div >
            </div>
        }
        else {
            return null
        }
    }
    editorButton = () => {
        if (this.props.edit) {
            return <button className="ui button" onClick={this.props.editPost}>Back</button>
        }
        else {
            return <button className="ui button" onClick={this.props.editPost}>Edit</button>
        }
    }
    previous = () => {
        if (this.props.post.oldMessage === "") {
            return null
        }
        else {
            return <div className="meta">
                <p className="meta">Edited:{this.props.post.oldMessage}</p>
            </div>
        }
    }
    ownerPost = () => {
        return (<div className="ui cards centered blue">
            <div className="card" key={this.props.post.id} id={this.props.post.id}>
                {this.previous()}
                <p className="header" id={"post--" + this.props.post.id}>{this.props.post.message}</p>
                <footer className="meta">Author: {this.props.post.postAuthorName}</footer>
                {this.editorButton()}
                {this.editForm(this.props.post.id)}
            </div>
        </div >)
    }
    regularPost = () => {
        return <div className="ui cards centered red">
            <div className="card" key={this.props.post.id} id={this.props.post.id}>
                {this.previous()}
                <p className="description">{this.props.post.message}</p>
                <footer>Author: {this.props.post.postAuthorName}</footer>
            </div>
        </div >
    }
    postDecider = () => {
        if (this.props.activeUser === this.props.post.postAuthorId) {
            return <div>{this.ownerPost()}</div>
        }
        else {
            return <div>{this.regularPost()}</div>
        }
    }
    render() {
        const decider = this.postDecider()
        return (
            <div>
                {decider}
            </div>
        )
    }
}
