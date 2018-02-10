import React, { Component } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselCaption,
    CarouselControl,
    CarouselIndicators,
} from 'reactstrap';
import Axios from 'axios';
import SlideItem from '../components/SlideItem';


class SlideView extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0, videos: [] };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);

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

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.state.videos.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.videos.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;
        const slides = this.state.videos.map((item, i) => {
            return (
                <CarouselItem
                    key={item._id}
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                >
                    <img src={item.info.cover_url} alt={item.info.title} />
                    {/*<CarouselCaption className="text-gray-dark text-uppercase" captionText={item.info.description} captionHeader={item.info.title} />*/}
                </CarouselItem>
            )
        });

        return (
            <div className="offset-2 col-8">
                <div className="container">
                    <Carousel
                        activeIndex={activeIndex}
                        next={this.next}
                        previous={this.previous}
                    >
                        <CarouselIndicators items={this.state.videos} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                        {slides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                    </Carousel>
                </div>
            </div>
        );
    }
}

export default SlideView;
