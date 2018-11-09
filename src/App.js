import React, { Component } from 'react';
import './App.css';
import Login from './components/login/Login';
import HomePage from './components/homepage/HomePage';
import Navbar from './components/navbar/Navbar';
import Register from './components/register/register';
import Forum from './components/forum/Forum';

export default class App extends Component {
  state = {
    activeUser: "",
    currentView: "",
    activeUsername: "",
    followedThreads: []
  }
  setActiverUser = (user, username) => {
    if (user === null) {
      this.setState({
        activeUser: null
      })
    }
    else {
      this.setState({
        activeUser: user,
        activeUsername: username
      })
    }
  }
  showView = function (e) {
    let view = null;
    // Click event triggered switching view
    if (e.hasOwnProperty("target")) {
      view = e.target.id.split("__")[1];
      // View switch manually triggered by passing in string
    } else {
      view = e;
    }
    if (view === "logout") {
      this.setState({
        activeUser: null,
        currentView: "login"
      })
      sessionStorage.removeItem("userInfo")
      this.showView("login");
    }
    // Update state to correct view will be rendered
    this.setState({
      currentView: view
    });
  }.bind(this);
  followedThreads = () => {
    let followId = this.state.activeUser
    return fetch(`https://serverforum.herokuapp.com/followThreads/?followId=${followId}`)
      .then(r => r.json())
      .then(result => {
        this.setState({
          followedThreads: result
        })
      })
  }
  onLoad = () => {
    let user = JSON.parse(sessionStorage.getItem("userInfo"))
    if (user !== null) {
      this.setState({
        activeUser: user.userId,
        currentView: user.currentView
      }, () => {
        this.followedThreads()
      })

      this.changeView()
    }
  }

  componentDidMount() {
    this.onLoad()
  }
  changeView = () => {
    if (this.state.currentView === "register") {
      return (
        <Register currentView={this.state.currentView} showView={this.showView} setActiveUser={this.setActiveUser} newEmail={this.state.newEmail} newPassword={this.state.newPassword} />
      )
    }
    else if (sessionStorage.getItem("userInfo") === null || "") {
      return (
        <Login showView={this.showView} setActiveUser={this.setActiverUser} activeUser={this.state.activeUser} currentView={this.state.currentView} />
      )
    }
    else if (this.state.currentView === "homepage") {
      return (
        <HomePage followedThreads={this.state.followedThreads} currentView={this.state.currentView} activeUser={this.state.activeUser} activeUsername={this.state.activeUsername} />
      )
    }
    else if (this.state.currentView === "login") {
      return (
        <Login showView={this.showView} setActiveUser={this.setActiverUser} activeUser={this.state.activeUser} currentView={this.state.currentView} />
      )
    }
    else if (this.state.currentView === "register") {
      return (
        <Register currentView={this.state.currentView} showView={this.showView} />
      )
    }
    else if (this.state.currentView === "forum") {
      return (
        <Forum showView={this.showView} activeUser={this.state.activeUser} currentView={this.state.currentView} />
      )
    }
    else if (sessionStorage.getItem("userInfo")) {
      return <HomePage activeUser={this.state.activeUser} followedThreads={this.state.followedThreads} currentView={this.state.currentView} />
    }
  }
  render() {
    return (
      <div>
        <Navbar activeUser={this.state.activeUser} setActiverUser={this.setActiverUser} showView={this.showView} currentView={this.state.currentView} />
        {this.changeView()}
      </div>
    )
  }
}
