## 爬虫可以肆无忌惮爬取所有网站内容嘛？

    不是的 .
    爬虫访问网站会消耗对方网站流量、宽带、服务器资源

1. 允许所有爬虫？ User-agent: \* Disallow

2. 允许指定爬虫？

3. 拦截所有的爬虫？ User-agent: \* Disallow: /

## 如何开始一个爬取应用

1. 确定要爬取的网站/页面

2. 分析网站数据结构及 DOM 结构

3. 确定技术选型
   - 模拟浏览器请求
     - superagent ✅
   - 解析 DOM
     - cheerio 类似于 jquery 的 api ✅
