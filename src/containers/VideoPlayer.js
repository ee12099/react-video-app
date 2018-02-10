import React, { Component } from 'react';
import Axios from 'axios';
import { Player, BigPlayButton, ControlBar, PlaybackRateMenuButton } from 'video-react';

import 'video-react/dist/video-react.css';
import 'video-react/styles/scss/video-react.scss';
import 'bootstrap/dist/css/bootstrap.css'

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video: {
                title: '',
                stream_url: '',
                download_url: '',
                poster_url: '',
                description: ''
            }
        };
        this.randomVideo = this.randomVideo.bind(this);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.load = this.load.bind(this);
        this.seek = this.seek.bind(this);
        this.changeCurrentTime = this.changeCurrentTime.bind(this);

        this.randomVideo();
    }

    componentDidMount() {
        // subscribe state change
        this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
    }

    handleStateChange(state, prevState) {
        // copy player state to this component's state
        this.setState({
            player: state,
            currentTime: state.currentTime
        });
    }

    play() {
        this.refs.player.play();
    }

    pause() {
        this.refs.player.pause();
    }

    load() {
        this.refs.player.load();
    }

    changeCurrentTime(seconds) {
        return () => {
            const { player } = this.refs.getState();
            const currentTime = player.currentTime;
            this.refs.player.seek(currentTime + seconds);
        }
    }

    seek(seconds) {
        return () => {
            this.refs.player.seek(seconds);
        }
    }

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


    render() {
        return(
            <div className="container">
                <Player
                    ref="player"
                    playsInline
                    src={this.state.video.stream_url}
                    poster={this.state.video.cover_url}>
                    <BigPlayButton position="center"/>
                    <ControlBar autoHide={false}>
                        <PlaybackRateMenuButton
                            rates={[5, 3, 1.5, 1, 0.5, 0.1]}
                            order={7.1}
                        />
                    </ControlBar>
                </Player>
            </div>)
    }
}

export default VideoPlayer