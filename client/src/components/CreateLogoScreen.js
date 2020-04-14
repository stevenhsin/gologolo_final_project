import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import { parse } from 'graphql';

const ADD_LOGO = gql`
    mutation AddLogo(
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!) {
        addLogo(
            text: $text,
            color: $color,
            fontSize: $fontSize,
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            borderRadius: $borderRadius,
            borderWidth: $borderWidth,
            padding: $padding,
            margin: $margin ){
            _id
        }
    }
`;

class CreateLogoScreen extends Component {
    constructor() {
        super();
        this.state = {
            text: "goLogolo Logo",
            color: "#5870de",
            fontSize: 40,
            backgroundColor: "#e3bcef",
            borderColor: "#8272b1",
            borderRadius: 30,
            borderWidth: 40,
            padding: 25,
            margin: 50
        };
        //this.handleChange = this.handleChange.bind(this);
    }

    handleTextChange = (event) => {
        console.log("handleTextChange " + event.target.value);
        this.setState({ text: event.target.value });
        if (event.target.value.trim() !== "") {
            document.getElementById("asdasdasdada").style.display = 'none';
        } else {
            document.getElementById("asdasdasdada").style.display = '';
        }
    }

    handleColorChange = (event) => {
        console.log("handleColorChange " + event.target.value);
        this.setState({ color: event.target.value});
    }

    handleFontSizeChange = (event) => {
        console.log("handleFontSizeChange " + event.target.value);
        this.setState({ fontSize: event.target.value});
    }

    handleBackgroundColorChange = (event) => {
        console.log("handleBackgroundColorChange " + event.target.value);
        this.setState({ backgroundColor: event.target.value});
    }

    handleBorderColorChange = (event) => {
        console.log("handleBorderColorChange " + event.target.value);
        this.setState({ borderColor: event.target.value});
    }

    handleBorderRadiusChange = (event) => {
        console.log("handleBorderRadius " + event.target.value);
        this.setState({ borderRadius: event.target.value});
    }

    handleBorderWidthChange = (event) => {
        console.log("handleBorderWidthChange " + event.target.value);
        this.setState({ borderWidth: event.target.value});
    }

    handlePaddingChange = (event) => {
        console.log("handlePaddingChange " + event.target.value);
        this.setState({ padding: event.target.value});
    }

    handleMarginChange = (event) => {
        console.log("handleMarginChange " + event.target.value);
        this.setState({ margin: event.target.value});
    }

    handleSubmit = (event) => {
        if (this.state.text.trim() === "") {
            event.preventDefault();
            document.getElementById("asdasdasdada").style.display = '';
        }
    }

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, margin, padding;
        return (
            <div className="container row">
            <div className="col">
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4><a className="btn btn-primary" href="/" role="button">goLogolo Home</a></h4>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            </div>
                            <div className="panel-body">
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    addLogo({ variables: { text: text.value, color: color.value, fontSize: parseInt(fontSize.value), backgroundColor: backgroundColor.value,
                                        borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value), 
                                        margin: parseInt(margin.value), padding: parseInt(padding.value) } });
                                    text.value = "";
                                    color.value = "";
                                    fontSize.value = "";
                                    backgroundColor.value= "";
                                    borderColor.value= "";
                                    borderRadius.value= "";
                                    borderWidth.value= "";
                                    margin.value= "";
                                    padding.value= "";
                                }}>
                                    <div className="form-group">
                                        <label htmlFor="text">Text:</label>
                                        <input type="text" required className="form-control" name="text" defaultValue={this.state.text} ref={node => {
                                            text = node;
                                        }} placeholder="Text" onChange={this.handleTextChange}/>
                                        <label id="asdasdasdada" style={{display : 'none' }} htmlFor="text">Text must not be all whitespace</label>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" className="form-control" name="color" defaultValue={this.state.color} ref={node => {
                                            color = node;
                                        }} placeholder="Color" onChange={this.handleColorChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="number" min="2" max="144" className="form-control" name="fontSize" defaultValue={this.state.fontSize} ref={node => {
                                            fontSize = node;
                                        //**<input type="range" min="2" max="144" defaultValue="10" className="form-control" name="fontSize" ref={node => {fontSize = node; */
                                        }} placeholder="Font Size" onChange={this.handleFontSizeChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="backgroundColor">Background Color:</label>
                                        <input type="color" className="form-control" name="color" defaultValue={this.state.backgroundColor} ref={node => {
                                            backgroundColor = node;
                                        }} placeholder="Background Color" onChange={this.handleBackgroundColorChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input type="color" className="form-control" name="color" defaultValue={this.state.borderColor} ref={node => {
                                            borderColor = node;
                                        }} placeholder="Border Color" onChange={this.handleBorderColorChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input type="number" min="2" max="144" className="form-control" name="borderRadius" defaultValue={this.state.borderRadius} ref={node => {
                                            borderRadius = node;
                                        }} placeholder="Border Radius" onChange={this.handleBorderRadiusChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderWidth">Border Width:</label>
                                        <input type="number" min="2" max="144" className="form-control" name="borderWidth" defaultValue={this.state.borderWidth} ref={node => {
                                            borderWidth = node;
                                        }} placeholder="Border Width" onChange={this.handleBorderWidthChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="padding">Padding:</label>
                                        <input type="number" min="2" max="144" className="form-control" name="padding" defaultValue={this.state.padding} ref={node => {
                                            padding = node;
                                        }} placeholder="Padding" onChange={this.handlePaddingChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="margin">Margin:</label>
                                        <input type="number" min="2" max="144" className="form-control" name="margin" defaultValue={this.state.margin} ref={node => {
                                            margin = node;
                                        }} placeholder="Margin" onChange={this.handleMarginChange}/>
                                    </div>
                                    <button type="submit" onClick={this.handleSubmit} className="btn btn-success">Submit</button>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
            </div>
            <div className="col s8" style={{overflow: 'auto'}}>
                <div style= {{
                        color: this.state.color,
                        fontSize: this.state.fontSize + "pt",
        
                        backgroundColor: this.state.backgroundColor,
        
                        borderStyle: 'solid',
                        borderColor: this.state.borderColor,
                        borderRadius: this.state.borderRadius + "pt",
                        borderWidth: this.state.borderWidth + "pt",
        
                        padding: this.state.padding + "pt",
                        margin: this.state.margin + "pt",
                        maxWidth: 'min-content',
                        minWidth: 'min-content',
                        textAlign: 'center',
                        position: 'absolute',
                        whiteSpace: 'pre-wrap'
                }}> {this.state.text} </div>
            </div>
            </div>
        );
    }
}

export default CreateLogoScreen;