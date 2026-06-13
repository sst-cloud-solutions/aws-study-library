---
sidebar_position: 5
sidebar_label: "Module 4: Programming Fundamentals"
---

# Module 4: Programming Fundamentals

Software powers the logic of modern applications and automation. This module covers core programming structures, control flow execution, exception handling patterns, JSON API structures, and hands-on scripting with Python.

---

## 4.1 Programming Structures & Mappings

Regardless of the language, developers write code by structuring data and logic into standard components.

### 4.1.1 Variables, Constants, and Scope
*   **Variable:** A named reference pointing to a value stored in memory. Variables can change their value during execution (e.g. `user_count = 10`).
*   **Constant:** A named reference designed to remain unchanged once defined (e.g., `MAX_RETRY_LIMIT = 5`).
*   **Scope:** The lifecycle and accessibility boundary of a variable:
    *   *Global Scope:* Declared outside functions, accessible from anywhere in the codebase.
    *   *Local Scope:* Declared inside a function or loop block. Created on execution and garbage-collected when the function finishes.

### 4.1.2 Base Data Types
*   **Strings:** Text characters enclosed in quotes (e.g. `"prod-database"`).
*   **Numbers:** Integers (e.g., `42`) and floating-point decimals (e.g., `9.81`).
*   **Booleans:** Binary states (`True` or `False`), matching digital logic.

### 4.1.3 Data Collections
*   **Lists / Arrays:** Ordered collections of values accessed by a zero-based index. Lists can expand dynamically.
    *   *Python Example:* `servers = ["web01", "web02", "db01"]`
    *   Accessing index `0`: `servers[0]` returns `"web01"`.
*   **Dictionaries / Maps / Objects:** Unordered collections of key-value pairs. Keys must be unique and act as indexes to retrieve values.
    *   *Python Example:*
        ```python
        config = {
            "environment": "production",
            "db_port": 5432,
            "ssl_enabled": True
        }
        ```
    *   Accessing key: `config["db_port"]` returns `5432`.
*   **Sets:** Unordered collections of unique values. Used to perform operations like unions, intersections, and deduplication.

### 4.1.4 How Code Runs: Compilers vs. Interpreters
Computers only execute binary machine code (`1`s and `0`s). Programming languages translate high-level readable code to machine code in two main ways:
1.  **Compilers (e.g. C++, Java, Rust, Go):** A compiler scans the entire codebase ahead of time and translates it into a standalone binary executable file (like a `.exe` on Windows). The execution is extremely fast, but compiling takes time, and you must recompile the code for different hardware architectures.
2.  **Interpreters (e.g. Python, JavaScript, Ruby):** An interpreter reads the source code file line-by-line at runtime and translates/executes it on the fly. No compilation phase is needed, making development fast and cross-platform. However, runtime execution is slower than compiled code.

---

## 4.2 Control Flow & Function Design

Control flow directs the execution path of code statements based on logic conditions.

### 4.2.1 Conditionals
Branching logic redirects code execution paths.
```
              [Check Condition]
               /             \
         (If True)         (If False)
           /                 \
    [Execute Code Block]   [Skip / Else Block]
```
```python
if score >= 90:
    print("Grade: A")
elif score >= 75:
    print("Grade: B")
else:
    print("Grade: F")
```

### 4.2.2 Loops
Loops repeat code blocks to process batches of items:
*   **For Loops:** Iterate over a predefined collection or range.
    ```python
    for server in ["web01", "web02"]:
        print(f"Deploying updates to: {server}")
    ```
*   **While Loops:** Execute continuously as long as a boolean condition remains true.
    ```python
    retries = 0
    while retries < 3:
        print("Checking server status...")
        retries += 1
    ```

### 4.2.3 Functions
Functions compile reusable, modular logic. They take parameters (inputs), perform actions, and return a value (output).

```python
def calculate_network_throughput(file_size_bytes, bandwidth_bps):
    bits = file_size_bytes * 8
    time_seconds = bits / bandwidth_bps
    return time_seconds

# Call function
duration = calculate_network_throughput(1000000, 100000)
```

---

## 4.3 Exceptions & Error Handling

Runtime errors occur during code execution (like trying to read a missing file or divide by zero). If unhandled, these errors crash the application and print a stack trace.

