# Discussion.md

## Solutions Considered

### 1. **Brute Force Approach (Line-by-Line Scanning)**
- Read the file line by line and check if the log entry starts with the target date.
- Write matching lines to the output file.
- **Pros:** Simple to implement.
- **Cons:** Extremely slow for a 1TB file since it requires scanning the entire file.

### 2. **Memory Mapping (Buffers)**
- Load the file in chunks using memory mapping.
- Search for the target date within the mapped memory region.
- **Pros:** Reduces memory overhead by avoiding loading the entire file into RAM.
- **Cons:** May not work well for extremely large files due to OS limitations.

### 3. **Efficient Stream Processing (Final Chosen Solution)**
- Read the file **line-by-line using streams** (Node.js `readline` module) to optimize memory usage.
- Match each line against the target date.
- Write matching lines to the output file immediately.
- **Pros:**
  - Works well for large files as it avoids loading the entire file into memory.
  - Uses a constant memory footprint.
- **Cons:** Slightly slower than a pre-indexed approach but suitable for our use case.

---

## Final Solution Summary

### **Why I Chose Stream Processing?**
Looking at the constraint of a **1TB file**, I chose stream processing due to its efficiency and simplicity. It also avoids memory overload while ensuring a scalable solution that works with large log file size.



---

## Steps to Run

### **1. Install Node.js**
Ensure Node.js is installed on your system. You can check by running:
```sh
node -v
```

### **2. Download the Log File**
Run the following command in your terminal:
```sh
curl -L -o src/test_logs.log "https://limewire.com/d/90794bb3-6831-4e02-8a59-ffc7f3b8b2a3#X1xnzrH5s4H_DKEkT_dfBuUT1mFKZuj4cFWNoMJGX98"
```

### **3. Navigate to the `src/` Directory**
```sh
cd src
```

### **4. Run the Log Extraction Script**
```sh
node extract_logs.js YYYY-MM-DD
```
Example:
```sh
node extract_logs.js 2024-12-01
```

### **5. View the Output**
Extracted logs will be stored in the `output/` folder:
```sh
output/output_2024-12-01.txt
```

### **6. Verify the Output**
Check the extracted logs using:
```sh
cat ../output/output_2024-12-01.txt
```
