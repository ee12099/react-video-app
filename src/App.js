import React, { Component } from 'react';
import { Player, BigPlayButton, ControlBar, PlaybackRateMenuButton } from 'video-react';
import Axios from 'axios';
import Navbar from "./components/Navbar"
import 'bootstrap/dist/css/bootstrap.css'
import 'video-react/dist/video-react.css';
import 'video-react/styles/scss/video-react.scss';
import Synopsis from "./components/Synopsis";
import ListView from "./containers/ListView"
import SlideView from "./containers/SlideView"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video: {
                title: '',
                stream_url: '',
                download_url: '',
                poster_url: '',
                description: ''
            },
            videos: [],
            activeIndex: 0
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
                _this.setState({video: video.info, videos: response.data});
            })
            .catch(function (err) {
               console.log(err);
            });
    }




  render() {
    return (
      <div>
          <Navbar/>
          <div className="container-marketing">
              {/*<VideoPlayer
                  ref="video"
                  src={this.state.video.stream_url}
                  cover={this.state.video.cover_url}/>*/}
              <SlideView items={this.state.videos}
                         activeIndex={this.state.activeIndex}
                         onExiting={this.onExiting.bind(this)}
                         onExited={this.onExited.bind(this)}
                         next={this.next.bind(this)}
                         previous={this.previous.bind(this)}
                         goToIndex={this.goToIndex.bind(this)}
              />
              <ListView items={this.state.videos}/>
              <Synopsis
                  title={this.state.video.title}
                  description={this.state.video.description}
                  cover={this.state.video.cover_url}/>
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
              </div>
          </div>
      </div>
    );
  }
}

export default App;
