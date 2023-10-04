const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host : 'localhost',      //por padrão localhost
        user : 'root',       //por padrão root
        password : 'senac@1',  //sua senha definida
        database : 'escola'       //nome do seu banco criado
     }
});
module.exports = knex