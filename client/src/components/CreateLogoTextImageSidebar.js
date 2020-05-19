import React, { Component } from 'react';

class CreateLogoTextImageSidebar extends Component {
    constructor() {
        super();
        this.state = {
           
        };
    }

    render() {
        let focus = this.props.focus;
        return (
            <div className="col s2"> 
                <div style={{ paddingBottom: '20px', fontSize: '17px' }}><b>Editor</b></div>
                {focus.text}
            </div>
        );
    }
}

export default CreateLogoTextImageSidebar;