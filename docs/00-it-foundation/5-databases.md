---
sidebar_position: 6
sidebar_label: "Module 4: Databases"
---

# Module 1: Database Fundamentals

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

- **Primary Key (PK):** A column (or combination of columns) that uniquely identifies each row in a table. It cannot be null and must be unique. (e.g. `user_id` in the CUSTOMERS table).
- **Foreign Key (FK):** A column in one table that references the Primary Key of another table, establishing a relationship. (e.g. `user_id` in the ORDERS table).
- **Referential Integrity:** Constraints enforced by the database engine to ensure that a Foreign Key value must point to a valid, existing Primary Key row in the parent table. (You cannot insert an order for `user_id: 99` if user 99 does not exist in the CUSTOMERS table).

### 5.1.2 Database Normalization

Normalization is a structural design process used to organize tables to minimize redundancy and prevent dependency anomalies (insert, update, delete bugs).

- **First Normal Form (1NF):** Each column must contain atomic (indivisible) values. There must be no repeating groups or comma-separated lists. Every row must have a unique key.

  ```text
  -- Non-1NF Table (Violates atomicity)
  [UserID] [Username] [PhoneNumbers]
  101      alice      "555-0192, 555-0144"

  -- Normalized to 1NF (Atomic columns, separate rows)
  [UserID] [Username] [PhoneNumber]
  101      alice      555-0192
  101      alice      555-0144
  ```

- **Second Normal Form (2NF):** Must meet 1NF criteria. Additionally, all non-key columns must depend on the _entire_ primary key, eliminating partial dependencies (relevant when using composite primary keys).
- **Third Normal Form (3NF):** Must meet 2NF criteria. Additionally, non-key columns must not depend on _other_ non-key columns (no transitive functional dependencies). Every attribute must depend on "the key, the whole key, and nothing but the key."

  ```text
  -- Non-3NF Table (DepartmentName depends on DepartmentID, which is non-key)
  [EmployeeID] [EmployeeName] [DepartmentID] [DepartmentName]

  -- Normalized to 3NF (Split into two separate tables)
  EMPLOYEES: [EmployeeID] [EmployeeName] [DepartmentID(FK)]
  DEPARTMENTS: [DepartmentID] [DepartmentName]
  ```

### 5.1.3 ACID Transactions (Bank Transfer Example)

A **Transaction** is a logical unit of database work (a sequence of queries executed as one step). Consider transferring \$100 from Alice to Bob:

- **Query 1:** Subtract \$100 from Alice's balance.
- **Query 2:** Add \$100 to Bob's balance.

RDBMS engines enforce the **ACID** properties to guarantee this transfer is safe:

- **Atomicity:** "All or nothing." If Query 1 succeeds but the server crashes before Query 2 runs, the database rolls back the transaction. Alice is not charged, and Bob is not credited.
- **Consistency:** The database must move from one valid state to another, conforming to all schema constraints, indexes, and triggers. (The transfer cannot result in a negative account balance if a constraint prevents it).
- **Isolation:** Concurrent transactions must run independently. If someone else queries Alice's balance while the transfer is occurring, they see either her original balance or her new balance, never a half-completed state.
- **Durability:** Once the transaction is committed, the change is written to persistent logs on disk. If the database crashes immediately after, the transfer data remains safe.

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

- **INNER JOIN:** Returns records with matching values in both tables.
  ```sql
  SELECT users.username, orders.order_total
  FROM users
  INNER JOIN orders ON users.user_id = orders.user_id;
  ```
- **LEFT JOIN (LEFT OUTER JOIN):** Returns all records from the left table, and the matching records from the right table. Columns for the right table will contain `NULL` if no match exists.
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

- **Consistency (C):** Every read receives the most recent write or an error.
- **Availability (A):** Every non-failing node returns a response, but it is not guaranteed to contain the most recent write.
- **Partition Tolerance (P):** The system continues to operate despite arbitrary message loss or link failures.

In practice, network partitions (P) are unavoidable in distributed systems. Therefore, systems must choose between **Consistency (CP)** or **Availability (AP)**:

- _CP Database:_ Blocks reads/writes to partition-isolated nodes to prevent data drift, sacrificing availability.
- _AP Database:_ Allows read/write operations to run on isolated nodes, returning stale data and resolving conflicts later, sacrificing consistency.

---

## 5.4 Database Performance and Tuning

As datasets scale to millions of rows, default tables become slow. Developers use three main tuning tools:

### 5.4.1 Database Indexes & B-Trees Internals

An index is a separate, structured reference table containing sorted keys and physical memory pointers to rows in the main table.

- **B-Tree Internals:** RDBMS engines organize indexes using a **Balanced Tree (B-Tree)** structure. In a B-Tree, the data is structured into a hierarchical tree of nodes:
  - _Root Node:_ The entry point of the tree.
  - _Internal Nodes:_ Map ranges of keys to child nodes, allowing binary search navigation down the tree.
  - _Leaf Nodes:_ The lowest level nodes, which contain the actual index keys and pointers to the physical page blocks on disk (Row IDs / RIDs) containing the full records.
  - _Branching Factor:_ B-Trees have a high branching factor (hundreds of child pointers per node). This allows the database to traverse billions of records and locate any target row in just 3 to 4 disk read operations ($O(\log N)$ complexity).
