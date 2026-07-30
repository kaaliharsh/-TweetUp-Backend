// console.log("TweetUp Loaded");

// document.addEventListener("DOMContentLoaded", () => {
//     updateNavbar();

//     const protectedPages = [
//         "/profile-page/",
//         "/create-tweet-page/",
//         "/edit-profile-page/",
//         "/search-users-page/"
//     ];

//     const token = localStorage.getItem("access");

//     if (!token && protectedPages.includes(window.location.pathname)) {
//         window.location.href = "/login-page/";
//     }
// });

// function updateNavbar() {
//     const token = localStorage.getItem("access");
//     if (token) {
//         // Logged In
//         document.getElementById("createTweetNav")?.classList.remove("d-none");
//         document.getElementById("profileNav")?.classList.remove("d-none");
//         document.getElementById("searchNav")?.classList.remove("d-none");
//         document.getElementById("logoutNav")?.classList.remove("d-none");
//         document.getElementById("loginNav")?.classList.add("d-none");
//         document.getElementById("registerNav")?.classList.add("d-none");
//     } else {
//         // Logged Out
//         document.getElementById("createTweetNav")?.classList.add("d-none");
//         document.getElementById("profileNav")?.classList.add("d-none");
//         document.getElementById("searchNav")?.classList.add("d-none");
//         document.getElementById("logoutNav")?.classList.add("d-none");
//         document.getElementById("loginNav")?.classList.remove("d-none");
//         document.getElementById("registerNav")?.classList.remove("d-none");
//     }
// }

// //Logout Function
// function logoutUser() {
//     localStorage.removeItem("access");
//     localStorage.removeItem("refresh");
//     updateNavbar();
//     window.location.href = "/login-page/";
// }

// // Handle login form submission
// const loginForm = document.getElementById("loginForm");
// if (loginForm) {
//     loginForm.addEventListener(
//         "submit",
//         async function(e){
//             e.preventDefault();
//             const username =document.getElementById("username").value;
//             const password =document.getElementById("password").value;
//             try {
//                 const response =await fetch("/api/token/",
//                         {
//                             method: "POST",
//                             headers:{"Content-Type":"application/json"},
//                             body: JSON.stringify({username,password})
//                         }
//                     );
//                 const data =await response.json();
//                 if(response.ok){
//                     localStorage.setItem("access", data.access);
//                     localStorage.setItem("refresh", data.refresh);
//                     updateNavbar();
//                     window.location.href = "/";
//                     } else {
//                     document.getElementById("errorMessage").classList.remove("d-none");
//                     document.getElementById("errorMessage").innerText ="Invalid username or password";}
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//     );
// }



//         const tweets =
//             await response.json();

//         tweetsContainer.innerHTML = "";

//         tweets.forEach(tweet => {
            
//   tweetsContainer.innerHTML += `

// <div class="col-xl-3 col-lg-4 col-md-6 mb-4">

//     <div class="card shadow-sm feed-card">

//         ${tweet.photo ? `
//             <img
//                 src="${tweet.photo}"
//                 class="card-img-top feed-image">
//         ` : ''}

//         <div class="card-body d-flex flex-column">

//             <h5>

//                 <a
//                     href="/user/${tweet.username}/"
//                     class="username-link">

//                     @${tweet.username}

//                 </a>

//             </h5>

//             <p class="feed-text">

//                 ${tweet.text}

//             </p>

//             <div class="feed-footer">

//                 <p>

//                     ❤️ ${tweet.likes_count} Likes

//                 </p>

//                 <button
//                     class="btn btn-primary btn-sm"
//                     onclick="likeTweet(${tweet.id})">

//                     Like

//                 </button>

//                 <button
//                     class="btn btn-secondary btn-sm ms-2"
//                     onclick="showComments(${tweet.id})">

//                     Comments

//                 </button>

//                 <small
//                     class="d-block mt-2 text-muted">

//                     ${new Date(
//                         tweet.created_at
//                     ).toLocaleDateString()}

//                 </small>

//             </div>

//             <div
//                 id="comments-${tweet.id}"
//                 class="mt-2">

//             </div>

//         </div>

//     </div>

// </div>

// `;
//  });

//     } catch (error) {
//         console.error(error);
//     }
// }



// // Handle tweet creation form submission
// const tweetForm =document.getElementById("tweetForm");

// if (tweetForm) {
//     tweetForm.addEventListener("submit",createTweet);}
// async function createTweet(e) {

//     e.preventDefault();
//     const token =localStorage.getItem("access");
//     const formData =new FormData();
//     formData.append("text",document.getElementById("tweetText").value);
//     const photo =document.getElementById("tweetPhoto").files[0];
//     if (photo) {
//         formData.append("photo",photo);}
//     try {
//         const response =
//             await fetch(
//                 "/api/tweets/",
//                 {
//                     method: "POST",
//                     headers: {
//                         Authorization:
//                             `Bearer ${token}`
//                     },
//                     body: formData
//                 });

//         if (response.ok){
//             window.location.href = "/";
//         }
//     } catch (error) {console.error(error);
//     }
// }



// function togglePassword() {

