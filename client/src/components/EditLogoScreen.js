import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            padding
            margin
            lastUpdate
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                borderRadius: $borderRadius,
                borderWidth: $borderWidth,
                padding: $padding,
                margin: $margin) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {

    constructor() {
        super();

        // WE'LL MANAGE THE UI CONTROL
        // VALUES HERE
        this.state = {
            text : "",
            textColor : "",
            fontSize : "",
            
            backgroundColor : "",

            borderColor : "",
            borderRadius : "",
            borderWidth : "",

            padding : "",
            margin : "",

            flag : true
        };

        //this.handleChange = this.handleChange.bind(this);
    }

    handleTextChange = (event) => {
        console.log("handleTextChange to " + event.target.value);
        this.setState({text: event.target.value});
        if (event.target.value.trim() !== "") {
            console.log(this.state.text.trim());
            document.getElementById("editLogoScreenWhitespace").style.display = 'none';
        } else {
            document.getElementById("editLogoScreenWhitespace").style.display = '';
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
        console.log("handleBorderWidthChange to " + event.target.value);
        this.setState({ borderWidth: event.target.value });
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
            document.getElementById("editLogoScreenWhitespace").style.display = '';
        }
    }

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin;
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    if (this.state.flag) {
                        this.setState({
                            flag: false,
                            text: data.logo.text,
                            color: data.logo.color,
                            fontSize: data.logo.fontSize,
                            backgroundColor: data.logo.backgroundColor,
                            borderColor: data.logo.borderColor,
                            borderRadius: data.logo.borderRadius,
                            borderWidth: data.logo.borderWidth,
                            padding: data.logo.padding,
                            margin: data.logo.margin
                        });
                    }
                    
                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container row">
                                    <div className="col">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><a className="btn btn-primary" href="/" role="button">goLogolo Home</a></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                            </h3>
                                        </div>
                                        <div className="panel-body">                                            
                                            <form onSubmit={e => {
                                                e.preventDefault();
                                                updateLogo({ variables: { id: data.logo._id, text: text.value, color: color.value, fontSize: parseInt(fontSize.value), backgroundColor: backgroundColor.value,
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
                                                    <input type="text" className="form-control" name="text" ref={node => {
                                                        text = node;
                                                    }} placeholder="Text" defaultValue={data.logo.text} 
                                                    onChange={this.handleTextChange}/>
                                                    <label id="editLogoScreenWhitespace" style={{display : 'none' }} htmlFor="text">Text must not be all whitespace</label>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="color">Color:</label>
                                                    <input type="color" className="form-control" name="color" ref={node => {
                                                        color = node;
                                                    }} placeholder="Color" defaultValue={data.logo.color} 
                                                    onChange={this.handleColorChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Font Size:</label>
                                                    <input type="number" min="2" max="144" className="form-control" name="fontSize" ref={node => {
                                                        fontSize = node;
                                                    }} placeholder="Font Size" defaultValue={data.logo.fontSize}
                                                    onChange={this.handleFontSizeChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                    <input type="color" className="form-control" name="color" ref={node => {
                                                        backgroundColor = node;
                                                    }} placeholder="Background Color" defaultValue={data.logo.backgroundColor}
                                                    onChange={this.handleBackgroundColorChange}/>
                                                </div>
                                                    <div className="form-group">
                                                    <label htmlFor="borderColor">Border Color:</label>
                                                    <input type="color" className="form-control" name="color" ref={node => {
                                                        borderColor = node;
                                                    }} placeholder="Border Color" defaultValue={data.logo.borderColor}
                                                    onChange={this.handleBorderColorChange}/>
                                                </div>
                                                    <div className="form-group">
                                                        <label htmlFor="borderRadius">Border Radius:</label>
                                                    <input type="number" min="2" max="144" className="form-control" name="borderRadius" ref={node => {
                                                        borderRadius = node;
                                                    }} placeholder="Border Radius" defaultValue={data.logo.borderRadius}
                                                    onChange={this.handleBorderRadiusChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderWidth">Border Width:</label>
                                                    <input type="number" min="2" max="144" className="form-control" name="borderWidth" ref={node => {
                                                        borderWidth = node;
                                                    }} placeholder="Border Width" defaultValue={data.logo.borderWidth}
                                                    onChange={this.handleBorderWidthChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="padding">Padding:</label>
                                                    <input type="number" min="2" max="144" className="form-control" name="padding" ref={node => {
                                                        padding = node;
                                                    }} placeholder="Padding" defaultValue={data.logo.padding}
                                                    onChange={this.handlePaddingChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="margin">Margin:</label>
                                                    <input type="number" min="2" max="144" className="form-control" name="margin" ref={node => {
                                                        margin = node;
                                                    }} placeholder="Margin" defaultValue={data.logo.margin}
                                                    onChange={this.handleMarginChange}/>
                                                </div>
                                                <button type="submit" onClick={this.handleSubmit} className="btn btn-success">Submit</button>
                                            </form>
                                            {loading && <p>Loading...</p>}
                                            {error && <p>Error :( Please try again</p>}
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col s8" style={{overflow: 'auto'}}>
                                        <div style={{
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
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;