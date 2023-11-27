import React, { Component } from 'react'
import { createContext } from 'react';
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
            user_Type:[],
            description: '',
        }
        
        this.componentDidMount()
        console.log('this is question_id',this.state.question_id)
        this.onDelete =   this.onDelete.bind(this)
        // this.findUserType= this.findUserType.bind(this)
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.questionpage(this.state.question_id);
        let username = AuthenticationService.getLoggedInUserName()
        console.log("findUser");
            WallDataService.finduser(username)
            .then(
                response => {
                    console.log("inside find user")
                    this.setState({user_Type:response.data.user_type});
                    }
            )
       
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
        // console.log('inside onsubmit : ',values);
        if(AuthenticationService.isUserLoggedIn())
        {
            let username = AuthenticationService.getLoggedInUserName()
            let comment_deets = {
                name: values.description,
                user_id: username,
                user_type:this.state.user_Type,
            } 
            console.log(comment_deets.user_id,comment_deets.name,comment_deets.user_type)
            WallDataService.addcomment(this.state.question_id,comment_deets)
            .then(
                response => {
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
    
    onDelete(name1,id,type){
        console.log('came here')
        console.log(this.state);
        // console.log('inside onDelete : ',values);
        if(AuthenticationService.isUserLoggedIn())
        {
            let username = AuthenticationService.getLoggedInUserName()
           
          
            let comment_deets = {
                user_id: id,
                name: name1,
                user_type:type,
                } 
          
            WallDataService.deletecomment(this.state.question_id,comment_deets)
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
        console.log("inside the render")
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
                  <div>
                    <div className='l-cardq1'>
                    <div className='addbutton3q'> {!(comment===null)&&comment.user_id} - {comment.user_type} </div>
                    <div className='l-card__textq'>{!(comment===null)&&comment.name} </div>
                    {/* <div className='addbutton100q'>{!(comment===null)&&}</div> */}
                    </div>
                    <button className='addbutton2q' onClick={() => this.onDelete(comment.name,comment.user_id,comment.user_type)}>Delete</button>
                    <div>
                    </div>
                    </div>
                    
                    </div>
                    )
                
            
            }</div>
            {console.log(this.state.question_id)}
            
            </div>  
        </div>
        )
    }

}
export default QuestionComponent