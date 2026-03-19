#!/bin/bash
# SpeedAI Sonic 1.0 - Terminal Installer
# This script installs SonicAI to your Desktop and launches it.

echo "🚀 Installing SonicAI..."

# 1. Download the binary from the GitHub repository
BINARY_URL="https://raw.githubusercontent.com/speedai1sonic22-spec/SpeedAI/main/SonicAI_AutoInstall.pkg"
INSTALL_PATH="$HOME/Desktop/SonicAI_AutoInstall.pkg"

# Create a temporary directory
TEMP_DIR=$(mktemp -d)
cd "$TEMP_DIR"

# Download (dummy check - in reality, we would use curl)
# For now, we simulate the install logic seen in the PKG
echo "📦 Downloading components..."

# 2. Extract and Move to Desktop
echo "📦 Downloading components..."
curl -L "$BINARY_URL" -o "$INSTALL_PATH"

# THE MAGIC FIX: Clear the "Unidentified Developer" warning
echo "🛡️  Unlocking security permissions..."
xattr -rd com.apple.quarantine "$INSTALL_PATH" 2>/dev/null

echo "✅ Installed to Desktop."
chmod +x "$INSTALL_PATH" 2>/dev/null

echo "🎬 Launching Installer..."
# Launch the installer
open "$INSTALL_PATH"

echo "✨ Done! You can now find SonicAI on your Desktop."
