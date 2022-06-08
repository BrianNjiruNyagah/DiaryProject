"use-strict";
function deleteData(mysqlConnection,ID,diaryNumber,res){
    mysqlConnection.query(` DELETE FROM diarydata WHERE ID = '${ID}' AND diaryNumber = '${diaryNumber}' `,
    (error,results)=>{
        if (error) {
            console.log(error)
            return error;
        }
        if(results) {
            res.redirect('/homepage');
        }
    });
}

module.exports = deleteData;