import React, { Component } from 'react';
import ListItem from '../components/ListItem';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'

class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: []
        };

        this.getVideos('http://localhost:5000/api/videos');
    }

    getVideos(url) {
        let _this = this;
        Axios.get(url)
            .then(function (response) {
                _this.setState({videos: response.data});
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {
                        this.state.videos.map(
                            function (item, i) {
                                return(
                                    <div key={item._id} className="col-3">
                                        <ListItem img={item.info.cover_url} title={item.info.title} subtitle={item.info.year} description={item.info.description}/>
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            </div>
        )
    }
}

export default ListView