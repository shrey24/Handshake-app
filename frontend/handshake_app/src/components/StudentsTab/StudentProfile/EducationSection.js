import React, { Component } from 'react'
import { Button, Card, CardTitle, CardBody } from 'reactstrap';
import EducationItem from './EducationItem';
// import {Flex, Item} from 'react-flex';
// import 'react-flex/index.css';
import { connect } from 'react-redux'
import {
        deleteStudentEducation,
        addStudentEducation,
        updateStudentEducation 
    } from "../../../actions/studentProfile";
import Spinner from '../../Spinner';
import propTypes from 'prop-types';


// Smart component
class EducationSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addNew : false,
            editItem: null
        }
    }


    handleAddBtn = (e) => {
        this.setState({addNew : true});
    }

    showForm = (bool) => {
        this.setState({addNew : bool, editItem:null});
    }

    deleteItem = (item) => {
        console.log("delete the item: ", item);
        this.props.deleteStudentEducation(item.id);
    }

    addNewItem = (item) => {
        console.log("Add the item: ", item);
        this.props.addStudentEducation(item);
    }

    updateItem = (item) => {
        console.log("Update the item: ", item);
        const { id, ...data} = item;
        this.props.updateStudentEducation(id, data);
    }

    handleEdit = (item) => {
        this.setState({editItem: item});
    }
    render() {
        console.log(this.props);
        const educationItems = this.props.data;
        if(!educationItems) {
            return <Spinner />;
        }

        return (
            <div> 
                <Card >
                <CardBody>                
                <CardTitle>
                    <h3> Education </h3>
                </CardTitle>
                {
                    educationItems.map((item) => {
                        return (
                            <EducationItem 
                                key={item.id}
                                item={item}
                                handleEdit = {this.handleEdit}
                            />                            
                        ); 
                    })
                } 
                </CardBody>
                </Card> 
            </div>
        )
    }
}

EducationSection.propTypes = {
    deleteStudentEducation: propTypes.func.isRequired,
    addStudentEducation: propTypes.func.isRequired,
    updateStudentEducation: propTypes.func.isRequired,
    data: propTypes.array.isRequired,
}

export default connect(null, 
    {deleteStudentEducation,
    addStudentEducation,
    updateStudentEducation})(EducationSection);
