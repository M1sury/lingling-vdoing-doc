Dim WshShell, WshSysEnv
Dim serverUserName,serverPassword
Dim gitCloneFilePath,gitClonePath
Dim projectName
Dim sourcePath,targetPath

' 服务器的用户名@ip 示例：root@127.0.0.1
serverUserName = "root@127.0.0.1"
' 服务器密码
serverPassword = "xxxx"
' 代码clone到服务器的哪个目录下
gitCloneFilePath = "/opt"
' 克隆的代码地址
gitClonePath = "https://gitee.com/a1021809072/lingling-vdoing-doc.git"
' 一般是上面代码地址的项目名
projectName = "lingling-vdoing-doc"
Set WshShell=WScript.CreateObject("WScript.Shell")
Set WshSysEnv = WshShell.Environment("USER")
WshShell.Run "cmd.exe"
WScript.Sleep 1500
' 使用ssh协议登录服务器
WshShell.SendKeys "ssh " + WshSysEnv("SERVER_USERNAME")
WshShell.SendKeys "{ENTER}"
WScript.Sleep 1500
WshShell.SendKeys WshSysEnv("SERVER_PASSWORD")
WshShell.SendKeys "{ENTER}"

' 克隆代码部分
WshShell.SendKeys "cd " + gitCloneFilePath
WshShell.SendKeys "{ENTER}"
WshShell.SendKeys "git clone " + gitClonePath
WshShell.SendKeys "{ENTER}"
WshShell.SendKeys "cd " + projectName
WshShell.SendKeys "{ENTER}"

' npm编译项目部分
WshShell.SendKeys "npm install"
WshShell.SendKeys "{ENTER}"
WshShell.SendKeys "npm run build"
WshShell.SendKeys "{ENTER}"

' 删除之前编译的文件(避免缓存，每次克隆出来的都是最新的内容)
WshShell.SendKeys "rm -rf /usr/local/nginx/html/*"
WshShell.SendKeys "{ENTER}"
' 将编译后的文件复制到nginx目录下
WshShell.SendKeys "cp -r docs/.vuepress/dist/* /usr/local/nginx/html/"
WshShell.SendKeys "{ENTER}"
' 重启nginx
WshShell.SendKeys "systemctl restart nginx"
WshShell.SendKeys "{ENTER}"
' 删除之前克隆的文件(避免缓存，每次克隆出来的都是最新的内容)
WshShell.SendKeys "rm -rf /opt/" + projectName
WshShell.SendKeys "{ENTER}"

' 关闭ssh连接
WshShell.SendKeys "logout"
WshShell.SendKeys "{ENTER}"