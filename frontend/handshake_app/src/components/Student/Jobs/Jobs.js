import React, { Component } from 'react';
import JobsLeft from './JobsLeft'
import JobsRight from './JobsRight'
import JobsTop from './JobsTop'
import NavBar from '../../NavBar';
import axios from 'axios';
import { Card, Form, Container, Pagination, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { JOB_CAT } from '../../../actions/types';
import Spinner from '../../Spinner';
import './Jobs.css';


import { getAllJobs, applyForJob } from '../../../actions/studentJobs';
import { connect } from 'react-redux';
import propTypes from 'prop-types'

class Jobs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs : [], // view list
            jobsDownload : [], // original list
            offset: 0, // for pagination
            numsToShow: 5, // for pagination
            active: 0,
            search: '',
            filterStatus: {
                'Full-Time Job' : false,
                'Part-Time Job': false,
                'Internship' : false,
                'On-Campus': false
            },
            sortBy: 'sort results by',
            sortByOrder: 'ascending',
        }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.jobsDownload !== this.props.jobsDownload) {
            let {offset, numsToShow} = this.state;
            let newJobs = [...nextProps.jobsDownload];
            offset = 0;
            this.setState({
                ...this.state,
                jobsDownload: newJobs,
                jobs: newJobs.slice(offset*numsToShow, offset*numsToShow+numsToShow),
                offset: 0,
                active: 0
            });
        }
      }

    componentDidMount() {
        this.props.getAllJobs();
        // if(this.props.jobsDownload.length !== 0) {
        //     let {offset, numsToShow} = this.state;
        //     let newJobs = [...this.props.jobsDownload];
        //     offset = 0;
        //     this.setState({
        //         ...this.state,
        //         jobsDownload: newJobs,
        //         jobs: newJobs.slice(offset*numsToShow, offset*numsToShow+numsToShow),
        //         offset: 0,
        //         active: 0
        //     });
        // }
        /*
        axios.get('/jobs/all')
            .then((res) => {
                if(this.state.jobsDownload !== res.data) {
                    console.log('loading new data on componentDidMount()');
                    this.setState({ jobsDownload: [...res.data]});
                    const {offset, numsToShow} = this.state;
                    this.setState({ jobs: [...res.data].slice(offset*numsToShow, offset*numsToShow+numsToShow)});
                }
            })
            .catch((err) => {
                console.log('err, unable to fetch /jobs/all', err);
            });
            */
    }

    sortResults = (e) => {
        e.preventDefault();
        if (e.target.name === 'post_date') {
            let allJobs = this.state.jobsDownload;
            allJobs.sort((a, b) => { 
                let aTime = new Date(a[e.target.name]);
                let bTime = new Date(b[e.target.name]);
                if(aTime <= bTime) return -1;
                else return 1;
            });
            let { offset, numsToShow } = this.state;
            offset = 0;
            this.setState({
                ...this.state,
                jobsDownload: [...allJobs],
                jobs: allJobs.slice(offset*numsToShow, offset*numsToShow+numsToShow),
                sortBy: e.target.name,
                offset: offset,
                sortByOrder: 'ascending'
            });
        } else if (e.target.name === 'job_location') {
            this.setState({
                ...this.state,
                sortBy: e.target.name,
                sortByOrder: 'ascending'
            });
        } else if (e.target.name === 'deadline') {
            this.setState({
                ...this.state,
                sortBy: e.target.name,
                sortByOrder: 'ascending'
            });
        }
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
                break;
            case 'Internship':
                newFilterStatus = {
                    ...this.state.filterStatus,
                    'Internship': !this.state.filterStatus['Internship']
                }
                break;
            case 'On-Campus':
                newFilterStatus = {
                    ...this.state.filterStatus,
                    'On-Campus': !this.state.filterStatus['On-Campus']
                }
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

    setPagination = (direction) => {
        let { offset, numsToShow } = this.state;
        if (direction === 'left') {
            offset = offset - 1;
            if (offset < 0) 
                return;
            console.log(`pagination ${direction}`);
            this.setState({
                ...this.state,
                offset: offset,
                jobs: this.state.jobsDownload.slice(offset*numsToShow, offset*numsToShow+numsToShow)
            });
            
        } else {
            offset = offset + 1;
            let newList = this.state.jobsDownload.slice(offset*numsToShow, offset*numsToShow+numsToShow)
            console.log(`new list: ${newList}`);
            if(newList.length === 0) 
                return;
            console.log(`pagination ${direction}`);
            this.setState({
                ...this.state,
                offset: offset,
                jobs: newList
            });
        }
    }

render() {
    console.log('state: ', this.state);
    if(this.props.loading) {
        return <Spinner />;
    }
    const styles = {
        backgroundColor: '#DEDEDE',
        'overflow-y': 'scroll'
    };
    const { offset, numsToShow } = this.state;
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
                <div className='mb-3'>
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
                </div>
                </Container>
                <Row>
                <DropdownButton title={this.state.sortBy} variant='primary' inline>
            <Dropdown.Item onClick={this.sortResults} name='post_date'>Posting date</Dropdown.Item>
            <Dropdown.Item onClick={this.sortResults} name='job_location'>location</Dropdown.Item>
            <Dropdown.Item onClick={this.sortResults} name='deadline'>application deadline</Dropdown.Item>
            </DropdownButton>
                
                <DropdownButton title={this.state.sortByOrder} variant='secondary' inline>
            <Dropdown.Item eventKey="1">Ascending</Dropdown.Item>
            <Dropdown.Item eventKey="2">Descending</Dropdown.Item>
            </DropdownButton>
                
                </Row>
            
            
            </div>
            </Card.Body>
            </Card>
        </div>
    
        <div className="card border">
        <div className="row">
            <div className="col-5 scroll">
                <div 
                className="nav flex-column nav-tabs" 
                id="v-pills-tab" 
                role="tablist" 
                aria-orientation="vertical">
                    {leftPaneComp}
                    </div>
                <Container>
                    <Pagination>
                    <Pagination.Prev 
                    variant='primary'
                    onClick = {(e) => {this.setPagination('left')}}/>
                    <Pagination.Item>
                    {this.state.offset*this.state.numsToShow} - {this.state.offset*this.state.numsToShow+this.state.numsToShow} / {this.state.jobsDownload.length}
                    </Pagination.Item>
                    <Pagination.Next 
                    active
                    onClick = {(e) => {this.setPagination('right')}}/>
                    </Pagination>
                </Container>
                
            </div>
            
            <div className="col-7">
                <div className="tab-content scroll" id="v-pills-tabContent">
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


Jobs.propTypes = {
    jobsDownload: propTypes.array.isRequired,
    getAllJobs: propTypes.func.isRequired,
    applyForJob: propTypes.func.isRequired,
    loading: propTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    jobsDownload: state.studentJobs.jobsDownload,
    loading: state.studentJobs.loading,
});

export default connect(mapStateToProps, { 
    getAllJobs, applyForJob
})(Jobs);