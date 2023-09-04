const { app, ipcMain, BrowserWindow, ipcRenderer} = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const pathComponent = () => {
  return '/component';
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    autoHideMenuBar: true
  });

  // and load the Product.html of the app.
  mainWindow.loadFile(path.join(__dirname + pathComponent() + "/App", `App.html`)).then(r => console.log("Начальная страница загружена!"));

  ipcMain.on('showQuestions', () => {
    mainWindow.loadFile(path.join(__dirname + pathComponent() + "/Question", 'Question.html'));
  });

  ipcMain.on('showProduct', (event, data) => {
    mainWindow.loadFile(path.join(__dirname + pathComponent() + "/Product", 'Product.html'))
        .then(r => mainWindow.webContents.send('showProductToReceive', data));
  });

  ipcMain.on('backToMain', (event, data) => {
    mainWindow.loadFile(path.join(__dirname + pathComponent() + "/App", `App.html`)).then(r => console.log("Начальная страница загружена!"));
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};


app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});