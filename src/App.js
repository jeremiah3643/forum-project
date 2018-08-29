import React, { Component } from 'react';
import './App.css';
import Login from './components/login/Login';
import HomePage from './components/homepage/HomePage';
import Navbar from './components/navbar/Navbar';
import Register from './components/register/register';
import Forum from './components/forum/Forum';

class App extends Component {
  state = {
    activeUser: "",
    currentView: "",
    activeUsername: ""
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


  onLoad = () => {
    let user = JSON.parse(sessionStorage.getItem("userInfo"))
    if (user !== null) {
      this.setState({
        activeUser: user.userId,
        currentView: user.currentView
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
        <HomePage currentView={this.state.currentView} activeUsername={this.state.activeUsername} />
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
        <Forum showView={this.showView} currentView={this.state.currentView} />
      )
    }
    else if (sessionStorage.getItem("userInfo")) {
      return <HomePage currentView={this.state.currentView} />
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

export default App;
