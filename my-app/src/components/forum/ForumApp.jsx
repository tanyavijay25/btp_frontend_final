import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'

import ErrorComponent from './ErrorComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import SignupComponent from './SignupComponent';
import CreateQuestionComponent from './CreateQuestionComponent';
import CreateSubredditComponent from './CreateSubredditComponent';
import QuestionComponent from './QuestionComponent';
import HomepageComponent from './HomepageComponent';
import AdminHomePageComponent from './AdminHomePageComponent.jsx'
import WallComponent from './WallComponent';
import ParentForumComponent from './ParentForumComponent';


class ForumApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <>
                        <HeaderComponent/>
                        <Switch>
                            
                            <Route path="/" exact component={WallComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <Route path="/signup" component={SignupComponent}/>
                            {<Route path="/adminloginhomepage/:id" component={AdminHomePageComponent}/>}
                            { <Route path="/wall" component={WallComponent}/> }
                            <AuthenticatedRoute path="/:parent_id/addquestion" component={CreateQuestionComponent}/>
                            <AuthenticatedRoute path="/add_forum" component={CreateSubredditComponent}/>
                            { <Route path="/parentforum/:id" component={ParentForumComponent}/> }
                           { <Route path="/question/:id" component={QuestionComponent}/>}
                            <Route path="/homepage/:id" component={HomepageComponent}/>
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                            
                            <Route component={ErrorComponent}/>
                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>
                {/*<LoginComponent/>
                <WelcomeComponent/>*/}
            </div>
        )
    }
}

export default ForumApp