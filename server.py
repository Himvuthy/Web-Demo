from flask import Flask, request, jsonify
from flask_cors import CORS
import pyodbc

app = Flask(__name__)
CORS(app) # Allows your React app to communicate with this API

# Replace with your actual SQL Server details
conn_str = (
    r'DRIVER={ODBC Driver 17 for SQL Server};'
    r'SERVER=ASUS-VIVO-BOOK-\SQLEXPRESS;'
    r'DATABASE=SmartAttendanceSystem;'
    r'Trusted_Connection=yes;'
)

# -----------------------------
# LOGIN ROUTE
# -----------------------------
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password') 

    try:
        conn = pyodbc.connect(conn_str)
        cursor = conn.cursor()
        
        # Target 'Entity' table and fetch 'RoleID'
        cursor.execute("SELECT RoleID FROM Entity WHERE Username = ? AND Password = ?", (username, password))
        user = cursor.fetchone()

        if user:
            # Returns the RoleID (1 for Admin, 2 for Teacher, 3 for Student)
            return jsonify({"success": True, "role": user[0]})
        else:
            return jsonify({"success": False, "message": "Invalid username or password."}), 401
            
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    finally:
        if 'conn' in locals():
            conn.close()
@app.route('/api/admin/stats', methods=['GET'])
def get_admin_stats():
    try:
        conn = pyodbc.connect(conn_str)
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM Entity WHERE RoleID = 3")
        total_students = cursor.fetchone()[0]
        cursor.execute("SELECT COUNT(*) FROM Entity Where FingerprintID IS NOT NULL")
        enrolled = cursor.fetchone()[0]
        cursor.execute("SELECT COUNT(*) FROM Entity Where FingerprintID IS NULL")
        notEnrolled = cursor.fetchone()[0]
        cursor.execute("SELECT COUNT(*) FROM Entity Where FingerprintID IS NULL AND RoleID = 3")
        notEnrolled = cursor.fetchone()[0]
        cursor.execute("SELECT COUNT(*) FROM Class")
        classes = cursor.fetchone()[0]
        return jsonify({
            "success": True,
            "totalStudents": total_students,
            "classes": classes,      
            "present": enrolled,    
            "absent": notEnrolled
        })
    except Exception as e:
        print(f"🚨 ADMIN STATS DB ERROR: {e}")
        return jsonify({"success": False, "error": str(e)}), 500
    finally:
        if 'conn' in locals():
            conn.close()
# -----------------------------
# GET ALL USERS (For User Management Tab)
# -----------------------------
@app.route('/api/users', methods=['GET'])
def get_users():
    try:
        conn = pyodbc.connect(conn_str)
        cursor = conn.cursor()
        
        cursor.execute("SELECT EntityID, Username, RoleID, Email FROM Entity WHERE Username IS NOT null")
        rows = cursor.fetchall()
        users_list = []
        for row in rows:
            if row[2] == 1:
                x = 'ADMIN'
            elif row[2] == 2:
                x = 'TEACHER'
            elif row[2] == 3:
                x = 'STUDENT'
            else:
                x = 'NULL'

            users_list.append({
                "id": row[0],
                "name": row[1],
                "role": x,
                "email": row[3],
            })
            
        return jsonify({"success": True, "users": users_list}), 200
    except Exception as e:
        print(f"🚨 GET USERS ERROR: {e}")
        return jsonify({"success": False, "error": str(e)}), 500
    finally:
        if 'conn' in locals():
            conn.close()

# -----------------------------
# GET ONLY STUDENTS (For Biometric Enrollment Tab)
# -----------------------------
@app.route('/api/students', methods=['GET'])  # <--- CHANGED ROUTE NAME
def get_students():
    try:
        conn = pyodbc.connect(conn_str)
        cursor = conn.cursor()
        
        # Target only students (RoleID = 3) and get full details
        cursor.execute("""
            SELECT EntityID, FullName, RoleID, Email, Sex, PhoneNumber, FingerprintID 
            FROM Entity 
            WHERE RoleID = 3
        """)
        rows = cursor.fetchall()
        users_list = []
        
        for row in rows:
            users_list.append({
                "id": row[0],
                "name": row[1] if row[1] else "Unknown",
                "role": "STUDENT", 
                "email": row[3],
                "sex": row[4],
                "phone": row[5],
                "fingerprint_id": row[6]
            })
            
        return jsonify({"success": True, "users": users_list}), 200
    except Exception as e:
        print(f"🚨 GET STUDENTS ERROR: {e}")
        return jsonify({"success": False, "error": str(e)}), 500
    finally:
        if 'conn' in locals():
            conn.close()

if __name__ == '__main__':
    app.run(port=5000, debug=True)