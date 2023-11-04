import React, { Component } from 'react'
import "../../MainPage.css"


class MainPage extends Component {

    constructor(props) {
        super(props)
        console.log('constructor')
        console.log('came here randi')
        this.state = {
            parent_id:this.props.match.params.id,
            Wallmodels: [],
            a:''
        }
        this.mywallclicked =   this.mywallclicked.bind(this)
        this.signupclicked =  this.signupclicked.bind(this)
        this.mainwallclicked =   this.mainwallclicked.bind(this)
        this.Addforumsclicked = this.Addforumsclicked.bind(this)
       
    }

    mywallclicked()
    {
        this.props.history.push(  "/login")

    }

    signupclicked()
    {
        this.props.history.push("/signup")
    }
    mainwallclicked()
    {
        this.props.history.push("/wall")
    }
    
    Addforumsclicked()
    {
        this.props.history.push("/add_forum")
    }

    render()
    {
        return(
                        <div>
                <body>
                <div class="large rise c1">
                        <h1>LNMIIT Counselling Forum</h1>
                    </div>
                    <div class="buttons-containerr space ">
                        <button class="button-arounderr bg1" onClick={this.signupclicked}>SignUp/LogIn</button>
                    </div>
                    <div class="buttons-containerr space2 ">
                        <button class="button-arounderr bg2" onClick={this.mywallclicked}>My Wall</button>
                    </div>
                    <div class="buttons-containerr space3">
                        <button class="button-arounderr bg3"onClick={this.mainwallclicked}>Main wall</button>
                    </div>
                    <div class="buttons-containerr space4 ">
                        <button class="button-arounderr bg4"onClick={this.Addforumsclicked}> Add Forums</button>
                    </div>
                    </body>
            </div>

        )
      
    }

}
export default MainPage