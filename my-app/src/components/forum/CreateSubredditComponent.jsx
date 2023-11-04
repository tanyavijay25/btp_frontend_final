// import React, { Component } from 'react'
// import AuthenticationService from './AuthenticationService.js'
// import { Link } from 'react-router-dom';
// import { Formik, Field,Form } from 'formik';
// import WallDataService from '../../api/todo/WallDataService.js'

// class CreateSubredditComponent extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
            
//             forumname: '',
//         }

//         this.onSubmit = this.onSubmit.bind(this)
//         // this.validate = this.validate.bind(this)

//     }

//     componentDidMount=()=>
//     {
//         console.log('aaye')
//         if(!AuthenticationService.isUserLoggedIn())
//         {    
//             this.props.history.push("/login")
//         }

//     }

//     // validate(values) {
//     //     let errors = {}
//     //     if (!values.description) {
//     //         errors.description = 'Enter a Description'
//     //     } else if (values.description.length < 5) {
//     //         errors.description = 'Enter atleast 5 Characters in Description'
//     //     }

//     //     if (!moment(values.targetDate).isValid()) {
//     //         errors.targetDate = 'Enter a valid Target Date'
//     //     }

//     //     return errors

//     // }


//     onSubmit(values) {
//         console.log('yoyoyo')
//         let username = AuthenticationService.getLoggedInUserName()
//         console.log('hat ',values);
//         let todo = {
//             user_name:username,
//             name: values.name, 
//         }

        
//             WallDataService.createsubreddit(username,values.forumname)
//                 .then(() => this.props.history.push('/wall'))
//         }

        
    

//     render() {

//         let {forumname} = this.state
//         //let targetDate = this.state.targetDate

//         return (
//             <div>
//                 <h1>Create Forum</h1>
//                 <div className="container">
//                     <Formik
//                         initialValues={{ forumname}}
//                         onSubmit={this.onSubmit}
//                         validateOnChange={false}
//                         validateOnBlur={false}
//                         validate={this.validate}
//                         enableReinitialize={true}
//                     >
//                         {
//                             (props) => (
//                                 <Form>
//                                     {/* <ErrorMessage name="description" component="div"
//                                         className="alert alert-warning" />
//                                     <ErrorMessage name="targetDate" component="div"
//                                         className="alert alert-warning" /> */}
//                                     <fieldset className="form-group">
//                                         <label>Forumname</label>
//                                         <Field className="form-control" type="text" name="forumname" />
//                                     </fieldset>
//                                     {/* <button type="submit">Submit</button> */}
//                                     <button className="btn btn-success" type="submit">Save</button>
//                                 </Form>
//                             )
//                         }
//                     </Formik>

//                 </div>
//             </div>
//         )
//     }
// }

// export default CreateSubredditComponent


import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'
import { Link } from 'react-router-dom';
import { Formik, Field,Form } from 'formik';
import WallDataService from '../../api/todo/WallDataService.js'
import "../../CreateQuestionComponent.css"
import "../../CreateSubredditComponent.css"

class CreateSubredditComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
            forumname: '',
            Wallmodels: []
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.refreshwall=this.refreshwall.bind(this)
        this.parentredditClicked=this.parentredditClicked.bind(this)
        // this.validate = this.validate.bind(this)

    }

    componentDidMount=()=>
    {
        console.log('aaye')
        if(!AuthenticationService.isUserLoggedIn())
        {    
            this.props.history.push("/login")
        }
        else{
            this.refreshwall()
        }

    }

    // validate(values) {
    //     let errors = {}
    //     if (!values.description) {
    //         errors.description = 'Enter a Description'
    //     } else if (values.description.length < 5) {
    //         errors.description = 'Enter atleast 5 Characters in Description'
    //     }

    //     if (!moment(values.targetDate).isValid()) {
    //         errors.targetDate = 'Enter a valid Target Date'
    //     }

    //     return errors

    // }


    onSubmit(values) {
        console.log('yoyoyo')
        let username = AuthenticationService.getLoggedInUserName()
        console.log('hat ',values);
        let todo = {
            user_name:username,
            name: values.name, 
        }

        
            WallDataService.createsubreddit(username,values.forumname)
                .then((response)=>
               
                {  console.log("this is respo",response.data)
                    this.props.history.push(`/parentforum/${response.data}`)})
                   
        }

       refreshwall()
       {
            WallDataService.allsubreddit()
            .then(
                response => {
                    //console.log(response);
                    this.setState({ Wallmodels: response.data })
                    console.log("this is wallmodels",this.state.Wallmodels)
                }
            )


       } 



       parentredditClicked(parentname)
       {
           console.log('parent-reddit redirect')
           console.log({parentname})
           this.props.history.push(`${parentname}`)
           
       }

        
    

    render() {

        let {forumname} = this.state
        //let targetDate = this.state.targetDate

        return (
            
                <div className='bgcolory bgcolor1'>
                <div >
                <div className='bordery'>
                <h1 className='headingy'>Create Forum</h1>
                <div className="container">
                    <Formik
                        initialValues={{ forumname}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    {/* <ErrorMessage name="description" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="targetDate" component="div"
                                        className="alert alert-warning" /> */}
                                    <fieldset className="form-group usernamefieldx">
                                        <label className='ptagx'> Forum Name </label>
                                        <Field className="form-control" type="text" name="forumname" placeholder=" Enter Forum Name" />
                                    </fieldset>
                                    {/* <button type="submit">Submit</button> */}
                                    <button className="btn btn-success loginbuttony" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
                <div >
                   {this.state.Wallmodels.map(
                                         Wallmodel =>
                                         
                                         <button className="btn btn-4 hover-border-8 parenttag" onClick={() => this.parentredditClicked(Wallmodel.url)}> <span>{Wallmodel.name}</span></button>
                   )}
                </div>
            </div>
            </div>
            </div>
        )
    }
}

export default CreateSubredditComponent