import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
// import div from 'react-bootstrap/div';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import "./src/index.css"
const FormA = () => {
    const baseurl = "http://localhost:8020"

    const [formadata, setformdata] = useState({
        firstname: "",
        lastname: "",
        email: "",
        dob: "",
        Rstreet1: "",
        Rstreet2: "",
        Pstreet1: "",
        Pstreet2: "",
        file1: null,
        typefile: "",
        filename1: "",
        filename2: "",
        typefile2: "",
        file2: null

    })
    const [Permanentaddress, setpermanentaddress] = useState(false)
    if (Permanentaddress) {
        formadata.Pstreet1 = formadata.Rstreet1
        formadata.Pstreet2 = formadata.Rstreet2
    }
    const handlechange = (e) => {
        const { name, value } = e.target
        setformdata({ ...formadata, [name]: value })
    }
    //FORM VALIDATION
    const [formErrors, setFormErrors] = useState({});

    const isValidAge = (age) => {
        return parseInt(age) >= 18 && parseInt(age) <= 100;

    };
    const calculateAge = (dob) => {

        const birthYear = new Date(dob).getFullYear();
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;
        return age;
    }
    const validate = (values) => {
        const errors = {};
        if (!values.firstname) {
            errors.firstname = "Username is required!";
        }
        if (!values.lastname) {
            errors.lastname = "lastname is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        }
        if (!values.dob) {
            errors.dob = "dob is required";
        } else {
            const age = calculateAge(values.dob);
            if (!isValidAge(age)) {
                errors.dob = "Min age should be 18 years";
            }
        }
        if (!values.Rstreet1) {
            errors.Rstreet1 = "Residential address is required!";
        }
        if (!values.Rstreet2) {
            errors.Rstreet2 = "Residential address is required!";
        }
        if (!Permanentaddress) {
            errors.Pstreet1 = " Permanent Address is required!";
            errors.Pstreet2 = " Permanent Address is required!";
        }
        if (values.Pstreet1) {
            errors.Pstreet1 = ""
        }
        if (values.Pstreet2) {
            errors.Pstreet2 = ""
        }
        if (!values.typefile) {
            errors.typefile = "type of file is required"
        }
        if (!values.filename1) {
            errors.filename1 = "filename is required"
        }
       
        if (!values.file1) {
            errors.file1 = "document is required"
        }
        // upload validation
        // if (values.file1) {
        //     const allowedFileTypes = ['jpg', 'png', 'pdf'];

        //     const fileType = values.typefile;
        //     const fileExtension = values.file1.name.split('.').pop().toLowerCase();

        //     if (!allowedFileTypes.includes(fileType)) {
        //         errors.typefile = "Invalid file type for File 1.";
        //     } else if (fileExtension !== fileType) {
        //         errors.typefile = `File extension (${fileExtension}) does not match selected file type (${fileType}).`;
        //     }
        // }
       
        return errors;
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const files = e.target.files[0];
        setformdata((prevform) => ({
            ...prevform,
            file1: file,
            file2: files
        }));
    };

    const handlesubmit = async (e) => {
        e.preventDefault()
        setFormErrors(validate(formadata));
        console.log(formadata)

        const formData = new FormData();
        formData.append('firstname', formadata.firstname);
        formData.append('lastname', formadata.lastname);
        formData.append('dob', formadata.dob);
        formData.append('email', formadata.email);
        formData.append('Rstreet1', formadata.Rstreet1);
        formData.append('Rstreet2', formadata.Rstreet2);
        formData.append('Pstreet1', formadata.Pstreet1);
        formData.append('Pstreet2', formadata.Pstreet2);
        formData.append('filename1', formadata.filename1);
        formData.append('filename2', formadata.filename2);
        formData.append('typefile', formadata.typefile);
        formData.append('typefile2', formadata.typefile2);
        formData.append('file1', formadata.file1);
        formData.append('file2', formadata.file2);

        try {
            const response = await axios.post(`${baseurl}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };


    return (
        <div className='container-fluid'>
            <h6 className='fs-1 text-center mb-5'>Mern Test</h6>
            <div className='container'>
                <Form onSubmit={handlesubmit}>
                    <Row className='mb-4'>
                        <div className='col-lg-6 col-md-5 col-sm-12'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type='text' placeholder="Enter your First name" name='firstname' value={formadata.firstname} onChange={handlechange} />
                            <p>{formErrors.firstname}</p>

                        </div>
                        <div className='col-lg-6 col-md-5 col-sm-12'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type='text' placeholder="Enter your Last name" name='lastname' value={formadata.lastname} onChange={handlechange}
                            />
                            <p>{formErrors.lastname}</p>
                        </div>
                    </Row>
                    <Row className='mb-3'>
                        <div className='col-lg-6 col-md-5 col-sm-12'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' placeholder="my name@example.com" name='email' value={formadata.email} onChange={handlechange} />
                            <p>{formErrors.email}</p>
                        </div>
                        <div className='col-lg-6 col-md-5 col-sm-12'>
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type='date' placeholder="Date of Birth" name='dob' value={formadata.dob} onChange={handlechange} />
                            <p>{formErrors.dob}</p>
                        </div>
                    </Row>
                    <Row className='mb-4'>
                        <h6>Residential Address</h6>
                        <div className='col-lg-6 col-md-5 col-sm-12'>
                            <Form.Label>Street1</Form.Label>
                            <Form.Control type='text' name='Rstreet1' value={formadata.Rstreet1} onChange={handlechange} />
                            <p>{formErrors.Rstreet1}</p>
                        </div>
                        <div className='col-lg-6 col-md-5 col-sm-12'>
                            <Form.Label>Street2</Form.Label>
                            <Form.Control type='text' name='Rstreet2' value={formadata.Rstreet2} onChange={handlechange} />
                            <p>{formErrors.Rstreet2}</p>
                        </div>
                    </Row>

                    <div><input type='checkbox' defaultChecked={Permanentaddress} onChange={() => {
                        setpermanentaddress((prev) => !prev);
                    }}></input><span className='ms-2'>Same as Residential Area</span></div>

                    <Row className='mb-4'>
                        <h6>Permanent Address</h6>
                        <div className='col-lg-6 col-md-5 col-sm-12'>
                            <Form.Label>Street1</Form.Label>
                            <Form.Control type='text' name='Pstreet1' value={formadata.Pstreet1} onChange={handlechange} />
                            <p>{formErrors.Pstreet1}</p>
                        </div>
                        <div className='col-lg-6 col-md-5 col-sm-12'>
                            <Form.Label>Street2</Form.Label>
                            <Form.Control type='text' name='Pstreet2' value={formadata.Pstreet2} onChange={handlechange} />
                            <p>{formErrors.Pstreet2}</p>
                        </div>
                    </Row>

                    {/* //Upload Documents */}
                    <Row className='mb-4'>

                        <div className='col-lg-3 col-md-3 col-sm-12'>
                            <Form.Label>File Name</Form.Label>
                            <Form.Control type='text' value={formadata.filename1} name='filename1' onChange={handlechange} />
                            <p>{formErrors.filename1}</p>
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-12'>
                            <Form.Label>Type of File</Form.Label>
                            <Form.Select value={formadata.typefile} name='typefile' onChange={handlechange}>
                                <option></option>
                                <option>jpg</option>
                                <option>png</option>
                                <option>pdf</option>
                            </Form.Select>
                            <p>{formErrors.typefile}</p>
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-12'>
                            <Form.Label>Upload File</Form.Label>
                            <Form.Control type='file' name='file1' onChange={handleImageChange} />
                            <p>{formErrors.file1}</p>
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-12'>
                            <div className='mt-4'><Button variant='secondary'><AddIcon /></Button></div>
                        </div>
                    </Row>
                    <Row className='mb-3'>

                        <div className='col-lg-3 col-md-3 col-sm-12'>
                            <Form.Label>File Name</Form.Label>
                            <Form.Control type='text' value={formadata.filename2} name='filename2' onChange={handlechange} />
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-12'>
                            <Form.Label>Type OF File</Form.Label>
                            <Form.Select value={formadata.typefile2} name='typefile2' onChange={handlechange}>
                                <option></option>
                                <option>jpg</option>
                                <option>png</option>
                                <option>pdf</option>
                            </Form.Select>
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-12'>
                            <Form.Label>Upload File</Form.Label>
                            <Form.Control type='file' name='file2' onChange={handleImageChange} />
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-12'>
                            <div className='mt-3'><Button variant='light'><DeleteIcon /></Button></div>
                        </div>
                    </Row>

                    <Row className='mb-4'>
                        <div className='col-12'>
                            <div className='d-flex justify-content-center'><button className='sub' type='submit'>Submit</button></div>
                        </div>
                    </Row>
                </Form>
            </div>

        </div>
    )
}

export default FormA
