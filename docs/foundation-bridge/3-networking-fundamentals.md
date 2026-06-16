---
sidebar_position: 4
sidebar_label: "Module 3: Networking Fundamentals"
---

# Module 3: Networking Fundamentals

Networking enables isolated computing systems to communicate, share state, and exchange data. This guide covers layered communication models, IP subnetting math, DNS resolution pathways, protocol mechanics (TCP/UDP), and the complete HTTP/HTTPS request-response lifecycle.

---

## 3.1 Network Communication Models

Computers communicate using standard layered protocols. The industry maps these protocols using the **OSI Model** and the **TCP/IP Model**.

```
    OSI 7-Layer Model                     TCP/IP 4-Layer Model
  ┌─────────────────────────┐           ┌─────────────────────────┐
  │ 7. Application (HTTP)   │           │                         │
  ├─────────────────────────┤ ────────> │ 4. Application (HTTP)   │
  │ 6. Presentation (SSL)   │           │                         │
  ├─────────────────────────┤           ├─────────────────────────┤
  │ 5. Session (NetBIOS)    │           │ 3. Transport (TCP)      │
  ├─────────────────────────┤ ────────> ├─────────────────────────┤
  │ 4. Transport (TCP)      │           │ 2. Internet (IP)        │
  ├─────────────────────────┤ ────────> ├─────────────────────────┤
  │ 3. Network (IP)         │           │                         │
  ├─────────────────────────┤ ────────> │ 1. Network Access       │
  │ 2. Data Link (Ethernet) │           │    (Ethernet/Wi-Fi)     │
  ├─────────────────────────┤           └─────────────────────────┘
  │ 1. Physical (Cables)    │
  └─────────────────────────┘
```

*   **Application Layer:** Where software applications interact with the network (e.g. HTTP, SSH, FTP, DNS).
*   **Presentation Layer:** Translates data formatting, encryption, and compression (e.g. SSL/TLS, JSON/XML conversion).
*   **Session Layer:** Manages connections and conversations between remote applications.
*   **Transport Layer:** Ensures reliable, end-to-end data delivery (e.g. TCP, UDP) using port addressing.
*   **Network Layer:** Routes packets across different physical networks using logical IP addresses.
*   **Data Link Layer:** Handles node-to-node frame transfer within the same physical network using physical MAC addresses.
*   **Physical Layer:** Sends and receives raw bitstreams over a physical medium (copper cables, fiber optics, radio waves).

### 3.1.1.1 Deep Dive: The Network Pillar Mechanics

Networking is not just about connecting cables; it is a system of layered data translation and dynamic routing:

*   **Packet Encapsulation & Decapsulation:** When your application sends data (e.g. an HTTP request), it travels down the OSI model, with each layer prepending its own control header. This process is called **Encapsulation**:
    1.  **Application Layer:** Generates raw application data (e.g. JSON string).
    2.  **Transport Layer:** Encapsulates the data into a **Segment**, adding source and destination ports (e.g., port 443).
    3.  **Network Layer:** Encapsulates the segment into a **Packet**, adding source and destination IP addresses.
    4.  **Data Link Layer:** Encapsulates the packet into a **Frame**, adding source and destination MAC addresses.
    5.  **Physical Layer:** Converts the frame into binary electrical or optical signals to be sent over physical cables.
    *   At the destination host, the process is reversed (**Decapsulation**), stripping away headers layer-by-layer up to the application.
*   **Physical Transport Media:** 
    *   **Copper Cables (Twisted Pair / Ethernet):** Uses electrical current pulses. Cat 6 cables are typically limited to 100 meters due to electrical signal degradation (attenuation).
    *   **Fiber Optic Cables:** Uses pulses of light sent through glass fibers. *Single-mode fiber* uses a single light path and can span tens of kilometers (used for wide-area backbones and connecting datacenters), while *multi-mode fiber* uses multiple light angles and is cheaper but limited to shorter server-rack runs.
    *   **Network Interface Card (NIC):** The hardware interface on a computer that handles the transmission and receipt of frames.
*   **Routing Decisions & Routing Tables:** A router does not know the full path to a destination. Instead, it reads a packet's destination IP, checks its local **Routing Table**, matches the IP prefix against the entries, and forwards the packet to the next router (the "next hop"). A standard routing table entry contains:
    *   *Destination Subnet (CIDR):* e.g., `10.1.0.0/16`
    *   *Interface:* e.g., `eth0`
    *   *Gateway (Next Hop):* e.g., `192.168.1.1`
