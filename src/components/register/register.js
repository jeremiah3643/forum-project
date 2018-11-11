import React, { Component } from 'react';
import "./register.css"

export default class Register extends Component {
    state = {
        registerEmail: "",
        registerPassword: "",
        registerUsername: "",
        errors: []
    }
    registerChange = (event) => {
        let values = {}
        values[event.target.id] = event.target.value
        this.setState(values)
    }
    
    handleRegister = () => { 
            fetch(`https://serverforum.herokuapp.com/users?email=${this.state.registerEmail}`)
                .then(r => r.json())
                .then(user => {
                    if (user.length) {
                        alert("Email already in use!")
                    }
                    else {
                        fetch(`https://serverforum.herokuapp.com/users`, {
                            method: 'POST',
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            },
                            mode: "no-cors",
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
                <div className="registerForm">
                    <label className="ui label">Please Create A New User</label>
                    <form className="ui form">
                        <div className="field">
                            <label className="ui label">Email
                        <input className="ui input focus" onChange={this.registerChange} id="registerEmail"></input>
                            </label>
                            <label className="ui label">Username
                        <input className="ui input focus" onChange={this.registerChange} id="registerUsername"></input>
                            </label>
                            <label className="ui label" >Password
                        <input className="ui input focus" onChange={this.registerChange} id="registerPassword"></input>                             
                            </label>
                            <button className="ui primary button" onClick={this.handleRegister}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
      
                    )
}
}
