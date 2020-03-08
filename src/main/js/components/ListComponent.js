import ApiService from "../services/ApiService";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import AddComponent from "./AddComponent";
import EditComponent from "./EditComponent";
const React = require('react');

const style = {
    color: 'red',
    margin: '10px'
}

class ListComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            cars: [],
            message: null
        }
        this.deleteCar = this.deleteCar.bind(this);
        this.editCar = this.editCar.bind(this);
        this.addCar = this.addCar.bind(this);
        this.reloadCarList = this.reloadCarList.bind(this);
        this.addComponent = React.createRef();
        this.editComponent = React.createRef();
    }

    componentDidMount() {
        ApiService.fetchCars()
            .then(res => {
                const cars = res.data;
                this.setState({ cars: cars });
            })
    }

    reloadCarList(cars) {
        this.setState({cars: cars})
    }

    deleteCar(carId) {
        ApiService.deleteCar(carId)
            .then(res => {
                this.setState({message : 'Car deleted successfully.'});
                this.setState({cars: this.state.cars.filter(car => car.id !== carId)});
            })

    }

    editCar(id) {
        window.localStorage.setItem("carId", id);
        this.editComponent.current.open();
    }

    addCar() {
        window.localStorage.removeItem("carId");
        this.addComponent.current.open();
    }

    render() {
        return (
            <div>
                <h1 className="text-center" style={style}>React Car Application</h1>
                <h2 className="text-center">Car Details</h2>
                <Button variant="primary" onClick={() => this.addCar()}> Add Car</Button>
                <AddComponent reloadCarList={this.reloadCarList} ref={this.addComponent}/>
                <EditComponent reloadCarList={this.reloadCarList} ref={this.editComponent}/>
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
                        this.state.cars.map(
                            car =>
                                <tr key={car.id}>
                                    <td>{car.id}</td>
                                    <td>{car.make}</td>
                                    <td>{car.model}</td>
                                    <td>{car.year}</td>
                                    <td>
                                        <Button variant="dark" onClick={() => this.deleteCar(car.id)}> Delete</Button>
                                        {' '}
                                        <Button variant="primary" onClick={() => this.editCar(car.id)}> Edit</Button>
                                    </td>
                                </tr> )
                    }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default ListComponent;