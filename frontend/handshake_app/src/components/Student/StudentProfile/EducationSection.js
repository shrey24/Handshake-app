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
            items : [
                {
                    college_name: "college_name1",
                    degree: "Masters",
                    major: "Computer Science",
                    start_date: "2018, 5, 1",
                    end_date: "2018, 5, 1",
                    gpa: 4.0
                },
                {
                    college_name: "college_name2",
                    degree: "Bachelors",
                    major: "Computer Science",
                    start_date: "2018, 5, 1",
                    end_date: "2018, 5, 1",
                    gpa: 4.0
                }
            ]
        }
    }

    handleEdit = (item) => {
        console.log("EducationSection handleEdit REDUX");
    }
    render() {
        const items = this.state.items;
        return (
            <div>
                <div>
                <Card >
                    <CardBody>
                    <CardTitle>
                   Title
               </CardTitle>
               <CardSubtitle>
                   Subtitle
               </CardSubtitle>
               <CardText>
                   Text Text Text
               </CardText>
                    </CardBody>
               
               </Card>
                </div>
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
               
                
            </div>
        )
    }
}
