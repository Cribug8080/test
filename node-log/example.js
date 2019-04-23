const log4js = require('log4js');
log4js.configure({
  appenders: { 
      info:{
            type:'file',
            filename:'./log/info.log'
        }, 
      error:{
          type:'file',
          filename:'./log/error.log'
      }, 
    },
  categories: { 
    default: { 
        appenders: ['error'],
        level: 'error' 
    },
    default2: { 
        appenders: ['error'],
        level: 'error' 
    },
    default3: { 
        appenders: ['info'],
        level: 'info' 
    } 
  },
});

const logger = log4js.getLogger('cheese');
logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Comté.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');

logger.trace('2Entering cheese testing');
logger.debug('2Got cheese.');
logger.info('2Cheese is Comté.');
logger.warn('2Cheese is quite smelly.');
logger.error('2Cheese is too ripe!');
logger.fatal('2Cheese was breeding ground for listeria.');