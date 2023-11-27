import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'
import WallDataService from '../../api/todo/WallDataService.js'
import "../../LoginComponent.css"


import "../../card.css"
// import "../../WallComponent.css"
import"../../HomepageComponent.css"
class AdminHomePageComponent extends Component {

    constructor(props) {
        super(props)
        console.log('constructor')
        this.state = {
            // user_id:this.props.match.params.id,
            // Wallmodels: []
            Users:[]
        }
        // this.parentredditClicked =   this.parentredditClicked.bind(this)
        // this.commentsClicked =  this.commentsClicked.bind(this)
        // this.upvoteClicked =   this.upvoteClicked.bind(this)
        // this.downvoteClicked = this.downvoteClicked.bind(this)
        // const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        this.banClicked =   this.banClicked.bind(this)
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.refreshwall();
        console.log(this.state)
    }
    refreshwall()
    {
        console.log('yahan aaye')
        WallDataService.allUsers()
        .then(
            response => {
                //console.log(response);
                this.setState({ Users: response.data })
            }
        )
    }
    banClicked(email){
        WallDataService.banUser(email)
        .then(
            response => {
                this.refreshwall();
            }
        )
        // this.refreshwall();
    }

    render(){
        return(
            <div >
        {/* <div className=" alignaddbutton">
                <button className="addbutton3" onClick={this.addTodoClicked}>Add Question</button>
            </div> */}
         
        <div className='bgcolor back'>
            <div >
            <h1 className='h1heading '>Users</h1>
            <div className="container ">
            <div >
            {
            this.state.Users.map(
                User =>
                <div >
                <div class="l-card">
                {/* <div>
                <button className='addbutton2' onClick={() => this.parentredditClicked(Wallmodel.subreddit_url)}> <span>{ Wallmodel.subreddit_name}</span></button>
                </div> */}
                {/* <div>
                <section className='l-card__text'>User Name: {User.id}</section>
                </div> */}
                <div>
                <section className='l-card__text'>User Type: {User.user_type}</section>
                </div>
                <div >
                <section className="l-card__text">Email: {User.email_id}</section>
                </div>
                <div className='a2'>
                <button className="banUser" onClick={() => this.banClicked(User.email_id)}><span>Ban User</span></button>
                </div>
            </div>
            </div>
            )
                }
            </div>
            </div>
            </div>
            </div>
            </div>
        )
    }
}

export default AdminHomePageComponent