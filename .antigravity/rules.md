# Antigravity Rules - 全端練習專案

## 語言與文件
- 所有文件、註解、Commit Message、思考過程（Thinking Process）必須使用**繁體中文（zh-TW）**。
- 除了程式碼中的變數、函式、類別名稱外，避免使用英文或簡體中文。

## Docker 環境規則
- 所有建置與執行任務請使用 Docker 容器。
- 預設 Node.js 環境：使用 node:24-alpine 映像。
- 執行 npm install / build / test 時，請先在 Docker 容器內運行。
- 常用指令範例：
  # 拉取 Node.js Docker 映像：
docker pull node:24-alpine
# 建立 Node.js 容器並啟動 Shell 工作階段：
docker run -it --rm --entrypoint sh node:24-alpine

## 強制技術棧
- Framework: Next.js 15 (App Router) + React 19 + TypeScript (strict)
- Styling: Tailwind CSS + shadcn/ui + lucide-react
- Database: MongoDB (MongoDB Atlas) + Mongoose 或 Prisma
- Auth: NextAuth.js v5 或 Clerk（可選）
- State: Zustand + React Query (TanStack Query)
- Form: react-hook-form + zod
- Testing: Vitest + React Testing Library + Playwright (E2E)
- Deployment: Vercel

## 程式碼風格與原則
- 使用 Server Components 為優先
- API 使用 Server Actions 或 tRPC（可選）
- 所有資料操作必須加上錯誤處理與 loading 狀態
- 元件必須加上明確的 TypeScript interface
- 使用 kebab-case 檔案名稱，camelCase 函式名稱
- 避免使用 any，優先使用 unknown 或具體型別
- 每新增一個重要功能都要寫對應的 unit test 或 E2E test

## 專案結構（強制）
src/
├── app/                 # Next.js pages & layouts
├── components/          # shadcn/ui + 自訂元件
├── lib/                 # db, prisma, utils
├── hooks/
├── types/
├── server/              # API routes, actions, trpc
└── tests/               # Vitest & Playwright

## 其他要求
- 使用 shadcn/ui 元件
- 優先使用 Server Actions
- 環境變數使用 .env.local
- 每次新增功能都要先規劃步驟