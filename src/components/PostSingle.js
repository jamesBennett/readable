import React, { Component } from 'react';
import {connect} from 'react-redux';
import Comments from './Comments';
import { withRouter } from 'react-router-dom';

export class PostSingle extends Component {

    state = {
        post: {}
    }

    componentDidMount(){
        this.setState( { post: this.props.posts.posts.filter(post => post.id === this.props.match.params.id)[0] } );
    }
    componentWillReceiveProps(nextprops) {
        this.setState( { post: nextprops.posts.posts.filter(post => post.id === nextprops.match.params.id)[0] } );
    }

    render(){
        if(this.state.post === undefined) {
            return null
        } 
        return (
            <div className="singlePost">
                <div className="vote">
                    Vote me up
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
                    <h5>{this.state.post.id}</h5>
                    <Comments postID={this.state.post.id} />
                </article>
            </div>
        )
    }
}

function mapStateToProps(posts) {
    return {
        posts
    };
}

export default connect(mapStateToProps)(PostSingle);
