#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const BACKEND_CHANGELOG = path.join(__dirname, "..", "backend", "CHANGELOG.md");
const FRONTEND_CHANGELOG = path.join(__dirname, "..", "frontend", "CHANGELOG.md");

function getNewCommits() {
  try {
    let command = "git log --format=\"%h|%s|%an\" -n 20";
    try {
      const lastTag = execSync("git describe --tags --abbrev=0", { encoding: "utf-8" }).trim();
      command = `git log ${lastTag}..HEAD --format=\"%h|%s|%an\"`;
    } catch (e) {
      console.log("No tag found. Using last 20 commits...");
    }
    const output = execSync(command, { encoding: "utf-8" });
    return output.split("\n").filter(line => line.trim()).map(line => {
      const [hash, message, author] = line.split("|");
      return { hash: hash?.trim() || "", message: message?.trim() || "", author: author?.trim() || "" };
    }).filter(c => c.message);
  } catch (error) {
    console.error("Error getting git logs:", error.message);
    return [];
  }
}

function categorizeCommits(commits) {
  const categories = { Added: [], Changed: [], Fixed: [], Removed: [], Other: [] };
  commits.forEach(commit => {
    const msg = commit.message.toLowerCase();
    if (msg.startsWith("feat:") || msg.startsWith("add:")) categories.Added.push(commit);
    else if (msg.startsWith("fix:") || msg.startsWith("bugfix:")) categories.Fixed.push(commit);
    else if (msg.startsWith("refactor:") || msg.startsWith("change:")) categories.Changed.push(commit);
    else if (msg.startsWith("remove:") || msg.startsWith("delete:")) categories.Removed.push(commit);
    else categories.Other.push(commit);
  });
  return categories;
}

function generateContent(commits, version) {
  const cat = categorizeCommits(commits);
  const date = new Date().toISOString().split("T")[0];
  let content = `## [${version}] - ${date}\n\n`;
  if (cat.Added.length > 0) {
    content += "### Added\n";
    cat.Added.forEach(c => content += `- ${c.message.replace(/^(feat|add):\s*/i, "")}\n`);
    content += "\n";
  }
  if (cat.Changed.length > 0) {
    content += "### Changed\n";
    cat.Changed.forEach(c => content += `- ${c.message.replace(/^(refactor|change):\s*/i, "")}\n`);
    content += "\n";
  }
  if (cat.Fixed.length > 0) {
    content += "### Fixed\n";
    cat.Fixed.forEach(c => content += `- ${c.message.replace(/^(fix|bugfix):\s*/i, "")}\n`);
    content += "\n";
  }
  if (cat.Removed.length > 0) {
    content += "### Removed\n";
    cat.Removed.forEach(c => content += `- ${c.message.replace(/^(remove|delete):\s*/i, "")}\n`);
    content += "\n";
  }
  if (cat.Other.length > 0) {
    content += "### Other\n";
    cat.Other.forEach(c => content += `- ${c.message}\n`);
    content += "\n";
  }
  return content;
}

function updateChangelog(filePath, newContent) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    let fileContent = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf-8") : "# CHANGELOG\n\nSemua perubahan penting pada proyek ini akan didokumentasikan di file ini.\n\n---\n\n## [Unreleased]\n\n";
    
    const lines = fileContent.split("\n");
    let insertIndex = -1;
    
    // Cari posisi SETELAH section [Unreleased] berakhir (sebelum ## berikutnya atau --- berikutnya)
    let foundUnreleased = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Cari [Unreleased] section
      if (line.match(/^##\s*\[Unreleased\]/i)) {
        foundUnreleased = true;
        continue;
      }
      
      // Setelah menemukan Unreleased, cari section ## berikutnya atau ---
      if (foundUnreleased) {
        if (line.match(/^##\s*\[/) || line === "---") {
          insertIndex = i;
          break;
        }
      }
    }
    
    // Jika tidak menemukan posisi yang tepat, cari setelah --- pertama
    if (insertIndex === -1) {
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() === "---") {
          // Cari ## [Unreleased] setelah ---
          for (let j = i + 1; j < lines.length; j++) {
            const line = lines[j].trim();
            if (line.match(/^##\s*\[Unreleased\]/i)) {
              // Cari akhir dari Unreleased section
              for (let k = j + 1; k < lines.length; k++) {
                if (lines[k].trim().match(/^##\s*\[/) || lines[k].trim() === "---") {
                  insertIndex = k;
                  break;
                }
              }
              if (insertIndex === -1) insertIndex = lines.length;
              break;
            }
          }
          if (insertIndex !== -1) break;
          // Jika tidak ada Unreleased, insert setelah ---
          insertIndex = i + 2;
          break;
        }
      }
    }
    
    if (insertIndex === -1) insertIndex = lines.length;
    
    // Insert new content dengan separator
    lines.splice(insertIndex, 0, "", newContent.trim(), "");
    
    fs.writeFileSync(filePath, lines.join("\n"), "utf-8");
    console.log(`Updated: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
    return false;
  }
}

function detectVersion() {
  try {
    const lastTag = execSync("git describe --tags --abbrev=0", { encoding: "utf-8" }).trim();
    const match = lastTag.match(/v?(\d+)\.(\d+)\.(\d+)/);
    if (match) return `${match[1]}.${match[2]}.${Number(match[3]) + 1}`;
    return "1.0.0";
  } catch (e) { return "1.0.0"; }
}

function main() {
  console.log("Updating CHANGELOG.md files...\n");
  const commits = getNewCommits();
  if (commits.length === 0) { console.log("No commits to document."); return; }
  console.log(`Found ${commits.length} commits\n`);
  const version = detectVersion();
  console.log(`Version: ${version}\n`);
  const content = generateContent(commits, version);
  console.log("Preview:\n" + "-".repeat(40) + "\n" + content + "-".repeat(40));
  updateChangelog(BACKEND_CHANGELOG, content);
  updateChangelog(FRONTEND_CHANGELOG, content);
  console.log("\nCHANGELOG update completed!");
}

main();
