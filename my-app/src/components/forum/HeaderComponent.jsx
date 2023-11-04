// import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import AuthenticationService from './AuthenticationService.js'
// import '../../header.css'


// class HeaderComponent extends Component {
//     render() {
//         const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
//         //console.log(isUserLoggedIn);

//         return (
//             <header className=''>
//                 <nav className="navbar navbar-expand-md navbar-dark bg-dark ">
//                     <div><a href="/" className="navbar-brand">LNMIIT Counselling Forum</a></div>
//                     <ul className="navbar-nav">
//                         {isUserLoggedIn && <li><Link className="nav-link" to={`/homepage/${AuthenticationService.getLoggedInUserName()}`}>My Wall</Link></li>}
//                         {isUserLoggedIn && <li><Link className="nav-link" to="/wall"> Main Wall</Link></li>}
//                         {isUserLoggedIn && <li><Link className="nav-link" to="/add_forum"> Add Forum</Link></li>}
//                         {}
//                     </ul>
//                     <ul className="navbar-nav navbar-collapse justify-content-end">
//                         {!isUserLoggedIn && <li><Link className="nav-link" to="/signup">SignUp</Link></li>}
//                         {!isUserLoggedIn && <li><Link className="nav-link" to="/login">LogIn</Link></li>}
//                         {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
//                     </ul>
//                 </nav>
//             </header>
//         )
//     }
// }

// export default HeaderComponent

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'


class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        //console.log(isUserLoggedIn);
        let username = AuthenticationService.getLoggedInUserName()

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="/" className="navbar-brand">LNMIIT Counselling Forum</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to={`/homepage/${AuthenticationService.getLoggedInUserName()}`}>My Wall</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/wall">Main Wall</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/add_forum"> Add Forum</Link></li>}
                        {}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/signup">Signup</Link></li>}
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li><div className="nav-link"> Welcome {username}</div></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default HeaderComponent