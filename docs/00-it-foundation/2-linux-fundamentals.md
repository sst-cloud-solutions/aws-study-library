---
sidebar_position: 3
sidebar_label: "Module 2: Linux Fundamentals"
---

# Module 1: Linux Fundamentals

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

- **`/` (Root):** The parent directory of the entire filesystem hierarchy.
- **`/bin` & `/sbin`:** Contains essential command binaries needed for system booting and single-user recovery (e.g. `ls`, `cp`, `ip`, `reboot`). `/sbin` holds administrative system binaries.
- **`/etc`:** The central directory for system configurations. Contains files like hostnames, network configurations, database settings, and script paths.
- **`/home`:** Contains private user directories (e.g., `/home/ubuntu`, `/home/alice`). The current user's home directory is shortcut-referenced by `~`.
- **`/var`:** Variable data directory. Used for files that change dynamically, such as system logs (`/var/log/syslog`), databases, and mail queues.
- **`/tmp`:** Temporary file storage. Any user can read/write here. Files here are usually cleared on system reboots.
- **`/usr` & `/usr/local`:** User-installed programs and libraries. `/usr/local` is designated for software installed manually by the administrator to prevent conflicts with system updates.
- **`/opt`:** Directory reserved for third-party, add-on software packages.

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

- **`pwd` (Print Working Directory):** Outputs the absolute path of the directory you are currently in.
- **`cd [directory]` (Change Directory):**
  - `cd /var/log` (Navigate to an absolute path)
  - `cd ../configs` (Navigate to a relative path relative to your current location)
  - `cd ~` or `cd` (Navigate to your home folder)
  - `cd -` (Jump back to the previous directory you were in)
- **`ls [options] [path]` (List Directory Contents):**
  - `-l` (Long format: displays file type, permissions, link count, owner, group, file size, and timestamp).
  - `-a` (Lists all files, including hidden files starting with a `.`).
  - `-h` (Human-readable sizes: formats bytes into KB, MB, GB).
  - `-t` (Sorts files by modification time, newest first).
  - `-S` (Sorts files by size).
  - _Usage example:_ `ls -lahS /var/log`

### 2.3.2 File and Directory Operations

- **`mkdir [options] <directory_name>` (Make Directory):**
  - `-p` (Creates parent directories recursively if they do not exist).
  - _Usage:_ `mkdir -p /home/ubuntu/projects/scripts`
- **`touch <file_name>`:** Creates an empty file or updates the access timestamp of an existing file.
- **`cp [options] <source> <destination>` (Copy File):**
  - `-r` (Recursively copy entire directories and their contents).
  - _Usage:_ `cp -r /etc/nginx /etc/nginx_backup`
- **`mv <source> <destination>` (Move / Rename):** Moves a file to a new path or renames it.
- **`rm [options] <target>` (Remove / Delete):**
  - `-r` (Recursive delete for folders).
  - `-f` (Force delete: overrides write-protect warnings and ignores non-existent targets).
  - _Usage:_ `rm -rf /tmp/old-assets` (Use with extreme caution!).
- **`ln -s <target> <link_name>` (Symbolic Link):** Creates a virtual reference (shortcut) pointing to a physical file or directory.

### 2.3.3 Viewing & Editing Text Files

- **`cat <file>`:** Outputs the entire text contents of a file to the terminal screen.
- **`less <file>`:** Opens the file in a scrollable, memory-efficient terminal viewer.
  - Press `G` to jump to the end of the file.
  - Press `g` to jump to the beginning of the file.
  - Type `/pattern` and press Enter to search forward. Press `n` for next match, `N` for previous match.
  - Press `q` to exit.
- **`head -n <lines> <file>`:** Prints the first $N$ lines of a file.
- **`tail -n <lines> <file>`:** Prints the last $N$ lines of a file.
  - `-f` (Follow mode: keeps the connection open and streams new content to the console as it is written).
  - _Usage:_ `tail -f /var/log/nginx/error.log` (Essential for real-time debugging).

