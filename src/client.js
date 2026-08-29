window.__ModuleLoader__.load({
  id: "open-euler-skillhub",
  factory: (require) => {
    const React = require("react");
    const h = React.createElement;
    const { useEffect, useState, useCallback, useMemo } = React;

    const CSS = `
.oh{font-family:var(--o-font-family,var(--dsw-font-family,inherit));color:var(--dsw-alias-label-primary,inherit)}
.oh *{box-sizing:border-box}
.oh button{font:inherit;cursor:pointer}
.oh input,.oh input[type=text]{font:inherit;color:inherit}
.oh a{color:inherit}
/* ---------- 侧栏按钮 ---------- */
.oh-rail{flex:1 1 auto;min-width:0;display:flex;align-items:center;justify-content:center}
.oh-trigger{appearance:none;border:0;background:0 0;cursor:pointer;color:var(--dsw-alias-label-primary);display:flex;align-items:center;gap:8px;width:calc(100% + 4px);margin:4px -2px;height:42px;padding:0 10px 0 8px;border-radius:12px;box-sizing:border-box;overflow:hidden}
.oh-trigger:hover{background:var(--dsw-alias-interactive-bg-hover)}
.oh-trigger.on{background:var(--dsw-alias-interactive-bg-hover)}
.oh-trigger.rail{width:36px;height:36px;margin:8px 0 10px;justify-content:center;gap:0;padding:0;border-radius:50%}
/* ---------- 完整页面容器 ---------- */
.oh-page{position:fixed;z-index:40;box-sizing:border-box;display:flex;flex-direction:column;min-height:0;overflow:hidden;background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-primary,inherit)}
.oh-page-top{flex:none;border-bottom:1px solid var(--dsw-alias-border-l2,#e5e7eb);background:var(--dsw-alias-bg-layer-1,#fafafa)}
.oh-page-top-inner{max-width:1488px;width:100%;margin:0 auto;box-sizing:border-box;display:flex;align-items:center;gap:12px;min-height:52px;padding:0 24px}
.oh-plaza-brand{display:flex;align-items:center;flex:1;min-width:0}
.oh-plaza-logo-link{flex-shrink:0;line-height:0}
.oh-plaza-logo{display:block;height:32px;width:136px;flex-shrink:0}
.oh-plaza-divider{width:1px;height:24px;background:var(--dsw-alias-border-l2,#d1d5db);margin:0 16px;flex-shrink:0}
.oh-plaza-title{font-family:HarmonyHeiTi,Inter,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-weight:600;font-size:20px;line-height:26px;color:var(--o-color-info1,#1F2329);text-decoration:none;white-space:nowrap;flex-shrink:0}
.oh-plaza-title:hover{color:var(--o-color-primary1,#002FA7)}
[data-o-theme="e.dark"] .oh-plaza-logo{filter:brightness(0) invert(1)}
@media (prefers-color-scheme: dark){.oh-plaza-logo{filter:brightness(0) invert(1)}}
.oh-page-close{appearance:none;border:1px solid var(--dsw-alias-border-l2,#d1d5db);background:var(--dsw-alias-bg-layer-3,#fff);color:var(--dsw-alias-label-secondary,#4b5563);width:30px;height:30px;border-radius:8px;font-size:16px;line-height:1}
.oh-page-body{flex:1;min-height:0;overflow:auto;overflow-x:hidden;background:var(--dsw-alias-bg-layer-1,#f7f8fa)}
.oh-wrap{max-width:1488px;margin:0 auto;padding:0 24px 40px}
/* ---------- Hero ---------- */
.oh-hero{position:relative;width:100vw;margin-left:calc(50% - 50vw);padding:28px 20px 24px;text-align:center;background:linear-gradient(180deg,#eef2ff 0%,rgba(238,242,255,0) 100%)}
.oh-hero-title{font-weight:650;font-size:30px;line-height:40px;margin:0 0 6px;color:var(--dsw-alias-label-primary,inherit)}
.oh-hero-sub{font-size:14px;line-height:20px;margin:0 0 10px;color:var(--dsw-alias-label-tertiary,#6b7280)}
.oh-hero-stats{font-size:13px;color:var(--dsw-alias-label-secondary,#374151);margin:0 0 16px}
.oh-hero-stats b{font-size:16px}
.oh-search{max-width:620px;margin:0 auto;display:flex;align-items:center;gap:2px;border:1px solid var(--dsw-alias-border-l2,#cbd5e1);border-radius:8px;background:var(--dsw-alias-bg-layer-3,#fff);padding:0 12px;transition:border-color .15s ease,box-shadow .15s ease}
.oh-search:focus-within{border-color:var(--dsw-alias-state-info-primary,#1d4ed8);box-shadow:0 0 0 3px rgba(29,78,216,.10)}
.oh-search-icon{display:inline-flex;align-items:center;color:var(--dsw-alias-label-tertiary,#6b7280);flex:none}
.oh-search input{flex:1;border:0;outline:0;background:transparent;padding:11px 6px;font-size:14px;color:var(--dsw-alias-label-primary,inherit);min-width:0}
.oh-search input::placeholder{color:var(--dsw-alias-label-caption,#9ca3af)}
.oh-search-clear{appearance:none;border:0;background:transparent;color:var(--dsw-alias-label-dimmed,#9ca3af);width:24px;height:24px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;flex:none;padding:0}
.oh-search-clear:hover{background:var(--dsw-alias-bg-module-platform,#f3f4f6);color:var(--dsw-alias-label-secondary,#4b5563)}
/* ---------- 布局：筛选侧栏 + 内容 ---------- */
.oh-main{display:flex;gap:24px;margin-top:20px}
.oh-sidebar{width:216px;flex-shrink:0;align-self:flex-start;position:sticky;top:16px}
.oh-sidebar-title{font-weight:600;font-size:14px;color:var(--dsw-alias-label-secondary,#374151);margin:0 0 8px}
.oh-filter-item{display:flex;align-items:center;justify-content:space-between;padding:7px 10px;border-radius:6px;cursor:pointer;font-size:13px;line-height:18px;user-select:none;margin-bottom:1px}
.oh-filter-item:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(38,49,72,.06))}
.oh-filter-item.on{color:var(--dsw-alias-state-info-text,#1d4ed8);background:#eef2ff;font-weight:600}
.oh-filter-item.on:hover{background:#e4ebff;font-weight:600}
.oh-filter-label{display:flex;align-items:center;gap:8px;min-width:0}
.oh-check{width:16px;height:16px;border-radius:4px;border:1px solid var(--dsw-alias-border-l2,#cbd5e1);background:var(--dsw-alias-bg-layer-3,#fff);flex:none;display:inline-flex;align-items:center;justify-content:center}
.oh-check.on{background:var(--dsw-alias-state-info-primary,#1d4ed8);border-color:var(--dsw-alias-state-info-primary,#1d4ed8)}
.oh-check svg{width:10px;height:10px;color:#fff}
.oh-radio{width:16px;height:16px;border-radius:50%;border:1px solid var(--dsw-alias-border-l2,#cbd5e1);background:var(--dsw-alias-bg-layer-3,#fff);flex:none;display:inline-flex;align-items:center;justify-content:center}
.oh-radio.on{border:4px solid var(--dsw-alias-state-info-primary,#1d4ed8)}
.oh-filter-count{display:none}
.oh-clear{width:100%;text-align:left;border:0;background:none;color:var(--dsw-alias-label-secondary,#374151);padding:6px 0;font-size:13px}
.oh-clear:hover{color:var(--dsw-alias-state-info-primary,#1d4ed8)}
.oh-content{flex:1;min-width:0}
/* ---------- 工具栏 ---------- */
.oh-toolbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;gap:12px;flex-wrap:wrap}
.oh-tabs{display:inline-flex;background:var(--dsw-alias-bg-module-platform,#f3f4f6);border-radius:6px;padding:3px;gap:2px}
.oh-tab{appearance:none;border:0;background:transparent;padding:7px 18px;border-radius:5px;font-size:14px;color:var(--dsw-alias-label-secondary,#4b5563)}
.oh-tab.on{background:var(--dsw-alias-bg-layer-3,#fff);color:var(--dsw-alias-label-primary,inherit);box-shadow:0 1px 3px rgba(0,0,0,.12)}
.oh-result-tip{font-size:13px;color:var(--dsw-alias-label-tertiary,#6b7280)}
.oh-result-tip b{color:var(--dsw-alias-state-info-primary,#1d4ed8)}
.oh-view-toggle{display:inline-flex;background:var(--dsw-alias-bg-module-platform,#f3f4f6);border-radius:6px;padding:3px;gap:2px}
.oh-view-btn{appearance:none;border:0;background:transparent;padding:6px 10px;border-radius:5px;font-size:14px;color:var(--dsw-alias-label-secondary,#4b5563)}
.oh-view-btn.on{background:var(--dsw-alias-bg-layer-3,#fff);box-shadow:0 1px 3px rgba(0,0,0,.12)}
/* ---------- 分区导航（技能广场 / 已安装） ---------- */
.oh-section-nav{display:inline-flex;background:var(--dsw-alias-bg-module-platform,#f3f4f6);border-radius:8px;padding:3px;gap:2px;margin:14px auto 0}
.oh-section-btn{appearance:none;border:0;background:transparent;padding:7px 22px;border-radius:6px;font-size:14px;font-weight:500;color:var(--dsw-alias-label-secondary,#4b5563);cursor:pointer}
.oh-section-btn.on{background:var(--dsw-alias-bg-layer-3,#fff);color:var(--dsw-alias-label-primary,inherit);box-shadow:0 1px 3px rgba(0,0,0,.12)}
/* ---------- 已安装列表 ---------- */
.oh-installed{padding:16px 0}
.oh-installed-head{display:flex;align-items:center;gap:10px;margin-bottom:14px}
.oh-installed-title{font-size:16px;font-weight:600;color:var(--dsw-alias-label-primary,inherit)}
.oh-installed-count{font-size:13px;color:var(--dsw-alias-label-tertiary,#6b7280)}
.oh-installed-list{display:flex;flex-direction:column;gap:10px}
.oh-installed-item{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 18px;border:1px solid var(--dsw-alias-border-l2,#e9ebee);border-radius:12px;background:var(--dsw-alias-bg-layer-2,#fff)}
.oh-installed-item:hover{box-shadow:0 4px 14px rgba(15,23,42,.06)}
.oh-installed-main{min-width:0;flex:1}
.oh-installed-name{font-size:15px;font-weight:600;color:var(--dsw-alias-label-primary,inherit);margin-bottom:4px}
.oh-installed-desc{font-size:13px;line-height:1.6;color:var(--dsw-alias-label-tertiary,#6b7280);margin-bottom:8px}
.oh-installed-meta{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.oh-installed-path{font-size:12px;color:var(--dsw-alias-label-dimmed,#9ca3af);word-break:break-all}
.oh-btn.oh-btn-danger{color:#b91c1c;border-color:#fecaca;background:#fff}
.oh-btn.oh-btn-danger:hover{border-color:#ef4444;background:#fef2f2}
/* ---------- 卡片网格 ---------- */
.oh-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
@media (max-width:1080px){.oh-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:720px){.oh-grid{grid-template-columns:1fr}.oh-main{flex-direction:column}.oh-sidebar{position:static;width:100%}}
.oh-card{display:flex;flex-direction:column;background:var(--dsw-alias-bg-layer-2,#fff);border:1px solid var(--dsw-alias-border-l2,#e5e7eb);border-radius:10px;padding:14px;cursor:pointer;text-align:left}
.oh-card:hover{box-shadow:0 4px 14px rgba(15,23,42,.08);border-color:var(--dsw-alias-label-dimmed,#c7d2fe)}
.oh-card-head{display:flex;align-items:center;gap:8px;margin-bottom:6px}
.oh-card-name{flex:1;min-width:0;font-weight:600;font-size:16px;line-height:22px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.oh-tag{font-size:12px;line-height:20px;padding:0 8px;border-radius:6px;flex:none;white-space:nowrap}
.oh-tag.green{background:#ecfdf5;color:#047857}
.oh-tag.blue{background:#eff6ff;color:#1d4ed8}
.oh-tag.orange{background:#fff7ed;color:#c2410c}
.oh-tag.red{background:#fef2f2;color:#b91c1c}
.oh-tag.gray{background:#f3f4f6;color:#4b5563}
.oh-card-desc{margin:0 0 12px;font-size:13px;line-height:20px;color:var(--dsw-alias-label-tertiary,#6b7280);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.oh-card-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;margin-top:auto}
.oh-card-cat{font-size:12px;line-height:20px;padding:0 8px;border-radius:6px;background:var(--dsw-alias-markdown-tag,#f3f4f6);color:var(--dsw-alias-label-secondary,#4b5563);white-space:nowrap}
.oh-card-foot{display:flex;align-items:center;justify-content:space-between;padding-top:10px;border-top:1px solid var(--dsw-alias-border-l2,#eef0f3);font-size:12px;color:var(--dsw-alias-label-tertiary,#6b7280)}
.oh-card-foot .oh-metric{display:inline-flex;align-items:center;gap:4px}
/* ---------- 列表视图 ---------- */
.oh-list{border:1px solid var(--dsw-alias-border-l2,#e5e7eb);border-radius:10px;overflow:hidden;background:#fff}
.oh-list-row{display:grid;grid-template-columns:minmax(0,1.6fr) 120px 110px 110px 140px;gap:10px;align-items:center;width:100%;padding:12px 16px;border:0;border-top:1px solid var(--dsw-alias-border-l2,#eef0f3);background:#fff;cursor:pointer;font-size:13px;text-align:left;transition:background-color .15s ease;appearance:none}
.oh-list-row:active{background:#f7f8fa}
.oh-list-row:not(.head):hover{background:#f7f8fa}
.oh-list-row:first-child{border-top:0}
.oh-list-row.head{background:#fff;font-weight:600;cursor:default;border-bottom:1px solid #002FA7}
.oh-list-row.head:active{background:#f7f8fa}
.oh-list-main{min-width:0;display:flex;flex-direction:column;gap:2px}
.oh-list-name{font-weight:700;font-size:14px;line-height:22px;color:var(--dsw-alias-label-primary,inherit);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:color .15s ease}
.oh-list-row:hover .oh-list-name{color:var(--dsw-alias-state-info-primary,#1d4ed8)}
.oh-list-desc{font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,#6b7280);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.oh-card-cat.muted{color:var(--dsw-alias-label-dimmed,#9ca3af)}
.oh-list-dcount{display:flex;align-items:center;gap:4px;color:var(--dsw-alias-label-secondary,#4b5563);white-space:nowrap}
.oh-list-author{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-secondary,#4b5563)}
/* 列表内的分类/风险等级标签：背景紧凑贴合文字（对齐 wittyhub 风格） */
.oh-list-row .oh-card-cat,.oh-list-row .oh-tag{align-items:center;display:inline-flex;border-radius:4px;padding:0 3px;line-height:16px;justify-self:start;width:fit-content}
.oh-list-row .oh-card-cat{background:var(--dsw-alias-markdown-tag,#f3f4f6);color:var(--dsw-alias-label-secondary,#4b5563)}
/* ---------- 空态/加载 ---------- */
.oh-empty{text-align:center;color:var(--dsw-alias-label-caption,#9ca3af);padding:48px 0;font-size:14px}
.oh-loading{display:flex;justify-content:center;padding:48px 0}
.oh-spinner{width:28px;height:28px;border-radius:50%;border:3px solid var(--dsw-alias-border-l2,#e5e7eb);border-top-color:var(--dsw-alias-state-info-primary,#1d4ed8);animation:ohspin .8s linear infinite}
@keyframes ohspin{to{transform:rotate(360deg)}}
/* ---------- 分页 ---------- */
.oh-pager{display:flex;align-items:center;justify-content:flex-end;gap:16px;margin-top:20px;flex-wrap:wrap;font-size:13px}
.oh-pager-info{color:var(--dsw-alias-label-caption,#9ca3af)}
.oh-pager-size{display:flex;align-items:center;gap:6px;color:var(--dsw-alias-label-secondary,#4b5563)}
.oh-pager-size-label{color:var(--dsw-alias-label-caption,#9ca3af)}
.oh-pager-select{appearance:none;-webkit-appearance:none;height:32px;padding:0 26px 0 10px;border:1px solid var(--dsw-alias-border-l2,#cbd5e1);border-radius:4px;background:var(--dsw-alias-bg-layer-3,#fff) url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' fill='none' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat right 8px center;color:var(--dsw-alias-label-primary,inherit);font-size:13px;cursor:pointer;outline:0}
.oh-pager-select:hover{border-color:var(--dsw-alias-state-info-primary,#1d4ed8)}
.oh-pager-pages{display:flex;align-items:center;gap:6px}
.oh-pager-jumper{display:flex;align-items:center;gap:6px;color:var(--dsw-alias-label-secondary,#4b5563)}
.oh-pager-jump-input{width:44px;height:32px;padding:0 6px;border:1px solid var(--dsw-alias-border-l2,#cbd5e1);border-radius:4px;text-align:center;font-size:13px;background:var(--dsw-alias-bg-layer-3,#fff);color:var(--dsw-alias-label-primary,inherit);outline:0}
.oh-pager-jump-input:focus{border-color:var(--dsw-alias-state-info-primary,#1d4ed8)}
.oh-page-ellipsis{min-width:24px;height:32px;display:inline-flex;align-items:center;justify-content:center;font-size:13px;color:var(--dsw-alias-label-caption,#9ca3af);user-select:none}
.oh-page-btn{appearance:none;border:1px solid var(--dsw-alias-border-l2,#e5e7eb);background:var(--dsw-alias-bg-layer-2,#fff);color:var(--dsw-alias-label-secondary,#4b5563);min-width:32px;height:32px;border-radius:6px;font-size:13px;padding:0 8px}
.oh-page-btn.on{background:var(--dsw-alias-state-info-primary,#1d4ed8);border-color:var(--dsw-alias-state-info-primary,#1d4ed8);color:#fff}
.oh-page-btn:disabled{opacity:.5;cursor:default}
.oh-pager-info{font-size:13px;color:var(--dsw-alias-label-caption,#9ca3af);margin-right:8px}
/* 详情浮层 */
.oh-overlay{position:fixed;inset:0;z-index:2147483000;background:rgba(15,23,42,.48);display:flex;align-items:center;justify-content:center;padding:24px 16px;box-sizing:border-box}
.oh-drawer{position:relative;width:min(880px,100%);max-height:min(90vh,880px);background:var(--dsw-alias-bg-layer-2,#fff);color:var(--dsw-alias-label-primary,inherit);border:1px solid var(--dsw-alias-border-l2,#9aa5b5);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 24px 60px rgba(15,23,42,.30)}
.oh-drawer-head{display:flex;align-items:center;gap:12px;padding:12px 18px;border-bottom:1px solid var(--dsw-alias-border-l2,#eef0f3);flex:none}
.oh-drawer-head .oh-drawer-title{font-size:14px;font-weight:600;color:var(--dsw-alias-label-tertiary,#6b7280)}
.oh-drawer-close{appearance:none;border:1px solid var(--dsw-alias-border-l2,#d1d5db);background:var(--dsw-alias-bg-layer-3,#fff);color:var(--dsw-alias-label-secondary,#4b5563);width:30px;height:30px;border-radius:8px;font-size:16px;line-height:1;margin-left:auto;flex:none;cursor:pointer}
.oh-drawer-close:hover{background:var(--dsw-alias-bg-module-platform,#f7f8fa);color:var(--dsw-alias-label-primary,inherit)}
/* Hero 信息卡（参考 wittyhub info-card-hero） */
.oh-d-hero{padding:20px 20px 18px;margin:16px 18px 0;border-radius:12px;background:linear-gradient(180deg,#eef2ff 0%,rgba(238,242,255,.45) 100%);border:1px solid var(--dsw-alias-border-l2,#e6ebfe);flex:none}
.oh-d-title-row{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:8px}
.oh-d-name{margin:0;font-size:22px;font-weight:650;line-height:1.35;color:var(--dsw-alias-label-primary,inherit);word-break:break-word}
.oh-d-hero .oh-desc{margin:0 0 14px;font-size:14px;line-height:1.7;color:var(--dsw-alias-label-secondary,#374151);white-space:pre-wrap}
.oh-d-tags{display:flex;flex-wrap:wrap;gap:8px}
.oh-d-tags .oh-tag{display:inline-flex;align-items:center;height:24px;line-height:1;border-radius:4px;padding:0 8px;font-size:12px}
.oh-d-tags .oh-tag.cat{background:var(--dsw-alias-state-info-bg,#eef2ff);color:var(--dsw-alias-state-info-text,#1d4ed8);border:1px solid var(--dsw-alias-border-l2,#ccd7fd)}
.oh-d-tags .oh-tag.gray{background:var(--dsw-alias-bg-module-platform,#f7f8fa);color:var(--dsw-alias-label-secondary,#4b5563);border:1px solid var(--dsw-alias-border-l2,#e5e7eb)}
/* Tab 栏 */
.oh-dtabs{display:flex;gap:24px;padding:0 20px;border-bottom:1px solid var(--dsw-alias-border-l2,#eef0f3);flex:none;overflow-x:auto;margin-top:16px}
.oh-dtab{appearance:none;border:0;background:0 0;border-bottom:2px solid transparent;padding:12px 2px;font-size:14px;color:var(--dsw-alias-label-tertiary,#6b7280);white-space:nowrap;cursor:pointer}
.oh-dtab.on{color:var(--dsw-alias-state-info-primary,#1d4ed8);border-bottom-color:var(--dsw-alias-state-info-primary,#1d4ed8);font-weight:600}
.oh-drawer-body{flex:1;min-height:0;overflow:auto;padding:18px 20px 28px}
/* 底部常驻操作栏 */
.oh-d-footer{display:flex;align-items:center;gap:10px;padding:12px 20px;border-top:1px solid var(--dsw-alias-border-l2,#eef0f3);background:var(--dsw-alias-bg-layer-2,#fff);flex:none}
.oh-d-footer .oh-btn{margin-right:0}
.oh-d-footer-hint{font-size:12px;font-weight:400;color:var(--dsw-alias-label-tertiary,#6b7280);margin-left:6px}
/* 文档标题（参考 wittyhub doc-title） */
.oh-doc-title{font-size:16px;font-weight:600;color:var(--dsw-alias-label-primary,inherit);margin:0 0 12px}
.oh-doc-divider{height:1px;background:var(--dsw-alias-border-l2,#eef0f3);margin-bottom:16px}
.oh-d-scroll-box{border:1px solid var(--dsw-alias-border-l2,#e9ebee);border-radius:12px;padding:18px 20px;background:var(--dsw-alias-bg-layer-3,#fff)}
.oh-btn{border:1px solid var(--dsw-alias-border-l2,#d1d5db);background:var(--dsw-alias-bg-layer-3,#fff);color:var(--dsw-alias-label-primary,inherit);border-radius:8px;padding:9px 16px;font-size:13px;font-weight:500;cursor:pointer;text-decoration:none}
.oh-btn:hover{border-color:var(--dsw-alias-state-info-primary,#1d4ed8)}
.oh-btn.primary{background:var(--dsw-alias-state-info-primary,#1d4ed8);color:#fff;border-color:var(--dsw-alias-state-info-primary,#1d4ed8)}
.oh-btn.primary:hover{background:#1a3ec4}
.oh-btn:disabled{opacity:.5;cursor:default}
/* 安全审计 */
.oh-sec-info{display:flex;align-items:center;gap:10px;margin:0 0 14px;font-size:13px;color:var(--dsw-alias-label-secondary,#374151);flex-wrap:wrap}
.oh-audit-table-wrap{overflow:hidden;border:1px solid var(--dsw-alias-border-l2,#e9ebee);border-radius:12px;background:var(--dsw-alias-bg-layer-3,#fff)}
.oh-audit-table{width:100%;border-collapse:collapse;font-size:13px}
.oh-audit-table th{text-align:left;padding:10px 14px;background:var(--dsw-alias-bg-module-platform,#f7f8fa);font-weight:600;color:var(--dsw-alias-label-primary,inherit);border-bottom:1px solid var(--dsw-alias-border-l2,#e5e7eb);white-space:nowrap}
.oh-audit-table td{padding:10px 14px;border-bottom:1px solid var(--dsw-alias-border-l2,#f2f3f5);vertical-align:top;color:var(--dsw-alias-label-secondary,#374151)}
.oh-audit-table tbody tr:last-child td{border-bottom:0}
.oh-audit-table tbody tr:nth-child(even){background:#fafbfc}
.oh-audit-table .oh-audit-desc{word-break:break-word}
.oh-audit-table .oh-audit-loc{white-space:nowrap;color:var(--dsw-alias-label-tertiary,#6b7280);font-size:12px}
.oh-audit-table .oh-tag{line-height:18px;border-radius:4px;padding:0 8px;display:inline-flex}
.oh-desc{margin:0 0 16px;font-size:14px;line-height:1.75;color:var(--dsw-alias-label-secondary,#374151);white-space:pre-wrap}
/* markdown */
.oh-md{font-size:14px;line-height:1.75;color:var(--dsw-alias-label-secondary,#374151);word-break:break-word}
.oh-md h1{font-size:22px}.oh-md h2{font-size:19px}.oh-md h3{font-size:16px}
.oh-md h1,.oh-md h2,.oh-md h3,.oh-md h4{margin:16px 0 8px;color:var(--dsw-alias-label-primary,inherit)}
.oh-md p{margin:8px 0}
.oh-md ul,.oh-md ol{margin:8px 0;padding-left:24px}
.oh-md li{margin:3px 0}
.oh-md code{background:var(--dsw-alias-markdown-tag,#f3f4f6);border-radius:4px;padding:1px 5px;font-size:12px}
.oh-md pre{background:#0f172a;color:#e2e8f0;border-radius:8px;padding:12px;overflow:auto;margin:10px 0}
.oh-md pre code{background:transparent;color:inherit;padding:0}
.oh-md blockquote{border-left:3px solid var(--dsw-alias-border-l2,#cbd5e1);margin:8px 0;padding:2px 12px;color:var(--dsw-alias-label-tertiary,#6b7280)}
.oh-md a{color:var(--dsw-alias-state-info-primary,#1d4ed8)}
.oh-md table{border-collapse:collapse;margin:10px 0;width:100%}
.oh-md th,.oh-md td{border:1px solid var(--dsw-alias-border-l2,#e5e7eb);padding:6px 10px;font-size:13px;text-align:left}
.oh-sec{color:var(--dsw-alias-label-tertiary,#6b7280)}
.oh-err{color:var(--dsw-alias-state-error-primary,#b91c1c);font-size:13px;margin:8px 0}
`;

    // openEuler 品牌 logo（wittyhub tmp/wittyhub/web/src/assets/header/logo.svg，base64 data URI）。
    // 深色主题下用 CSS `brightness(0) invert(1)` 复现 logo_dark.svg 的全白效果。
    const OH_LOGO_LIGHT_B64 = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTM5cHgiIGhlaWdodD0iMzJweCIgdmlld0JveD0iMCAwIDEzOSAzMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDxkZWZzPgogICAgICAgIDxwb2x5Z29uIGlkPSJwYXRoLTEiIHBvaW50cz0iMCAwIDI5LjQ5OTk3OTMgMCAyOS40OTk5NzkzIDMyIDAgMzIiPjwvcG9seWdvbj4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSLpobXpnaItMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9ImxvZ28tbGlnaHTniYjmnKwiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNTIuMDAwMDAwLCAtMjQuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1Mi4wMDAwMDAsIDI0LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTU4LjU5OTg4NDcsMjAuMTY3NDUwNCBDNTYuNzg5NzkwNCwyMC4xNjc0NTA0IDU1LjMyMTkxMDMsMTguNzY0OTE3MiA1NS4zMjE5MTAzLDE3LjAzNDg0MjkgQzU1LjMyMTkxMDMsMTUuMzA0NzY4NSA1Ni43ODk3OTA0LDEzLjkwMjIzNTMgNTguNTk5ODg0NywxMy45MDIyMzUzIEM2MC40MTAxMjcxLDEzLjkwMjIzNTMgNjEuODc3ODU5MiwxNS4zMDQ3Njg1IDYxLjg3Nzg1OTIsMTcuMDM0ODQyOSBDNjEuODc3ODU5MiwxOC43NjQ5MTcyIDYwLjQxMDEyNzEsMjAuMTY3NDUwNCA1OC41OTk4ODQ3LDIwLjE2NzQ1MDQgTTU4LjU5OTg4NDcsMTEuMjIyODMwMSBDNTcuMjM5OTA4NywxMS4yMjI4MzAxIDU1Ljk4ODQyODgsMTEuNjU0NzgyIDU0Ljk3NTU1MTUsMTIuMzc1NTk5MSBMNTQuOTc1NTUxNSwxMS40MDQ0NTExIEM1NC45NzU1NTE1LDExLjMwNDE0ODcgNTQuODkwMjk0LDExLjIyMjgzMDEgNTQuNzg1MzUwMywxMS4yMjI4MzAxIEw1Mi40Mzc1MTE4LDExLjIyMjgzMDEgQzUyLjMzMjcxNjEsMTEuMjIyODMwMSA1Mi4yNDc2MDY1LDExLjMwNDE0ODcgNTIuMjQ3NjA2NSwxMS40MDQ0NTExIEw1Mi4yNDc2MDY1LDI2LjM4MDgxNDMgQzUyLjI0NzYwNjUsMjYuNDgxMjU4NCA1Mi4zMzI3MTYxLDI2LjU2MjU3NyA1Mi40Mzc1MTE4LDI2LjU2MjU3NyBMNTQuNzg1MzUwMywyNi41NjI1NzcgQzU0Ljg5MDI5NCwyNi41NjI1NzcgNTQuOTc1NTUxNSwyNi40ODEyNTg0IDU0Ljk3NTU1MTUsMjYuMzgwODE0MyBMNTQuOTc1NTUxNSwyMS42OTM5NDQ5IEM1NS45ODg0Mjg4LDIyLjQxNDkwMzcgNTcuMjM5OTA4NywyMi44NDY3MTM5IDU4LjU5OTg4NDcsMjIuODQ2NzEzOSBDNjEuOTU4ODI0MywyMi44NDY3MTM5IDY0LjY4MTQ0MDcsMjAuMjQ0NTE4OSA2NC42ODE0NDA3LDE3LjAzNDg0MjkgQzY0LjY4MTQ0MDcsMTMuODI0NzQxOCA2MS45NTg4MjQzLDExLjIyMjgzMDEgNTguNTk5ODg0NywxMS4yMjI4MzAxIiBpZD0iRmlsbC0xIiBmaWxsPSIjMDAwMDAwIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNzAuMDEwNzQ2OSwxNC44Nzc4NjAxIEM3MC42MjAyNzksMTQuMzA1Nzk2NSA3MS4zODM2MDA0LDE0LjAxOTYyMzEgNzIuMzAwNDE0OSwxNC4wMTk2MjMxIEM3My4yMzg4Mzk4LDE0LjAxOTYyMzEgNzQuMDA4ODIxOSwxNC4zMDIzOTY0IDc0LjYxMTY5MzMsMTQuODY3ODAxNSBDNzQuODI2NDY1MywxNS4wNjkzOTc5IDc0Ljk3ODYyNjMsMTUuMjU4ODEwOCA3NS4xMTQyMDk1LDE1LjUwNTAzMzMgQzc1LjEyOTYwMzIsMTUuNTMzMDgzOSA3NS4xNjY5MDM0LDE1LjU5Njk3NzEgNzUuMTc2NjcyNCwxNS42MjcyOTQ1IEM3NS4yMDQzNTE1LDE1LjcxMjU3OTkgNzUuMTM2ODU2LDE1LjcxMjU3OTkgNzUuMTM2ODU2LDE1LjcxMjU3OTkgTDY5LjQ4NDg0NDEsMTUuNzEyNTc5OSBDNjkuNDg0ODQ0MSwxNS43MTI1Nzk5IDY5LjQwMjk5MDksMTUuNzEyNTc5OSA2OS40NDIyMTUzLDE1LjYzNTM2OTcgQzY5LjQ4MTQzOTcsMTUuNTU4MzAxMiA2OS41MjUyNTI2LDE1LjQ4MzQ5OTQgNjkuNTcxNzI5OCwxNS40MTAyNTYgQzY5LjY5MjY1OTMsMTUuMjE5NDI2NSA2OS44MzY2Nzk0LDE1LjA0MDc4MDYgNzAuMDEwNzQ2OSwxNC44Nzc4NjAxIE03NC42NTkyMDY2LDE5LjIyNDU3OTcgQzc0LjYzODc4MDMsMTkuMjQ3Mzg4NiA3NC42MTg3OTgxLDE5LjI3MDkwNTggNzQuNTk1ODU1NSwxOS4yOTI0Mzk3IEM3My45ODIzMjY5LDE5Ljg2NzQ3ODMgNzMuMjEzODI1LDIwLjE1NDkyNjggNzIuMjg5NzU3NywyMC4xNTQ5MjY4IEM3MS4zNjU2OTA0LDIwLjE1NDkyNjggNzAuNjAyMzY5LDE5Ljg3MTAyMDEgNzAuMDAwMjM3NywxOS4zMDIwNzMzIEM2OS43MzIzMjc4LDE5LjA0OTMzMzkgNjkuNTI4NTA5LDE4Ljc1OTQ3NzEgNjkuMzgzMDA4NywxOC40MzU5MDI3IEM2OS4zMTkwNjU2LDE4LjI5MzY2NiA2OS4yNjU2MzE2LDE4LjE0NTA1NDIgNjkuMjI0MzM1LDE3Ljk5MDA2NzIgQzY5LjIxNjE5NDEsMTcuOTU5ODkxNCA2OS4yMjAzMzg1LDE3LjkzODIxNTkgNjkuMjI5ODExNiwxNy45MjI3NzM5IEM2OS4yNDAxNzI3LDE3LjkwNTc3MzUgNjkuMjYxOTMxMiwxNy44ODU3OTggNjkuMjg4NzIyMiwxNy44ODUzNzMgQzY5LjMwNjYzMjIsMTcuODg1MjMxMyA2OS4zOTEwMDE2LDE3Ljg4NTM3MyA2OS4zOTEwMDE2LDE3Ljg4NTM3MyBMNzEuNjc5NjMzNSwxNy44ODUzNzMgTDc1LjQwOTc5ODUsMTcuODg1MzczIEM3Ni4wNzE4NzY1LDE3Ljg4NTIzMTMgNzcuNDk5NDk2MSwxNy44ODUyMzEzIDc4LjE2MTQyNjEsMTcuODg1MzczIEM3OC4xNjQ1MzQ1LDE3Ljg4NTM3MyA3OC4zMzI5NzczLDE3Ljg4ODIwNjQgNzguMzUxMDM1MywxNy43NDczODY0IEM3OC4zNTEwMzUzLDE3Ljc0NzM4NjQgNzguMzkwODUxOCwxNy40MTQ3NDUyIDc4LjM5MDk5OTksMTcuMDc3MDAzOSBDNzguMzkxMTQ3OCwxNi4yNjc1MDEzIDc4LjE3Mjk3MTQsMTUuNTE2MDgzNSA3OC4xNzI4MjM0LDE1LjUxNjA4MzUgQzc4LjAzNzgzMjMsMTUuMDUxNjg5MiA3Ny44NDAzNzgyLDE0LjYwMzU4NjkgNzcuNTgwMzEzMiwxNC4xNzIwNiBDNzcuMDQwMjAwOCwxMy4yNzUxNDcxIDc2LjI4ODEyODcsMTIuNTY1MDk2OSA3NS4zMjQ2ODksMTIuMDQxMzQyOSBDNzQuMzYwNjU3MiwxMS41MTg0Mzg4IDczLjMzMTM1MDEsMTEuMjU2NjMyNiA3Mi4yMzY3Njc4LDExLjI1NjYzMjYgQzcwLjcyMjI2MjQsMTEuMjU2NjMyNiA2OS4zODE2NzY2LDExLjc1OTU2MTIgNjguMjE1NjAyMiwxMi43NjUxMzUgQzY2Ljg4NTUyNTUsMTMuOTIwMTcwNyA2Ni4yMjA5MzEyLDE1LjM2NDYzODMgNjYuMjIwOTMxMiwxNy4wOTc1NDYgQzY2LjIyMDkzMTIsMTguNzE0NTY3NyA2Ni44MDkxNDg5LDIwLjA4OTE5MTkgNjcuOTg1ODgwNSwyMS4yMjA1Njg3IEM2OS4xNjI3NjAxLDIyLjM1MTk0NTUgNzAuNTgzMjc0OSwyMi45MTc5MTczIDcyLjI0NzEyODksMjIuOTE3OTE3MyBDNzMuMzc3NTMxMywyMi45MTc5MTczIDc0LjQxMjkwNzEsMjIuNjYxMDY5NSA3NS4zNTEzMzIsMjIuMTQ4MDgyNCBDNzYuMTYwOTgyNSwyMS43MDU1MDUyIDc2LjgxNDYyMzYsMjEuMTA2MjQxIDc3LjMzMDE2NTIsMjAuMzY3NTczNSBDNzcuMzQwNjc0NCwyMC4zNTI2OTgxIDc3LjM0NjE1MSwyMC4zMTc0MjIzIDc3LjMwODg1MDgsMjAuMzAwMjgwMiBDNzcuMDM2NTAwNCwyMC4xNzUzMjczIDc2Ljc1NzkzMzIsMjAuMDYyNTU3OSA3Ni40ODIxNzg0LDE5Ljk0Mzk4MDEgQzc2LjAzNzgzMjcsMTkuNzUyODY3MyA3NS41OTI4OTUsMTkuNTYyMzIxMSA3NS4xNDc2NjEyLDE5LjM3MjM0MTYgQzc0LjkwMjg0MTgsMTkuMjY3Nzg5MSA3NC44NjA4MDUxLDE5LjI1MDA4MDQgNzQuODE2ODQ0MiwxOS4yMzEyMzgyIEM3NC43NzAwNzEsMTkuMjEwOTc5NCA3NC43MTAxMjQzLDE5LjE2ODE5NTEgNzQuNjU5MjA2NiwxOS4yMjQ1Nzk3IiBpZD0iRmlsbC0zIiBmaWxsPSIjMDAwMDAwIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNODUuMTkwODM1NiwxMS4yNjM5MDAzIEM4Mi4zODk3NzA1LDExLjI2MzkwMDMgODAuMTE5MTk2NiwxMy40MzM4NiA4MC4xMTkxOTY2LDE2LjExMDcxNTEgTDgwLjExOTE5NjYsMTkuMTU0MDcwNiBMODAuMTE5MTk2NiwyMS4zNTM0OTc3IEw4MC4xMTkxOTY2LDIyLjY2Njc3ODggQzgwLjExOTE5NjYsMjIuNzc1MDE0NyA4MC4yMTA5NjY5LDIyLjg2MjcwODUgODAuMzI0MTk5NSwyMi44NjI3MDg1IEw4Mi44NDU2NjE0LDIyLjg2MjcwODUgQzgyLjk1OTA0MjEsMjIuODYyNzA4NSA4My4wNTA4MTI0LDIyLjc3NTAxNDcgODMuMDUwODEyNCwyMi42NjY3Nzg4IEw4My4wNTA4MTI0LDIxLjM1MzQ5NzcgTDgzLjA1MDgxMjQsMjAuNTAwMjE5MSBMODMuMDUwODEyNCwxOS4xNTQwNzA2IEw4My4wNTA4MTI0LDE2LjExMDcxNTEgQzgzLjA1MDgxMjQsMTQuOTgxMDM4NCA4NC4wMDg5MjM1LDE0LjA2NTQyNSA4NS4xOTA4MzU2LDE0LjA2NTQyNSBDODYuMzcyNTk5OCwxNC4wNjU0MjUgODcuMzMwODU4OSwxNC45ODEwMzg0IDg3LjMzMDg1ODksMTYuMTEwNzE1MSBMODcuMzMwODU4OSwxOS4xNTQwNzA2IEw4Ny4zMzA4NTg5LDIwLjUwMDIxOTEgTDg3LjMzMDg1ODksMjEuMzUzNDk3NyBMODcuMzMwODU4OSwyMi42NjY3Nzg4IEM4Ny4zMzA4NTg5LDIyLjc3NTAxNDcgODcuNDIyNjI5MiwyMi44NjI3MDg1IDg3LjUzNTg2MTgsMjIuODYyNzA4NSBMOTAuMDU3MzIzNywyMi44NjI3MDg1IEM5MC4xNzA3MDQ0LDIyLjg2MjcwODUgOTAuMjYyNDc0NywyMi43NzUwMTQ3IDkwLjI2MjQ3NDcsMjIuNjY2Nzc4OCBMOTAuMjYyNDc0NywyMS4zNTM0OTc3IEw5MC4yNjI0NzQ3LDE5LjE1NDA3MDYgTDkwLjI2MjQ3NDcsMTYuMTEwNzE1MSBDOTAuMjYyNDc0NywxMy40MzM4NiA4Ny45OTE3NTI4LDExLjI2MzkwMDMgODUuMTkwODM1NiwxMS4yNjM5MDAzIiBpZD0iRmlsbC01IiBmaWxsPSIjMDAwMDAwIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTAxLjc1NjI1NiwxMC42MjI5ODUxIEMxMDEuODY5NDg4LDEwLjYyMjk4NTEgMTAxLjk2MTI1OSwxMC41MzUxNDk3IDEwMS45NjEyNTksMTAuNDI3MDU1NCBMMTAxLjk2MTI1OSw4LjAxMzg0ODI0IEMxMDEuOTYxMjU5LDcuOTA1NjEyMzUgMTAxLjg2OTQ4OCw3LjgxNzkxODYgMTAxLjc1NjI1Niw3LjgxNzkxODYgTDk0Ljc4Mjc1Miw3LjgxNzkxODYgTDkyLjEwOTcyMTIsNy44MTc5MTg2IEM5MS45OTY0ODg1LDcuODE3OTE4NiA5MS45MDQ3MTgzLDcuOTA1NjEyMzUgOTEuOTA0NzE4Myw4LjAxMzg0ODI0IEw5MS45MDQ3MTgzLDEwLjQyNzA1NTQgTDkxLjkwNDcxODMsMTMuNTIwMjc4NyBMOTEuOTA0NzE4MywxNS45MzMzNDQzIEw5MS45MDQ3MTgzLDIwLjI2OTcyMiBMOTEuOTA0NzE4MywyMi42ODI5MjkyIEM5MS45MDQ3MTgzLDIyLjc5MTE2NTEgOTEuOTk2NDg4NSwyMi44Nzg4NTg4IDkyLjEwOTcyMTIsMjIuODc4ODU4OCBMOTQuNzgyNzUyLDIyLjg3ODg1ODggTDEwMS43NTYyNTYsMjIuODc4ODU4OCBDMTAxLjg2OTQ4OCwyMi44Nzg4NTg4IDEwMS45NjEyNTksMjIuNzkxMTY1MSAxMDEuOTYxMjU5LDIyLjY4MjkyOTIgTDEwMS45NjEyNTksMjAuMjY5NzIyIEMxMDEuOTYxMjU5LDIwLjE2MTQ4NjEgMTAxLjg2OTQ4OCwyMC4wNzM3OTI0IDEwMS43NTYyNTYsMjAuMDczNzkyNCBMOTQuOTg3NzU0OSwyMC4wNzM3OTI0IEw5NC45ODc3NTQ5LDE2LjEyOTQxNTYgTDEwMS40MDkwMDksMTYuMTI5NDE1NiBDMTAxLjUyMjM5LDE2LjEyOTQxNTYgMTAxLjYxNDE2LDE2LjA0MTU4MDIgMTAxLjYxNDE2LDE1LjkzMzM0NDMgTDEwMS42MTQxNiwxMy41MjAyNzg3IEMxMDEuNjE0MTYsMTMuNDEyMDQyOCAxMDEuNTIyMzksMTMuMzI0MzQ5MSAxMDEuNDA5MDA5LDEzLjMyNDM0OTEgTDk0Ljk4Nzc1NDksMTMuMzI0MzQ5MSBMOTQuOTg3NzU0OSwxMC42MjI5ODUxIEwxMDEuNzU2MjU2LDEwLjYyMjk4NTEgWiIgaWQ9IkZpbGwtNyIgZmlsbD0iIzAwMDAwMCI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTEwOC4xNDA0NzYsMjIuODMzMzgyOCBDMTA1LjMzOTU1OSwyMi44MzMzODI4IDEwMy4wNjg4MzcsMjAuNjYzNDIzIDEwMy4wNjg4MzcsMTcuOTg2NTY3OSBMMTAzLjA2ODgzNywxNC45NDMyMTI1IEwxMDMuMDY4ODM3LDEyLjc0MzY0MzcgTDEwMy4wNjg4MzcsMTEuNDMwMzYyNSBDMTAzLjA2ODgzNywxMS4zMjIyNjgzIDEwMy4xNjA2MDcsMTEuMjM0NDMyOSAxMDMuMjczOTg4LDExLjIzNDQzMjkgTDEwNS43OTU0NSwxMS4yMzQ0MzI5IEMxMDUuOTA4NjgyLDExLjIzNDQzMjkgMTA2LjAwMDQ1MywxMS4zMjIyNjgzIDEwNi4wMDA0NTMsMTEuNDMwMzYyNSBMMTA2LjAwMDQ1MywxMi43NDM2NDM3IEwxMDYuMDAwNDUzLDEzLjU5NzA2MzkgTDEwNi4wMDA0NTMsMTQuOTQzMjEyNSBMMTA2LjAwMDQ1MywxNy45ODY1Njc5IEMxMDYuMDAwNDUzLDE5LjExNjEwMyAxMDYuOTU4NzEyLDIwLjAzMTcxNjQgMTA4LjE0MDQ3NiwyMC4wMzE3MTY0IEMxMDkuMzIyMzg4LDIwLjAzMTcxNjQgMTEwLjI4MDQ5OSwxOS4xMTYxMDMgMTEwLjI4MDQ5OSwxNy45ODY1Njc5IEwxMTAuMjgwNDk5LDE0Ljk0MzIxMjUgTDExMC4yODA0OTksMTMuNTk3MDYzOSBMMTEwLjI4MDQ5OSwxMi43NDM2NDM3IEwxMTAuMjgwNDk5LDExLjQzMDM2MjUgQzExMC4yODA0OTksMTEuMzIyMjY4MyAxMTAuMzcyMjY5LDExLjIzNDQzMjkgMTEwLjQ4NTY1LDExLjIzNDQzMjkgTDExMy4wMDcxMTIsMTEuMjM0NDMyOSBDMTEzLjEyMDM0NSwxMS4yMzQ0MzI5IDExMy4yMTIxMTUsMTEuMzIyMjY4MyAxMTMuMjEyMTE1LDExLjQzMDM2MjUgTDExMy4yMTIxMTUsMTIuNzQzNjQzNyBMMTEzLjIxMjExNSwxNC45NDMyMTI1IEwxMTMuMjEyMTE1LDE3Ljk4NjU2NzkgQzExMy4yMTIxMTUsMjAuNjYzNDIzIDExMC45NDE1NDEsMjIuODMzMzgyOCAxMDguMTQwNDc2LDIyLjgzMzM4MjgiIGlkPSJGaWxsLTkiIGZpbGw9IiMwMDAwMDAiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMTcuNjExMzc0LDIyLjgxMjE0NjQgTDExNC44MzQ3MzEsMjIuODEyMTQ2NCBDMTE0Ljc5Mzg3OSwyMi44MTIxNDY0IDExNC43NjA3MjMsMjIuNzgwNDEyMyAxMTQuNzYwNzIzLDIyLjc0MTMxMTQgTDExNC43NjA3MjMsNy44ODg3Njc3OCBDMTE0Ljc2MDcyMyw3Ljg0OTY2Njg1IDExNC43OTM4NzksNy44MTc5MzI3NyAxMTQuODM0NzMxLDcuODE3OTMyNzcgTDExNy42MTEzNzQsNy44MTc5MzI3NyBDMTE3LjY1MjIyNiw3LjgxNzkzMjc3IDExNy42ODUzODIsNy44NDk2NjY4NSAxMTcuNjg1MzgyLDcuODg4NzY3NzggTDExNy42ODUzODIsMjIuNzQxMzExNCBDMTE3LjY4NTM4MiwyMi43ODA0MTIzIDExNy42NTIyMjYsMjIuODEyMTQ2NCAxMTcuNjExMzc0LDIyLjgxMjE0NjQiIGlkPSJGaWxsLTExIiBmaWxsPSIjMDAwMDAwIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTM4LjE4MDkwOCwxMS43MjI4Njg2IEMxMzcuMjMwMzQ2LDExLjkwMzkyMjkgMTM2LjQxMzI5NCwxMi4zMjYwOTk2IDEzNS43OTEwMzMsMTIuODk3NTk2NSBMMTM1Ljc5MTAzMywxMS40MjU5MjgzIEMxMzUuNzkxMDMzLDExLjMxNzY5MjQgMTM1LjY5OTI2MywxMS4yMjk5OTg2IDEzNS41ODYxNzgsMTEuMjI5OTk4NiBMMTMzLjIzMjEyMywxMS4yMjk5OTg2IEMxMzMuMTE5MTg2LDExLjIyOTk5ODYgMTMzLjAyNzI2OCwxMS4zMTc2OTI0IDEzMy4wMjcyNjgsMTEuNDI1OTI4MyBMMTMzLjAyNzI2OCwyMi42ODk5NzAyIEMxMzMuMDI3MjY4LDIyLjc5ODIwNjEgMTMzLjExOTE4NiwyMi44ODU4OTk4IDEzMy4yMzIxMjMsMjIuODg1ODk5OCBMMTM1LjU4NjE3OCwyMi44ODU4OTk4IEMxMzUuNjk5MjYzLDIyLjg4NTg5OTggMTM1Ljc5MTAzMywyMi43OTgyMDYxIDEzNS43OTEwMzMsMjIuNjg5OTcwMiBMMTM1Ljc5MTAzMywxNi44MjkwODEzIEMxMzUuODQ0MzE5LDE2LjI1MDY0MjYgMTM2LjAxNjc1OCwxNS44Mzc2NzQ1IDEzNi40MzAwMiwxNS40MTkwMzk2IEMxMzcuMDE3MDU0LDE0Ljc0NTM5ODYgMTM3LjgzMzUxMywxNC4zMzg5NDczIDEzOC44MjY3MDQsMTQuMTQ5ODE3OCBDMTM4Ljg3MDk2MSwxNC4xNDE0NTkzIDEzOC45MTU5NTgsMTQuMTM2Nzg0MiAxMzguOTE1OTU4LDE0LjEzNjc4NDIgQzEzOC45NjA5NTUsMTQuMTMyOTU5MSAxMzguOTk5MTQzLDE0LjEwNzg4MzUgMTM4Ljk5OTE0MywxNC4wNTQ3NTcyIEMxMzguOTk1Mjk1LDEyLjYxMTk4OTcgMTM4Ljk5ODEwNywxMi4wODY5NjA2IDEzOC45OTg5OTUsMTIuMDU3MzUxNiBDMTM5LjAwMTA2OCwxMS45ODY1MTY2IDEzOC45OTkyOTEsMTEuNzQ1Mzk0MiAxMzguOTk5MjkxLDExLjY4NzMwOTUgQzEzOC45OTkyOTEsMTEuNjUyNzQyIDEzOC45OTE1OTUsMTEuNjM0MTgzMiAxMzguOTM1NjQ0LDExLjYzNzcyNSBDMTM4LjkzNTY0NCwxMS42Mzc3MjUgMTM4LjU0NDQzNywxMS42NTM1OTIgMTM4LjE4MDkwOCwxMS43MjI4Njg2IiBpZD0iRmlsbC0xMyIgZmlsbD0iIzAwMDAwMCI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTEyMy4wMTM2ODIsMTQuODI1NDI4IEMxMjMuNjIzMjE0LDE0LjI1MzM2NDQgMTI0LjM4NjUzNSwxMy45NjcwNDkzIDEyNS4zMDMzNSwxMy45NjcwNDkzIEMxMjYuMjQxOTIzLDEzLjk2NzA0OTMgMTI3LjAxMTkwNSwxNC4yNDk5NjQ0IDEyNy42MTQ2MjgsMTQuODE1MzY5NCBDMTI3LjgyOTU0OCwxNS4wMTY5NjU5IDEyNy45ODE1NjEsMTUuMjA2Mzc4NyAxMjguMTE3MTQ0LDE1LjQ1MjQ1OTUgQzEyOC4xMzI2ODYsMTUuNDgwNjUxOSAxMjguMTY5ODM4LDE1LjU0NDU0NSAxMjguMTc5NjA3LDE1LjU3NDg2MjQgQzEyOC4yMDc0MzUsMTUuNjYwMTQ3OCAxMjguMTM5NzkxLDE1LjY2MDE0NzggMTI4LjEzOTc5MSwxNS42NjAxNDc4IEwxMjIuNDg3OTI3LDE1LjY2MDE0NzggQzEyMi40ODc5MjcsMTUuNjYwMTQ3OCAxMjIuNDA1OTI2LDE1LjY2MDE0NzggMTIyLjQ0NTE1LDE1LjU4MjkzNzYgQzEyMi40ODQ1MjMsMTUuNTA1ODY5MSAxMjIuNTI4MTg4LDE1LjQzMTA2NzQgMTIyLjU3NDY2NSwxNS4zNTc4MjM5IEMxMjIuNjk1NzQyLDE1LjE2Njk5NDQgMTIyLjgzOTc2MiwxNC45ODgzNDg1IDEyMy4wMTM2ODIsMTQuODI1NDI4IE0xMjcuNjYyMjksMTkuMTcyMDA2IEMxMjcuNjQxNzE1LDE5LjE5NDk1NjUgMTI3LjYyMTczMywxOS4yMTgzMzIxIDEyNy41OTg3OSwxOS4yNDAwMDc2IEMxMjYuOTg1NDEsMTkuODE1MDQ2MiAxMjYuMjE2OTA4LDIwLjEwMjQ5NDcgMTI1LjI5MjY5MywyMC4xMDI0OTQ3IEMxMjQuMzY4NjI1LDIwLjEwMjQ5NDcgMTIzLjYwNTMwNCwxOS44MTg1ODggMTIzLjAwMzE3MywxOS4yNDk2NDEyIEMxMjIuNzM1MjYzLDE4Ljk5NjkwMTkgMTIyLjUzMTU5MiwxOC43MDcwNDUgMTIyLjM4NjA5MiwxOC4zODM0NzA2IEMxMjIuMzIyMDAxLDE4LjI0MTIzMzkgMTIyLjI2ODcxNSwxOC4wOTI2MjIxIDEyMi4yMjcyNywxNy45Mzc0OTM0IEMxMjIuMjE5MTI5LDE3LjkwNzQ1OTQgMTIyLjIyMzQyMiwxNy44ODU3ODM5IDEyMi4yMzI4OTUsMTcuODcwMzQxOCBDMTIyLjI0MzEwOCwxNy44NTMzNDE0IDEyMi4yNjQ4NjYsMTcuODMzMzY1OSAxMjIuMjkxNjU3LDE3LjgzMjk0MDkgQzEyMi4zMDk3MTUsMTcuODMyNzk5MyAxMjIuMzkzOTM3LDE3LjgzMjk0MDkgMTIyLjM5MzkzNywxNy44MzI5NDA5IEwxMjQuNjgyNTY4LDE3LjgzMjk0MDkgTDEyOC40MTI4ODIsMTcuODMyOTQwOSBDMTI5LjA3NDgxMiwxNy44MzI3OTkzIDEzMC41MDI0MzEsMTcuODMyNzk5MyAxMzEuMTY0MzYxLDE3LjgzMjk0MDkgQzEzMS4xNjc2MTcsMTcuODMyOTQwOSAxMzEuMzM2MDYsMTcuODM1Nzc0MyAxMzEuMzUzOTcsMTcuNjk0OTU0MyBDMTMxLjM1Mzk3LDE3LjY5NDk1NDMgMTMxLjM5MzkzNSwxNy4zNjIzMTMxIDEzMS4zOTM5MzUsMTcuMDI0NTcxOCBDMTMxLjM5NDIzMSwxNi4yMTUwNjkzIDEzMS4xNzU5MDYsMTUuNDYzNjUxNSAxMzEuMTc1OTA2LDE1LjQ2MzY1MTUgQzEzMS4wNDA3NjcsMTQuOTk5MjU3MSAxMzAuODQzMzEzLDE0LjU1MTE1NDggMTMwLjU4MzI0OCwxNC4xMTk2Mjc5IEMxMzAuMDQzMTM2LDEzLjIyMjU3MzMgMTI5LjI5MTA2NCwxMi41MTI1MjMyIDEyOC4zMjc2MjQsMTEuOTg4OTEwOCBDMTI3LjM2Mzc0LDExLjQ2NjAwNjcgMTI2LjMzNDQzMywxMS4yMDQwNTg4IDEyNS4yMzk3MDMsMTEuMjA0MDU4OCBDMTIzLjcyNTE5NywxMS4yMDQwNTg4IDEyMi4zODQ2MTIsMTEuNzA3MTI5MSAxMjEuMjE4NTM3LDEyLjcxMjU2MTMgQzExOS44ODg0NiwxMy44Njc3Mzg2IDExOS4yMjM4NjYsMTUuMzEyMjA2MiAxMTkuMjIzODY2LDE3LjA0NTExMzkgQzExOS4yMjM4NjYsMTguNjYyMTM1NiAxMTkuODEyMDg0LDIwLjAzNjYxODIgMTIwLjk4ODgxNSwyMS4xNjgxMzY2IEMxMjIuMTY1Njk1LDIyLjI5OTM3MTggMTIzLjU4NjIxLDIyLjg2NTQ4NTIgMTI1LjI1MDA2NCwyMi44NjU0ODUyIEMxMjYuMzgwNjE0LDIyLjg2NTQ4NTIgMTI3LjQxNTg0MiwyMi42MDg2Mzc0IDEyOC4zNTQ0MTUsMjIuMDk1NjUwMyBDMTI5LjE2MzkxNywyMS42NTMwNzMxIDEyOS44MTc3MDcsMjEuMDUzODA4OSAxMzAuMzMzMjQ4LDIwLjMxNTE0MTQgQzEzMC4zNDM2MDksMjAuMzAwMjY2MSAxMzAuMzQ5MjM0LDIwLjI2NDk5MDIgMTMwLjMxMTkzNCwyMC4yNDc4NDgyIEMxMzAuMDM5NDM1LDIwLjEyMjg5NTIgMTI5Ljc2MDg2OCwyMC4wMTAxMjU5IDEyOS40ODUyNjEsMTkuODkxNTQ4MSBDMTI5LjA0MDc2OCwxOS43MDA0MzUyIDEyOC41OTU5NzgsMTkuNTA5ODg5IDEyOC4xNTA3NDQsMTkuMzE5OTA5NSBDMTI3LjkwNTc3NywxOS4yMTUzNTcgMTI3Ljg2Mzg4OCwxOS4xOTc2NDgzIDEyNy44MTk5MjcsMTkuMTc4ODA2MiBDMTI3Ljc3MzAwNiwxOS4xNTg1NDc0IDEyNy43MTMwNTksMTkuMTE1NzYzIDEyNy42NjIyOSwxOS4xNzIwMDYiIGlkPSJGaWxsLTE1IiBmaWxsPSIjMDAwMDAwIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNDcuMTg5ODk1OSwxNy4wMTU5MTU3IEM0Ny4xODk4OTU5LDE3LjIwMzM0NTIgNDcuMDg1MjQ4MiwxNy4zNzY0NjYgNDYuOTE1NDczMiwxNy40NzAyNTE1IEw0My44MjgxNDQsMTkuMTczNjkxOSBDNDMuNjU4NTE3MSwxOS4yNjc0Nzc0IDQzLjQ0OTA3MzcsMTkuMjY3NDc3NCA0My4yNzkxNTA3LDE5LjE3MzY5MTkgTDQwLjE5MTk2OTUsMTcuNDcwMjUxNSBDNDAuMDIxNzUwNSwxNy4zNzY0NjYgMzkuOTE3NTQ2OCwxNy4yMDMzNDUyIDM5LjkxNzU0NjgsMTcuMDE1OTE1NyBMMzkuOTE3NTQ2OCwxMy42MDkwMzUgQzM5LjkxNzU0NjgsMTMuNDIxNjA1NiA0MC4wMjE3NTA1LDEzLjI0ODQ4NDggNDAuMTkxOTY5NSwxMy4xNTQ0MTU5IEw0My4yNzkxNTA3LDExLjQ1MTExNzIgQzQzLjQ0OTA3MzcsMTEuMzU3NDczMyA0My42NTg1MTcxLDExLjM1NzQ3MzMgNDMuODI4MTQ0LDExLjQ1MTExNzIgTDQ2LjkxNTQ3MzIsMTMuMTU0NDE1OSBDNDcuMDg1MjQ4MiwxMy4yNDg0ODQ4IDQ3LjE4OTg5NTksMTMuNDIxNjA1NiA0Ny4xODk4OTU5LDEzLjYwOTAzNSBMNDcuMTg5ODk1OSwxNy4wMTU5MTU3IFogTTQ5Ljg2ODI1NTMsMTEuMTA5NTUwOCBMNDQuMjA1MTQyMiw3Ljk4NDg3NjcyIEM0My44MDE3OTcxLDcuNzYyMzEzMTIgNDMuMzA1MzQ5Niw3Ljc2MjMxMzEyIDQyLjkwMjE1MjUsNy45ODQ4NzY3MiBMMzcuMjM5MTg3NCwxMS4xMDk1NTA4IEMzNi44MzU5OTAzLDExLjMzMTk3MjcgMzYuNTg3NjE4NSwxMS43NDI5NTc1IDM2LjU4NzYxODUsMTIuMTg3NjU5NyBMMzYuNTg3NjE4NSwxOC40MzcwMDc4IEMzNi41ODc2MTg1LDE4Ljg4MTk5MzMgMzYuODM2Mjg2MywxOS4yOTI5NzggMzcuMjM5MTg3NCwxOS41MTU0IEw0Mi45MDIxNTI1LDIyLjY0MDIxNTcgQzQzLjMwNTM0OTYsMjIuODYyMzU0MyA0My44MDE3OTcxLDIyLjg2MjM1NDMgNDQuMjA1MTQyMiwyMi42NDAyMTU3IEw0OS44NjgyNTUzLDE5LjUxNTQgQzUwLjI3MTE1NjQsMTkuMjkyOTc4IDUwLjUxOTUyODEsMTguODgxOTkzMyA1MC41MTk1MjgxLDE4LjQzNzAwNzggTDUwLjUxOTUyODEsMTIuMTg3NjU5NyBDNTAuNTE5NTI4MSwxMS43NDI5NTc1IDUwLjI3MTE1NjQsMTEuMzMxOTcyNyA0OS44NjgyNTUzLDExLjEwOTU1MDggTDQ5Ljg2ODI1NTMsMTEuMTA5NTUwOCBaIiBpZD0iRmlsbC0xNyIgZmlsbD0iIzAwMDAwMCI+PC9wYXRoPgogICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgPG1hc2sgaWQ9Im1hc2stMiIgZmlsbD0id2hpdGUiPgogICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgICAgICAgICAgICAgIDwvbWFzaz4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iQ2xpcC0yMCI+PC9nPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yNi40NjE3OTE3LDEyLjQ3NjY2NjUgQzI1LjgxMTU1NSwxMy4yNjQ3NzY4IDI0LjEzOTcwOCwxMy41ODQ1MjYxIDIyLjgxMTQwNzUsMTMuMTc4NzgzMSBDMjEuNTQ0MDg5OSwxMi43OTE0NTczIDIxLjEzNTU2NDIsMTEuOTAyOTAyOSAyMS44MjIwNjQ5LDExLjIwMjYyOCBDMjIuNDgzNjk4OSwxMC41MjgyNzg3IDIzLjk2MzcxNjQsMTAuMjM3MTQ2OCAyNS4xOTcyODYzLDEwLjU0MTg3OSBDMjYuNDg1OTE4NCwxMC44NjAwNjk5IDI3LjA4NTgyOTQsMTEuNzIwMjkwMiAyNi40NjE3OTE3LDEyLjQ3NjY2NjUgTTIwLjYwMTM3MjUsMTAuODY3NDM2NyBDMTkuOTA3NjE4OSwxMS41NDUxODYxIDE4LjQxOTE2NDUsMTEuODM2NzQzIDE3LjM0NDEyMDMsMTEuNTA4MjEwMiBDMTYuNzQ1OTg1NCwxMS4zMjU0NTU5IDE2LjQxNjA1NjUsMTAuOTQ0NjQ2OSAxNi4zOTg0NDI2LDEwLjYyNjU5NzcgQzE2LjM4NDgyNSwxMC4zODE2NTAyIDE1Ljk5ODc5NzksMTAuMTU3MTAzMiAxNS41NzM2OTQ0LDEwLjAzNTY5MiBDMTUuMTQ1Nzc4NSw5LjkxMzE0NzQyIDE0LjY1MTI1NTIsOS45MjQ2MjI2OSAxNC4xNTUzOTk4LDkuOTgyNDI0MDYgQzE0LjAyOTE0MTcsOS45OTcyOTk0MiAxMy43NjM4OTYsMTAuMDUyMTI1NyAxMy41OTM5NzMsMTAuMTA2Mzg1MyBDMTMuMTM4MDgyMSwxMC4yNTE3Mzg4IDEyLjc0Mjg3NzksMTAuNDE1NzkyNyAxMi40MTM5ODUxLDEwLjY3NzQ1NzIgQzEyLjAwNDcxOTMsMTEuMDAzMTU2NiAxMS44Njg1NDQxLDExLjU4MTQ1MzYgMTEuODc3ODY5MiwxMS43OTYzNjcgQzExLjg5MTMzODcsMTIuMDk3NTU3NSAxMi4xODE4OTUyLDEyLjM1NTI1NTMgMTIuNjIzNzI0NSwxMi41MTQzNTA3IEMxMy4wNTgxNTMxLDEyLjY3MDYxMjggMTMuNTk4NTYxNSwxMi42OTkwODg0IDE0LjEzNjc0OTcsMTIuNjE3NjI4MiBDMTQuNzk0Mzg3MiwxMi40NDg2MTU4IDE1LjUxNDMzOTcsMTIuNDQxNTMyMyAxNi4xMDQ3Nzc3LDEyLjY0MDQzNzEgQzE3LjE4NjAzODYsMTMuMDA0NjcwNyAxNy40NTkyNzcyLDEzLjkzNjcxNzggMTYuNjQxMDQxNywxNC43MzU3MzY3IEMxNS43ODkyMDY1LDE1LjU2ODE4OTggMTQuMTQ5NjI3MSwxNS44ODA3MTM4IDEzLjA2MDIyNTMsMTUuNDIyMjY5NiBDMTIuNDU2NDY1OCwxNS4xNjgyNTUzIDEyLjI0MzkxNDEsMTQuNzAzODYxIDEyLjIxMTc5NDUsMTQuMjc0NzQyNCBDMTIuMTg2NDgzNywxMy45Mzk4MzQ1IDExLjg3MjU0MDYsMTMuNjcxNTExNSAxMS40NDU2NjA4LDEzLjUwNDA1NzUgQzExLjAxNjQxMjgsMTMuMzM1NjExOSAxMC41MTQ0ODg3LDEzLjM0MTU2MiA5Ljk1MzIwOTk4LDEzLjM4NzYwNDggQzkuODc5MzQ5NzIsMTMuMzkzNjk2NiA5LjU0NTcyMDQyLDEzLjQ1Nzg3MzEgOS4zMzk4Mjk0LDEzLjUwOTg2NiBDOS4wNTg1OTc5NiwxMy41ODA3MDEgOC40ODA4ODkzNywxMy43MzU5NzEzIDcuOTk1NTQzMTEsMTQuMTkyOTk4OCBDNy42MTIxODAyNSwxNC41NTQyNTc0IDcuNDQxMjIxMTQsMTQuODk1MTE1NSA3LjM0MzIzNDE4LDE1LjEwMDM5NTMgQzcuMjg3MjgzOTMsMTUuMjE4MTIzMSA3LjIxODkwMDI4LDE1LjQ4NTAyOTUgNy4yMTU5Mzk5NSwxNS41NzY0MDY2IEM3LjIwMzM1ODU0LDE1Ljk1MzUzMjIgNy40MjcwMTE1NSwxNi4yOTQ5NTcgNy44NjMzNjQzMywxNi41MTQxMjA1IEM4LjI5MzIwNDM5LDE2LjczMDAyNTYgOC44NjA2OTk4NCwxNi43ODc2ODUzIDkuNDQ4MDI5NSwxNi43MDU1MTY3IEMxMC4xNzg2MzkyLDE2LjUxNjM4NzIgMTAuOTQ1MzY0OSwxNi41MzYwNzk0IDExLjUzODMxOTIsMTYuODEyOTAyNiBDMTIuNjI4MDE3LDE3LjMyMTkyMyAxMi43NTUzMTEzLDE4LjUzMTY0MzMgMTEuNzMxOTI0OCwxOS41MzEyNjcgQzEwLjY2MDcyOTEsMjAuNTc3NjQxOCA4LjgzNjEyOTA5LDIwLjkxMzM5OTggNy43NTY2NDQ0LDIwLjI2ODM3NjIgQzcuMTY1MTcwMjcsMTkuOTE1MDUxMSA2Ljk5MzQ3MTA4LDE5LjM4MjIzMDIgNy4wNzY5NTI0MSwxOC43NjE0MzIxIEM3LjA3Njk1MjQxLDE4Ljc2MDI5ODcgNy4wNzYyMTIzMywxOC43NTkxNjU0IDcuMDc2MjEyMzMsMTguNzU3ODkwNCBDNy4wNzYyMTIzMywxOC43NTQ2MzE5IDcuMDc0Mjg4MTEsMTguNjA5NDIwMiA3LjA1NDE1Nzg2LDE4LjUzMTY0MzMgQzcuMDU0MTU3ODYsMTguNTMxNTAxNyA3LjAzODE3MjA4LDE4LjQwODUzMjEgNi45NTY0NjY5NCwxOC4yNTA4NTMzIEM2Ljg0Njc4NjY4LDE4LjAzOTQ4MTcgNi42NjUwMjIzNiwxNy44NjM5NTI1IDYuNDE4NTc0OCwxNy43Mjc5NDkzIEM1Ljk5ODA1OTc5LDE3LjQ5NTQ2ODggNS40NDI0MDU2NywxNy40MzU1NDI0IDQuODYyMzI4ODEsMTcuNTE4NTYxIEM0LjEzNTcxNTU4LDE3LjcwNjY5ODggMy40MjQ2NDQwOCwxNy42Nzk5MjMxIDIuOTU3OTQ3OSwxNy40MDExMTY1IEMyLjE2MjIxMDk0LDE2LjkyNTM4ODYgMi4zOTk5MjU1MSwxNS45MTU4NDggMy40MjE2ODM3NSwxNS4xNTMzNzk5IEMzLjk0ODkxODY5LDE0Ljc1OTgyMDYgNC41OTEzMTA1MSwxNC41MDE0MTQ1IDUuMTk2OTk0MjMsMTQuNDAwNTQ1NCBMNS4xOTk1MTA1MSwxNC4zOTg1NjIgQzUuNzc2OTIzMDcsMTQuMjg2OTI2MSA2LjM3MTUwNTU0LDE0LjAzNjU5NTEgNi44MzY4Njk1NywxMy42Nzk1ODY3IEM3LjI5Mzc5NjY2LDEzLjMyODgxMTcgNy41MzE5NTUyOCwxMi45NDcxNTI3IDcuNTUyNjc3NiwxMi42MTY3NzgyIEw3LjU1NDYwMTgxLDEyLjYxNTM2MTUgQzcuNTU2ODIyMDYsMTIuNjA3OTk0NiA3LjU2MjAwMjY0LDEyLjQzNzU2NTYgNy41MzAwMzEwNywxMi4yNTcwNzggQzcuNTA5NjA0NzgsMTEuOTcxODk2MiA3LjUyNDU1NDQ1LDExLjY4OTk3MjkgNy43OTU0MjQ3NCwxMS4zODIyNjU2IEM3Ljk2ODYwNDEsMTEuMTg2MDUyNiA4LjM0NDEyMjA4LDEwLjk5NTM2NDcgOC43NTUxNjQwNCwxMC45MjE0MTMgQzkuMDM2NTQzNSwxMC44NzA2OTUxIDkuMzk5MDM2MDIsMTAuODgyMTcwNCA5LjYwMzg5MDkzLDEwLjg3MTY4NjggQzkuNzgxMzYyNzcsMTAuODYyNjE5OSAxMC4wOTExNjE0LDEwLjgyODA1MjQgMTAuMjAwMjQ5NiwxMC43OTY3NDM0IEMxMC42MTQ1NDc5LDEwLjY3ODAyMzkgMTAuODYxNTg3NSwxMC41NDUyNzkxIDExLjE2ODcyMTksMTAuMzA5NjgxOCBDMTEuNDgyMzY4OSwxMC4wNjg5ODQ0IDExLjY3Njg2MjcsOS44MTYzODY3OSAxMS43MTA5MDY1LDkuNTg2MTczMDEgQzExLjcxODE1OTMsOS41Mzc0Mzg1MiAxMS43MzUxODEyLDkuMzEyMDQxNTEgMTEuNzMwMDAwNiw5LjI4NDk4MjUzIEMxMS42MjUzNTI5LDguNzQ0OTM2NCAxMi40MTE0Njg4LDguMTUyMzMwNjkgMTMuNDg2MjE3LDcuOTYxMjE3ODMgQzE0LjAzMDc2OTksNy44NjQ1OTg4NyAxNC41NDQyMzkzLDcuODg5ODE2MTQgMTQuOTMyNjM0Nyw4LjAwODExMDYxIEMxNC45NDU5NTYyLDguMDExMDg1NjggMTQuOTYwMTY1OCw4LjAxMzQ5NDA3IDE0Ljk3MzQ4NzMsOC4wMTY2MTA4MSBDMTUuMzY2NzY3Miw4LjExMzY1NDc4IDE1LjYxNjc2NzIsOC4yOTQ1Njc0IDE1LjcxMTc5MzgsOC41MTU5OTc2NCBMMTUuNzE1OTM4Myw4LjUxNzEzMSBDMTUuNzE2NTMwMyw4LjUyMjY1NjE0IDE1LjcxNzcxNDUsOC41Mjc4OTc5MyAxNS43MTg0NTQ1LDguNTMzNDIzMDYgQzE1LjczMzg0ODMsOC41NzMzNzQgMTUuNzQ1MzkzNiw4LjYxNDE3NDk3IDE1Ljc1MDU3NDEsOC42NTY1MzQzMSBDMTUuODQzODI0Niw4Ljg5MzgzMTYgMTYuMTE0MTAyOCw5LjA5NzQxMTQyIDE2LjU1MjgyMzgsOS4yMTMwMTQxNiBDMTYuOTgzNyw5LjMyNjQ5MTg1IDE3LjQ5Njg3MzQsOS4zMzQ1NjcwNCAxNy45OTM0Njg5LDkuMjU1MDkwMTYgQzE4LjU5MTc1MTgsOS4xMDIyMjgyIDE5LjI2ODAzOTQsOS4wNzc0MzU5NSAxOS44NDc2NzIyLDkuMjIwNTIyNjcgQzIwLjkwNTU0NjUsOS40ODE3NjIyIDIxLjI3MDI1OTIsMTAuMjEzOTEyOSAyMC42MDEzNzI1LDEwLjg2NzQzNjcgTTE4LjA5MDEyMzcsMjIuODgwOTEzMSBDMTcuMDMwNjIxMiwyNC4xNzIyMzUzIDE0LjkxNDQyODcsMjQuNTQ1MjUyNSAxMy40OTc2MTQyLDIzLjY5ODc3NDEgQzEyLjE2MzU0MTEsMjIuOTAxNDU1MiAxMi4wNDU3MTk5LDIxLjM1OTA5MzcgMTMuMTE4MDk5OCwyMC4yNjE1NzYgQzE0LjE0MDg5NDIsMTkuMjE0MzUxMiAxNS45NTg2ODU0LDE4Ljg3NzYwMTUgMTcuMjgyMzk3NCwxOS40OTU5OTEyIEMxOC42ODEzMDE4LDIwLjE0OTIzMTcgMTkuMDk1ODk2MSwyMS42NTUxODQgMTguMDkwMTIzNywyMi44ODA5MTMxIE0yOC40ODE2MjU1LDcuMjg2NDQzNTEgTDE1Ljc2ODQ4NDEsMC4yNjExNjg2ODkgQzE1LjEzODIyOTcsLTAuMDg3MDU2MjI5NyAxNC4zNjE4ODI5LC0wLjA4NzA1NjIyOTcgMTMuNzMxNzc2NCwwLjI2MTE2ODY4OSBMMS4wMTgzMzkwNSw3LjI4NjQ0MzUxIEMwLjM4ODA4NDU4OCw3LjYzNDY2ODQzIC0xLjQ4MDE2NTVlLTA1LDguMjc4Mjc1MzQgLTEuNDgwMTY1NWUtMDUsOC45NzQ1ODM1MSBMLTEuNDgwMTY1NWUtMDUsMjMuMDI1Mjc0OCBDLTEuNDgwMTY1NWUtMDUsMjMuNzIxODY2MyAwLjM4ODA4NDU4OCwyNC4zNjUxODk5IDEuMDE4MzM5MDUsMjQuNzEzNTU2NSBMMTMuNzMxNzc2NCwzMS43Mzg5NzMgQzE0LjM2MTg4MjksMzIuMDg3MDU2MiAxNS4xMzgyMjk3LDMyLjA4NzA1NjIgMTUuNzY4NDg0MSwzMS43Mzg5NzMgTDI4LjQ4MTYyNTUsMjQuNzEzNTU2NSBDMjkuMTExODc5OSwyNC4zNjUxODk5IDI5LjQ5OTk4NTIsMjMuNzIxODY2MyAyOS40OTk5ODUyLDIzLjAyNTI3NDggTDI5LjQ5OTk4NTIsOC45NzQ1ODM1MSBDMjkuNDk5OTg1Miw4LjI3ODI3NTM0IDI5LjExMTg3OTksNy42MzQ2Njg0MyAyOC40ODE2MjU1LDcuMjg2NDQzNTEiIGlkPSJGaWxsLTE5IiBmaWxsPSIjMDAyRkE3IiBtYXNrPSJ1cmwoI21hc2stMikiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+";

    let styleId = "oh-skillhub-style";
    function ensureCss(w) {
      if (!w.document.getElementById(styleId)) {
        const s = w.document.createElement("style");
        s.id = styleId;
        s.textContent = CSS;
        w.document.head.appendChild(s);
      }
    }

    // createPortal 来自 react-dom；拿不到时回退为直接渲染（面板仍是 fixed 定位）。
    const fallbackPortal = (node) => node;
    let createPortal = fallbackPortal;
    try {
      const rd = require("react-dom");
      if (rd && typeof rd.createPortal === "function") createPortal = rd.createPortal;
    } catch { /* overlay still works without portal */ }

    // ---------- 会话区测量 ----------
    function conversationRoot() {
      return typeof document === "undefined" ? null : document.querySelector("[data-phase]");
    }
    function conversationBox() {
      const el = conversationRoot();
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { top: r.top, left: r.left, width: r.width, height: r.height };
    }
    function useConversationBox(active) {
      const [box, setBox] = useState(null);
      const layout = React.useLayoutEffect || useEffect;
      layout(() => {
        if (!active) { setBox(null); return; }
        const update = () => setBox(conversationBox());
        update();
        const root = conversationRoot();
        const ro = root && typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
        if (root && ro) ro.observe(root);
        window.addEventListener("resize", update);
        window.addEventListener("scroll", update, true);
        return () => {
          if (ro) ro.disconnect();
          window.removeEventListener("resize", update);
          window.removeEventListener("scroll", update, true);
        };
      }, [active]);
      return box;
    }

    // ---------- HTTP（走 Host 本地路由 /skillhub） ----------
    async function api(method, body) {
      const res = await fetch("/skillhub", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.assign({ method }, body || {})),
      });
      let data;
      try { data = await res.json(); } catch {
        throw new Error(`HTTP ${res.status} ${res.statusText}（响应非 JSON）`);
      }
      if (!res.ok || !data || data.ok === false) {
        throw new Error((data && data.error) || `HTTP ${res.status} ${res.statusText}`);
      }
      return data;
    }

    function secLevel(score) {
      if (score == null) return { c: "gray", t: "未检测" };
      if (score <= 20) return { c: "green", t: "安全" };
      if (score <= 50) return { c: "blue", t: "低风险" };
      if (score <= 80) return { c: "orange", t: "中风险" };
      return { c: "red", t: "高风险" };
    }
    // 安全审计风险信号等级 → 展示文案与配色（wittyhub risk_signals severit）
    function secBadge(severity) {
      const s = String(severity || "").toUpperCase();
      if (s === "CRITICAL" || s === "HIGH") return { c: "red", t: s === "CRITICAL" ? "严重" : "高" };
      if (s === "MEDIUM") return { c: "orange", t: "中" };
      if (s === "LOW") return { c: "green", t: "低" };
      return { c: "gray", t: "未知" };
    }
    // 从风险信号中提取代码位置（data.location 或 name 末尾的 (file:line)）
    function sigLocation(s) {
      const loc = s && s.data && s.data.location;
      if (loc) {
        const f = String(loc.file || "");
        const ln = String(loc.start_line || loc.line || "");
        return f ? (ln ? f + " : " + ln : f) : String(loc);
      }
      const m = String(s.name || s.id || "").match(/\(([^)]+)\)/);
      return m ? m[1] : "";
    }
    // 安全审计结果表：risk_signals → 表格行
    function renderAuditTable(audit) {
      const signals = (audit && audit.risk_signals) || [];
      if (signals.length === 0) {
        const dl = audit && audit.details;
        const rec = dl && dl.recommendation;
        return h("p",{className:"oh-sec"}, rec ? "未发现具体风险信号。"+rec : "未发现具体风险信号。");
      }
      return h("div",{className:"oh-audit-table-wrap"},
        h("table",{className:"oh-audit-table"},
          h("thead",{}, h("tr",{},
            h("th",{},"风险等级"),
            h("th",{},"问题"),
            h("th",{},"位置"))),
          h("tbody",{}, signals.map((s,i)=>{
            const b = secBadge(s.severity);
            const loc = sigLocation(s);
            return h("tr",{key:s.id || ("sig"+i)},
              h("td",{}, h("span",{className:"oh-tag "+b.c}, b.t)),
              h("td",{className:"oh-audit-desc"}, s.description || s.name || "-"),
              loc ? h("td",{className:"oh-audit-loc"}, loc) : h("td",{}, "-"));
          }))));
    }
    function fmt(n) { return (Number(n) || 0).toLocaleString(); }
    // 平台英文值 → 中文展示（筛选栏「贡献者」）
    function platformLabel(name) {
      const k = String(name || "").toLowerCase();
      if (k === "enterprise") return "企业组织";
      if (k === "openeuler") return "社区SIG";
      if (k === "personal") return "个人";
      return String(name || "");
    }
    function fmtDate(s) {
      if (!s) return "-";
      const d = new Date(s);
      if (isNaN(d.getTime())) return "-";
      return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
    }
    // 标准分页序列：返回页码数组，省略号用 "…" 表示（含首页/尾页）。
    function paginate(page, total) {
      const windowSize = 2; // 当前页两侧的页码数
      const out = [];
      const add = (p) => { if (p >= 1 && p <= total && out[out.length-1] !== p) out.push(p); };
      add(1);
      let start = Math.max(2, page - windowSize);
      let end = Math.min(total - 1, page + windowSize);
      if (start > 2) out.push("…");
      for (let p = start; p <= end; p++) add(p);
      if (end < total - 1) out.push("…");
      add(total);
      return out;
    }

    // ---------- 轻量 markdown ----------
    function esc(s) { return String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
    function renderMd(src) {
      if (!src) return "";
      // 去掉 frontmatter
      let t = String(src).replace(/^---[\s\S]*?\n---\n?/,"");
      const blocks = t.split(/\n{2,}/);
      let out = "";
      for (const raw of blocks) {
        const line0 = raw.trim();
        if (line0.startsWith("```")) {
          const body = raw.replace(/^```[^\n]*\n?/,"").replace(/```$/,"");
          out += `<pre><code>${esc(body)}</code></pre>`;
          continue;
        }
        if (line0.startsWith("|")) {
          const rows = raw.split("\n").filter(r=>r.trim() && !/^\|?\s*:?-+:?\s*\|/.test(r));
          if (rows.length) {
            out += "<table>" + rows.map(r=>"<tr>"+r.trim().replace(/^\||\|$/g,"").split("|").map(c=>`<td>${esc(c.trim())}</td>`).join("")+"</tr>").join("")+"</table>";
          }
          continue;
        }
        if (line0.startsWith("#### ")) { out += `<h4>${esc(line0.slice(5))}</h4>`; continue; }
        if (line0.startsWith("### ")) { out += `<h3>${esc(line0.slice(4))}</h3>`; continue; }
        if (line0.startsWith("## ")) { out += `<h2>${esc(line0.slice(3))}</h2>`; continue; }
        if (line0.startsWith("# ")) { out += `<h1>${esc(line0.slice(2))}</h1>`; continue; }
        if (line0.startsWith("- ") || line0.startsWith("* ")) {
          out += "<ul>" + raw.split("\n").filter(l=>l.trim().startsWith("- ")||l.trim().startsWith("* ")).map(l=>`<li>${esc(l.replace(/^[-*]\s*/,""))}</li>`).join("") + "</ul>";
          continue;
        }
        if (/^\d+\.\s/.test(line0)) {
          out += "<ol>" + raw.split("\n").map(l=>`<li>${esc(l.replace(/^\d+\.\s*/,""))}</li>`).join("") + "</ol>";
          continue;
        }
        if (line0.startsWith("> ")) { out += `<blockquote>${esc(line0.slice(2))}</blockquote>`; continue; }
        out += `<p>${esc(line0).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/`([^`]+)`/g,"<code>$1</code>")}</p>`;
      }
      return out;
    }

    // ---------- 卡片 ----------
    function SkillCard({ item, onOpen }) {
      const sec = secLevel(item.risk_score);
      return h("button", { type:"button", className:"oh-card", onClick:()=>onOpen(item.skill_id) },
        h("div",{className:"oh-card-head"},
          h("span",{className:"oh-card-name"}, item.name || item.skill_id),
          h("span",{className:"oh-tag "+sec.c}, sec.t)),
        h("p",{className:"oh-card-desc"}, item.description || ""),
        h("div",{className:"oh-card-tags"},
          item.category ? h("span",{className:"oh-card-cat"}, item.categoryLabel || item.category) : null,
          (item.tags||[]).slice(0,3).map(t=>h("span",{key:t,className:"oh-card-cat"},t))),
        h("div",{className:"oh-card-foot"},
          h("span",{className:"oh-metric"},"⬇ "+fmt(item.download_count)),
          h("span",{className:"oh-metric"}, (item.author || "-"))),
      );
    }

    function SkillRow({ item, onOpen }) {
      const sec = secLevel(item.risk_score);
      return h("button",{type:"button",className:"oh-list-row",onClick:()=>onOpen(item.skill_id)},
        h("div",{className:"oh-list-main"},
          h("span",{className:"oh-list-name"}, item.name || item.skill_id),
          item.description ? h("span",{className:"oh-list-desc"}, item.description) : null),
        h("span",{className:"oh-card-cat"+(item.category?"":" muted")}, item.categoryLabel || item.category || "-"),
        h("span",{className:"oh-tag "+sec.c}, sec.t),
        h("span",{className:"oh-list-dcount"},"⬇ "+fmt(item.download_count)),
        h("span",{className:"oh-list-author"}, item.author || "-"));
    }

    // ---------- 已安装列表页 ----------
    function InstalledPage() {
      const [list, setList] = useState([]);
      const [loadErr, setLoadErr] = useState("");
      const [busySlug, setBusySlug] = useState("");
      const load = useCallback(() => {
        api("list").then(r=>{setList(r.items||[]);setLoadErr("");}).catch(e=>setLoadErr(e.message));
      }, []);
      useEffect(()=>{ load(); }, [load]);
      const uninstall = async (slug) => {
        setBusySlug(slug);
        try { await api("uninstall",{slug}); } catch(e){ setLoadErr(e.message); }
        setBusySlug("");
        load();
      };
      return h("div",{className:"oh-installed"},
        loadErr ? h("p",{className:"oh-err"},loadErr) : null,
        h("div",{className:"oh-installed-head"},
          h("span",{className:"oh-installed-title"},"已安装 Skill"),
          h("span",{className:"oh-installed-count"},"共 "+list.length+" 个")),
        list.length === 0
          ? h("div",{className:"oh-empty"},"暂无已安装的 Skill。回到「技能广场」打开技能详情即可安装。")
          : h("div",{className:"oh-installed-list"},
              list.map(it=>h("div",{key:it.slug,className:"oh-installed-item"},
                h("div",{className:"oh-installed-main"},
                  h("div",{className:"oh-installed-name"}, it.name),
                  it.description ? h("div",{className:"oh-installed-desc"}, it.description) : null,
                  h("div",{className:"oh-installed-meta"},
                    it.version ? h("span",{className:"oh-tag gray"},"v"+it.version) : null,
                    it.path ? h("span",{className:"oh-installed-path"},"📁 "+it.path) : null)),
                h("button",{type:"button",className:"oh-btn oh-btn-danger",disabled:busySlug===it.slug,onClick:()=>uninstall(it.slug)},
                  busySlug===it.slug?"卸载中…":"卸载")))));
    }

    // ---------- 列表页 ----------
    function ListPage({ onOpenDetail }) {
      const [items, setItems] = useState([]);
      const [total, setTotal] = useState(0);
      const [loading, setLoading] = useState(true);
      const [stats, setStats] = useState(null);
      const [q, setQ] = useState("");
      const [input, setInput] = useState("");
      const [category, setCategory] = useState([]);
      const [platform, setPlatform] = useState("");
      const [security, setSecurity] = useState("");
      const [sortBy, setSortBy] = useState("download_count");
      const [view, setView] = useState("card");
      const [page, setPage] = useState(1);
      const [loadErr, setLoadErr] = useState("");
      const [pageSize, setPageSize] = useState(12);
      const [jumpVal, setJumpVal] = useState("");
      const [section, setSection] = useState("browse");
      const PAGE_SIZE_OPTIONS = [12, 24, 48, 96];

      const load = useCallback(async (opts) => {
        setLoading(true);
        setLoadErr("");
        try {
          const sz = opts.pageSize || pageSize;
          const r = await api("search", {
            query: opts.q, category: (opts.category||[]).join(",") || undefined,
            platform: opts.platform || undefined,
            securityLevel: opts.security || undefined,
            sortBy: opts.sortBy, limit: sz, offset: (opts.page-1)*sz,
          });
          setItems(r.items || []);
          setTotal(r.total || 0);
        } catch (e) {
          setItems([]); setTotal(0);
          setLoadErr(e instanceof Error ? e.message : String(e));
        } finally { setLoading(false); }
      }, [pageSize]);
      const loadStats = useCallback(() => {
        api("stats").then(r=>r && r.stats && setStats(r.stats)).catch(()=>{});
      }, []);

      useEffect(() => {
        load({ q, category, platform, security, sortBy, page, pageSize });
      }, [q, category, platform, security, sortBy, page, pageSize, load]);
      useEffect(() => { loadStats(); }, [loadStats]);

      const totalPages = Math.max(1, Math.ceil(total / pageSize));
      const categories = useMemo(() => (stats && stats.categories) || [], [stats]);
      const platforms = useMemo(() => (stats && stats.platforms) || [], [stats]);
      // 贡献者排序：社区SIG(openeuler) 放在企业组织(enterprise) 上面，其余保持原顺序。
      const orderedPlatforms = useMemo(() => {
        const rank = { openeuler: 0, enterprise: 1 };
        return [...platforms].sort((a, b) => {
          const ka = String(a.name || "").toLowerCase();
          const kb = String(b.name || "").toLowerCase();
          const ra = rank[ka] ?? 99;
          const rb = rank[kb] ?? 99;
          return ra - rb;
        });
      }, [platforms]);
      const secLevels = useMemo(() => (stats && stats.security_levels) || [], [stats]);

      function toggle(arr, v) { return arr.includes(v) ? arr.filter(x=>x!==v) : [...arr, v]; }
      function resetFilter() { setCategory([]); setPlatform(""); setSecurity(""); }
      function changePageSize(sz) { if (sz !== pageSize) { setPageSize(sz); setPage(1); } }
      function goToPage() {
        const n = Number(jumpVal);
        if (Number.isInteger(n) && n >= 1 && n <= totalPages) setPage(n);
        setJumpVal("");
      }

      const hasFilter = category.length || platform || security;

      return h("div",{className:"oh-wrap"},
        // Hero
        h("div",{className:"oh-hero"},
          h("h1",{className:"oh-hero-title"},"openEuler SkillHub"),
          h("p",{className:"oh-hero-sub"},"与开发者共同探索、评估、贡献AI技能"),
          h("p",{className:"oh-hero-stats"},
            h("b",{}, fmt(stats && stats.total_skills)),
            " Skills　|　",
            h("b",{}, fmt(stats && stats.total_categories)),
            " 领域分类"),
          h("div",{className:"oh-search"},
            h("span",{className:"oh-search-icon"},
              h("svg",{width:20,height:20,viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",fill:"currentColor"},
                h("path",{d:"M17.549 16.523l0.087 0.074 2.76 2.754c0.274 0.273 0.274 0.716 0.001 0.99-0.246 0.246-0.629 0.271-0.903 0.075l-0.087-0.074-2.76-2.754c-0.274-0.273-0.274-0.716-0.001-0.99 0.246-0.246 0.629-0.271 0.903-0.075zM10.821 3.454c4.099 0 7.423 3.323 7.423 7.423s-3.323 7.423-7.423 7.423c-4.099 0-7.423-3.323-7.423-7.423s3.323-7.423 7.423-7.423zM10.821 4.854c-3.326 0-6.023 2.696-6.023 6.023s2.696 6.023 6.023 6.023c3.326 0 6.023-2.696 6.023-6.023s-2.696-6.023-6.023-6.023z"}))),
            h("input",{value:input,placeholder:"搜索 Skill",
              onKeyDown:e=>{if(e.key==="Enter"){setQ(input.trim());setPage(1);}},
              onChange:e=>setInput(e.target.value)}),
            input ? h("button",{type:"button",className:"oh-search-clear","aria-label":"清除","title":"清除",
                onClick:()=>{setInput("");setQ("");setPage(1);}},
              h("svg",{width:14,height:14,viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true"},
                h("path",{d:"M18.3 5.7a1 1 0 0 1 0 1.4L13.4 12l4.9 4.9a1 1 0 0 1-1.4 1.4L12 13.4l-4.9 4.9a1 1 0 0 1-1.4-1.4L10.6 12 5.7 7.1a1 1 0 0 1 1.4-1.4L12 10.6l4.9-4.9a1 1 0 0 1 1.4 0z"}))) : null),
          h("div",{className:"oh-section-nav"},
            h("button",{className:"oh-section-btn"+(section==="browse"?" on":""),onClick:()=>setSection("browse")},"技能广场"),
            h("button",{className:"oh-section-btn"+(section==="installed"?" on":""),onClick:()=>setSection("installed")},"已安装")),
        ),
        section === "installed"
          ? h(InstalledPage,{})
          : h("div",{className:"oh-main"},
          // 筛选侧栏
          h("div",{className:"oh-sidebar"},
            h("div",{className:"oh-sidebar-title"},"贡献者"),
            h("div",{className:"oh-filter-item "+(platform?"":"on"), onClick:()=>setPlatform("")},
              h("span",{className:"oh-filter-label"},h("span",{className:"oh-radio"+(platform?"":" on")}),"全部")),
            (orderedPlatforms||[]).map(p=>h("div",{key:p.name,className:"oh-filter-item "+(platform===p.name?"on":""),onClick:()=>setPlatform(platform===p.name?"":p.name)},
              h("span",{className:"oh-filter-label"},h("span",{className:"oh-radio"+(platform===p.name?" on":"")}),platformLabel(p.name)),
              h("span",{className:"oh-filter-count"},fmt(p.count)))),
            h("div",{className:"oh-sidebar-title","style":{"marginTop":"16px"}},"分类"),
            h("div",{className:"oh-filter-item "+(category.length?"":"on"), onClick:()=>setCategory([])},
              h("span",{className:"oh-filter-label"},h("span",{className:"oh-check"+(category.length?"":" on")},category.length?null:h("svg",{viewBox:"0 0 12 12",fill:"none"},h("path",{d:"M2.5 6L5 8.5L9.5 3.5",stroke:"white","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"}))),"全部")),
            categories.map(c=>h("div",{key:c.name,className:"oh-filter-item "+(category.includes(c.name)?"on":""),onClick:()=>setCategory(toggle(category,c.name))},
              h("span",{className:"oh-filter-label"},h("span",{className:"oh-check"+(category.includes(c.name)?" on":"")},category.includes(c.name)?h("svg",{viewBox:"0 0 12 12",fill:"none"},h("path",{d:"M2.5 6L5 8.5L9.5 3.5",stroke:"white","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})):null),String(c.label || c.name)),
              h("span",{className:"oh-filter-count"},fmt(c.count)))),
            h("div",{className:"oh-sidebar-title","style":{"marginTop":"16px"}},"安全等级"),
            h("div",{className:"oh-filter-item "+(security?"":"on"), onClick:()=>setSecurity("")},
              h("span",{className:"oh-filter-label"},h("span",{className:"oh-radio"+(security?"":" on")}),"全部")),
            secLevels.filter(l=>l.name!=="未检测").map(l=>h("div",{key:l.name,className:"oh-filter-item "+(security===l.name?"on":""),onClick:()=>setSecurity(security===l.name?"":l.name)},
              h("span",{className:"oh-filter-label"},h("span",{className:"oh-radio"+(security===l.name?" on":"")}),String(l.name)),
              h("span",{className:"oh-filter-count"},fmt(l.count)))),
            hasFilter ? h("button",{className:"oh-clear",onClick:resetFilter},"清空筛选") : null,
          ),
          // 内容
          h("div",{className:"oh-content"},
            h("div",{className:"oh-toolbar"},
              h("div",{style:{display:"flex",gap:"12px",alignItems:"center",flexWrap:"wrap"}},
                h("div",{className:"oh-tabs"},
                  h("button",{className:"oh-tab"+(sortBy==="download_count"?" on":""),onClick:()=>setSortBy("download_count")},"热门"),
                  h("button",{className:"oh-tab"+(sortBy==="updated_at"?" on":""),onClick:()=>setSortBy("updated_at")},"最新")),
                q ? h("span",{className:"oh-result-tip"},"为您找到 ",h("b",{},fmt(total))," 个与 \""+q+"\" 匹配的 Skill") : h("span",{className:"oh-result-tip"},"共 "+fmt(total)+" 个 Skill")),
              h("div",{className:"oh-view-toggle"},
                h("button",{className:"oh-view-btn"+(view==="card"?" on":""),onClick:()=>setView("card")},"▦ 卡片"),
                h("button",{className:"oh-view-btn"+(view==="list"?" on":""),onClick:()=>setView("list")},"☰ 列表")),
            ),
            loading ? h("div",{className:"oh-loading"},h("div",{className:"oh-spinner"}))
              : loadErr ? h("div",{className:"oh-empty"},h("p",{className:"oh-err"},"加载失败："+loadErr))
              : items.length === 0 ? h("div",{className:"oh-empty"},"暂无相关 Skill")
              : view === "card"
                ? h("div",{className:"oh-grid"},items.map(it=>h(SkillCard,{key:it.skill_id,item:it,onOpen:onOpenDetail})))
                : h("div",{className:"oh-list"},
                    h("div",{className:"oh-list-row head"},
                      h("span",{},"名称"),h("span",{},"分类"),h("span",{},"风险等级"),h("span",{},"下载量"),h("span",{},"贡献者")),
                    items.map(it=>h(SkillRow,{key:it.skill_id,item:it,onOpen:onOpenDetail}))),
            !loading && total > 0 ? h("div",{className:"oh-pager"},
              h("span",{className:"oh-pager-info"},"共 "+fmt(total)+" 条"),
              h("label",{className:"oh-pager-size"},
                h("span",{className:"oh-pager-size-label"},"每页"),
                h("select",{className:"oh-pager-select",value:pageSize,onChange:e=>{setJumpVal("");changePageSize(Number(e.target.value));}},
                  PAGE_SIZE_OPTIONS.map(sz=>h("option",{key:sz,value:sz},sz)))),
              h("div",{className:"oh-pager-pages"},
                h("button",{className:"oh-page-btn",disabled:page<=1,onClick:()=>setPage(page-1)},"‹"),
                paginate(page,totalPages).map((p,i)=> p==="…"
                  ? h("span",{key:"e"+i,className:"oh-page-ellipsis"},"…")
                  : h("button",{key:p,className:"oh-page-btn"+(p===page?" on":""),onClick:()=>setPage(p)},p)),
                h("button",{className:"oh-page-btn",disabled:page>=totalPages,onClick:()=>setPage(page+1)},"›")),
              h("span",{className:"oh-pager-jumper"},
                "跳至",
                h("input",{className:"oh-pager-jump-input",type:"text",inputMode:"numeric",value:jumpVal,placeholder:""+page,
                  onChange:e=>setJumpVal(e.target.value.replace(/[^0-9]/g,"")),
                  onKeyDown:e=>{ if(e.key==="Enter") goToPage(); }}),
                "页"),
            ) : null,
          ),
        ),
      );
    }

    // ---------- 详情页 ----------
    function DetailPage({ skill_id, onClose }) {
      const [skill, setSkill] = useState(null);
      const [installed, setInstalled] = useState(false);
      const [audit, setAudit] = useState(null);
      const [tab, setTab] = useState("overview");
      const [busy, setBusy] = useState(false);
      const [err, setErr] = useState("");
      const [webBase, setWebBase] = useState("https://skillhub.openeuler.org");

      useEffect(() => {
        setErr("");
        api("detail",{slug:skill_id}).then(r=>{setSkill(r.skill);setInstalled(!!r.installed);}).catch(e=>setErr(e.message));
        api("audit",{slug:skill_id}).then(r=>setAudit(r.audit||null)).catch(()=>{});
        fetch("/skillhub?method=config")
          .then((r) => r.json())
          .then((d) => { if (d && d.ok && d.webBase) setWebBase(d.webBase); })
          .catch(() => {});
      }, [skill_id]);

      if (err) return h("div",{className:"oh-overlay"},
        h("div",{className:"oh-drawer"},
          h("div",{className:"oh-drawer-head"},h("strong",{},"加载失败"),h("button",{className:"oh-drawer-close",onClick:onClose},"×")),
          h("div",{className:"oh-drawer-body"},h("p",{className:"oh-err"},err))));

      if (!skill) return h("div",{className:"oh-overlay"},
        h("div",{className:"oh-drawer"},
          h("div",{className:"oh-drawer-body"},
            h("div",{className:"oh-loading"},h("div",{className:"oh-spinner"})))))

      const sec = secLevel(skill.risk_score);
      const installBtn = async () => {
        setBusy(true); setErr("");
        try { const r = await api("install",{slug:skill.skill_id}); setInstalled(true); } catch(e){ setErr(e.message); }
        setBusy(false);
      };
      const detailUrl = webBase.replace(/\/$/, "") + "/skills/" + encodeURIComponent(skill.skill_id);
      return h("div",{className:"oh-overlay", onClick:onClose},
        h("div",{className:"oh-drawer", onClick:e=>e.stopPropagation()},
          h("div",{className:"oh-drawer-head"},
            h("span",{className:"oh-drawer-title"},"Skill 详情"),
            h("button",{className:"oh-drawer-close",onClick:onClose},"×")),
          // Hero 信息卡：名称 + 风险标签 + 描述 + 分类/平台/普通标签
          h("div",{className:"oh-d-hero"},
            h("div",{className:"oh-d-title-row"},
              h("h1",{className:"oh-d-name"}, skill.name || skill.skill_id),
              h("span",{className:"oh-tag "+sec.c}, sec.t)),
            skill.description ? h("p",{className:"oh-desc"},skill.description) : null,
            h("div",{className:"oh-d-tags"},
              skill.category ? h("span",{className:"oh-tag cat"}, skill.categoryLabel || skill.category) : null,
              skill.platform ? h("span",{className:"oh-tag cat"}, platformLabel(skill.platform)) : null,
              (skill.tags||[]).slice(0,5).map(t=>h("span",{key:t,className:"oh-tag gray"},t)))),
          h("div",{className:"oh-dtabs"},
            h("button",{className:"oh-dtab"+(tab==="overview"?" on":""),onClick:()=>setTab("overview")},"概述"),
            h("button",{className:"oh-dtab"+(tab==="security"?" on":""),onClick:()=>setTab("security")},"安全审计")),
          h("div",{className:"oh-drawer-body"},
            err ? h("p",{className:"oh-err"},err) : null,
            tab==="overview" && h("div",{},
              h("h3",{className:"oh-doc-title"},"使用描述"),
              h("div",{className:"oh-doc-divider"}),
              skill.content ? h("div",{className:"oh-d-scroll-box"},
                h("div",{className:"oh-md",dangerouslySetInnerHTML:{__html:renderMd(skill.content)}}))
                : h("p",{className:"oh-sec"},"暂无使用描述")),
            tab==="security" && h("div",{},
              h("div",{className:"oh-sec-info"},
                h("span",{className:"oh-tag "+sec.c}, "风险评分 "+(skill.risk_score==null?"未检测":skill.risk_score)),
                h("span",{className:"oh-sec-info-text"},"等级："+sec.t)),
              audit && audit.risk_level ? h("div",{},
                renderAuditTable(audit))
              : h("p",{className:"oh-sec"},"暂无安全审计数据。")),
          ),
          // 底部常驻操作栏：安装 + 查看详情
          h("div",{className:"oh-d-footer"},
            h("button",{className:"oh-btn primary",disabled:busy||installed,onClick:installBtn}, installed?"已安装":busy?"安装中…":"安装到 skills"),
            h("a",{className:"oh-btn",href:detailUrl,target:"_blank",rel:"noreferrer"},"查看详情 ↗",h("span",{className:"oh-d-footer-hint"},webBase.replace(/^https?:\/\//,"")))),
        ),
      );
    }

    // ---------- 完整页面容器（覆盖会话区） ----------
    function PlazaView({ onClose, box }) {
      useEffect(() => {
        ensureCss(window);
        const onKey = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
      }, [onClose]);
      const [openId, setOpenId] = useState(null);
      // skillhub 公网站点（跳转链接），优先取插件配置 webBase
      const [webBase, setWebBase] = useState("https://skillhub.openeuler.org");
      useEffect(() => {
        let ok = true;
        fetch("/skillhub?method=config")
          .then((r) => r.json())
          .then((d) => { if (ok && d && d.ok && d.webBase) setWebBase(d.webBase); })
          .catch(() => {});
        return () => { ok = false; };
      }, []);
      if (!box) return null;
      return h("div",{className:"oh oh-page",role:"dialog","aria-modal":"false","aria-label":"openEuler SkillHub",
        style:{top:box.top,left:box.left,width:box.width,height:box.height}},
        h("div",{className:"oh-page-top"},
          h("div",{className:"oh-page-top-inner"},
            h("div",{className:"oh-plaza-brand"},
              h("a",{className:"oh-plaza-logo-link",href:"https://www.openeuler.openatom.cn/zh/",target:"_blank",rel:"noreferrer",title:"openEuler 官网","aria-label":"openEuler 官网"},
                h("img",{className:"oh-plaza-logo",src:"data:image/svg+xml;base64,"+OH_LOGO_LIGHT_B64,alt:"openEuler logo"})),
              h("span",{className:"oh-plaza-divider"}),
              h("a",{className:"oh-plaza-title",href:webBase,target:"_blank",rel:"noreferrer",title:webBase}, "skillhub")),
            h("button",{className:"oh-page-close",onClick:onClose,"aria-label":"关闭"},"×"))),
        h("div",{className:"oh-page-body"},
          h(ListPage,{ onOpenDetail:setOpenId })),
        openId ? createPortal(h(DetailPage,{skill_id:openId,onClose:()=>setOpenId(null)}), document.body) : null,
      );
    }

    function PlazaAction({ wide }) {
      const [open, setOpen] = useState(false);
      const box = useConversationBox(open);
      useEffect(() => {
        if (!open) return;
        const onPointer = (e) => {
          const node = e.target;
          if (!node || typeof node.closest !== "function") return;
          if (node.closest(".oh-page,.oh-overlay")) return;
          // 点出页面容器即关闭
          const page = document.querySelector(".oh-page");
          if (page && !node.closest(".oh-page")) setOpen(false);
        };
        document.addEventListener("pointerdown", onPointer, true);
        return () => document.removeEventListener("pointerdown", onPointer, true);
      }, [open]);
      return h("div",{className:"oh-rail"},
        h("button",{type:"button",className:"oh-trigger"+(open?" on":"")+(wide?"":" rail"),"aria-expanded":open,title:"openEuler SkillHub",onClick:()=>setOpen(v=>!v)},
          h("span",{style:{display:"inline-flex"}}, h("svg",{width:16,height:16,viewBox:"0 0 16 16",fill:"currentColor","aria-hidden":"true"}, h("g",
              h("rect",{x:1.2,y:1.2,width:5.6,height:5.6,rx:1.6}),
              h("rect",{x:9.2,y:1.2,width:5.6,height:5.6,rx:1.6}),
              h("rect",{x:1.2,y:9.2,width:5.6,height:5.6,rx:1.6}),
              h("rect",{x:9.2,y:9.2,width:5.6,height:5.6,rx:1.6})))),
          wide?h("span",{},"技能广场"):null),
        open && box ? createPortal(h(PlazaView,{onClose:()=>setOpen(false),box}), document.body) : null,
      );
    }

    const inject = ["slots", "sessions"];
    function registerSlot(slots, options, component) {
      const next = { ...options };
      if (next.id == null && next.key != null) next.id = String(next.key);
      if (next.key == null && next.id != null) next.key = next.id;
      return slots.register(next, component);
    }
    function apply(ctx) {
      const slots = ctx.slots;
      if (!slots) return;
      ctx.effect(() => ensureCss(window), "open-euler-skillhub-style");
      slots.inject("sidebar.footer.action", () => registerSlot(
        slots,
        { name: "sidebar.footer.action", id: "open-euler-skillhub-plaza", order: 8, label: () => "技能广场", locale: "open-euler-skillhub" },
        function PlazaEntry(actionProps) {
          return h(PlazaAction, { wide: !!actionProps.wide });
        },
      ));
    }

    return { inject, apply };
  },
});
