# openEuler-skillhub

DeepSeek Harness（`dsh`）插件：openEuler 社区技能管理平台（WittyHub）的检索与安装。在对话中即可搜索 openEuler SkillHub 的技能、查看详情，并一键安装到 Harness 可发现的 skills 目录。

## 功能

- **技能检索与浏览**：按关键词或分类搜索，支持热门/最新排序
- **对话内工具**：
  - `ohub_search`：搜索/浏览技能
  - `ohub_install`：下载 zip 并安装到 skills 目录
  - `ohub_list`：列出已安装技能
  - `ohub_uninstall`：卸载已安装技能
- **完整页面（侧栏「技能广场」按钮）**，参考 wittyhub skillhub 前端实现——
  - Hero 搜索、分类/贡献者/安全等级筛选、卡片/列表视图与分页
  - 详情页：概述（markdown）、安全审计、安装入口
  - 已安装列表：展示已安装技能并支持卸载
- **安全分级**：展示 wittyhub 的安全风险等级（安全 / 低 / 中 / 高风险）

## 环境要求

- Node.js 22 或更高版本
- DeepSeek Harness Web
- 可访问的 wittyhub（openEuler SkillHub）服务端

## 安装

在 dsh 环境（例如 `~/.dsh/profiles/web/plugins` 或全局插件目录）中安装本插件：

```sh
dsh plugin --profile web add open-euler-skillhub
```

本地开发时，构建后复制或引用本仓库路径即可。

## 使用

安装后重启 `dsh web`，在对话中即可：

```
帮我在 openEuler SkillHub 上找一个测试框架相关的技能
给我推荐一些热门的技能
```

插件也会注入 `tools` 系统提示，引导模型优先调用 `ohub_search` 而非 web_search。

## 配置

配置项可通过 dsh 插件设置页或 `config.ts` 覆盖，也可以在 `$DSH_HOME/open-euler-skillhub.json` 中持久化（设置页保存时写入）：

| 字段 | 默认 | 说明 |
|------|------|------|
| `apiBase` | `https://skillhub.openeuler.org` | wittyhub API 地址 |
| `webBase` | `https://skillhub.openeuler.org` | 技能主页（详情页「查看详情」链接） |
| `skillsDir` | `$DSH_HOME/skills` | 安装目录 |
| `timeoutMs` | `20000` | 上游请求超时（毫秒） |
| `maxResults` | `12` | 单批搜索结果上限（分页每页最高 96） |
| `sortBy` | `updated_at` | 默认排序（`updated_at` / `download_count`） |

## 开发

```sh
npm install      # 安装依赖并触发 build（prepare）
npm run typecheck
npm test         # 构建 + 运行 node:test 单测
```

目录结构：

```
src/
├── host.ts          # 插件入口：注册工具、systemPrompt、设置页、本地 HTTP 路由
├── api.ts           # wittyhub API 客户端（{code,msg,data} 剥壳、搜索引擎/列表库）
├── categories.ts    # openEuler 规范分类与中文 label
├── config-store.ts  # 默认配置与 $DSH_HOME 覆盖
├── http.ts          # fetchJson / fetchBytes（含超时与 UA）
├── install.ts       # 下载 zip → 解压 → 安装/列出/卸载
├── unzip.ts         # 纯 Node 实现的最小 zip 解压
├── local-api.ts     # 客户端 /skillhub HTTP 路由
├── types.ts         # 类型定义
├── client.js        # dsh 客户端模块（卡片 + 设置页）
└── tests/           # node:test 单测
```

## 数据与网络

- 插件仅在执行搜索/安装/详情/配置时访问 `apiBase` 与 `apiBase/api/v1/skills/{id}/download`
- 安装后的技能写入 `skillsDir`，格式为 `$DSH_HOME/skills/<skill_id>/SKILL.md`
- 解压时校验 zip 条目路径，拒绝路径穿越

## 许可证

[MIT](LICENSE)
