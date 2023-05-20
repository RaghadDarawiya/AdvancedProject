const express = require('express');
const db = require('../advproj/database');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const findFreePorts = require('find-free-ports');
const PORT = process.env.PORT  || 3000;
app.listen(PORT, () => {
  console.log('Server started on port 4000');
})
//test
app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});
const JobListing = require('./models/joblistings ');//C:\Users\admin\Downloads\advproj\models\joblistings .js
const employers = require('C:/Users/admin/Downloads/advproj/models/employers.js');


//sign up employer
app.post("/sign/employer", (req,res)=>{
  const {id , companyname, email, phone, password, location} = req.body;

  // Create a new instance of the JobListing model
  //const employer = new employers(id , companyname, email, phone, password,location);
  //const em = new employers(req.body)
  db.query('SELECT * FROM employers WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error checking email:', err);
      return res.status(500).json({ error: 'An error occurred while signing up' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Insert the new job seeker into the database
    db.query( 'INSERT INTO employers (id, companyname, email, phone , password, location) VALUES (?, ?, ?, ? ,?,?)',
    [id, companyname, email , phone , password, location], (err, result) => {
      if (err) {
        console.error('Error signing up:', err);
        res.status(500).json({ error: 'An error occurred while signing up' });
      } else {
        res.json({ message: 'employer sign up successfully' });
      }
    });
  });
});
 
//sign up seeker
app.post("/sign/seeker", (req,res)=>{
  const {seeker_id , fname, lname, email, cv, password} = req.body;

  // Create a new instance of the JobListing model
    db.query('SELECT * FROM job_seekers WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error checking email:', err);
      return res.status(500).json({ error: 'An error occurred while signing up' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Insert the new job seeker into the database
    db.query('INSERT INTO job_seekers (seeker_id , fname, lname, email, cv, password) VALUES (? , ?, ?, ?, ? , ?)', [seeker_id , fname, lname, email, cv, password], (err, result) => {
      if (err) {
        console.error('Error signing up:', err);
        res.status(500).json({ error: 'An error occurred while signing up' });
      } else {
        res.json({ message: 'Job seeker signed up successfully' });
      }
    });
  });
});

// Login route for employers
let loggedInEmployeeId = null;
app.post('/login/employer', (req, res) => {
  // Extract the email and password from the request body
  const { email, password } = req.body;

  // Check if the email exists in the employers table
  db.query(
    'SELECT * FROM employers WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) {
        console.error('Error retrieving employer:', err);
        res.status(500).json({ error: 'An error occurred' });
      } else if (results.length === 0) {
        res.status(401).json({ error: 'Invalid credentials' });
      } else {
        loggedInEmployeeId = results[0].id; 
        res.status(200).json({ message: 'Login successful' });
      }
    }
  );
});

// Login route for employers
let loggedInSeekerId = null;
app.post('/login/seeker', (req, res) => {
  // Extract the email and password from the request body
  const { email, password } = req.body;

  // Check if the email exists in the employers table
  db.query(
    'SELECT * FROM job_seekers WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) {
        console.error('Error retrieving employer:', err);
        res.status(500).json({ error: 'An error occurred' });
      } else if (results.length === 0) {
        res.status(401).json({ error: 'Invalid credentials' });
      } else {
        loggedInSeekerId = results[0].seeker_id; 
        res.status(200).json({ message: 'Login successful' });
      }
    }
  );
});
//create JobListing
app.post('/job-listings', (req, res) => {
  const {jobid , title, description, requirements, salaryRange , dateposted ,location } = req.body;

  // Create a new instance of the JobListing model
  const jobListing = new JobListing(jobid , loggedInEmployeeId ,title, description, requirements, salaryRange, dateposted, location);

  // Save the job listing to the database
  jobListing.save((err, result) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(201).json({ message: 'Job listing created successfully' });
    }
  });
});

// Get all job listings
app.get('/joblistings', (req, res) => {
  // Retrieve all job listings from the database
  db.query('SELECT * FROM job_listings', (err, result) => {
    if (err) {
      console.error('Error retrieving job listings: ', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(result);
    }
  });
});

// Get a specific job listing
app.get('/job-listings/:id', (req, res) => {
  const jobId = req.params.id;

  // Retrieve the specific job listing from the database
  db.query(
    'SELECT * FROM job_listings WHERE jobid = ?',
    [jobId],
    (err, result) => {
      if (err) {
        console.error('Error retrieving job listing: ', err);
        res.status(500).json({ error: 'An error occurred' });
      } else if (result.length === 0) {
        res.status(404).json({ error: 'Job listing not found' });
      } else {
        res.json(result[0]);
      }
    }
  );
});

// Update a job listing
app.put('/job-listings/:id', (req, res) => {
  const jobId = req.params.id;
  const { title, description, requirements, salaryRange ,dateposted, location} = req.body;

  // Update the job listing in the database
  db.query(
    'UPDATE job_listings SET jobtitle = ?, jobdes = ?, jobreq = ?, SalaryRange= ?,dateposted=?,location=? WHERE jobid = ?',
    [title, description, requirements, salaryRange,dateposted,location, jobId],
    (err, result) => {
      if (err) {
        console.error('Error updating job listing: ', err);
        res.status(500).json({ error: 'An error occurred' });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Job listing not found' });
      } else {
        res.json({ message: 'Job listing updated successfully' });
      }
    }
  );
});

// Delete a job listing
app.delete('/job-listings/:id', (req, res) => {
  const jobId= req.params.id;

  // Delete the job listing from the database
  db.query(
  'DELETE FROM job_listings WHERE jobid = ?',
  [jobId],
  (err, result) => {
  if (err) {
  console.error('Error deleting job listing: ', err);
  res.status(500).json({ error: 'An error occurred' });
  } else if (result.affectedRows === 0) {
  res.status(404).json({ error: 'Job listing not found' });
  } else {
  res.json({ message: 'Job listing deleted successfully' });
  }
  }
  );
  });
  //////////////////////////////////////////////////////////////////
  // feature #2
  //make search
  //let serarchid=0;
app.get('/jobs/:title/:location', (req, res) => {
  //searchid++;
  const title = req.params.title;
  const  location  = req.params.location;
  db.query(
    'SELECT * FROM job_listings WHERE jobtitle = ?  AND location = ? ',
    [title,location],
    (err, result) => {
      if (err) {
        console.error('Error retrieving job listing: ', err);
        res.status(500).json({ error: 'An error occurred' });
      } else if (result.length === 0) {
        res.status(404).json({ error: 'Job listing not found' });
      } else {
        //const searchFilters =  title ;

        db.query('INSERT INTO jobs_searches ( seeker_id , title, location) VALUES (? ,?,?)', [loggedInSeekerId,title,location], (err, searchResult) => {
          if (err) {
            console.error('Error saving search: ', err);
          }

          res.json({ jobs: result });
        });

        //res.json(result[0]);
      }
    }
  );
  });
 

// Get all job searches
app.get('/job-searches', (req, res) => {
  // Retrieve all job searches from the database
  db.query('SELECT * FROM jobs_searches', (err, result) => {
    if (err) {
      console.error('Error retrieving job searches: ', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(result);
    }
  });
});

////////////////////////////////////////////////////////////////////////////////




