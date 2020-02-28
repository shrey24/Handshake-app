import React, { Component } from 'react'
import { Button, Card, CardTitle, CardSubtitle, CardText } from 'reactstrap';

class EducationItem extends Component {
    constructor(props){
        super(props);
    }

    handleEdit = (itemData) => {
        console.log("handle edit Education Item: passing:: ", itemData);
        this.props.handleEdit(itemData);
    }
    
    render() {
        const {item} = this.props;
        return (
           <Card body>
               <CardTitle>
                   {item.college_name}
               </CardTitle>
               <CardSubtitle>
                   {item.degree} <t/> Major: {item.major}
               </CardSubtitle>
               <CardText>
                   From: {item.start_date} - To: {item.end_date}
               </CardText>
               <CardText>
                   GPA: {item.gpa}
               </CardText>
               <Button onClick={() => this.handleEdit(item)}>
                   Edit
               </Button>
           </Card>
        );
    }
}

export default EducationItem;
