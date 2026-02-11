# Next.js 15 + AI 輔助開發 - 學習筆記

## 🎯 核心技術學習

### Next.js 15 關鍵特性

#### 1. Server Components（預設）

**概念**：
- 元件預設在伺服器端渲染
- 減少客戶端 JavaScript
- 直接訪問資料庫、檔案系統

**範例**：
```typescript
// Server Component（無需 'use client'）
export default async function TodoList() {
  const todos = await getTodos();  // 直接呼叫 Server Action
  return <div>{todos.map(...)}</div>;
}
```

**何時使用**：
- ✅ 資料獲取
- ✅ 靜態內容
- ✅ SEO 需求

#### 2. Server Actions

**概念**：
- 在伺服器端執行的函式
- 可從 Client/Server Components 呼叫
- 型別安全（TypeScript end-to-end）

**關鍵語法**：
```typescript
'use server';  // 標記為 Server Action

export async function createTodo(formData: FormData) {
  // 伺服器端程式碼
  await db.insert(...);
  revalidatePath('/');  // 重新驗證快取
}
```

**優勢**：
- 零 API routes
- 自動 serialization
- Progressive Enhancement

#### 3. Client Components

**何時需要 `'use client'`**：
- 使用 React Hooks（useState, useEffect, etc.）
- 事件處理（onClick, onChange）
- 瀏覽器 API（localStorage, window）

**範例**：
```typescript
'use client';  // 必須標記

import { useState, useTransition } from 'react';

export default function TodoItem({ todo }) {
  const [isPending, startTransition] = useTransition();
  
  const handleToggle = () => {
    startTransition(async () => {
      await toggleTodo(todo._id);  // 呼叫 Server Action
    });
  };
  
  return <Checkbox onCheckedChange={handleToggle} />;
}
```

---

### React 19 Concurrent Features

#### useTransition Hook

**用途**：
- 標記 state 更新為非緊急
- 保持 UI 響應性
- 提供 loading 狀態

**語法**：
```typescript
const [isPending, startTransition] = useTransition();

startTransition(() => {
  // 非緊急的 state 更新
});
```

**實際應用**：
```typescript
const handleDelete = () => {
  startTransition(async () => {
    await deleteTodo(id);
  });
};

return (
  <Button 
    onClick={handleDelete}
    disabled={isPending}  // 自動 loading 狀態
  >
    刪除
  </Button>
);
```

---

## 🛠️ 開發工具與環境

### Docker 開發環境

**為什麼使用 Docker？**
- 環境一致性（本地 = CI = Production）
- 無需本地安裝 Node.js
- 隔離依賴衝突

**基本指令模式**：
```bash
docker run --rm \
  -v ${PWD}:/app \      # 掛載專案目錄
  -w /app \             # 設定工作目錄
  -p 3000:3000 \        # Port mapping
  node:24-alpine \      # 使用 Node 24
  <COMMAND>             # 執行指令
```

**常用操作**：
```bash
# 安裝依賴
docker run --rm -v ${PWD}:/app -w /app node:24-alpine npm install

# 啟動開發伺服器
docker run -it --rm -v ${PWD}:/app -w /app -p 3000:3000 node:24-alpine npm run dev

# 執行測試
docker run --rm -v ${PWD}:/app -w /app node:24-alpine npm test
```

---

## 🧪 測試策略

### Vitest 設定

**核心配置**：
```typescript
// vitest.config.mts
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',      // 模擬瀏覽器環境
    globals: true,             // 全域 describe, it, expect
    setupFiles: ['./src/tests/setup.ts'],
    alias: {
      '@': path.resolve(__dirname, './src'),  // Path aliases
    },
  },
});
```

**環境變數載入**：
```typescript
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
```

### 整合測試 vs 單元測試

**整合測試**（已實作）：
- 測試完整流程（CRUD）
- 包含真實資料庫互動
- 使用 MongoDB service container

```typescript
describe('Todo CRUD Integration', () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  it('should create, update, delete todo', async () => {
    // 測試真實的 Server Actions
  });
});
```

**單元測試**（未來）：
- UI 元件測試
- 獨立函式測試
- 使用 mocks

---

## 🚀 CI/CD 實踐

### GitHub Actions Workflow

**三層檢查機制**：
```yaml
jobs:
  test:          # Vitest 整合測試
    - MongoDB service container
    - 執行全部測試
    
  lint:          # ESLint
    - 程式碼風格檢查
    
  type-check:    # TypeScript
    - 型別驗證（npx tsc --noEmit）
```

