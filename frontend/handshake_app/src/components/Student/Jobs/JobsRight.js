import React, { Component } from 'react'

export default class JobsRight extends Component {
    render() {
        return (
            <div className="container-fluid pad-all">
                <h2 className="font-weight-bold">Software Engineer</h2>
                <h3 className="font-weight-normal">Company Name</h3>
                <div className="row pad-all">
                    <p className="font-weight-light text-secondary mar-rt">Full Time</p>
                    <p className="font-weight-light text-secondary mar-rt">San Fransisco</p>
                    <p className="font-weight-light text-secondary mar-rt">Unpaid</p>
                    <p className="font-weight-light text-secondary mar-rt">Date Posted</p>
                </div>
                <br />
                <button type="button" class="btn btn-success mar-btm">Apply</button>
                <br />
                <br />
                <h3 className="font-weight-bold">Job Description</h3>
                <p className="font-weight-light">The Paragraphs module allows content creators to choose which kinds of paragraphs they want to place on the page, and the order in which they want to place them. They can do all of this through the familiar node edit screen. There is no need to resort to code, the dreaded block placement config screen or Panelizer overrides. They just use node edit form where all content is available to them in one place.</p>

            </div>
        )
    }
}
