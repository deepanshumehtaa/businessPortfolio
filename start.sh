#!/usr/bin/env bash

# ==============================================================================
# Production Startup & Process Manager Script
# Enterprise Software Solutions Portfolio
# ==============================================================================

set -e

# ANSI Color Codes
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BE_DIR="${ROOT_DIR}/bizz_be"
FE_DIR="${ROOT_DIR}/bizz_fe"

BE_PORT=8000
FE_PORT=3000

echo -e "${CYAN}======================================================${NC}"
echo -e "${CYAN}   🚀 SOFTWARE SOLUTIONS PRODUCTION DEPLOYMENT   ${NC}"
echo -e "${CYAN}======================================================${NC}"

# ------------------------------------------------------------------------------
# STEP 1: PORT CHECK & PROCESS TERMINATION
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}[1/5] Checking ports ${BE_PORT} and ${FE_PORT}...${NC}"

kill_port() {
    local PORT=$1
    if fuser ${PORT}/tcp >/dev/null 2>&1; then
        echo -e "${YELLOW}Port ${PORT} is currently in use. Terminating existing process...${NC}"
        fuser -k ${PORT}/tcp || true
        sleep 1
    elif lsof -t -i:${PORT} >/dev/null 2>&1; then
        echo -e "${YELLOW}Port ${PORT} is currently in use. Killing process PID...${NC}"
        lsof -t -i:${PORT} | xargs kill -9 2>/dev/null || true
        sleep 1
    else
        echo -e "${GREEN}Port ${PORT} is free.${NC}"
    fi
}

kill_port ${BE_PORT}
kill_port ${FE_PORT}

# ------------------------------------------------------------------------------
# STEP 2: VERIFY SYSTEM TOOLS (UV, PNPM, PM2)
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}[2/5] Verifying toolchain (uv, pnpm, pm2)...${NC}"

# Check UV
if ! command -v uv &> /dev/null; then
    echo -e "${YELLOW}'uv' tool not found. Installing uv...${NC}"
    curl -sSf https://astral.sh/uv/install.sh | sh
    export PATH="$HOME/.local/bin:$PATH"
fi
echo -e "${GREEN}✔ uv is ready: $(uv --version)${NC}"

# Check PNPM
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}Error: 'pnpm' is not installed. Installing pnpm globally via npm...${NC}"
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
# STEP 3: BACKEND SETUP & UVICORN PREPARATION
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}[3/5] Setting up Django Backend (bizz_be)...${NC}"
cd "${BE_DIR}"

# Create venv if missing
if [ ! -d ".venv" ]; then
    echo -e "${YELLOW}Creating Python virtual environment using uv...${NC}"
    uv venv .venv
else
    echo -e "${GREEN}✔ Virtual environment (.venv) located.${NC}"
fi

# Install Dependencies
echo -e "${CYAN}Installing backend Python dependencies...${NC}"
uv pip install -r requirements.txt --python .venv/bin/python

# Run Migrations & Seeding
echo -e "${CYAN}Running database migrations...${NC}"
.venv/bin/python manage.py migrate --noinput

echo -e "${CYAN}Seeding initial database tables...${NC}"
.venv/bin/python seed.py

# ------------------------------------------------------------------------------
# STEP 4: FRONTEND SETUP & PRODUCTION BUILD
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}[4/5] Setting up Next.js Frontend (bizz_fe)...${NC}"
cd "${FE_DIR}"

echo -e "${CYAN}Installing frontend dependencies via pnpm...${NC}"
pnpm install

echo -e "${CYAN}Building Next.js production bundle...${NC}"
pnpm build

# ------------------------------------------------------------------------------
# STEP 5: PM2 PROCESS MANAGEMENT
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}[5/5] Launching applications using PM2...${NC}"
cd "${ROOT_DIR}"

# Stop any existing PM2 processes for this project
pm2 delete bizz_be_api 2>/dev/null || true
pm2 delete bizz_fe_app 2>/dev/null || true

# Start Backend ASGI (Uvicorn) via PM2
echo -e "${CYAN}Starting Backend Uvicorn Server on port ${BE_PORT} with PM2...${NC}"
pm2 start "${BE_DIR}/.venv/bin/python" \
    --name "bizz_be_api" \
    --cwd "${BE_DIR}" \
    -- -m uvicorn bizz_be.asgi:application --host 0.0.0.0 --port ${BE_PORT} --workers 4

# Start Frontend (Next.js) via PM2
echo -e "${CYAN}Starting Frontend Production Server on port ${FE_PORT} with PM2...${NC}"
pm2 start pnpm \
    --name "bizz_fe_app" \
    --cwd "${FE_DIR}" \
    -- start --port ${FE_PORT}

# Save PM2 state
pm2 save

echo -e "\n${GREEN}======================================================${NC}"
echo -e "${GREEN}   ✨ DEPLOYMENT COMPLETED SUCCESSFULLY!   ${NC}"
echo -e "${GREEN}======================================================${NC}"
echo -e "${CYAN}Backend API:${NC}  http://localhost:${BE_PORT}/api/"
echo -e "${CYAN}Frontend App:${NC} http://localhost:${FE_PORT}/"
echo -e "${CYAN}Admin Panel:${NC}  http://localhost:${FE_PORT}/admin"
echo -e "\n${YELLOW}PM2 Process Status:${NC}"
pm2 status
