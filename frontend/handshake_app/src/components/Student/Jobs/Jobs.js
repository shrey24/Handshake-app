import React, { Component } from 'react';
import JobsLeft from './JobsLeft'
import JobsRight from './JobsRight'
import JobsTop from './JobsTop'
import NavBar from '../../NavBar';
import axios from 'axios';
import { Card, Form, Container } from 'react-bootstrap';
import { JOB_CAT } from '../../../actions/types';


export default class Jobs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs : [], // view list
            jobsDownload : [], // original list
            active: 0,
            search: '',
            filterStatus: {
                'Full-Time Job' : false,
                'Part-Time Job': false,
                'Internship' : false,
                'On-Campus': false
            }
        }
    }

    componentDidMount() {
        axios.get('/jobs/all')
            .then((res) => {
                if(this.state.jobsDownload !== res.data) {
                    console.log('loading new data on componentDidMount()');
                    this.setState({ jobsDownload: [...res.data]});
                    this.setState({ jobs: [...res.data]});
                }
            })
            .catch((err) => {
                console.log('err, unable to fetch /jobs/all', err);
            });
    }

    filter = (newFilterStatus) => {
        if (!Object.values(newFilterStatus).includes(true)) {
            this.setState({
                jobs: [ ...this.state.jobsDownload ],
                filterStatus: { ... newFilterStatus }
               
            });
        } else {
            let  newList = [];
            Object.keys(newFilterStatus).map((cat) => {
                if(newFilterStatus[cat]) {
                  newList = newList.concat(
                      this.state.jobs.filter((job) => job.job_catagory === cat)
                    );
                }
            });
            console.log('New List, ', newList); 
            this.setState({
                jobs: newList,
                filterStatus: { ... newFilterStatus }
            });
        }    
    };

    toggle = (stat) => {
        let newFilterStatus = {};
        switch (stat) {
            case 'Full-Time Job':
                newFilterStatus = {
                    ...this.state.filterStatus,
                    'Full-Time Job': !this.state.filterStatus['Full-Time Job']
                }
                // this.setState({
                //     filterStatus: {
                //         ...this.state.filterStatus,
                //         'Full-Time Job': !this.state.filterStatus['Full-Time Job']
                //     }                        
                // });
                break;
            case 'Part-Time Job':
                newFilterStatus = {
                    ...this.state.filterStatus,
                    'Part-Time Job': !this.state.filterStatus['Part-Time Job']
                }
                // this.setState({
                //     filterStatus: {
                //         ...this.state.filterStatus,
                //         'Part-Time Job': !this.state.filterStatus['Part-Time Job']
                //     }                        
                // });
                break;
            case 'Internship':
                newFilterStatus = {
                    ...this.state.filterStatus,
                    'Internship': !this.state.filterStatus['Internship']
                }
                // this.setState({
                //     filterStatus: {
                //         ...this.state.filterStatus,
                //         'Internship': !this.state.filterStatus['Internship']
                //     }                        
                // });
                break;
            case 'On-Campus':
                newFilterStatus = {
                    ...this.state.filterStatus,
                    'On-Campus': !this.state.filterStatus['On-Campus']
                }
                // this.setState({
                //     filterStatus: {
                //         ...this.state.filterStatus,
                //         'On-Campus': !this.state.filterStatus['On-Campus']
                //     }                        
                // });
                break;
        }
        this.filter(newFilterStatus);
    }

    onChange = (e) => {
        console.log('onChange search: ', e.target.value);
        
        if(e.target.value === '') {
            this.filter(this.state.filterStatus);
            return;
        }
        let newList = this.state.jobs.filter( job => 
            (job.job_title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) 
            || (job.company_name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) 
            );
        this.setState({
            jobs: newList,
        })
    }
    searchLocation = (e) => {
        console.log('onChange Location: ', e.target.value);
        if(e.target.value === '') {
            this.filter(this.state.filterStatus);
            return;
        }
        let newList = this.state.jobs.filter( job => 
            (job.job_location.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) 
            );
        this.setState({
            jobs: newList,
        })
    }

render() {
    console.log('state: ', this.state);

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
        <br />
        <Container>
        <div className="mar-btm">
        {/* <JobsTop /> */}
        <Card>
                <Card.Body>
            <div>
                <nav class="navbar navbar-light bg-light">
                    <form class="form-inline col-md-6">
                        <input class="form-control w-100" type="search" placeholder="Enter Job Title or a Company name.." aria-label="Search"
                        onChange={this.onChange}  />
                    </form>
                    <form class="form-inline col-md-6 ">
                        <input class="form-control w-100" type="search" placeholder="Enter Location" aria-label="Search" 
                        onChange={this.searchLocation}/>
                    </form>
                </nav>
            <Container>
            <Form.Check inline 
                type='checkbox'
                label={'Full-Time Job'}
                onClick = {e => { this.toggle('Full-Time Job') } }
            />
            <Form.Check inline 
                 type='checkbox'
                 label={'Part-Time Job'}
                 onClick = {e => { this.toggle('Part-Time Job') } }
                />
            <Form.Check inline 
                 type='checkbox'
                 label={'Internship'}
                 onClick = {e => { this.toggle('Internship') } }
                />
            <Form.Check inline 
                 type='checkbox'
                 label={'On-Campus'}
                 onClick = {e => { this.toggle('On-Campus') } }
                />
                </Container>
            </div>
            </Card.Body>
            </Card>
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
