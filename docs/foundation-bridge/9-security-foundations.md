---
sidebar_position: 10
sidebar_label: "Module 9: Security Foundations"
---

# Module 9: Security Foundations

Security must be integrated into every layer of software and systems design. This module covers Authentication vs. Authorization models, symmetric and asymmetric cryptography, hashing math, the Principle of Least Privilege, and secure secrets management.

---

## 9.1 Authentication (AuthN) vs. Authorization (AuthZ)

Although these terms sound similar, they represent distinct security boundaries:

```
                  [ Inbound Connection Request ]
                                │
                                ▼
         [ Authentication (AuthN) - Who are you? ]
         ├── Password / Key Verification
         └── Multi-Factor Authentication (MFA)
                                │
                                ▼ (Identified User)
         [ Authorization (AuthZ) - What can you do? ]
         ├── Role-Based Access Control (RBAC)
         └── Attribute-Based Access Control (ABAC)
```

### 9.1.1 Authentication (AuthN)
Authentication is the process of verifying a user's or service's identity. It answers the question: **"Are you who you claim to be?"**
*   **Credentials:** Passwords, private keys, API tokens.
*   **Multi-Factor Authentication (MFA):** Recommends validating three factors:
    *   *Something you know:* A password or PIN.
    *   *Something you have:* A physical security key, hardware token, or authenticator app.
    *   *Something you are:* Biometrics (fingerprint, facial recognition).
*   **Single Sign-On (SSO) & Federation:** Allows users to authenticate once against a central Identity Provider (IdP) (e.g. Active Directory, Okta) and gain secure access to multiple independent services without re-authenticating. Uses open standards like SAML 2.0 or OpenID Connect (OIDC) built on OAuth 2.0.

### 9.1.2 Authorization (AuthZ)
Authorization is the process of verifying access permissions. It answers the question: **"What actions are you permitted to perform?"**
*   **Role-Based Access Control (RBAC):** Permissions are assigned to logical Roles (e.g. `Developer`, `BillingManager`), and users are assigned to those roles. Easy to manage, but lacks granular control.
*   **Attribute-Based Access Control (ABAC):** Permissions are evaluated dynamically at runtime based on attributes (e.g., user department, resource tag, IP address, current time). Highly granular and flexible.

---

## 9.2 Cryptography and Hashing

Cryptography protects data from interception, tampering, and forgery.

### 9.2.1 Symmetric Encryption
Uses the **same** secret key to encrypt (scramble) and decrypt (unscramble) data.
*   **Characteristics:** Fast, lightweight, and ideal for encrypting large datasets at rest (files, databases).
*   **Standard Algorithm:** AES (Advanced Encryption Standard), specifically AES-256 (using 256-bit key sizes).
*   **Key Exchange Challenge:** Before communicating, both parties must share the symmetric key securely.

### 9.2.2 Asymmetric (Public-Key) Encryption
Uses a mathematically linked key pair:
*   **Public Key:** Shared publicly. Anyone can use it to encrypt data.
*   **Private Key:** Kept secret by the owner. Only this key can decrypt data encrypted by the public key.
*   **Key Algorithms:** RSA, ECC (Elliptic Curve Cryptography).
*   **Use Cases:**
    *   *Symmetric Key Exchange:* Used during the TLS handshake to share a temporary symmetric key securely.
    *   *Digital Signatures (Non-repudiation):* The sender encrypts a hash of a message using their private key. The recipient decrypts it using the sender's public key to verify that the message was sent by the owner and has not been modified.

### 9.2.3 Cryptographic Hashing
A hash function is a one-way mathematical algorithm that takes input data of any size and returns a fixed-length string of characters (the hash).
*   **Characteristics:** One-way (irreversible), deterministic (same input always produces the same output), and collision-resistant (different inputs produce different outputs).
*   **Algorithms:** SHA-256, bcrypt.
*   **Salting Passwords:** To prevent pre-computed dictionary attacks (rainbow tables), developers append a random string (a salt) to the password before hashing it.

---

## 9.3 The Principle of Least Privilege (PoLP)

PoLP states that users, applications, and automated processes must only be granted the **minimum permissions** necessary to perform their specific tasks.

```
       [ Bad Design ] ──────> App has root administrative permissions (High Risk)
       
       [ PoLP Design ] ─────> App can only read from `/var/log/app` folder (Secure)
```

*   **Mitigating Blast Radius:** If a developer's API key is compromised, or an application server is hacked, an attacker's access is restricted to the specific permissions of that account, minimizing potential damage.
*   **Auditing and Traceability:** Restricting permissions makes it easier to trace actions to specific users or processes in security audit logs.

---

## 9.4 Secrets Management Best Practices

Secrets are sensitive credentials like database passwords, API keys, and certificate keys.

### 9.4.1 Never Hardcode Secrets
Writing secrets directly in application code is a major security risk. If code is pushed to a public Git repository, the credentials are exposed.
*   *Solution:* Load secrets dynamically at runtime from environment variables or a dedicated secrets manager.

### 9.4.2 Secrets Rotation
Change database credentials and API keys regularly. Automated rotation reduces the window of opportunity for an attacker to use compromised credentials.

### 9.4.3 Envelope Encryption
A security pattern where data is encrypted with a Data Key, and the Data Key is encrypted with a Master Key. This pattern allows encrypting massive datasets locally without sending them over the network to a central key manager.

---

## 9.5 Official Security References & Resources

To check official security specifications, frameworks, and guidelines:
*   **OWASP Top 10:** [OWASP Top 10 Web Exploit Manual](https://owasp.org/www-project-top-ten/) - The authoritative document detailing the top 10 most critical web application security risks and mitigation guides.
*   **NIST Cybersecurity Framework:** [NIST CSF Guidelines](https://www.nist.gov/cyberframework) - The official security framework standards mapping risk management, asset protection, and access control models.
*   **OpenSSL Cryptography Manuals:** [OpenSSL Project Docs](https://www.openssl.org/docs/) - Official reference guides for crypto algorithms, SSL/TLS protocol execution, and cryptographic keys.
