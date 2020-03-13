import React, { Component } from 'react';
import { Card, Form, Container } from 'react-bootstrap';
import { JOB_CAT } from '../../../actions/types';

// export const JOB_CAT = {
//     FULLTIME : 'Full-Time Job',
//     PARTTIME : 'Part-Time Job',
//     INTERN : 'Internship',
//     ONCAMPUS : 'On-Campus'    
// }

export default class JobsTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            filterStatus: {
                'Full-Time Job' : false,
                'Part-Time Job': false,
                'Internship' : false,
                'On-Campus': false
            }
        }
    }

    toggle = (stat) => {
        switch (stat) {
            case 'Full-Time Job':
                this.setState({
                    filterStatus: {
                        ...this.state.filterStatus,
                        'Full-Time Job': !this.state.filterStatus['Full-Time Job']
                    }                        
                });
                break;
            case 'Part-Time Job':
                this.setState({
                    filterStatus: {
                        ...this.state.filterStatus,
                        'Part-Time Job': !this.state.filterStatus['Part-Time Job']
                    }                        
                });
                break;
            case 'Internship':
                this.setState({
                    filterStatus: {
                        ...this.state.filterStatus,
                        'Internship': !this.state.filterStatus['Internship']
                    }                        
                });
                break;
            case 'On-Campus':
                this.setState({
                    filterStatus: {
                        ...this.state.filterStatus,
                        'On-Campus': !this.state.filterStatus['On-Campus']
                    }                        
                });
                break;
        }
        
        // filter();
    }

    render() {
        console.log('state: ', this.state);
        
        return (
            <Card>
                <Card.Body>
            <div>
                <nav class="navbar navbar-light bg-light">
                    <form class="form-inline col-md-6">
                        <input class="form-control w-100" type="search" placeholder="Job Titles" aria-label="Search" />
                    </form>
                    <form class="form-inline col-md-6 ">
                        <input class="form-control w-100" type="search" placeholder="Location" aria-label="Search" />
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
        )
    }
}
