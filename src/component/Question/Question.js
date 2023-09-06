import * as KBRepository from "../../repository/KBRepository.js";

const {ipcRenderer} = require('electron');

// Отправка выбора пользователя в главный процесс
const pathComponent = '/component';

let questionDescriptionDOM;
let answersDOM;
let containerDOM;
let currentQuestionId;

// Обработка результата экспертной системы
ipcRenderer.on('showQuestionsToReceive', (event, data) => {
    questionDescriptionDOM = document.getElementById('questionDescription');
    answersDOM = document.getElementById("answers");
    containerDOM = document.getElementById('container');

    let buttonMainWindow = document.createElement('button');
    buttonMainWindow.id = 'buttonMainWindow';
    buttonMainWindow.type = 'button';
    buttonMainWindow.textContent = 'Вернуться в начало';
    buttonMainWindow.onclick = function () {
        ipcRenderer.send('backToMain');
    };
    containerDOM.appendChild(buttonMainWindow);


    // Асинхронная загрузка данных
    dataFilling(data.questionId, questionDescriptionDOM, answersDOM);
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
        removeAnswers(answersDOM);
        dataFilling(questionId, questionDescriptionDOM, answersDOM);
    } else if (productId) {
        ipcRenderer.send('showProduct', {productId: productId, questionId: currentQuestionId});
    }
}

function backQuestionUpdate(questionId) {
    removeAnswers(answersDOM);
    dataFilling(questionId, questionDescriptionDOM, answersDOM);
}

const dataFilling = (questionId, questionDescription, answers) => {
    let startQuestion = KBRepository.questions().find(item => item.id === questionId);
    questionDescription.textContent = startQuestion.description;
    startQuestion.answers.forEach(answer => {
        createLiAndButton(answer, answers);
    });
    currentQuestionId = startQuestion.id;
    if (questionId !== 1) {
        createButtonBackQuestion();
    } else {
        removeButtonBackQuestion();

    }
}

function removeAnswers(answers) {
    while (answers.firstChild) {
        answers.removeChild(answers.firstChild);
    }
}

function removeButtonBackQuestion(answers) {
    let buttonBackQuestion = document.getElementById("buttonBackQuestion")
    if (buttonBackQuestion) {
        containerDOM.removeChild(buttonBackQuestion);
    }
}

function backToQuestion(currentQuestionId) {
    backQuestionUpdate(currentQuestionId);
}

function createButtonBackQuestion() {
    if (!document.getElementById('buttonBackQuestion') && currentQuestionId !== 1) {
        let buttonBackQuestion = document.createElement('button');
        buttonBackQuestion.id = 'buttonBackQuestion';
        buttonBackQuestion.type = 'button';
        buttonBackQuestion.textContent = 'К предыдущему вопросу';
        buttonBackQuestion.onclick = function () {
            let backQuestion = KBRepository.questions().find(question => {
                if (question.answers.find(answer => answer.linkQuestionId === currentQuestionId)) {
                    return question;
                }
            });
            backToQuestion(backQuestion.id);
        };
        containerDOM.appendChild(buttonBackQuestion);
    }
}