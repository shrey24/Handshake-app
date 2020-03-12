import React, { Component } from 'react'
import { Card, Container } from 'react-bootstrap'

export default class JobsTop extends Component {
    render() {
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
            </div>
            </Card.Body>
            </Card>
        )
    }
}
