一. ### xss

Cross-site scripting,(xss 为了与 css 重名)

- 攻击者想尽一切办法把可执行代码注入到网页中

### 外在表现上， 有哪些攻击场景

1. 评论区植入 js 代码（即可输入的代码）
2. url 上拼接 js 代码

### 技术角度上

1. 存储型， Server 论坛发帖， 商品评价，用户私信等等这些用户保存数据的网址

攻击步骤：

- 攻击者将代码恶意提交到目标网站的数据库中
- 用户打开目标网站的时候， 服务端将评论（恶意代码）从数据库中取出，拼接到 html 返回给浏览器
- 用户浏览器收到 html 后， 混入其中的恶意代码就会执行
- 窃取用户数据， 发送到攻击者网站

2. 反射型 Server

攻击者结合各种手段，诱导用户点击恶意 url.

通过 url 传参的功能，比如网站的搜索或者跳转等

攻击步骤：

- 攻击者构造出自己恶意 url
- 直接执行可执行的恶意代码

3. DOM 型 Browser

取出和执行恶意代码的操作， 由浏览器完成

攻击步骤：

- URL 参数

### 如何防御 xss 攻击

主旨： 防止攻击者提交恶意代码，防止浏览器执行恶意代码

1. 对数据进行严格的输入编码，比如 html 元素，js，css，url vue v-html react dangerouslyHtml
2. 输入验证 phone url 电话号码 邮箱
3. 开启浏览器的 XSS 防御：Http only Cookie
4. 验证码

二. ### node

1. 本地文件操作相关，路径拼接导致的文件泄露
2. ReDos
3. 时序攻击

## 本地文件操作

比如我们提供一个静态服务，通过请求的参数 url 来返回给用户

三. ### CSRF

Cross-site request forgery, 跨网站请求

express.static

### 攻击步骤：

1. 受害者 登陆 a.com，并且保留登陆凭证 ookie
2. 攻击者诱导访问 b.com
3. b.com 向 a.com 发送请求，a.com/xxxx， 浏览器就会直接带上 a.com 的 cookie
4. a.com 收到请求，忠实的执行了对应操作
5. 攻击者在受害者并不知情的情况下，冒充受害者执行了自己定义的操作

### 攻击类型：

- GET 型： 在页面中的某个 img 发起一个 get 请求

`<img src = xxx /> `

- Post 型： 自动提交表单到恶意网站

```html
<form>
	<input type="hidden" />
	<script>
		doucument.formsp[0].submit();
	</script>
</form>
```

### 如何防范

CSRF 一般都是发生在第三方域名，攻击者无法获取到 cookie 信息的

#### 阻止第三方域名的访问

1. 同源检测 request header origin referer

   - Referer-Policy

2. Cookie SameSite

- Strict: 完全禁用第三方 cookie

* Lax: POST img iframe 不会携带 cookie
* None

#### 提交请求的时候附加额外信息

1. CSRF Token

- 用户打开页面的时候，服务器利用加密算法生成一个 Token
- 每次页面加载的时候，前端把获取到的 Token，加到能够发送请求的 html 上
- 每次 js 发起请求，都携带 cookie
- 服务器每次接收请求，就校验 Token 的有效性

2. 双重 Cookie

- 用户在访问网站的时候，服务器向浏览器注入一个额外的 cookie

* 前端每次发起请求，都拼上一个参数
* 服务器校验这个 cookie 是否正确
