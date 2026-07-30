// ======================================================
// TweetUp
// Profile Module
// ------------------------------------------------------
// Handles:
// 1. Load Logged-in User Profile
// 2. Update Profile
// ======================================================



// ===========================================
// Initialize Profile Page
// ===========================================

function initializeProfile() {

    if (document.getElementById("username")) {

        loadProfile();

    }

    const profileForm =
        document.getElementById("profileForm");

    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            updateProfile
        );

    }

}



// ===========================================
// Load Logged-in User Profile
// ===========================================

async function loadProfile() {

    const token =
        localStorage.getItem("access");

    try {

        const response =
            await fetch(
                "/api/users/profile/",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const profile =
            await response.json();

        document.getElementById("username").innerText =
            profile.username;

        document.getElementById("bio").innerText =
            profile.bio || "No bio added";

        document.getElementById("followers").innerText =
            profile.followers_count;

        document.getElementById("following").innerText =
            profile.following_count;

        const profilePicture =
            document.getElementById("profilePicture");

        if (profile.profile_picture) {

            profilePicture.src =
                profile.profile_picture;

        }

        else {

            profilePicture.src =
                "https://via.placeholder.com/150";

        }

    }

    catch (error) {

        console.error(
            "Error loading profile:",
            error
        );

    }

}



// ===========================================
// Update Profile
// ===========================================

async function updateProfile(e) {

    e.preventDefault();

    const token =
        localStorage.getItem("access");

    const formData =
        new FormData();

    formData.append(
        "bio",
        document.getElementById("bioInput").value
    );

    const photo =
        document.getElementById(
            "profilePictureInput"
        ).files[0];

    if (photo) {

        formData.append(
            "profile_picture",
            photo
        );

    }

    try {

        const response =
            await fetch(
                "/api/users/profile/update/",
                {
                    method: "PUT",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    },

                    body: formData
                }
            );

        if (response.ok) {

            window.location.href =
                "/profile-page/";

        }

    }

    catch (error) {

        console.error(
            "Error updating profile:",
            error
        );

    }

}