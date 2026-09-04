const form = document.getElementById("searchForm");
const input = document.getElementById("usernameInput");

const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");
const errorMessage = document.getElementById("errorMessage");
const profileResult = document.getElementById("profileResult");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = input.value.trim();
  if (!username) return;

  showLoading();

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=100`)
    ]);

    if (!userRes.ok) {
      throw new Error(
        userRes.status === 404 ? "No GitHub user found with that username." : "Something went wrong fetching that profile."
      );
    }

    const user = await userRes.json();
    const repos = reposRes.ok ? await reposRes.json() : [];

    renderProfile(user, repos);
  } catch (err) {
    showError(err.message);
  }
});

function showLoading() {
  loadingState.classList.remove("hidden");
  errorState.classList.add("hidden");
  profileResult.classList.add("hidden");
}

function showError(message) {
  loadingState.classList.add("hidden");
  errorState.classList.remove("hidden");
  profileResult.classList.add("hidden");
  errorMessage.textContent = message;
}

function renderProfile(user, repos) {
  loadingState.classList.add("hidden");
  errorState.classList.add("hidden");
  profileResult.classList.remove("hidden");

  document.getElementById("avatar").src = user.avatar_url;
  document.getElementById("fullName").textContent = user.name || user.login;
  document.getElementById("username").textContent = "@" + user.login;
  document.getElementById("bio").textContent = user.bio || "No bio provided.";
  document.getElementById("location").textContent = user.location ? `📍 ${user.location}` : "";
  document.getElementById("profileLink").href = user.html_url;

  document.getElementById("repoCount").textContent = user.public_repos ?? 0;
  document.getElementById("followerCount").textContent = user.followers ?? 0;
  document.getElementById("followingCount").textContent = user.following ?? 0;

  const repoList = document.getElementById("repoList");
  repoList.innerHTML = "";

  const topRepos = repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  if (topRepos.length === 0) {
    repoList.innerHTML = `<p style="color:var(--muted); font-family:var(--mono); font-size:0.85rem;">No public repositories found.</p>`;
    return;
  }

  topRepos.forEach((repo) => {
    const item = document.createElement("a");
    item.href = repo.html_url;
    item.target = "_blank";
    item.rel = "noopener";
    item.className = "repo-item";
    item.innerHTML = `
      <div>
        <div class="repo-name">${repo.name}</div>
        <div class="repo-desc">${repo.description ? repo.description : "No description"}</div>
      </div>
      <div class="repo-stars">⭐ ${repo.stargazers_count}</div>
    `;
    repoList.appendChild(item);
  });
}