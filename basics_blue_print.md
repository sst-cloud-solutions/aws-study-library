Since your end goal is **AWS Certified Developer Associate → eventually AWS Professional-level certifications**, I would not start with AWS immediately.

The biggest mistake beginners make is trying to learn AWS services before understanding the basic computing concepts those services are built on.

Think of it like this:

- Learning AWS without fundamentals = trying to become a pilot before learning how an engine works.
- Learning the fundamentals first = understanding the language AWS speaks.

---

# Phase 0: Foundation Bridge Syllabus

**Objective:** Build enough IT knowledge that AWS documentation, courses, and certifications start making sense.

---

# Module 1: How Computers Actually Work

Before cloud, you must understand the machine.

## 1.1 What is a Computer?

### Sub Topics

- Input → Process → Output
- Hardware vs Software
- Operating System
- Applications
- Files and Folders
- Memory vs Storage
- CPU
- RAM
- Hard Disk / SSD

### What you should understand

By the end, you should be able to explain:

> "When I open Chrome and watch YouTube, what exactly happens inside my computer?"

---

## 1.2 Binary Basics

### Sub Topics

- What is data?
- Bits
- Bytes
- KB, MB, GB, TB
- Why computers use 0 and 1

### Goal

Understand why:

- 8 GB RAM means something
- 500 GB SSD means something
- AWS storage pricing is measured in GB/TB

---

## 1.3 Operating Systems

### Sub Topics

- What is an OS?
- Windows
- Linux
- macOS
- Kernel
- GUI
- CLI

### Practical

Learn:

- Create folders
- Copy files
- Delete files
- Search files

Using both:

- Windows Explorer
- Command Line

---

# Module 2: Linux Fundamentals

AWS runs heavily on Linux.

If you skip Linux, AWS becomes painful.

---

## 2.1 Linux Basics

### Sub Topics

- What Linux is
- How Linux works
- Linux distributions
- Linux CLI vs GUI
- Ubuntu
- Amazon Linux
- Why servers use Linux, why not windows servers

---

## 2.2 Linux File System

### Sub Topics

- Root directory
- Home directory
- Paths
- Relative paths
- Absolute paths

---

## 2.3 Essential Commands

### Sub Topics

- pwd
- ls
- cd
- mkdir
- rm
- cp
- mv
- cat
- nano
- grep
- find

### Goal

Navigate Linux confidently.

---

## 2.4 Users and Permissions

### Sub Topics

- Users
- Groups
- Root user
- Read permission
- Write permission
- Execute permission

### Commands

- chmod
- chown
- sudo

### Why Important?

AWS servers use these daily.

---

# Module 3: Networking Fundamentals

This is the MOST important module for AWS.

Many AWS learners fail because networking feels mysterious.

---

## 3.1 What is a Network?

### Sub Topics

- Device
- Network
- Internet
- Router
- Switch
- Modem
- network OSI model
- TCP/IP model

---

## 3.2 IP Addressing

### Sub Topics

- What is an IP address?
- Public IP
- Private IP
- IPv4
- IPv6
- Static IP
- Dynamic IP

---

## 3.3 DNS

### Sub Topics

- Why names exist
- Domain names
- DNS lookup process

Example:

```
google.com
↓
DNS
↓
IP Address
↓
Google Server
```

---

## 3.4 Ports

### Sub Topics

- What is a port?
- Why one IP can run many services
- All port needed for webserver, mailing, db, ftp, etc.

Common Ports:

- 22 (SSH)
- 80 (HTTP)
- 443 (HTTPS)
- 3306 (MySQL)

---

## 3.5 HTTP and HTTPS

### Sub Topics

- Browser request
- Response
- URL
- Headers
- Status codes

Important:

- 200
- 301
- 404
- 500

---

## 3.6 Network Security Basics

### Sub Topics

- Firewall
- Allow rules
- Deny rules
- VPN
- Encryption basics

---

# Module 4: Programming Fundamentals

You do NOT need to become a software engineer first.

You need enough programming knowledge to understand developers.

---

## 4.1 How Programs Work

### Sub Topics

- Variables
- Data Types
- Functions
- Input
- Output

---

## 4.2 Control Flow

### Sub Topics

- if
- else
- switch
- loops

---

## 4.3 Data Structures

### Sub Topics

- Arrays
- Lists
- Objects
- Dictionaries

---

## 4.4 APIs

### Sub Topics

- What is an API?
- Request
- Response
- JSON

Example:

```
Frontend
   ↓
API
   ↓
Database
```

---

## 4.5 Basic Python

### Sub Topics

- Variables
- Functions
- Loops
- Modules
- Reading files

### Why Python?

AWS automation commonly uses Python.

---

# Module 5: Databases

Cloud applications almost always store data.

---

## 5.1 Database Fundamentals

### Sub Topics

- What is a database?
- Tables
- Rows
- Columns

---

## 5.2 SQL Basics

### Sub Topics

- SELECT
- INSERT
- UPDATE
- DELETE

