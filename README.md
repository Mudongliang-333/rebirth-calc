# 无限升级 · 轮回计算器 — 网页发布包 (v2.2 誓灭之境)

> 发布方式：**只走网页方案**（安卓 / iOS 通用），后续更新直接重发网页即可。

## 目录
```
dist/
├─ index.html                    网页版主文件（含 PWA：manifest + 离线 sw）
├─ 无限升级计算器·单文件.html      单文件版（55 个小人 base64 内嵌，壁纸可选）
├─ manifest.webmanifest          PWA 清单
├─ sw.js                         离线缓存 Service Worker
├─ icon-180/192/512.png          应用图标
├─ netlify.toml                  Netlify 配置
└─ 壁纸/                         5 张图鉴壁纸 + skins/ 55 个小人
```

## 发布步骤
1. 打开 https://app.netlify.com/drop
2. 把**整个 `dist/` 文件夹**拖进去
3. 得到 `https://xxx.netlify.app` 网址
4. 手机直接打开：
   - **iOS Safari**：分享 → **添加到主屏幕** → 独立窗口运行，可离线
   - **安卓 Chrome**：菜单 → **安装应用/添加到主屏幕** → 同上
5. 后续更新：重新拖一次 `dist/` 覆盖即可（同一网址）

## 为什么走网页
- iOS 打不开本地 HTML（Safari 不支持 file://，「文件」快速查看不跑 JS）；
- 网页版 Safari/Chrome 都能跑，**安卓 iOS 一套代码**；
- PWA 加到桌面后接近原生 App，且可离线。

## 注意
- `<meta name="robots" content="noindex, nofollow">`，搜索引擎不收录。
- 计算器无外联、无追踪；输入只存在手机浏览器 localStorage。
- 壁纸/小人为游戏图鉴素材，公开托管注意版权分寸。
