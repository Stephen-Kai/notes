# linux 管理篇

## 网络管理

### 网络状态查看工具

1. net-tools
2. iproute2

### 查看网卡状态

1. ifconfig: root 用户查看网卡状态
2. /sbin/ifconfig: 普通用户查看网卡状态

vi /etc/default/grub: 配置网卡名称, 指定 biosdevname=0 net.ifname=0
grub2-mkconfig -o /boot/grub2/grub.cfg: 更新 grub
reboot: 重启

mii-tool eth0: 查看网卡物理连接情况

### 查看网关命令

route -n: 查看网关

### 修改网络配置

1. ifconfig 接口 ip 地址
2. ifup: 启用
3. ifdown: 关闭
4. route add default gw
5. route add -host
6. route add -net

## 网络故障排除命令

1. ping

查看当前主机与目标主机连接是否畅通, 如果 ping 不通可能出现网络中断或者对方有防火墙的情况出现

2. traceroute

检查当前网络的状态

3. mtr

检查当前主机到目标主机之间是否丢包

4. nslookup

查看域名对应的 ip

5. telnet(如果没有, 可以使用 yum install telnet 进行安装)

检查端口连接状态, 可以使用 quit 来退出

6. tcpdump

检查数据包

7. netstat

netstat -ntpl

检查发布的服务

8. ss

ss -ntpl

检查发布的服务

## 网络配置文件

1. ifcfg-eth0
2. /etc/hosts

service network status: 查看当前配置

如果有 network 和 NetworkManager 两个管理网络的命令，这个时候关掉一个，只使用一个就好来, 如果要向下兼容的话, 可以使用 network

systemctl disable NetworkManager

/etc/sysconfig/network-scripts: 网络配置脚本

hostname: 查看主机名

hostctl set-hostname test-host-name: 更改 hostname, 如果 hostname 更改的话, 很多文件都依赖这个主机名工作的, 那需要在
/etc/hosts 文件中去更改 127.0.0.1 中对应的主机名

reboot: 重启

##
