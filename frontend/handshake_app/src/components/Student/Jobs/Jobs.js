import React, { Component } from 'react';
import JobsLeft from './JobsLeft'
import JobsRight from './JobsRight'
import JobsTop from './JobsTop'
import NavBar from '../../NavBar';
import axios from 'axios';
import { Container } from 'react-bootstrap';

export default class Jobs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs : [],
            active: 0,
        }
    }

    componentDidMount() {
        axios.get('/jobs/all')
            .then((res) => {
                this.setState({ jobs: [...res.data]});
            })
            .catch((err) => {
                console.log('err, unable to fetch /jobs/all', err);

            });
    }


render() {

    const styles = {
        backgroundColor: '#DEDEDE',
        'overflow-y': 'scroll'
    };
    
    const leftPaneComp = this.state.jobs.map((job, index) => {
        return (
            <div className="nav-link active border"
            onClick={ e => this.setState({active: index})}>
                <JobsLeft data={job} />
            </div>
        );
    });
    
    const rightPaneComp = (this.state.jobs.length > 0) ? 
                        <JobsRight data={this.state.jobs[this.state.active]} /> :
                        <h4> no results found </h4> ;

    return (
        <div>
        <NavBar />
        <Container>
        <div className="mar-btm">
        <JobsTop />
        </div>

        <div className="card border">
        <div className="row">
            <div className="col-5">
                <div 
                className="nav flex-column nav-tabs" 
                id="v-pills-tab" 
                role="tablist" 
                aria-orientation="vertical">
                    {leftPaneComp}
                </div>
            </div>
            
            <div className="col-7">
                <div className="tab-content" id="v-pills-tabContent">
                    {rightPaneComp}
                </div>
            </div>
            
        </div>
        </div>
        </Container>
        </div>
    )
 }
}
