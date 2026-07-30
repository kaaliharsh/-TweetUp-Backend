// ======================================================
// TweetUp
// Feed Module
// Handles:
// 1. Feed
// 2. Likes
// 3. Comments
// ======================================================

function initializeFeed() {
    if (document.getElementById("tweetsContainer")){
        loadFeed();
    }
}

async function loadFeed(){
    const token =localStorage.getItem("access");
    try {
        const response =
            await fetch(
                "/api/tweets/feed/",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const tweets =
            await response.json();

        tweetsContainer.innerHTML = "";

        tweets.forEach(tweet => {
            
  tweetsContainer.innerHTML += `

<div class="col-xl-3 col-lg-4 col-md-6 mb-4">

    <div class="card shadow-sm feed-card">

        ${tweet.photo ? `
            <img
                src="${tweet.photo}"
                class="card-img-top feed-image">
        ` : ''}

        <div class="card-body d-flex flex-column">

            <h5>

                <a
                    href="/user/${tweet.username}/"
                    class="username-link">

                    @${tweet.username}

                </a>

            </h5>

            <p class="feed-text">

                ${tweet.text}

            </p>

            <div class="feed-footer">

                <p>

                    ❤️ ${tweet.likes_count} Likes

                </p>

                <button
                    class="btn btn-primary btn-sm"
                    onclick="likeTweet(${tweet.id})">

                    Like

                </button>

                <button
                    class="btn btn-secondary btn-sm ms-2"
                    onclick="showComments(${tweet.id})">

                    Comments

                </button>

                <small
                    class="d-block mt-2 text-muted">

                    ${new Date(
                        tweet.created_at
                    ).toLocaleDateString()}

                </small>

            </div>

            <div
                id="comments-${tweet.id}"
                class="mt-2">

            </div>

        </div>

    </div>

</div>

`;
 });

    } catch (error) {
        console.error(error);
    }
}

// Like a tweet button handler
async function likeTweet(tweetId) {
    const token =localStorage.getItem("access");
    try {
        const response =
            await fetch(`/api/tweets/${tweetId}/like/`,{method: "POST",headers: {Authorization:`Bearer ${token}`}});
        if (response.ok) {
            loadFeed();
        }
    } catch(error) {console.error(error);
    }
}

// Fetches and displays all comments for a specific tweet, then adds an input field and 
// button to allow the user to post a new comment.
async function showComments(tweetId) {
    const token =localStorage.getItem("access");
    const container =document.getElementById(`comments-${tweetId}`);

    try {
        const response =
            await fetch(
                `/api/tweets/${tweetId}/comments/list/`,
                {
                    headers: {Authorization:`Bearer ${token}`}});

        const comments =await response.json();
        container.innerHTML = "";
        comments.forEach(comment =>{
            container.innerHTML += `
                <div
                    class="border rounded p-2 mt-2">
                    <strong>${comment.username}</strong>
                    <br>
                    ${comment.text}
                </div>
            `;});

        container.innerHTML += `
            <div class="mt-3">
                <input
                    id="commentInput-${tweetId}"
                    class="form-control"
                    placeholder="Write comment">
                <button
                    class="btn btn-success mt-2"
                    onclick="addComment(${tweetId})">
                    Add Comment
                </button>
            </div>
            `;
    } catch(error) {console.error(error);
    }
}

// Add comment to a tweet
async function addComment(tweetId) {
    const token =localStorage.getItem("access");
    const text =document.getElementById(`commentInput-${tweetId}`).value;
    try {
        const response =
            await fetch(
                `/api/tweets/${tweetId}/comments/`,
                {
                    method: "POST",
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        text
                    })
                }
            );
        if (response.ok) {
            showComments(tweetId);
        }
    } catch(error) {
        console.error(error);
    }
}

