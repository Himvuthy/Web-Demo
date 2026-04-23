from flask import Flask, request, jsonify
from flask_cors import CORS
import pyodbc

app = Flask(__name__)
CORS(app) # This opens the door so React is allowed to talk to Python

# Your SQL Server connection string
conn_str = (
    r'DRIVER={ODBC Driver 17 for SQL Server};'
    r'SERVER=ASUS-VIVO-BOOK-\SQLEXPRESS;'
    r'DATABASE=SmartAttendance;'
    r'Trusted_Connection=yes;'
    r'TrustServerCertificate=yes;'
)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    try:
        # Connect to SQL
        conn = pyodbc.connect(conn_str)
        cursor = conn.cursor()
        
        # Check the database for the user
        # Change this line in your server.py
        cursor.execute("SELECT Role FROM Users WHERE Username=? AND PasswordHash=?", (username, password))
        row = cursor.fetchone()
        
        if row:
            # Send the Role (Admin or Student) back to React
            return jsonify({"success": True, "role": row[0]}) 
        
        return jsonify({"success": False, "message": "Wrong username or password"}), 401
        
    except Exception as e:
        print("Database Error:", e)
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)