//     const password = document.getElementById("password");
//     const eyeIcon = document.getElementById("eyeIcon");

//     if (password.type === "password") {

//         password.type = "text";
//         eyeIcon.classList.remove("bi-eye");
//         eyeIcon.classList.add("bi-eye-slash");

//     } else {

//         password.type = "password";
//         eyeIcon.classList.remove("bi-eye-slash");
//         eyeIcon.classList.add("bi-eye");

//     }

// }


//         // Handle register form submission
//         const registerForm = document.getElementById("registerForm");
//         if (registerForm) {
//             registerForm.addEventListener("submit", registerUser);
//         }

//         const userAnswer = parseInt(document.getElementById("captchaAnswer").value);
//         if (userAnswer !== correctAnswer) {
//             const message = document.getElementById("registerMessage");
//             message.className = "alert alert-danger";
//             message.classList.remove("d-none");
//             message.innerText = "Incorrect CAPTCHA. Please try again.";
//             generateCaptcha();
//             return;
//         }
//     async function registerUser(e) {
//         e.preventDefault();
//         const username = document.getElementById("username").value;
//         const email = document.getElementById("email").value;
//         const password = document.getElementById("password").value;

//     try {
//         const response = await fetch("/api/users/register/",{
//             method: "POST",
//             headers:{"Content-Type":"application/json"},
//             body: JSON.stringify({username,email,password})});

//         const data = await response.json();
//         if (response.ok){
//             const message = document.getElementById("registerMessage");
//             message.className = "alert alert-success";
//             message.innerText = "Registration successful! Redirecting to login...";
//             message.classList.remove("d-none");
//             setTimeout(() => {window.location.href = "/login-page/";}, 2000);
//         } else {
//            const message = document.getElementById("registerMessage");
//                 message.className = "alert alert-danger";
//                 message.classList.remove("d-none");
//                 if (data.username) {
//                     message.innerText = data.username[0];
//                 } else if (data.email) {
//                     message.innerText = data.email[0];
//                 } else if (data.password) {
//                     message.innerText = data.password[0];
//                 } else {
//                     message.innerText = "Registration failed.";
//                 }
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }


// // Load the profile data if we are on the profile page
// const usernameElement =
//     document.getElementById(
//         "username"
//     );

// if (usernameElement) {

//     loadProfile();

// }

// async function loadProfile() {

//     const token =
//         localStorage.getItem(
//             "access"
//         );

//     try {

//         const response =
//             await fetch(
//                 "/api/users/profile/",
//                 {
//                     headers: {
//                         Authorization:
//                             `Bearer ${token}`
//                     }
//                 }
//             );

//         const profile =
//             await response.json();
//            // console.log(profile);
//         document.getElementById(
//             "username"
//         ).innerText =
//             profile.username;

//         document.getElementById(
//             "bio"
//         ).innerText =
//             profile.bio || "No bio added";

//         document.getElementById(
//             "followers"
//         ).innerText =
//             profile.followers_count;

//         document.getElementById(
//             "following"
//         ).innerText =
//             profile.following_count;

//         if (
//             profile.profile_picture
//         ) {

//             document.getElementById(
//                 "profilePicture"
//             ).src =
//                 profile.profile_picture;

//         } else {

//             document.getElementById(
//                 "profilePicture"
//             ).src =
//                 "https://via.placeholder.com/150";
//         }

//     } catch(error) {

//         console.error(error);

//     }

// }


// // Handle profile edit form submission
// const profileForm =
//     document.getElementById(
//         "profileForm"
//     );

// if (profileForm) {

//     profileForm.addEventListener(
//         "submit",
//         updateProfile
//     );

// }

// async function updateProfile(e) {

//     e.preventDefault();

//     const token =
//         localStorage.getItem(
//             "access"
//         );

//     const formData =
//         new FormData();

//     formData.append(
//         "bio",
//         document.getElementById(
//             "bioInput"
//         ).value
//     );

//     const photo =
//         document.getElementById(
//             "profilePictureInput"
//         ).files[0];

//     if (photo) {

//         formData.append(
//             "profile_picture",
//             photo
//         );

//     }

//     try {

//         const response =
//             await fetch(
//                 "/api/users/profile/update/",
//                 {
//                     method: "PUT",

//                     headers: {
//                         Authorization:
//                             `Bearer ${token}`
//                     },

//                     body: formData
//                 }
//             );

//         if (response.ok) {

//             window.location.href =
//                 "/profile-page/";

//         }

//     } catch(error) {

//         console.error(error);

//     }

// }


// // Load public profile data if we are on the public profile page
// const publicUsernameElement =
//     document.getElementById(
//         "publicUsername"
//     );

// if (publicUsernameElement) {

//     loadPublicProfile();

// }

// // Get the username from the URL
// async function loadPublicProfile() {

//     const token =
//         localStorage.getItem(
//             "access"
//         );

//     const username =
//         window.location.pathname
//         .split("/")
//         .filter(Boolean)
//         .pop();

//     const response =
//         await fetch(
//             `/api/users/${username}/`,
//             {
//                 headers: {
//                     Authorization:
//                         `Bearer ${token}`
//                 }
//             }
//         );

