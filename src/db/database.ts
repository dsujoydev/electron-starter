import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

export class AppDatabase {
  private db: Database.Database;

  constructor(dbName = "app.db") {
    // Create database directory if it doesn't exist
    const dbDir = "/Users/dsujoydev/Downloads/projects";
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    const dbPath = path.join(dbDir, dbName);
    this.db = new Database(dbPath);

    // Create users table
    this.createUsersTable();

    console.log("Database initialized at:", dbPath);
  }

  private createUsersTable(): void {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;
    this.db.exec(sql);
  }

  // User methods
  public createUser(username: string, email: string): number {
    const insert = this.db.prepare(`
      INSERT INTO users (username, email) VALUES (?, ?)
    `);
    const result = insert.run(username, email);
    return result.lastInsertRowid as number;
  }

  public getUserById(id: number) {
    const select = this.db.prepare(`
      SELECT * FROM users WHERE id = ?
    `);
    return select.get(id);
  }

  public getAllUsers() {
    const select = this.db.prepare(`
      SELECT * FROM users ORDER BY created_at DESC
    `);
    return select.all();
  }

  public close(): void {
    this.db.close();
  }
}

// Export a singleton instance
export const appDatabase = new AppDatabase();
