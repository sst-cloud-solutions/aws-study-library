---
sidebar_position: 2
sidebar_label: "Module 1: How Computers Work"
---

# Module 1: How Computers Actually Work

To understand virtualized infrastructure and application deployment, you must first understand the physics, hardware, and operating systems of physical computers. This guide breaks down hardware subsystems, the mechanics of operating system kernels, and the binary math that powers all computing.

---

## 1.1 The Hardware Subsystems

At its simplest, a computer is an information processor. It takes **Input**, processes it through **Logic & Memory**, and generates **Output**.

```
    [Input Subsystem] (Keyboard, Network Interface, Disk Read)
          │
          ▼
    [Processing & Memory Subsystem]
      ├── CPU (ALU, Control Unit, L1/L2/L3 Caches)
      └── RAM (Volatile Memory Address Space)
          │
          ▼
    [Output Subsystem] (Monitor, Network Interface, Disk Write)
```

### 1.1.1 The Kitchen Chef Analogy
To make these hardware interactions intuitive, think of a computer as a busy restaurant kitchen:
*   **The CPU is the Head Chef:** The chef executes the instructions on the recipe card. The faster the chef can read and slice (higher Clock Speed) and the more chefs in the kitchen (Processor Cores), the more meals can be prepared.
*   **RAM is the Kitchen Counter / Prep Table:** This is the temporary workspace where the chef places ingredients currently being chopped. It is extremely fast to reach, but has limited space. When the kitchen closes (reboot/shutdown), the prep table is wiped completely clean (volatile).
*   **Storage (SSD/HDD) is the Pantry / Refrigerator:** This holds all the raw ingredients, frozen meats, and backup supplies. It is huge, and the food stays there even when the kitchen is closed (non-volatile). However, it is slow for the chef to walk over to the pantry, open the door, and fetch ingredients (latency).
*   **The Operating System is the Kitchen Manager:** The manager assigns prep table space, schedules which chef works on which recipe thread, and controls access to the pantry.
*   **Applications are the Recipes:** The instructions that tell the chef how to combine inputs (ingredients) into outputs (dishes).

### 1.1.2 The Central Processing Unit (CPU)
The CPU is the primary engine of a computer. It executes instructions of a computer program by performing basic arithmetic, logical, control, and input/output operations.
*   **Processor Cores:** Modern CPUs contain multiple physical cores. Each core can independently execute code instructions. Multi-core processors allow true parallel computing.
*   **Clock Speed:** Measured in Gigahertz (GHz), representing the number of cycles a CPU performs per second (e.g., a 3.0 GHz CPU performs 3 billion cycles per second). Each instruction (like adding two numbers) takes one or more cycles.
*   **CPU Caches (L1, L2, L3):** Getting data from RAM to the CPU is relatively slow (latency). To solve this, CPUs contain tiny, ultra-fast memory caches on the chip itself:
    *   **L1 Cache:** Fastest, smallest (kilobytes), built directly into each core.
    *   **L2 Cache:** Slightly larger, slightly slower, dedicated to a core or shared.
    *   **L3 Cache:** Largest (megabytes), slowest of the three caches, shared across all CPU cores.
*   **The Instruction Cycle (Fetch-Decode-Execute):**
    1.  **Fetch:** The CPU retrieves an instruction from memory (RAM) address designated by the Instruction Pointer.
    2.  **Decode:** The Control Unit translates the binary instruction into signals for the execution units.
    3.  **Execute:** The Arithmetic Logic Unit (ALU) or Floating Point Unit (FPU) performs the mathematical operation.

### 1.1.2.1 Deep Dive: The Compute Pillar Mechanics

To build and scale high-performance applications in the cloud, you must understand the deep architecture of the Compute Pillar:

