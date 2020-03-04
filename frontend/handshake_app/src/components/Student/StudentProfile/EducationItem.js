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
             <CardText>{item.degree} <t/> Major: {item.major}</CardText>
             <CardText>From: {item.start_date} - To: {item.end_date}</CardText>
             <CardText>GPA: {item.gpa}</CardText>
              
            <Button onClick={() => this.props.handleEdit(item)}>
               Edit
            </Button>
            </div>
        );

        // return (
        //     <Card body>
        //         <CardTitle>
        //             {item.college_name}
        //         </CardTitle>
        //         <CardSubtitle>
        //             {item.degree} <t/> Major: {item.major}
        //         </CardSubtitle>
        //         <CardText>
        //             From: {item.start_date} - To: {item.end_date}
        //         </CardText>
        //         <CardText>
        //             GPA: {item.gpa}
        //         </CardText>
        //         <Button onClick={() => this.props.handleEdit(item)}>
        //             Edit
        //         </Button>
        //     </Card>
        //  );
    }
}

export default EducationItem;
