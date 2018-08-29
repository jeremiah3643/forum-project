import React, { Component } from 'react';

export default class HomePage extends Component {
    state = {
        user: "",
        activeUsername: ""
    }

    loaded = function () {
        if (this.state.user === "") {
            let info = JSON.parse(sessionStorage.getItem("userInfo"))
            const lower = info.username;
            const upper = lower.charAt(0).toUpperCase() + lower.substr(1);
            return <div>
                <h2 className="welcomeTag">{`Welcome ${upper}`}</h2>

            </div>
        }
        else if (this.state.user !== null) {
            const lower = this.state.activeUsername;
            const upper = lower.charAt(0).toUpperCase() + lower.substr(1);
            return <div>
                <h2 className="welcomeTag">{`Welcome ${upper}`}</h2>

            </div>
        }
    }.bind(this)




    render() {
        return (
            <div>
                {this.loaded()}
            </div>
        )
    }
}