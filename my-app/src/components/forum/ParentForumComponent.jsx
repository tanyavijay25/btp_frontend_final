import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'
import WallDataService from '../../api/todo/WallDataService.js'

//import "../../card.css"
import "../../ParentForumComponent.css"
//import"../../HomepageComponent.css"


class ParentForumComponent extends Component {
    constructor(props) {
        super(props)
        console.log('constructor')
        console.log('came here randi')
        this.state = {
            parent_id:this.props.match.params.id,
            Wallmodels: [],
            a:''
        }
        this.parentredditClicked =   this.parentredditClicked.bind(this)
        this.commentsClicked =  this.commentsClicked.bind(this)
        this.upvoteClicked =   this.upvoteClicked.bind(this)
        this.downvoteClicked = this.downvoteClicked.bind(this)
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        this.addquestionClicked=this.addquestionClicked.bind(this)
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
    addquestionClicked=()=>
    {
        console.log('this is add question',this.state.parent_id)
        if(AuthenticationService.isUserLoggedIn())
        {    
            this.props.history.push(`/${this.state.parent_id}/addquestion`)
        }
        else
        {
            console.log('login redirect in downvotevote clicked')
            this.props.history.push(`/login`)
        }
    }
    refreshwall()
    {
        WallDataService.retrievequestionsinparentforum(this.state.parent_id)
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
//                  <h1>Active Forums</h1>
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
//                                             {/* <td><Link className="nav-link" to={`/todos/${id}`}>Parentforum</Link></td> */}
//                                            { console.log(Wallmodel.subreddit_name)}
//                                             <td><button className="btn btn-success" onClick={() => this.parentredditClicked(Wallmodel.subreddit_url)}>{Wallmodel.subreddit_name}</button></td>
//                                             <td><button className="btn btn-success" onClick={() => this.commentsClicked(Wallmodel.id)}>comments</button></td>
//                                             <td><button className="btn btn-success" onClick={() => this.upvoteClicked(Wallmodel.id)}>Upvote</button></td>
//                                             <td><button className="btn btn-warning" onClick={() => this.downvoteClicked(Wallmodel.id)}>Downvote</button></td>
//                                         </tr>
//                                 )
//                             }
//                         </tbody>
//                     </table>
//                     <div className="row">
//                         <button className="btn btn-success" onClick={this.addquestionClicked}>Add</button>
//                     </div>
//                 </div>

//             </div>
//         )}


// }

render() {
    console.log('render')
    this.state.a=1
    return (
        <div className=' bgcolor1t back1t '>
        <div className="alignaddbuttont ">
            <button className="addbutton3t" onClick={this.addquestionClicked}>Add Question</button>
            </div>
        <div >
        <div className="container ">
            {
                            this.state.Wallmodels.map(
                                Wallmodel =>
                                <div className='alignbuttont'>
                                    {(this.state.a===1) && (this.state.a=4) &&<h1 className='h1heading2t'><span> Forum Name - { Wallmodel.subreddit_name}</span></h1>}
                                </div>
                            )}
            </div>
            
             <div className="container ">
                <div >
                        {
                            this.state.Wallmodels.map(
                                Wallmodel =>
                                
                                    // < key={Wallmodel.id}>
                                    <div>
                                       <div class="l-card">
                                        <div >
                                        <button className='addbutton2t' onClick={() => this.parentredditClicked(Wallmodel.subreddit_url)}> <span>{ Wallmodel.subreddit_name}</span></button>
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
                                                <button className="addbuttont" onClick={() => this.commentsClicked(Wallmodel.id)}> <span>Comments</span></button>
                                                </div>
                                                <div className='a2'>
                                                <button className="addbuttont " onClick={() => this.upvoteClicked(Wallmodel.id)}><span>Upvote</span></button>
                                                </div>
                                                <div className='a2'>
                                                <button className=" addbuttont" onClick={() => this.downvoteClicked(Wallmodel.id)}><span>Downvote</span></button>
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
          ) }


}


export default ParentForumComponent