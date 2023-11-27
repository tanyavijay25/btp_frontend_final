import axios from 'axios'
import { JPA_API_URL } from '../../Constants'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

    executeJwtAuthenticationService(username, password) {
        return axios.get(`${JPA_API_URL}/authenticate/${username}/${password}`)
    }
    executeJwtAuthenticationServiceAdmin(username, password) {
        return axios.get(`${JPA_API_URL}/AdminAuthenticate/${username}/${password}`)
    }

    registerSuccessfulLoginForJwt(username) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        //this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    // createJWTToken(token) {
    //     return 'Bearer ' + token
    // }


    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    
}

export default new AuthenticationService()