*   **Core Performance Metrics:**
    *   **Bandwidth:** The maximum theoretical carrying capacity of a link (e.g., 10 Gbps).
    *   **Throughput:** The actual rate of successful data delivery over a link in real-world conditions.
    *   **Latency (RTT):** The time delay for a packet to travel from source to destination and return (Round Trip Time, measured in milliseconds).
    *   **Jitter:** The variation in arrival latency of packets. High jitter degrades real-time streams (like VoIP).
    *   **Packet Loss:** The percentage of packets sent that fail to arrive, requiring TCP to retransmit them.

### 3.1.2 Hardware Subsystems (Modem vs. Router vs. Switch)
To move data packets across physical systems, networks use dedicated hardware components:
*   **Modem (Modulator-Demodulator):** Connects your local environment to the external internet service provider (ISP). It translates analog signals (like light frequencies in fiber optic cables or waves in coaxial cables) into digital binary signals that computer systems understand.
*   **Router:** Directs (routes) data packets between different networks (e.g., between your local private home network and the public internet). Routers operate at **OSI Layer 3 (Network)** and make routing decisions using IP addresses.
*   **Switch:** Connects multiple devices together within the *same* physical local network (LAN). Switches operate at **OSI Layer 2 (Data Link)** and route traffic locally using hardcoded MAC (Media Access Control) addresses, sending data directly to the target port rather than broadcasting it to all devices.

---

## 3.2 IP Addressing & CIDR Subnetting Math

An IP (Internet Protocol) Address is a unique identifier assigned to a network interface.

### 3.2.1 IPv4 Addressing
IPv4 addresses are 32-bit numbers represented in dot-decimal format: four decimal numbers (octets) separated by dots (e.g. `192.168.1.50`). Each octet has 8 bits, spanning from `0` to `255`.

### 3.2.2 Private IP Ranges (RFC 1918)
To conserve public IPv4 addresses, the IETF set aside three private ranges for internal local networks. These addresses cannot route directly on the public internet:
*   **Class A:** `10.0.0.0` to `10.255.255.255` (`10.0.0.0/8` subnet) - 16.7 million addresses.
*   **Class B:** `172.16.0.0` to `172.31.255.255` (`172.16.0.0/12` subnet) - 1.04 million addresses.
*   **Class C:** `192.168.0.0` to `192.168.255.255` (`192.168.0.0/16` subnet) - 65,536 addresses.

### 3.2.3 Classless Inter-Domain Routing (CIDR)
CIDR notation specifies the network prefix size using a slash followed by the number of bits locked for the network path. The remaining bits are left free for host allocations.

*   **Subnet Calculation Example (`192.168.1.0/24`):**
    *   A `/24` prefix locks the first 24 bits (the first three octets: `192.168.1`).
    *   The remaining 8 bits ($32 - 24$) are left for host IPs.
    *   Total IPs available: $2^8 = 256$ addresses (`192.168.1.0` through `192.168.1.255`).
    *   **Network Address:** `192.168.1.0` (Identifies the network).
    *   **Broadcast Address:** `192.168.1.255` (Data sent here goes to all hosts on the subnet).
    *   **Usable host range:** `192.168.1.1` to `192.168.1.254` (254 total addresses).
*   **Subnet Calculation Example (`10.0.0.0/16`):**
    *   Locks first 16 bits (`10.0`).
    *   Remaining bits: 16. Total IPs: $2^{16} = 65,536$.
    *   Usable range: `10.0.0.1` to `10.0.255.254`.

### 3.2.4 Network Address Translation (NAT)
A NAT-enabled router allows multiple private devices inside a local area network (LAN) to share a single public IP address.
*   **Source NAT (SNAT):** Rewrites the private source IP of outgoing requests to the router's public IP, tracking connections using source ports.
*   **Destination NAT (DNAT):** Rewrites the incoming destination IP/port of a request to route public traffic to a specific server inside the private network.

---

## 3.3 The Domain Name System (DNS)

DNS is the decentralized directory database that resolves human-readable domain names (like `example.com`) to machine-readable IP addresses (like `93.184.216.34`).

