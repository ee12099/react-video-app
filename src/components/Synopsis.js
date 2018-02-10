import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'

class Synopsis extends Component {
    render() {
        return (
            <div className="container">
                <div className="row featurette">
                    <div className="col-md-7 text-center">
                        <h2 className="featurette-heading">{this.props.title}</h2>
                        <p className="lead">{this.props.description}</p>
                    </div>
                    <div className="col-md-5">
                        <img className="featurette-image img-fluid mx-auto" src={this.props.cover} alt=""/>
                    </div>
                </div>
                <hr className="featurette-divider"/>
            </div>

        )
    }
}

export default Synopsis