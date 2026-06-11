import psycopg2
from werkzeug.security import generate_password_hash
import os

def get_db_connection():
    return psycopg2.connect(
        host="acela.proxy.rlwy.net",
        port=42391,
        user="postgres",
        password="TRGQfYWWHMwtolFwadVkjUjDAJIiiXvn",
        dbname="railway"
    )

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Drop tables to reset
    cursor.execute('''
        DROP TABLE IF EXISTS SYSTEMLOG CASCADE;
        DROP TABLE IF EXISTS DEVICELOG CASCADE;
        DROP TABLE IF EXISTS NOTIFICATIONLOG CASCADE;
        DROP TABLE IF EXISTS NOTIFICATIONTYPE CASCADE;
        DROP TABLE IF EXISTS BIOMETRIC CASCADE;
        DROP TABLE IF EXISTS ATTENDANCE CASCADE;
        DROP TABLE IF EXISTS SESSION CASCADE;
        DROP TABLE IF EXISTS DEVICE CASCADE;
        DROP TABLE IF EXISTS ENROLLMENT CASCADE;
        DROP TABLE IF EXISTS ASSIGNMENT CASCADE;
        DROP TABLE IF EXISTS SCHEDULE CASCADE;
        DROP TABLE IF EXISTS STUDENT CASCADE;
        DROP TABLE IF EXISTS LECTURER CASCADE;
        DROP TABLE IF EXISTS CLASS CASCADE;
        DROP TABLE IF EXISTS MAJOR CASCADE;
        DROP TABLE IF EXISTS USERACCOUNT CASCADE;
        DROP TABLE IF EXISTS ENTITY CASCADE;
        DROP TABLE IF EXISTS ROLE CASCADE;
    ''')

    # Create Tables based on schema
    cursor.execute('''
        CREATE TABLE ROLE (
            roleid SERIAL PRIMARY KEY,
            rolename VARCHAR(50) NOT NULL,
            description TEXT
        );

        CREATE TABLE ENTITY (
            eid SERIAL PRIMARY KEY,
            roleid INTEGER REFERENCES ROLE(roleid),
            fullname VARCHAR(255),
            gender VARCHAR(10),
            dateofbirth DATE,
            phonenumber VARCHAR(20),
            bio TEXT,
            profilepicture TEXT,
            createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            lastedit TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE USERACCOUNT (
            userid SERIAL PRIMARY KEY,
            eid INTEGER UNIQUE REFERENCES ENTITY(eid),
            username VARCHAR(100) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            passwordhash TEXT NOT NULL,
            lastlogin TIMESTAMP
        );

        CREATE TABLE MAJOR (
            majorid SERIAL PRIMARY KEY,
            majorname VARCHAR(255) NOT NULL
        );

        CREATE TABLE CLASS (
            classid SERIAL PRIMARY KEY,
            majorid INTEGER REFERENCES MAJOR(majorid),
            classname VARCHAR(255) NOT NULL,
            classcode VARCHAR(50) UNIQUE NOT NULL,
            academicyear VARCHAR(20),
            semester VARCHAR(20)
        );

        CREATE TABLE LECTURER (
            lecturerid SERIAL PRIMARY KEY,
            eid INTEGER UNIQUE REFERENCES ENTITY(eid),
            classid INTEGER REFERENCES CLASS(classid),
            subject VARCHAR(255)
        );

        CREATE TABLE STUDENT (
            studentid SERIAL PRIMARY KEY,
            eid INTEGER UNIQUE REFERENCES ENTITY(eid)
        );

        CREATE TABLE SCHEDULE (
            scheduleid SERIAL PRIMARY KEY,
            classid INTEGER REFERENCES CLASS(classid),
            subject VARCHAR(255),
            starttime TIME,
            endtime TIME,
            dayofweek VARCHAR(20)
        );

        CREATE TABLE ASSIGNMENT (
            lecturerid INTEGER REFERENCES LECTURER(lecturerid),
            scheduleid INTEGER REFERENCES SCHEDULE(scheduleid),
            PRIMARY KEY (lecturerid, scheduleid)
        );

        CREATE TABLE ENROLLMENT (
            studentid INTEGER REFERENCES STUDENT(studentid),
            classid INTEGER REFERENCES CLASS(classid),
            PRIMARY KEY (studentid, classid)
        );

        CREATE TABLE DEVICE (
            deviceid SERIAL PRIMARY KEY,
            classid INTEGER REFERENCES CLASS(classid),
            devicename VARCHAR(255),
            lastseen DATE,
            location VARCHAR(255)
        );

        CREATE TABLE SESSION (
            sessionid SERIAL PRIMARY KEY,
            scheduleid INTEGER REFERENCES SCHEDULE(scheduleid),
            sessiondate DATE
        );

        CREATE TABLE ATTENDANCE (
            attendanceid SERIAL PRIMARY KEY,
            studentid INTEGER REFERENCES STUDENT(studentid),
            sessionid INTEGER REFERENCES SESSION(sessionid),
            deviceid INTEGER REFERENCES DEVICE(deviceid),
            status VARCHAR(50) CHECK (status IN ('PRESENT', 'ABSENT', 'LATE', 'EXCUSED')),
            attendancedate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            minutelate INTEGER DEFAULT 0,
            CONSTRAINT uq_stu_sess UNIQUE(studentid, sessionid)
        );

        CREATE TABLE BIOMETRIC (
            biometricid SERIAL PRIMARY KEY,
            studentid INTEGER UNIQUE REFERENCES STUDENT(studentid),
            fingerindex INTEGER,
            template TEXT,
            createdat DATE DEFAULT CURRENT_DATE
        );

        CREATE TABLE NOTIFICATIONTYPE (
            typeid SERIAL PRIMARY KEY,
            typename VARCHAR(255)
        );

        CREATE TABLE NOTIFICATIONLOG (
            notificationid SERIAL PRIMARY KEY,
            eid INTEGER REFERENCES ENTITY(eid),
            message TEXT,
            isread BOOLEAN DEFAULT FALSE,
            createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            typeid INTEGER REFERENCES NOTIFICATIONTYPE(typeid)
        );

        CREATE TABLE DEVICELOG (
            logid SERIAL PRIMARY KEY,
            deviceid INTEGER REFERENCES DEVICE(deviceid),
            eventtype VARCHAR(100),
            message TEXT,
            createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            sessionid INTEGER REFERENCES SESSION(sessionid)
        );

        CREATE TABLE SYSTEMLOG (
            logid SERIAL PRIMARY KEY,
            logtext TEXT,
            createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            logtype VARCHAR(100)
        );
    ''')

    # Seed initial data
    cursor.execute("INSERT INTO ROLE (rolename, description) VALUES ('Admin', 'System Administrator') RETURNING roleid;")
    admin_role = cursor.fetchone()[0]
    cursor.execute("INSERT INTO ROLE (rolename, description) VALUES ('Teacher', 'Lecturer/Teacher') RETURNING roleid;")
    teacher_role = cursor.fetchone()[0]
    cursor.execute("INSERT INTO ROLE (rolename, description) VALUES ('Student', 'Enrolled Student') RETURNING roleid;")
    student_role = cursor.fetchone()[0]

    # Admin
    cursor.execute("INSERT INTO ENTITY (roleid, fullname) VALUES (%s, %s) RETURNING eid;", (admin_role, 'System Admin'))
    admin_eid = cursor.fetchone()[0]
    cursor.execute("INSERT INTO USERACCOUNT (eid, username, email, passwordhash) VALUES (%s, %s, %s, %s);", 
                   (admin_eid, 'admin', 'admin@school.com', generate_password_hash('password')))

    # Major & Class
    cursor.execute("INSERT INTO MAJOR (majorname) VALUES ('Computer Science') RETURNING majorid;")
    cs_major = cursor.fetchone()[0]
    cursor.execute("INSERT INTO CLASS (majorid, classname, classcode) VALUES (%s, %s, %s) RETURNING classid;", 
                   (cs_major, 'CS101 Intro to Programming', 'CS101'))
    cs_class = cursor.fetchone()[0]

    # Teacher
    cursor.execute("INSERT INTO ENTITY (roleid, fullname) VALUES (%s, %s) RETURNING eid;", (teacher_role, 'John Doe'))
    teacher_eid = cursor.fetchone()[0]
    cursor.execute("INSERT INTO USERACCOUNT (eid, username, email, passwordhash) VALUES (%s, %s, %s, %s);", 
                   (teacher_eid, 'teacher1', 'johndoe@school.com', generate_password_hash('password')))
    cursor.execute("INSERT INTO LECTURER (eid, classid, subject) VALUES (%s, %s, %s);", (teacher_eid, cs_class, 'Programming'))

    # Students
    students_data = [
        ('student1', 'Alice Smith', 'alice@school.com', 'F', '1234567890'),
        ('student2', 'Bob Jones', 'bob@school.com', 'M', '0987654321'),
        ('student3', 'Charlie Brown', 'charlie@school.com', 'M', '5555555555')
    ]
    
    for s_user, s_name, s_email, s_gender, s_phone in students_data:
        cursor.execute("INSERT INTO ENTITY (roleid, fullname, gender, phonenumber) VALUES (%s, %s, %s, %s) RETURNING eid;", 
                       (student_role, s_name, s_gender, s_phone))
        s_eid = cursor.fetchone()[0]
        cursor.execute("INSERT INTO USERACCOUNT (eid, username, email, passwordhash) VALUES (%s, %s, %s, %s);", 
                       (s_eid, s_user, s_email, generate_password_hash('password')))
        cursor.execute("INSERT INTO STUDENT (eid) VALUES (%s) RETURNING studentid;", (s_eid,))
        s_id = cursor.fetchone()[0]
        cursor.execute("INSERT INTO ENROLLMENT (studentid, classid) VALUES (%s, %s);", (s_id, cs_class))

    conn.commit()
    conn.close()
    print("Database initialized successfully with new schema!")

if __name__ == '__main__':
    init_db()
