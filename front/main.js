const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

const createWindow = (args) => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
    }
  });

  win.loadFile("index.html", {query: {"data": JSON.stringify(args)}});
}

app.whenReady().then(() => {
    let rawdata = fs.readFileSync('event-placeholder.json');
    let tasks = JSON.parse(rawdata);

    createWindow(tasks);

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit();
    });
});