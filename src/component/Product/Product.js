import * as NotebookRepository from "../../repository/NotebookRepository.js";
const {ipcRenderer} = require('electron');


ipcRenderer.on('showProductToReceive', (event, data) => {
    const productTitle = document.getElementById('productTitle');
    const description = document.getElementById('description');
    const cpu = document.getElementById('cpu');
    const countCoreCpu = document.getElementById('countCoreCpu');
    const countThreadCpu = document.getElementById('countThreadCpu');
    const ram = document.getElementById('ram');
    const rom = document.getElementById('rom');
    const gpu = document.getElementById('gpu');
    const sizeScreen = document.getElementById('sizeScreen');
    const resolutionScreen = document.getElementById('resolutionScreen');
    const typeScreen = document.getElementById('typeScreen');
    const frequencyScreen = document.getElementById('frequencyScreen');

    let notebook = NotebookRepository.products().find(item => item.id === data.productId)

    if (notebook) {
        description.textContent = `Ноутбук ${notebook.characteristics.model}. ${notebook.description}`;
        productTitle.textContent = `${notebook.characteristics.model}`;
        cpu.textContent = `Процессор: ${notebook.characteristics.cpu}`;
        countCoreCpu.textContent = `Количество ядер: ${notebook.characteristics.countCoreCpu}`;
        countThreadCpu.textContent = `Количество потоков: ${notebook.characteristics.countThreadCpu}`;

        ram.textContent = `ОЗУ: ${notebook.characteristics.ram} ГБ`;
        rom.textContent = `ПЗУ: ${notebook.characteristics.rom} ГБ`;
        gpu.textContent = `Видеокарта: ${notebook.characteristics.gpu}`;
        sizeScreen.textContent = `Диагональ экрана: ${notebook.characteristics.sizeScreen} дюймов`;
        resolutionScreen.textContent = `Разрешение экрана: ${notebook.characteristics.resolutionScreen} px`;
        typeScreen.textContent = `Тип экрана: ${notebook.characteristics.typeScreen}`;
        frequencyScreen.textContent = `Частота экрана: ${notebook.characteristics.frequencyScreen} ГЦ`;

        const imageProductId = document.getElementById('imageProductId');
        let img = document.createElement('img');
        img.src = `../../image/products/${notebook.id}.jpg`
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