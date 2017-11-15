import React, { Component } from 'react';
import * as connector from '../utils/readableconnector';
import {votePost} from '../actions/postActions';
import {connect} from 'react-redux';

class Votescore extends Component {

    vote = (vote) => {
        connector.votePost(this.props.postID, vote).then((post) => {
            this.props.dispatch(votePost({post}));
        });
    }

    render() {
        return (
            <div>
                <a href="#" onClick={ () => {this.vote("upVote")}}>Up</a>
                <h1>{this.props.voteScore}</h1>
                <a href="#" onClick={ () => {this.vote("downVote")}}>Down</a>
            </div>
        )
    }
}

function mapStateToProps(posts) {
    return {
        posts
    };
  }

export default connect(mapStateToProps)(Votescore);