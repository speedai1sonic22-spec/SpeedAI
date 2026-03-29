#!/bin/bash
# SpeedAI Sonic 1.0 - Terminal Installer
# Downloads, unlocks, and launches the installer automatically.

echo "🚀 Installing SonicAI..."

PKG_URL="https://speedai1sonic22-spec.github.io/SpeedAI/SonicAI_AutoInstall.pkg"
INSTALL_PATH="$HOME/Desktop/SonicAI_AutoInstall.pkg"

echo "📦 Downloading Sonic 1.0..."
curl -L "$PKG_URL" -o "$INSTALL_PATH"

echo "🛡️  Unlocking security permissions..."
xattr -rd com.apple.quarantine "$INSTALL_PATH" 2>/dev/null

chmod +x "$INSTALL_PATH" 2>/dev/null

echo "🎬 Launching Installer..."
open "$INSTALL_PATH"

echo "✨ Done! SonicAI installer is running."


