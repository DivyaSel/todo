//todolist
var path = require('path'),    
       rootPath = path.normalize(__dirname + '/..'),    
       env = process.env.NODE_ENV || 'development';

var config = {  
       development: {    
                   root: rootPath,    
                   app: {      name: 'todolist'    },    
                   port: 5000, 
                   db: 'mongodb://127.0.0.1/todolist-dev',
                   secret: "Divyatodolist" 
                    },  
        test: {
                    root: rootPath,
                    app: {      name: 'todolist'    },
                    port: 5000,
                    secret: "Divyatodolist"
              },
        production: {    
                     root: rootPath,    
                     app: {      name: 'todolist'    },    
                     port: 80,
                     secret: "Divyatodolist"
                    }
         };
         
module.exports = config[env];
