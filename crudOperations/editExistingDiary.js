function storeEditedDiaryDetails(mysqlConnection,ID,DN,title,data,res){

    mysqlConnection.query(
        `UPDATE diarydata
        SET title = '${title}' , data = '${data}'
        WHERE ID = '${ID}' AND diaryNumber = '${DN}'
        `,
        (error,results)=>{
            if(error) return error; 
            if(results) res.redirect('/homepage')           
        }
    )
}
module.exports = storeEditedDiaryDetails;
