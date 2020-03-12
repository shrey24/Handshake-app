import React, { Component } from 'react'
import handshake from './handshake.png'
import {Card, Button, Row, Col} from 'react-bootstrap';

export default class JobsLeft extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {data} = this.props;

        return (
            <div id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">
            <div style={{maxWwidth: '540px'}}  >
            <div class="row no-gutters">
            <div class="col-md-4">
                <img src={handshake} class="card-img" alt="company logo" />
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{data.job_title}</h5>
                    <p class="card-text">{data.company_name}</p>
                    <p class="card-text">
                        <small class="text-muted">
                        {data.job_catagory}
                        </small>
                    </p>
                </div>
            </div>
            </div>
            </div>
            </div>
        );
    }
}
