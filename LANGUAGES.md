# Languages Used in Codebase

An analysis of the languages utilized across the frontend, backend, configuration, and data storage systems of this repository.

## Summary of Languages

| Language / Technology | Extension | Primary Purpose / Role in Codebase | File Count | Lines of Code (LOC) |
| :--- | :---: | :--- | :---: | :---: |
| **TypeScript (TSX)** | `.tsx` | React Components, Next.js page routing, user interface | 25 | 3,617 |
| **Python** | `.py` | Django Web Framework backend, ML/chatbot training & classification, API endpoints | 18 | 569 |
| **HTML** | `.html` | Chatbot widget template | 1 | 310 |
| **CSS** | `.css` | Global styling & design configuration | 1 | 84 |
| **JavaScript (ES Modules)** | `.mjs` | Scripts & build tool config (Next.js config, PostCSS configuration) | 2 | 32 |
| **TypeScript (Vanilla)** | `.ts` | Prisma client initialization and Next.js configuration settings | 2 | 23 |
| **Prisma Schema** | `.prisma` | Database schema definition, model structure, and migrations mapping | 1 | 21 |
| **JSON** | `.json` | Data assets, static ML training intent data, package/compiler metadata | 8 | 156,861 |

---

## Detailed Breakdown & Context

### 1. Frontend: TypeScript (`.tsx`, `.ts`) & CSS (`.css`)
- **Next.js with React:** The user interface uses **TypeScript with JSX (TSX)** to build React components, handle state, load 3D assets (e.g. GLB models), integrate the chatbot widget, and present the main web application page layouts.
- **Styling:** **CSS** (including Tailwind/PostCSS) is configured globally and utilized via Tailwind styles inside TSX files to style the interface.

### 2. Backend: Python (`.py`)
- **Django Web Framework:** Located in the `Backend/` directory, Python runs the Django backend server.
- **Machine Learning & Chatbot:** ML logic in `Backend/ml/` (like train intent classifiers) and Chatbot endpoints in `Backend/chatbot/` are written entirely in Python.

### 3. Database: Prisma (`.prisma`)
- The database schema is defined using **Prisma's declarative schema language** in `prisma/schema.prisma`. It handles structural design and database connection setup.

### 4. Integration: HTML (`.html`)
- An HTML file (`Backend/templates/chatbot/widget.html`) is used as a reusable chatbot widget page template, rendered or linked to the backend service.

### 5. Configuration & Build Scripts: JavaScript (`.mjs`) & JSON (`.json`)
- **Build Configurations:** Configuration files such as `postcss.config.mjs`, `next.config.ts`, `package.json`, and `tsconfig.json` manage package dependencies, styles processing, and target environments.
- **Large Datasets / JSON:** High line-count JSON files under `src/app/data/` and `groupedcars/` contain extensive datasets mapping car brands, model specifications, history, and ML intent data.
