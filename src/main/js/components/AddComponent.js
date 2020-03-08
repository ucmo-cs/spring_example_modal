import React, { Component } from 'react'
import ApiService from "../services/ApiService";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";

class AddComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            make: '',
            model: '',
            year: '',
            everFocusedYear: false,
            message: null
        }
        this.saveCar = this.saveCar.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    saveCar = (e) => {
        e.preventDefault();
        let car = {make: this.state.make, model: this.state.model, year: this.state.year};
        ApiService.addCar(car)
            .then(() => ApiService.fetchCars())
            .then(res => {
                this.props.reloadCarList(res.data);
                this.close();
            });
     }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    onChangeYear = (e) =>
        this.setState({ [e.target.name]: e.target.value ,
                              everFocusedYear: true});

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true,
                              make: '',
                              model: '',
                              year: '',
                              everFocusedYear: false});
    }

    validate() {
        if (!this.state.everFocusedYear)
            return true;
        else
            return this.state.year >= 1900 && this.state.year <=2020;
    }

    render() {
        return(
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header>
                <Modal.Title>Add Car</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group>
                    <Form.Label>Make:</Form.Label>
                        <Form.Control type="text" name="make" value={this.state.make} onChange={this.onChange} required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Model:</Form.Label>
                        <Form.Control name="model" value={this.state.model} onChange={this.onChange} required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Year:</Form.Label>
                        <Form.Control name="year" value={this.state.year} onChange={this.onChangeYear} required/>
                        <font color="red">{!this.validate() ? 'Year Error: Year must be >= 1900 and <=2020' : ""}</font>
                    </Form.Group>

                    <Button variant="primary" disabled={!this.validate()} onClick={this.saveCar}>Save</Button>
                    <Button variant="dark" onClick={this.close}>Cancel</Button>
                </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default AddComponent;