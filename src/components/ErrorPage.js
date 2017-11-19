import React from 'react';
import { Link } from 'react-router-dom';

class ErrorPage extends React.Component {
    render() {
        return (
            <div className="error-page-wrap">
                <article className="error-page gradient">
                    <hgroup>
                        <h1>404</h1>
                        <h2>oops! page not found</h2>
                    </hgroup>
                    <Link to="/" >Home</Link>
                </article>
            </div>
        )
    }
}

export default ErrorPage;