import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ApiService from "../services/ApiService";
import { useEffect } from "react";
import { useState } from "react";
import { useImperativeHandle } from "react";
import { forwardRef } from "react";

const EditComponent = forwardRef((props, ref) => {

    const [id,setId] = useState('');
    const [make,setMake] = useState('');
    const [model,setModel] = useState('');
    const [year,setYear] = useState('');
    const [showModal, setShowModal] = useState(false);

    const loadCar = () => {
        ApiService.fetchCarById(window.localStorage.getItem("carId"))
            .then((res) => {
                let car = res.data;
                setId(car.id);
                setMake(car.make);
                setModel(car.model);
                setYear(car.year);
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
    }

    const saveCar = (e) => {
        e.preventDefault();
        let saveCar = {id: id, make: make, model: model, year: year};
        ApiService.editCar(saveCar)
            .then(() => ApiService.fetchCars())
            .then(res => {
                props.reloadCarList(res.data);
                close();
            });
     }

    const close = () => {
        setShowModal(false);
    }

    useImperativeHandle(ref, () => ({
        open() {
            loadCar();
            setShowModal(true);
        }
    }));

    const validate = () => {
        return year >= 1900 && year <=2020;
    }

   return (
        <Modal show={showModal} onHide={close}>
            <Modal.Header>
                <Modal.Title>Edit Car</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Make:</Form.Label>
                    <Form.Control placeholder="Make" name="make" value={make} onChange={onChangeMake}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Model:</Form.Label>
                    <Form.Control placeholder="Model" name="model" value={model} onChange={onChangeModel}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Year:</Form.Label>
                    <Form.Control placeholder="Year" name="year" value={year} onChange={onChangeYear}/>
                    <font color="red">{!validate() ? 'Year Error: Year must be >= 1900 and <=2020' : ""}</font>
                </Form.Group>

                <Button variant="primary" disabled={!validate()} onClick={saveCar}>Save</Button>
                <Button variant="dark" onClick={close}>Cancel</Button>
            </Form>
            </Modal.Body>
        </Modal>
    );
});

export default EditComponent;
