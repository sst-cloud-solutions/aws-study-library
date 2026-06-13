---
sidebar_position: 7
sidebar_label: "Module 6: Web App Fundamentals"
---

# Module 6: Web Application Fundamentals

Modern applications are distributed systems communicating over HTTP. This module covers monolithic vs. microservices web topologies, frontend web languages, runtime rendering strategies (CSR, SSR, SSG), and the mechanics of web servers and reverse proxies.

---

## 6.1 Monolithic vs. Microservice Architectures

How codebases are organized determines how they scale, fail, and deploy.

### 6.1.1 Monolithic Architecture
A monolith houses all application logic—user authentication, payment processing, database queries, and frontend rendering—inside a single, unified codebase compiled and running as a single process.
*   **Advantages:** Simple to build, test, and deploy initially. Low latency since all code calls are local in memory.
*   **Disadvantages:** Hard to scale individual components (e.g. if payment code needs CPU but user dashboard needs memory, you must scale the entire server). Large codebases lead to longer build times and increase the risk of a single bug crashing the entire application.

### 6.1.2 Microservices Architecture
Microservices break the application down into independent, isolated services, each running its own process and communicating over lightweight protocols (like HTTP REST APIs or gRPC).

```
                      [ Client Browser ]
                              │
            ┌─────────────────┼─────────────────┐ (HTTP Requests)
            ▼                 ▼                 ▼
     [ Auth Service ]  [ Order Service ]  [ Billing Service ]
            │                 │                 │
            ▼                 ▼                 ▼
      [ Auth DB ]        [ Orders DB ]     [ Billing DB ]
```

*   **Advantages:** 
    *   *Scale Isolation:* Scale only the services under heavy load.
    *   *Fault Isolation:* If the billing service crashes, users can still log in and browse products.
    *   *Polyglot Development:* Different services can use different languages and databases.
*   **Disadvantages:** High operational complexity. Introducing network latencies between services requires handling network failures, distributed tracing, and transactional consistency.

---

## 6.2 The Frontend Stack (The House Analogy)

The client-side application runs inside the user's browser. To understand how the three core frontend technologies fit together, think of building a house:
*   **HTML5 is the House Skeleton & Framing:** This defines the structural layout. It puts the walls, door frames, and window slots in place.
*   **CSS3 is the Interior Styling & Paint:** This dictates how the house looks. It applies colors, wallpapers, sets column layouts (Flexbox/Grid), and formats dimensions.
*   **JavaScript is the Infrastructure (Plumbing/Electricity):** This makes the house functional. When you flip a switch, the lights turn on; when you turn a tap, water flows. JS executes active functions (like validating forms, displaying popups, and fetching API data).

### 6.2.1 HTML5 (Structure)
HTML (Hypertext Markup Language) defines the semantic document structure. Modern HTML5 uses descriptive tags (like `<header>`, `<article>`, `<section>`, and `<nav>`) to build accessible Document Object Models (DOM).

### 6.2.2 CSS3 (Presentation)
CSS (Cascading Style Sheets) controls the layout, colors, and typography of the HTML structure.
*   **Flexbox & Grid:** Modern layout engines that allow developers to design fluid, responsive interfaces that adapt dynamically to different screen dimensions.

