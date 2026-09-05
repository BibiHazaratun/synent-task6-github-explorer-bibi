# GitHub Profile Explorer

Built for **Synent Technologies Web Development Internship — Task 6 (Intermediate Level, API Integration)**.

## What it does
Search any GitHub username to see their public profile — avatar, name, bio, location, follower/following counts, public repo count — and their top 5 repositories sorted by star count, each linking out to GitHub.

## Features
- Fetches live data from the **GitHub REST API** using `fetch()`
- **Loading state** — spinner shown while the request is in flight
- **Error handling** — distinguishes a 404 ("user not found") from other failures, and handles a user with zero public repos
- Repositories are fetched in parallel with the profile (`Promise.all`) and sorted client-side by stars
- Fully responsive layout

## Tech
- Plain **HTML5**, **CSS3**, and vanilla **JavaScript** — no framework, no libraries
- [GitHub REST API](https://docs.github.com/en/rest) — `/users/{username}` and `/users/{username}/repos`

## Live Demo
[Live Demo](https://bibihazaratun.github.io/synent-task6-github-explorer-bibi/)

## Author
Bibi Hazaratun Nesa — CSE, Premier University, Chittagong