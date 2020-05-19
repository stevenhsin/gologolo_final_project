import React, { Component } from 'react';
import { Rnd } from 'react-rnd';

class ImageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
           url: this.state.url,
           height: 250,
           width: 250,
           top: 0,
           left: 0
        };
    }

    render() {
        return (
            <div> </div>
        );
    }
}

export default ImageComponent;