### 6.2.3 JavaScript (Execution & Concurrency)
JavaScript is a single-threaded, asynchronous programming language that makes web pages interactive.
*   **The Event Loop:** JavaScript executes code sequentially on a call stack. When it hits an asynchronous task (like fetching an API resource or reading a file), it offloads the task to the browser APIs and continues executing. When the async task finishes, its callback enters the Callback Queue and runs when the stack is empty.
*   **Promises & Async/Await:** Modern syntax to write readable asynchronous code:
    ```javascript
    async function getUserProfile(userId) {
        try {
            // Suspends execution until fetch promise resolves
            const response = await fetch(`https://api.com/users/${userId}`);
            if (!response.ok) throw new Error("Network error");
            const data = await response.json();
            console.log("User Profile Loaded:", data);
        } catch (error) {
            console.error("Failed to load user:", error);
        }
    }
    ```

---

## 6.3 Web Application Rendering Strategies (The Restaurant Analogy)

How the browser retrieves and renders HTML and JavaScript impacts performance and search engine optimization. Think of these rendering options as different dining experiences:

### 6.3.1 Client-Side Rendering (CSR)
*   **The Restaurant Analogy:** The server serves you raw ingredients and a recipe (JavaScript bundle) to your table. You (the client browser) cook it yourself at the table.
*   **Process:** The server returns a near-empty HTML file containing a `<script>` tag. The browser downloads the Javascript bundle, executes it, fetches API data, and renders the interface dynamically.
*   *Frameworks:* React (classic SPA), Vue.js, Angular.

### 6.3.2 Server-Side Rendering (SSR)
*   **The Restaurant Analogy:** The restaurant chef cooks the food in the kitchen (Server) on every individual order and serves it hot and ready to eat directly to your table.
*   **Process:** On every page click, the server fetches DB records, compiles the page into an HTML string, and returns it. The browser paints it instantly.
*   *Frameworks:* Next.js, Nuxt.js.

### 6.3.3 Static Site Generation (SSG)
*   **The Restaurant Analogy:** The restaurant pre-cooks all meals in the morning (during the build phase) and puts them on display. When you walk in, they hand you the meal instantly.
*   **Process:** The code is compiled during the deployment build phase, outputting static HTML pages for all routes. The pre-rendered pages are deployed to CDN servers globally.
*   *Frameworks:* Docusaurus, Gatsby, Hugo.

---

## 6.4 Rendering Comparison Matrix

| Strategy | Performance Metrics | SEO Friendliness | Server Compute Costs |
| :--- | :--- | :--- | :--- |
| **CSR (Client-Side Rendering)** | Slow initial load (must download JS bundle); fast subpage transitions. | Poor (crawlers see empty HTML initially). | Zero (assets are static files). |
| **SSR (Server-Side Rendering)** | Fast initial page paint; slower subpage transitions; TTFB dependent on DB. | Excellent (server outputs fully populated HTML). | High (server renders HTML on every click). |
| **SSG (Static Site Generation)** | Fastest load times; near-zero latency; served from CDNs. | Excellent (crawlers see fully populated HTML). | Low (compiled once during build). |

---

## 6.5 Web Servers & Reverse Proxies (Nginx / Apache)

Web servers route incoming HTTP traffic from port 80/443 to target files or application processes.

### 6.5.1 Web Server vs. Application Server
*   **Web Server (Nginx, Apache):** Optimised for serving static files (HTML, CSS, images) and proxying requests. Extremely fast and lightweight.
*   **Application Server (Node.js, Python Gunicorn, Tomcat):** Runs the dynamic application logic, database connections, and business code.

### 6.5.2 Reverse Proxy Configuration
A reverse proxy acts as an intermediary, sitting in front of application servers to protect, load balance, and optimize traffic:

```
 [User Client] ──(HTTPS: 443)──> [Reverse Proxy (Nginx)] ──(HTTP: 3000)──> [Node.js Application]
```

*   **SSL/TLS Termination:** The reverse proxy decrypts incoming HTTPS requests, offloading cryptographic CPU loads, and passes plain HTTP back to the backend application running on localhost.
*   **Static Asset Offloading:** Nginx intercepts requests for static assets (like `/static/logo.png`) and serves them directly from the local disk, bypassing the slower application server.
*   **Example Nginx Reverse Proxy Configuration:**
    ```nginx
    server {
        listen 80;
        server_name example.com;

        # Serve static assets directly
        location /static/ {
            root /var/www/app;
            expires 30d;
        }

        # Proxy all other requests to Node.js backend
        location / {
            proxy_pass http://localhost:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
    ```

---

## 6.6 Official Web Documentation & References

To read official specifications and detailed manuals:
*   **MDN Web Docs:** [MDN Web Technology Hub](https://developer.mozilla.org/) - The industry-standard reference for HTML, CSS, JavaScript, DOM, and Web APIs.
*   **Nginx Documentation:** [Nginx Doc Portal](https://nginx.org/en/docs/) - The official manuals for configuring reverse proxies, HTTP load balancing, and SSL servers.
*   **Apache HTTP Server Project:** [Apache HTTPd Docs](https://httpd.apache.org/docs/) - Official manuals for setting up HTTP servers, module configurations, and directories.
