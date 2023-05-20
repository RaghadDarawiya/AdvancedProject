const mysql = require('mysql2');

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123raghad',
  database: 'linkedin',
});

class JobListing {
  constructor(jobid , id, jtitle, jdescription, jrequirements, SalaryRange, dateposted, location) {
    this.jobid = jobid;
    this.id = id;
    this.jtitle = jtitle;
    this.jdescription = jdescription;
    this.jrequirements = jrequirements;
    this.SalaryRange = SalaryRange;
    this.dateposted = dateposted;
    this.location = location;
  }

  save(callback) {
    // Insert the job listing into the database
    db.query(
      'INSERT INTO job_listings (jobid,id,jobtitle, jobdes, jobreq, SalaryRange, dateposted,location) VALUES (?,?,?, ?, ?, ?, ?,?)',
      [this.jobid , this.id ,this.jtitle, this.jdescription, this.jrequirements, this.SalaryRange, this.dateposted,this.location],
      (err, result) => {
        if (err) {
          console.error('Error creating job listing: ', err);
          callback(err, null);
        } else {
          callback(null, result);
        }
      }
    );
  }

  // You can also define additional methods or validation logic here if needed
}

module.exports = JobListing;
