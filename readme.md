# mongodb

1. 安装 [homebrew](https://brew.sh/index_zh-cn)

   Homebrew 是mac系统中的软件包管理器

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
   ```

2. 添加 mongodb 仓库源

   ```bash
   brew tap mongodb/brew
   ```

3. 安装 mongodb

   安装前确保系统已经安装 xcode 命令行编译开发工具

   ```bash
   xcode-select --install 
   ```

   ```bash
   brew install mongodb-community
   ```

4. 启动 mongodb

   ```bash
   brew services run mongodb-community
   ```

# 启动服务端

```
cd ecommerce-server
yarn start
```

# 运行客户端

```
cd ecommerce-front
yarn start
```
