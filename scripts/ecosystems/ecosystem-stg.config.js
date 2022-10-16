export const apps = [
  {
    name: 'Backend-Stg-Mode',
    script: 'scripts/start.js',
    out_file: '/dev/null',
    error_file: '/dev/null',
    instances: 1,
    autorestart: true,
    watch: true,
    ignore_watch: ['node_modules', 'common/logs'],
    max_memory_restart: '1G',
    cwd: process.cwd(),
    increment_var: 'PORT',
    TZ: 'America/Mexico_City',
    env: {
      NODE_ENV: 'staging',
      TZ: 'America/Mexico_City',
    },
    env_staging: {
      NODE_ENV: 'staging',
      TZ: 'America/Mexico_City',
    },
  },
];
