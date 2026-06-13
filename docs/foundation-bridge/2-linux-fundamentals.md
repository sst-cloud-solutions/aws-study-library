---
sidebar_position: 3
sidebar_label: "Module 2: Linux Fundamentals"
---

# Module 2: Linux Fundamentals

Linux is the operating system powering most enterprise server infrastructure. This module covers the UNIX Filesystem Hierarchy Standard, essential shell commands, the security permission model, and SSH remote administration.

---

## 2.1 The Filesystem Hierarchy Standard (FHS)

Unlike Windows, which has separate drives like `C:\` and `D:\`, Linux hosts everything under a single unified root directory (`/`).

```
                              / (Root)
     ┌───────────┬────────────┼────────────┬────────────┐
   /bin        /etc         /home        /var         /tmp
 (Binaries) (Configs)    (User Homes)  (Log/Data)  (Temporary)
                              │
                           /ubuntu (Home shortcut: ~)
```

*   **`/` (Root):** The parent directory of the entire filesystem hierarchy.
*   **`/bin` & `/sbin`:** Contains essential command binaries needed for system booting and single-user recovery (e.g. `ls`, `cp`, `ip`, `reboot`). `/sbin` holds administrative system binaries.
*   **`/etc`:** The central directory for system configurations. Contains files like hostnames, network configurations, database settings, and script paths.
*   **`/home`:** Contains private user directories (e.g., `/home/ubuntu`, `/home/alice`). The current user's home directory is shortcut-referenced by `~`.
*   **`/var`:** Variable data directory. Used for files that change dynamically, such as system logs (`/var/log/syslog`), databases, and mail queues.
*   **`/tmp`:** Temporary file storage. Any user can read/write here. Files here are usually cleared on system reboots.
*   **`/usr` & `/usr/local`:** User-installed programs and libraries. `/usr/local` is designated for software installed manually by the administrator to prevent conflicts with system updates.
*   **`/opt`:** Directory reserved for third-party, add-on software packages.

---

## 2.2 Shells, CLIs, & Headless Servers

Linux servers are typically managed "headlessly"—meaning they have no physical monitor attached and do not run a Graphical User Interface (GUI).

### 2.2.1 Why Servers Do Not Run GUIs
Enterprise systems explicitly disable visual desktops (X11, GNOME, Windows Server Desktop Experience) for three critical architectural reasons:
1.  **Resource Conservation (RAM/CPU):** A GUI desktop environment requires running a window manager, graphics compositors, and font libraries, which can consume 1–2 GB of RAM and continuous CPU cycles. Running without a GUI (headless) saves these resources, allowing them to go directly to the application or database.
2.  **Attack Surface Reduction (Security):** Desktops contain millions of lines of code, hundreds of dependencies, and network plugins. Disabling the GUI eliminates these packages, drastically reducing the number of entry points (vulnerabilities) for hackers.
3.  **Automation & Scripting:** Servers need to be configured programmatically at scale (e.g., spin up 100 identical servers in 30 seconds). Since you cannot click buttons in a GUI dynamically, configurations must be written in code and run via command line shells.

---

## 2.3 Complete Command Line Interface (CLI) Guide

Linux CLI commands follow a standard syntax: `command [options/flags] [arguments]`. Flags modify command behaviors, while arguments designate the targets.

### 2.3.1 Navigation & Directory Inspections
*   **`pwd` (Print Working Directory):** Outputs the absolute path of the directory you are currently in.
*   **`cd [directory]` (Change Directory):**
    *   `cd /var/log` (Navigate to an absolute path)
    *   `cd ../configs` (Navigate to a relative path relative to your current location)
    *   `cd ~` or `cd` (Navigate to your home folder)
    *   `cd -` (Jump back to the previous directory you were in)
*   **`ls [options] [path]` (List Directory Contents):**
    *   `-l` (Long format: displays file type, permissions, link count, owner, group, file size, and timestamp).
    *   `-a` (Lists all files, including hidden files starting with a `.`).
    *   `-h` (Human-readable sizes: formats bytes into KB, MB, GB).
    *   `-t` (Sorts files by modification time, newest first).
    *   `-S` (Sorts files by size).
    *   *Usage example:* `ls -lahS /var/log`

### 2.3.2 File and Directory Operations
*   **`mkdir [options] <directory_name>` (Make Directory):**
    *   `-p` (Creates parent directories recursively if they do not exist).
    *   *Usage:* `mkdir -p /home/ubuntu/projects/scripts`
*   **`touch <file_name>`:** Creates an empty file or updates the access timestamp of an existing file.
*   **`cp [options] <source> <destination>` (Copy File):**
    *   `-r` (Recursively copy entire directories and their contents).
    *   *Usage:* `cp -r /etc/nginx /etc/nginx_backup`
*   **`mv <source> <destination>` (Move / Rename):** Moves a file to a new path or renames it.
*   **`rm [options] <target>` (Remove / Delete):**
    *   `-r` (Recursive delete for folders).
    *   `-f` (Force delete: overrides write-protect warnings and ignores non-existent targets).
    *   *Usage:* `rm -rf /tmp/old-assets` (Use with extreme caution!).
*   **`ln -s <target> <link_name>` (Symbolic Link):** Creates a virtual reference (shortcut) pointing to a physical file or directory.

### 2.3.3 Viewing & Editing Text Files
*   **`cat <file>`:** Outputs the entire text contents of a file to the terminal screen.
*   **`less <file>`:** Opens the file in a scrollable, memory-efficient terminal viewer.
    *   Press `G` to jump to the end of the file.
    *   Press `g` to jump to the beginning of the file.
    *   Type `/pattern` and press Enter to search forward. Press `n` for next match, `N` for previous match.
    *   Press `q` to exit.
*   **`head -n <lines> <file>`:** Prints the first $N$ lines of a file.
*   **`tail -n <lines> <file>`:** Prints the last $N$ lines of a file.
    *   `-f` (Follow mode: keeps the connection open and streams new content to the console as it is written).
    *   *Usage:* `tail -f /var/log/nginx/error.log` (Essential for real-time debugging).

### 2.3.4 Searching and Finding
*   **`grep [options] <pattern> [file/directory]`:** Searches for text strings.
    *   `-r` (Recursive search through subdirectories).
    *   `-n` (Prints matching line numbers).
    *   `-i` (Case-insensitive search).
    *   *Usage:* `grep -rni "connection timeout" /var/log/`
*   **`find <path> -type <f/d> -name <pattern>`:** Locates files (`-type f`) or directories (`-type d`) matching a name pattern.
    *   *Usage:* `find /etc -type f -name "*.conf"`

---

## 2.4 User, Group, & Permission Model

Linux enforces security through file ownership and access permissions. Every file belongs to a **User (Owner)** and a **Group**, and has separate permission bits.

### 2.4.1 Deciphering the `ls -l` Permissions String
When you run `ls -lh`, the terminal prints file listings containing metadata. Let's break down exactly how to read this line character-by-character:

```text
 drwxr-xr-x  2  ubuntu  web-admins  4.0K  Jun 13 14:00  index.html
 │└──┼──┼──┘  │     │         │        │         │            │
 │   │  │  │  │     │         │        │         │            └── File/Folder Name
 │   │  │  │  │     │         │        │         └─────────────── Last Modified Date
 │   │  │  │  │     │         │        └───────────────────────── File Size (4.0 KB)
 │   │  │  │  │     │         └────────────────────────────────── Owning Group
 │   │  │  │  │     └──────────────────────────────────────────── Owning User
 │   │  │  │  └────────────────────────────────────────────────── Hard Links Count
 │   │  │  └───────────────────────────────────────────────────── Others Permissions (r-x)
 │   │  └──────────────────────────────────────────────────────── Group Permissions (r-x)
 │   └─────────────────────────────────────────────────────────── Owner Permissions (rwx)
 └─────────────────────────────────────────────────────────────── File Type (d = directory, - = regular file)