### 2.3.4 Searching and Finding

- **`grep [options] <pattern> [file/directory]`:** Searches for text strings.
  - `-r` (Recursive search through subdirectories).
  - `-n` (Prints matching line numbers).
  - `-i` (Case-insensitive search).
  - _Usage:_ `grep -rni "connection timeout" /var/log/`
- **`find <path> -type <f/d> -name <pattern>`:** Locates files (`-type f`) or directories (`-type d`) matching a name pattern.
  - _Usage:_ `find /etc -type f -name "*.conf"`

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

- **File Type Indicator:** The very first character determines what the item is:
  - `-` (Regular file)
  - `d` (Directory / folder)
  - `l` (Symbolic link / shortcut)
- **Permission Triplets:** The next 9 characters are grouped into three sets of three:
  1.  **Owner (User) Permissions:** The permissions for the individual owner of the file.
  2.  **Group Permissions:** The permissions for any user who is a member of the owning group.
  3.  **Others Permissions:** The permissions for everyone else on the system.

### 2.4.2 Permission Meanings

- **Read (r):** View file contents or list folder files. Represented mathematically as **4**.
- **Write (w):** Modify file contents or create/delete files inside a folder. Represented mathematically as **2**.
- **Execute (x):** Run a file as an executable program, or enter/traverse a directory path. Represented mathematically as **1**.

### 2.4.3 Octal Permissions Math

By adding the values of the permissions in each block, you get a 3-digit octal permission configuration:

| Octal Value   | Permissions String | Access Level                |
| :------------ | :----------------- | :-------------------------- |
| **7 (4+2+1)** | `rwx`              | Read, Write, and Execute    |
| **6 (4+2)**   | `rw-`              | Read and Write (No Execute) |
| **5 (4+1)**   | `r-x`              | Read and Execute (No Write) |
| **4**         | `r--`              | Read Only                   |
| **0**         | `---`              | No permissions              |

### 2.4.4 Ownership Commands

- **`chmod [permissions] <file>` (Change Mode):**
  - _Octal configuration:_ `chmod 755 script.sh` (Owner can read/write/execute; group/others can read/execute).
  - _Symbolic configuration:_ `chmod u+x script.sh` (Add execution rights specifically for the owner user).
  - _Security strict configuration:_ `chmod 400 key.pem` (Only the owner can read; group and others have zero access).
- **`chown <owner>:<group> <file>` (Change Owner):**
  - _Usage:_ `sudo chown nginx:web-admins index.html`

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

- **Log in to Remote Server:**
  - `ssh -i <path_to_private_key> <username>@<server_ip_address>`
  - _Usage:_ `ssh -i ~/.ssh/prod_key.pem ubuntu@54.210.8.2`
- **Generate SSH Keypair:**
  - `ssh-keygen -t ed25519 -C "admin@company.com"`
- **Copy Public Key to Server:**
  - `ssh-copy-id -i ~/.ssh/id_ed25519.pub ubuntu@54.210.8.2`

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

### 2.5.4 Secure Remote File Transfer

While SSH is used for interactive shell sessions, cloud administrators frequently need to copy files (such as logs, source code bundles, or backup databases) securely between their local machines and remote servers:

- **`scp` (Secure Copy Protocol):** A simple CLI tool that uses SSH authentication and encryption to copy files.
  - _Copy local file to remote server:_ `scp -i ~/.ssh/prod_key.pem ./local_config.json ubuntu@54.210.8.2:/home/ubuntu/configs/`
  - _Copy remote file to local machine:_ `scp -i ~/.ssh/prod_key.pem ubuntu@54.210.8.2:/var/log/nginx/access.log ./local_logs/`