```
 [Client Browser] ──(1. Ask: example.com)──> [Recursive DNS Resolver]
                                                    │
     ┌───────────────────┬──────────────────────────┼─────────────────────────┐
     ▼ (2)               ▼ (4)                      ▼ (6)                     ▼ (8)
[Root Server]       [TLD Server (.com)]     [Authoritative Name Server]  [Cached Answer]
(Returns .com TLD)  (Returns Auth Name)     (Returns 93.184.216.34 A)    (Returns IP from cache)
```

### 3.3.1 The DNS Resolution Pipeline
1.  **Recursive Resolver:** Typically managed by your ISP or public DNS operators (like `1.1.1.1` or `8.8.8.8`). If the answer is in its cache, it returns it instantly. Otherwise, it executes a recursive query hierarchy.
2.  **Root Name Servers (`.`):** Directs the resolver to the Top-Level Domain (TLD) server handling the root suffix (e.g. `.com`, `.net`).
3.  **TLD Name Servers:** Directs the resolver to the specific Authoritative Name Server registered for that domain.
4.  **Authoritative Name Server:** The final source of truth containing the actual zone files. Returns the IP address record.

### 3.3.2 Common DNS Record Types
*   **A Record:** Maps a domain name to an **IPv4** address.
*   **AAAA Record:** Maps a domain name to an **IPv6** address.
*   **CNAME (Canonical Name):** Maps a domain name to another domain name (alias).
*   **MX Record (Mail Exchanger):** Specifies mail servers for routing emails.
*   **TXT Record:** Holds descriptive text configurations (often used for domain ownership validation and SPF/DKIM mail security).
*   **NS Record (Name Server):** Identifies the authoritative servers delegated for the zone.

---

## 3.4 Transport Layer Protocols: TCP vs. UDP

The Transport layer runs on top of IP to manage connection states between ports.

### 3.4.1 TCP (Transmission Control Protocol)
*   **Characteristics:** Connection-oriented, reliable, ordered delivery, flow control, and error detection. Used by HTTP/HTTPS, SSH, SMTP, and database connections.
*   **The 3-Way Handshake (Establishment):**
    1.  **SYN:** Client sends a synchronization flag and initial sequence number to the server.
    2.  **SYN-ACK:** Server responds with synchronization and acknowledgment flags, confirming receipt.
    3.  **ACK:** Client sends an acknowledgment flag. The virtual connection is established.
*   **The Connection Teardown:**
    1.  **FIN:** Active party sends a finish packet.
    2.  **ACK:** Receiving party acknowledges.
    3.  **FIN:** Receiving party sends its finish packet.
    4.  **ACK:** Active party acknowledges; connection closes.

### 3.4.2 UDP (User Datagram Protocol)
*   **Characteristics:** Connectionless, unreliable, unordered delivery. Low latency because it has zero handshake overhead. Used for streaming video, online gaming, VoIP, and DNS queries.

---

## 3.5 The HTTP & HTTPS Application Protocol

Web applications and APIs communicate using HTTP (Hypertext Transfer Protocol). HTTPS is HTTP wrapped inside an encrypted SSL/TLS tunnel.

### 3.5.1 URL Anatomy (Uniform Resource Locator)
A URL is the structured address string used to identify a resource on the web. Let's break down its parts:

```text
 https://api.example.com:443/v1/users?status=active&limit=10
 └──┬──┘ └──────┬──────┘ └┬┘ └───┬────┘ └──────────┬────────┘
    │           │         │      │                 └── Query Parameters
    │           │         │      └──────────────────── Path URI
    │           │         └─────────────────────────── Port (Standard for HTTPS)
    │           └───────────────────────────────────── Hostname / Domain Name
    └───────────────────────────────────────────────── Protocol / Scheme
```

*   **Protocol/Scheme:** Instructs the client browser on how to communicate (e.g. `http`, `https`, `ftp`).
*   **Hostname/Domain Name:** The destination server name resolved by DNS (e.g., `api.example.com`).
*   **Port:** The virtual channel connection on the server. If omitted, it defaults to `80` for HTTP and `443` for HTTPS.
*   **Path URI:** The specific folder or file resource path on the web server (e.g., `/v1/users`).
*   **Query Parameters:** Key-value pairs starting with a `?` and separated by `&`, used to filter or customize the request (e.g., `status=active&limit=10`).

