// import axios from 'axios'
// import { API_URL, JPA_API_URL } from '../../Constants'

// class WallDataService {

//     retrieveAllQuestions() 
//     {
//         //console.log('executed service')
//         return axios.get(`${JPA_API_URL}/wall`);
//     }
//     new_user(todo)
//     {
//         return axios.post(`${API_URL}/add/user`, todo);
//     }
//     addcomment(question_id,comment_deets)
//     {
//         console.log('walldataservice',comment_deets)
//         return axios.post(`${JPA_API_URL}/users/${question_id}/addcomment`, comment_deets);
//     }
//     retrievequestionsinparentforum(parent_id)
//     {
//         return axios.get(`${JPA_API_URL}/users/${parent_id}/allquestions`);
//     }
//     createsubreddit(username,subredditname)  
//     {
//         console.log('create subreddit service called')
//         return axios.post(`${JPA_API_URL}/users/add_subreddit/${username}/${subredditname}`);
//     }
//     new_question(parent_id,username,questionname,questiondescription)
//     {
//         return axios.post(`${JPA_API_URL}/users/${parent_id}/${username}/${questionname}/${questiondescription}`);
//     }
//     upvote(question_id)
//     {
//         return axios.post(`${JPA_API_URL}/users/${question_id}/upvote/`);
//     }
//     downvote(question_id)
//     {
//         return axios.post(`${JPA_API_URL}/users/${question_id}/downvote/`);
//     }
//     questioncalling(question_id) 
//     {
//         return axios.get(`${API_URL}/findquestionbyid/${question_id}`);
//     }
//     homepage(user_id)
//     {
//         return axios.get(`${JPA_API_URL}/users/${user_id}`);
//     }
   

    
// }
// export default new WallDataService()

import axios from 'axios'
import { API_URL, JPA_API_URL } from '../../Constants'

class WallDataService {

    retrieveAllQuestions() 
    {
        //console.log('executed service')
        return axios.get(`${JPA_API_URL}/wall`);
    }
    new_user(todo)
    {
        return axios.post(`${API_URL}/add/user`, todo);
    }
    addcomment(question_id,comment_deets)
    {
        console.log('walldataservice',comment_deets)
        return axios.post(`${JPA_API_URL}/users/${question_id}/addcomment`, comment_deets);
    }
    retrievequestionsinparentforum(parent_id)
    {
        return axios.get(`${JPA_API_URL}/users/${parent_id}/allquestions`);
    }
    createsubreddit(username,subredditname)  
    {
        console.log('create subreddit service called')
        return axios.post(`${JPA_API_URL}/users/add_subreddit/${username}/${subredditname}`);
    }
    new_question(parent_id,username,questionname,questiondescription)
    {
        return axios.post(`${JPA_API_URL}/users/${parent_id}/${username}/${questionname}/${questiondescription}`);
    }
    upvote(question_id)
    {
        return axios.post(`${JPA_API_URL}/users/${question_id}/upvote/`);
    }
    downvote(question_id)
    {
        return axios.post(`${JPA_API_URL}/users/${question_id}/downvote/`);
    }
    questioncalling(question_id) 
    {
        return axios.get(`${API_URL}/findquestionbyid/${question_id}`);
    }
    homepage(user_id)
    {
        return axios.get(`${JPA_API_URL}/users/${user_id}`);
    }
    allsubreddit()
    {
        return axios.get(`${API_URL}/allsubreddit`);
    }
    finduser(userid)
    {
        return axios.get(`${API_URL}/finduserbyusername/${userid}`);
    }
   

    
}
export default new WallDataService()