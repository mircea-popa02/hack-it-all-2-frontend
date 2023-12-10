import React, { Component } from 'react';
import CanvasJSReact from '../canvasjs.react';


import { useState } from 'react';
import { useEffect } from 'react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

CanvasJS.addColorSet("blueShades",
    [
        "#0018a8",
        "#0053DB",
        "#007DF1",
        "#00A1EC",
        "#00C2D5",
        "#00E2B6"
    ]);


const Graph = () => {

    const [incomes, setIncome] = useState([]);
    const [expenses, setExpenses] = useState([]);


    useEffect(() => {
        var url = 'http://localhost:5000/api/payments/ceva/';

        url += localStorage.getItem('token');


        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Something went wrong');
                }
            }
            )
            .then(data => {
                console.log(data);
                setIncome(data.incomes);
                setExpenses(data.expenses);
            }
            )
            .catch(err => {
                console.log(err);
            })
    }, [])

    var sum = 0;
    let food = 0;
    let other = 0;
    let activities = 0;
    let entertainment = 0;
    let transport = 0;
    let accomodation = 0;

    for (var i = 0; i < expenses.length; i++) {
        if (expenses[i].type === "Food & Drinks") {
            food += expenses[i].value;
        } else if (expenses[i].type === "Activities") {
            activities += expenses[i].value;
        } else if (expenses[i].type === "Entertainment") {
            entertainment += expenses[i].value;

        } else if (expenses[i].type === "Transport") {
            transport += expenses[i].value;

        } else if (expenses[i].type === "Accomodation") {
            accomodation += expenses[i].value;

        } else {
            other += expenses[i].value;
        }

        sum += expenses[i].value;
    }

    console.log(sum);

    const dataPoints = [
        { y: food * 100 / sum, label: "Food & Drinks" },
        { y: activities * 100 / sum, label: "Activities" },
        { y: entertainment * 100 / sum, label: "Entertainment" },
        { y: transport * 100 / sum, label: "Transport" },
        { y: (accomodation * 100 / sum).toFixed(2), label: "Accomodation" },
        { y: (other * 100 / sum).toFixed(2), label: "Other" }
    ];

    // sum all incomes
    var sum2 = 0;
    for (var i = 0; i < incomes.length; i++) {
        sum2 += incomes[i].value;
    }

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "ligh1", // "light1", "dark1", "dark2"
        title: {
        },
        colorSet: "blueShades",
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}%",
            startAngle: -90,
            dataPoints: dataPoints
        }]
    }

    return (
        <>
            {expenses.length > 0 ?
            <CanvasJSChart options={options} />
            :
            <p>You have made no payments in the last 30 days.</p>
            }
        </>
    );

}

export default Graph;             