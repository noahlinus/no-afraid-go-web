module.exports = {
  apps: [
    {
      name: 'no-afraid-go-web',
      script: './node_modules/.bin/ts-node',

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: 'src/server.ts',
      instances: 1,
      autorestart: true,
      watch: ['src'],
      ignore_watch: ['node_modules'],
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: 'root',
      host: '111.230.28.25',
      port: '22',
      ref: 'origin/master',
      repo: 'git@gitee.com:linyouyuan/no-afraid-go-web.git',
      path: '/root/project/no-afraid-go-web',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
      env: {
        NODE_ENV: 'production',
      },
    },
  },
}
