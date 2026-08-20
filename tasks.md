# 个人介绍网站开发任务拆解 (Tasks)

## 阶段 1：项目环境准备与清理
- [ ] 1.1 清除当前目录下基于 Node.js/Vite 生成的重型工程文件（如 `node_modules`, `package.json` 等），保持极简状态。
- [ ] 1.2 创建轻量化基础结构：`index.html`, `css/style.css`, `js/data.js`, `js/main.js`。
- [ ] 1.3 在 `index.html` 中引入 Tailwind CSS CDN 和图标库 CDN。

## 阶段 2：数据结构设计与抽离
- [ ] 2.1 编写 `js/data.js`。
- [ ] 2.2 定义全局数据对象（例如 `window.portfolioData`），包含基本信息、社交链接、学术成果、工业经历。
- [ ] 2.3 确保数据结构清晰、键名语义化，方便用户未来无需懂前端代码也能手动修改。

## 阶段 3：UI 结构与样式开发
- [ ] 3.1 编写 `index.html` 的语义化骨架（导航栏、Hero区域、学术部分、工业界部分、页脚）。
- [ ] 3.2 运用 Tailwind 样式类快速构建正式、专业的响应式排版（PC 端多列，移动端单列）。
- [ ] 3.3 编写自定义 CSS (`css/style.css`) 补充原生平滑滚动 (`scroll-behavior: smooth;`) 或特定组件微调。

## 阶段 4：数据绑定与交互逻辑
- [ ] 4.1 在 `js/main.js` 中编写逻辑，读取 `data.js` 中的静态数据。
- [ ] 4.2 动态生成学术列表、教育背景和工作经历，并将其注入到 HTML DOM 的对应容器中。
- [ ] 4.3 实现导航栏随页面滚动高亮当前章节的功能（Intersection Observer API）。

## 阶段 5：GitHub Pages 部署准备与测试
- [ ] 5.1 浏览器直接双击 `index.html`（或使用简易 Live Server），验证各平台（PC、平板、手机）显示效果和锚点跳转功能。
- [ ] 5.2 编写一份通俗易懂的 `README.md`，提供如何修改个人数据以及如何使用 GitHub Pages 进行1分钟一键发布的教程。