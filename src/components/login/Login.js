import React, { Component } from 'react';
import "./login.css"

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }
    registerPage = () => {
        this.props.showView("register")
    }
    inputChange = (event) => {
        let values = {}
        values[event.target.id] = event.target.value
        this.setState(values)
    }
    handleLogin = (e) => {
        e.preventDefault();
        fetch(`https://forum-project-c7d72.firebaseapp.com/api/users?email=${this.state.email}&password=${this.state.password}`,
        {
            
            headers: {
                "Content-Type": "application/json"
                
            }
        }
        )
            .then(r => r.json())
            .then(user => {
                if (user.length) {
                    this.props.setActiveUser(user[0].id, user[0].username)
                    let userinfo = {
                        userId: user[0].id,
                        currentView: "homepage",
                        username: user[0].username
                    }
                    sessionStorage.setItem("userInfo", JSON.stringify(userinfo))
                    alert("You have successfully logged in!")
                    this.props.showView("homepage")
                }
                else {
                    alert("Email or Password do not match our records!")
                }
            })
    }
    render() {
        return (
            <div className="loginForm">
                <form className="ui form">
                    <div className="field">
                        <label className="ui label">Welcome! Please Log In.</label>
                        <input className="ui input focus" onChange={this.inputChange} id="email" placeholder="Email"></input>
                        <input className="ui input focus" onChange={this.inputChange} type="password" id="password" placeholder="Password"></input>
                        <button className="ui primary button" onClick={this.handleLogin} >Log In</button>
                        <button className="ui button" onClick={this.registerPage}>Register</button>
                    </div>
                </form>
            </div>
        )
    }
}
