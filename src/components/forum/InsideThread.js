import React, { Component } from 'react';
import PostCard from './cardcomponents/PostCard';
import ThreadTitle from './cardcomponents/ThreadTitle';


export default class InsideThread extends Component {
    state = {
        posts: []
    }
    showInsideThread = () => {
        let threadId = this.props.page
        fetch(`http://localhost:8088/posts?threadId=${threadId}`)
            .then(r => r.json())
            .then(results => {
                this.setState({
                    posts: results
                })
            })
    }
    componentDidMount() {
        this.showInsideThread()
    }
    render() {
        const postList = this.state.posts
        return <section>
            <div>
                <ThreadTitle page={this.props.page} />
            </div>
            <div>
                {postList.map(post =>
                    <PostCard key={post.id} post={post} />)}
            </div>
        </section>
    }

}