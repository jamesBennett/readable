import React, { Component } from 'react';
import {connect} from 'react-redux';
import Comments from './Comments';
import { withRouter, Redirect } from 'react-router-dom';
import Votescore from '../components/VoteScore';
import {getPost, deletePost} from '../actions/postActions';
import * as connector from '../utils/readableconnector';

export class PostSingle extends Component {

    state = {
        post: {},
        redirect: false
    }

    componentDidMount() {
        connector.getPost(this.props.match.params.id).then((post) => {
            this.props.dispatch(getPost({post}));
        });
      }

    componentWillReceiveProps(nextProps) {
       this.setState({post: nextProps.posts.posts.filter(post => post.id === nextProps.match.params.id)[0]})
    }

    deletePost = () => {
        connector.deletePost(this.state.post.id).then((post) => {
            console.log(post)
            this.props.dispatch(deletePost(post));
        })
        this.setState({redirect: true})
    }

    render(){
        if(this.state.post === undefined) {
            return null
        } 
        return (
            <div className="singlePost">
                <div className="vote">
                    <Votescore postID={this.state.post.id} voteScore={this.state.post.voteScore}  />
                </div>
                <article>
                    <h4>
                        {this.state.post.title}
                    </h4>
                    <p>
                        {this.state.post.body}
                    </p>
                    <p>
                        author, {this.state.post.author}
                    </p>
                    <Comments postID={this.props.match.params.id} />
                </article>
                <footer>
                    <a href="#" >EDIT</a>
                    <a href="#" onClick={this.deletePost} >DELETE</a>
                </footer>
                {
                    this.state.redirect
                    ?
                    <Redirect to="/" />
                    :
                    null
                }
            </div>
        )
    }
}

function mapStateToProps(posts) {
    return {
        posts
    };
}

export default withRouter(connect(mapStateToProps)(PostSingle));