---

## 5.3 Relationships

### Sub Topics

- Primary Key
- Foreign Key
- One-to-One
- One-to-Many
- Many-to-Many

---

## 5.4 Relational vs NoSQL

### Sub Topics

- MySQL
- PostgreSQL
- MongoDB

### Goal

Understand why AWS has:

- RDS
- DynamoDB

---

# Module 6: Web Application Fundamentals

AWS exists largely to run applications.

---

## 6.1 Website vs Web Application

### Sub Topics

- Static websites
- Dynamic websites
- Web Applications ( CSR, SSR & SSG ) & its core frameworks most popular are React, Next.js, Angular, and Vue.js

---

## 6.2 Frontend Basics

### Sub Topics

- HTML
- CSS
- JavaScript

Only conceptual understanding needed.

---

## 6.3 Backend Basics

### Sub Topics

- Server
- APIs
- Business logic

---

## 6.4 Application Flow

### Sub Topics

Understand:

```
User
 ↓
Browser
 ↓
Frontend
 ↓
API
 ↓
Database
```

---

# Module 7: Servers and Infrastructure

Now we're entering AWS territory.

---

## 7.1 What is a Server?

### Sub Topics

- Physical server
- Virtual server
- Cloud server

---

## 7.2 Virtualization

### Sub Topics

- Hypervisor
- Virtual Machine
- Benefits of virtualization

---

## 7.3 Storage

### Sub Topics

- Block storage
- File storage
- Object storage

### AWS Mapping

- EBS
- EFS
- S3

---

## 7.4 Load Balancing

### Sub Topics

- Single server problem
- Traffic distribution
- High availability

---

# Module 8: DevOps Foundations

AWS Developer certifications assume some DevOps understanding.

---

## 8.1 Version Control

### Sub Topics

- Git
- Repository
- Commit
- Branch
- Merge

### Practical

Use:

- GitHub

---

## 8.2 CI/CD

### Sub Topics

- Build
- Test
- Deploy

Understand:

```
Code
 ↓
Git
 ↓
Pipeline
 ↓
Server
```

---

## 8.3 Containers

### Sub Topics

- What problem containers solve
- Image
- Container
- Registry

---

## 8.4 Docker Basics

### Sub Topics

- Docker Image
- Dockerfile
- Docker Container
- Docker Hub

---

# Module 9: Security Foundations

AWS security appears everywhere.

---

## 9.1 Authentication vs Authorization

### Sub Topics

- Login
- Identity
- Permissions

---

## 9.2 Encryption Basics

### Sub Topics

- Encryption
- Decryption
- Keys

---

## 9.3 Principle of Least Privilege

### Sub Topics

- Minimum permissions
- Security risks

---

## 9.4 Secrets Management

### Sub Topics

- Passwords
- API Keys
- Environment Variables

---

# What You Should Know Before Starting AWS

If you can comfortably explain these concepts, you're ready:

✅ What a server is

✅ What Linux is

✅ What an IP address is

✅ What DNS does

✅ What HTTP and HTTPS are

✅ How APIs work

✅ What a database is

✅ Basic SQL

✅ Basic Python

✅ Git basics

✅ What Docker does

✅ Authentication vs Authorization

---

# 3-Week Bridge Action Plan

## Week 1 — Computer + Linux + Networking

### Days 1-2

- Computer fundamentals
- Hardware vs software
- Operating systems
- Files and folders

### Days 3-4

- Linux basics
- Terminal navigation
- Linux permissions

### Days 5-7

- Networking
- IP addresses
- DNS
- Ports
- HTTP/HTTPS

**Outcome:** You should be able to connect to a Linux machine and understand how devices communicate.

---

## Week 2 — Programming + Databases + Web Apps

### Days 8-10

- Python fundamentals
- Variables
- Functions
- Loops

### Days 11-12

- APIs
- JSON
- Requests and responses

### Days 13-14

- SQL
- Databases
- Tables
- Relationships

**Outcome:** You should understand how applications are built and how data moves through them.

---

## Week 3 — Infrastructure + Git + Docker + Security

### Days 15-16

- Servers
- Virtual Machines
- Storage types

### Days 17-18

- Git
- GitHub
- Branching

### Days 19-20

- Docker fundamentals
- Build and run containers

### Day 21

- Security fundamentals
- Review everything

**Outcome:** You should understand the language used in AWS documentation and be ready to begin AWS learning.

---

### After the Bridge

The recommended path is:

1. AWS Certified Developer – Associate
2. AWS services hands-on (Lambda, API Gateway, S3, DynamoDB, ECS, EC2, IAM, CloudWatch)
3. CI/CD on AWS
4. Containers and serverless architectures
5. AWS Professional-level certification based on your career direction

For someone targeting AWS Developer certifications, mastering **Linux, Networking, Git, Python, APIs, Databases, Docker, and Security Fundamentals** will provide roughly **80% of the foundation needed before AWS itself starts feeling intuitive instead of overwhelming.**
