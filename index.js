const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const fef = require('./configs/fef');
const staticBuild = require('./configs/staticBuild');
const nodeExpress = require('./configs/nodeExpress');

const nowPath = path.join(process.cwd(), 'now.json');
const existingConfig = fs.existsSync(nowPath);

async function configGenerator() {
  let config = {
    version: 2
  };
  const answers = await inquirer.prompt([
    {
      type: 'text',
      name: 'name',
      message: 'What is the name of your project?📛',
      default: path.basename(process.cwd())
    },
    {
      type: 'list',
      name: 'type',
      message: 'What is the type of project 🦄',
      choices: ['static', 'static-build', 'node-express', 'react', 'vue']
    }
  ]);
  config.name = answers.name;
  switch (answers.type) {
    case 'static':
      config = await staticBuild(config);
      break;
    case 'static-build':
      config = await fef(config);
      break;
    case 'node-express':
      config = await nodeExpress(config);
      break;
    case 'react':
      config = await fef(config, 'build');
      break;
    case 'vue':
      config = await fef(config);
      break;
    default:
      break;
  }
  fs.writeFileSync(nowPath, JSON.stringify(config, undefined, 2), 'utf8');
  console.log('All done! 🎉 Type now to deploy! 🚀');
  process.exit(0);
}

if (existingConfig) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: 'now.json already exists! Would you like to override',
        default: false
      }
    ])
    .then(answers => {
      if (answers.overwrite) {
        configGenerator();
      } else {
        console.log('Goodbye!');
      }
    });
} else {
  configGenerator();
}
