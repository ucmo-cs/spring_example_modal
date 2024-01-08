import ApiService from "../services/ApiService";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import AddComponent from "./AddComponent";
import EditComponent from "./EditComponent";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
const React = require('react');

const style = {
    color: 'red',
    margin: '10px'
}

function ListComponent(props) {

    const addComponent = useRef();
    const editComponent = useRef();

    const [cars,setCars] = useState([]);
    const [message,setMessage] = useState(null);

    useEffect(()=>{
        ApiService.fetchCars()
            .then(res => {
                setCars(res.data);
            })
    },[]);

    const reloadCarList = (cars) => {
        setCars(cars)
    }

    const deleteCar = (carId) => {
        ApiService.deleteCar(carId)
            .then(res => {
                setMessage('Car deleted successfully.');
                setCars(cars.filter(car => car.id !== carId));
            })

    }

    const editCar = (id) => {
        window.localStorage.setItem("carId", id);
        editComponent.current.open();
    }

    const addCar = () => {
        window.localStorage.removeItem("carId");
        addComponent.current.open();
    }

    return (
        <div>
            <h1 className="text-center" style={style}>React Car Application</h1>
            <h2 className="text-center">Car Details</h2>
            <Button variant="primary" onClick={() => addCar()}> Add Car</Button>
            <AddComponent reloadCarList={reloadCarList} ref={addComponent}/>
            <EditComponent reloadCarList={reloadCarList} ref={editComponent}/>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Year</th>
                </tr>
                </thead>
                <tbody>
                {
                    cars.map(
                        car =>
                            <tr key={car.id}>
                                <td>{car.id}</td>
                                <td>{car.make}</td>
                                <td>{car.model}</td>
                                <td>{car.year}</td>
                                <td>
                                    <Button variant="dark" onClick={() => deleteCar(car.id)}> Delete</Button>
                                    {' '}
                                    <Button variant="primary" onClick={() => editCar(car.id)}> Edit</Button>
                                </td>
                            </tr> )
                }
                </tbody>
            </Table>
        </div>
    )
}

export default ListComponent;
