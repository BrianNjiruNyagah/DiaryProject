const bcrypt = require('bcrypt');
function storeNewUserDetails (mysqlConnection,name,email, username, password,callback ){
    bcrypt.hash(password,10,(error,hash)=>{
        if(error){
            return error;
        }
        mysqlConnection.query(` SELECT * FROM users WHERE usersEmail = '${email}' ` ,
        (error,results)=>{
            if(error) { 
                return error;
            }
            console.log(results.length)
            setTimeout(()=>{
                if(results.length > 0){
                    callback(new Error("the error is here"));
                 
                }
            },1);
            

            if(results.length == 0) {
                mysqlConnection.query(`  insert into users (usersName,usersEmail,usersUserName,usersPassword)
                    values("${name}",'${email}','${username}','${hash}');`,
                    (error,)=>{
                        if(error) { 
                            return error;
                        }
                    });  
            }           
        });
    });
}

module.exports = storeNewUserDetails;