//     const profile =
//         await response.json();

//     document.getElementById(
//         "publicUsername"
//     ).innerText =
//         profile.username;

//     document.getElementById(
//         "publicBio"
//     ).innerText =
//         profile.bio || "No Bio";

//     document.getElementById(
//         "publicFollowers"
//     ).innerText =
//         profile.followers_count;

//     document.getElementById(
//         "publicFollowing"
//     ).innerText =
//         profile.following_count;

//     if (
//         profile.profile_picture
//     ) {

//         document.getElementById(
//             "publicProfilePicture"
//         ).src =
//             profile.profile_picture;
//     }

// }

// // Follow or unfollow user button handler
// document.getElementById("followButton")?.addEventListener("click",followUser);
// document.getElementById("unfollowButton")?.addEventListener("click",unfollowUser);
// async function followUser() {

//     const token =
//         localStorage.getItem(
//             "access"
//         );

//     const username =
//         document.getElementById(
//             "publicUsername"
//         ).innerText;

//     const response =
//         await fetch(
//             `/api/users/follow/${username}/`,
//             {
//                 method: "POST",

//                 headers: {
//                     Authorization:
//                         `Bearer ${token}`
//                 }
//             }
//         );

//     if (response.ok) {

//         loadPublicProfile();

//     }

// }

// // Handle search form submission
// async function searchUsers() {

//     const token =
//         localStorage.getItem(
//             "access"
//         );

//     const query =
//         document.getElementById(
//             "searchInput"
//         ).value;

//     try {

//         const response =
//             await fetch(
//                 `/api/users/search/?q=${query}`,
//                 {
//                     headers: {
//                         Authorization:
//                             `Bearer ${token}`
//                     }
//                 }
//             );

//         const users =
//             await response.json();

//         const container =
//             document.getElementById(
//                 "searchResults"
//             );

//         container.innerHTML = "";

//         users.forEach(user => {

//             container.innerHTML += `

//                 <div
//                     class="card mt-2">

//                     <div
//                         class="card-body">

//                         <h5>

//                             ${user.username}

//                         </h5>

//                         <a
//                             href="/user/${user.username}/"
//                             class="btn btn-primary">

//                             View Profile

//                         </a>

//                     </div>

//                 </div>

//             `;

//         });

//     } catch(error) {

//         console.error(error);

//     }

// }



// // Unfollow user function
// async function unfollowUser() {

//     const token =
//         localStorage.getItem(
//             "access"
//         );

//     const username =
//         document.getElementById(
//             "publicUsername"
//         ).innerText;

//     try {

//         const response =
//             await fetch(
//                 `/api/users/unfollow/${username}/`,
//                 {
//                     method: "POST",

//                     headers: {
//                         Authorization:
//                             `Bearer ${token}`
//                     }
//                 }
//             );

//         if (response.ok) {

//             loadPublicProfile();

//         }

//     } catch(error) {

//         console.error(error);

//     }

// }



// // js for the captcha generation for  registartion form
// let num1, num2, correctAnswer;
// function generateCaptcha() {
//     num1 = Math.floor(Math.random() * 10) + 1;
//     num2 = Math.floor(Math.random() * 10) + 1;
//     correctAnswer = num1 + num2;
//     document.getElementById("captchaQuestion").innerText =
//         `What is ${num1} + ${num2}?`;
// }
// document.addEventListener("DOMContentLoaded", () => {

//     updateNavbar();

//     if (document.getElementById("registerForm")) {
//         generateCaptcha();
//     }

//     const protectedPages = [
//         "/profile-page/",
//         "/create-tweet-page/",
//         "/edit-profile-page/",
//         "/search-users-page/"
//     ];

//     const token = localStorage.getItem("access");

//     if (!token && protectedPages.includes(window.location.pathname)) {
//         window.location.href = "/login-page/";
//     }

// });

// // if the answer is wrong, the form won’t be submitted and a new question will appear.
// const userAnswer = parseInt(document.getElementById("captchaAnswer").value);
// if (userAnswer !== correctAnswer) {

//     const message = document.getElementById("registerMessage");
//     message.className = "alert alert-danger";
//     message.classList.remove("d-none");
//     message.innerText = "Incorrect CAPTCHA. Please try again.";

//     generateCaptcha();
//     return;

// }








// ======================================================
// TweetUp
// Application Entry Point
// ------------------------------------------------------
// This file initializes all JavaScript modules after the
// DOM has finished loading.
// ======================================================

console.log("TweetUp Loaded");
document.addEventListener("DOMContentLoaded", () => {

    // ------------------------------------------
    // Navigation
    // ------------------------------------------
    updateNavbar();
    protectPages();


    // ------------------------------------------
    // Authentication
    // ------------------------------------------
    initializeLogin();
    initializeRegister();


    // ------------------------------------------
    // Tweet Features
    // ------------------------------------------
    initializeTweetForm();
    initializeFeed();


    // ------------------------------------------
    // Profile
    // ------------------------------------------
    initializeProfile();
    initializePublicProfile();


    // ------------------------------------------
    // Search Users
    // ------------------------------------------
    initializeSearch();

});