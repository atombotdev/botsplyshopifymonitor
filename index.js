const config = require('./config');
const events = require('./src/events');
const taskLib = require('./task.js');
const chalk = require('chalk');
const fs = require('fs');

require("console-stamp")(console, {
  pattern: 'HH:MM:ss:l',
  label: false,
  colors: {
    stamp: require('chalk').white
  }
});

var mod = require(`./src/monitor`).init

console.log(chalk.red('-------------------------'));
console.log(chalk.cyan('   Shopify Monitor V2'));
console.log(chalk.cyan('        By Rock'));
console.log(chalk.red('-------------------------'));
console.log(chalk.magenta(`Found ${config.sites.length} sites.`));
console.log(chalk.magenta(`Found ${fs.readFileSync(__dirname + '/proxies.txt').toString().split("\n").length} proxies.`));
console.log(chalk.red('-------------------------'));
console.log(chalk.cyan('Initializing (' + config.sites.length + ') sites.'));
console.log(chalk.red('-------------------------'));

config.sites.forEach(function (site) {
  startmod = new mod(site);
});

events.on('newitem', (data) => {
  for (var i = 0; i < config.webhook.length; i++) {
    require('./src/webhook.js').send(config.webhook[i], data.url, 'newitem', '')
  }
});

events.on('restock', (data) => {
  for (var i = 0; i < config.webhook.length; i++) {
    require('./src/webhook').send(config.webhook[i], data.url, 'restock', data.time)
  }
});
