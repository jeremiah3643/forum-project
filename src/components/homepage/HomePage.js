import React, { Component } from 'react';
import './homepage.css';
import FollowThreadCard from './FollowThreadCard'
import FollowCard from './FollowThreadCard';
export default class HomePage extends Component {
    state = {
        user: "",
        activeUsername: "",
        threads: [],
        followedThreads: [],
        loaded: false
    }


    followedThreads = () => {

        let followId = JSON.parse(sessionStorage.getItem("userInfo"))
        return fetch(`http://localhost:8088/followThreads/?followId=${followId.userId}`)
            .then(r => r.json())
            .then(result => {
                let followedThreads = result
                return followedThreads
            }).then((followedThreads) => {
                this.followLoader(followedThreads)
            })
    }

    followLoader = (followedThreads) => {

        let threads = []
        if (followedThreads !== "") {
            for (let i = 0; i < followedThreads.length; i++) {
                const thread = followedThreads[i];
                return fetch(`http://localhost:8088/posts?threadId=${thread.threadId}`)
                    .then(r => r.json())
                    .then(result => {
                        threads = result
                        this.setState({
                            threads: threads,
                        })
                    })
            }
        }
    }

    threadCard = () => {
        return <div className="ui cards">


        </div>
    }


    followingThreads = () => {
        if (this.props.followedThreads !== []) {

        }
    }
    componentDidMount() {
        this.followedThreads()
    }


    loaded = function () {
        if (this.state.user === "") {
            let info = JSON.parse(sessionStorage.getItem("userInfo"))

            const lower = info.username;
            const upper = lower.charAt(0).toUpperCase() + lower.substr(1);
            return <div>
                <div>
                    <h2 className="welcomeTag">{`Welcome ${upper}`}</h2>
                </div>
                {/* {this.followLoader()} */}
            </div>
        }
        else if (this.state.user !== null) {

            const lower = this.state.activeUsername;
            const upper = lower.charAt(0).toUpperCase() + lower.substr(1);
            return <div>
                <div>
                    <h2 className="welcomeTag">{`Welcome ${upper}`}</h2>
                </div>
                {/* {this.followLoader()} */}
            </div>
        }
    }.bind(this)

    render() {
        return (
            <div>
                {this.loaded()}
                <div><label className="ui label">Followed Threads:</label>
                    {this.state.threads.map(thread =>
                        <FollowCard key={thread.id} thread={thread} />)}
                </div>
            </div >
        )
    }
}
