import React, { Component } from 'react';
import {connect} from 'react-redux';
import serializeForm from 'form-serialize';
import {getComments, deleteComment, editComment, voteComment} from '../actions/commentActions';
import * as connector from '../utils/readableconnector';

class Comments extends Component {

    state = {
        showEditModal: false,
        toEdit: {},
        comments: []
    }

    constructor(props) {
        super(props);
        
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
    }

    showModal = (event) => {
        this.setState({toEdit: this.props.comments.filter(comment => comment.id === event.target.value)[0]} );
        this.toggleModal(true);
    }

    submitEditedComment = (event) => {
        event.preventDefault();
        const form = serializeForm(event.target, { hash: true });
        connector.updateComment(this.state.toEdit.id, Date.now(), form.body).then((comment) => {
            this.props.dispatch(editComment(comment.id, comment.timeStamp, comment.body))
            this.toggleModal(false)
        });
    }

    vote = (id, vote) => {
        connector.voteComment(id, vote).then((comment) => {
            this.props.dispatch(voteComment({comment}));
        });
    }


    render() {
        if(this.props.comments.length === 0){
            return (
                <div>no comments</div>
            );
        }
        return (
            <section className="comments">
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
                        <div className="lightBox-Wrapper">
                            <div className="lightBox">
                                <header>EDIT</header>
                                <form className="editCommentForm" onSubmit={this.submitEditedComment} > 
                                    <ul>
                                        <li>
                                            <label>Body</label>
                                            <textarea id="body" name="body" defaultValue={this.state.toEdit.body} />
                                        </li>
                                    </ul>
                                <footer>
                                    <button onClick={() => this.toggleModal(false)}>close</button>
                                    <button type='submit' >Submit</button>
                                </footer>
                                </form>
                            </div>
                        </div>
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
  