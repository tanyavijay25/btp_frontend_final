import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'
import WallDataService from '../../api/todo/WallDataService.js'


import "../../card.css"
// import "../"
import "../../WallComponent.css"

class WallComponent extends Component {
    constructor(props) {
        super(props)
        // console.log('render')
        this.state = {
            Wallmodels: [],
            // name_temp:'tanya'
        }
        this.parentredditClicked =   this.parentredditClicked.bind(this)
        this.commentsClicked =  this.commentsClicked.bind(this)
        this.upvoteClicked =   this.upvoteClicked.bind(this)
        this.downvoteClicked = this.downvoteClicked.bind(this)
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.refreshwall();
        console.log(this.state)
    }

    parentredditClicked(parentname)
    {
        console.log('parent-reddit redirect')
        console.log({parentname})
        this.props.history.push(`${parentname}`)
        
    }
    commentsClicked(question_id)
    {
        console.log('parent-reddit redirect')
        this.props.history.push(`/question/${question_id}`)

    }
    upvoteClicked(question_id)
    {
        
        if(AuthenticationService.isUserLoggedIn())
        {    
            WallDataService.upvote(question_id)
            .then(
                response => {
                    this.setState({ message: `Question upvoted` })
                    this.refreshwall()
                }
            )
        }
        else
        {
            console.log('login redirect in upvote clicked')
            this.props.history.push(`/login`)
            
        }
    }
    downvoteClicked(question_id)
    {
    //    if(this.state.name_temp===question_id)
    //    {
    //      console.log('yes yes yes')
    //    }
        if(AuthenticationService.isUserLoggedIn())
        {    
            WallDataService.downvote(question_id)
            .then(
                response => {
                    this.setState({ message: `Question upvoted` })
                    this.refreshwall()
                }
            )
        }
        else
        {
            console.log('login redirect in downvotevote clicked')
            this.props.history.push(`/login`)
        }
    }

    refreshwall()
    {
        WallDataService.retrieveAllQuestions()
        .then(
            response => {
                //console.log(response);
                this.setState({ Wallmodels: response.data })
            }
        )
    }

    addTodoClicked=()=>
    {

        // if()
        if(!AuthenticationService.isUserLoggedIn())
        {    
            console.log('hat teri maaki')
            this.props.history.push(`/login`)
        }
        else
        {
            this.props.history.push(`/add_forum`)
        }
        
    }
         render() {
            console.log('render')
            return (
                <div>
                <div className=" alignaddbutton">
                        <button className="addbutton3" onClick={this.addTodoClicked}>Add Forum</button>
                    </div>
                <div className='c1 bgcolor'>
                    
                    <h1 className='h1heading'>Active Forums</h1>
                    
                     <div className="container">
                        <div >
                            {
                                    this.state.Wallmodels.map(
                                        Wallmodel =>
                                            // < key={Wallmodel.id}>
                                            <div>
                                                
                                                <div className="l-card">
                                                <div >
                                                <button className='addbutton2' onClick={() => this.parentredditClicked(Wallmodel.subreddit_url)}> <span>{ Wallmodel.subreddit_name}</span></button>
                                                </div>
                                                <div >
                                                
                                                <section className='votes'>Votes: {Wallmodel.votes}</section>
                                                </div><div >
                                                    <br></br>
                                                    
                                                    <section className="l-card__text">{Wallmodel.name}</section></div>
                                                <div >
                                                    <div >
                                                        <div className='align'>
                                                        <div className='a2'>
                                                        </div>
                                                        <div className='a2'>
                                                        <button className="addbutton " onClick={() => this.upvoteClicked(Wallmodel.id)}><span>Upvote</span></button>
                                                        </div>
                                                        <div className='a2'>
                                                        <button className="addbutton" onClick={() => this.commentsClicked(Wallmodel.id)}> <span>Comments</span></button>
                                                        </div>
                                                        
                                                        <div className='a2'>
                                                        <button className=" addbutton" onClick={() => this.downvoteClicked(Wallmodel.id)}><span>Downvote</span></button>
                                                        </div>
                                                    </div>
                                                        </div>
                                                  </div>
                                                  </div></div>
                                                      )
                                                    }
                                                    </div></div>
    
                </div></div>
                  ) }


}
export default WallComponent