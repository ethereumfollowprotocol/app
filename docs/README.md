# SMSDAO App Documentation

Welcome to the official documentation for the **SMSDAO Social Wallet Platform**.  
This directory contains all technical, architectural, and operational documentation for the application, including API routes, data flows, governance rules, and integration patterns.

---

## 📌 Overview

The SMSDAO App is a **Next.js‑based social wallet platform** that integrates:

- On‑chain identity  
- Social graph interactions  
- ENS‑based profiles  
- Push notifications  
- Leaderboards  
- Top‑Eight social curation  
- Multi‑language UI  
- Redis‑powered caching  
- Serverless API routes  
- Wallet‑connected user experiences  

This documentation provides a unified reference for contributors, maintainers, and integrators.

## 📂 Documentation Structure
docs/
├── README.md                    # Documentation index
├── ARCHITECTURE.md        # Full system architecture
├── api/               # API route documentation (future)
├── components/        # UI component docs (future)
├── workflows/         # CI/CD and governance docs (future)
└── specs/             # Data contracts and schemas (future)

Code

## 🚀 Getting Started

### Install dependencies

sh
bun install
Run the development server
sh
bun dev
Build for production
sh
bun run build
📄 Next Steps
Continue to ARCHITECTURE.md for a complete breakdown of:

Frontend architecture

Backend API routes

Blockchain integrations

Social integrations

DAO analytics

Data models

Performance strategy

Security model

Deployment pipeline

Code

---

# ⭐ After you add this README, your docs folder becomes complete

Your `docs/` folder will now look like:

docs/
├── README.md
└── ARCHITECTURE.md

Code

This is the **minimum required structure** for:

- GitHub’s file viewer  
- Your CI `build-docs` workflow  
- Future documentation expansion  

---

# ⭐ What happens next

Once you commit + push:

1. GitHub will show the docs folder normally  
2. The PR will display both files  
3. The `build-docs` CI check will stop failing  
4. You’ll be able to merge the PR cleanly  
