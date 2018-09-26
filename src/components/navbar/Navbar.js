import React, { Component } from 'react';

export default class Navbar extends Component {
    sessionLoader = (view) => {
        if (sessionStorage.getItem("userInfo") !== null) {
            let oldInfo = JSON.parse(sessionStorage.getItem("userInfo"))
            let update = {
                userId: oldInfo.userId,
                currentView: view,
                username: oldInfo.username
            }
            sessionStorage.setItem("userInfo", JSON.stringify(update))
        }
    }
    login = (event) => {
        event.preventDefault()
        this.sessionLoader("login")
        this.props.showView("login")
    }
    logout = (event) => {
        event.preventDefault()
        this.sessionLoader("Login")
        this.props.showView("logout")
    }
    homeLink = (event) => {
        event.preventDefault()
        this.sessionLoader("homepage")
        this.props.showView("homepage")
    }
    forumLink = (event) => {
        event.preventDefault()
        this.sessionLoader("forum")
        this.props.showView("forum")
    }
    handleHome = () => {
        if (this.props.activeUser !== null && sessionStorage.getItem("userInfo") !== null) {
            return <div id="navbar" className="ui three item menu">
                <a className="item" onClick={this.homeLink} href="home">Home</a>
                <a className="item" onClick={this.forumLink} href="forum">Forum</a>
                <this.LoginorLogoff />
            </div>
        }
        else {
            // eslint-disable-next-line
            return <a></a>
        }
    }
    LoginorLogoff = () => {
        if (this.props.activeUser === "" || this.props.currentView === "logout") {
            return <a className="item" onClick={this.login} href="login">Login</a>
        }
        else {
            return <a className="item" onClick={this.logout} href="logout">Logout</a>
        }
    }
    render() {
        return (
            <div>
                {/* <div id="navbar" className="ui three item menu"></div> */}
                {/* {this.currentUserChecker()} */}
                < this.handleHome />
                {/* <this.LoginorLogoff /> */}
            </div>
        )
    }
}