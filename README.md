# TweetUp - Social Media Platform

> A production-ready social media web application built using Django, Django REST Framework, Bootstrap, JavaScript, JWT Authentication, and PostgreSQL.

🌐 **Live Demo:** https://tweetup-backend.onrender.com

---

# 📖 Overview

TweetUp is a feature-rich social media platform where users can create accounts, share posts with images, interact through likes and comments, follow other users, search profiles, and manage their own profile.

The project demonstrates full-stack web development using Django while following REST API architecture with JWT-based authentication.

---

# Features

##  Authentication

- User Registration
- User Login
- JWT Authentication
- Logout
- Password Visibility Toggle
- Math CAPTCHA
- Protected Pages
- Persistent Login using JWT

---

## Tweets

- Create Tweet
- Upload Image with Tweet
- View Feed
- Like Tweets
- Comment on Tweets
- Real-time Feed Rendering
- Responsive Tweet Cards

---

##  User Profiles

- View Own Profile
- Edit Profile
- Update Bio
- Upload Profile Picture
- Followers Count
- Following Count

---

##  Public Profiles

- View Other Users
- Follow Users
- Unfollow Users
- Display User Tweets
- Display User Information

---

##  User Search

- Search Users
- Dynamic Search Results
- Navigate to Public Profiles

---

## User Interface

- Bootstrap 5
- Responsive Design
- Mobile Friendly
- Navigation Bar
- Alerts
- Loading States

---

# 🛠 Tech Stack

## Backend

- Django
- Django REST Framework
- JWT Authentication (SimpleJWT)

## Frontend

- HTML5
- CSS3
- Bootstrap 5
- JavaScript

## Database

- PostgreSQL

## Deployment

- Render

## Version Control

- Git
- GitHub

---

# 📂 Project Structure

```
tweetup-backend/
│
├── core/
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
│
├── users/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── signals.py
│
├── tweets/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── permissions.py
│
├── templates/
│
├── static/
│   ├── css/
│   └── js/
│
├── media/
│
├── manage.py
└── requirements.txt
```

---

# 🧩 Modules

---

## 1️⃣ Authentication Module

Responsible for secure user authentication.

### Features
- Register User
- Login User
- Logout User
- JWT Token Generation
- Password Toggle
- CAPTCHA Validation

## 2️⃣ Tweet Module

Handles creation and interaction with tweets.

### Features

- Create Tweet
- Upload Images
- Like Tweet
- Comment on Tweet
- Feed Generation

## 3️⃣ Profile Module

Allows users to manage personal information.

### Features

- Edit Bio
- Upload Profile Picture
- View Followers
- View Following

## 4️⃣ Public Profile Module

Displays profiles of other users.

### Features

- View Public Profile
- Follow User
- Unfollow User
- Display User Tweets

## 5️⃣ Search Module

Allows searching users.

### Features

- Username Search
- Dynamic Results


# 🔐 Authentication Flow

```
Register
↓
Login
↓
Receive JWT Token
↓
Store Token in LocalStorage
↓
Attach Token in Authorization Header
↓
Access Protected APIs
```

---

# 💾 Database Design

## User

- Username
- Email
- Password

---

## Profile

- User
- Bio
- Profile Picture
- Followers

---

## Tweet

- User
- Text
- Image
- Likes
- Created At

---

## Comment

- User
- Tweet
- Comment
- Created At

---

# 🔄 Application Workflow

```
Register
↓
Login
↓
Create Tweet
↓
View Feed
↓
Like / Comment
↓
Visit Public Profiles
↓
Follow Users
↓
Edit Profile
```

---

# 🚀 Deployment

The project is deployed on **Render** using:

- Gunicorn
- PostgreSQL
- WhiteNoise
- Static Files Collection

Live Application:

https://tweetup-backend.onrender.com

---

# ⚙ Installation

Clone the repository

```bash
git clone https://github.com/your-username/tweetup-backend.git
```

Go inside project

```bash
cd tweetup-backend
```

Create virtual environment

```bash
python -m venv venv
```

Activate environment

Windows

```bash
venv\Scripts\activate
```

Mac/Linux

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run migrations

```bash
python manage.py migrate
```

Create superuser

```bash
python manage.py createsuperuser
```

Start server

```bash
python manage.py runserver
```

---

# 📌 Future Improvements

- Notifications
- Infinite Scrolling
- Direct Messaging
- Email Verification
- Password Reset
- OAuth Login (Google/GitHub)
- Dark Mode
- Hashtags & Mentions
- Bookmark Tweets
- Trending Section
- User Activity Feed

---

# 👨‍💻 Author

**Harsh Deep**

---

# ⭐ If you found this project useful, consider giving it a star!
