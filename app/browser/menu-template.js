var SessionPath = require('./session-path');

var app = require('app');
var BrowserWindow = require('browser-window');
var dialog = require('dialog');

var fs = require('fs');

var MenuTemplate = {
  new: function(mainWindow) {
    return [
      {
        label: 'Writer',
        submenu: [
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: function() { app.quit(); }
          },
        ]
      },
      {
        label: 'File',
        submenu: [
          {
            label: 'New',
            accelerator: 'Command+N'
          },
          {
            label: 'Open',
            accelerator: 'Command+O',
            click: function() {
              dialog.showOpenDialog(BrowserWindow, function(path) {
                mainWindow.webContents.send('open', path[0]);
                SessionPath.set(path[0]);
              });
            }
          },
          {
            label: 'Save',
            accelerator: 'Command+S',
            click: function() {
              if (SessionPath.get()) {
                mainWindow.webContents.send('save', SessionPath.get());
              } else {
                dialog.showSaveDialog(BrowserWindow, function(path) {
                  mainWindow.webContents.send('save', path);
                  SessionPath.set(path);
                });
              }
            }
          },
        ]
      },
      {
        label: 'Edit',
        submenu: [
          {
            label: 'Undo',
            accelerator: 'Command+Z',
            selector: 'undo:'
          },
          {
            label: 'Redo',
            accelerator: 'Shift+Command+Z',
            selector: 'redo:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Cut',
            accelerator: 'Command+X',
            selector: 'cut:'
          },
          {
            label: 'Copy',
            accelerator: 'Command+C',
            selector: 'copy:'
          },
          {
            label: 'Paste',
            accelerator: 'Command+V',
            selector: 'paste:'
          },
          {
            label: 'Select All',
            accelerator: 'Command+A',
            selector: 'selectAll:'
          },
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            label: 'Reload',
            accelerator: 'Command+R',
            click: function() { mainWindow.restart(); }
          },
          {
            label: 'Enter Fullscreen',
            click: function() { mainWindow.setFullScreen(true); }
          },
          {
            label: 'Toggle DevTools',
            accelerator: 'Alt+Command+I',
            click: function() { mainWindow.toggleDevTools(); }
          },
        ]
      },
      {
        label: 'Window',
        submenu: [
          {
            label: 'Minimize',
            accelerator: 'Command+M',
            selector: 'performMiniaturize:'
          },
          {
            label: 'Close',
            accelerator: 'Command+W',
            selector: 'performClose:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Bring All to Front',
            selector: 'arrangeInFront:'
          },
        ]
      }
    ]
  }
}

module.exports = MenuTemplate;