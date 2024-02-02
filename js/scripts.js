'use strict';

const inputTeams = document.querySelector('#teams');
const inputRate = document.querySelector('#rate');
const inputPayment = document.querySelector('#payment');
const inputChoice = document.querySelector('#choice');
const submitButton = document.querySelector('#submit');

const addEvent = () => {
    const tr = document.createElement('tr');
    let possibleWin = parseFloat(inputPayment.value) * parseFloat(inputRate.value) - 0.12;
    let win = parseFloat((possibleWin) * 0.88).toFixed(2); 
    tr.innerHTML = `
        <td>${inputTeams.value}</td>
        <td>${inputRate.value}</td>
        <td>${inputPayment.value}</td>
        <td>${inputChoice.value}</td>
        <td>${win} zł</td>
    `
    document.querySelector('tbody').appendChild(tr);

    saveToLocalStorage(inputTeams.value, inputRate.value, inputPayment.value, inputChoice.value, win);
};

const saveToLocalStorage = (teams, rate, payment, choice, win) => {

    if (typeof(Storage) !== "undefined") {
        let events = JSON.parse(localStorage.getItem("events")) || [];
        
        events.push({ teams, rate, payment, choice, win });
        localStorage.setItem("events", JSON.stringify(events));
    } else {
        console.error("Brak wsparcia dla localStorage w tej przeglądarce.");
    }
};

const loadEventsFromLocalStorage = () => {

    if (typeof(Storage) !== "undefined") {
        const savedEvents = JSON.parse(localStorage.getItem("events"));

        if (savedEvents) {
            const tbody = document.querySelector('tbody');

            savedEvents.forEach(event => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${event.teams}</td>
                    <td>${event.rate}</td>
                    <td>${event.payment}</td>
                    <td>${event.choice}</td>
                    <td>${event.win} zł</td>
                `;
                tbody.appendChild(tr);
            });
        }
    } else {
        console.error("Brak wsparcia dla localStorage w tej przeglądarce.");
    }
};

window.onload = loadEventsFromLocalStorage;


submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    addEvent();
    inputTeams.value = '';
    inputRate.value = '';
    inputPayment.value = '';
    inputChoice.value = '';
});

