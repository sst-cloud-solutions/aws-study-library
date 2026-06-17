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

## 9.5 Cryptography, PKI, & Enterprise Authentication Standards

Enterprise security architectures rely on advanced cryptographic signing, centralized identity management, and secure certificate-based client-server trust structures.

### 9.5.1 Advanced Cryptographic Signatures & HMAC
Beyond standard symmetric/asymmetric encryption, cryptographic algorithms guarantee data integrity and sender authenticity:
*   **HMAC (Hash-based Message Authentication Code):** Combines a cryptographic hash function (like SHA-256) with a secret cryptographic key. It is used to simultaneously verify both the data integrity and the authenticity of a message. Only parties with access to the secret key can generate or verify the matching HMAC signature (commonly used in AWS SigV4 request signing).
*   **Digital Signatures:** Assures **non-repudiation** (the sender cannot deny sending the message). The sender hashes the message and encrypts the hash using their **Private Key** (generating a digital signature). The recipient decrypts the signature using the sender's **Public Key** and compares it to a fresh hash of the received message. If they match, it proves the message was unmodified and originated from the private key owner.

### 9.5.2 Public Key Infrastructure (PKI) & Trust Chains
PKI is the framework of roles, policies, hardware, software, and procedures needed to create, manage, distribute, use, store, and revoke digital certificates:
*   **Certificate Authorities (CAs):** Trusted third-party organizations (like Let's Encrypt, DigiCert) that verify identities and issue digital SSL/TLS certificates.
*   **Certificate Chains:** To verify a website's certificate, your browser traces a chain of trust:
    *   *End-Entity Certificate:* The certificate assigned to the specific website (e.g. `google.com`).
    *   *Intermediate Certificate:* Issued by a Root CA to sign end-entity certificates, protecting the root key from direct exposure.
    *   *Root Certificate:* A self-signed certificate belonging to the Root CA, pre-installed in your browser/OS trusted root store.
*   **Certificate Revocation (CRL & OCSP):** If a certificate's private key is compromised before its expiration date, the certificate must be revoked:
    *   **CRL (Certificate Revocation List):** A periodic list of revoked certificate serial numbers published by the CA. Browsers download the CRL to check certificate validity. Highly resource-heavy and slow.
    *   **OCSP (Online Certificate Status Protocol):** A real-time API query where the browser checks the status of a specific certificate directly with the CA's OCSP responder.
    *   *OCSP Stapling:* To improve performance, the web server periodically queries the CA for a signed, time-stamped OCSP status validation and "staples" it to the initial TLS handshake response, preventing the client browser from making an external HTTP lookup to the CA.

### 9.5.3 Secure Transport Layer: TLS & mTLS
*   **TLS (Transport Layer Security):** The standard protocol that secures client-server communication by authenticating the server (via its public certificate) and encrypting the data channel. The client remains anonymous.
*   **mTLS (Mutual TLS):** Establishes two-way authentication. Both the server *and* the client must present valid, signed cryptographic certificates to each other during the TLS handshake before a connection is allowed. mTLS is commonly used to secure internal microservices communications and API connections where anonymous client access is prohibited.

### 9.5.4 Enterprise Authentication & Authorization Standards
Large organizations consolidate identity management into centralized identity provider systems using open standard protocols:
*   **LDAP (Lightweight Directory Access Protocol):** A protocol used to query and manage user and group directory service information (typically hosted in Microsoft Active Directory or OpenLDAP). It operates on a hierarchical tree structure of directory records.
*   **Kerberos:** A ticket-based network authentication protocol designed to provide strong authentication for client/server applications by using secret-key cryptography. It allows Single Sign-On (SSO) within internal corporate networks.
*   **SAML 2.0 (Security Assertion Markup Language):** An XML-based open standard for exchanging authentication and authorization data between an **Identity Provider (IdP)** (like Okta, Active Directory) and a **Service Provider (SP)** (like AWS Console, Salesforce). It is widely used for enterprise web-based Single Sign-On (WebSSO).
*   **OAuth 2.0:** An open authorization framework that allows a third-party application to obtain limited access to user resources on an HTTP service without exposing the user's login credentials (e.g., "Sign in with Google"). It uses short-lived **Access Tokens**.
*   **OIDC (OpenID Connect):** An authentication layer built on top of the OAuth 2.0 authorization framework. It adds an **ID Token** (formatted as a JSON Web Token - JWT) containing user identity profile assertions, allowing applications to securely verify client identities.

---

## 9.6 Official Security References & Resources

To check official security specifications, frameworks, and guidelines:
*   **OWASP Top 10:** [OWASP Top 10 Web Exploit Manual](https://owasp.org/www-project-top-ten/) - The authoritative document detailing the top 10 most critical web application security risks and mitigation guides.
*   **NIST Cybersecurity Framework:** [NIST CSF Guidelines](https://www.nist.gov/cyberframework) - The official security framework standards mapping risk management, asset protection, and access control models.
*   **OpenSSL Cryptography Manuals:** [OpenSSL Project Docs](https://www.openssl.org/docs/) - Official reference guides for crypto algorithms, SSL/TLS protocol execution, and cryptographic keys.

---

## Prerequisites

- [AWS Well-Architected Framework](../02-solutions-architect-professional/well-architected-framework.md)

## Recommended Next Topics

- [IAM: Identity and Access Management](../01-developer-associate/1-aws-fundamentals/iam.md)

## Related Topics

- [Beginner Study Roadmap](beginner-roadmap.md)
- [Phase 0: Foundation Bridge Overview](0-intro.md)
- [Module 1: How Computers Actually Work](1-how-computers-work.md)
