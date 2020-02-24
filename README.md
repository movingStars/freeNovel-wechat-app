# freeNovel-wechat-app
免费小说微信小程序

没能通过微信官方的审核，现在审核太严格了/(ㄒoㄒ)/~~

### 大麦说项目的一些踩坑记录：
`
NODE部分
1、正确的项目目录应该是怎样的
2、启动脚本里面，mac和win对NODE_ENV的设置方式不一样。mac中使用NODE_ENV=dev的方式，而win中需要set NODE_ENV=dev &&的方式。
3、解析页面时，遇到for循环异步操作的问题。
      由于superagent爬取页面是异步的一个过程，同时对多个页面进行请求会发生错误。
      最后采用Promise.all的方式。基本上解决了这个问题，能一次爬取一本小说。
      但当对多个小说同时进行爬取时又存在superagent请求页面超时的情况，导致进程走不下去。最后采用了async.mapLimit，一本一本的查。当有超时的情况时，就重新查询一遍，直到20本小说全部查询完毕，再接着查后面20本小说。
4、对图片和小说txt文件进行读取时，404的问题，一开始以为是文件名为中文乱码了所以访问不到，之后才发现是路径的问题。使用express.static方法将静态文件的根目录确定，然后再访问就没问题了。
5、windows环境中，文件名不能含有'\/:*?"<>|'等特殊符号，而有些小说名又包含这些字符，所以对这些字符进行了截取，以保证文件保存成功。
6、错误处理的问题-boom
7、express内置的错误处理中间件，有4个参数，缺一不可，否则中间件会被识别为一个常规中间件。

小程序部分
1、小程序取名、logo设计。
2、注册小程序时，小程序的名字有限制，我希望的名字是‘大麦免费小说’，但是微信加了限制，得有网络版权证书等等奇怪的证书。最后只能放弃免费小说几个字，改为‘大麦说’，先将就用着吧。
3、小程序中要想访问线上服务器的api，得使用https协议的域名，但也可以在开发者工具中使用本地api调试。

MySQL部分
1、多表查询 join
2、分页查询性能
3、分页查询时一并获取总条数
4、如何将select出来的结果增加一列
5、关键字查询，及高亮显示
6、随机返回10条数据
7、mysql忘记密码需要进行重置密码操作：
1. 在本地服务里面关闭mysql服务
2. 打开cmd窗口，执行mysqld --skip-grant-tables  这句指令是跳过安全检查(这句指令执行后我们会看到光标闪烁，说明开启了一个服务，跟tomcat服务器有点像。)
3. 保持当前的cmd窗口不关闭，打开另一个cmd窗口，在连接mysql数据库 mysql -u root，切换数据库 use mysql;修改mysql数据库里面user表密码. update mysql.user set Password=password('123456789') where user='root' and host = 'localhost';（MySQL user DB does not have password columns - 时将上面语句中的Password改为authentication_string)
4. 关闭两个cmd窗口，Ctrl+Shift+Esc打开任务管理器找到mysqld的进程，将其杀死。
5. 重启mysql服务, mysql -u root -p 进入mysql
6. 执行数据库操作命令时，提示Reset MySQL root password using ALTER USER statement after install on Mac。 解决办法：执行SET PASSWORD = PASSWORD('your_new_password');
8、MySQL插入中文乱码的问题：https://blog.csdn.net/tzh476/article/details/52644271
9、MySQL安装过程中，报找不到ssleay32.dll的问题  https://blog.csdn.net/Jason160918/article/details/84777248


服务器部分
1、一开始在腾讯云上领取了15天的免费服务器，先试试看。领取成功后不知道怎么连接服务器，在网上搜索到mac上可以使用Microsoft Remote Desktop软件远程连接服务器。
2、服务器是windows环境的，安装git,node,cnpm的时候网速很卡，也花费了些时间。
3、IE增强安全配置怎么禁用  https://blog.csdn.net/testcs_dn/article/details/49425165
4、cmd删除空文件夹  cd到需要删除的目录下 执行  for /f "delims=" %i in ('dir /s /b /ad ^| sort /r') do rd "%i" 2>NUL

域名部分
1、在百度云上面购买了一年的域名‘damaixiaoshuo.com’。想要通过域名能访问到服务器上的node环境，得做一些配置。先是要将域名的WHOIS信息设置为自己的，然后进行实名认证。认证通过后，对域名进行解析设置，将服务器的IP地址和域名绑定起来。这时候直接访问域名还访问不到服务器上。还需要对服务器进行安全组的配置，需要放通一些端口，比如web访问常用的80(http)和443(https)端口。这时候发现，依然不能通过域名访问成功，但能通过IP加端口的方式访问到。就还需要对服务器加nginx的配置，将域名请求反向代理到本地服务上面。这样就能通过域名访问到服务器上的api了。
服务器安全组配置：https://blog.csdn.net/li_wei_quan/article/details/78167557  （80和443）
windows上Nginx配置步骤：
1. http://nginx.org/en/download.html 官网下载稳定版本zip文件，解压到一个目录下。
2. 打开文件，找到conf/nginx.conf文件，进行编辑（将http/server那一段代码替换成下面的代码）
3. 配置https协议需要SSL证书，要先到域名网站上下载对应的nginx版的SSL证书，解压后放到c盘根目录下的cert目录下。
4. 然后用cmd命令跳到nginx文件夹下后，执行start nginx命令，启动nginx。
到此，nginx配置完成。

Nginx配置：80(http)和443(https)
server {
        listen       80;
        server_name  www.damaixiaoshuo.com;

        #charset utf-8;

        #access_log  logs/host.access.log  main;

        location / {
            proxy_pass http://127.0.0.1:8787;  
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }
# HTTPS server
    #	
    server {
        listen       443 ssl;
        server_name  www.damaixiaoshuo.com;

        ssl_certificate      /cert/damaixiaoshuo.com.crt;
        ssl_certificate_key  /cert/damaixiaoshuo.com.key;

        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;

        ssl_ciphers  HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers  on;

        location / {
            proxy_pass http://127.0.0.1:8787;
        }
    }

2、ssl证书，https协议需要的。在nginx中需要配置，才能使用https请求。
3、ICP备案，初审通过后，还需要使用百度专用的幕布拍照，签写核验单，进行核验。然后通过百度云的初审。初审通过后再等待管局的终审。

最后，没能通过微信官方的审核，现在审核太严格了，需要各种证/(ㄒoㄒ)/~~
`

