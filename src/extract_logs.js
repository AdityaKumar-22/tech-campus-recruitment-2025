const fs = require("fs");
const readline = require("readline");
const path = require("path");

async function extractLogs(logFilePath, targetDate) {
    try {
        // Check if the log file exists
        if (!fs.existsSync(logFilePath)) {
            console.error("❌ Error: Log file not found.");
            return;
        }

        // Create a read stream for large files
        const fileStream = fs.createReadStream(logFilePath);
        const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

        // Define the output directory and file path
        const outputDir = path.join(__dirname, "../output"); // Adjusted output path
        const outputFile = path.join(outputDir, `output_${targetDate}.txt`);

        // Ensure the output directory exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const writeStream = fs.createWriteStream(outputFile);

        console.log(`🔍 Extracting logs for ${targetDate}...`);

        let found = false;
        for await (const line of rl) {
            if (line.startsWith(targetDate)) {
                writeStream.write(line + "\n");
                found = true;
            }
        }

        writeStream.end();
        if (found) {
            console.log(`✅ Logs for ${targetDate} saved in: ${outputFile}`);
        } else {
            console.log(`⚠️ No logs found for ${targetDate}`);
        }
    } catch (error) {
        console.error("❌ Error processing log file:", error);
    }
}

// Get the date argument from the command line
const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error("⚠️ Usage: node src/extract_logs.js <YYYY-MM-DD>");
    process.exit(1);
}

const targetDate = args[0];
const logFilePath = path.join(__dirname, "logs_2024.log"); // Adjusted to look inside src/

extractLogs(logFilePath, targetDate);
