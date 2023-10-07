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
    const deeds = document.getElementById('deeds');
    const accommodations = document.getElementById('accommodations');

    let animal = NotebookRepository.animals().find(item => item.id === data.productId)

    if (animal) {
        name.textContent = `${animal.name}`;
        description.textContent = `Описание животного: ${animal.description}`;
        deeds.textContent = `Чем питается: ${animal.deeds}`;
        accommodations.textContent = `Условия проживания: ${animal.accommodations}`;

        const imageProductId = document.getElementById('imageProductId');
        let img = document.createElement('img');
        img.src = `../../image/animals/${animal.id}.png`
        imageProductId.appendChild(img);
    }

    const containerDOM = document.getElementById('container');
    let button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Вернуться в начало';
    button.onclick = function () {
        ipcRenderer.send('backToMain');
    };

    let buttonBackQuestion = document.createElement('button');
    buttonBackQuestion.id = 'buttonBackQuestion';
    buttonBackQuestion.type = 'button';
    buttonBackQuestion.textContent = 'К предыдущему вопросу';
    buttonBackQuestion.onclick = function () {
        ipcRenderer.send('showQuestions', {questionId: data.questionId});
    };

    containerDOM.appendChild(button);
    containerDOM.appendChild(buttonBackQuestion);

});