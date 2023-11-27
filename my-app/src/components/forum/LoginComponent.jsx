import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'
import WallDataService from '../../api/todo/WallDataService.js'
import "../../LoginComponent.css"

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
  
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
        this.adminLoginClicked=this.adminLoginClicked.bind(this)
    }

    handleChange(event) {
        //console.log(this.state);
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    loginClicked() {
        WallDataService.findBannedUser(this.state.username)
            .then((response) => {
                if(response.data===0){
                    AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                console.log(response)
                if(response.data===1)
                {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username)
                this.props.history.push(`/homepage/${this.state.username}`)
                }
                else
                {
                    this.setState({ showSuccessMessage: false })
                    this.setState({ hasLoginFailed: true })
                }
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })
                }
                else{
                    this.setState({ showSuccessMessage: false })
                    this.setState({ hasLoginFailed: true })
                    alert("This account has been blocked.")
                    window.location.reload();
                }
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })

    }
    adminLoginClicked() {
        
        AuthenticationService
            .executeJwtAuthenticationServiceAdmin(this.state.username, this.state.password)
            .then((response) => {
                console.log(response)
                if(response.data===1)
                {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username)
                this.props.history.push(`/adminloginhomepage/${this.state.username}`)
                }
                else
                {
                    this.setState({ showSuccessMessage: false })
                    this.setState({ hasLoginFailed: true })
                }
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })

    }
    

    render() {
        return (

            <div className='bgcolor '>
            <div className='border' >
                <h1 className='h1heading '>User Login</h1>
                <div className="container opbhaiya tanya ">
                    {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                    {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}
                    <div>
                    <div className='usernamefield'>
                        <div className='ptag'>
                        <p >Username</p></div>
                        <input  type="text" name="username"  placeholder="User Name" value={this.state.username} onChange={this.handleChange} /></div>
                        
                    <div className='passwordfield'>
                        <p className='ptag'>Password</p>
                        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} /></div>
                    <div ><button className="btn btn-success loginbutton" onClick={this.loginClicked}>Login</button></div>
                    <div ><button className="btn btn-success loginbutton" onClick={this.adminLoginClicked}>Admin Login</button></div>
                    </div>
                </div>
            </div>
            </div>
        )
    }

}

export default LoginComponent