import React from 'react';
import { Link } from 'react-router-dom';
import {getAllCategories} from '../utils/readableconnector';


class CategoryList extends React.Component {
    state = {
        categories: []
    }
    componentDidMount() {
        getAllCategories().then((categories) => {
            this.setState(categories)
        });
    }
    render() {
        return (
            <div>
                <h4>Categories</h4>
                <ul>
                    {this.state.categories.map(cat => (
                        <li key={cat.path}><Link to={`/${cat.name}`} >{cat.name}</Link></li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default CategoryList;