```

*   **File Type Indicator:** The very first character determines what the item is:
    *   `-` (Regular file)
    *   `d` (Directory / folder)
    *   `l` (Symbolic link / shortcut)
*   **Permission Triplets:** The next 9 characters are grouped into three sets of three:
    1.  **Owner (User) Permissions:** The permissions for the individual owner of the file.
    2.  **Group Permissions:** The permissions for any user who is a member of the owning group.
    3.  **Others Permissions:** The permissions for everyone else on the system.

### 2.4.2 Permission Meanings
*   **Read (r):** View file contents or list folder files. Represented mathematically as **4**.
*   **Write (w):** Modify file contents or create/delete files inside a folder. Represented mathematically as **2**.
*   **Execute (x):** Run a file as an executable program, or enter/traverse a directory path. Represented mathematically as **1**.

### 2.4.3 Octal Permissions Math
By adding the values of the permissions in each block, you get a 3-digit octal permission configuration:

| Octal Value | Permissions String | Access Level |
| :--- | :--- | :--- |
| **7 (4+2+1)** | `rwx` | Read, Write, and Execute |
| **6 (4+2)** | `rw-` | Read and Write (No Execute) |
| **5 (4+1)** | `r-x` | Read and Execute (No Write) |
| **4** | `r--` | Read Only |
| **0** | `---` | No permissions |

### 2.4.4 Ownership Commands
*   **`chmod [permissions] <file>` (Change Mode):**
    *   *Octal configuration:* `chmod 755 script.sh` (Owner can read/write/execute; group/others can read/execute).
    *   *Symbolic configuration:* `chmod u+x script.sh` (Add execution rights specifically for the owner user).
    *   *Security strict configuration:* `chmod 400 key.pem` (Only the owner can read; group and others have zero access).
*   **`chown <owner>:<group> <file>` (Change Owner):**
    *   *Usage:* `sudo chown nginx:web-admins index.html`

---

## 2.5 Secure Shell (SSH) Remote Administration

SSH (Secure Shell) is an encrypted cryptographic network protocol used to log in and run commands on remote servers securely over insecure networks.

### 2.5.1 Public Key Authentication
SSH uses asymmetric key pairs consisting of:
1.  **Private Key (`id_rsa` / `key.pem`):** Stored securely on your local client machine. **Never share this file.**
2.  **Public Key (`id_rsa.pub`):** Placed on the remote server inside the user's home folder at `~/.ssh/authorized_keys`.

When logging in, the server challenges your client. The client signs the challenge using the private key, and the server validates it using the public key.

```
 [Local Client (Private Key)] ──(Sign Challenge)──> [Remote Server (Public Key authorized_keys)]
