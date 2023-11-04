import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'
import { Link } from 'react-router-dom';
import { Formik, Field,Form } from 'formik';
import WallDataService from '../../api/todo/WallDataService.js'
import '../../LoginComponent.css'
import '../../SignupComponent.css'
class SignupComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
           username:'',
           usertype:'',
           password:'',
           gigi:'yoyo'
            // targetDate: moment(new Date()).format('YYYY-MM-DD')
        }

        this.onSubmit = this.onSubmit.bind(this)
        // this.validate = this.validate.bind(this)

    }

    componentDidMount() {
    }

    onSubmit=(values,actions) => {
     
        let username = AuthenticationService.getLoggedInUserName()
        console.log(values);
        console.log(this.state);
        if(values.usertype==='College')
        {
            console.log('college students')
            if(values.useremail.endsWith("@lnmiit.ac.in"))
            {
                let todo = {
                    username:values.username,
                    email_id:values.useremail,
                    user_type: values.usertype,
                    password: values.password,
                    subreddit_id_list:[],
                    question_id_list:[]
                }
                console.log('verified')
                WallDataService.new_user(todo);
                this.props.history.push('/wall')


            }
            else
            {
            //   //  setErrors({ username: 'This is a dummy procedure error' });
            //     console.log('not verified')
            //   // resetForm({values:''});
            //    //resetForm();
            //    onSubmitProps.setSubmitting(false)
            //    onSubmitProps.resetForm();
            //   // setSubmitting(false);
            // //    helpers.resetForm({
            // //     values,
            // //   });
            //     this.props.history.push('/signup')
            // onSubmitProps.resetForm();
            //     this.resetmethod()
              //  this.state. onShowAlert()
             //   setErrorMessage('Example error message!');
             actions.setSubmitting(false);
                actions.resetForm({
                    values: {
                      // the type of `values` inferred to be Blog
                      title: '',
                      image: '',
                      body: '',
                    },
                    // you can also set the other form states here
                  });
                  actions.setValues(this.state.initialValues);
                  window.location.reload();
            }

        }
        else{
        let todo = {
            username:values.username,
            email_id:values.useremail,
            user_type: values.usertype,
            password: values.password,
            subreddit_id_list:[],
            question_id_list:[]
        }
        console.log('hshab',todo)

        
            WallDataService.new_user(todo)
                .then((response) =>
                {
                    console.log('aayaeer',response)
                    if(response.data===0)
                    {
                        console.log('aaya yahannnn',response)
                        this.setState({ message: `username already taken` })
                        
                actions.resetForm({
                    values: {
                      // the type of `values` inferred to be Blog
                      title: '',
                      image: '',
                      body: '',
                    },
                    // you can also set the other form states here
                  });
                  actions.setValues(this.state.initialValues);
                  window.location.reload();
                        // this.props.history.push('/signup')
                    }
                    else{
                    console.log('aaye kyaa')
                    this.props.history.push('/wall')
                    }
                })
        }
    }


    render() {

        console.log('signup render')
        return (
            <div className='bgcolor'>
            <div className='border1'>
                <h1 className='h1heading'>Signup</h1>
                <div className="container">
                    <Formik
                        initialValues={{}}
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
                                    
                                    <fieldset className="form-group field usernamefield">
                                        <label className='align'>Username</label>
                                        <Field className="form-control" pattern="^[A-Za-z][A-Za-z0-9_]{0,1000}$" title="Must contain alphabets, numbers and underscore only" type="text" name="username" placeholder= "Username" />
                                    </fieldset>
                                    <fieldset className="form-group usernamefield field">
                                        <label className='align'>Email</label>
                                        <Field className="form-control" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" type="text" name="useremail" placeholder="Email-Address"/>
                                    </fieldset>
                                    <fieldset className='form-group '>
                                        <div className="field a1">
                                        <label className='  align'>Usertype</label>
                                        </div>
                                        <div className="a2">
                                        <div role="group" aria-labelledby="checkbox-group" >
                                            <label className='chkboxalign'>
                                            <Field type="radio" name="usertype" value="Aspirants"  />
                                                 Aspirants/Parents
                                            </label>
                                            <label className='chkboxalign'>
                                            <Field type="radio" name="usertype" value="Teachers" />
                                                Teachers
                                            </label>
                                            <label className='chkboxalign'>
                                            <Field type="radio" name="usertype" value="College" />
                                                College Students
                                            </label>
                                            <label >
                                            <Field type="radio" name="usertype" value="Admin" />
                                                Admin
                                            </label>
                                        </div>
                                        </div>
                                    </fieldset>

                                    

                                    <fieldset className="form-group usernamefield field">
                                        <label className='align'>Password</label>
                                        <Field className="form-control" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" type="text" name="password" placeholder="Password"/>
                                    </fieldset>
                                    <div className=''>
                                    <button className="btn btn-success savebtn" type="submit">Save</button>
                                    </div>
                                </Form>
                                
                            )
                        }
                    </Formik>
                    </div>
                    </div>
                    </div>
                
        )
    }
}

export default SignupComponent