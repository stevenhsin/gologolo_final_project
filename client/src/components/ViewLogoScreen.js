import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Rnd } from 'react-rnd';
import * as html2canvas from 'html2canvas';
import download from 'downloadjs';

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            title
            texts {text, color, fontSize, x, y}
            images {url, width, height, x, y}
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            padding
            margin
            height
            width
            lastUpdate
        }
    }
`;

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {

    handleDownloadLogo = () => {
        html2canvas(document.getElementById("logo-canvas"), {
            useCORS: true,
            allowTaint: true
        }).then(function (canvas) {
            download(canvas.toDataURL("image/png"), "gologolo.png");
            window.open(canvas.toDataURL("image/png"), "_blank");
        });
    };

    render() {
        let i = 0;
        let j = 0;
        
        return (
            <div className="container row">
            <div className="col">
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    return (
                        <div className="container row">
                        <div className="col">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4><a className="btn btn-primary" href="/" role="button">goLogolo Home</a></h4>
                                    <h3 className="panel-title">
                                        View Logo
                                    </h3>
                                </div>
                                <div className="panel-body">
                                    <dl>
                                        <dt>Name:</dt>
                                        <dd>{data.logo.title}</dd>
                                        <dt>Backgound Color:</dt>
                                        <dd>{data.logo.backgroundColor}</dd>
                                        <dt>Border Color:</dt>
                                        <dd>{data.logo.borderColor}</dd>
                                        <dt>Border Radius:</dt>
                                        <dd>{data.logo.borderRadius}</dd>
                                        <dt>Border Width:</dt>
                                        <dd>{data.logo.borderWidth}</dd>
                                        <dt>Padding:</dt>
                                        <dd>{data.logo.padding}</dd>
                                        <dt>Margin:</dt>
                                        <dd>{data.logo.margin}</dd>
                                        <dt>Height:</dt>
                                        <dd>{data.logo.height}</dd>
                                        <dt>Width:</dt>
                                        <dd>{data.logo.width}</dd>
                                        <dt>Last Updated:</dt>
                                        <dd>{data.logo.lastUpdate}</dd>
                                    </dl>
                                    <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                        {(removeLogo, { loading, error }) => (
                                            <div>
                                                <form
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                        removeLogo({ variables: { id: data.logo._id } });
                                                    }}>
                                                    <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>&nbsp;
                                                </form>
                                                <button className="btn btn-primary" onClick={this.handleDownloadLogo}>Download</button>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        )}
                                    </Mutation>
                                </div>
                            </div>
                        </div>
                        <div style={{overflow: 'auto', paddingRight: "500pt"}}>
                        <div id="logo-canvas" ref='logoPrint' style = {{
                                backgroundColor: data.logo.backgroundColor,

                                borderStyle: 'solid',
                                borderColor: data.logo.borderColor,
                                borderRadius: data.logo.borderRadius + "pt",
                                borderWidth: data.logo.borderWidth + "pt",

                                padding: data.logo.padding + "pt",
                                margin: data.logo.margin + "pt",
                                height: data.logo.height + "pt",
                                width: data.logo.width + "pt",
                                position: 'absolute',
                                whiteSpace: 'pre-wrap'
                        }}> {data.logo.texts.map(text => 
                            <Rnd key={i++} bounds='.logo-canvas' enableResizing="false"
                            default={{ x: text.x + 105, y: text.y + 105}}
                            >
                                <div key={i++} className="moveable" style={{
                                    color: text.color,
                                    fontSize: text.fontSize + "pt",
                                    height: "100%", width: "100%"
                                }}>
                                    {text.text}
                                </div>
                            </Rnd>)}
                            {data.logo.images.map(image =>
                            <Rnd key={j++} bounds='.logo-canvas'
                                default={{x: image.x, y: image.y, height: image.height, width: image.width}}
                                >
                                <img src={image.url}
                                width={image.width + "pt"} height={image.height + "pt"}
                                className="moveable"
                                alt='Missing'/>
                            </Rnd>)} </div>
                        </div>
                        </div>
                    );
                }}
            </Query>
            </div>
            
        </div>);
    }
}

export default ViewLogoScreen;