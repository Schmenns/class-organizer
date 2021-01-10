const { app, BrowserWindow, ipcMain, Menu, globalShortcut } = require('electron');
const path = require('path');
require('electron-reload')(__dirname)


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let mainWindow = null;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 500,
    minHeight: 500,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  Menu.setApplicationMenu(null);
  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// When you click a class it runs this code which changes the url the app is showing
ipcMain.on('load-url', (event, arg) => {
  mainWindow.loadURL(arg);
  Menu.setApplicationMenu(Menu.buildFromTemplate([{
    label: 'Go Back',
    click: () => {
      mainWindow.loadFile(path.join(__dirname, 'index.html'));
      Menu.setApplicationMenu(null);
    },
  }]))
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.


app.on('ready', () => {
    createWindow();
    globalShortcut.register('CommandOrControl+Shift+I', () => mainWindow.webContents.openDevTools());
    globalShortcut.register('CommandOrControl+R', () => mainWindow.webContents.reload());
    globalShortcut.register('F5', () => mainWindow.webContents.reload());
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    //let mainWindow = new BrowserWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
