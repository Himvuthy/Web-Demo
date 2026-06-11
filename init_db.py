import sqlite3
import os

DB_FILE = 'database.db'

def init_db():
    # Remove existing DB to start fresh
    if os.path.exists(DB_FILE):
        os.remove(DB_FILE)

    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    # Create Entity table
    cursor.execute('''
        CREATE TABLE Entity (
            EntityID INTEGER PRIMARY KEY AUTOINCREMENT,
            Username TEXT UNIQUE,
            Password TEXT,
            FullName TEXT,
            RoleID INTEGER,
            Email TEXT,
            Sex TEXT,
            PhoneNumber TEXT,
            FingerprintID TEXT
        )
    ''')

    # Create Class table
    cursor.execute('''
        CREATE TABLE Class (
            ClassID INTEGER PRIMARY KEY AUTOINCREMENT,
            ClassName TEXT
        )
    ''')

    # Insert dummy Admin
    cursor.execute('''
        INSERT INTO Entity (Username, Password, FullName, RoleID, Email)
        VALUES ('admin', 'password', 'System Admin', 1, 'admin@school.com')
    ''')

    # Insert dummy Teacher
    cursor.execute('''
        INSERT INTO Entity (Username, Password, FullName, RoleID, Email)
        VALUES ('teacher1', 'password', 'John Doe', 2, 'johndoe@school.com')
    ''')

    # Insert dummy Students
    students = [
        ('student1', 'password', 'Alice Smith', 3, 'alice@school.com', 'F', '1234567890', 'FP_001'),
        ('student2', 'password', 'Bob Jones', 3, 'bob@school.com', 'M', '0987654321', None),
        ('student3', 'password', 'Charlie Brown', 3, 'charlie@school.com', 'M', '5555555555', 'FP_002')
    ]

    cursor.executemany('''
        INSERT INTO Entity (Username, Password, FullName, RoleID, Email, Sex, PhoneNumber, FingerprintID)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', students)

    # Insert a dummy class
    cursor.execute("INSERT INTO Class (ClassName) VALUES ('Math 101')")
    cursor.execute("INSERT INTO Class (ClassName) VALUES ('History 101')")

    conn.commit()
    conn.close()
    print("Database initialized successfully!")

if __name__ == '__main__':
    init_db()
