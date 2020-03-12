import React, { useState, useEffect } from 'react'
import { Modal, Form, Button } from 'react-bootstrap';

const AvatarUpload = (props) => {
    const [file, setFile] = useState('');
    const [show, setShow] = useState(false);

    useEffect(() => {
        if(props.show){
            setShow(true);
        }
    }, []);

    const onChange = (e) => {
        setFile(e.target.files[0]);
    }

    return (
        <Modal show={show} onHide={setShow(false)}>
        <Modal.Header closeButton>
        <Modal.Title>Edit Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <br /> <br /> 
        Upload a new profile picture
        <Form>
        <input 
        type="file" 
        name="userAvatar" 
        onChange= {onChange} 
        />
        
        </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="success" >
            Upload
        </Button>
        </Modal.Footer>
        </Modal>
    );
}

export default AvatarUpload;
