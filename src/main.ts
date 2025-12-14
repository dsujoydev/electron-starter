import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import { appDatabase } from "./db/database";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  // Database is initialized when the module is imported
  console.log("Database ready");

  // Set up IPC handlers for database operations
  ipcMain.handle("db:createUser", async (event, username: string, email: string) => {
    try {
      const userId = appDatabase.createUser(username, email);
      return { success: true, userId };
    } catch (error) {
      console.error("Error creating user:", error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle("db:getAllUsers", async () => {
    try {
      const users = appDatabase.getAllUsers();
      return { success: true, users };
    } catch (error) {
      console.error("Error getting users:", error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle("db:getUserById", async (event, id: number) => {
    try {
      const user = appDatabase.getUserById(id);
      return { success: true, user };
    } catch (error) {
      console.error("Error getting user:", error);
      return { success: false, error: error.message };
    }
  });

  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Cleanup database connection when app is about to quit
app.on("before-quit", () => {
  console.log("Closing database connection...");
  appDatabase.close();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
