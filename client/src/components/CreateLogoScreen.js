import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import { parse } from 'graphql';
import Draggable, { DraggableCore } from "react-draggable";
import { Rnd } from 'react-rnd';

const ADD_LOGO = gql`
    mutation AddLogo(
        $title: String!,
        $texts: [textInput]!,
        $images: [imageInput]!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!,
        $height: Int!,
        $width: Int!) {
        addLogo(
            title: $title,
            texts: $texts,
            images: $images,
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            borderRadius: $borderRadius,
            borderWidth: $borderWidth,
            padding: $padding,
            margin: $margin,
            height: $height,
            width: $width ){
            _id
        }
    }
`;

class CreateLogoScreen extends Component {
    constructor() {
        super();
        this.state = {
            title: "goLogolo Logo",
            texts:[],
            images:[],
            backgroundColor: "#e3bcef",
            borderColor: "#8272b1",
            borderRadius: 30,
            borderWidth: 40,
            padding: 100,
            margin: 50,
            height: 500,
            width: 500,
            selected: null
        };
    }

    handleDeleteText = () => {
        console.log("Deleting the selected text", this.state.selected);
        let texts = this.state.texts;
        texts.splice(texts.indexOf(this.state.selected), 1);
        this.setState({
            texts: texts,
            selected: null
        });
    }

    handleDeleteImage = () => {
        console.log("Deleting the selected text", this.state.selected);
        let images = this.state.images;
        images.splice(images.indexOf(this.state.selected), 1);
        this.setState({
            images: images,
            selected: null
        });
    }

    handleRemoveSelection = () => {
        console.log("Removing selected", this.state.selected);
        this.setState({ selected: null});
    }

    handleSetSelection = (event, component) => {
        console.log("Changing selected", component);
        this.setState({
            selected: component
        });
    }

    onTextDrag = (event, data) => {
        event.stopPropagation();
        event.preventDefault();
        let texts = this.state.texts;
        texts.forEach(text => {
            if (text === this.state.selected) {
                text.y = parseInt(data.y);
                text.x = parseInt(data.x);
            }
        });
        this.setState({
            texts: texts
        });
    }

    onImageDrag = (event, data) => {
        event.stopPropagation();
        event.preventDefault();
        let images = this.state.images;
        images.forEach(image => {
            if (image === this.state.selected) {
                image.y = parseInt(data.y);
                image.x = parseInt(data.x);
            }
        });
        this.setState({
            images: images
        });
    }

    onResize = (event, dir, ref, delta, pos) => {
        console.log("Resizing image");
        let images = this.state.images;
        images.forEach(image => {
            if (image === this.state.selected) {
                image.height = ref.offsetHeight;
                image.width = ref.offsetWidth;
                image.x = parseInt(pos.x);
                image.y = parseInt(pos.y);
            }
        });
        this.setState({
            images: images
        });
    }

    handleTitleChange = (event) => {
        console.log("handleTitleChange " + event.target.value);
        this.setState({ title: event.target.value });
        if (event.target.value.trim() !== "") {
            document.getElementById("asdasdasdada").style.display = 'none';
        } else {
            document.getElementById("asdasdasdada").style.display = '';
        }
    }

    handleTextChange = (event) => {
        console.log("handleTextChange " + event.target.value);
        let texts = this.state.texts;
        if (event.target.value.trim() !== "") {
            document.getElementById("text-warning").style.display = 'none';
        } else {
            document.getElementById("text-warning").style.display = '';
        }
        texts.forEach(text => {
            if (text === this.state.selected) {
                text.text = event.target.value;
            }
            if (text.text.trim() === "") {
                text.text = "Text must not be all whitespaces";
            }
        });
        this.setState({
            texts: texts
        });
    }

    handleTextColorChange = (event) => {
        console.log("handleTextColorChange " + event.target.value);
        let texts = this.state.texts;
        texts.forEach(text => {
            if (text === this.state.selected) {
                text.color = event.target.value;
            }
        });
        this.setState({
            texts: texts
        });
    }

