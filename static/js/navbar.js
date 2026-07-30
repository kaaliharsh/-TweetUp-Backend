// ======================================================
// TweetUp
// Navbar Module
// Handles:
// 1. Navbar visibility
// 2. Protected page access
// ======================================================

function updateNavbar() {

    const token = localStorage.getItem("access");

    const loggedIn = !!token;

    document.getElementById("createTweetNav")
        ?.classList.toggle("d-none", !loggedIn);

    document.getElementById("searchNav")
        ?.classList.toggle("d-none", !loggedIn);

    document.getElementById("profileNav")
        ?.classList.toggle("d-none", !loggedIn);

    document.getElementById("logoutNav")
        ?.classList.toggle("d-none", !loggedIn);

    document.getElementById("loginNav")
        ?.classList.toggle("d-none", loggedIn);

    document.getElementById("registerNav")
        ?.classList.toggle("d-none", loggedIn);

}


// Redirect unauthenticated users
function protectPages() {

    const protectedPages = [

        "/profile-page/",
        "/create-tweet-page/",
        "/edit-profile-page/",
        "/search-users-page/"

    ];

    const token = localStorage.getItem("access");

    if (!token &&
        protectedPages.includes(window.location.pathname)) {

        window.location.href = "/login-page/";

    }

}