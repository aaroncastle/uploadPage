# uploadPage
最近在学linux,写一个小小的上传页面做测试用。


# 学神Linux训练营601三天培训作业

author : <font style='color: orange'> 物外神驰</font>

-----

## 写在前面

我的作业有点不同，因为我没有windows，电脑用的mac，只有一台10年前的老式电脑，跑个CentOS 足够了。所以直接在物理机上装了 CentOS 。如果有同学和我一样这样装centos，我有必要说明一下

**在物理机下装Centos的坑：**

用U盘写入装机系统略过不表，过程和**MK校长**视频里讲的一样，但在<font style='color:#f40;font-size:1.5rem'>网络静态IP配置</font>这里就要把这里选上了，不然你无法上网:

 ![硬核安装centos的静态IP配置](https://i.loli.net/2020/12/23/ybrx7TfYE5ev6LH.png)

至于为什么，我也不知道，这得问**MK校长**。这只是我两天装机30多次的经验。

-----

开机，登录。上来先ping一下淘宝。看网络是否畅通。

```shell
ping taobao.com
```

发现网络是通的，OK。我得先装个ssh，不然太累。因为mac下并没有Xshell这个软件。我只能用Royal TSX替代。先给sshd的配置来一下：配置文件在 `/etc/ssh/sshd_config`里，可以用`vi`编辑器打开也可以用`vim`编辑器打开。默认没有安装`vim`，要安装一下:

```shell
yum install vim -y
```

虚拟机的同学不建议用光盘里安装源来安装，因为你会发现里面有 `vim-common`、`vim-enhanced`、`vim-filesystem`、`vim-minimal`、`vim-X11`给整迷茫，一个个去安装，要被依赖给搞得发疯……

我没有颜色的需求，就用`vi`编辑器了

```shell
vi /etc/ssh/sshd_config
:set nu  #进入命令行模式并设置临时行号
```

把第17、43行的注释取消掉，也就是把`#`号删除掉。保存退出。

```shell
systemctl restart shhd #重启sshd
```

> 其实下面这张截图是用了`vim`编辑器，因为我发现`vi`无法对比两个不同的文件，甚至不能同时打开两个文件……

![两个文件前后对比](https://i.loli.net/2020/12/23/CSknMGJX1RPcFdW.png)

到目前为止，这个文档可以大口喘气了，因为再也不用两个键盘敲来敲去而且截图也方便多了。配置`Royal TSX` 和配置 `Xshell`差不多，稍微写一下过程吧：其实就是截图，截图是方便多了。

![截屏1](https://i.loli.net/2020/12/23/9ZBE7sRNpFwaOJ3.png)

![截屏2](https://i.loli.net/2020/12/23/YVCbo85eniEBcjm.png)

![截屏3](https://i.loli.net/2020/12/23/OJrn4KchEdRZtSP.png)

![截屏2020-12-23 03.55.49](https://i.loli.net/2020/12/23/vnN8xiFtdI5we1P.png)

-----

以后要公钥登录，不用密码登录，得让服务器(这台centos)记住我的公钥。

```shell
ssh-keygen -t rsa -C '[yourEmail]@gmail.com'
```

> 这会在当时宿主目录下生成一个隐藏目录`.ssh` 里面生成两个文件(密钥对)，一个是`id_rsa`（这是私钥）,另一个是`id_rsa.pub`（这是公钥）。在`.ssh`里再创建一个`authorized_keys`的文件，这里面用来存放登录电脑的公钥。把自己电脑上的公钥复制在里面。
>
> ![粗心了](https://i.loli.net/2020/12/23/m6LO5Xgji81UTne.png)

## 安装LAMP环境

- L: Linux (已经安装);

- A: Aphache

- M: Mysql - 我们对应的安装MariaDB

- P: PHP - 用PHP搭建的网站。搭建别人写好的东西太简单。我这里准备安装Nodejs来自己动手写的全栈项目（没想好写什么，暂时定成一个博客网站吧，这个花费时间不会太多）。所以我这里要安装Node。

  > 准备工作：
  >
  > 1，安装Aphache 和 MariaDB
  >
  > 2，安装Node。**因为开发时用的Node版本都很高，基本在14.x以上而centos的默认yum源安装node的版本是8，所以要先安装高版本的node，为了更方便的安装高于8.0版本的Node，我们用snap商店来安装。所以我们要先安装snap。在安装snap之前要先安装EPEL存储库**

```shell
yum install httpd mariadb epel-release -y
yum install snapd -y
systemctl enable --now snapd.socket #建立snapd.socket通信开机启动
ln -s /var/lib/snapd/snap /snap #为了全局使用snap命令，建个软链接来方便调用，也就是相当于设置linux里的环境变量了
```

到这里就得重启了，**MK老师有更方便的方法一定要告诉我**

```shell
reboot
```

![安装LAMP环境](https://i.loli.net/2020/12/23/jiCM1DfhX5TqStN.png)

现在可以用`snap`安装Node了

`snap install node --channel=14/stable --classic` 更改channel的值来安装不同版本的node（只支持整数），`stable`是稳定版本。

安装好后就有Node了，并且同时拥有了`npm` 和 心爱的`yarn` 包管理器。

![14版太新却可以安装15版本](https://i.loli.net/2020/12/23/a5Mt4BlS8Yuhef9.png)

创建个项目测试一下：

> 在github上新建个仓库，写个简单的服务器 [项目地址. https://github.com/aaroncastle/uploadPage](https://github.com/aaroncastle/uploadPage)

安装git 拉取项目的前期准备

```shell
yum install git -y
git clone https://github.com/aaroncastle/uploadPage
cd uploadPage
yarn install
node src/index.js & 
```

这时候网站还不能开启，因为还没有打开80端口

```shell
firewall-cmd --zone=public --add-port=80/tcp --permanent #开启80端口，--permanent 参数是永久生效
```

浏览器打开你的 http://192.168.xxx.xxx 就可以访问了。

图片和视频上传之后会自动显示。视频做了预加载，播放速度没问题。图片全保存在 `～/uploadPage/client/upload/image `中，视频全保存在`～/uploadPage/client/upload/video`中。这样你的资料就全有地方放置了。

![截屏2020-12-23 19.04.08](https://i.loli.net/2020/12/23/5iDlmPjgxNVCwXz.png)

![截屏2020-12-23 19.04.28](https://i.loli.net/2020/12/23/kxi4SzdhTbaof71.png)

![截屏2020-12-23 18.48.06](https://i.loli.net/2020/12/23/d9x6WIMmoPyAlBc.png)

用apache要用课上的方法，把文件移到 `/var/www/html`下 ，但这是前后端分离写的项目，用的是Node开启的，不是apache。用apache还是课上的方法。这里我没有把下载文件的路径保存在数据库里，所以没有用到数据库，要交作业了，时间不多了，后期再放吧。数据库还是按老师的方法来设置。