*   **Pipelining and Parallelism:** CPUs do not wait for one instruction to completely finish before starting the next. **Instruction Pipelining** splits the execution cycle into multiple steps (Fetch, Decode, Execute, Write-Back). While instruction 1 is in the Execute stage, instruction 2 is in the Decode stage, and instruction 3 is in the Fetch stage. If code execution encounters a conditional branch (like `if-else`), the CPU guesses which branch will run using a **Branch Predictor**. A wrong guess requires the pipeline to be completely flushed, causing execution latency.
*   **Hyper-Threading / SMT:** Physical CPU cores contain redundant registers (architectural state buffers) but share execution engines (like the ALU). **Simultaneous Multi-Threading (SMT)** allows a single physical core to present itself as two **logical cores** (vCPUs) to the operating system. While one logical thread is waiting for data to be loaded from RAM, the physical core can instantly context-switch to run instructions for the other logical thread.
*   **Processes vs. Threads:**
    *   **Process:** An isolated running instance of a program. It holds its own dedicated memory address space (isolated from other processes by the CPU's Memory Management Unit - MMU) and system resources.
    *   **Thread:** A lightweight unit of execution *within* a process. Multiple threads under the same process share that process's memory space, allowing them to communicate and share data extremely quickly.
*   **Operating System CPU Scheduling:** Because an operating system runs thousands of threads but has a limited number of logical CPU cores, the OS kernel's **Scheduler** decides which thread runs on which core at any given millisecond. Using algorithms like **Time-Slicing**, the scheduler allows a thread to run for a brief interval (a quantum, e.g., 10ms), suspends it, saves its CPU register state (a **Context Switch**), and loads the state of the next thread. Excessive context switching degrades system performance.
*   **Virtualization & Cloud Mappings:** When you rent an AWS EC2 instance with 2 vCPUs, the hypervisor allocates two logical threads (hyper-threads) from the host's physical processor pool. The hypervisor's scheduler maps the virtual machine's CPU demand directly to physical CPU core cycles.
*   **Interrupts:** An interrupt is a signal sent to the CPU by hardware (like a network card receiving a packet) or software (like an error or system call) requesting immediate attention. When an interrupt occurs, the CPU suspends its current execution state, saves its registers, runs a specific function called an **Interrupt Service Routine (ISR)** to handle the event, and then resumes the suspended process.
*   **NUMA (Non-Uniform Memory Access):** In modern multi-socket motherboard systems, memory access time depends on the memory's location relative to the processor. Each CPU socket has its own dedicated local memory bank (a NUMA node). Accessing local memory is extremely fast; accessing memory connected to a different CPU socket ("foreign" memory) across interconnect links (like Intel UPI or AMD Infinity Fabric) incurs significant latency penalties. Properly configuring applications to run on dedicated NUMA nodes prevents cross-socket bottlenecks.

### 1.1.3 Random Access Memory (RAM)
RAM is the high-speed, dynamic read-and-write workspace of the computer.
*   **Volatility:** RAM is **volatile**. It requires electrical power to maintain its state. When power is lost or the system is shut down, all data in RAM is erased.
*   **Memory Address Space:** RAM is structured as a massive grid of slots, each identified by a unique memory address (hexadecimal index). The CPU can jump directly to any memory address in nanoseconds (hence "Random Access"), unlike sequential storage media.
*   **Latency vs. Bandwidth:** 
    *   *Latency:* The time delay between requesting a block of memory and receiving it (measured in nanoseconds).
    *   *Bandwidth:* The volume of data that can be transferred into/out of memory per second (measured in GB/s).

### 1.1.4 Storage (HDD vs. SSD vs. NVMe)
Where RAM is volatile and fast, storage is non-volatile (persistent) and slower.
*   **HDD (Hard Disk Drive):** Uses rotating magnetic platters and a moving read/write head. Performance is bottlenecked by physical movement (average latency is 5–15 milliseconds; read/write throughput is ~100–150 MB/s). Highly vulnerable to physical shock.
*   **SSD (Solid State Drive - SATA):** Uses NAND Flash memory chips. No moving parts. Drastically lower latency (~0.1 milliseconds) and faster throughput (~500 MB/s). Uses the legacy SATA interface designed for HDDs.
*   **NVMe (Non-Volatile Memory Express):** An SSD interface built directly on the high-speed PCIe (Peripheral Component Interconnect Express) lanes. Delivers ultra-low latency (microseconds) and massive throughput (up to 7,000+ MB/s).
*   **Block Size:** Storage drives do not write individual bits. They organize data into fixed sectors or blocks (typically 4 Kilobytes). A write operation must write a complete block, even if only 1 byte has changed.

---

## 1.2 Files, Folders, & Storage Structures

To a computer hardware drive, everything is simply a sequence of `1`s and `0`s. The operating system organizes these sequences into structures humans can work with:

### 1.2.1 Files (The Raw Streams)
A **File** is a resource for storing information, represented as a continuous stream of bytes. 
*   **Metadata:** Associated with every file, recording properties like the owner, creation date, modifications, and size.
*   **File Extensions:** Suffixes added to the end of filenames (e.g. `.txt`, `.json`, `.exe`, `.jpg`). The extension tells the operating system which specific program to run to parse and display the file contents.
*   **Formatting:** A `.txt` file contains raw character encodings (like ASCII). An `.exe` file contains compiled binary processor instructions. A `.jpg` file contains compressed pixel color arrays.

### 1.2.2 Folders (The Index Map)
A **Folder (Directory)** is not actually a container. It is a special type of file that acts as an index map.
*   **Directory Table:** The folder contains a table of names and pointers (addresses) linking to the physical blocks on storage where the files are located.
*   **Subdirectories:** Folders can reference other folders, creating a hierarchical tree structure.

---

## 1.3 Operating System (OS) Internals

The Operating System is the system software that manages computer hardware resources and provides common services for computer programs.

```
    ┌────────────────────────────────────────────────────────┐
    │ User Space (Applications: Chrome, Web Server, Python)  │
    └───────────────────────────┬────────────────────────────┘
                                │ (System Call Interface)
    ┌───────────────────────────▼────────────────────────────┐
    │ Kernel Space (Process Scheduler, Memory Manager, VFS)  │
    ├────────────────────────────────────────────────────────┤
    │ Device Drivers (Disk Controllers, NIC, CPU controller) │
    └───────────────────────────┬────────────────────────────┘
                                │
    ┌───────────────────────────▼────────────────────────────┐
    │ Hardware (CPU, RAM, SSD, Network Interface Card)       │
    └────────────────────────────────────────────────────────┘
```

### 1.3.1 Kernel Space vs. User Space
To protect system stability and security, operating systems split memory and execution privilege into two spaces:
*   **Kernel Space:** The core execution ring (Ring 0) where the operating system kernel runs. It has unrestricted access to the raw CPU, memory, and hardware controllers. If code in kernel space crashes, the entire computer crashes (Kernel Panic / Blue Screen).
*   **User Space:** The execution area for user applications (Ring 3). User programs have zero direct access to hardware. If a user program crashes, the kernel cleanly terminates it without affecting the rest of the system.

### 1.3.2 System Calls (Syscalls)
When an application in user space needs to perform a privileged action (like reading a file from storage, allocating memory, or sending data over the network), it must request it from the kernel. This request is called a **System Call**.
*   Common syscall examples in Linux:
    *   `open()`, `read()`, `write()`, `close()` (File I/O)
    *   `fork()`, `execve()` (Process management)
    *   `socket()`, `connect()`, `bind()` (Networking)
    *   `brk()`, `mmap()` (Memory allocation)

### 1.3.3 Process and Thread Scheduling
*   **Process:** An isolated running instance of a program. Each process has its own private, virtual memory space, file descriptors, and security tokens. Processes cannot read or write to each other's memory without explicit OS cooperation.
*   **Thread:** The smallest unit of execution inside a process. A single process can spawn multiple threads. All threads in a process share the same virtual memory space and file descriptors, making communications between them very fast, but requiring locks to prevent data corruption.
*   **Scheduler:** The kernel component that decides which threads run on which CPU cores at any millisecond. It uses algorithms based on priority, CPU affinity, and load balancing to multiplex thousands of threads across a limited number of CPU cores.
*   **Context Switching:** The process of the CPU saving the state (registers, program counter) of a running thread, swapping memory mapping tables, and loading the state of a different thread. Context switches introduce computational overhead.
*   **Process States:** A process moves through several life-cycle states:
    *   **Created (New):** The process is being initiated.
    *   **Ready:** The process is loaded into RAM and waiting to be assigned to a CPU core by the OS scheduler.
    *   **Running:** The process's instructions are actively executing on a CPU core.
    *   **Blocked (Waiting):** The process is suspended because it is waiting for an event or resource (like a disk read or network packet). It cannot run until the resource is ready.
    *   **Terminated:** The process has finished executing and released its resources.
    *   **Zombie:** A process that has finished execution but still has an entry in the OS process table. This entry is needed so the parent process can read the exit status. If the parent fails to clean up, it remains a zombie.
    *   **Orphan:** A running process whose parent process has terminated. In Linux, these are adopted by the root `init` or `systemd` process (PID 1) to clean up when they finish.
*   **Thread Pools:** Creating and destroying threads dynamically is expensive. To optimize execution, applications use **Thread Pools (Worker Threads)**. A fixed number of worker threads are spawned at startup and wait in an idle state. When a new task arrives (e.g., an incoming HTTP request), the task is pushed into an execution queue. An idle worker thread grabs the task, processes it, and returns to the pool to wait for the next task, avoiding thread-creation overhead.

### 1.3.4 Virtual Memory and Paging
Operating systems do not expose physical RAM addresses directly to applications. Instead, they use a Translation Lookaside Buffer (TLB) and Page Tables to present a virtual memory space to each process.
*   **Virtual Memory:** Allows a process to act as if it has access to a contiguous block of memory, even if its data is fragmented across physical RAM or written to swap storage on disk.
*   **Paging:** Memory is split into fixed blocks called **Pages** (usually 4 KB). When physical RAM is full, the OS moves inactive memory pages to disk storage (known as swapping or paging). If the page is needed again, it triggers a **Page Fault**, and the OS swaps it back into RAM.
*   **Swap Space:** A designated area on a persistent storage drive (either a raw disk partition or a swap file) used as an overflow extension of physical RAM. While swap prevents "Out of Memory" (OOM) application crashes under high memory pressure, accessing disk storage is thousands of times slower than RAM, resulting in a severe performance drop (known as system thrashing).
*   **Memory Allocation (Stack vs. Heap):** The OS divides an application's allocated virtual memory into two primary runtime structures:
    *   **The Stack:** Used for fast, static memory allocation of local variables and function call frames. Managed automatically by the CPU; memory is allocated and freed in a strict Last-In-First-Out (LIFO) order as functions enter and exit.
    *   **The Heap:** Used for dynamic, variables-sized memory allocation at runtime (requested using system calls like `brk` or `mmap` via programming statements like `malloc` or `new`). The developer (or garbage collector) must manually manage memory lifetimes on the heap, making it prone to **Memory Leaks** if allocations are not properly freed.

---

## 1.4 Scenario: Opening Chrome & Watching YouTube

To see all these subsystems work in sequence, let's trace exactly what happens inside a computer from the moment you click the Chrome icon to watch a YouTube video:

```
 [1. Click Icon] ──> [2. Load from SSD to RAM] ──> [3. CPU Executes Chrome]
                                                          │
   [5. Video Renders on Screen] <── [4. Network fetches data from YouTube]
```

1.  **You Double-Click the Chrome Icon (Input & Trigger):** 
    *   The mouse sends a click signal (Input device interrupt) to the Operating System kernel.
    *   The OS identifies that the click is over the Chrome application shortcut.
2.  **Chrome is Loaded into RAM (Storage ➔ Memory):**
    *   The OS kernel calls the disk controller to read Chrome's executable binary data from persistent storage (SSD/HDD).
    *   The data is loaded into volatile RAM, and the OS creates a new isolated **Process** for Chrome, allocating a virtual memory address space.
3.  **The CPU Executes Chrome Instructions (Processing):**
    *   The CPU starts fetching Chrome's instructions from RAM, decoding them, and executing them.
    *   Chrome runs a main GUI thread, drawing the browser window on your screen using the graphics card.
4.  **You Type "youtube.com" and Request a Video (Networking & Input):**
    *   You input text via the keyboard. Chrome requests the OS network card to execute system calls (`socket`, `send`) to send packets over the internet.
    *   The video data streams back over the network interface card (NIC). The OS handles the incoming hardware packets and writes the data into Chrome's memory buffers in RAM.
5.  **Chrome Decodes & Renders the Video (Output):**
    *   The CPU (and GPU) read the video stream data from RAM, decode the compressed video frames, and send coordinate instructions to the monitor screen (Output device) to render the moving images and play the audio.

---

## 1.5 Binary Basics & Data Sizing

Computers use binary states because digital circuits represent logical high/low voltages as `1` and `0`.

### 1.5.1 Bits and Bytes
*   **Bit (b):** A binary digit, `0` or `1`.
*   **Byte (B):** A sequence of **8 bits**. A byte is the smallest addressable unit of memory in modern architectures, representing a single alphanumeric character (like the character `A` which is `01000001` in ASCII).

### 1.5.2 Data Sizing Conversions
Data size scales in powers of 2 (2^10 = 1,024), though storage manufacturers often use powers of 10 for marketing.

| Unit | Size in Bytes (Power of 2 / Binary) | Size in Bytes (Power of 10 / Decimal) |
| :--- | :--- | :--- |
| **Kilobyte (KB / KiB)** | 2^10 = 1,024 bytes | 10^3 = 1,000 bytes |
| **Megabyte (MB / MiB)** | 2^20 = 1,048,576 bytes | 10^6 = 1,000,000 bytes |
| **Gigabyte (GB / GiB)** | 2^30 = 1,073,741,824 bytes | 10^9 = 1,000,000,000 bytes |
| **Terabyte (TB / TiB)** | 2^40 = 1,099,511,627,776 bytes | 10^{12} = 1,000,000,000,000 bytes |

*   **Network Bandwidth Notation:** Network speeds are traditionally measured in **bits per second (bps)**, represented by a lowercase "b" (e.g., a 10 Gbps network link transfers 10 gigabits per second). Storage sizes are measured in **Bytes (B)** with an uppercase "B".
*   **Throughput Calculation Example:** 
    *   To transfer a 10 Gigabyte (GB) file over a 1 Gbps (gigabit per second) network interface:
        *   10 GB = 10 * 8 = 80 Gigabits (Gb)
        *   80 Gb / 1 Gbps = 80 seconds (assuming 100% network efficiency and zero protocol overhead).

---

## 1.6 Official Documentation & Resources

To deepen your understanding of computer architecture and OS internals, refer to these authoritative, official specifications:

*   **Linux Kernel Documentation:** [The Linux Kernel Archive](https://www.kernel.org/doc/html/latest/) - Detailed specifications of kernel subsystems, memory management, and syscall layouts.
*   **Filesystem Hierarchy Standard (FHS):** [Linux Foundation FHS Spec](https://refspecs.linuxfoundation.org/fhs.shtml) - The official standard governing directory structures and file placements on UNIX-like OS systems.
*   **Processor Architectures:** [Intel Software Developer Manuals](https://software.intel.com/content/www/us/en/develop/articles/intel-sdm.html) & [ARM Architecture Reference Manuals](https://developer.arm.com/documentation) - Official hardware execution guides detailing instruction pipelines, registers, and memory caching structures.

---

## Prerequisites

- [AWS Well-Architected Framework](../02-solutions-architect-professional/well-architected-framework.md)

## Recommended Next Topics

- [Cloudfront](../01-developer-associate/2-aws-deep-dive/cloudfront.md)

## Related Topics

- [Beginner Study Roadmap](beginner-roadmap.md)
- [Phase 0: Foundation Bridge Overview](0-intro.md)
- [Module 2: Linux Fundamentals](2-linux-fundamentals.md)
