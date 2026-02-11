# Next.js MongoDB Todo App

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb)

現代化全端 Todo List 應用，展示 Next.js 15、Server Actions、MongoDB 與完整 CI/CD 流程。

**[🚀 Live Demo](https://nextjs-mongodb-todo.vercel.app)** | **[📖 完整開發記錄](./DEVELOPMENT_RECORD.md)**

</div>

---

## 🎯 專案簡介

本專案為 **Viibe Coding 練習作品**，使用 AI 輔助開發，在 **4 小時內**完成從規劃到生產環境部署的完整全端應用。

**核心目標**：
- 實踐 Next.js 15 App Router 與 React 19 Server Components
- 建立專業級 CI/CD 自動化流程（GitHub Actions + Vercel）
- 展示現代化測試與部署最佳實踐
- 使用 Docker 確保開發環境一致性

**技術棧**：Next.js 15 · React 19 · TypeScript · MongoDB · Vitest · Docker · GitHub Actions · Vercel

---

## ✨ 技術亮點

### 🎨 現代化架構
- **Server Actions** - 零 API routes，型別安全的資料操作
- **React 19 Concurrent** - `useTransition` 實現流暢 UI 更新
- **VS Code Dark Theme** - 專業深色模式設計

### 🧪 完整測試與 CI/CD
- **三層自動化檢查** - Test → Lint → Type Check
- **整合測試覆蓋** - 完整 CRUD 流程與資料庫互動（41% coverage）
- **分支保護策略** - PR 必須通過所有檢查才能合併到 `main`

### 🚀 自動化部署
- **Production** - `main` 分支自動部署到 Vercel
- **Preview** - 每個分支和 PR 都有獨立預覽環境
- **Build 時間** - ~2 分鐘

---

## 🛠️ 技術棧

| 類別 | 技術 |
|------|------|
| **框架** | Next.js 15, React 19, TypeScript |
| **資料庫** | MongoDB (Mongoose), Zod 驗證 |
| **UI** | shadcn/ui, Tailwind CSS, Lucide Icons |
| **測試** | Vitest, React Testing Library |
| **CI/CD** | GitHub Actions, Vercel, Docker |

---

## 🚀 快速開始

```bash
# Clone 專案
git clone https://github.com/ken123183/nextjs-mongodb-todo.git
cd nextjs-mongodb-todo

# 設定環境變數
cp .env.example .env.local
# 編輯 .env.local，填入 MongoDB URI

# 使用 Docker 啟動（推薦）
docker run -it --rm -v ${PWD}:/app -w /app -p 3000:3000 node:24-alpine sh -c "npm install && npm run dev"

# 訪問 http://localhost:3000
```

**執行測試**：
```bash
docker run --rm -v ${PWD}:/app -w /app node:24-alpine npm run test:coverage
```

---

## 💼 專案成果

### 量化指標
- ⏱️ **開發時間**：~4 小時（含測試與部署）
- ✅ **CI/CD 成功率**：100%（經除錯優化）
- 📊 **測試覆蓋率**：41%（核心 CRUD 完整覆蓋）
- 🚀 **部署速度**：~2 分鐘 Vercel build

### 技術挑戰與解決
1. **ESLint 型別錯誤** → 建立完整 TypeScript 型別系統
2. **Coverage 策略調整** → 移除強制門檻，保留報告生成
3. **MongoDB URI 解析** → 識別並修正連線字串格式
4. **Docker 環境配置** → 確保本地/CI/生產環境一致

完整開發過程與問題排查請見 **[DEVELOPMENT_RECORD.md](./DEVELOPMENT_RECORD.md)**

---

## 📚 專案結構

```
src/
├── app/              # Next.js App Router
├── components/
│   ├── todo/         # Todo 相關元件（AddTodo, TodoItem, TodoList）
│   └── ui/           # shadcn/ui 元件庫
├── server/
│   ├── actions.ts    # Server Actions (CRUD)
│   └── models/       # Mongoose Schema
└── tests/
    └── integration/  # 整合測試
```

---

## 🎓 學習資源

- **完整開發記錄**：[DEVELOPMENT_RECORD.md](./DEVELOPMENT_RECORD.md) - 包含所有 prompts、實作步驟、問題排查
- [Next.js 15 文件](https://nextjs.org/docs)
- [React Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Vercel 部署指南](https://vercel.com/docs)

---

## 👤 作者

**ken123183**

- 專案連結: [nextjs-mongodb-todo](https://github.com/ken123183/nextjs-mongodb-todo)
- Live Demo: [https://nextjs-mongodb-todo.vercel.app](https://nextjs-mongodb-todo.vercel.app)

---

<div align="center">

Made with ❤️ using Next.js 15 & Viibe Coding

**⭐ 如果這個專案對您有幫助，請給個 Star！**

</div>