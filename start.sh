#!/bin/bash

echo "🚀 Starting MyOS App..."
echo ""

# Öffne Backend VSCode
echo "📂 Opening Backend in VSCode..."
code backend &

# Öffne Frontend VSCode
echo "📂 Opening Frontend in VSCode..."
code frontend &

# Starte beide Server
echo "⚡ Starting servers..."
(cd backend && npm run dev) &
(cd frontend && npm run dev) &

wait