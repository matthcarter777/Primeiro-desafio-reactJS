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
        let txtMarca = document.getElementById('marca')
        let txtModelo = document.getElementById('modelo')
        let txtAno = document.getElementById('ano')

        console.log(txtMarca.value,txtModelo.value,txtAno.value)


        const response = await api.post('/carros', {
            marca: txtMarca.value,
	        modelo: txtModelo.value,
	        ano: txtAno.value
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
            <div id="values">
                <input type="text" id="modelo" placeholder="Modelo"></input>
                <input type="text" id="marca" placeholder="Marca"></input>
                <input type="text" id="ano" placeholder="Ano"></input>
            </div>
            <div id="content">
                <button type="button" onClick={handleCar}>Adicionar Projeto</button> 
            </div>
        </>
    )
}