- **`rsync` (Remote Synchronization):** A highly efficient utility that synchronizes files and directories between two locations. Unlike `scp`, `rsync` uses a delta-transfer algorithm, copying only the differences (changed blocks) between the source and destination files.
  - _Options:_ `-a` (archive mode: preserves timestamps, symlinks, and permissions), `-v` (verbose), `-z` (compress data during transfer).
  - _Usage:_ `rsync -avz -e "ssh -i ~/.ssh/prod_key.pem" ./local_assets/ ubuntu@54.210.8.2:/var/www/html/`

---

## 2.6 Advanced CLI Administration, Networking, & Troubleshooting Tools

To maintain, troubleshoot, and optimize production servers, an engineer must command the internal OS subsystems using standard CLI tools:

### 2.6.1 Service Management (`systemd` & `journalctl`)

Modern Linux distributions (like Ubuntu, CentOS, and Debian) use **`systemd`** as their initialization system and service manager (PID 1).

- **`systemctl`:** The primary tool for controlling the state of services (daemons).
  - `sudo systemctl start nginx` (Start a service)
  - `sudo systemctl stop nginx` (Stop a service)
  - `sudo systemctl restart nginx` (Gracefully restart a service)
  - `sudo systemctl status nginx` (Inspect a service's current execution state, process ID, and recent stdout)
  - `sudo systemctl enable nginx` (Configure the service to start automatically during system boot)
  - `sudo systemctl disable nginx` (Prevent the service from starting at boot)
- **Unit Files:** Systemd configuration files (typically ending in `.service` under `/etc/systemd/system/`) that define how a service is executed, its dependencies, and its restart behavior (e.g., `Restart=on-failure`).
- **`journalctl`:** The centralized service log query utility. It reads binary log data managed by systemd's logging daemon (`systemd-journald`).
  - `journalctl -u nginx.service` (Show logs specifically for the Nginx service)
  - `journalctl -f` (Follow new logs in real-time)
  - `journalctl -u nginx.service --since "1 hour ago"` (Filter nginx logs from the last hour)

### 2.6.2 Scheduling Automations (`cron`)

For running recurring administrative tasks (like hourly database backups, daily log cleanup, or weekly server health checks), Linux uses the **`cron`** daemon.

- **`crontab`:** The configuration file containing cron instructions.
  - `crontab -l` (List current user's scheduled cron tasks)
  - `crontab -e` (Open the crontab configuration file in a text editor)
- **Cron Syntax:** Cron jobs are configured using five time fields followed by the path to the command:
  ```text
  ┌───────────── minute (0 - 59)
  │ ┌─────────── hour (0 - 23)
  │ │ ┌───────── day of month (1 - 31)
  │ │ │ ┌─────── month (1 - 12)
  │ │ │ │ ┌───── day of week (0 - 6) (Sunday to Saturday)
  │ │ │ │ │
  * * * * *  /path/to/script.sh
  ```

  - _Example (Backup script runs every day at 3:00 AM):_ `0 3 * * * /usr/local/bin/backup.sh`
  - _Example (Cleanup script runs every Sunday at midnight):_ `0 0 * * 0 /usr/local/bin/cleanup.sh`

### 2.6.3 System Monitoring & Resource Auditing

When an application slows down or crashes, you must inspect the hardware resource allocation on the server:

- **`top`:** The default interactive process viewer. It displays real-time CPU usage, RAM utilization, swap usage, load average, and a list of running processes sorted by resource consumption.
- **`htop`:** A modern, color-coded, user-friendly extension of `top` featuring visual bars for CPU cores, interactive sorting, and process tree hierarchies.
- **`free -h`:** Displays the amount of free and used physical memory (RAM) and swap space in the system in human-readable formats (GB/MB).
- **`vmstat [interval]`:** Outputs virtual memory statistics, showing process count, CPU waits (`wa`), context switching counts (`cs`), and disk I/O blocks.
  - _Usage:_ `vmstat 2` (Refreshes metrics every 2 seconds).

### 2.6.4 Network Diagnostics

To troubleshoot network connection timeouts, closed ports, or DNS resolution failures on a host:

- **`netstat` / `ss`:** Displays active TCP/UDP network connections, routing tables, and interface statistics. The modern `ss` command is much faster than the legacy `netstat`.
  - _Usage:_ `ss -tulpn` (List all listening sockets with their port numbers and process IDs: `t` = TCP, `u` = UDP, `l` = listening, `p` = process name, `n` = numeric ports).
- **`traceroute <destination>`:** Identifies the path packets take to reach a destination host, listing each intermediate router hop and the latency (round trip time) for each hop. Useful for locating routing loops or network drops.
- **`dig <domain>` & `nslookup <domain>`:** Queries DNS servers to resolve hostnames to IP addresses. `dig` is the standard tool, outputting complete DNS query responses (A records, MX records, TTLs, and authoritative name servers).
  - _Usage:_ `dig +short google.com` (Returns just the resolved IPv4 address).

### 2.6.5 Text Processing Pipelines (`awk` & `sed`)

When parsing massive configuration files or log files, plain `grep` is often enhanced with stream editors:

- **`sed` (Stream Editor):** Performs basic text transformations and replacements on an input stream.
  - _Usage (Find and replace 'development' with 'production' in a file):_ `sed -i 's/development/production/g' config.json`
- **`awk`:** A powerful pattern scanning and processing language. It treats lines as rows and columns (separated by whitespace by default).
  - _Usage (Filter and print only the IP addresses [column 1] and HTTP status [column 9] from an Nginx access log):_ `awk '{print $1, $9}' /var/log/nginx/access.log`

### 2.6.6 Archiving & Compression

To bundle and compress multiple files to save disk space or speed up network transfers:

- **`tar` (Tape Archive):** Combines multiple files or folders into a single archive file (often called a tarball).
  - _Create archive:_ `tar -cvf backup.tar /var/www/html`
  - _Extract archive:_ `tar -xvf backup.tar`
- **Compression (`gzip` & `unzip`):**
  - _Compress tarball:_ `gzip backup.tar` (Produces `backup.tar.gz`).
  - _Create and compress in one command:_ `tar -czvf backup.tar.gz /var/www/html` (`-z` filters through gzip).
  - _Extract compressed tarball:_ `tar -xzvf backup.tar.gz`

### 2.6.7 Security Key & Certificate Management (`openssl`)

Before deploying an HTTPS web server, administrators use the **`openssl`** CLI tool to generate, manage, and inspect SSL/TLS certificates and cryptographic keys:

- **Verify SSL/TLS Connection:**
  - `openssl s_client -connect google.com:443` (Initiates a TLS handshake and prints the complete certificate chain, active cipher, and validation parameters).
- **Inspect Certificate Properties (Expiration & Issuer):**
  - `openssl x509 -in cert.pem -text -noout` (Parses local certificate files to inspect expiration dates, public keys, and subject alternative names).

---

## 2.7 Official Linux Documentation & Manuals

For the official reference documentation and standards:

- **GNU Coreutils Manual:** [GNU Coreutils Documentation](https://www.gnu.org/software/coreutils/manual/) - The definitive reference guide for basic file, shell, and text utilities.
- **Linux Man Pages:** [The Linux Kernel Man-pages](https://man7.org/linux/man-pages/) - Complete online system manual for all CLI utilities and kernel operations.
- **OpenSSH Manuals:** [OpenSSH Documentation](https://www.openssh.com/manual.html) - Official specification manuals for the SSH client, SSH server, and configuration files.

---

## Prerequisites

- [Module 1: How Computers Actually Work](1-how-computers-work.md)

## Recommended Next Topics

- [Module 1: Networking Fundamentals](3-networking-fundamentals.md)

## Related Topics

- [Beginner Study Roadmap](beginner-roadmap.md)
- [Phase 0: Foundation Bridge Overview](0-intro.md)
- [Module 1: How Computers Actually Work](1-how-computers-work.md)
