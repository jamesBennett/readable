import React from 'react';
// import { withRouter, Redirect } from 'react-router-dom'; 
import { addPost } from '../actions/postActions';
import serializeForm from 'form-serialize';
import rid from 'readable-id';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as connector from '../utils/readableconnector';

class PostForm extends React.Component {
    state = {
        categories: [],
        fireRedirect: false,
        postId: null,
        postCategory: null
    }

    componentDidMount() {
        connector.getAllCategories().then((data) => {
            this.setState(data)
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const form = serializeForm(event.target, { hash: true });
        const {category, title, body, author} = form;
        connector.addPost(
            rid(), 
            Date.now(),
            title,
            body,
            author,
            category
        ).then((post) => {
            this.props.dispatch(addPost({post}));
        })   
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='title'>title</label>
                <input id='title' name='title' type="text"/>
                <label htmlFor='author'>Author</label>
                <input id='author' name='author' type="text"/>
                <label htmlFor='category' >Category</label>
                <select id='category' name='category' >
                    {this.state.categories.map(cat => (
                        <option key={cat.path} >{cat.name}</option>
                    ))}
                </select>
                <label htmlFor='body'>Body</label>
                <textarea id='body' name='body'/>    
                <input type='submit' value='Submit' />
            </form>
        )
    }
}

export default withRouter(connect(null)(PostForm));