import React from 'react';
import './App.css';
import { withRouter, Route, Link, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import PostForm from './components/PostForm';
import {getAllPosts} from './utils/readableconnector';
import {getPosts} from './actions/postActions';
import CategoryList from './components/CategoryList';
import PostCategory from './components/PostsCategory';
import PostSingle from './components/PostSingle';
import ErrorPage from './components/ErrorPage';

class App extends React.Component {
  componentDidMount() {
    getAllPosts().then((posts) => {
      this.props.dispatch(getPosts({posts}))
    });
  }
  // componentWillReceiveProps() {

  // }

  render() {
    return (
      <div className="App">
        <header>
          <Link to="/"> <h1>Readable</h1> </Link>
          <Link to="/add">Add a New Post</Link>
        </header>
        <div className='main' >
          <aside>
              <CategoryList />
          </aside>
          <section>
            <Switch>
            <Route path="/404" component={ErrorPage} />
              <Route exact path="/" component={PostCategory}/>
              <Route path="/add/:id" component={PostForm}/>
              <Route path="/add" component={PostForm}/>
              <Route path="/:category/:id" component={PostSingle} />
              <Route path="/:category" component={PostCategory}/>
              
            </Switch>
          </section>
        </div>
      </div>
    );
  }
}

function mapStateToProps(posts) {
  return {
      posts
  };
}

export default withRouter(connect(mapStateToProps)(App));
