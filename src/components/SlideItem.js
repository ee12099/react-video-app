import React, { Component } from 'react';
import { CarouselItem, CarouselCaption } from 'reactstrap';

class SlideItem extends Component {
    render() {
        return(
            <CarouselItem
                style="color: black"
                onExiting={this.props.onExiting}
                onExited={this.props.onExited}
            >
                <img src={this.props.cover} alt={this.props.title}/>
                <CarouselCaption captionText={this.props.description} captionHeader={this.props.title}/>
            </CarouselItem>
        )
    }
}

export default SlideItem