import React, { Component } from 'react';
import Axios from 'axios';

import 'video-react/dist/video-react.css';
import 'video-react/styles/scss/video-react.scss';

import Header from "./components/Header"
import VideoPlayer from './containers/VideoPlayer';
import Search from './components/Search';
import Synopsis from "./components/Synopsis";
import ListView from "./containers/ListView";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: false,
            search: true,
            list: false,
            synopsis: false,
            player: false,
            scope: '',
            collection: [],
            object: {}
        };

        this.searchSeries = this.searchSeries.bind(this);
        this.searchMovies = this.searchMovies.bind(this);
        this.queryDB = this.queryDB.bind(this);
        this.select = this.select.bind(this);
        this.search = this.search.bind(this);
        this.header = this.header.bind(this);
    }
    /*
    randomVideo() {
        let _this = this;
        Axios.get(`http://localhost:5000/api/videos`)
            .then(function (response) {
                const videosLength = response.data.length;
                const randomNumber = Math.floor((Math.random() * videosLength) + 1) - 1;
                const video = response.data[randomNumber];
                _this.setState({video: video.info});
            })
            .catch(function (err) {
                console.log(err);
            });
    }
    */

    searchSeries(params) {
        let _this = this;
        Axios.get(`http://localhost:5000/api/series`, {
            params: params
        })
        .then(function (response) {
            _this.setState({scope: 'series', collection: response.data, selected: false, search: false, list:true, synopsis: false, player: false});
        })
        .catch(function (err) {
            console.log(err);
        });
    }

    searchMovies(params) {
        let _this = this;
        Axios.get(`http://localhost:5000/api/movies`, {
            params: params
        })
            .then(function (response) {
                _this.setState({scope: 'movies', collection: response.data, selected: false, search: false, list: true, synopsis: false, player: false});
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    queryDB(collection, query) {
        let _this = this;
        const data = {
            collection: collection,
            query: query
        };
        Axios.post(`http://localhost:5000/api/db/search`, data)
        .then(function (response) {
            _this.setState({collection: response.data, selected: false, search: false, list: true, player: false, synopsis: false});
        })
        .catch(function (err) {
            console.log(err);
        });
    }

    select(object) {
        console.log(object);
        if (this.state.scope === 'movies' || this.state.scope === 'episodes') {
            // Next scope video
            this.setState({object: object, selected: true, list: false, synopsis: true, player: true});
        }
        if (this.state.scope === 'series' || this.state.scope === 'seasons') {
            if (this.state.scope === 'series') {
                // Next scope seasons
                this.setState({scope: 'seasons', object: object, collection: object.seasons});
            }
            if (this.state.scope === 'seasons') {
                // Next scope series
                this.setState({scope: 'episodes', object: object, collection: object.episodes});
            }
            this.setState({synopsis: true, list: true, player: false});
        }
    }

    search(scope, params) {
        if (scope === 'movies') {
            this.searchMovies(params);
        }
        if (scope === 'series') {
            this.searchSeries(params);
        }
    }

    header(searchBtnValue) {
        this.setState({ search: searchBtnValue });
    }



    render() {
        let search = null;
        if (this.state.search) {
            search = <Search callback={this.search}/>;

        }
        let list = null;
        if (this.state.list) {
            list = <ListView items={this.state.collection} select={this.select}/>;

        }
        let synopsis = null;
        if (this.state.synopsis) {
            synopsis = <Synopsis cover={this.state.object.cover_url} title={this.state.object.title} description={this.state.object.description}/>;

        }
        let player = null;
        if (this.state.player) {
            player = <VideoPlayer src={this.state.object.video.urls.stream_url} cover={this.state.object.cover_url}/>;
        }

        return(
            <div>
                <Header search={this.state.search} values={this.header}/>
                {search}
                {synopsis}
                {list}
                {player}
            </div>
        )
    }
}

export default App;
