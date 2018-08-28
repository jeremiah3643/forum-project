import React, { Component } from 'react';

export default class ShowThread extends Component {


    loadThreads = () => {

        return fetch(`http://localhost:8088/threads`)
            .then(r => r.json())
            .then(loadedThreads => {
                let thread = ""
                for (let i = 0; i < loadedThreads.length; i++) {
                    const element = loadedThreads[i];
                    thread += this.threadLayout(element)
                }
                return thread
            })
    }
    threadLayout = (element) => {
        return `<div>
            <h3>${element.title}</h3>
            <p>${element.message}</p>
            <footer>Author: ${element.threadAuthorName}</footer>
        </div>`
    }
    displayThread = () => {
        this.loadThreads()
            .then(thread => {
                document.querySelector("#threadBox").innerHTML = thread
            })
    }
    // componentDidMount() {
    //     this.loadThreads()
    // }

    render() {
        return (
            <div id="threadBox">
                {this.displayThread()}
            </div>
        )
    }

}