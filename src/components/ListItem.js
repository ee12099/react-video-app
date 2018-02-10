import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

class ListItem extends Component {
    render() {
        return(
            <div>
                <Card>
                    <CardImg top width="100%" src={this.props.img}/>
                    <CardBody>
                        <CardTitle>{this.props.title}</CardTitle>
                        <CardSubtitle>{this.props.subtitle}</CardSubtitle>
                        <CardText>{this.props.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default ListItem;