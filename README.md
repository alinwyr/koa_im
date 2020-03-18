## 开发步骤

  - 配置文件

    `cp .env.development .env.development.local`
    
    `vim .env.development.local`

    修改对应的配置项
  
  - 建立mysql数据库： `im`


  - 安装依赖
    
    `yarn `

  - 初始化数据库表

    `yarn initdb`

  - 填充redis测试数据

    `yarn init-redis`

  - 启动程序

    `yarn dev`

  - 测试url

    `http://localhost:port`

    此页面仅做了socket的连接，如连接失败会alert弹窗提醒，成功后的数据传输情况网络栏或者console控制台