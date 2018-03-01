import React, { Component } from 'react';
import { Form, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { params: {}, scope: 'movies', active_btns: {movies: false, series: false}};

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.callback(this.state.scope, this.state.params);
    }

    handleTitle(e) {
        this.setState({ params: {title: e.target.value}});
    }

    handleGenre(e) {
        this.state.params.genre = e.target.value;
    }

    handleYear(e) {
        this.state.params.year = e.target.value;
    }

    render() {
        return(
            <div className="container">
                <br/>
                <div className="row">
                    <div className="col-lg-6 offset-lg-4">
                        <div className="jumbotron">
                            <Form>
                                <div className="form-inline my-2 my-lg-0">
                                    <button className={this.state.active_btns.movies ? 'btn btn-outline-success my-2 my-sm-0 active' :'btn btn-outline-success my-2 my-sm-0'}
                                            onClick={(e) => {e.preventDefault(); this.setState({ scope: 'movies', active_btns: {movies: true}})}}>Movies</button>
                                    <button className={this.state.active_btns.series ? 'btn btn-outline-success my-2 my-sm-0 active' :'btn btn-outline-success my-2 my-sm-0'}
                                            onClick={(e) => {e.preventDefault(); this.setState({ scope: 'series', active_btns: {series: true}})}} >Series</button>
                                </div>
                                <br/>
                                <FormGroup>
                                    <Input type="text" placeholder="Title" onChange={this.handleTitle.bind(this)}/>
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

export default Search;