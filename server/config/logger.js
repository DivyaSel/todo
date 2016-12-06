//todolist
var winston = require('winston'),
       fs = require('fs');

var env = process.env.NODE_ENV || 'development';
var tsFormat = () => (new Date()).toLocaleTimeString();	

//Colorise log
var  logger = new (winston.Logger)({	
 transports: [
      //colorize the output to the console 
      new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      })
    ]
});	

log = function(message, level){		
	level = level || 'info';		
  logger.info(message);
};

exports.log = log;
