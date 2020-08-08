const {app, BrowserWindow}=require('electron');
const ejse = require('ejs-electron');

ejse.data({
  pageName:'Excel-Clone',
  rows:99,
  cols:26
})

function createWindow(){

    const win = new BrowserWindow({
        width:800,
        height:600,
        show: false,
        webPreferences: {
          nodeIntegration:true
        }
    });

    win.loadFile('index.ejs').then(function(){
      win.removeMenu();
      win.maximize();
      win.show();
      win.webContents.openDevTools();
  });
}
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  
app.whenReady().then(createWindow);