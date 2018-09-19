import React, { Component } from 'react';

export default class PostCard extends Component {

    state = {

    }
    editForm = (postId) => {
        if (this.props.edit && parseInt(this.props.editId) === postId) {
            return <div>
                <input id="editInfo" onChange={this.props.inputChange} placeholder={this.props.editText}></input>
                <button onClick={this.props.patchEdit}>Submit</button>
            </div >
        }
        else {
            return null
        }
    }
    editorButton = () => {
        if (this.props.edit) {
            return <button onClick={this.props.editPost}>Back</button>
        }
        else {
            return <button onClick={this.props.editPost}>Edit</button>
        }
    }


    ownerPost = () => {
        return (<div key={this.props.post.id} id={this.props.post.id}>
            <p id={"post--" + this.props.post.id}>{this.props.post.message}</p>
            <footer>{this.props.post.postAuthorName}</footer>
            {this.editorButton()}
            {this.editForm(this.props.post.id)}
        </div >)
    }
    regularPost = () => {

        return <div key={this.props.post.id} id={this.props.post.id}>
            <p>{this.props.post.message}</p>
            <footer>{this.props.post.postAuthorName}</footer>
        </div>
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
