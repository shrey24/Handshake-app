import React, { Component } from 'react'
import { Button, Card, Label, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';
import EducationItem from './EducationItem';
// import {Flex, Item} from 'react-flex';
// import 'react-flex/index.css';

// Smart component
export default class EducationSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addNew : false,
            items : [
                {
                    college_name: "college_name1",
                    degree: "Masters",
                    major: "Computer Science",
                    start_date: 2018,
                    end_date: 2018,
                    gpa: 4.0
                },
                {
                    college_name: "college_name2",
                    degree: "Bachelors",
                    major: "Computer Science",
                    start_date: 2018,
                    end_date: 2018,
                    gpa: 4.0
                }
            ]
        }
    }

    handleAddBtn = (e) => {
        e.preventDafault();
        this.setState({addNew : true});
    }

    setAddNew = (bool) => {
        this.setState({addNew : bool});
    }

    handleEdit = (item) => {
        console.log("EducationSection handleEdit REDUX");
    }
    render() {
        const items = this.props.items;

        const newItem = null;
        if (!this.state.addNew) {
            newItem = <Button 
                        onClick = {this.handleAddBtn}
                        color="green"> Add a new education 
                    </Button>
        } else {
            newItem = <EducationForm setAddNew={this.setAddNew}/>
        }

        return (
            <div>
                <h2> Education: </h2>                
                {
                    items.map((item) => {
                        return (
                            <EducationItem 
                                item={item} 
                                handleEdit = {this.handleEdit}
                            />                            
                        );
                    })
                }
                { newItem }   
            </div>
        )
    }
}
