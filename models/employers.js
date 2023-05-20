const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123raghad',
  database: 'linkedin',
});

class Employer {
  constructor(id , companyname, email, phone, password,location) {
    this.id = id;
    this.companyname = companyname;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.location = location;
  }

  save(callback) {
    db.query(
       // 'INSERT INTO job_listings (jobid,id,jobtitle, jobdes, jobreq, SalaryRange, dateposted) VALUES (?,?,?, ?, ?, ?, ?)',
      //[1,1,this.jtitle, this.jdescription, this.jrequirements, this.SalaryRange, this.dateposted],
      'INSERT INTO employers (id, companyname, email, phone , password ,location) VALUES (?, ?, ?, ? ,?,?)',
      [this.id, this.companyname, this.email , this.phone , this.password , this.location],
      (err, result) => {
        if (err) {
          console.error('Error creating employer:', err);
          callback(err, null);
        } else {
          callback(null, result);
        }
      }
    );
  }
}

module.exports = Employer;
