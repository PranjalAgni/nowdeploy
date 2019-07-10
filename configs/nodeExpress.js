const inquirer = require('inquirer');
const path = require('path');

const baseConfig = {
  builds: [
    {
      src: 'src/index.js',
      use: '@now/node-server'
    }
  ],
  routes: [{ src: '/.*', dest: 'src/index.js' }]
};

async function nodeExpress(config) {
  let mainFile = 'src/index.js';
  try {
    const packageJSON = require(path.join(process.cwd(), 'package.json'));
    mainFile = packageJSON.main;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  const answers = await inquirer.prompt([
    {
      type: 'text',
      name: 'main',
      message: 'What is the path to your express entry point?',
      default: mainFile
    }
  ]);
  baseConfig.builds[0].src = answers.main;
  baseConfig.routes[0].dest = answers.main;
  return {
    ...config,
    ...baseConfig
  };
}

module.exports = nodeExpress;
