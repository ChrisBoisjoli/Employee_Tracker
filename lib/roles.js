// add role
 //view all roles
 //update employee role
class Roles{
    constructor(role){
        this.role = role;
    }

  showRole(){
    return  sql = "SELECT * FROM role";
    connection.query(sql, function(err, res){
        if (err) throw err;
        console.table(res);
    });
};
}
module.exports = Roles;