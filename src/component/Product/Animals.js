import * as NotebookRepository from "../../repository/NotebookRepository.js";
import {animals} from "../../repository/NotebookRepository.js";
const {ipcRenderer} = require('electron');


// {
//     "id": 15,
//     "name" : "Курица",
//     "description": "",
//     "deeds" : "",
//     "accommodations" : ""
// }

ipcRenderer.on('showProductToReceive', (event, data) => {
    const name = document.getElementById('name');
    const description = document.getElementById('description');
    const nutrition = document.getElementById('nutrition');

    console.log(data.productId);
    let animal = NotebookRepository.animals().find(item => item.id === data.productId)
    if (animal) {
        name.textContent = `Порода: ${animal.name}`;
        description.textContent = `Описание собаки: ${animal.description}`;
        if (animal.nutrition) {
            nutrition.textContent = `Питание собаки: ${animal.nutrition}`;
        }

        const imageProductId = document.getElementById('imageProductId');
        let img = document.createElement('img');
        img.width = 300;
        img.src = `../../image/animals/${animal.id}.jpg`
        imageProductId.appendChild(img);
    }

    const containerDOM = document.getElementById('container');
    let button = document.createElement('button');
    button.type = 'button';
    button.className = 'button-back';
    button.innerHTML = '&#128062;';
    button.onclick = function () {
        ipcRenderer.send('backToMain');
    };

    let buttonBackQuestion = document.createElement('button');
    buttonBackQuestion.id = 'buttonBackQuestion';
    buttonBackQuestion.type = 'button';
    buttonBackQuestion.className = 'button-back';
    buttonBackQuestion.innerHTML = '&#10094;';
    buttonBackQuestion.onclick = function () {
        ipcRenderer.send('showQuestions', {questionId: data.questionId});
    };

    containerDOM.appendChild(button);
    containerDOM.appendChild(buttonBackQuestion);

});