### 3.5.2 Anatomy of an HTTP Request (With Raw Text Example)
An HTTP request is simply a plain text message formatted as follows:

```text
POST /v1/users HTTP/1.1
Host: api.example.com
Content-Type: application/json
User-Agent: Chrome/120.0
Content-Length: 48

{"username": "alice", "email": "alice@web.com"}
```

*   **Request Line (Line 1):** Method (`POST`), URI Path (`/v1/users`), and protocol (`HTTP/1.1`).
*   **Request Headers (Lines 2-5):** Metadata configurations. `Content-Type` tells the server the payload format.
*   **Empty Line (Line 6):** Mandatory carriage return separating the metadata headers from the actual payload body.
*   **Request Body (Line 7):** The JSON data payload containing the client inputs.

### 3.5.3 Anatomy of an HTTP Response (With Raw Text Example)
The server processes the request and returns a raw text response:

```text
HTTP/1.1 201 Created
Date: Sat, 13 Jun 2026 14:00:00 GMT
Server: Nginx/1.24.0
Content-Type: application/json
Content-Length: 58

{"status": "success", "userId": 101, "created": true}
```

*   **Status Line (Line 1):** Protocol (`HTTP/1.1`), numeric status code (`201`), and reason phrase (`Created`).
*   **Response Headers (Lines 2-5):** Metadata about the server, response date, and payload format.
*   **Response Body (Line 7):** The JSON data payload returned to the browser.

### 3.5.4 Common HTTP Verbs
*   `GET`: Retrieve resources. Should have no side effects (idempotent).
*   `POST`: Create new resources. Non-idempotent.
*   `PUT`: Replace an existing resource completely. Idempotent.
*   `PATCH`: Apply partial modifications to a resource.
*   `DELETE`: Remove resources.

### 3.5.5 HTTP Status Codes
*   **2xx (Success):** 
    *   `200 OK` (Standard success)
    *   `201 Created` (Resource successfully created)
    *   `204 No Content` (Success with no output payload)
*   **3xx (Redirection):**
    *   `301 Moved Permanently` (Permanently routes request to new URL)
    *   `302 Found` (Temporary redirect)
*   **4xx (Client Error):**
    *   `400 Bad Request` (Invalid syntax/parameters)
    *   `401 Unauthorized` (Authentication required)
    *   `403 Forbidden` (Authenticated but lacks permission)
    *   `404 Not Found` (Resource doesn't exist)
    *   `429 Too Many Requests` (Rate limit exceeded)
*   **5xx (Server Error):**
    *   `500 Internal Server Error` (Generic server application bug)
    *   `502 Bad Gateway` (Gateway server received an invalid response from upstream)
    *   `503 Service Unavailable` (Server overloaded or down for maintenance)
    *   `504 Gateway Timeout` (Upstream application took too long to respond)

### 3.5.6 The HTTPS/TLS Handshake
To protect HTTP from eavesdropping, TLS encrypts the traffic:
1.  **Client Hello:** Client sends supported cipher suites and random values.
2.  **Server Hello:** Server selects cipher suite, sends its public SSL/TLS Certificate.
3.  **Authentication:** Client validates the certificate chain against trusted Root Certificates.
4.  **Key Exchange:** Client and server agree on a temporary symmetric key using asymmetric encryption (Diffie-Hellman). All subsequent traffic is encrypted using this symmetric key.

---

## 3.6 Official Networking Standards & Resources

To read official specifications and detailed manuals:
*   **IETF RFC Database:** [Internet Engineering Task Force RFCs](https://www.ietf.org/) - Read official RFC specifications (e.g., [RFC 1918 - Private IP Allocations](https://tools.ietf.org/html/rfc1918), [RFC 2616 - HTTP/1.1 Specification](https://tools.ietf.org/html/rfc2616)).
*   **MDN Web Docs (HTTP):** [MDN HTTP Hub](https://developer.mozilla.org/en-US/docs/Web/HTTP) - Complete, beginner-friendly guides on HTTP headers, cookies, verbs, and status codes.
*   **Cloudflare Learning Network Center:** [Cloudflare Learning Hub](https://www.cloudflare.com/learning/) - Comprehensive architectural guides explaining DNS, TCP/IP, routing, and TLS handshakes.
