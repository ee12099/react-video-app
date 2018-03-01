import React, { Component } from 'react';
import Synopsis from '../components/Synopsis';

class SynopsisView extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div>
                {
                    this.props.items.map((item, index) => {
                        return(
                            <div key={index} onClick={() => this.props.select(item)}>
                                <Synopsis cover={item.cover_url} title={item.title} description={item.description} />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default SynopsisView;