    handleFontSizeChange = (event) => {
        console.log("handleFontSizeChange " + event.target.value);
        let texts = this.state.texts;
        texts.forEach(text => {
            if (text === this.state.selected) {
                text.fontSize = event.target.value;
            }
        });
        this.setState({
            texts: texts
        });
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

    handleHeightChange = (event) => {
        console.log("handleHeightChange " + event.target.value);
        this.setState({ height: event.target.value});
    }

    handleWidthChange = (event) => {
        console.log("handleHeightChange " + event.target.value);
        this.setState({ width: event.target.value});
    }

    handleSubmit = (event) => {
        if (this.state.title.trim() === "") {
            event.preventDefault();
            document.getElementById("asdasdasdada").style.display = '';
        }
    }

    handleAddText = () => {
        console.log("Adding New Text");
        let texts = this.state.texts;
        let newText = {text: "Sample Text", color: "#FFFFFF", fontSize: 20, x: -105, y: -105};
        texts.push(newText);
        this.setState({
            texts: texts,
            selected: newText
        });
    }

    handleAddImage = () => {
        console.log("Adding New Image from " + document.getElementById("image-url").value);
        let images = this.state.images;
        let newImage = {url: document.getElementById("image-url").value, width: 100, height: 100, x: -105, y: -105};
        images.push(newImage);
        this.setState({
            images: images,
            selected: newImage
        });
    }

    render() {
        let selected = this.state.selected;
        let i = 0;
        let j = 0;
        let title, backgroundColor, borderColor, borderRadius, borderWidth, margin, padding, height, width;
        return (
            <div className="container row">
            <div className="col s2" style={{maxWidth: '250pt'}}>
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
                                    addLogo({ variables: { title: title.value, backgroundColor: backgroundColor.value,
                                        borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value), 
                                        margin: parseInt(margin.value), padding: parseInt(padding.value), height: parseInt(height.value), width:parseInt(width.value),
                                        images: this.state.images, texts: this.state.texts } });
                                    title.value = "";
                                    backgroundColor.value= "";
                                    borderColor.value= "";
                                    borderRadius.value= "";
                                    borderWidth.value= "";
                                    margin.value= "";
                                    padding.value= "";
                                    height.value="";
                                    width.value="";
                                }}>
                                    <div className="form-group">
                                    <button type="submit" onClick={this.handleSubmit} className="btn btn-success">Submit</button>
                                    <br></br>
                                        <label htmlFor="title">Name:</label>
                                        <input type="title" required className="form-control" name="title" defaultValue={this.state.title} ref={node => {
                                            title = node;
                                        }} placeholder="Name" onChange={this.handleTitleChange}/>
                                        <label id="asdasdasdada" style={{display : 'none' }} htmlFor="title">Name must not be all whitespace</label>
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
                                    <div className="form-group">
                                        <label htmlFor="height">Height:</label>
                                        <input type="number" min="5" max="10000" className="form-control" name="height" defaultValue={this.state.height} ref={node => {
                                            height = node;
                                        }} placeholder="Height" onChange={this.handleHeightChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="width">Width:</label>
                                        <input type="number" min="5" max="10000" className="form-control" name="width" defaultValue={this.state.width} ref={node => {
                                            width = node;
                                        }} placeholder="Width" onChange={this.handleWidthChange}/>
                                    </div>
                                </form>
                                <div style={{ paddingTop: '10px' }}>

                                    <input id="image-url" type="url" className="form-control" name="url"
                                    placeholder="Image URL"/>
                                    <button onClick={this.handleAddImage} className="clickable" style={{
                                        border: '1px blue', borderRadius: '5px', width: '50%',
                                        height: '30px', backgroundColor: 'lightblue'
                                    }}>Add Image</button>
                                    <br></br>
                                    <button onClick={this.handleAddText} className="clickable" style={{
                                        border: '1px blue', borderRadius: '5px', width: '50%',
                                        height: '30px', backgroundColor: 'lightblue'
                                    }}>Add Text</button>
                                </div>
                                {selected ? <div className="container" selected={selected}>
                                    <div className="panel">
                                        <h3 className="panel-title">Editor</h3>

                                        {selected.text !== undefined ? 
                                        <div>
                                            <label htmlFor="text">Text:</label>
                                            <input type="text" required className="form-control" name="text" value={selected.text}
                                            placeholder="Text" onChange={this.handleTextChange}/>
                                            <label id="text-warning" style={{display : 'none' }} htmlFor="text">Text must not be all whitespace</label>
                                        
                                            <label htmlFor="textColor">Text Color:</label>
                                            <input type="color" className="form-control" name="color" value={selected.color} 
                                            placeholder="Text Color" onChange={this.handleTextColorChange}/>

                                            <label htmlFor="fontSize">Font Size:</label>
                                            <input type="number" min="2" max="144" className="form-control" name="fontSize" value={selected.fontSize}
                                            placeholder="Font Size" onChange={this.handleFontSizeChange}/>

                                            <button onClick={this.handleDeleteText} className="clickable" style={{
                                            border: '1px red', borderRadius: '5px', width: '50%',
                                            height: '30px', backgroundColor: 'red'
                                            }}>Delete</button>
                                            </div>
                                        : <div><button onClick={this.handleDeleteImage} className="clickable" style={{
                                            border: '1px red', borderRadius: '5px', width: '50%',
                                            height: '30px', backgroundColor: 'red'
                                            }}>Delete</button></div>
                                        }

                                    <label htmlFor="position">Position: {selected.x}, {selected.y}</label>
                                    </div>
                                </div> :
                                <div></div>}
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
            </div>
            <div style={{overflow: 'auto'}} >
                <div id="mainlogo" className="logo-canvas" style= {{
                        backgroundColor: this.state.backgroundColor,
        
                        borderStyle: 'solid',
                        borderColor: this.state.borderColor,
                        borderRadius: this.state.borderRadius + "pt",
                        borderWidth: this.state.borderWidth + "pt",
        
                        padding: this.state.padding + "pt",
                        margin: this.state.margin + "pt",

                        height: this.state.height + "pt",
                        width: this.state.width + "pt",
                        position: 'absolute',
                        whiteSpace: 'pre-wrap'
                }} onMouseDown={this.handleRemoveSelection}> 
                    {this.state.texts.map(text => 
                        <Rnd key={i++} bounds='.logo-canvas' enableResizing="false"
                        //default={{ x: text.x, y: text.y }}
                        onDrag={this.onTextDrag} onDragStart={(e) => {e.stopPropagation()}}>
                            <div key={i++} onMouseDown={(e) => { this.handleSetSelection(e, text) }} className="moveable" style={{
                                color: text.color,
                                fontSize: text.fontSize + "pt",
                                height: "100%", width: "100%",
                                x: text.x, y: text.y
                            }}>
                                {text.text}
                            </div>
                        </Rnd>)}
                    {this.state.images.map(image =>
                        <Rnd key={j++} bounds='.logo-canvas'
                        //default={{x: image.x, y: image.y, height: image.height, width: image.width}}
                        onDrag={this.onImageDrag} onDragStart={(e) => {e.stopPropagation(); e.preventDefault()}}
                        onResize={this.onResize}>
                            <img src={image.url}
                            width={image.width + "pt"} height={image.height + "pt"}
                            onMouseDown={(e) => { this.handleSetSelection(e, image) }}
                            className="moveable" 
                            alt='Missing'/>
                        </Rnd>)}
                    </div>
            </div>
            </div>
        );
    }
}

export default CreateLogoScreen;