To prevent crashes, developers write **Try-Catch** (or **Try-Except** in Python) blocks:

```python
def read_configuration(path):
    try:
        with open(path, "r") as file:
            return file.read()
    except FileNotFoundError as error:
        print(f"Warning: Configuration file not found at {path}. Details: {error}")
        return "{}" # Return a default safe fallback string
    finally:
        print("Configuration read operation completed.")
```

*   **Try:** The code block containing the risky operation that might throw an error.
*   **Except:** The backup code block that executes only if the specific error is encountered.
*   **Finally:** A block that executes regardless of whether an error occurred, useful for cleanup tasks (like closing open files or database connections).

---

## 4.4 APIs & JSON (JavaScript Object Notation)

An API (Application Programming Interface) allows two software services to exchange data. The standard data exchange format is **JSON**.

### 4.4.1 Scenario: The User Sign-Up Data Flow
To see how APIs and databases fit together conceptually, let's trace a user registering for a website:

```
 [User Client Browser] ──(1. Send Form)──> [API Server Gateway] ──(2. Write User)──> [Database]
 [User Client Browser] <──(4. HTTP 201)─── [API Server Gateway] <──(3. Success)─────── [Database]
```

1.  **Form Input:** You type your name and email into a browser form and click "Sign Up."
2.  **API Request:** The client frontend script packages your inputs into a **JSON string** payload and makes an HTTP `POST` request to the API server URL `/v1/users`.
3.  **API Processing:** The API server receives the request, parses the JSON string into memory, runs business validation logic (e.g. checking if the email is valid), and executes database query commands to write the new user record into a database table.
4.  **Database Commit & Response:** The database commits the row and returns a success status back to the API server. The API server then returns an HTTP status code `201 Created` with a confirmation JSON payload back to the browser client, which displays a welcome message.

---

## 4.5 Hands-on Python Scripting (Line-by-Line Guide)

Python is a popular programming language for sysadmins and developers. Let's look at a complete, practical Python script that demonstrates imports, file handling, JSON processing, loops, and exception handling, with step-by-step commentary:

```python
# 1. Import built-in modules to interact with JSON, the OS, and system parameters
import json
import os
import sys

# 2. Define a function that processes configuration settings
def process_servers_configuration(input_file_path):
    
    # 3. Check if the config file physically exists on storage to prevent a crash
    if not os.path.exists(input_file_path):
        print(f"Error: The file {input_file_path} does not exist.")
        sys.exit(1) # Terminate the script with exit code 1 (failure)

    try:
        # 4. Open the file in read-only mode ('r'). 'with' ensures the file is closed automatically
        with open(input_file_path, 'r') as file:
            # 5. Deserialize the JSON string inside the file into a Python Dictionary
            data = json.load(file)
            
        print(f"Successfully loaded configuration: {data.get('config_name', 'Unnamed')}")
        
        # 6. Loop through the list of servers registered in the config dictionary
        for server in data['servers']:
            name = server['name']
            role = server['role']
            active = server['active']
            
            # 7. Check the boolean state and print formatted output
            if active:
                print(f" [ACTIVE] Server: {name} is configured as a {role}")
            else:
                print(f" [INACTIVE] Server: {name} ({role}) is currently disabled.")
                
    # 8. Catch specific exceptions to handle formatting or key issues gracefully
    except json.JSONDecodeError as decode_err:
        print(f"Error: Failed to parse JSON file. Invalid format: {decode_err}")
    except KeyError as key_err:
        print(f"Error: Missing expected key in the JSON configuration: {key_err}")

# 9. standard entry point block ensuring script only runs if called directly
if __name__ == "__main__":
    # Simulate execution by passing a configuration filename
    process_servers_configuration("servers_config.json")
```

---

## 4.6 Official Programming References & Resources

To access official syntax guides, documentation manuals, and specifications:
*   **Python Official Documentation:** [Python.org Documentation](https://docs.python.org/3/) - The official syntax tutorials, module indices, and standard library references.
*   **JSON.org Standard:** [JSON Schema Specifications](https://www.json.org/) - The definitive standard specification mapping JSON format syntax.
*   **W3Schools Python Guide:** [W3Schools Python Tutorial](https://www.w3schools.com/python/) - A beginner-focused tutorial with interactive coding modules for syntax comfort.
