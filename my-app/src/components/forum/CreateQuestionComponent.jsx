import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'
import { Link } from 'react-router-dom';
import { Formik, Field,Form } from 'formik';
import WallDataService from '../../api/todo/WallDataService.js'
import '../../CreateQuestionComponent.css'

class CreateQuestionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

            parent_id: this.props.match.params.parent_id,
            questionname: '',
            questiondescription:''
        }

        this.onSubmit = this.onSubmit.bind(this)
        // this.validate = this.validate.bind(this)

    }

    componentDidMount() {
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
        let username = AuthenticationService.getLoggedInUserName()
        console.log(values);
        // let todo = {
        //     parent_id:this.parent_id,
        //     user_name:username,
        //     questionname: values.questionname,
        //     questiondescription:values.questiondescription
        // }

        
            WallDataService.new_question(this.state.parent_id,username,values.questionname,values.questiondescription)
                .then(() => this.props.history.push(`/parentforum/${this.state.parent_id}`))
        }

        
    

    render() {

        let {questionname,questiondescription} = this.state
        //let targetDate = this.state.targetDate

        return (
            
            <div className='bgcolorx'>
                <div className='blur'>
                <div className='borderx'>
                <h1 className='heading'>Add a new question</h1>
                <div className="container ">
                    <Formik
                        initialValues={{ questionname,questiondescription}}
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
                                        <label className='ptagx'>Question </label>
                                        <Field className="form-control" type="text" name="questionname" placeholder="Enter your Question"/>
                                    </fieldset>
                                    <fieldset className="form-group usernamefieldx">
                                        <label className='ptagx'>Question description</label>
                                        <Field className="form-control" type="text" name="questiondescription" placeholder="Add description"/>
                                    </fieldset>
                                    {/* <button type="submit">Submit</button> */}
                                    <button className="btn btn-success loginbuttonx" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div></div>
            </div></div>
        )
    }
}

export default CreateQuestionComponent