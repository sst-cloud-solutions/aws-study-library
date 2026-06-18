---
sidebar_position: 1
sidebar_label: "Overview & Action Plan"
---

# Phase 0: Foundation Bridge Overview

The biggest mistake beginners make is trying to learn AWS services before understanding the basic computing concepts those services are built on. Learning AWS without fundamentals is like trying to become a pilot before learning how an engine works. Understanding the fundamentals first lets you speak the language AWS speaks.

This **Foundation Bridge Syllabus** is designed to build enough IT knowledge that AWS documentation, courses, and certifications start making sense.

---

## 🏗️ The Three Pillars of Infrastructure: Compute, Storage, & Network

Every IT system—whether a physical desktop, an enterprise server in a local datacenter, or a virtual machine in the public cloud (like AWS)—is built upon three fundamental resource pillars. Understanding how these pillars work physically is the key to understanding how they behave when virtualized:

```text
       [Compute (The Brain)] ◄─── Processes instructions and logic
                 │
                 ▼
       [Storage (The Memory)] ◄── Keeps data persistently
                 │
                 ▼
       [Network (The Communicator)] ◄── Routes data between hosts
```

1.  **Compute (The Processing Engine):** 
    *   **What it represents:** The CPU and RAM. It executes application code instructions, performs mathematical and logical operations, and schedules active tasks.
    *   **Cloud Equivalent:** Virtual CPUs (vCPUs) on EC2 instances, containers, or serverless execution runs (Lambda).
2.  **Storage (The Persistence Layer):**
    *   **What it represents:** Solid State Drives (SSDs), Hard Disk Drives (HDDs), network file shares, and database storage systems. It preserves raw data, software code, operating systems, and logs even when power is turned off (non-volatile memory).
    *   **Cloud Equivalent:** Elastic Block Store (EBS) volumes, Amazon EFS shares, and Amazon S3 object stores.
3.  **Network (The Transport System):**
    *   **What it represents:** Physical network adapters (NICs), copper/fiber optic cables, switches, routers, IP addresses, and routing tables. It acts as the pipeline that allows compute resources to request or send data to other systems and users.
    *   **Cloud Equivalent:** Virtual Private Clouds (VPCs), subnets, route tables, and security groups.

---

## 📅 3-Week Action Plan

### 🚀 Week 1: Computers, Linux, & Networking
*   **Days 1–2: Computer Fundamentals:** Input-Process-Output flow, hardware vs. software, operating systems, files, memory vs. storage.
*   **Days 3–4: Linux Basics:** Terminal navigation, paths, file operations, users and permissions.
*   **Days 5–7: Networking:** IP addressing (public/private/static/dynamic), DNS, Ports, HTTP/HTTPS, firewalls, and encryption basics.
*   **Outcome:** You should be able to connect to a Linux machine and understand how devices communicate.

---

### 💻 Week 2: Programming, Databases, & Web Apps
*   **Days 8–10: Python Fundamentals:** Variables, data types, functions, and control loops.
*   **Days 11–12: APIs & JSON:** Request-Response lifecycles, headers, status codes, and JSON serialization.
*   **Days 13–14: SQL & Databases:** Relational tables, rows, columns, entity relationships, basic SQL commands, and Relational vs. NoSQL comparison.
*   **Outcome:** You should understand how modern applications are built and how data moves through them.

---

### 🛡️ Week 3: Infrastructure, Git, Containers, & Security
*   **Days 15–16: Servers & Virtualization:** Physical vs. virtual servers, hypervisors, and storage types (block, file, object).
*   **Days 17–18: Git & GitHub:** Code repositories, commits, branching, merging, and pull requests.
*   **Days 19–20: Docker & Containers:** Dockerfiles, container images, running containers, and registry distribution.
*   **Day 21: Security Fundamentals:** Authentication vs. Authorization, encryption keys, and the Principle of Least Privilege.
*   **Outcome:** You should fully understand the terminology used in AWS documentation and be ready to begin hands-on AWS learning.

---

## 🎯 Verification Checklist: Ready for AWS?
Before moving on to Phase 1 (AWS Core Services), make sure you can comfortably explain these concepts:

- [ ] What a server actually is
- [ ] What Linux is and why servers prefer it over Windows
- [ ] What an IP address is (and the difference between Public and Private IPs)
- [ ] What DNS does when you navigate to a website
- [ ] What HTTP/HTTPS request-response cycles represent
- [ ] How APIs work and what JSON is
- [ ] What a database is (and when to use SQL vs. NoSQL)
- [ ] Basic Python programming constructs
- [ ] Git version control commands
- [ ] What Docker containers do and how they compare to VMs
- [ ] The difference between Authentication and Authorization

---

## Prerequisites

- [Beginner Study Roadmap](beginner-roadmap.md)

## Recommended Next Topics

- [Module 1: How Computers Actually Work](1-how-computers-work.md)

## Related Topics

- [Beginner Study Roadmap](beginner-roadmap.md)
- [Module 1: How Computers Actually Work](1-how-computers-work.md)
- [Module 1: Linux Fundamentals](2-linux-fundamentals.md)