```

### 2.5.2 Essential SSH Commands
*   **Log in to Remote Server:**
    *   `ssh -i <path_to_private_key> <username>@<server_ip_address>`
    *   *Usage:* `ssh -i ~/.ssh/prod_key.pem ubuntu@54.210.8.2`
*   **Generate SSH Keypair:**
    *   `ssh-keygen -t ed25519 -C "admin@company.com"`
*   **Copy Public Key to Server:**
    *   `ssh-copy-id -i ~/.ssh/id_ed25519.pub ubuntu@54.210.8.2`

### 2.5.3 The SSH Configuration File (`~/.ssh/config`)
To avoid typing long IP addresses, usernames, and key paths, create a local client configuration file at `~/.ssh/config`:

```text
Host prod-server
    HostName 54.210.8.2
    User ubuntu
    IdentityFile ~/.ssh/prod_key.pem
    Port 22
```

Now you can connect simply by typing:
```bash
ssh prod-server
```

---

## 2.6 Official Linux Documentation & Manuals

For the official reference documentation and standards:
*   **GNU Coreutils Manual:** [GNU Coreutils Documentation](https://www.gnu.org/software/coreutils/manual/) - The definitive reference guide for basic file, shell, and text utilities.
*   **Linux Man Pages:** [The Linux Kernel Man-pages](https://man7.org/linux/man-pages/) - Complete online system manual for all CLI utilities and kernel operations.
*   **OpenSSH Manuals:** [OpenSSH Documentation](https://www.openssh.com/manual.html) - Official specification manuals for the SSH client, SSH server, and configuration files.
