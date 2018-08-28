import React, { Component } from 'react';

export default class HomePage extends Component {
    state = {
        user: "",
        activeUsername: ""
    }
    load = function () {
        if (this.props.activeUser === null) {
            this.setState = { currentView: "Login" }
        }
        else {
let user = JSON.parse(sessionStorage.getItem("userInfo"))
            fetch(`http://localhost:8088/users/${user.userId}`)
                .then(r => r.json()).then(response => {
                    this.setState({ activeUsername: response.username })
                }
                )
        }
    }.bind(this)
    loaded = function () {
        if (this.state.user !== null) {
            const lower = this.state.activeUsername;
            const upper = lower.charAt(0).toUpperCase() + lower.substr(1);
            return <div>
                <h2 className="welcomeTag">{`Welcome ${upper}`}</h2>

            </div>
        }
    }.bind(this)

    componentDidMount() {
        this.load()
    }


    render() {
        return (
            <div>
                {this.loaded()}
            </div>
        )
    }
}