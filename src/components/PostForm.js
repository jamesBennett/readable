import React from 'react';
// import { withRouter, Redirect } from 'react-router-dom'; 
import { addPost, editPost } from '../actions/postActions';
import serializeForm from 'form-serialize';
import rid from 'readable-id';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import * as connector from '../utils/readableconnector';

class PostForm extends React.Component {
    state = {
        categories: [],
        fireRedirect: false,
        id: null,
        postCategory: null,
        author: '',
        title: '',
        category: '',
        body: '',
        isEdit: false,
        doRedirect: false
    }

    componentDidMount() {
        connector.getAllCategories().then((data) => {
            this.setState(data)
        });
        if(this.props.match.params.id){
            connector.getPost(this.props.match.params.id).then(post => {
                this.setState({
                    author: post.author,
                    title: post.title,
                    category: post.category,
                    body: post.body,
                    isEdit: true,
                    id: post.id
                })
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const form = serializeForm(event.target, { hash: true });
        const {category, title, body, author} = form;
        if(this.state.isEdit){
            connector.updatePost(
                this.state.id,
                this.state.title,
                this.state.body
            ).then(post => {
                this.props.dispatch(editPost({post}))
                this.setState({doRedirect: true})
            });
        }else {
            let id = rid();
            this.setState({
                id: id,
                category: category
            })
            connector.addPost(
                id, 
                Date.now(),
                title,
                body,
                author,
                category
            ).then((post) => {
                this.props.dispatch(addPost({post}));
                this.setState({doRedirect: true})
            })   
        }
        
    }

    handleTitleChange = (event) => {
        this.setState({title: event.target.value})
    }
    handleAuthorChange = (event) => {
        this.setState({author: event.target.value})
    }
    handleBodyChange = (event) => {
        this.setState({body: event.target.value})
    }
    handleCategoryChange = (event) => {
        this.setState({category: event.target.value})
    }

    render() {
        
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='title'>title</label>
                <input id='title' name='title' type="text" value={this.state.title} onChange={this.handleTitleChange}/>
                <label htmlFor='author'>Author</label>
                <input id='author' name='author' type="text" disabled={this.state.isEdit} value={this.state.author} onChange={this.handleAuthorChange}/>
                <label htmlFor='category' >Category</label>
                <select id='category' name='category' value={this.state.category} onChange={this.handleCategoryChange}>
                    {this.state.categories.map(cat => (
                        <option key={cat.path} value={cat.name} >{cat.name}</option>
                    ))}
                </select>
                <label htmlFor='body'>Body</label>
                <textarea id='body' name='body' value={this.state.body} onChange={this.handleBodyChange}/>    
                <input type='submit' value='Submit' />
                {this.state.doRedirect
                    ?
                     <Redirect to={`/${this.state.category}/${this.state.id}`}  />
                    :
                    null
                }
            </form>
        )
    }
}

export default withRouter(connect(null)(PostForm));