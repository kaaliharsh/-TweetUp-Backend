// ======================================================
// TweetUp
// Authentication Module
// Handles:
// 1. Login
// 2. Register
// 3. Logout
// 4. Password Visibility
// 5. Math CAPTCHA
// ======================================================


// ---------------------------
// Logout
// ---------------------------
let num1, num2, correctAnswer;
function logoutUser() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    updateNavbar();
    window.location.href = "/login-page/";

}


// ---------------------------
// Password Visibility
// ---------------------------
function togglePassword() {
    const password =document.getElementById("password");
    const eyeIcon =document.getElementById("eyeIcon");
    if (password.type === "password") {
        password.type = "text";
        eyeIcon.classList.replace(
            "bi-eye",
            "bi-eye-slash"
        );
    }
    else {
        password.type = "password";
        eyeIcon.classList.replace("bi-eye-slash","bi-eye");
    }
}


// ---------------------------
// Math CAPTCHA
// ---------------------------
function generateCaptcha() {
    const firstNumber =Math.floor(Math.random() * 10) + 1;
    const secondNumber =Math.floor(Math.random() * 10) + 1;
    correctAnswer =firstNumber + secondNumber;
    const question =document.getElementById("captchaQuestion");
    if (question) {
        question.innerText =
            `What is ${firstNumber} + ${secondNumber}?`;
    }
}


function validateCaptcha() {
    const answer = parseInt(document.getElementById("captchaAnswer").value);
    if (answer === correctAnswer) {
        return true;
    }
    const message =
        document.getElementById("registerMessage") ||
        document.getElementById("errorMessage");
    if (message) {
        message.className = "alert alert-danger";
        message.classList.remove("d-none");
        message.innerText ="Incorrect CAPTCHA. Please try again.";
    }
    document.getElementById("captchaAnswer").value = "";
    generateCaptcha();
    return false;
}


// ---------------------------
// Login
// ---------------------------

function initializeLogin() {
    const loginForm =document.getElementById("loginForm");
    if (!loginForm) return;
    generateCaptcha();
    loginForm.addEventListener("submit",loginUser);
}

async function loginUser(e) {
    e.preventDefault();
    if (!validateCaptcha()) {
        return;
    }
    const username =document.getElementById("username").value;
    const password =document.getElementById("password").value;
    try {
        const response =
            await fetch("/api/token/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
        const data =await response.json();
        if (response.ok) {
            localStorage.setItem("access",data.access);
            localStorage.setItem("refresh",data.refresh);
            updateNavbar();
            window.location.href = "/";
        }
        else {
                document.getElementById("errorMessage").classList.remove("d-none");
                document.getElementById("errorMessage").innerText ="Invalid username or password";
                generateCaptcha();
                document.getElementById("captchaAnswer").value = "";
            }
    }
    catch (error) {
        console.error(error);
    }
}


// ---------------------------
// Register
// ---------------------------

function initializeRegister() {
    const registerForm =document.getElementById("registerForm");
    if (!registerForm) return;
    generateCaptcha();
    registerForm.addEventListener("submit",registerUser);
}

async function registerUser(e) {
    e.preventDefault();
    if (!validateCaptcha()) {
        return;
    }

    const username =document.getElementById("username").value;
    const email =document.getElementById("email").value;
    const password =document.getElementById("password").value;

    try {
        const response =await fetch("/api/users/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"},
                body: JSON.stringify({username,email,password})});

        const data =await response.json();
        const message =document.getElementById("registerMessage");
        if (response.ok) {
            message.className ="alert alert-success";message.classList.remove("d-none");
            message.innerText ="Registration successful! Redirecting to login...";
            setTimeout(()=>{
                window.location.href ="/login-page/";
                }, 2000);
        }
        else {
            message.className ="alert alert-danger";
            message.classList.remove("d-none");
            message.innerText =
                data.username?.[0]
                || data.email?.[0]
                || data.password?.[0]
                || "Registration failed.";
            generateCaptcha();
        }
    }
    catch (error) {
        console.error(error);
    }
}
