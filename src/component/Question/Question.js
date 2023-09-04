import * as KBRepository from "../../repository/KBRepository.js";
const { ipcRenderer} = require('electron');

// Отправка выбора пользователя в главный процесс
const pathComponent = '/component';

let questionDescriptionDOM;
let answersDOM;

// Обработка результата экспертной системы
document.addEventListener('DOMContentLoaded', () => {
    questionDescriptionDOM = document.getElementById('questionDescription');
    answersDOM = document.getElementById("answers");
    // Асинхронная загрузка данных
    dataFilling(1, questionDescriptionDOM, answersDOM);
});



function createLiAndButton(answer, answers) {
    const li = document.createElement('li'); // создаем элемент <li>
    const button = createButtons(answer);
    li.appendChild(button);
    answers.appendChild(li); // добавляем элемент <li> внутрь элемента <ul>
}

function createButtons(answer) {
    const button = document.createElement('button'); // создаем кнопку
    button.textContent = answer.description; // устанавливаем текст для элемента <li>
    button.addEventListener('click', () => {
        nextQuestionUpdate(answer.linkQuestionId, answer.linkProductId);
    });
    return button
}

function nextQuestionUpdate(questionId, productId) {
    if (questionId) {
        clearUl(answersDOM);
        dataFilling(questionId, questionDescriptionDOM, answersDOM);
    } else if (productId) {
        ipcRenderer.send('showProduct', {productId: productId});
    }
}

const dataFilling = (questionId, questionDescription, answers) => {
    let startQuestion = KBRepository.questions().find(item => item.id === questionId);
    questionDescription.textContent = startQuestion.description;
    startQuestion.answers.forEach(answer => {
        createLiAndButton(answer, answers);
    });
}

function clearUl(answers) {
    while (answers.firstChild) {
        answers.removeChild(answers.firstChild);
    }
}