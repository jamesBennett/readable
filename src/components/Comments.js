import React, { Component } from 'react';
import {connect} from 'react-redux';
import serializeForm from 'form-serialize';
import {getComments, deleteComment, editComment, voteComment, addComment} from '../actions/commentActions';
import * as connector from '../utils/readableconnector';
import rid from 'readable-id';
import Button from 'material-ui/Button';

class Comments extends Component {

    state = {
        showEditModal: false,
        toEdit: {},
        comments: [],
        addNewComment: false
    }

    componentDidMount() {
        connector.getPostComments(this.props.postID).then((comments) => {
            comments = comments.filter(comment => !comment.deleted).sort((a, b) => {
                return a.voteScore < b.voteScore;
            });
            this.props.dispatch(getComments({comments}))
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState(
            {
                comments: nextProps.comments
                    .filter(comment => !comment.deleted).sort((a, b) => {
                        return a.voteScore < b.voteScore;
                    }
                )
            }
        );
    }

    deleteComment = (event) => {
        connector.deleteComment(event.target.value).then((comment) => {
            this.props.dispatch(deleteComment(comment))
        });
    }

    
    toggleModal = (showEditModal) => {
        this.setState({showEditModal})
        if(!showEditModal) {
            this.setState({
                showEditModal: false,
                addNewComment: false
            })
        }
    }

    showModal = (event) => {
        this.setState({toEdit: this.props.comments.filter(comment => comment.id === event.target.value)[0]} );
        this.toggleModal(true);
    }

    submitEditedComment = (event) => {
        event.preventDefault();
        const form = serializeForm(event.target, { hash: true });
        if(form.author){
            let id = rid();
            connector.addComment(
                id,
                Date.now(),
                form.body,
                form.author,
                this.props.postID
            ).then(comment => {
                this.props.dispatch(addComment({comment}));
                this.toggleModal(false)
            })
        } else {
            connector.updateComment(this.state.toEdit.id, Date.now(), form.body).then((comment) => {
                this.props.dispatch(editComment(comment.id, comment.timeStamp, comment.body))
                this.toggleModal(false)
            });
        }
        
    }

    vote = (id, vote) => {
        connector.voteComment(id, vote).then((comment) => {
            this.props.dispatch(voteComment({comment}));
        });
    }

    addNewLightBox = () => {
        this.setState({
            showEditModal: true,
            addNewComment: true,
        })
    }

    renderLightBox = () => {
        return (
            <div className="lightBox-Wrapper">
            <div className="lightBox">
                <header>EDIT</header>
                <form className="editCommentForm" onSubmit={this.submitEditedComment} > 
                    <ul>
                        {
                            this.state.addNewComment ?
                                <li>
                                    <label htmlFor="author">Author</label>
                                    <input id="author" type="text" name="author" />
                                </li>
                                :
                                null
                        }
                        
                        <li>
                            <label>Body</label>
                            <textarea id="body" name="body" defaultValue={this.state.toEdit.body} />
                        </li>
                    </ul>
                <footer>
                    <Button raised color="accent" onClick={() => this.toggleModal(false)}>close</Button>
                    <Button raised color="primary" type='submit' >Submit</Button>
                </footer>
                </form>
            </div>
        </div>
        )
    }

    render() {
        if(this.props.comments.length === 0){
            return (
                <div>
                <a href="#" onClick={this.addNewLightBox}>Add new comment</a>
                {
                    this.state.showEditModal 
                        ?
                            this.renderLightBox()
                        :
                            null 
                }
                </div>
                
            );
        }
        return (
            <section className="comments">
                {
                    <h3>With {this.state.comments.length} comments</h3>
                }
                <Button color="primary" onClick={this.addNewLightBox}>Add new comment</Button>
                {
                    this.state.comments.filter(comment => !comment.deleted).map(comment => (
                        <div className="comment" key={comment.id }>
                           <article>
                                <p>{comment.body}</p>
                                <p className="comment-author">- {comment.author}</p>
                                <aside>
                                    <a href="#" onClick={ () => this.vote(comment.id, 'upVote') } >up</a>
                                    {comment.voteScore}
                                    <a href="#" onClick={ () => this.vote(comment.id, 'downVote') } >down</a>
                                </aside>
                                <footer>
                                    <button onClick={ this.showModal } value={comment.id}>Edit</button>  
                                    <button onClick={ this.deleteComment } value={comment.id} >Delete</button>  
                                </footer>
                           </article>
                        </div>
                    ))
                }
                {
                    this.state.showEditModal 
                        ?
                            this.renderLightBox()
                        :
                            null 
                }
            </section>
        )
        
    }
}

function mapStateToProps ({ comments }) {
    return {
      comments
    }
}

  export default connect(mapStateToProps)(Comments);
  