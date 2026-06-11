from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app) # Allows your React app to communicate with this API

DB_FILE = "database.db"

def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    # Ensure rows are returned as tuples (default behavior) or we can just access by index
    return conn

# -----------------------------
# LOGIN ROUTE
# -----------------------------
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # SQLite uses ? instead of %s
        cursor.execute("SELECT RoleID FROM Entity WHERE Username = ? AND Password = ?", (username, password))
        user = cursor.fetchone()

        if user:
            return jsonify({"success": True, "role": user[0]})
        else:
            return jsonify({"success": False, "message": "Invalid username or password."}), 401
            
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    finally:
        if 'conn' in locals():
            conn.close()

# -----------------------------
# ADMIN STATS ROUTE
# -----------------------------
@app.route('/api/admin/stats', methods=['GET'])
def get_admin_stats():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*) FROM Entity WHERE RoleID = 3")
        total_students = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM Entity WHERE FingerprintID IS NOT NULL")
        enrolled = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM Entity WHERE FingerprintID IS NULL AND RoleID = 3")
        notEnrolled_students = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM Class")
        classes = cursor.fetchone()[0]
        
        return jsonify({
            "success": True,
            "totalStudents": total_students,
            "classes": classes,      
            "present": enrolled,    
            "absent": notEnrolled_students 
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
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("SELECT EntityID, FullName, RoleID, Email FROM Entity WHERE Username IS NOT NULL")
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
                "name": row[1] if row[1] else "Unknown",
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
# DELETE USER
# -----------------------------
@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM Entity WHERE EntityID = ?", (user_id,))
        conn.commit()
        return jsonify({"success": True}), 200
    except Exception as e:
        print(f"🚨 DELETE USER ERROR: {e}")
        return jsonify({"success": False, "error": str(e)}), 500
    finally:
        if 'conn' in locals():
            conn.close()

# -----------------------------
# GET ONLY STUDENTS (For Biometric Enrollment Tab)
# -----------------------------
@app.route('/api/students', methods=['GET'])  
def get_students():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
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
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
