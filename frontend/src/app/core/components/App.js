import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { fetchCategories } from '../../categories/actions/categories';
import PostList from '../../posts/components/PostList';
import { Route, withRouter } from 'react-router-dom';
import { fetchPosts } from '../../posts/actions/posts';
import PostForm from '../../posts/components/PostForm';
import CategoryList from '../../categories/components/CategoryList';
import Navigation from './Navigation';
import ViewPost from '../../posts/components/ViewPost';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(fetchCategories());
        this.props.dispatch(fetchPosts());
    }

    render() {
        return (
            <div className="App">
                <Navigation/>

                <div className="ui main text container">
                    <div className="ui grid">
                        <div className="five wide column">
                            <CategoryList/>
                        </div>

                        <div className="eleven wide column">
                            <Route exact path="/" component={PostList}/>

                            <Route path="/category/:category" component={PostList}/>

                            <Route path="/post/:id" component={ViewPost}/>

                            <Route path="/add-post" component={PostForm}/>

                            <Route path="/edit-post/:id" component={PostForm}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect()(App));
