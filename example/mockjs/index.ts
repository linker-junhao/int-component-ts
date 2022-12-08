// 引入mockjs
import Mock from 'mockjs';

Mock.setup({
  timeout: 200
});

// 使用mockjs模拟数据
Mock.mock('/proxy-config', 'get', {
  code: 200,
  data: {
    total: 10,
    list: [
      {
        serverName: 'dev.boss.xt233.com',
        listen: '80',
        location: '^~ /crm',
        proxyPass: 'http://192.168.0.228:10360'
      },
      {
        serverName: 'dev.boss.xt233.com',
        listen: '80',
        location: '^~ /crm',
        proxyPass: 'http://192.168.0.228:10360'
      },
      {
        serverName: 'dev.boss.xt233.com',
        listen: '80',
        location: '^~ /crm',
        proxyPass: 'http://192.168.0.228:10360'
      },
      {
        serverName: 'dev.boss.xt233.com',
        listen: '80',
        location: '^~ /crm',
        proxyPass: 'http://192.168.0.228:10360'
      },
      {
        serverName: 'dev.boss.xt233.com',
        listen: '80',
        location: '^~ /crm',
        proxyPass: 'http://192.168.0.228:10360'
      },
      {
        serverName: 'dev.boss.xt233.com',
        listen: '80',
        location: '^~ /crm',
        proxyPass: 'http://192.168.0.228:10360'
      }
    ]
  }
});
