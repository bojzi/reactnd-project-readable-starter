import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';

class CategoryList extends Component {
    render() {
        const {categories} = this.props;

        return (
            <div className="ui segment">
                <h1 className="ui header">Categories</h1>
                <div className="ui relaxed divided list">
                    {Object.entries(categories).map((category) => (
                        <div className="item" key={category[1].name}>
                            <Link to={'/category/' + category[1].path}>
                                {category[1].name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

function mapStateToProps({categories}) {
    return {
        categories
    };
}

export default withRouter(connect(
    mapStateToProps
)(CategoryList));
