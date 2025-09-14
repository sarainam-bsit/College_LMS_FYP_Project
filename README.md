===========================================================
          Deployment Instructions - FYP Web Application
===========================================================

Project Title: College Learning Management System (LMS)
Project ID: [Your Project ID]
Session: 2021-2025
Submitted By: Sara Inam (BSIT)
Supervisor: Professor Mam Sherish.

-----------------------------------------------------------
Requirements
-----------------------------------------------------------
- Python 3.10 or above
- Django & Django REST Framework
- PostgreSQL (latest stable version)
- Code Editor (VS Code or PyCharm)
- Stable internet connection
- Web browser (Google Chrome / Firefox)

-----------------------------------------------------------
Steps to Deploy and Run the Project
-----------------------------------------------------------
1. Download the project folder (provided in ZIP/RAR format) and extract it.

2. **Backend (Django Setup)**
   - Open terminal and navigate to the backend folder.
   - Create a virtual environment and activate it.
   - Install required packages:
     ```
     pip install -r requirements.txt
     ```
   - Apply migrations:
     ```
     python manage.py migrate
     ```
   - Start the backend server:
     ```
     python manage.py runserver
     ```

3. **Frontend (React Setup)**
   - Open terminal and navigate to the frontend folder.
   - Install dependencies:
     ```
     npm install
     ```
   - Start the development server:
     ```
     npm start
     ```

4. **Database (PostgreSQL)**
   - Create a database in PostgreSQL (e.g., `college_lms_db`).
   - Update database credentials in `settings.py` of the Django backend.

5. Once both servers are running, open the browser and visit:
http://localhost:3000
(React frontend will communicate with Django backend APIs.)

-----------------------------------------------------------
How to Use the Web Application
-----------------------------------------------------------

- *Student Side:*
- Login with OTP (college-provided email required).
- View Departments.
- View Categories.
- View courses.
- View Timetable.
- Download fee vouchers (course/hostel/library).
- View lectures, assignments and quizzes through Google Classroom.
- See grades uploaded by teachers.
- Apply for hostel admission and hostel cancel application.
- Apply for library card and see library card.
- View DateSheet.
- Submit feedback form.
- View feedbacks.
- View notifications.
- Contact admin.

- *Teacher Side:*
- Login with OTP (college-provided email).
- View Departments.
- View Categories.
- View courses.
- View Timetable.
- Add, update, and delete lectures.
- Upload assignments and quizzes (Google Classroom link).
- View DateSheet.
- Upload student grades.
- View student details.
- View Student Feedbacks.
- Send notifications.
- See notifications also.

- *Admin Side:*
- Login with OTP system.
- Manage Department.
- Manage Categories.
- Manage courses and assign teachers.
- Manage Timetable.
- Generate and verify student fee vouchers.
- Manage hostel details and fee vouchers.
- Manage library card fee vouchers.
- Manage students and teachers.
- Manage feedbacks.
- Handle contact messages.
- Send notifications.


-----------------------------------------------------------
Notes
-----------------------------------------------------------
- Make sure PostgreSQL is running before starting the backend server.
- In case of errors, delete migrations and reapply them.
- Internet connection is required for OTP verification and email services.
- Contact me for support if setup issues occur.

===========================================================
               End of ReadMe File
===========================================================
