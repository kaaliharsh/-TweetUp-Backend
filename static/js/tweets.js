// ======================================================
// TweetUp
// Tweet Module
// ------------------------------------------------------
// Handles:
// 1. Initialize Tweet Form
// 2. Create Tweet
// ======================================================

function initializeTweetForm() {

    const tweetForm = document.getElementById("tweetForm");

    if (!tweetForm) {
        return;
    }

    tweetForm.addEventListener("submit", createTweet);

}

async function createTweet(e) {

    e.preventDefault();

    const token = localStorage.getItem("access");

    const formData = new FormData();

    formData.append(
        "text",
        document.getElementById("tweetText").value
    );

    const photo = document.getElementById("tweetPhoto").files[0];

    if (photo) {
        formData.append("photo", photo);
    }

    try {

        const response = await fetch(
            "/api/tweets/",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            }
        );

        if (response.ok) {
            window.location.href = "/";
        }

    } catch (error) {
        console.error(error);
    }

}