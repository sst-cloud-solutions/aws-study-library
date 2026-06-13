---
sidebar_position: 8
sidebar_label: "Module 7: Servers & Infrastructure"
---

# Module 7: Servers & Infrastructure

Cloud infrastructure is built on top of physical data centers. This module covers virtualization mechanics, Type 1 vs. Type 2 hypervisors, block, file, and object storage systems, load balancing algorithms, and high availability architectures.

---

## 7.1 Virtualization & Hypervisors

Virtualization uses a software layer to abstract physical hardware, allowing a single physical computer (Host) to run multiple isolated operating systems (Guests) simultaneously.

```
       Type 1 Hypervisor (Bare-Metal)              Type 2 Hypervisor (Hosted)
  ┌──────────────────────────────────────┐  ┌──────────────────────────────────────┐
  │  VM 1 (Guest OS)   VM 2 (Guest OS)   │  │  VM 1 (Guest OS)   VM 2 (Guest OS)   │
  ├──────────────────────────────────────┤  ├──────────────────────────────────────┤
  │    Hypervisor (ESXi, KVM, Xen)       │  │    Hypervisor (VirtualBox, VMware)   │
  ├──────────────────────────────────────┤  ├──────────────────────────────────────┤
  │          Physical Hardware           │  │   Host Operating System (Windows)    │
  │     (CPU, RAM, Storage, Network)     │  ├──────────────────────────────────────┤
  │                                      │  │          Physical Hardware           │
  └──────────────────────────────────────┘  └──────────────────────────────────────┘
```

