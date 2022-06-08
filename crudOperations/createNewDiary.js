function storeDiaryDetails(mysqlConnection,id,username,date,title,data,res){

    mysqlConnection.query(
        `INSERT INTO diarydata(ID,username,date,title,data)
         VALUE('${id}','${username}','${date}','${title}','${data}')`,
        (error,results)=>{
            if(error) return error; 
            if(results) res.redirect('/homepage')           
        }
    )
}
module.exports = storeDiaryDetails;
