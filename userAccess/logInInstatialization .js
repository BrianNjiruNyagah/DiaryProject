const bcrypt = require('bcrypt');
const localStartegy = require('passport-local').Strategy;
function initialize(passport,mysqlConnection){
    const authenticateUser = (email,password,done)=>{
        mysqlConnection.query(` SELECT * FROM users WHERE usersEmail = '${email}' ` ,
            (error,results)=>{
                
                if(error) { 
                    return done(error);
                }
    
                if(results.length == 0) {
                    return done(null,false);
                }

                bcrypt.compare(password, results[0].usersPassword, function(err, result) {
                    if(result){
                        const userDetails = {
                            usersID:results[0].usersID,
                            usersUserName:results[0].usersUserName,
                        }
                        return done(null,userDetails);
                    }
                });
            });
    }
    passport.use(new localStartegy({usernameField:'email',passwordField:'password'},authenticateUser));
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => {
        done(null,user)
    });
}

module.exports = initialize;