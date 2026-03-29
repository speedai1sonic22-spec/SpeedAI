#!/bin/bash
# SpeedAI Sonic 1.0 - Terminal Installer
# Downloads, unlocks, and launches the installer automatically.

echo "🚀 Installing SonicAI..."

PKG_URL="https://speedai1sonic22-spec.github.io/SpeedAI/SonicAI_AutoInstall.zip"
INSTALL_PATH="$HOME/Desktop/SonicAI_AutoInstall.zip"
EXTRACT_PATH="$HOME/Desktop/SonicAI_AutoInstall.pkg"

echo "📦 Downloading Sonic 1.0 (Zip)..."
curl -L "$PKG_URL" -o "$INSTALL_PATH"

echo "🔓 Unzipping installer..."
unzip -o "$INSTALL_PATH" -d "$HOME/Desktop" 2>/dev/null

echo "🛡️  Unlocking security permissions..."
xattr -rd com.apple.quarantine "$EXTRACT_PATH" 2>/dev/null

chmod +x "$EXTRACT_PATH" 2>/dev/null

echo "🎬 Launching Installer..."
open "$EXTRACT_PATH"

echo "✨ Done! SonicAI installer is running."
rm "$INSTALL_PATH" 2>/dev/null

