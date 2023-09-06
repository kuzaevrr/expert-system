const { app, ipcMain, BrowserWindow} = require('electron');
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
    width: 1000,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    autoHideMenuBar: true
  });

  // and load the Product.html of the app.
  mainWindow.loadFile(path.join(__dirname + pathComponent() + "/App", `App.html`));

  ipcMain.on('showQuestions', (event, data) => {
    mainWindow.loadFile(path.join(__dirname + pathComponent() + "/Question", 'Question.html'))
        .then(r => mainWindow.webContents.send('showQuestionsToReceive', data));
  });

  ipcMain.on('showProduct', (event, data) => {
    mainWindow.loadFile(path.join(__dirname + pathComponent() + "/Product", 'Product.html'))
        .then(r => mainWindow.webContents.send('showProductToReceive', data));
  });

  ipcMain.on('backToMain', (event, data) => {
    mainWindow.loadFile(path.join(__dirname + pathComponent() + "/App", `App.html`));
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
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