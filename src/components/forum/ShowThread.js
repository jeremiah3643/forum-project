import React, { Component } from 'react';
import ThreadCard from './cardcomponents/ThreadCards';
import InsideThread from './InsideThread';

export default class ShowThread extends Component {
    state = {
        threadPost: false,
        threads: [],
        dataLoaded: false,
        page: "",
        clicked:false
    }
    componentDidMount() {
        this.displayThread()
    }



    loadThreads = () => {

        return fetch(`http://localhost:8088/threads`)
            .then(r => r.json())

            .then(loadedThreads => {
                let thread = loadedThreads.reverse()
                return thread
            }
            )
    }

    enterThread = (e) => {
        console.log(e.target.parentNode.id)
        let pagination = e.target.parentNode.id
        this.setState({
            page: pagination,
            clicked:true
        })
    }

    displayThread = () => {
        this.loadThreads()
            .then(thread => {
                this.setState({
                    threads: thread,
                    dataLoaded: true
                })

            })
    }

    render() {

        const newThreads = this.state.threads
        {
            if (this.state.clicked) {
                return <div><InsideThread page={this.state.page} /></div>
            }
            else if (this.state.dataLoaded) {
                return <div id="threadBox">
                    {newThreads.map(thread =>
                        <ThreadCard key={thread.id} thread={thread} enterThread={this.enterThread} />)}
                </div>
            }
            else {
                return <div>Loading</div>
            }
        }
    }

}