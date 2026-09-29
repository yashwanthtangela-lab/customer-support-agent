# MemoryDesk AI – Customer Support Agent

[![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61dafb?logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Hindsight Memory](https://img.shields.io/badge/Memory-Hindsight%20AI-a855f7)](https://github.com/)
[![Status](https://img.shields.io/badge/Status-Foundation%20Ready-10b981)](#)

> **MemoryDesk AI** is an intelligent, high-velocity customer support agent application designed for modern SaaS organizations. Built for the hackathon, MemoryDesk AI pairs ultra-responsive customer support workflows with the **Hindsight long-term memory engine**, solving the persistent *support amnesia* dilemma by retaining customer infrastructure details, communication preferences, and past incident solutions across disconnected interactions.

---

## 🌟 Key Capabilities & Pages

| # | Page | Core Responsibilities |
|---|------|-----------------------|
| 1 | **Dashboard** | Real-time metric cards (**Total Tickets**, **Open Tickets**, **Resolved Tickets**, **Escalated Tickets**), SLA countdowns, and recent customer dialogue stream with quick reply routing. |
| 2 | **Customer Support Chat** | Tri-pane workspace showing **Customer Information**, interactive **Chat Messages & Input**, live **Ticket Details**, and the dedicated **"Memory Used" (Hindsight)** panel. |
| 3 | **Customers** | Complete directory of customers tracking **Customer Name**, **Customer ID**, **Email**, **Number of Tickets**, and **Last Interaction** with detail views and ticket history. |
| 4 | **Tickets** | Comprehensive triage desk featuring **Ticket ID**, **Customer**, **Issue Description**, **Priority**, **Status**, and **Created Date** with inline status updates and a ticket creation modal. |
| 5 | **Memory (Hindsight)** | Dedicated architectural and diagnostic page explaining how **Hindsight provides lifelong customer memory**, featuring the authentic UI for inspecting retrieved cross-session memories. |
| 6 | **Settings** | Zero-trust system controls, agent profile configuration, and server-side environment variable diagnostic monitors. |

---

## 🧠 Why Hindsight Long-Term Memory?

Traditional support chatbots are strictly session-bound. When an enterprise customer submits a new ticket or opens a new chat session, standard LLM contexts start empty, forcing customers to repeatedly re-explain:
- Their identity provider configs (e.g. SAML 2.0 vs OAuth)
- Custom webhook thresholds or rate limits
- Technical constraints and past incident resolutions

### The Hindsight Solution
**Hindsight** acts as an external semantic memory fabric:
1. **Cross-Session Persistence**: Extracts episodic facts, technical stack details, and resolution playbooks into persistent collections.
2. **Semantic & Temporal Retrieval**: Grounded memories are retrieved based on vector distance and decay, injecting the exact context needed into the agent prompt.
3. **Fact Consolidation**: Dynamically supersedes outdated statements when credentials or plans change.
4. **Tenant Isolation**: Ensures customer memories are strictly sandboxed per customer workspace.

> **Hackathon Integrity Note:** No synthetic "fake" Hindsight responses are generated. The UI presents the genuine memory schema and contract, ready for live API execution once credentials are provided in `.env`.

---

## 🛡️ Zero-Trust Security Architecture

- **No Secrets in Frontend**: Secret API keys (for Groq and Hindsight) are **never** bundled into the client build.
- **Server-Side Environment Variables**: All external API integrations reside strictly within the Express Node.js backend.
- **Strict Template**: All configurable parameters are documented in `.env.example`.

---

## 📁 Project Structure

```
customer support agent/
├── .env.example              # Root template for environment variables
├── .gitignore                # Git ignore configuration
├── package.json              # Orchestrates client & server concurrent launch
├── README.md                 # Complete documentation
│
├── server/                   # Node.js + Express Backend API
│   ├── .env.example          # Server environment template
│   ├── package.json          # Server dependencies (Express, CORS, dotenv)
│   ├── server.js             # Server entry point & route registration
│   ├── data/
│   │   └── mockData.js       # Seed dataset (Customers, Tickets, Hindsight schema)
│   └── routes/
│       ├── stats.js          # /api/stats (Dashboard KPIs & recent conversations)
│       ├── tickets.js        # /api/tickets (CRUD, filtering, status updates)
│       ├── customers.js      # /api/customers (Directory & ticket history)
│       ├── chat.js           # /api/chat (Active conversation & memory payload)
│       ├── memory.js         # /api/memory (Hindsight overview & retrieved memories)
│       └── settings.js       # /api/settings (System config & safe env checks)
│
└── client/                   # React + Vite Frontend
    ├── .env.example          # Safe client variables template (VITE_API_URL)
    ├── package.json          # React, Vite, Lucide-React
    ├── vite.config.js        # Vite config with /api reverse proxy to port 5000
    ├── index.html            # HTML shell with Plus Jakarta Sans typography
    ├── public/
    │   ├── favicon.svg       # Brand favicon
    │   └── bot-avatar.svg    # Support agent avatar
    └── src/
        ├── main.jsx          # React DOM entry point
        ├── App.jsx           # Master layout, navigation & views router
        ├── App.css           # Responsive layouts & grid media queries
        ├── index.css         # Modern dark SaaS design tokens & buttons
        ├── components/
        │   ├── Sidebar.jsx   # Responsive desktop & mobile drawer navigation
        │   ├── Header.jsx    # Top header, health monitor, new ticket button
        │   ├── MetricCard.jsx # KPI card with trend indicator and glows
        │   ├── StatusBadge.jsx   # Ticket status pill
        │   ├── PriorityBadge.jsx # Ticket priority pill
        │   └── MemoryPanel.jsx   # "Memory Used" Hindsight panel
        ├── pages/
        │   ├── Dashboard.jsx # Dashboard view
        │   ├── Chat.jsx      # Customer support chat view
        │   ├── Customers.jsx # Customers directory view
        │   ├── Tickets.jsx   # Support tickets desk view
        │   ├── Memory.jsx    # Hindsight long-term memory view
        │   └── Settings.jsx  # System settings & environment view
        └── services/
            └── api.js        # Unified fetch client for backend endpoints
```

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ (tested on Node.js v22.17.1)
- npm v10+

### 1. Install All Dependencies
Run the installation command in the root folder to install dependencies for the root, backend, and frontend in one step:
```bash
npm run install:all
```

*(Alternatively, you can install individually: `npm install`, then `cd server && npm install`, then `cd ../client && npm install`)*

### 2. Configure Environment Variables
Copy the `.env.example` file:
```bash
# In the root or server directory:
cp .env.example .env
cp server/.env.example server/.env
cp client/.env.example client/.env
```

### 3. Run Development Servers
From the root directory, launch both the Express backend (`http://localhost:5000`) and the Vite React frontend (`http://localhost:5173`) concurrently:
```bash
npm run dev
```

Alternatively, run each service in separate terminal tabs:
- **Terminal 1 (Backend Server):**
  ```bash
  cd server
  npm run dev
  ```
- **Terminal 2 (Frontend Client):**
  ```bash
  cd client
  npm run dev
  ```

Open your browser at **`http://localhost:5173`**.

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status and Hindsight configuration check |
| `GET` | `/api/stats` | KPI metrics (Total, Open, Resolved, Escalated) & recent conversations |
| `GET` | `/api/tickets` | Query tickets with filters (`status`, `priority`, `search`) |
| `POST` | `/api/tickets` | Create a new customer support ticket |
| `PATCH` | `/api/tickets/:id/status` | Update ticket status (`Open`, `In Progress`, `Resolved`, `Escalated`) |
| `GET` | `/api/customers` | Query customer directory with search support |
| `GET` | `/api/customers/:id` | Fetch specific customer with full ticket history |
| `GET` | `/api/chat/active` | Active chat session, customer context & Hindsight memory payload |
| `POST` | `/api/chat/message` | Send message and receive agent response |
| `POST` | `/api/chat/reset` | Reset demo chat session |
| `GET` | `/api/memory/overview` | Architectural summary and readiness state of Hindsight engine |
| `GET` | `/api/memory/retrieved` | Retrieved memory schema and records |
| `GET` | `/api/settings` | Server settings & safe environment variable status |
| `POST` | `/api/settings` | Update support desk settings |

---

## 🔜 Next Steps: Groq & Hindsight Integration

1. **Groq Integration**: Connect the backend chat route to Groq's high-speed inference engine (`llama-3.3-70b-versatile`) using `GROQ_API_KEY`.
2. **Hindsight Integration**: Wire the backend memory route to the official Hindsight client (`HINDSIGHT_API_KEY` and `HINDSIGHT_PROJECT_ID`) to automatically ingest completed support sessions and dynamically retrieve relevant memory anchors during live chat.
