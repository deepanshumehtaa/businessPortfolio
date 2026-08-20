#!/usr/bin/env bash

# ==============================================================================
# Production Startup & Process Manager Script
# Enterprise Software Solutions Portfolio (Full-Stack Next.js)
# ==============================================================================

set -e

# ANSI Color Codes
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ------------------------------------------------------------------------------
# STEP 0: ENSURE MODERN NODE.JS (>= v18) ENVIRONMENT
# ------------------------------------------------------------------------------
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [ ! -d "$NVM_DIR" ] && [ -d "/root/.nvm" ]; then
    export NVM_DIR="/root/.nvm"
fi

if [ -s "$NVM_DIR/nvm.sh" ]; then
    . "$NVM_DIR/nvm.sh"
fi

# Prepend candidate NVM bin paths to PATH
for nvm_bin in "$NVM_DIR/versions/node/"*/bin; do
    if [ -d "$nvm_bin" ]; then
        export PATH="$nvm_bin:$PATH"
    fi
done
export PATH="$HOME/.local/bin:$PATH"

# Verify node version >= 18
NODE_MAJOR=0
if command -v node &> /dev/null; then
    NODE_MAJOR=$(node -v | cut -d'.' -f1 | sed 's/[^0-9]//g')
fi

if [ "$NODE_MAJOR" -lt 18 ]; then
    echo -e "${YELLOW}Detected missing or legacy Node.js version (v${NODE_MAJOR}). Upgrading to Node.js v22 via NVM...${NC}"
    if ! command -v nvm &> /dev/null; then
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    fi
    nvm install 22
    nvm use 22
    export PATH="$NVM_DIR/versions/node/$(nvm current)/bin:$PATH"
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FE_DIR="${ROOT_DIR}/bizz_fe"
PORT=3000

echo -e "${CYAN}======================================================${NC}"
echo -e "${CYAN}   🚀 SOFTWARE SOLUTIONS PRODUCTION DEPLOYMENT   ${NC}"
echo -e "${CYAN}======================================================${NC}"

# ------------------------------------------------------------------------------
# STEP 1: PORT CHECK & PROCESS TERMINATION
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}[1/4] Checking port ${PORT}...${NC}"

kill_port() {
    local P=$1
    if fuser ${P}/tcp >/dev/null 2>&1; then
        echo -e "${YELLOW}Port ${P} is currently in use. Terminating existing process...${NC}"
        fuser -k ${P}/tcp || true
        sleep 1
    elif lsof -t -i:${P} >/dev/null 2>&1; then
        echo -e "${YELLOW}Port ${P} is currently in use. Killing process PID...${NC}"
        lsof -t -i:${P} | xargs kill -9 2>/dev/null || true
        sleep 1
    else
        echo -e "${GREEN}Port ${P} is free.${NC}"
    fi
}

kill_port ${PORT}

# ------------------------------------------------------------------------------
# STEP 2: VERIFY TOOLCHAIN (PNPM, PM2)
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}[2/4] Verifying toolchain (pnpm, pm2)...${NC}"

# Check PNPM
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}Installing pnpm globally via npm...${NC}"
    npm install -g pnpm
fi
echo -e "${GREEN}✔ pnpm version: $(pnpm --version)${NC}"

# Check PM2
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}'pm2' is not installed. Installing pm2 globally...${NC}"
    npm install -g pm2
fi
echo -e "${GREEN}✔ pm2 version: $(pm2 --version)${NC}"

# ------------------------------------------------------------------------------
# STEP 3: FRONTEND SETUP & PRODUCTION BUILD
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}[3/4] Building Next.js Application (bizz_fe)...${NC}"
cd "${FE_DIR}"

export NODE_OPTIONS="--max-old-space-size=2048"
export NEXT_TELEMETRY_DISABLED=1
export CI=true

if [ ! -d "node_modules" ]; then
    echo -e "${CYAN}Installing dependencies via pnpm...${NC}"
    pnpm install --no-verify-store-integrity
else
    echo -e "${GREEN}✔ Dependencies (node_modules) already present. Skipping install.${NC}"
fi

echo -e "${CYAN}Building Next.js production bundle...${NC}"
pnpm build

# ------------------------------------------------------------------------------
# STEP 4: PM2 PROCESS MANAGEMENT
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}[4/4] Launching application using PM2...${NC}"
cd "${ROOT_DIR}"

# Stop any existing PM2 process for this project
pm2 delete bizz_be_api 2>/dev/null || true
pm2 delete bizz_fe_app 2>/dev/null || true

# Start Frontend (Next.js) via PM2
echo -e "${CYAN}Starting Production Web Server on port ${PORT} with PM2...${NC}"
pm2 start pnpm \
    --name "bizz_fe_app" \
    --cwd "${FE_DIR}" \
    -- start --port ${PORT}

# Save PM2 state
pm2 save

echo -e "\n${GREEN}======================================================${NC}"
echo -e "${GREEN}   ✨ DEPLOYMENT COMPLETED SUCCESSFULLY!   ${NC}"
echo -e "${GREEN}======================================================${NC}"
echo -e "${CYAN}Web Application:${NC} http://localhost:${PORT}/"
echo -e "${CYAN}Admin Panel:${NC}     http://localhost:${PORT}/admin"
echo -e "${CYAN}API Services:${NC}    http://localhost:${PORT}/api/services/"
echo -e "\n${YELLOW}PM2 Process Status:${NC}"
pm2 status
