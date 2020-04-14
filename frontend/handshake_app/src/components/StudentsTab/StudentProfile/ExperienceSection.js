import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap';

import { connect } from 'react-redux';
import propTypes from 'prop-types';

const ExperienceSection = (props) => {
    
    const [experienceData, setExperienceData] = useState([]);
    
    useEffect(() => {
        if (props.data)
            setExperienceData([...props.data]);
    }, []);

    console.log('ExperienceSection data = ', experienceData);
        
    return (
        <Card >
        <Card.Body>                
        <Card.Title>
            <h3> Experience </h3>
        </Card.Title>
        {
            experienceData.map((item) => {
                    return (
                    <div key={item.id}>
                    <Card.Title>
                    <h5>  {item.title} </h5>
                    </Card.Title>
                    <Card.Subtitle>{item.company_name}, {item.location}</Card.Subtitle>
                    <Card.Text> {item.start_date} - {item.end_date}</Card.Text>
                    <Card.Text> <b>Description</b><br/> {item.work_desc} </Card.Text>
                    </div>
                    );
                })
        }
        </Card.Body>
        </Card>
    );
};

ExperienceSection.propTypes = {
    data: propTypes.array.isRequired,
}

export default ExperienceSection;


