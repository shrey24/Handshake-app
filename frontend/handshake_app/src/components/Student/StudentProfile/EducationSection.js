import React, { Component } from 'react'
import { Button, Card, CardTitle, CardBody } from 'reactstrap';
import EducationItem from './EducationItem';
import EducationForm from './EducationForm';
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
        this.props.deleteStudentEducations(item.id);
    }

    addNewItem = (item) => {
        console.log("Add the item: ", item);
        this.props.addStudentEducations(item);
    }

    updateItem = (item) => {
        console.log("Add the item: ", item);
        this.props.updateStudentEducations(item);
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

        let newItem = null;
        if (!this.state.addNew) {
            newItem = <Button 
                        onClick = {this.handleAddBtn}
                        color='link'> Add a new education 
                      </Button>
        } else {
            newItem = <EducationForm 
                        showForm={this.showForm}
                        deleteItem={this.deleteItem}
                        addNewItem={this.addNewItem}
                        />
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
                        if(this.state.editItem && this.state.editItem.id === item.id) {
                            return (
                                <EducationForm
                                key={item.id}
                                item={item}
                                showForm={this.showForm}
                                deleteItem={this.deleteItem}
                                addNewItem={this.addNewItem}
                                updateItem= {this.updateItem}
                                />
                            )
                        } else {
                            return (
                                <EducationItem 
                                    key={item.id}
                                    item={item}
                                    handleEdit = {this.handleEdit}
                                />                            
                            );
                        }
                    })
                }
                { newItem }  
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
