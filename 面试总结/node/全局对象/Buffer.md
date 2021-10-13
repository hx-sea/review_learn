# Buffer

- 背景知识

1. ArrayBuffer 可以理解为一块内存。具体存什么需要其他声明

   1.1. 不能直接操作，通过类型数组对象来操作(TypedArray)

# NodeJs Buffer

- Buffer 实现 Uint8Array 的 api
- Buffer 的实例 => 类似整形数组

* Buffer 大小是固定的，在创建的时候就确定了，无法调整大小

### tips

1. 当调用 Buffer.allocUnsafe()时，被分配的内存段是位初始化的.

   - 内存分配非常快，但是分配的内存段可能包含潜在旧数据.
   - 具有明显的性能优势，但是如果使用不当，会给程序引入安全漏洞.

### Bufer 与 字符编码

Buffer 的实例一般用于表示编码字符的序列，UTF-8，Base64，十六进制
