const { ipcRenderer, ipcMain} = require('electron');

// Обработка нажатия кнопки
const showQuestions = () => {
    ipcRenderer.send('showQuestions', {questionId: 1});
}

