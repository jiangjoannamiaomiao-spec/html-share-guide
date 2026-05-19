# html-share-guide — AI 协作约定

> 本文件被 Codex（AGENTS.md）和 Claude Code（CLAUDE.md 软链）共同读取。
> 修改约定时只改这一份。

## 目录定位

- `src/` — **工作目录**：源代码、草稿、内部文件、不对外的内容
- `docs/` — **对外发布**：HTML 主页放 `docs/index.html`，通过 GitHub Pages 自动发布
- `runs/` — AI 任务产物（已 gitignore，不进 git）

## runs/ 任务目录约定

每次任务的产物统一放到 `runs/YYYYMMDD-HHMMSS-任务简称/` 下：

- `input/` — 输入文件
- `output/` — 最终产出
- `logs/` — 中间日志、调试信息

## HTML 项目（GitHub Pages）

- 主页 HTML 永远放 `docs/index.html`（GitHub Pages 只支持 / 或 /docs）
- CSS/JS 优先内联在 HTML 里，部署简单可靠
- 引用图片/资源用相对路径（`./images/x.png`，不要 `/images/x.png`）
- 多页站点：其他页放 `docs/about.html`、`docs/contact.html` 等
- 改完提示用户 commit & push，Pages 会在 1-2 分钟内自动更新

## Git 习惯

- 完成阶段性任务后，主动提示用户 commit & push
- commit message 简明描述这次改了什么

## 注意事项

- 敏感信息（API key/token）确认在 .gitignore 范围内
- 大文件（>50MB）不要直接传 GitHub
