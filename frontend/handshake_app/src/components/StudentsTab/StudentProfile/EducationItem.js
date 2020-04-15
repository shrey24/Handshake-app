import React, { Component } from 'react'
import { Button, Card, CardTitle, CardSubtitle, CardText, Container } from 'reactstrap';

class EducationItem extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        const {item} = this.props;
        return (
            <div>
            <CardText>
              <h5>  {item.college_name} </h5>
            </CardText>
             <CardText>{item.degree} {'  '} Major: {item.major}</CardText>
             <CardText> {item.start_date} - {item.end_date}</CardText>
             <CardText>GPA: {item.gpa}</CardText>
            </div>
        );
    }
}

export default EducationItem;
