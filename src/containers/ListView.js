import React, { Component } from 'react';
import ListItem from '../components/ListItem';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'

class ListView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {
                        this.props.items.map((item, index) => {
                                return(
                                    <div key={index} onClick={() => this.props.select(item)} className="col-3" >
                                        <ListItem img={item.cover_url} title={item.title} subtitle={item.index} description={item.description}/>
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