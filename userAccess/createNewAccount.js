const bcrypt = require('bcrypt');
function storeNewUserDetails (mysqlConnection,name,email, username, password,callback ){
    bcrypt.hash(password,10,(error,hash)=>{
        if(error){
            return error;
        }
        mysqlConnection.query(` SELECT * FROM users WHERE usersEmail = '${email}' ` ,
        (error,results)=>{
            if(error) { 
                console.log('error 1')
                return error;
            }
            
            if(results.length > 0){
                console.log(results.length)
                setTimeout(()=>{
                    callback(new Error("This email adrress is already in use "));
                    return;       
                },0);                
            }

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