- _Index Trade-off:_ Indexes speed up read queries (`SELECT` statements with `WHERE` or `JOIN` filters), but slow down write operations (`INSERT`, `UPDATE`, `DELETE`) because the database engine must execute additional I/O operations to split/re-balance B-Tree nodes and update the index files.

### 5.4.2 Query Optimization & Execution Plans

When you execute a SQL query, the database's **Query Planner/Optimizer** evaluates multiple ways to fetch the data and selects the plan with the lowest computational cost.

- **Execution Plans:** You can inspect the chosen query path by prepending the query with the `EXPLAIN` (or `EXPLAIN ANALYZE`) keyword:
  - _Sequential Scan (Seq Scan / Table Scan):_ The database reads every single page block on disk from start to finish. This is highly inefficient for large tables ($O(N)$).
  - _Index Scan:_ The database traverses the B-Tree index to locate the specific pointer, then fetches only the target block. Extremely fast.
- **Optimization Techniques:**
  - Avoid wildcard selects (`SELECT *`) to reduce network payload and allow the optimizer to use _Covering Indexes_ (where all requested columns exist within the index itself, avoiding disk reads to the main table).
  - Ensure foreign keys are indexed to speed up table relationships during `JOIN` operations.

### 5.4.3 Partitioning vs. Sharding (Horizontal Scaling)

As data grows into terabytes, a single database instance experiences resource limits:

- **Partitioning (Within a Single Host):** Splits a massive table into smaller logical chunks (partitions) _within the same database engine_:
  - _Horizontal Partitioning:_ Splits rows into partitions based on a criteria (e.g., partitioning a transaction table by year: `transactions_2025`, `transactions_2026`).
  - _Vertical Partitioning:_ Splits columns into separate tables (e.g., moving large binary columns like profile photos to a secondary table).
- **Sharding (Across Multiple Hosts):** Splits and distributes table partitions across **multiple independent physical server nodes** (database shards). A **Shard Key** determines which shard holds which record (e.g., using a hash of the `user_id`). Sharding allows horizontal scaling of both storage capacity and write throughput, but makes complex multi-shard joins extremely slow and difficult.

### 5.4.4 Database Replication Topologies

To prevent data loss from hardware failure and scale read capacity, databases replicate data across multiple servers:

- **Leader/Follower (Active-Passive / Read Replicas):** All write queries are sent to a single designated **Leader** node. The leader writes the changes to its local database and replicates the transaction log stream to one or more **Follower** nodes. Read queries can be sent to any follower to scale read capacity.
  - _Synchronous Replication:_ The leader waits for followers to confirm the write before responding to the client. Guarantees zero data loss, but increases write latency.
  - _Asynchronous Replication:_ The leader writes locally and immediately returns success to the client, replicating to followers in the background. Highly performant, but introduces a replication lag window.
- **Multi-Leader (Active-Active):** Multiple database nodes act as write leaders. Writes can be sent to any leader, and changes are replicated to other leaders. Useful for multi-region configurations, but requires complex conflict resolution algorithms (like "Last Write Wins" or Vector Clocks).
- **Leaderless (Peer-to-Peer):** Every node can accept writes and reads (used in Cassandra or DynamoDB). Clients write to multiple replica nodes simultaneously. The system uses a **Quorum** model to resolve conflicts ($W + R > N$, where $W$ is write quorum, $R$ is read quorum, and $N$ is replica count).

### 5.4.5 Eventual Consistency Models

In distributed database systems, data replication delays mean different nodes may return different values at the same millisecond:

- **Strong Consistency:** Guarantees that any read operation immediately following a write will return the new written value. Requires locking nodes during writes, sacrificing performance and availability.
- **Eventual Consistency:** System updates are replicated in the background. The database guarantees that if no new writes occur, all replicas will eventually sync and return the same data. During the replication window, a client query might read stale data.

### 5.4.6 Caching

Placing an in-memory datastore (like Redis) in front of the main database to serve popular queries instantly, reducing CPU load on the RDBMS.

---

## 5.5 Official Database References & Manuals

For official documentation and tutorials:

- **PostgreSQL Official Manuals:** [PostgreSQL Documentation](https://www.postgresql.org/docs/) - The primary reference manuals for SQL queries, schemas, indexing, and administration.
- **SQLite Tutorial Catalog:** [SQLite Official Spec](https://www.sqlite.org/docs.html) - Beginner-focused database implementation specifications and query manuals.
- **MongoDB Manual:** [MongoDB Documentation](https://www.mongodb.com/docs/manual/) - Official developer guide for JSON document structures, indexing, and NoSQL query syntax.

---

## Prerequisites

- [Module 1: Programming Fundamentals](4-programming-fundamentals.md)

## Recommended Next Topics

- [Module 1: Web Application Fundamentals](6-web-application-fundamentals.md)

## Related Topics

- [Beginner Study Roadmap](beginner-roadmap.md)
- [Phase 0: Foundation Bridge Overview](0-intro.md)
- [Module 1: How Computers Actually Work](1-how-computers-work.md)
