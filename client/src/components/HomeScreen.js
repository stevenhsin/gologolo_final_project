import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_LOGOS = gql`
  {
    logos {
      _id
      text
      lastUpdate
    }
  }
`;

class HomeScreen extends Component {

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGOS}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container">
                            <div className="row">
                            <div className="col s4 ">
                                <h3 className="display-4">Recent Work</h3>
                                <div id="home_recent_work_list">
                                    <div className="card">
                                        {data.logos.sort((a, b) => b.lastUpdate > a.lastUpdate).map((logo, index) => (
                                            <div key={index} className='home_logo_link'
                                            style={{ whiteSpace: "pre-wrap" }}>
                                        <Link to={`/view/${logo._id}`}>{logo.text}</Link>
                                    </div>
                                ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col s8">
                                <div id="home_banner_container">
                                    GoLogolo
                                </div>
                                <div>
                                <a className="btn btn-primary" href="/create" role="button">Add Logo</a>
                                </div>
                            </div>
                        </div>
                        </div>
                    );
                }
                }
            </Query >
        );
    }
}

export default HomeScreen;
