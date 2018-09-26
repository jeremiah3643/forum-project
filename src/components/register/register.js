import React, { Component } from 'react';
import "./register.css"
import FormError from './RegisterErrors';

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
    validate = (name, email, password) => {
        // we are going to store errors for all fields
        // in a signle array
        let errors = [];
        if (name.length === 0) {
            errors.push("Name can't be empty");
        }
        if (email.length < 5) {
            errors.push("Email should be at least 5 charcters long");
        }
        if (email.split('').filter(x => x === '@').length !== 1) {
            errors.push("Email should contain a @");
        }
        if (email.indexOf('.') === -1) {
            errors.push("Email should contain at least one dot");
        }
        if (password.length < 6) {
            errors.push("Password should be at least 6 characters long");
        }
        this.setState({ errors: errors })
    }
    handleRegister = () => {
        let tester1 = this.state.registerEmail
        let tester2 = this.state.registerPassword
        let tester3 = this.state.registerUsername
        this.validate(tester3, tester1, tester2)
        let errors = this.state.errors
        debugger
        if (errors.length) {
            alert(errors)
        }
        else {
            fetch(`http://localhost:8088/users?email=${this.state.registerEmail}`)
                .then(r => r.json())
                .then(user => {

                    if (user.length) {
                        alert("Email already in use!")
                    }
                    else if (tester1.length || tester2.length || tester3.length) {
                        alert("Please Fill Out Boxes!")
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
    }
    errorChecker = () => {
        if (this.state.errors.length) {
            return <FormError />
        }
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
                                {this.errorChecker(this.state.errors[1])}
                            </label>
                            <label className="ui label">Username
                        <input className="ui input focus" onChange={this.registerChange} id="registerUsername"></input>
                                {this.errorChecker(this.state.errors[0])}
                            </label>
                            <label className="ui label" >Password
                        <input className="ui input focus" onChange={this.registerChange} id="registerPassword"></input>
                                {this.errorChecker(this.state.errors[4])}
                            </label>
                            <button className="ui primary button" onClick={this.handleRegister}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}