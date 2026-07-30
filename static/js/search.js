// ======================================================
// TweetUp
// User Search Module
// ------------------------------------------------------
// Handles:
// 1. Search Users
// 2. Display Search Results
// ======================================================



// ===========================================
// Initialize Search Page
// ===========================================

function initializeSearch() {

    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput) {

        return;

    }

    searchInput.addEventListener(
        "keyup",
        (event) => {

            if (event.key === "Enter") {

                searchUsers();

            }

        }
    );

}



// ===========================================
// Search Users
// ===========================================

async function searchUsers() {

    const token =
        localStorage.getItem("access");

    const query =
        document.getElementById(
            "searchInput"
        ).value.trim();

    const resultsContainer =
        document.getElementById(
            "searchResults"
        );

    if (!query) {

        resultsContainer.innerHTML = `
            <div class="alert alert-warning">
                Please enter a username.
            </div>
        `;

        return;

    }

    try {

        const response =
            await fetch(
                `/api/users/search/?q=${query}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const users =
            await response.json();

        resultsContainer.innerHTML = "";

        if (users.length === 0) {

            resultsContainer.innerHTML = `
                <div class="alert alert-secondary">
                    No users found.
                </div>
            `;

            return;

        }

        users.forEach(user => {

            resultsContainer.innerHTML += `

                <div class="card mt-3 shadow-sm">

                    <div class="card-body">

                        <h5>

                            @${user.username}

                        </h5>

                        <p>

                            ${user.bio || "No bio available."}

                        </p>

                        <a
                            href="/user/${user.username}/"
                            class="btn btn-primary">

                            View Profile

                        </a>

                    </div>

                </div>

            `;

        });

    }

    catch (error) {

        console.error(
            "Error searching users:",
            error
        );

    }

}