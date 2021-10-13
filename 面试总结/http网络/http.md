TCP UDP 的区别， 应用场景？

- UDP 是无连接的，TCP 必须三次握手建立链接
- UDP 面向报文的，没有拥塞控制，所以速度快，适合多媒体通信（实时聊天，一对一，一对多，多对一，多对多）
- TCP 只能是一对一的可靠性传输

TCP 通过什么方式提供可靠性的？

- 超时重发 发出的报文没有收到及时的确认，会重新发送
- 数据包的校验，校验首部数据和
- 对失序的数据重新排序
- 进行流量控制，放置缓存区的溢出
- 快重传可快恢复
- TCP 会将数据截断为合理的长度

TCP 是如何进行拥塞控制的？

- 防止过多的数据涌入造成路由器或链路过载

function Parent(){ ths.name = name }

function Child(){ Parent.call(this) } const a = new child()

child.prototype = Parent.**ptoto**
