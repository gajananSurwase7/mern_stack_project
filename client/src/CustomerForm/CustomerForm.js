import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from "yup";

const SignupSchema = yup.object().shape({
    firstName: yup.string().required(),
});

const CustomerForm = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [profilePicture, setProfilePicture] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFeatched, setIsFeatched] = useState(false);
    const [editcustData, setEditCustData] = useState([])
    const [singleCustDetails, setSingleCustDetails] = useState([])
    const history = useHistory();
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm({
    });


    useEffect(() => {
        const cust_id = localStorage.getItem("custId");
        if (cust_id) {
            setIsLoaded(true);
            let temp_cust = JSON.parse(cust_id);
            setSingleCustDetails(temp_cust);
            reset(temp_cust)

        }
    }, [reset]);

    useEffect(() => {

    }, [singleCustDetails]);

    const handleChange = (e) => {
        if (e.target.name === "profilePicture") {
            setProfilePicture({
                profilePicture: e.target.files,
            });
        }
    };

    const onSubmit = (data) => {

        const formData = new FormData();
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('occupation', data.occupation);
        formData.append('dob', data.dob);
        formData.append('status', data.status);
        formData.append('bio', data.bio);

        formData.append('profilePicture', profilePicture)

        console.log("formdata ", formData);

        const req_data2 = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*",
            },
        }

        axios.post('http://localhost:5000/customer/createCustomer', formData, req_data2)
            .then((res) => {
                console.log('res ', res);
                if (res.data.success) {
                    history.push("/");
                }
            })
            .catch((err) => {
                console.log("error " + JSON.stringify(err))
            })
    }

    const editCustomerDetails = (data) => {

        const formData = new FormData();
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('occupation', data.occupation);
        formData.append('dob', data.dob);
        formData.append('status', data.status);
        formData.append('bio', data.bio);

        formData.append('profilePicture', profilePicture)

        const req_data2 = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*",
            },
        }

        axios.put(`http://localhost:5000/customer/updatecustomer/${singleCustDetails[0]._id}`, formData, req_data2)
            .then((res) => {
                console.log('res ', res);
                if (res.data.success) {
                    history.push("/");
                }
            })
            .catch((err) => {
                console.log("error " + JSON.stringify(err))
            })
    }

    return (
        <div className="container" data-testid="custform-1">
            <div className="col-md-4 offset-md-4">
                <h4 style={{ paddingTop: "20px" }}>Customer Form</h4>

                {singleCustDetails.length != 0 ?
                    (
                        <form onSubmit={handleSubmit(editCustomerDetails)}>
                            <div className="form-group">
                                <input className="form-control"
                                    type="text"
                                    name="firstName"
                                    defaultValue={isLoaded ? singleCustDetails[0].firstName : 'NAME'}
                                    {...register('firstName', { required: true })} placeholder="First Name">

                                </input>
                                {errors.firstName && errors.firstName.type === "required" && <span style={{ color: "red" }}>This is required</span>}
                            </div>
                            <div className="form-group">
                                <input
                                    defaultValue={isLoaded ? singleCustDetails[0].lastName : ''}
                                    className="form-control"
                                    {...register('lastName', { required: true })}
                                    placeholder="Last Name" />
                                {errors.lastName && errors.lastName.type === "required" && <span style={{ color: "red" }}>This is required</span>}
                            </div>
                            <div className="form-group">
                                <select
                                    className="form-control"
                                    placeholder="occupation"
                                    defaultValue={isLoaded ? singleCustDetails[0].occupation : ''}
                                    {...register('occupation', { required: true })}>
                                    <option value="employed">employed</option>
                                    <option value="business">business</option>
                                    <option value="student">student</option>

                                </select>
                                {errors.occupation && errors.occupation.type === "required" && <span style={{ color: "red" }}>This is required</span>}

                            </div>
                            <div className="form-group" style={{ display: "grid" }}>
                                <DatePicker
                                    className="form-control"
                                    // defaultValue={isLoaded ? singleCustDetails[0].dob : ''}
                                    {...register('dob', { required: true })}
                                    // dateFormat="yyyy/mm/dd"
                                    value={startDate}
                                    selected={startDate}
                                    placeholderText={singleCustDetails[0].dob}
                                    onChange={date => setStartDate(date)} />

                                {errors.dob && errors.dob.type === "required" && <span style={{ color: "red" }}>This is required</span>}
                            </div>

                            <div className="form-group">
                                <textarea
                                    className="form-control"
                                    defaultValue={isLoaded ? singleCustDetails[0].bio : ""}
                                    {...register('bio')} placeholder="bio"
                                    rows="2"
                                    cols="50"></textarea></div>
                            <div className="form-check form-check-inline" style={{ fontWeight: "bold" }}>Status:</div>
                            <div className="form-check form-check-inline" >
                                <input
                                    className="form-check-input"
                                    // defaultValue={isLoaded ? singleCustDetails[0].status : ''}
                                    defaultChecked={isLoaded && singleCustDetails[0].status == "Active"}
                                    {...register('status', { required: true })}
                                    type="radio"
                                    value="Active"></input>

                                <label className="form-check-label" for="active">Active</label>
                            </div>
                            <div className="form-check form-check-inline"  >
                                <input
                                    className="form-check-input"
                                    defaultChecked={isLoaded && singleCustDetails[0].status == "Inactive"}
                                    {...register('status', { required: true })}
                                    type="radio" value="Inactive" ></input>
                                <label className="form-check-label" for="inactive">Inactive</label>&nbsp;&nbsp;
                        {errors.status && errors.status.type === "required" && <span style={{ color: "red" }}>This is required</span>}
                            </div><br /><br />
                            <div className="form-group">
                                <input onChange={e => {
                                    setProfilePicture(e.target.files[0])
                                }}
                                    // value={isLoaded ? singleCustDetails[0].profilePicture : ''}
                                    type="file" name="profilePicture"></input></div>
                            <Button className="btn btn-primary btn-large centerButton" type="submit">Save Changes</Button>
                        </form>) : ""}

                {singleCustDetails.length == 0 ?
                    (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <input className="form-control"
                                    type="text"
                                    name="firstName"
                                    data-testid="firstName-1"
                                    {...register('firstName', { required: true })} placeholder="First Name">

                                </input>
                                {errors.firstName && errors.firstName.type === "required" && <span style={{ color: "red" }}>This is required</span>}
                            </div>
                            <div className="form-group">
                                <input
                                    data-testid="lastName-1"
                                    className="form-control"
                                    {...register('lastName', { required: true })}
                                    placeholder="Last Name" />
                                {errors.lastName && errors.lastName.type === "required" && <span style={{ color: "red" }}>This is required</span>}
                            </div>
                            <div className="form-group">
                                <select
                                    data-testid="occupation-1"
                                    className="form-control"
                                    placeholder="occupation"
                                    {...register('occupation', { required: true })}>
                                    <option value="employed">employed</option>
                                    <option value="business">business</option>
                                    <option value="student">student</option>

                                </select>
                                {errors.occupation && errors.occupation.type === "required" && <span style={{ color: "red" }}>This is required</span>}

                            </div>
                            <div className="form-group" style={{ display: "grid" }} data-testid="dob-1"
                            >
                                <DatePicker
                                    className="form-control"
                                    {...register('dob', { required: true })}
                                    value={startDate}
                                    selected={startDate}
                                    onChange={date => setStartDate(date)} />
                                {errors.dob && errors.dob.type === "required" && <span style={{ color: "red" }}>This is required</span>}
                            </div>


                            <div className="form-group">
                                <textarea
                                    data-testid="bio-1"
                                    className="form-control"
                                    {...register('bio')} placeholder="bio"
                                    rows="2"
                                    cols="50"></textarea></div>

                            <div className="form-check form-check-inline" style={{ fontWeight: "bold" }}>Status:</div>
                            <div className="form-check form-check-inline" >
                                <input
                                    data-testid="activestatus-1"
                                    className="form-check-input"
                                    {...register('status', { required: true })}
                                    type="radio"
                                    value="Active"></input>

                                <label className="form-check-label" for="active">Active</label>
                            </div>
                            <div className="form-check form-check-inline"  >
                                <input
                                    data-testid="inactivestatus-1"
                                    className="form-check-input"
                                    {...register('status', { required: true })}
                                    type="radio" value="Inactive" ></input>
                                <label className="form-check-label" for="inactive">Inactive</label>&nbsp;&nbsp;
                        {errors.status && errors.status.type === "required" && <span style={{ color: "red" }}>This is required</span>}
                            </div><br /><br />

                            <div className="form-group">
                                <input
                                    data-testid="inputtype-1"
                                    onChange={e => {
                                        setProfilePicture(e.target.files[0])
                                    }}
                                    type="file" ></input>
                            </div>
                            <Button data-testid="custformsubmitbtn-1" className="btn btn-primary btn-large centerButton" type="submit">Submit</Button>
                        </form>) : ""}


            </div>
        </div>
    );
}

export default CustomerForm;