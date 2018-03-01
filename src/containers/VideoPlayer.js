import React, { Component } from 'react';
import { Player, BigPlayButton, ControlBar, PlaybackRateMenuButton } from 'video-react';

import 'video-react/dist/video-react.css';
import 'video-react/styles/scss/video-react.scss';
import 'bootstrap/dist/css/bootstrap.css'

class VideoPlayer extends Component {
    constructor(props) {
        super(props);

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.load = this.load.bind(this);
        this.seek = this.seek.bind(this);
        this.changeCurrentTime = this.changeCurrentTime.bind(this);
        this.addSubtitle = this.addSubtitle.bind(this);

        this.addSubtitle(this.props.sub);
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

    addSubtitle(subtitle) {
        return () => {
            this.refs.player.addTextTrack(subtitle);
        }
    }

    render() {
        return(
            <div className="container">
                <Player
                    ref="player"
                    playsInline
                    src={this.props.src}
                    poster={this.props.cover}>
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