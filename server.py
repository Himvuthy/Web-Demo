from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import check_password_hash
import psycopg2
import os

app = Flask(__name__)
CORS(app) # Allows your React app to communicate with this API

def get_db_connection():
    return psycopg2.connect(
        host="acela.proxy.rlwy.net",
        port=42391,
        user="postgres",
        password="TRGQfYWWHMwtolFwadVkjUjDAJIiiXvn",
        dbname="railway"
    )

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
        
        # PostgreSQL uses %s instead of ?
        cursor.execute("""
            SELECT e.roleid, u.passwordhash 
            FROM USERACCOUNT u 
            JOIN ENTITY e ON u.eid = e.eid 
            WHERE u.username = %s
        """, (username,))
        user = cursor.fetchone()

        if user and check_password_hash(user[1], password):
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
        
        cursor.execute("SELECT COUNT(*) FROM STUDENT")
        total_students = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM BIOMETRIC")
        enrolled = cursor.fetchone()[0]
        
        notEnrolled_students = total_students - enrolled
        
        cursor.execute("SELECT COUNT(*) FROM CLASS")
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
        
        cursor.execute("""
            SELECT e.eid, e.fullname, r.rolename, u.email 
            FROM ENTITY e
            JOIN USERACCOUNT u ON e.eid = u.eid
            JOIN ROLE r ON e.roleid = r.roleid
        """)
        rows = cursor.fetchall()
        users_list = []
        for row in rows:
            users_list.append({
                "id": row[0],
                "name": row[1] if row[1] else "Unknown",
                "role": row[2].upper(),
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
        
        cursor.execute("DELETE FROM USERACCOUNT WHERE eid = %s", (user_id,))
        cursor.execute("DELETE FROM ENTITY WHERE eid = %s", (user_id,))
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
            SELECT e.eid, e.fullname, u.email, e.gender, e.phonenumber, b.fingerindex 
            FROM ENTITY e
            JOIN ROLE r ON e.roleid = r.roleid
            JOIN USERACCOUNT u ON e.eid = u.eid
            LEFT JOIN STUDENT s ON e.eid = s.eid
            LEFT JOIN BIOMETRIC b ON s.studentid = b.studentid
            WHERE r.rolename = 'Student'
        """)
        rows = cursor.fetchall()
        users_list = []
        
        for row in rows:
            users_list.append({
                "id": row[0],
                "name": row[1] if row[1] else "Unknown",
                "role": "STUDENT", 
                "email": row[2],
                "sex": row[3],
                "phone": row[4],
                "fingerprint_id": row[5]
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
