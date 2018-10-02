import React, { Component } from 'react';

export default class FollowCard extends Component {
    followMaker = () => {
        return <div className="ui cards left blue" key={this.props.thread.id} id={this.props.thread.id}>
            <div className="regularThread card" >
                <div key={this.props.thread.id} id={this.props.thread.id} className="content">
                    <h2 className="header" onClick={this.props.enterThread}>{this.props.thread.title}</h2>
                    <p className="description">{this.props.thread.message}</p>
                    <footer className="meta">Author: {this.props.thread.postAuthorName}</footer>

                </div>
            </div>
        </div>


    }
titleLoader=()=>{
    debugger
   return <div id="threadTitle" className="ui cards left black" key={this.props.thread.id}>
    <div className="card">
        <h2 className="header">Title:  {this.props.thread.threadTitle}</h2>
        <h3 className="description">{this.props.thread.threadMessage}</h3>
        <footer className="meta" >Author: {this.props.thread.threadAuthorName}</footer>
        <div>
           { this.followMaker()}
        </div>
    </div>
</div>

}



    render() {
        return (
            <div>
                {this.followMaker()}
            </div>
        )
    }
}