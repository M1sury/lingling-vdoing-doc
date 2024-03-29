const baiduCode = require('./config/baiduCode.js'); // 百度统计hm码
const htmlModules = require('./config/htmlModules.js');
const dayjs = require('dayjs') // https://day.js.org/
const DOMAIN_NAME = 'misury.top' // 域名 (不带https)
const WEB_SITE = `https://${DOMAIN_NAME}` // 网址

module.exports = {
    theme: 'vdoing', // 使用依赖包主题
    locales: {
        "/": {
            lang: 'zh-CN',
            title: "工作站",
            description: '仅仅只是一个记录个人学习的博客',
        }
    },
    // base: '/', // 默认'/'。如果你想将你的网站部署到如 https://foo.github.io/bar/，那么 base 应该被设置成 "/bar/",（否则页面将失去样式等文件）
    head: [ // 注入到页面<head> 中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
        ['link', {rel: 'icon', href: 'https://cdn.staticaly.com/gh/M1sury/image-store@master/favicon.ico'}], //favicons，资源放在public文件夹
        ['meta', {name: 'keywords', content: 'vuepress,theme,blog,vdoing'}],
        ['meta', {name: 'theme-color', content: '#11a8cd'}], // 移动浏览器主题颜色
    ],

    // 主题配置
    themeConfig: {
        nav: [
            {text: '首页', link: '/'},
            {
                text: 'Effective Java', link: '/pages/a2f161/', items: [
                    {text: '介绍', link: '/pages/a2f161/'},
                    {
                        text: '第一章：创建和销毁对象', items: [
                            {text: '1.考虑静态工厂而不是构造函数', link: '/pages/60f602/'},
                            {text: '2.当面临多个参数的构造器时考虑使用Builder模式', link: '/pages/296245/'},
                            {text: '3.用私有构造器或者枚举类型强化 Singleton 属性', link: '/pages/4f7ed6/'},
                            {text: '4.通过私有构造器强化不可实例化的能力', link: '/pages/2421a4/'},
                            {text: '5.优先考虑依赖注入来引用资源', link: '/pages/db5d15/'},
                            {text: '6.避免创建不必要的对象', link: '/pages/f397ab/'},
                            {text: '7.消除过期的对象引用', link: '/pages/8cd9f7/'},
                            {text: '8.避免使用终结方法和清除方法', link: '/pages/012eaa/'},
                            {text: '9.try-with-resources优先于try-finally', link: '/pages/862b3d/'},
                        ]
                    },
                    {
                        text: '第二章：对于所有对象都通用的方法', items: [
                            {text: '10.覆盖equals时请遵守通用约定', link: '/pages/8d58b1/'},
                            {text: '11.覆盖equals时总要覆盖hashCode', link: '/pages/e736d2/'},
                            {text: '12.始终要覆盖toString', link: '/pages/7814b8/'},
                            {text: '13.谨慎地覆盖clone', link: '/pages/757e7f/'},
                            {text: '14.考虑实现Comparable接口', link: '/pages/3b3f13/'},
                        ]
                    },
                    // { text: '第三章：类和接口', items:[
                    // { text: '1.考虑静态工厂而不是构造函数', link: '/pages/60f602/' },
                    // { text: '2.当面临多个参数的构造器时考虑使用Builder模式', link: '/pages/296245/' },
                    // ]},
                    // { text: '第四章：泛型', items:[
                    // { text: '1.考虑静态工厂而不是构造函数', link: '/pages/60f602/' },
                    // { text: '2.当面临多个参数的构造器时考虑使用Builder模式', link: '/pages/296245/' },
                    // ]},
                ]
            },
            {
                text: '数据库', link: '/pages/ee667c/', items: [
                    {text: 'MySQL', link: '/pages/a2f161/'},
                    {
                        text: 'Redis', items: [
                            {text: 'Redis设计与实现读书笔记', link: '/pages/ee667c/'},
                        ]
                    },
                ]
            },
            {
                text: 'JVM', link: '/pages/999820/', items: [
                    {
                        text: '调优实践', items: [
                            {text: '记一次SpringBoot启动优化实践', link: '/pages/0a92a2/'},
                        ]
                    },
                    {
                        text: 'JVM知识总结', items: [
                            {text: 'JVM基础', link: '/pages/999820/'},
                            {text: 'JVM参数总结', link: '/pages/4dac66/'},
                            {text: 'ClassFile解析', link: '/pages/77ee85/'},
                        ]
                    },
                    {
                        text: '技术前瞻', items: [
                            {text: 'Graal-Vm', link: '/pages/351315/'},
                        ]
                    },
                ]
            },
            {
                text: '工具', link: '/pages/a7a7e0/', items: [
                    {text: 'Scoop的安装与使用', link: '/pages/a7a7e0/'},
                    {text: '服务器开发环境安装', link: '/pages/877e26/'},
                    {text: 'Tmux', link: '/pages/39c99a/'},
                    {text: 'IdeaVim', link: '/pages/9f1bff/'},
                    {text: 'CAT', link: '/pages/1da357/'},
                ]
            },
            {
                text: '微服务组件', items: [
                    {text: 'Nacos', link: '/pages/e58b4f/'},
                    {text: 'Sentinel', link: '/pages/91c228/'},
                ]
            },
            {
                text: 'Go', link: '/pages/572a48/', items: [
                    {
                        text: '入门记录', link: '/pages/572a48/', items: [
                            {text: '记录入门Go的坑', link: '/pages/572a48/'}
                        ]
                    },
                ]
            },
            {
                text: '部署', items: [
                    {
                        text: '青龙面板', link: '/pages/95365c/', items: [
                            {text: '青龙-介绍', link: '/pages/95365c/'},
                            {text: '青龙面板部署', link: '/pages/470ed8/'},
                            {text: '青龙-京东', link: '/pages/e85f2c/'},
                            {text: '青龙-B站', link: '/pages/daaeaa/'},
                        ]
                    },
                    {
                        text: "云效自动化部署", items: [
                            {text: 'Gitub或Gitee+云效实现自动化部署(上)', link: '/pages/8526a9/'},
                            {text: 'Gitub或Gitee+云效实现自动化部署(下)', link: '/pages/be6bbe/'},
                        ]
                    },
                    {
                        text: "Linux常用组件", items: [
                            {text: 'Nginx', link: '/pages/602c04/'},
                            {text: 'Gitlab', link: '/pages/ccb60c/'},
                        ]
                    },
                ]
            },
            {text: '关于', link: '/pages/1b12ed/'},
        ],
        sidebarDepth: 2, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
        logo: '/img/logo.png', // 导航栏logo
        repo: 'M1sury/lingling-vdoing-doc', // 导航栏右侧生成Github链接
        searchMaxSuggestions: 10, // 搜索结果显示最大数
        lastUpdated: '上次更新', // 更新的时间，及前缀文字   string | boolean (取值为git提交时间)

        // docsDir: 'docs', // 编辑的文件夹
        // editLinks: true, // 编辑链接
        // editLinkText: '编辑',

        // 以下配置是Vdoing主题改动的和新增的配置
        sidebar: {mode: 'structuring', collapsable: false}, // 侧边栏  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto' | 自定义    温馨提示：目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页

        // sidebarOpen: false, // 初始状态是否打开侧边栏，默认true
        updateBar: { // 最近更新栏
            showToArticle: false, // 显示到文章页底部，默认true
            // moreArticle: '/archives' // “更多文章”跳转的页面，默认'/archives'
        },
        // titleBadge: false, // 文章标题前的图标是否显示，默认true
        // titleBadgeIcons: [ // 文章标题前图标的地址，默认主题内置图标
        //   '图标地址1',
        //   '图标地址2'
        // ],

        pageStyle: 'card', // 页面风格，可选值：'card'卡片 | 'line' 线（未设置bodyBgImg时才生效）， 默认'card'。 说明：card时背景显示灰色衬托出卡片样式，line时背景显示纯色，并且部分模块带线条边框

        // contentBgStyle: 1,

        category: false, // 是否打开分类功能，默认true。 如打开，会做的事情有：1. 自动生成的frontmatter包含分类字段 2.页面中显示与分类相关的信息和模块 3.自动生成分类页面（在@pages文件夹）。如关闭，则反之。
        tag: false, // 是否打开标签功能，默认true。 如打开，会做的事情有：1. 自动生成的frontmatter包含标签字段 2.页面中显示与标签相关的信息和模块 3.自动生成标签页面（在@pages文件夹）。如关闭，则反之。
        // archive: false, // 是否打开归档功能，默认true。 如打开，会做的事情有：1.自动生成归档页面（在@pages文件夹）。如关闭，则反之。

        author: { // 文章默认的作者信息，可在md文件中单独配置此信息 String | {name: String, href: String}
            name: 'unknownName-lingling', // 必需
            href: 'https://github.com/M1sury' // 可选的
        },
        social: { // 社交图标，显示于博主信息栏和页脚栏
            // iconfontCssFile: '//at.alicdn.com/t/font_1678482_u4nrnp8xp6g.css', // 可选，阿里图标库在线css文件地址，对于主题没有的图标可自由添加
            icons: [
                {
                    iconClass: 'icon-youjian',
                    title: '发邮件',
                    link: 'mailto:xx1021a@163.com'
                },
                {
                    iconClass: 'icon-github',
                    title: 'GitHub',
                    link: 'https://github.com/M1sury'
                },
                {
                    iconClass: 'icon-erji',
                    title: '听音乐',
                    link: 'https://music.163.com/#/playlist?id=755597173'
                }
            ]
        },
        footer: { // 页脚信息
            createYear: 2022, // 博客创建年份
            copyrightInfo: 'Lingling | <a href="https://beian.miit.gov.cn" target="_blank">晋ICP备2022002671号</a><br>', // 博客版权信息，支持a标签
        },
        // 扩展自动生成frontmatter。（当md文件的frontmatter不存在相应的字段时将自动添加。不会覆盖已有的数据。）
        extendFrontmatter: {
            author: {
                name: 'lingling',
                link: 'https://github.com/M1sury'
            }
        },
        htmlModules,
    },
    // 注入到页面<head>中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
    head: [
        ['meta', {name: 'baidu-site-verification', content: 'code-NFO0JdhDIn'}], // 百度统计的站长验证（你可以去掉）
    ],
    // 插件
    plugins: [
        // [require('./plugins/love-me'), { // 鼠标点击爱心特效
        //   color: '#11a8cd', // 爱心颜色，默认随机色
        //   excludeClassName: 'theme-vdoing-content' // 要排除元素的class, 默认空''
        // }],

        //['fulltext-search'], // 全文搜索
        [
            'container', {
            type: 'tip',
            defaultTitle: {
                '/': 'TIP',
                '/zh/': '提示'
            }
        }
        ],
        [
            'sitemap', {
            hostname: 'https://www.misury.top'
        },
        ],
        [
            '@oak-tree-house/encrypt'
        ],
        // 可以添加第三方搜索链接的搜索框（继承原官方搜索框的配置参数）
        [
            'thirdparty-search',
            {
                thirdparty: [
                    {
                        title: '在MDN中搜索',
                        frontUrl: 'https://developer.mozilla.org/zh-CN/search?q=', // 搜索链接的前面部分
                        behindUrl: '', // 搜索链接的后面部分，可选，默认 ''
                    },
                    {
                        title: '在Runoob中搜索',
                        frontUrl: 'https://www.runoob.com/?s=',
                    },
                    {
                        title: '在Vue API中搜索',
                        frontUrl: 'https://cn.vuejs.org/v2/api/#',
                    },
                    {
                        title: '在Bing中搜索',
                        frontUrl: 'https://cn.bing.com/search?q=',
                    },
                    {
                        title: '通过百度搜索本站的',
                        frontUrl: `https://www.baidu.com/s?wd=site%3A${DOMAIN_NAME}%20`,
                    },
                ],
            }
        ],
        [
            'vuepress-plugin-comment', // 评论
            {
                choosen: 'gitalk',
                options: {
                    clientID: '450b52e2773bae64d489',
                    clientSecret: 'ea79a4a38bad1ca9d9afed11658f0b32c5599dc0',
                    repo: 'lingling-vdoing-doc', // GitHub 仓库
                    owner: 'M1sury', // GitHub仓库所有者
                    admin: ['M1sury'], // 对仓库有写权限的人
                    proxy: 'https://fastgit.xx1021a286.workers.dev/?https://github.com/login/oauth/access_token',//反向代理解决跨域问题
                    // distractionFreeMode: true,
                    pagerDirection: 'last', // 'first'正序 | 'last'倒序
                    id: '<%- (frontmatter.permalink || frontmatter.to.path).slice(-16) %>', //  页面的唯一标识,长度不能超过50
                    title: '「评论」<%- frontmatter.title %>', // GitHub issue 的标题
                    labels: ['Gitalk', 'Comment'], // GitHub issue 的标签
                    body:
                        '页面：<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>', // GitHub issue 的内容
                },
            },
        ],
        // 增强 markdown
        [
            "md-enhance", {
            // 启用 TeX 支持
            tex: true,
            // Enable mermaid
            mermaid: true,
            // 启用流程图
            flowchart: true,
        },
        ],
        [
            'vuepress-plugin-baidu-tongji', // 百度统计
            {
                hm: baiduCode || '30f324f9ae581aecfa25b75a6a33ab4d'
            }
        ],
        ['one-click-copy', { // 代码块复制按钮
            copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
            copyMessage: '复制成功', // default is 'Copy successfully and then paste it for use.'
            duration: 1000, // prompt message display time.
            showInMobile: false // whether to display on the mobile side, default: false.
        }],
        ['demo-block', { // demo演示模块 https://github.com/xiguaxigua/vuepress-plugin-demo-block
            settings: {
                // jsLib: ['http://xxx'], // 在线示例(jsfiddle, codepen)中的js依赖
                // cssLib: ['http://xxx'], // 在线示例中的css依赖
                // vue: 'https://fastly.jsdelivr.net/npm/vue/dist/vue.min.js', // 在线示例中的vue依赖
                jsfiddle: false, // 是否显示 jsfiddle 链接
                codepen: true, // 是否显示 codepen 链接
                horizontal: false // 是否展示为横向样式
            }
        }],
        [
            'vuepress-plugin-zooming', // 放大图片
            {
                selector: '.theme-vdoing-content img:not(.no-zoom)',
                options: {
                    bgColor: 'rgba(0,0,0,0.6)'
                },
            },
        ],
        [
            '@vuepress/last-updated', // "上次更新"时间格式
            {
                transformer: (timestamp, lang) => {
                    return dayjs(timestamp).format('YYYY/MM/DD, HH:mm:ss')
                },
            }
        ]
    ],

    markdown: {
        lineNumbers: true,
        extractHeaders: ['h2', 'h3', 'h4', 'h5', 'h6'], // 提取标题到侧边栏的级别，默认['h2', 'h3']
    },

    // 监听文件变化并重新构建
    extraWatchFiles: [
        '.vuepress/config.js',
        '.vuepress/config/htmlModules.js',
    ]
}
