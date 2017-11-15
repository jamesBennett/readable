import React from 'react';
import {connect} from 'react-redux';
import PostRoll from './PostRoll';

class PostsCategory extends React.Component {

    state = {
        posts: []
    }

    componentDidMount(){
     this.setState({posts: this.props.posts.posts.filter(post => post.category === this.props.match.params.category)})
        
    }

    componentWillReceiveProps(nextprops) {
        let filteredPosts = [];
        if(nextprops.match.params.category){
            filteredPosts = nextprops.posts.posts.filter(post => post.category === nextprops.match.params.category)
        }else {
            filteredPosts = nextprops.posts.posts;
        }
        this.setState({posts: filteredPosts})
    }

    render() {
        return(
            <div>
                <PostRoll posts={this.state.posts} />
            </div>
        )
    }
}

function mapStateToProps(posts) {
    return {
        posts
    };
}

export default connect(mapStateToProps)(PostsCategory)