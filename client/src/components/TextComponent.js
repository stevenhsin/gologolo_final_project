import React, { Component } from 'react';
import { Rnd } from 'react-rnd';

class TextComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
           text: "Sample Text",
           color: "#FFFFFF",
           fontSize: 40,
           top: 0,
           left: 0
        };
    }

    render() {
        return (
            <div> {this.state.text} </div>
        );
    }
}

export default TextComponent;