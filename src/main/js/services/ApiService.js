import axios from 'axios';

const CAR_API_BASE_URL = 'http://localhost:8080/cars';

const CSRF_TOKEN = document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1];
const instance = axios.create({
    headers: { "X-XSRF-TOKEN": CSRF_TOKEN }
});

class ApiService {

    fetchCars() {
        return instance.get(CAR_API_BASE_URL);
    }

    fetchCarById(carId) {
        return instance.get(CAR_API_BASE_URL + '/' + carId);
    }

    deleteCar(carId) {
        return instance.delete(CAR_API_BASE_URL + '/' + carId);
    }

    addCar(car) {
        return instance.post(""+CAR_API_BASE_URL, car);
    }

    editCar(car) {
        return instance.put(CAR_API_BASE_URL + '/' + car.id, car);
    }

}

export default new ApiService();