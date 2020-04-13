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
            text: "New Logo Text",
            color: "#000000",
            fontSize: 24,
            backgroundColor: "#FFFFFF",
            borderColor: "#00372F",
            borderRadius: 20,
            borderWidth: 20,
            padding: 10,
            margin: 35
        };
        //this.handleChange = this.handleChange.bind(this);
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
                                <h4><Link to="/">Home</Link></h4>
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
                                        <input type="text" className="form-control" name="text" defaultValue={this.state.text} ref={node => {
                                            text = node;
                                        }} placeholder="Text" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" className="form-control" name="color" defaultValue={this.state.color} ref={node => {
                                            color = node;
                                        }} placeholder="Color" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="number" min="2" max="144" className="form-control" name="fontSize" defaultValue={this.state.fontSize} ref={node => {
                                            fontSize = node;
                                        //**<input type="range" min="2" max="144" defaultValue="10" className="form-control" name="fontSize" ref={node => {fontSize = node; */
                                        }} placeholder="Font Size" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="backgroundColor">Background Color:</label>
                                        <input type="color" className="form-control" name="color" defaultValue={this.state.backgroundColor} ref={node => {
                                            backgroundColor = node;
                                        }} placeholder="Background Color" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input type="color" className="form-control" name="color" defaultValue={this.state.borderColor} ref={node => {
                                            borderColor = node;
                                        }} placeholder="Border Color" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input type="number" min="2" max="144" className="form-control" name="borderRadius" defaultValue={this.state.borderRadius} ref={node => {
                                            borderRadius = node;
                                        }} placeholder="Border Radius" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderWidth">Border Width:</label>
                                        <input type="number" min="2" max="144" className="form-control" name="borderWidth" defaultValue={this.state.borderWidth} ref={node => {
                                            borderWidth = node;
                                        }} placeholder="Border Width" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="padding">Padding:</label>
                                        <input type="number" min="2" max="144" className="form-control" name="padding" defaultValue={this.state.padding} ref={node => {
                                            padding = node;
                                        }} placeholder="Padding" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="margin">Margin:</label>
                                        <input type="number" min="2" max="144" className="form-control" name="margin" defaultValue={this.state.margin} ref={node => {
                                            margin = node;
                                        }} placeholder="Margin" />
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
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