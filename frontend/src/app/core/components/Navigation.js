import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Navigation extends Component {
    render() {
        return (
            <div className="ui fixed inverted menu">
                <div className="ui container">
                    <Link to='/' className='header item'>
                        <i className="icon comment outline"></i>
                        Readable
                    </Link>
                    <Link to='/' className='item'>
                        Home
                    </Link>
                    <Link to='/add-post' className='item'>
                        Add post
                    </Link>
                </div>
            </div>
        );
    }
}

export default withRouter(Navigation);
