function diaryData(mysqlConnection,ID,username,res){
    mysqlConnection.query(` SELECT * FROM diarydata WHERE ID = '${ID}' AND username = '${username}' `,
                            (error,results)=>{
                                if (error) {
                                    console.log(error);
                                    return error;
                                }
                                if (results) {
                                    const userDetails = [];
                                    results.map(x => userDetails.push({ID:x.ID,title:x.title,diaryNumber:x.diaryNumber}));
                                    res.render('homePage.ejs',{ userDetails:userDetails, username:username });
                                    return results;
                                }
                            });
}

module.exports = diaryData;