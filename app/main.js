/* global require, __dirname, process */

'use strict';

var app = require('app');
var Menu = require('menu');
var MenuItem = require('menu-item');
var BrowserWindow = require('browser-window');

var MenuTemplate = require('./browser/menu-template');
var SessionPath = require('./browser/session-path');

require('crash-reporter').start();

var mainWindow = null;
var menu = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    SessionPath.set(null);
    app.quit();
});

app.on('open-file', function(event, path) {
  event.preventDefault();
  SessionPath.set(path);
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    title: 'Writer',
    show: false
  });

  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  menu = Menu.buildFromTemplate(MenuTemplate.new(mainWindow));
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  mainWindow.webContents.on('did-frame-finish-load', function() {
    if (SessionPath.get()) {
      mainWindow.webContents.send('open', SessionPath.get());
    }
    mainWindow.show();
  });
});
