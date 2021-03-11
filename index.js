
const Server = require('./src/Server');
const dotenv = require('dotenv').config();

const options ={
    port : process.env.PORT,
    mongodb: {
        uri : process.env.MONGO_URL
    },
    mysql: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    },
    signature: process.env.SIGNATURE  
}

app = new Server(options);

app.startServer();
