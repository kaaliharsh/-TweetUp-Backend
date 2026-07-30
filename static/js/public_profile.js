// ======================================================
// TweetUp
// Public Profile Module
// ------------------------------------------------------
// Handles:
// 1. Load Public Profile
// 2. Follow User
// 3. Unfollow User
// ======================================================



// ===========================================
// Initialize Public Profile Page
// ===========================================

function initializePublicProfile() {

    if (!document.getElementById("publicUsername")) {

        return;

    }

    loadPublicProfile();

    document.getElementById("followButton")
        ?.addEventListener(
            "click",
            followUser
        );

    document.getElementById("unfollowButton")
        ?.addEventListener(
            "click",
            unfollowUser
        );

}



// ===========================================
// Load Public Profile
// ===========================================

async function loadPublicProfile() {

    const token =
        localStorage.getItem("access");

    const username =
        window.location.pathname
            .split("/")
            .filter(Boolean)
            .pop();

    try {

        const response =
            await fetch(
                `/api/users/${username}/`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const profile =
            await response.json();

        document.getElementById(
            "publicUsername"
        ).innerText =
            profile.username;

        document.getElementById(
            "publicBio"
        ).innerText =
            profile.bio || "No Bio";

        document.getElementById(
            "publicFollowers"
        ).innerText =
            profile.followers_count;

        document.getElementById(
            "publicFollowing"
        ).innerText =
            profile.following_count;

        const profilePicture =
            document.getElementById(
                "publicProfilePicture"
            );

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
            "Error loading public profile:",
            error
        );

    }

}



// ===========================================
// Follow User
// ===========================================

async function followUser() {

    const token =
        localStorage.getItem("access");

    const username =
        document.getElementById(
            "publicUsername"
        ).innerText;

    try {

        const response =
            await fetch(
                `/api/users/follow/${username}/`,
                {
                    method: "POST",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        if (response.ok) {

            loadPublicProfile();

        }

    }

    catch (error) {

        console.error(
            "Error following user:",
            error
        );

    }

}



// ===========================================
// Unfollow User
// ===========================================

async function unfollowUser() {

    const token =
        localStorage.getItem("access");

    const username =
        document.getElementById(
            "publicUsername"
        ).innerText;

    try {

        const response =
            await fetch(
                `/api/users/unfollow/${username}/`,
                {
                    method: "POST",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        if (response.ok) {

            loadPublicProfile();

        }

    }

    catch (error) {

        console.error(
            "Error unfollowing user:",
            error
        );

    }

}