import React, { Component } from 'react'
import ApiService from "../services/ApiService";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useImperativeHandle } from "react";
import { forwardRef } from "react";

const AddComponent = forwardRef((props, ref) => {

    const [make,setMake] = useState('');
    const [model,setModel] = useState('');
    const [year,setYear] = useState('');
    const [message,setMessage] = useState('');
    const [everFocusedYear, setEverFocusedYear] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const saveCar = (e) => {
        e.preventDefault();
        let saveCar = {make: make, model: model, year: year};
        ApiService.addCar(saveCar)
            .then(() => ApiService.fetchCars())
            .then(res => {
                reloadCarList(res.data);
                close();
            });
     }

    const onChangeMake = (e) => {
        setMake(e.target.value);
    }

    const onChangeModel = (e) => {
        setModel(e.target.value);
    }

    const onChangeYear = (e) => {
        setYear(e.target.value);
        setEverFocusedYear(true);
    }

    const close = () => {
        setShowModal(false);
    }

    useImperativeHandle(ref, () => ({
        open() {
            setShowModal(true);
            setMake('');
            setModel('');
            setYear('');
            setEverFocusedYear(false);
        }
    }));

    const open = () => {
        setShowModal(true);
        setMake('');
        setModel('');
        setYear('');
        setEverFocusedYear(false);
    }

    const validate = () => {
        if (!everFocusedYear)
            return true;
        else
            return year >= 1900 && year <=2020;
    }

    return(
        <Modal show={showModal} onHide={close}>
            <Modal.Header>
            <Modal.Title>Add Car</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Make:</Form.Label>
                    <Form.Control type="text" name="make" value={make} onChange={onChangeMake} required/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Model:</Form.Label>
                    <Form.Control name="model" value={model} onChange={onChangeModel} required/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Year:</Form.Label>
                    <Form.Control name="year" value={year} onChange={onChangeYear} required/>
                    <font color="red">{!validate() ? 'Year Error: Year must be >= 1900 and <=2020' : ""}</font>
                </Form.Group>

                <Button variant="primary" disabled={!validate()} onClick={saveCar}>Save</Button>
                <Button variant="dark" onClick={close}>Cancel</Button>
            </Form>
            </Modal.Body>
        </Modal>
    );
});

export default AddComponent;
