import React, { Component } from 'react';

export default class Navbar extends Component {
    sessionLoader = (view) => {
        if (sessionStorage.getItem("userInfo") !== null) {
            let oldInfo = JSON.parse(sessionStorage.getItem("userInfo"))
            let update = {
                userId: oldInfo.userId,
                currentView: view
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
            return <div><a onClick={this.homeLink} href="home">Home</a>
                <a onClick={this.forumLink} href="forum">Forum</a>
            </div>
        }
        else {
            // eslint-disable-next-line
            return <a></a>
        }
    }

    LoginorLogoff = () => {
        let userId = sessionStorage.getItem("userInfo")
        if (this.props.activeUser === "" || this.props.currentView === "logout") {
            return <a onClick={this.login} href="login">Login</a>
        }
        else {
            return <a onClick={this.logout} href="logout">Logout</a>
        }
    }
    // currentUserChecker = () => {
    //     let info = JSON.parse(sessionStorage.getItem("userInfo"))
    //     if (this.props.activeUser === null && sessionStorage.getItem("userInfo")) {
    //         this.setState({
    //             activeUser: info.userId
    //         })
    //     }
    // }
    render() {
        return (
            <nav id="navbar">
                {/* {this.currentUserChecker()} */}
                <this.handleHome />
                <this.LoginorLogoff />
            </nav>
        )
    }
}