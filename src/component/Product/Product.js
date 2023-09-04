import * as NotebookRepository from "../../repository/NotebookRepository.js";
const { ipcRenderer} = require('electron');

// Отправка выбора пользователя в главный процесс
const pathComponent = '/component';

ipcRenderer.on('showProductToReceive', (event, data) => {
    const productTitle = document.getElementById('productTitle');
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
        productTitle.textContent = `${notebook.description} ${notebook.characteristics.model}`;
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
    }

    const container = document.getElementById('container');
    let button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Вернуться в начало';
    button.onclick = function() {
        ipcRenderer.send('backToMain');
    };
    container.appendChild(button);
});