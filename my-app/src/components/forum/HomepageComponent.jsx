import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'
import WallDataService from '../../api/todo/WallDataService.js'
import { Link } from 'react-router-dom';

import "../../card.css"
// import "../../WallComponent.css"
import"../../HomepageComponent.css"
class HomepageComponent extends Component {
    constructor(props) {
        super(props)
        console.log('constructor')
        this.state = {
            user_id:this.props.match.params.id,
            Wallmodels: []
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
       
        if( AuthenticationService.isUserLoggedIn())
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
    addquestionClicked(parent_id)
    {
        if(AuthenticationService.isUserLoggedIn())
        {    
            this.props.history.push(`/${parent_id}/addquestion`)
        }
        else
        {
            console.log('login redirect in downvotevote clicked')
            this.props.history.push(`/login`)
        }
    }
    refreshwall()
    {
        console.log('yahan aaye')
        WallDataService.homepage(this.state.user_id)
        .then(
            response => {
                //console.log(response);
                this.setState({ Wallmodels: response.data })
            }
        )
    }

//     render() {
//         console.log('render')
//         return (
//             <div>
//                  <h1>Questions asked by you</h1>
//                  <div className="container">
//                     <table className="table">
//                         <thead>
//                             <tr>
//                                 <th>Questions</th>
//                                 <th>votes</th>
//                                 <th>Parent Forum</th>
//                                 <th>Comments</th>
//                                 <th>Upvote</th>
//                                 <th>Downvote</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {
//                                 this.state.Wallmodels.map(
//                                     Wallmodel =>
//                                         <tr key={Wallmodel.id}>
//                                             <td>{Wallmodel.name}</td>
//                                             <td>{Wallmodel.votes}</td>
//                                             {/* <td><Link className="nav-link" to={`/parentforum/${this.state.id}`}>Parentforum</Link></td> */}
//                                             <td><button className="btn btn-success" onClick={() => this.parentredditClicked(Wallmodel.subreddit_url)}>{Wallmodel.subreddit_name}</button></td>
//                                             <td><button className="btn btn-success" onClick={() => this.commentsClicked(Wallmodel.id)}>comments</button></td>
//                                             <td><button className="btn btn-success" onClick={() => this.upvoteClicked(Wallmodel.id)}>Upvote</button></td>
//                                             <td><button className="btn btn-warning" onClick={() => this.downvoteClicked(Wallmodel.id)}>Downvote</button></td>
//                                         </tr>
//                                 )
//                             }
//                         </tbody>
//                     </table>
//                     {/* <div className="row">
//                         <button className="btn btn-success" onClick={this.()}>Add</button>
//                     </div> */}
//                 </div>

//             </div>
//         )}


// }




render() {
    console.log('render')
    return (
        <div >
        {/* <div className=" alignaddbutton">
                <button className="addbutton3" onClick={this.addTodoClicked}>Add Question</button>
            </div> */}
         
        <div className='bgcolor back'>
            <div >
            <h1 className='h1heading '>Questions asked by you </h1>
            
             <div className="container ">
                <div >
                        {
                            this.state.Wallmodels.map(
                                Wallmodel =>
                                    // < key={Wallmodel.id}>
                                    <div>
                                        
                                        <div class="l-card">
                                        <div>
                                        <button className='addbutton2' onClick={() => this.parentredditClicked(Wallmodel.subreddit_url)}> <span>{ Wallmodel.subreddit_name}</span></button>
                                        </div>
                                        <div>
                                        
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
                                            </div>
                                            </div>
                                            </div>
                                            </div>
                                            </div>
          ) }


}



export default HomepageComponent
