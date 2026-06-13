---
sidebar_position: 6
sidebar_label: "Module 5: Databases"
---

# Module 5: Database Fundamentals

Almost every modern application requires persistence. This module covers Relational Database Management Systems (RDBMS), database normalization rules, ACID transaction compliance, a complete SQL syntax reference, NoSQL database styles, the CAP Theorem, and performance scaling designs.

---

## 5.1 Relational Databases & Schema Design

Relational databases organize data into two-dimensional tables (relations) consisting of **rows** (records) and **columns** (attributes).

### 5.1.1 Keys & Relationships (Customer-Orders Example)
Tables link together using keys. Let's look at a classic Customer-Orders relational schema:

```text
  CUSTOMERS TABLE                              ORDERS TABLE
  ┌───────────────────────┐                    ┌───────────────────────┐
  │ user_id (PK)          │ ◄──────────┐       │ order_id (PK)         │
  │ username              │            │       │ order_total           │
  │ email                 │            └───────│ user_id (FK)          │
  └───────────────────────┘                    │ status                │
  (Each user has a unique ID)                  └───────────────────────┘
                                               (Multiple orders can have the same user_id)
```

*   **Primary Key (PK):** A column (or combination of columns) that uniquely identifies each row in a table. It cannot be null and must be unique. (e.g. `user_id` in the CUSTOMERS table).
*   **Foreign Key (FK):** A column in one table that references the Primary Key of another table, establishing a relationship. (e.g. `user_id` in the ORDERS table).
*   **Referential Integrity:** Constraints enforced by the database engine to ensure that a Foreign Key value must point to a valid, existing Primary Key row in the parent table. (You cannot insert an order for `user_id: 99` if user 99 does not exist in the CUSTOMERS table).

### 5.1.2 Database Normalization
Normalization is a structural design process used to organize tables to minimize redundancy and prevent dependency anomalies (insert, update, delete bugs).

*   **First Normal Form (1NF):** Each column must contain atomic (indivisible) values. There must be no repeating groups or comma-separated lists. Every row must have a unique key.
    ```text
    -- Non-1NF Table (Violates atomicity)
    [UserID] [Username] [PhoneNumbers]
    101      alice      "555-0192, 555-0144"
    
    -- Normalized to 1NF (Atomic columns, separate rows)
    [UserID] [Username] [PhoneNumber]
    101      alice      555-0192
    101      alice      555-0144
    ```
*   **Second Normal Form (2NF):** Must meet 1NF criteria. Additionally, all non-key columns must depend on the *entire* primary key, eliminating partial dependencies (relevant when using composite primary keys).
*   **Third Normal Form (3NF):** Must meet 2NF criteria. Additionally, non-key columns must not depend on *other* non-key columns (no transitive functional dependencies). Every attribute must depend on "the key, the whole key, and nothing but the key."
    ```text
    -- Non-3NF Table (DepartmentName depends on DepartmentID, which is non-key)
    [EmployeeID] [EmployeeName] [DepartmentID] [DepartmentName]
    
    -- Normalized to 3NF (Split into two separate tables)
    EMPLOYEES: [EmployeeID] [EmployeeName] [DepartmentID(FK)]
    DEPARTMENTS: [DepartmentID] [DepartmentName]
    ```

### 5.1.3 ACID Transactions (Bank Transfer Example)
A **Transaction** is a logical unit of database work (a sequence of queries executed as one step). Consider transferring \$100 from Alice to Bob:
*   **Query 1:** Subtract \$100 from Alice's balance.
*   **Query 2:** Add \$100 to Bob's balance.

RDBMS engines enforce the **ACID** properties to guarantee this transfer is safe:
*   **Atomicity:** "All or nothing." If Query 1 succeeds but the server crashes before Query 2 runs, the database rolls back the transaction. Alice is not charged, and Bob is not credited.
*   **Consistency:** The database must move from one valid state to another, conforming to all schema constraints, indexes, and triggers. (The transfer cannot result in a negative account balance if a constraint prevents it).
*   **Isolation:** Concurrent transactions must run independently. If someone else queries Alice's balance while the transfer is occurring, they see either her original balance or her new balance, never a half-completed state.
*   **Durability:** Once the transaction is committed, the change is written to persistent logs on disk. If the database crashes immediately after, the transfer data remains safe.

---

## 5.2 SQL (Structured Query Language) Cheat Sheet

SQL is the declarative language used to manage and query relational databases.

### 5.2.1 Data Definition Language (DDL)
Used to create and modify the database structure:
```sql
-- Create Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Orders table with Foreign Key constraint
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    order_total DECIMAL(10, 2),
    status VARCHAR(20)
);
```

### 5.2.2 Data Manipulation Language (DML)
Used to query, insert, edit, and delete records:
```sql
-- Insert a user
INSERT INTO users (username, email) VALUES ('alice', 'alice@company.com');

-- Update a user's email
UPDATE users SET email = 'alice_new@company.com' WHERE user_id = 1;

-- Delete a record
DELETE FROM orders WHERE order_id = 5002;
```

