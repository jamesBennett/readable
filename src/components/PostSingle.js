import React, { Component } from 'react';
import {connect} from 'react-redux';
import Comments from './Comments';
import { withRouter, Redirect, Link } from 'react-router-dom';
import Votescore from '../components/VoteScore';
import {getPost, deletePost} from '../actions/postActions';
import * as connector from '../utils/readableconnector';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

export class PostSingle extends Component {

    state = {
        post: {},
        redirect: false
    }

    componentWillReceiveProps(nextProps) {
        const  { posts, match } = nextProps;
       this.setState({post: posts.posts.filter(post => post.id === match.params.id)[0]})
    }

    deletePost = () => {
        connector.deletePost(this.state.post.id).then((post) => {
            this.props.dispatch(deletePost(post));
        })
        this.setState({redirect: true})
    }

    render(){
        if( this.state.post === undefined) {
            return <h1>POST NOT FOUND</h1>
        } 
        return (
            <Grid container justify="center" spacing={24} className="singlePost">
                <Grid item className="vote" md={2}>
                    <Votescore postID={this.state.post.id} voteScore={this.state.post.voteScore}  />
                </Grid>
                <Grid item md={8}>
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
                </Grid>
                <Grid item md={8}>
                    <footer>
                        <Link to={`/add/${this.state.post.id}`} >
                            <Button raised color="primary" >Edit</Button>
                        </Link>
                        <Button raised color="accent" onClick={this.deletePost} >DELETE</Button>
                    </footer>
                </Grid>
                {
                    this.state.redirect
                    ?
                    <Redirect to="/" />
                    :
                    null
                }
            </Grid>
        )
    }
}

function mapStateToProps(posts) {
    return {
        posts
    };
}

export default withRouter(connect(mapStateToProps)(PostSingle));
