const path = require('path');
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

// handle creating / removing shortcuts on windows when installing
if (require('electron-squirrel-startup')) {
  app.quit();
}

function createWindow() {
  // create a chrome view window in our app
  const mainView = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // load up index.html in our mainView window
  mainView.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  // open dev tools if in dev
  if(isDev) {
    mainView.webContents.openDevTools({ mode: 'detach' });
  }
}

// when our app is ready, create electron window and load react app
app.whenReady().then(createWindow);

// quit when all windows closed
app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

// on MacOS, re-create window when app re-activated
app.on('activate', () => {
  if(BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// we can include other app-specific code below...
