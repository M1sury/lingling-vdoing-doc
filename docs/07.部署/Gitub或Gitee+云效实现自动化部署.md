---
title: Gitub/Gitee+云效实现自动化部署
date: 2023-02-06 19:30:32
permalink: /pages/8526a9/
author: 
  name: lingling
  link: https://github.com/M1sury
---
## Github/Gitee+云效实现自动化部署

[阿里云云效-流水线官网](https://flow.aliyun.com/)

示例代码在gitee上，有需要可以自己clone：https://gitee.com/a1021809072/yunxiao-demo.git

登录阿里云之后需要创建一个企业

![image-20230206194157762](https://cdn.staticaly.com/gh/M1sury/image-store@master/image-20230206194157762.png)

应该是一个比较简单的步骤就不贴图了，创建完企业，进入企业的工作台就可以看到这样：

![image-20230206194406569](https://cdn.staticaly.com/gh/M1sury/image-store@master/image-20230206194406569.png)



我们本次要使用到的功能就是流水线的功能，进入流水线。

### 1、创建流水线

![image-20230206194457415](https://cdn.staticaly.com/gh/M1sury/image-store@master/image-20230206194457415.png)

### 2、选择流水线模板

> 左侧有一些已经有创建好的模板可以使用

我们本次先使用上面的**新手推荐**来练练手

![image-20230206194548318](https://cdn.staticaly.com/gh/M1sury/image-store@master/image-20230206194548318.png)



选择技术框架，当然是**Java**了。下一步

![image-20230206194746089](https://cdn.staticaly.com/gh/M1sury/image-store@master/image-20230206194746089.png)



可以看到下图有三个阶段：**测试 --> 构建 --> 部署**，初次体验，就先**跳过测试阶段**。

![image-20230206194851618](https://cdn.staticaly.com/gh/M1sury/image-store@master/image-20230206194851618.png)

#### 构建方式

选择**构建方式**，这里选择**Java构建 jar/war 包**，下一步

![image-20230206195034614](https://cdn.staticaly.com/gh/M1sury/image-store@master/image-20230206195034614.png)

#### 部署方式

**选择部署方式**，这里选择 **ECS部署**就可以，**虽然我们没有阿里云的 ECS 服务器，后面部署的时候可以做调整，选择其他云厂商的服务器**。这样就完成了流水线的创建

![image-20230206195404470](https://cdn.staticaly.com/gh/M1sury/image-store@master/image-20230206195404470.png)



### 3.、选择代码源

这里选择使用码云来入门

代码的服务连接需要自己创建，很简单的操作。我选择**`yunxiao-demo`**这个项目来玩，然后就是选择分支之类的操作。

**开启代码源触发**，这个先勾选上，Webhook的链接先不需要管，后面还可以操作的。

下面的工作目录也有注释，一般来说不需要改，然后最后点添加就可以了。

```bash
您配置流水线源的源文件将会被下载至工作目录下。如填写demo_abc，则流水线会将文件下载至构建环境的/root/workspace/demo_abc路径下
```

![image-20230206200515223](https://cdn.staticaly.com/gh/M1sury/image-store@master/image-20230206200515223.png)

最终就是这样的！

![image-20230206201015549](https://cdn.staticaly.com/gh/M1sury/image-store@master/image-20230206201015549.png)



### 4.、构建上传

其实什么操作都不需要做，都是默认选项

![image-20230206201349323](https://cdn.staticaly.com/gh/M1sury/image-store@master/image-20230206201349323.png)



这里的操作只需要添加它提示的这行命令，下面上传的文件就是构建出来的jar包，最好自己在本地构建一下，把构建出来的jar包名称一定要对应，否则没办法上传到你的服务器上，可以自己本地`mvn install`一下

![image-20230206210542437](https://cdn.staticaly.com/gh/M1sury/image-store@master/image-20230206210542437.png)

### 5、主机部署



#### 5.1 选择主机类型

选择主机类型，有ECS的可以用 ECS，我这里只有一台百度云主机

![image-20230206201825079](https://cdn.staticaly.com/gh/M1sury/image-store@master/image-20230206201825079.png)



复制下面的命令在服务器上执行。**ECS的主机应该是可以跳过这一步的，具体自己尝试，套路都是一样的**

![image-20230206202119786](https://cdn.staticaly.com/gh/M1sury/image-store@master/image-20230206202119786.png)

#### 问题

如果遇到下面这样的问题。还是选择把 curl 后面的脚本下载下来修改一下。我今天下午用自己的机器，python2.7.5，也会报这个错。有python就可以了，直接把脚本里面校验python的函数删掉

![image-20230206202238437](https://cdn.staticaly.com/gh/M1sury/image-store@master/image-20230206202238437.png)



![image-20230206202605421](https://cdn.staticaly.com/gh/M1sury/image-store@master/image-20230206202605421.png)

然后修改上传到linux服务器上随便哪个目录都可以，自己能找到就行。

```bash
# 只把前面的curl 的脚本替换一下就可以了，curl 后面修改成脚本存放的目录
bash  <(curl production-install.sh)  加上原来命令的内容
```



前面构建上传的一步构建出来上传的文件是一个jar包，所以制品下载下来就是一个jar包。

![image-20230206215755247](https://cdn.staticaly.com/gh/M1sury/image-store@master/image-20230206215755247.png)



![image-20230206215918748](https://cdn.staticaly.com/gh/M1sury/image-store@master/image-20230206215918748.png)





然后就可以运行流水线了。下面是我流水线运行成功，浏览器访问的效果

![image-20230206220317278](https://cdn.staticaly.com/gh/M1sury/image-store@master/image-20230206220317278.png)

很多地方都可以进行优化，本节内容只是为了做一个快速入门，读者可以自己研究其他技巧。这样就省去了自己服务器安装jenkins，白嫖+1