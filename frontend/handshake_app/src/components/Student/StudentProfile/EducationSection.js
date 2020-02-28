import React, { Component } from 'react'
import { Button } from 'reactstrap';
import EducationItem from './EducationItem';
import EducationForm from './EducationForm'
// import {Flex, Item} from 'react-flex';
// import 'react-flex/index.css';
import { connect } from 'react-redux'
import { getStudentEducations } from "../../../actions/types";
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

    setAddNew = (bool) => {
        this.setState({addNew : bool, editItem:null});
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
            newItem = <EducationForm setAddNew={this.setAddNew}/>
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
                                setAddNew={this.setAddNew}
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
    student: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    student : state.student
});
export default connect(mapStateToProps, {getStudentEducations})(EducationSection);
