import { exec } from "child_process";
import fs from "fs";
import path from "path";

export const run = async (req, res) => {
    const { language, code } = req.body;
    // const userId = req.userId

    if (!language || !code) {
        return res.status(400).json({ error: "Missing language or code" });
    }

    // Create a temp folder for files
    const folderPath = path.join(process.cwd(), "temp");
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);

    let fileName = "";
    let command = "";

    switch (language) {
        case "javascript":
            fileName = "main.js";
            command = `node ${fileName}`;
            break;

        case "python":
            fileName = "main.py";
            command = `python ${fileName}`;
            break;

        case "java":
            fileName = "Main.java";
            command = `javac ${fileName} && java Main`;
            break;

        case "c":
            fileName = "app.c";
            command =
                process.platform === "win32"
                    ? `gcc ${fileName} -o app.exe && app.exe`
                    : `gcc ${fileName} -o app && ./app`;
            break;

        case "cpp":
            fileName = "app.cpp";
            command =
                process.platform === "win32"
                    ? `g++ ${fileName} -o app.exe && app.exe`
                    : `g++ ${fileName} -o app && ./app`;
            break;

        default:
            return res.status(400).json({ error: "Unsupported language" });
    }

    const filePath = path.join(folderPath, fileName);

    // ✍ Write the code to a temp file
    try {
        fs.writeFileSync(filePath, code);
    } catch (err) {
        return res.status(500).json({ error: "Error writing file" });
    }

    // ⚙ Execute the code inside temp directory
    exec(command, { cwd: folderPath, shell: true }, (err, stdout, stderr) => {
        // 🧹 delete /  Clean up files after execution (extenstion name delete)
        try {
            const exeFile = path.join(folderPath, process.platform === "win32" ? "app.exe" : "app");
            const classFile = path.join(folderPath, "Main.class");

            if (fs.existsSync(classFile)) fs.unlinkSync(classFile);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            if (fs.existsSync(exeFile)) fs.unlinkSync(exeFile);
        } catch {
            // ignore cleanup errors
        }

        // ⚡ Return result
        if (err) {
            return res.json({ error: stderr || err.message });
        }
        res.json({ output: stdout || "No output" });
    });
};


