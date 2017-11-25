import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { fetchCategories } from '../../categories/actions/categories';
import Posts from '../../posts/containers/Posts';
import { Route, Link, withRouter } from 'react-router-dom';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(fetchCategories());
    }

    render() {
        const {categories} = this.props;

        return (
            <div className="App">
                <div className="ui fixed inverted menu">
                    <div className="ui container">
                        <Link to='/' className='header item'>
                            Readable
                        </Link>
                        <Link to='/add-post' className='item'>
                            Add post
                        </Link>
                    </div>
                </div>

                <div className="ui main text container">
                    <div className="ui grid">
                        <div className="five wide column">
                            <div className="ui segment">
                                <h1 className="ui header">Categories</h1>
                                <div className="ui relaxed divided list">
                                    {Object.entries(categories).map((category) => (
                                        <div className="item" key={category[1].name}>
                                            {category[1].name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="eleven wide column">
                            <Route exact path="/" render={() => (
                                <h1>Home</h1>
                            )}/>

                            <Route path="/add-post" render={() => (
                                <Posts/>
                            )}/>
                        </div>
                    </div>
                </div>




            </div>
        );
    }
}

function mapStateToProps({categories, posts}) {
    return {
        categories,
        posts
    };
}

export default withRouter(connect(
    mapStateToProps
)(App));
