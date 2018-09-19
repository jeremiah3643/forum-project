import React, { Component } from 'react';

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
        fetch(`http://localhost:8088/users?email=${this.state.email}&password=${this.state.password}`)
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
            <div>
                <form>
                    <label>Welcome! Please Log In.</label>
                    <input onChange={this.inputChange} id="email" placeholder="Email"></input>
                    <input onChange={this.inputChange} type="password" id="password" placeholder="Password"></input>
                    <button onClick={this.handleLogin} >Log In</button>
                    <button onClick={this.registerPage}>Register</button>
                </form>
            </div>
        )
    }
}