### 5.2.3 Basic SELECT and Filters
```sql
SELECT username, email 
FROM users 
WHERE created_at > '2026-01-01' 
ORDER BY username ASC 
LIMIT 10;
```

### 5.2.4 Aggregations & Groupings
```sql
SELECT user_id, COUNT(order_id) as total_orders, SUM(order_total) as spent
FROM orders
WHERE status = 'Completed'
GROUP BY user_id
HAVING SUM(order_total) > 500.00;
```

### 5.2.5 Relational Joins
Joins combine columns from one or more tables based on a common field (FK).

```
   INNER JOIN            LEFT JOIN            RIGHT JOIN           FULL OUTER JOIN
 ┌───────────┐         ┌───────────┐        ┌───────────┐          ┌───────────┐
 │   A ∩ B   │         │ A (with B)│        │ (A with) B│          │   A ∪ B   │
 └───────────┘         └───────────┘        └───────────┘          └───────────┘
 Matches only         Matches all from A,   Matches all from B,    Matches all rows
 matching rows        nulls for missing B   nulls for missing A    from both tables
```

*   **INNER JOIN:** Returns records with matching values in both tables.
    ```sql
    SELECT users.username, orders.order_total
    FROM users
    INNER JOIN orders ON users.user_id = orders.user_id;
    ```
*   **LEFT JOIN (LEFT OUTER JOIN):** Returns all records from the left table, and the matching records from the right table. Columns for the right table will contain `NULL` if no match exists.
    ```sql
    SELECT users.username, orders.order_total
    FROM users
    LEFT JOIN orders ON users.user_id = orders.user_id;
    ```

---

## 5.3 Non-Relational (NoSQL) Databases & CAP Theorem

NoSQL databases trade ACID compliance for flexible schemas, high availability, and horizontal scalability.

### 5.3.1 NoSQL Styles
1.  **Key-Value Stores:** Data is stored as an associative array of keys and values. Extremely fast for simple lookups (e.g. Redis, Memcached).
2.  **Document Databases:** Stores data as structured JSON-like documents. Schemas are flexible, allowing different fields per record (e.g. MongoDB).
3.  **Wide-Column / Column-Family:** Organizes data into columns rather than rows, optimizing queries across massive tabular datasets (e.g. Apache Cassandra).
4.  **Graph Databases:** Uses nodes and edges to model complex networks of relationships (e.g. Neo4j).

### 5.3.2 The CAP Theorem
The CAP Theorem states that a distributed database system can guarantee at most two out of these three properties when a network partition (communication drop) occurs:

```
                  [ Consistency ] (C)
                         / \
                        /   \
                       /     \
    [ Availability ] (A) ─── [ Partition Tolerance ] (P)
```

*   **Consistency (C):** Every read receives the most recent write or an error.
*   **Availability (A):** Every non-failing node returns a response, but it is not guaranteed to contain the most recent write.
*   **Partition Tolerance (P):** The system continues to operate despite arbitrary message loss or link failures.

In practice, network partitions (P) are unavoidable in distributed systems. Therefore, systems must choose between **Consistency (CP)** or **Availability (AP)**:
*   *CP Database:* Blocks reads/writes to partition-isolated nodes to prevent data drift, sacrificing availability.
*   *AP Database:* Allows read/write operations to run on isolated nodes, returning stale data and resolving conflicts later, sacrificing consistency.

---

## 5.4 Database Performance and Tuning

As datasets scale to millions of rows, default tables become slow. Developers use three main tuning tools:

### 5.4.1 Database Indexes
An index is a separate, structured reference table containing pointers to physical rows. 
*   **B-Tree Indexes:** Organize data into a balanced search tree, reducing lookup complexity from $O(N)$ (scanning the whole table) to $O(\log N)$ (quick binary-style checks).
*   *Trade-off:* Indexes speed up read queries (`SELECT`), but slow down write operations (`INSERT`, `UPDATE`, `DELETE`) because the index file must be re-sorted on every change.

### 5.4.2 Sharding (Horizontal Partitioning)
Splits a single massive database table across multiple independent physical server nodes. Data is distributed using a **Partition Key** (like a hashing function of a user's ID).

### 5.4.3 Caching
Placing an in-memory datastore (like Redis) in front of the main database to serve popular queries instantly, reducing CPU load on the RDBMS.

---

## 5.5 Official Database References & Manuals

For official documentation and tutorials:
*   **PostgreSQL Official Manuals:** [PostgreSQL Documentation](https://www.postgresql.org/docs/) - The primary reference manuals for SQL queries, schemas, indexing, and administration.
*   **SQLite Tutorial Catalog:** [SQLite Official Spec](https://www.sqlite.org/docs.html) - Beginner-focused database implementation specifications and query manuals.
*   **MongoDB Manual:** [MongoDB Documentation](https://www.mongodb.com/docs/manual/) - Official developer guide for JSON document structures, indexing, and NoSQL query syntax.
