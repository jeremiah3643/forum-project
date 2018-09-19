import React, { Component } from 'react';

export default class Register extends Component {
    state = {
        registerEmail: "",
        registerPassword: "",
        registerUsername: ""
    }
    registerChange = (event) => {
        let values = {}
        values[event.target.id] = event.target.value
        this.setState(values)
    }
    handleRegister = () => {
        fetch(`http://localhost:8088/users?email=${this.state.registerEmail}`)
            .then(r => r.json())
            .then(user => {

                if (user.length) {
                    alert("Email already in use!")
                }
                else {
                    fetch(`http://localhost:8088/users`, {
                        method: 'POST',
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: this.state.registerEmail,
                            password: this.state.registerPassword,
                            username: this.state.registerUsername
                        })
                    }
                    )
                        .then(
                            alert("You have successfully registered!"),
                            this.props.showView("login")
                        )
                }
            })
    }
    render() {
        return (
            <div>
                <form>
                    <label>Email
                        <input onChange={this.registerChange} id="registerEmail"></input>
                    </label>
                    <label>Username
                        <input onChange={this.registerChange} id="registerUsername"></input>
                    </label>
                    <label >Password
                        <input onChange={this.registerChange} id="registerPassword"></input>
                    </label>
                    <button onClick={this.handleRegister}>Register</button>
                </form>
            </div>
        )
    }
}