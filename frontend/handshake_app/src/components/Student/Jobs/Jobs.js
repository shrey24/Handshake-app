import React, { Component } from 'react'
import JobsLeft from './JobsLeft'
import JobsRight from './JobsRight'
import JobsTop from './JobsTop'
import NavBar from '../../NavBar';
export default class Jobs extends Component {

    render() {
        var styles = {
            backgroundColor: '#DEDEDE',
            'overflow-y': 'scroll'
            };
        return (
            <div>
                <NavBar />
                <div class="mar-btm">
                <JobsTop />
                </div>
                <div class="card border">
                    <div class="row">
                        <div class="col-5">
                            <div data-spy="scroll" class="nav flex-column nav-tabs" id="v-pills-tab" role="tablist" aria-orientation="vertical" style={styles}>
                                <a class="nav-link active border" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true"><JobsLeft /></a>
                                <a class="nav-link border" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false"><JobsLeft /></a>
                                <a class="nav-link border" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false"><JobsLeft /></a>
                                <a class="nav-link border" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false"><JobsLeft /></a>
                            </div>
                        </div>
                        <div class="col-7">
                            <div class="tab-content" id="v-pills-tabContent">
                                <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"><JobsRight /></div>
                                <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><JobsRight /></div>
                                <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab"><JobsRight /></div>
                                <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab"><JobsRight /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
