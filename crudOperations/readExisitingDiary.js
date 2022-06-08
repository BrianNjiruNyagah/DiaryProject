"use-strict";
function getData(mysqlConnection,ID,diaryNumber,res){
    mysqlConnection.query(` SELECT * FROM diarydata WHERE ID = '${ID}' AND diaryNumber = '${diaryNumber}' `,
    (error,results)=>{
        if (error) {
            console.log(error)
            return error;
        }
        if (results) {
            const userDetails = {
                ID:results[0].ID,
                title:results[0].title,
                date:results[0].date.toISOString().split('T')[0],
                diaryNumber:results[0].diaryNumber,
                data:results[0].data,
                readonly:"readonly"
            }
            res.render('newDiary.ejs',{ userDetails:userDetails })
        }
    });
}

module.exports = getData;