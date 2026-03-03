#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const BACKEND_CHANGELOG = path.join(__dirname, "..", "backend", "CHANGELOG.md");
const FRONTEND_CHANGELOG = path.join(__dirname, "..", "frontend", "CHANGELOG.md");

// Template untuk Unreleased yang kosong
const UNRELEASED_TEMPLATE = `## [Unreleased]

### Added (Ditambahkan)
- 

### Changed (Diubah)
- 

### Fixed (Diperbaiki)
- 

### Removed (Dihapus)
- 
`;

// Baca versi terakhir dari file CHANGELOG
function getLastVersionFromChangelog(content) {
  const versionRegex = /^##\s*\[(\d+\.\d+\.\d+)\]/gm;
  const matches = [...content.matchAll(versionRegex)];
  
  if (matches.length === 0) return null;
  
  // Ambil versi tertinggi
  const versions = matches.map(m => m[1]);
  versions.sort((a, b) => {
    const [aMaj, aMin, aPat] = a.split(".").map(Number);
    const [bMaj, bMin, bPat] = b.split(".").map(Number);
    if (aMaj !== bMaj) return bMaj - aMaj;
    if (aMin !== bMin) return bMin - aMin;
    return bPat - aPat;
  });
  
  return versions[0];
}

// Increment versi (minor by default, karena ini release)
function incrementVersion(version) {
  const [major, minor, patch] = version.split(".").map(Number);
  return `${major}.${minor + 1}.0`;
}

// Extract konten dari section Unreleased
function extractUnreleasedContent(content) {
  const lines = content.split("\n");
  let inUnreleased = false;
  let unreleasedLines = [];
  let unreleasedStart = -1;
  let unreleasedEnd = -1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Mulai section Unreleased
    if (line.match(/^##\s*\[Unreleased\]/i)) {
      inUnreleased = true;
      unreleasedStart = i;
      continue;
    }
    
    // Akhir section Unreleased (ketemu ## berikutnya atau ---)
    if (inUnreleased && (line.match(/^##\s*\[/) || line.trim() === "---")) {
      unreleasedEnd = i;
      break;
    }
    
    if (inUnreleased) {
      unreleasedLines.push(line);
    }
  }
  
  // Jika tidak ketemu akhir, sampai akhir file
  if (inUnreleased && unreleasedEnd === -1) {
    unreleasedEnd = lines.length;
  }
  
  return {
    content: unreleasedLines.join("\n"),
    startLine: unreleasedStart,
    endLine: unreleasedEnd,
    lines: lines
  };
}

// Cek apakah Unreleased punya konten yang meaningful
function hasContent(unreleasedContent) {
  // Hapus semua section headers dan cek apakah ada teks selain "-"
  const cleaned = unreleasedContent
    .replace(/^###.*$/gm, "")  // Hapus headers
    .replace(/^\s*-\s*$/gm, "") // Hapus bullet kosong
    .replace(/\s+/g, "")       // Hapus whitespace
    .trim();
  
  return cleaned.length > 0;
}

function updateChangelog(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`File tidak ditemukan: ${filePath}`);
      return false;
    }
    
    const content = fs.readFileSync(filePath, "utf-8");
    
    // Extract Unreleased content
    const unreleased = extractUnreleasedContent(content);
    
    if (unreleased.startLine === -1) {
      console.log(`Tidak menemukan section [Unreleased] di ${filePath}`);
      return false;
    }
    
    // Cek apakah ada konten
    if (!hasContent(unreleased.content)) {
      console.log(`Section [Unreleased] kosong di ${filePath}, skip...`);
      return false;
    }
    
    // Dapatkan versi baru
    const lastVersion = getLastVersionFromChangelog(content) || "0.0.0";
    const newVersion = incrementVersion(lastVersion);
    const date = new Date().toISOString().split("T")[0];
    
    console.log(`${path.basename(filePath)}: ${lastVersion} -> ${newVersion}`);
    
    // Buat section versi baru dari konten Unreleased
    const newVersionSection = `## [${newVersion}] - ${date}\n${unreleased.content.trim()}`;
    
    // Rebuild file:
    // 1. Bagian sebelum Unreleased
    // 2. Unreleased template kosong
    // 3. Section versi baru
    // 4. Bagian setelah Unreleased (versi lama)
    
    const lines = unreleased.lines;
    const beforeUnreleased = lines.slice(0, unreleased.startLine).join("\n");
    const afterUnreleased = lines.slice(unreleased.endLine).join("\n");
    
    const newContent = [
      beforeUnreleased,
      UNRELEASED_TEMPLATE,
      "",
      newVersionSection,
      "",
      afterUnreleased
    ].join("\n");
    
    // Bersihkan multiple blank lines
    const cleanedContent = newContent.replace(/\n{4,}/g, "\n\n\n");
    
    fs.writeFileSync(filePath, cleanedContent, "utf-8");
    console.log(`Updated: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log("========================================");
  console.log("  RELEASE: Memindahkan Unreleased ke Versi Baru");
  console.log("========================================\n");
  
  let updated = false;
  
  // Update backend CHANGELOG
  if (updateChangelog(BACKEND_CHANGELOG)) {
    updated = true;
  }
  
  // Update frontend CHANGELOG
  if (updateChangelog(FRONTEND_CHANGELOG)) {
    updated = true;
  }
  
  if (updated) {
    console.log("\n? CHANGELOG berhasil diupdate!");
    console.log("   - Konten [Unreleased] dipindahkan ke versi baru");
    console.log("   - Section [Unreleased] dikosongkan");
  } else {
    console.log("\n??  Tidak ada perubahan. Pastikan section [Unreleased] berisi konten.");
  }
}

main();
