import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { fetchCategories } from './app/categories/actions/categories';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(fetchCategories());
    }

    render() {
        const { categories } = this.props;

        return (
            <div className="App">
                <h1>Readable</h1>

                <ul>
                    { Object.entries(categories).map((category) => (
                        <li key={category[1].name}>
                            {category[1].name}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

function mapStateToProps({ categories }) {
    return {
        categories
    };
}

export default connect(
    mapStateToProps
)(App);
