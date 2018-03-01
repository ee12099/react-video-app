import React, { Component } from 'react';
import { Form, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Query extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collection: '',
            query: {},
            value: ''
        };


        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(e) {
        e.preventDefault();
        this.state.query= JSON.parse(this.state.value);
        this.props.query(this.state.collection,this.state.query);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleCollection(e) {
        this.setState({ collection: e.target.value })
    }

    render() {
        return(
            <div className="container">
                <br/>
                <div className="row">
                    <div className="col-lg-6 offset-lg-4 align-content-center">
                        <div className="jumbotron text-center">
                            <Form>
                                <FormGroup>
                                    <Input type="text" placeholder="Collection" onChange={this.handleCollection.bind(this)}/>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="textarea" name="text" placeholder="Query" onChange={this.handleChange.bind(this)}/>
                                </FormGroup>
                                <div className="form-inline my-2 my-lg-0">
                                    <button onClick={this.handleClick} className="btn btn-outline-success my-2 my-sm-0">Search</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Query;