import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
export class PostRoll extends Component {
    componentWillReceiveProps(nextProps) {
        let posts = nextProps.posts.filter(post => post.deleted !== true).sort( (a, b) => {
            return a.voteScore < b.voteScore;
        });
        this.setState({posts})
    }

    changeSort = (sortby) => {
        let posts = this.state.posts.sort( (a,b) => {
            return a[sortby] < b[sortby];
        });
        this.setState({posts})
    }
    render() {
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
                       <Link to={`/${post.category}/${post.id}`} >Full Post</Link>
                   </div>
               )) : null}
            </div>
        )
    }
}

export default PostRoll;
