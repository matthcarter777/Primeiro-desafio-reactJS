import React, { useState, useEffect} from 'react';
import api from './services/api';


import './App.css';

import Header from  './components/Header';

export default function App(){
    const [cars, setCars] = useState([]);

    useEffect(() => {
        api.get('/carros').then( response => {
            console.log(response.data);
        })
    }, []);

    async function handleCar(){
        const response = await api.post('/carros', {
            marca: "Critoen",
	        modelo: `C3 ${Date.now()}`,
	        ano: '2008'
        });

        const car = response.data;

        setCars([...cars, car]);
    }

    return (
        <>  
            <Header/>
            <div id="home">
                <ul>
                    { cars.map( car => <li key={car.id}>{car.modelo} | {car.marca} | {car.ano}</li>)}
                </ul>
            </div>
            <div id="content">
                <button type="button" onClick={handleCar}>Adicionar Projeto</button> 
            </div>
        </>
    )
}