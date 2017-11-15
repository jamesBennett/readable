import {
    GET_POSTS,
    ADD_POST
  } from '../actions/postActions';

function posts (state = [], action) {
    switch(action.type){
        case GET_POSTS:
            return action.posts
        case ADD_POST:
            const { post } = action;
            return [
                ...state,
                {
                    id: post.id,
                    timestamp: post.timestamp,
                    title: post.title,
                    author: post.author,
                    body: post.body,
                    category: post.category,
                    voteScore: post.voteScore,
                    deleted: post.deleted
                }
            ]
    }
}