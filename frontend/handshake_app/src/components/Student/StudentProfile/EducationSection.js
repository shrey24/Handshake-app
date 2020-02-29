import React, { Component } from 'react'
import { Button } from 'reactstrap';
import EducationItem from './EducationItem';
import EducationForm from './EducationForm'
// import {Flex, Item} from 'react-flex';
// import 'react-flex/index.css';
import { connect } from 'react-redux'
import { getStudentEducations, 
        deleteStudentEducations,
        addStudentEducations,
        updateStudentEducations } from "../../../actions/types";
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

    componentDidMount(){
        this.props.getStudentEducations();
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
        const {educationItems} = this.props.student;

        let newItem = null;
        if (!this.state.addNew) {
            newItem = <Button 
                        onClick = {this.handleAddBtn}
                        color="green"> Add a new education 
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
                <h2> Education: </h2>                
                {
                    educationItems.map((item) => {
                        if(this.state.editItem && this.state.editItem.id === item.id) {
                            return (
                                <EducationForm
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
                                    item={item} 
                                    handleEdit = {this.handleEdit}
                                />                            
                            );
                        }
                    })
                }
                { newItem }   
            </div>
        )
    }
}

EducationSection.prototypes = {
    getStudentEducations: propTypes.func.isRequired,
    deleteStudentEducations: propTypes.func.isRequired,
    student: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    student : state.student
});
export default connect(mapStateToProps, 
    {getStudentEducations, 
    deleteStudentEducations,
    addStudentEducations,
    updateStudentEducations})(EducationSection);