### 7.1.1 Type 1 (Bare-Metal) Hypervisors
Type 1 hypervisors install and execute directly on the raw physical host hardware. There is no host operating system underneath. The hypervisor acts as the minimal kernel-level operating system itself, directly managing CPU threads, memory allocations, and hardware buses.
*   **Characteristics:** Near-native execution speeds, extremely low virtualization latency/overhead, and strong security boundaries (no guest VM can access another's memory space).
*   **Real-world Examples:**
    *   **VMware ESXi:** The industry standard for enterprise data centers.
    *   **Linux KVM (Kernel-based Virtual Machine):** A module that converts the Linux operating system kernel itself into a Type 1 hypervisor, allowing guest VMs to run as native Linux processes scheduled directly by the Linux kernel.
    *   **Microsoft Hyper-V:** Directly controls the hardware layer, running the primary management OS (Windows) as a high-privileged virtual partition.
*   **Use Cases:** Enterprise data centers, high-performance database hosts, and public cloud infrastructure.

### 7.1.2 Type 2 (Hosted) Hypervisors
Type 2 hypervisors execute as an application layer inside a standard, pre-existing host operating system (such as Windows, macOS, or desktop Linux distros).
*   **Characteristics:** Higher resource overhead and latency. When a guest VM executes a system call to read from its virtual disk, the request must go from the VM to the Type 2 hypervisor, then through the Host OS kernel system calls, and finally to the physical storage device controller.
*   **Real-world Examples:**
    *   **Oracle VM VirtualBox:** A popular, open-source hosted hypervisor for local development.
    *   **VMware Workstation Pro / Player:** Runs on Windows and Linux desktops.
    *   **Parallels Desktop:** Optimized to run Windows guest VMs on macOS computers.
*   **Use Cases:** Local developer sandboxes, running legacy desktop software, and sandbox software testing.

### 7.1.3 Abstraction of Guest VMs
The hypervisor partitions physical hardware resources into virtual hardware resources:
*   **vCPU (Virtual CPU):** Time-sliced allocations of physical CPU threads. The hypervisor executes VM instructions on physical cores based on scheduling algorithms.
*   **Memory Overcommit:** Allocating more virtual RAM to guest VMs than exists physically on the host. The hypervisor dynamically swaps idle memory pages to disk to maximize utilization.
*   **Virtual Disk Images:** Large single files (like `.vmdk` or `.qcow2` files) stored on the host filesystem that the guest VM sees as raw block drives.

---

## 7.2 Storage Architecture Matrix

Enterprise server storage falls into three primary architectures:

| Feature | Block Storage | Network File Storage | Object Storage |
| :--- | :--- | :--- | :--- |
| **Structure** | Flat raw sectors (blocks). | Hierarchical folders and files. | Flat namespace of unique keys. |
| **Access Protocol** | SCSI, iSCSI, Fibre Channel. | NFS (UNIX), SMB (Windows). | HTTP REST APIs (GET, PUT, DELETE). |
| **Latency** | Ultra-low (microseconds). | Medium (milliseconds). | High (tens of milliseconds). |
| **Multi-Client Access** | No (Exclusive mount to one server). | Yes (Concurrent read/write by many). | Yes (Concurrent API access globally). |
| **Metadata** | None (formatting details only). | Basic (permissions, dates, size). | Unlimited customizable metadata tags. |
| **Scale Limit** | High (capacity of volume limits). | High (filesystem limit bounds). | Theoretically infinite scale. |

*   **Block Storage:** behaving like a raw, unformatted local hard drive. The operating system must partition and format the volume with a filesystem (like `ext4` or `NTFS`) before use.
*   **Network File Storage:** Shares files over a local network. Multiple servers can mount the same share, making it ideal for shared application state or assets.
*   **Object Storage:** Stores data as isolated "objects" containing the binary payload, unique identifiers, and metadata tags. Perfect for storing un-structured files (media, backups, logs).

---

## 7.3 High Availability (HA) & Load Balancing

High Availability ensures that if a hardware, network, or server component fails, the application continues to run without downtime.

### 7.3.1 HA Topologies
*   **Active-Active (Simultaneous Load):** Multiple active server nodes run concurrently behind a load balancer. The load balancer actively routes client requests across all servers in the pool. If any node crashes, the load balancer detects it and redistributes traffic to the remaining healthy nodes. This design simultaneously increases processing capacity and provides full redundancy.
*   **Active-Passive (Hot Standby):** Only one primary server handles all client traffic, while a secondary passive server sits idle as a backup.
    *   **Heartbeat Health Probes:** The passive backup server continuously monitors the active primary server by sending periodic ping requests ("heartbeats") over a private network connection.
    *   **Failover Mechanics:** If the active server crashes, it stops responding to heartbeats. Once a threshold is crossed (e.g. 3 consecutive failed pings), the passive server initiates a **Failover**:
        1.  It automatically assumes the network identity (IP address) of the primary server using Virtual Router Redundancy Protocol (VRRP).
        2.  It mounts the shared network storage volumes.
        3.  It starts the application service processes and begins accepting client requests.
    *   **Active vs. Passive Routing:** In active routing, the load balancer actively forwards requests to all nodes in the pool. In passive routing, the load balancer/DNS server directs 100% of the traffic to the single active node, only routing traffic to the passive node if the active node's health check status turns unhealthy.

### 7.3.2 Load Balancing Algorithms
Load balancers distribute incoming client requests across backend servers using specific scheduling algorithms:
*   **Round Robin:** Routes requests sequentially down the list of servers. Simple, but assumes all servers have equal capacity.
*   **Least Connections:** Routes the request to the server with the fewest active TCP connections. Ideal for long-lived queries or transactions.
*   **IP Hash:** Hashes the client's IP address to select a server. This guarantees that a specific client always routes to the same backend server (Session Stickiness).

---

## 7.4 Scalability Models

When application load increases, infrastructure must scale to meet demand:

```
            Vertical Scaling (Scale Up)             Horizontal Scaling (Scale Out)
                ┌────────────────┐                        ┌───┐   ┌───┐   ┌───┐
                │                │                        │   │   │   │   │   │
                │   CPU + RAM    │                        └───┘   └───┘   └───┘
                │    Enriched    │                      Server 1 Server 2 Server 3
                └────────────────┘
               Resize Single Server                     Add More Server Nodes
```

*   **Vertical Scaling (Scale Up):** Adding more CPU cores, RAM, or faster storage to a single server.
    *   *Limitations:* Hardware has physical caps (maximum slots on a motherboard). Also, changing resources usually requires a reboot, causing downtime.
*   **Horizontal Scaling (Scale Out):** Adding more identical server nodes to the pool.
    *   *Benefits:* Infinite scalability limits. Updates and scaling occur dynamically with zero downtime.

---

## 7.5 Official Infrastructure References & Resources

To read official specifications and detailed manuals:
*   **Linux KVM Project:** [Kernel-based Virtual Machine Doc](https://www.linux-kvm.org/page/Main_Page) - Official specification manuals for native Linux virtualization.
*   **Xen Project:** [Xen Project Documentation](https://www.xenproject.org/help/documentation.html) - Architecture manuals detailing hypervisor hypercalls and paravirtualization rules.
*   **SNIA Storage Standards:** [Storage Networking Industry Association](https://www.snia.org/) - Official definitions and specifications for block, file, and object storage architectures.
