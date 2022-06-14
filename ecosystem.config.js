module.exports = {
  apps: [
    {
      name: "ssr",
      script: "next start -p 80",
      instances: 1,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};