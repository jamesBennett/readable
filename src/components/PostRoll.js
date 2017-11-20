import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Votescore from '../components/VoteScore';
import Button from 'material-ui/Button';
import {connect} from 'react-redux';
import {deletePost} from '../actions/postActions';
import * as connector from '../utils/readableconnector';
import { withRouter } from 'react-router-dom';

export class PostRoll extends Component {
    state ={
        posts: []
    }
    componentWillReceiveProps(nextProps) {
        const {posts, match} = nextProps;
        let nextPosts = [];
        if(!match.params.category){
            nextPosts = posts.posts.filter(post => post.deleted !== true)
            .sort( (a, b) => {
                return a.voteScore < b.voteScore;
            }); 
        }else {
            nextPosts = posts.posts
                .filter(post => post.category === match.params.category )
                .filter(post => post.deleted !== true)
                .sort( (a, b) => {
                    return a.voteScore < b.voteScore;
                }); 
        }

        this.setState({posts: nextPosts})
    }

    changeSort = (sortby) => {
        let posts = this.state.posts.sort( (a,b) => {
            return a[sortby] < b[sortby];
        });
        this.setState({posts})
    }

    deletePost = (id) => {
        connector.deletePost(id).then((post) => {
            this.props.dispatch(deletePost(post));
        })
    }

    render() {
        if(this.state.posts.length == 0) {
            return <h1>No Posts where found</h1>
        }
        return (
            <div>
                <label>Sort by</label>
                <select onChange={event => this.changeSort(event.target.value)}>
                    <option value="voteScore">vote score</option>
                    <option value="timestamp">timestamp</option>
                    <option value="commentCount">Comment count</option>
                </select>
               {this.state !== null ? this.state.posts.map((post, key) => (
                   <div key={key}> 
                       <h4>AUTHOR: {post.author}</h4>
                       <div>TITLE: {post.title}</div>
                        <Votescore postID={post.id} voteScore={post.voteScore}  />
                       <Link to={`/${post.category}/${post.id}`} >
                        <Button raised color="primary" >Full Post</Button></Link>
                        <footer>
                            <Link to={`/add/${post.id}`} >
                                <Button raised color="primary" >Edit</Button>
                            </Link>
                            <Button raised color="accent" onClick={() => {this.deletePost(post.id)}} >DELETE</Button>
                        </footer>
                   </div>
               )) : null}
            </div>
        )
    }
}

function mapStateToProps(posts) {
    return {
        posts
    };
}

export default withRouter(connect(mapStateToProps)(PostRoll));