**MongoDB Service Container**：
```yaml
services:
  mongodb:
    image: mongo:7.0
    env:
      MONGO_INITDB_ROOT_USERNAME: testuser
      MONGO_INITDB_ROOT_PASSWORD: testpass
    ports:
      - 27017:27017
```

### Coverage 策略

**務實的做法**：
- ❌ 不強制要求 80% coverage
- ✅ 生成報告供參考
- ✅ 核心功能優先測試

```typescript
coverage: {
  reporter: ['text', 'html', 'lcov'],
  // 無 thresholds 區塊
}
```

---

## 🐛 問題排查方法論

### 1. ESLint 錯誤修正

**問題類型**：TypeScript `any` 型別

**診斷**：
```bash
npm run lint  # 查看所有錯誤
```

**解決步驟**：
1. 定義明確型別
2. 替換所有 `any`
3. 重新執行 lint

**學習**：建立共用型別系統（`src/types/index.ts`）

### 2. Coverage 失敗

**問題**：實際 41%，要求 80%

**分析**：
- 核心功能已測試
- UI 元件未測試
- 強制門檻阻礙迭代

**決策**：移除 `thresholds`，保留報告

**學習**：技術債務的權衡

### 3. Vercel 部署錯誤

**錯誤訊息診斷流程**：
1. 查看 Vercel build logs
2. 識別錯誤類型（URI 格式）
3. 本地重現問題
4. 修正並驗證

**常見陷阱**：
- MongoDB URI 包含空參數
- 環境變數未設定
- Vercel Secrets 引用錯誤

---

## 💡 最佳實踐

### 專案結構

```
src/
├── app/              # Next.js App Router
│   ├── globals.css   # 全域樣式
│   ├── layout.tsx    # Root Layout
│   └── page.tsx      # 首頁
├── components/
│   ├── todo/         # Todo 功能元件
│   └── ui/           # shadcn/ui 元件
├── server/
│   ├── actions.ts    # Server Actions
│   └── models/       # Mongoose Models
├── lib/
│   └── db.ts         # 資料庫連線
└── tests/
    └── integration/  # 整合測試
```

### Git Workflow

**分支策略**：
```
main (Production)
  ↑
  PR (需通過 CI)
  ↑
dev (Development)
  ↑
feature/* (功能分支)
```

**Commit 規範**（Conventional Commits）：
```
feat: 新增功能
fix: 修正錯誤
docs: 文檔更新
chore: 雜項（依賴更新等）
test: 測試相關
```

---

## 🎓 AI 輔助開發技巧

### 有效的 Prompt 結構

**1. 明確目標**
```
我需要實作 XXX 功能，使用 YYY 技術
```

**2. 提供上下文**
```
專案使用 Next.js 15, MongoDB, Docker 環境
請依照既有的架構模式
```

**3. 具體問題**
```
遇到錯誤：[完整錯誤訊息]
如何修正？
```

### AI 的最佳用途

**✅ 適合**：
- Boilerplate 程式碼生成
- 技術概念解釋
- 問題診斷建議
- 多種解決方案比較

**❌ 不適合**：
- 完全依賴（需驗證）
- 複雜業務邏輯（需人工設計）
- 安全性決策（需專業判斷）

---

## 📚 技術棧速查

### 核心依賴

| 套件 | 版本 | 用途 |
|------|------|------|
| next | 15.1.6 | React 框架 |
| react | 19.2.3 | UI 函式庫 |
| mongoose | latest | MongoDB ODM |
| zod | latest | Schema 驗證 |
| vitest | latest | 測試框架 |

### 開發指令

```bash
# 開發
npm run dev

# 建置
npm run build

# 測試
npm run test
npm run test:coverage

# Lint
npm run lint
```

---

## 🔗 參考資源

### 官方文件
- [Next.js 15](https://nextjs.org/docs)
- [React 19](https://react.dev/)
- [Vitest](https://vitest.dev/)

### 關鍵概念
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)
- [useTransition](https://react.dev/reference/react/useTransition)

---

## ✅ 待辦清單（個人學習）

### 已掌握
- [x] Next.js 15 Server Components/Actions
- [x] React 19 useTransition
- [x] Docker 開發環境
- [x] GitHub Actions CI/CD
- [x] Vercel 部署

### 待深入
- [ ] React Query（optimistic updates）
- [ ] Playwright E2E 測試
- [ ] Next.js Edge Runtime
- [ ] NextAuth.js 認證
- [ ] WebSocket 實時更新

---

*最後更新：2026-02-11*
