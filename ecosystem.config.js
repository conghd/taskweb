module.exports = {
    apps: [
      {
        name: 'taskweb',
        script: 'npx',
	args: "serve -s build -l 3000",
        instances: 1,
        exec_mode: 'fork',
        watch: false, // If true, pm2 will restart when there is a file change, even log files
        env: {
          NODE_ENV: 'production',
          PORT: '3000'
        }
      }
    ]
  };
