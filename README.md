# 使用React模板开发
-----------------------------

更多React开发技巧和学习指南可参考[React 官网](https://zh-hans.reactjs.org)。

使用WeLink React开发框架可以快速构建和开发We码程序，基于 npm + webpack + react + redux + less + weui 的快速开发本地化的框架。

<li style="list-style-type:disc;">遵循WeLink目录规范，构建项目时会生成遵循WeLink目录规范的目录。
<li style="list-style-type:disc;">集成了WeLink JSAPI，构建项目时会自动引入JSAPI。
<li style="list-style-type:disc;">基于weui，适配WeLink风格。</li>

### 目录结构

- [新建项目](#新建项目)
- [工程目录](#工程目录)
  - [引入图片和文件](#引入图片和文件)
  - [public 文件夹的使用](#public文件夹的使用)
    - [引入外部资源](#引入外部资源)
  - [添加路由](#添加路由)
    - [路由跳转](#路由跳转)
  - [样式引用](#样式引用)
  - [使用标准UI组件](#使用标准ui组件)
  - [国际化](#国际化)

### 新建项目

通过IDE**新建项目**，选择项目类型“**React模板**”。

### 工程目录

项目文件结构如下：

```text
└───template/
    ├───src/
        ├───actions       // 请求处理
        ├───config        // 接口地址配置，可生产、uat和开发环境配置
        ├───components    // 页面组件
        ├───locales       // 国际化信息
        ├───reducers      // 存放state
        ├───routes        // 组件路由
        ├───utils         // 工具类
        ├───App.js        // 根react组件
        ├───app.page      // 路由配置文件
        ├───app.less      // 公共样式
        ├───entry.js      // webpack打包入口
        ├───i18n.js       // 国际化处理
        └───index.html    // html模板文件
    ├───.eslintrc         // eslint代码检查配置
    ├───plugin.json       // 项目配置文件
    └───wecode.json       // 本地开发配置文件
```

当项目构建时，**必须包含以下文件**：

<li style="list-style-type:disc;"><code style="padding: .2em;margin: 0;font-size: .85em;background-color: #f7f7f7;">src/index.html</code>是页面模板
<li style="list-style-type:disc;"><code style="padding: .2em;margin: 0;font-size: .85em;background-color: #f7f7f7;">src/entry.js</code> 是入口文件</li>

可以在 `src` 目录创建子目录，为了更快地重新构建，Webpack 只处理 `src` 中的文件。**需要将 JS 和 CSS 放到 `src` 里面**，否则 Webpack 将不会处理。

### 引入图片和文件

使用静态模块，比如图片和样式等，通过 Webpack 编译。

可以通过**`import` 引入 JavaScript 模块**，使 Webpack 打包时包含这些文件。
这些文件的路径最终将在 html 自动引用，比如通过图片的 `src` 属性或者通过 `href` 引入样式。

为了减少页面请求，导入的图片小于 1000 bytes 将返回一个data URI替换图片地址。支持格式：bmp, gif, jpg, jpeg, 和 png。

以下有个例子：

```js
import React from "react";
import logo from "./logo.png"; // Tell Webpack this JS file uses this image

console.log(logo); // /logo.84287d09.png

function Header() {
  // Import result is the URL of your image
  return <img src={logo} alt="Logo" />;
}

export default Header;
```

当项目构建完，Webpack 会将图片放到 `build` 目录中，以及引用正确的访问地址。

同样适合在 CSS 中：

```css
.Logo {
  background-image: url(./logo.png);
}
```

### public文件夹的使用

#### `引入外部资源`

可以通过`public` 文件夹引入其他模块代码。

注意，建议使用 JavaScript 文件中的`import`引入。
例如，请参阅[样式引用](#样式引用)和[引入图片和文件](#引入图片和文件)部分。

这种机制提供了许多好处:

<li style="list-style-type:disc;">脚本和样式表被压缩并打包在一起，以避免额外的网络请求。
<li style="list-style-type:disc;">丢失的文件会导致编译错误，而不会造成 404 错误。</li>

如果将一个文件放入 `public` 文件夹，会被 Webpack 忽略，并被复制到 build 文件夹中。

这种方法有以下缺点:
<li style="list-style-type:disc;"><code style="padding: .2em;margin: 0;font-size: .85em;background-color: #f7f7f7;">public</code>文件夹内的所有文件都不会被处理或压缩。
<li style="list-style-type:disc;"> 在编译时将不会因为丢失的文件或 js 语法问题，而提示错误。</li>

#### 什么时候适合使用 public 文件夹

`public`文件夹对于一些不太常见的情况是有用的:

<li style="list-style-type:disc;">有数千个图像，需要动态地引用它们的路径。
<li style="list-style-type:disc;">想要引入一段脚本比如[pack.js]而不经过 webpack 打包编译。
<li style="list-style-type:disc;">有些库可能与 Webpack 不兼容，没有其他选择，只能将它通过`<code style="padding: .2em;margin: 0;font-size: .85em;background-color: #f7f7f7;">script</code>标签引入。</li>

### 添加路由

在 `src/app.json` 添加配置，如下：

```json
{
  "pages": {
    "./Home/index": "/",
    "./Desc/index": "/desc"
  }
}
```

以键值对存在：

`key` 表示 `routes` 目录下具体路由组件文件的位置，不需要带文件后缀.js，如 `./Home/index`；

`value` 表示页面访问的 hash 路由。如首页配置 `/`，访问地址为：`html/index.html#/`。又如 desc页面配置 `/desc`，访问地址为：`html/index.html#/desc`。

#### `路由跳转`

方法一：使用 Link 组件进行跳转

```js
import { Link } from "react-router-dom";
<Link to="/desc" className="desc-link">
  使用说明
</Link>;
```

方法二：使用 history 进行跳转

```js
import createHistory from "history/createHashHistory";
const history = createHistory();
// 跳转路由，并传参
history.push({
  pathname: "/desc", 
  params: 'test' // 自定义参数，params 也可自定义。可在下个路由页面，通过 history.location.params 里获取。
});
history.goForward(); // 访问前一个页面
history.goBack(); // 后退
```

### 样式引用

项目使用[Webpack](https://webpack.js.org/) 对所有模块进行处理。
Webpack 提供了一种自定义的方式来“扩展”，通过 JavaScript 的`import`，
在 JavaScript 中引用 CSS 文件:

#### `Button.css`

```css
.Button {
  padding: 20px;
}
```

#### `Button.js`

```js
import React, { Component } from "react";
import "./Button.css"; // Tell Webpack that Button.js uses these styles

class Button extends Component {
  render() {
    // You can use them as regular CSS styles
    return <div className="Button" />;
  }
}
```

### 使用标准UI组件

```jsx
import React from "react";
import {
  Tab,
  TabBody,
  TabBar,
  TabBarItem,
  TabBarIcon,
  TabBarLabel,
  Article
} from "@wecode/react-weui";
```

### 国际化

输出 src/locales 中 common.json 配置的国际化字段 appName 信息，国际化初始化判断请参考 `src/entry.js`

使用：

```jsx
import i18n from "i18n";
i18n.t("common:appName");
```
