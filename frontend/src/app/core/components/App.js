import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { fetchCategories } from '../../categories/actions/categories';
import PostList from '../../posts/components/PostList';
import { Route, withRouter } from 'react-router-dom';
import { getPosts } from '../../posts/actions/posts';
import AddPost from '../../posts/components/AddPost';
import CategoryList from '../../categories/components/CategoryList';
import Navigation from './Navigation';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(fetchCategories());
        this.props.dispatch(getPosts());
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

                            <Route path="/category/:category" render={() => (
                                <PostList/>
                            )}/>

                            <Route path="/add-post" component={AddPost}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect()(App));
