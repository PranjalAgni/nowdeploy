const inquirer = require('inquirer');
const path = require('path');

const baseConfig = {
  builds: [{ src: '*', use: '@now/static' }]
};

async function staticBuild(config) {
  const answers = await inquirer.prompt([
    {
      type: 'text',
      name: 'directory',
      message: 'What folder you like to deploy?',
      default: '.'
    }
  ]);

  baseConfig.builds[0].src = path.join(answers.directory, '*');
  return {
    ...config,
    ...baseConfig
  };
}

module.exports = staticBuild;
