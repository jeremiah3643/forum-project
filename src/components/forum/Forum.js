import React, { Component } from 'react';
import ShowThread from './ShowThread';

export default class Forum extends Component {
    state = {
       
        
        userId: "",
    }
    load = function () {
        if (this.props.activeUser === null) {
            this.setState = { currentView: "Login" }
        }
        else {
            let info = JSON.parse(sessionStorage.getItem("userInfo"))
            fetch(`http://localhost:8088/users/${info.userId}`)
                .then(r => r.json()).then(response => {
                    this.setState({
                        userId: response.id
                    })
                }
                )
        }
    }.bind(this)

    componentDidMount() {
        this.load()
    }

   
 

 
    render() {
        return (
            <div>
                
                <section><ShowThread showView={this.props.showView} userId={this.state.userId} currentView={this.props.currentView} /></section>

            </div>
        )
    }
}
