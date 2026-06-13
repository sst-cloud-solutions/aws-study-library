---
sidebar_position: 9
sidebar_label: "Module 8: DevOps Foundations"
---

# Module 8: DevOps Foundations

DevOps bridges the gap between software development and systems operations. This module covers Git version control workflows, merge conflict resolution, CI/CD pipeline automation phases, containerization mechanics, and writing optimized Dockerfiles.

---

## 8.1 Git Version Control Guide

Git is a distributed version control system that tracks code history and coordinates work among developers.

### 8.1.1 The Four Git States
A file in a Git project moves between four main states:
1.  **Working Directory:** Local files on your disk that are not yet tracked or have modified unstaged changes.
2.  **Staging Area (Index):** A landing zone where you prepare changes to be packaged into a commit.
3.  **Local Repository:** A local database containing all committed snapshots and complete branch histories (`.git` directory).
4.  **Remote Repository:** A hosted copy of the database (e.g. on GitHub or GitLab) used to share changes with other developers.

```
       [ Working Directory ] ──(git add)──> [ Staging Area ] ──(git commit)──> [ Local Repo ]
                 │                                                                   │
                 └──────────────────────────────(git push)───────────────────────────▼
                                                                                [ Remote Repo ]
```

### 8.1.2 Git Command Cheat Sheet
*   **Initialize & Clone:**
    *   `git init` (Create a new local repository).
    *   `git clone <url>` (Download an existing remote repository).
*   **Track & Commit:**
    *   `git status` (Show modified, deleted, or unstaged files).
    *   `git add <file_path>` or `git add .` (Stage modified files).
    *   `git commit -m "commit message"` (Record staged files to local history).
    *   `git log --oneline` (Display compressed commit history).
    *   `git diff` (Show changes between working directory and staging).
*   **Branching & Merging:**
    *   `git branch <branch_name>` (Create a new branch).
    *   `git checkout <branch_name>` or `git switch <branch_name>` (Switch branches).
    *   `git checkout -b <branch_name>` (Create and switch to a new branch).
    *   `git merge <branch_name>` (Combine changes from targeted branch into current branch).
    *   `git rebase <branch_name>` (Re-apply commits from current branch on top of targeted branch).
*   **Stash & Temporary Storage:**
    *   `git stash` (Save modified files to temporary storage and revert to a clean state).
    *   `git stash pop` (Restore stashed files).
*   **Remote Operations:**
    *   `git push <remote> <branch>` (Upload local commits to remote repository).
    *   `git pull <remote> <branch>` (Download remote commits and merge them into your local branch).

### 8.1.3 Resolving Merge Conflicts
A merge conflict occurs when two developers modify the same line of a file in different ways on different branches. When you try to merge them, Git halts and inserts conflict markers:

```text
<<<<<<< HEAD
print("Welcome to the production environment")
=======
print("Welcome to the testing sandbox")
>>>>>>> feature-branch
```

*   `<<<<<<< HEAD` to `=======` contains the code on your current branch.
*   `=======` to `>>>>>>> feature-branch` contains the code on the incoming branch.
*   **Resolution Process:**
    1.  Open the file and manually delete the conflict markers.
    2.  Edit the code to keep the desired version.
    3.  Stage the resolved file: `git add <file>`.
    4.  Commit the merge: `git commit -m "Resolve merge conflict"`.

---

## 8.2 Continuous Integration & Continuous Delivery (CI/CD)

CI/CD automates the transition of code from Git repositories to production servers.

### 8.2.1 The CI/CD Pipeline Phases
1.  **Code Commit Trigger:** A developer pushes code changes to a Git branch, triggering the build engine.
2.  **Continuous Integration (CI):**
    *   *Build:* Pull dependencies (e.g. `npm install`, `pip install`) and compile binaries.
    *   *Unit Testing:* Run fast unit tests and linter audits to catch syntax or logical bugs.
    *   *Vulnerability Scan:* Scan dependencies for known security exploits.
3.  **Continuous Delivery (CD):**
    *   *Integration Testing:* Deploy the code to a staging environment and run integration tests.
    *   *Deployment:* Push the release assets to production servers.

### 8.2.2 Deployment Strategies
*   **All-at-Once:** Deploys updates to all servers simultaneously. Fast, but causes downtime and carries high risk.
*   **Rolling Update:** Deploys updates to a subset of servers at a time, keeping others active. Prevents downtime, but results in different versions running simultaneously.
*   **Blue-Green:** Deploys the new version (Green) to an isolated duplicate environment while the old version (Blue) continues serving live traffic. Traffic is swapped instantly via a router or DNS change. Easy rollback, but doubles infrastructure cost.
*   **Canary:** Routes a small percentage (e.g. 5%) of live traffic to the new version. If error rates remain normal, traffic is gradually shifted to 100%.

---

## 8.3 Containers & Docker Mechanics

Containers package application code and dependencies into a single, standardized execution unit.

### 8.3.1 Containers vs. Virtual Machines
*   **Virtual Machines:** Virtualize hardware. Each VM has its own guest operating system kernel, virtual memory, and drivers, making them heavy (gigabytes) and slow to boot.
*   **Containers:** Virtualize the host operating system kernel. They run as isolated processes sharing the host OS kernel, making them lightweight (megabytes) and fast to boot (seconds).
*   **Isolation Isolation:** Linux achieves container isolation using two kernel features:
    *   **Namespaces:** Restrict what a container can see (isolates process lists, network devices, and mount points).
    *   **Control Groups (cgroups):** Restrict what a container can use (limits CPU, RAM, and disk I/O allocation).

### 8.3.2 Production-Ready Dockerfile Design
A `Dockerfile` is a text configuration containing instructions to assemble a container image.

Here is an optimized, multi-stage, production-ready Dockerfile for a Node.js web application:

```dockerfile
# Stage 1: Build & Compile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production Execution
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist

EXPOSE 3000
USER node
CMD ["node", "dist/server.js"]
```

### 8.3.3 Core Dockerfile Directives
*   `FROM`: Sets the baseline parent image. Using minimal distributions like `alpine` keeps images small and secure.
*   `WORKDIR`: Sets the working directory inside the container.
*   `RUN`: Executes commands inside the container during the build phase (e.g. compiling code).
*   `COPY`: Copies files from your local host machine to the container filesystem.
*   `EXPOSE`: Documents the network port the container runs on.
*   `ENV`: Sets environment variables.
*   `CMD` vs. `ENTRYPOINT`:
    *   `ENTRYPOINT`: Configures the binary executable that runs when the container starts.
    *   `CMD`: Sets default arguments for the `ENTRYPOINT`. Users can override `CMD` parameters when running the container.
    *   *Exec Form (`["node", "server.js"]`)* is preferred over *Shell Form (`node server.js`)* because it runs the process directly as PID 1, allowing the container to catch termination signals (like SIGTERM) correctly.

---

## 8.4 Official DevOps References & Manuals

To access official documentation guides and reference manuals:
*   **Git Reference Manual:** [Git-SCM Documentation](https://git-scm.com/doc) - The official Book, reference sheets, and command manuals.
*   **Docker Reference Manual:** [Docker Documentation](https://docs.docker.com/) - The primary portal for Dockerfile instructions, Docker CLI commands, and container engines.
