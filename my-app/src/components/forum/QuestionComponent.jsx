import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'
import { Link } from 'react-router-dom';
import { Formik, Field,Form } from 'formik';
import WallDataService from '../../api/todo/WallDataService.js'

import "../../QuestionComponent.css"
 import '../../card.css'

class QuestionComponent extends Component
{
    constructor(props) 
    {
        super(props)
        // console.log('constructor')
        this.state ={
            question_id:this.props.match.params.id,
            question:[],
            comments:[],
            description: '',
        }
        this.componentDidMount()
        console.log('this is question_id',this.state.question_id)
        
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.questionpage(this.state.question_id);
       
    }

    commentas()
    {
        this.setState({ comments: this.state.question.comments_list })
    }
    questionpage(question_id)
    {
        console.log('calling the question data')
        WallDataService.questioncalling(question_id) 
        .then(
            response => {
                //console.log(response);
                this.setState({ question: response.data })
                console.log(this.state.question.name)
                this.commentas();
            }
        )
    }
    onSubmit(values)
    {
        console.log('came here')
        console.log(this.state);
        console.log('inside onsubmit : ',values);
        if(AuthenticationService.isUserLoggedIn())
        {
            let username = AuthenticationService.getLoggedInUserName()
           
          
            let comment_deets = {
                user_id: username,
                name: values.description,
                
            } 
          
            WallDataService.addcomment(this.state.question_id,comment_deets)
            .then(
                response => {
                    //console.log(response);
                    this.questionpage(this.state.question_id)
                }
            )
        }
        else
        {
            console.log('login redirect in downvotevote clicked')
            this.props.history.push(`/login`)
        }

    }

    render()
    {
        console.log('Inside render 1 : ',this.state)
       //  let {description} = this.state
       // console.log('Inside render 2 : ',description)
        
        // this.setState(...this.state, description)
        console.log("inside the render")
        //console.log("chus le",this.state.question_id)
        return(
        <div className='c1q'>
            <div className='addbuttonq'>Question</div>
            <div className="l-cardq">{this.state.question.name}</div>
            <div className='addbuttonq'>Question Description</div>
           <div className="l-cardq">{this.state.question.question_description} </div>

           <div className="container ">
            <div className=''>
                     <Formik
                        initialValues={{}}
                        onSubmit={this.onSubmit.bind(this)}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                     >
                        {
                            (props) => (
                                <Form className='l-cardq1'>
                                    
                                    <fieldset className="form-group ">
                                        <label className='addbuttonq'>Add Comment</label>
                                        <Field className="form-control  " type="text" name='description' placeholder="Add Comment" />
                                    </fieldset>
                                    <button className="btn btn-success addbutton2q " type="submit">Comment</button>
                                </Form>
                            )

                        }
                    </Formik>
                    </div>
                    <div className='l-cardq1 bottom'>
                    <div className='addbuttonq'> Other Comments</div>
            {
               this.state.comments.map(

                  comment =>
                 
                  <div>
                    
                    <div className='l-cardq1'>
                        
                    <div className='addbutton3q'> {!(comment===null)&&comment.user_id} -</div>
                    <div className='l-card__textq'>{!(comment===null)&&comment.name} </div>
                    </div>
                    <div></div>
                    </div>
                  
                    /* <div className="l-card">
                    <div >
                    <button className='addbutton2' onClick={() => this.parentredditClicked(Wallmodel.subreddit_url)}> <span>{ Wallmodel.subreddit_name}</span></button>
                    </div>
                    <div >
                                                
                    <section className='votes'>Votes: {Wallmodel.votes}</section>
                    </div><div >
                    <br></br>
                                                    
                    <section className="l-card__text">{Wallmodel.name}</section></div>
                    <div > */


                    )
                
            
            }</div>
            {console.log(this.state.question_id)}
            
            </div>  
        </div>
        )
    }

}
export default QuestionComponent