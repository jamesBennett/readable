import React, { Component } from 'react';
import * as connector from '../utils/readableconnector';
import {votePost} from '../actions/postActions';
import {connect} from 'react-redux';
import AddIcon from 'material-ui-icons/Add';
import RemoveIcon from 'material-ui-icons/Remove';
import Button from 'material-ui/Button';

class Votescore extends Component {

    vote = (vote) => {
        connector.votePost(this.props.postID, vote).then((post) => {
            this.props.dispatch(votePost({post}));
        });
    }

    render() {
        return (
            <div className="voter">
                <Button fab color="primary" onClick={ () => {this.vote("upVote")}}>
                    +
                </ Button>
                <h1>{this.props.voteScore}</h1>
                <Button fab color="accent" onClick={ () => {this.vote("downVote")}}>
                    -
                </Button>
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