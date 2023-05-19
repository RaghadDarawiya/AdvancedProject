const express = require('express');
const db = require('../advproj/database');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT  || 9221;
app.listen(PORT, () => {
  console.log('Server started on port 4000');
})

/*app.get('/test', (req, res) => {
  db.query('SELECT * FROM employers', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error retrieving data from the database');
    } else {
      res.json(result);
    }
  });
});*/

app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});
const JobListing = require('./models/joblistings ');//C:\Users\admin\Downloads\advproj\models\joblistings .js
const employers = require('C:/Users/admin/Downloads/advproj/models/employers.js');


//sign up
app.post("/sign/employer", (req,res)=>{
  const {id , companyname, email, phone, password} = req.body;

  // Create a new instance of the JobListing model
  const employer = new employers(id , companyname, email, phone, password);
  //const em = new employers(req.body)
  employer.save((err, result) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(201).json({ message: 'employer sign up successfully' });
    }
  });
});
 
//sign up
app.post("/sign/seeker", (req,res)=>{
  const {id , companyname, email, phone, password} = req.body;

  // Create a new instance of the JobListing model
  const employer = new employers(id , companyname, email, phone, password);
  //const em = new employers(req.body)
  employer.save((err, result) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(201).json({ message: 'employer sign up successfully' });
    }
  });
});

// Login route for employers
let loggedInEmployeeId = null;
app.post('/login', (req, res) => {
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

//create JobListing
app.post('/job-listings', (req, res) => {
  const {jobid , title, description, requirements, salaryRange , dateposted } = req.body;

  // Create a new instance of the JobListing model
  const jobListing = new JobListing(jobid , loggedInEmployeeId ,title, description, requirements, salaryRange, dateposted);

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
  const { title, description, requirements, salaryRange ,dateposted} = req.body;

  // Update the job listing in the database
  db.query(
    'UPDATE job_listings SET jobtitle = ?, jobdes = ?, jobreq = ?, SalaryRange= ?,dateposted=? WHERE jobid = ?',
    [title, description, requirements, salaryRange,dateposted, jobId],
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
app.get('/jobs/:title/:location', (req, res) => {
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
        res.json({ jobs: result });
        //res.json(result[0]);
      }
    }
  );
 
  //res.json({ title});
  //res.json({ location});
  // Build the SQL query to perform the job search using the provided parameters
 /* const query = `
    SELECT *
    FROM job_listings
    WHERE jobtitle LIKE '%${title}%'
      AND location LIKE '%${location}%'

  `;

  // Execute the query
  /*db.query(query, (err, results) => {
    if (err) {
      console.error('Error searching jobs:', err);
      res.status(500).json({ error: 'An error occurred while searching for jobs' });
    } else {
      // Send the search results back to the client
      res.json({ jobs: results });
    }
  });*/
/* catch (error) {
  console.error('Error searching jobs:', error);
  res.status(500).json({ error: 'An error occurred while searching for jobs' });
}*/
});


  
  // Create a job search
app.post('/job-searches', (req, res) => {
  const { userId, criteria } = req.body;

  // Insert the job search into the database
  db.query(
    'INSERT INTO job_searches (user_id, search_criteria) VALUES (?, ?)',
    [userId, criteria],
    (err, result) => {
      if (err) {
        console.error('Error creating job search: ', err);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        res.status(201).json({ message: 'Job search saved successfully' });
      }
    }
  );
});

// Get all job searches
app.get('/job-searches', (req, res) => {
  // Retrieve all job searches from the database
  db.query('SELECT * FROM job_searches', (err, result) => {
    if (err) {
      console.error('Error retrieving job searches: ', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(result);
    }
  });
});

////////////////////////////////////////////////////////////////////////////////








