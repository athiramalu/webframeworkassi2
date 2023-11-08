

/****************************************************************************** *** 
*	ITE5315 – Assignment 2 
*	I declare that this assignment is my own work in accordance with Humber Academic Policy.   *  No part of this assignment has been copied manually or electronically from any other source *  (including web sites) or distributed to other students. 
*  
*	Name: _______Athiragopalkrishnapillai____________ Student ID: ___n01539688____________ Date: _11/3/2023___________________ 
* 
* 
******************************************************************************
**/  

// Required modules and packages
var express = require('express'); // Import Express.js
var path = require('path'); // For handling file paths
const fs = require('fs'); // File system module
const bodyParser = require('body-parser'); // Body parsing middleware
var app = express(); // Create an Express application
const exphbs = require('express-handlebars'); // For using Handlebars template engine
const port = process.env.PORT || 3000; // Define the port for the application

// Serve static files in the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse URL-encoded bodies for form data
app.use(express.urlencoded({ extended: false }));

// Configure Handlebars engine
app.engine('.hbs', exphbs.engine({
  extname: '.hbs',
  helpers: {
    // Custom Handlebars helper functions
    replaceRating: function(rating) {
      return rating === 0 ? 'zero' : rating;
    },
    json: function (context) {
      return JSON.stringify(context, null, 2);
    },
    compare: function(v1, v2) {
      return v1 === v2;
    }
  }
}));

// Set the view engine to Handlebars
app.set('view engine', 'hbs');

// Route for the root
app.get('/', function(req, res) {
  // Render the index page
  res.render('index', { title: 'Express' });
});

// Route for '/users'
app.get('/users', function(req, res) {
  // Placeholder response for users
  res.send('respond with a resource');
});

// Route to retrieve and render data from 'SuperSales.json'
app.get('/data', function(req, res) {
  fs.readFile('SuperSales.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error loading JSON data');
    }
    const jsonData = JSON.parse(data);
    res.render('data', { title: 'data page', jsonData: jsonData });
  });
});

// Route to display a specific invoice using its index
app.get('/data/invoiceID/:index', function (req, res) {
  const index = req.params.index;
  fs.readFile('SuperSales.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading JSON file');
    }
    const jsonData = JSON.parse(data);

    if (index >= 0 && index < jsonData.length) {
      const invoiceID = jsonData[index]['Invoice ID'];
      res.render('invoice', { title: 'InvoiceID Page', invoiceID: invoiceID });
    } else {
      res.render('error', { title: 'Error', message: 'Invoice ID not found' });
    }
  });
});



// Route to render the search form for invoice ID
app.get('/search/invoiceID', function (req, res) {
  res.render('searchinvoice', { title: 'Search Invoice ID Page', invoiceDetails: null });
});

// Route to handle post request to search for an invoice ID
app.post('/search/invoiceID', function (req, res) {
  const searchTerm = req.body.invoiceID;
  fs.readFile('SuperSales.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading JSON file');
    }
    const jsonData = JSON.parse(data);

    const invoiceDetails = jsonData.find((entry) => entry['Invoice ID'] === searchTerm);

    if (invoiceDetails) {
      res.render('searchinvoice', {
        title: 'Searching using Invoice ID',
        invoiceDetails: invoiceDetails
      });
    } else {
      res.render('searchInvoice', { title: 'Error', errorMessage: 'Invoice ID not found' });
    }
  });
});

// Route to render the search form for product line
app.get('/search/productline', function (req, res) {
  res.render('searchproductline', { title: 'Search Productline Page', productlineInfo: null });
});

// Route to handle post request to search for a product line
app.post('/search/productline', function (req, res) {
  const searchTerm = req.body.productline;
  fs.readFile('SuperSales.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading JSON file');
    }
    const jsonData = JSON.parse(data);

    const matchedResult = jsonData.filter((product) =>
      product['Product line'].toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (matchedResult.length > 0) {
      res.render('searchProductline', {
        title: 'Search Productline Page',
        searchedFor: searchTerm,
        productlineInfo: matchedResult.length > 0 ? matchedResult : null,
      });
    } else {
      res.render('error', { title: 'Error', message: 'Invalid Productline' });
    }
  });
});

// //viewdatastep 8

// app.get('/viewData', function (req, res) {
//   fs.readFile('SuperSales.json', 'utf8', (err, data) => {
//       if (err) {
//           console.error(err);
//           return res.status(500).send('Error reading JSON file');
//       }

//       const jsonData = JSON.parse(data);
//       const filteredData = jsonData.filter(record => record.Rating !== 0);

//       res.render('viewdata', {
//           title: "View Sales Data",
//           salesData: filteredData
//       });
//   });
// });





// '/viewData' route step9
// app.get('/viewData', function (req, res) {
//   fs.readFile('SuperSales.json', 'utf8', (err, data) => {
//       if (err) {
//           console.error(err);
//           return res.status(500).send('Error reading JSON file');
//       }

//       const jsonData = JSON.parse(data);

//       res.render('viewdata', {
//           title: "Viewing Sales Data",
//           salesData: jsonData
//       });
//   });
// });

//step9

app.get('/viewData', function (req, res) {
  fs.readFile('SuperSales.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading JSON file');
    }

    const jsonData = JSON.parse(data);

    // Filtering the JSON data to identify rows with 'Rating' equal to 0
    const zeroRatedData = jsonData.filter(entry => entry.Rating === 0);

    res.render('viewdata', {
      title: "Viewing Sales Data",
      salesData: jsonData, // Original data
      zeroRatedData: zeroRatedData // Filtered data with 'Rating' equal to 0
    });
  });
});


// //step 10

// // Route to view sales data, including those with a rating of 0
// app.get('/viewData', function (req, res) {
//   fs.readFile('SuperSales.json', 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Error reading JSON file');
//     }

//     const jsonData = JSON.parse(data);
//      // Filtering data with a 'Rating' of 0
//     const zeroRatedData = jsonData.filter(entry => entry.Rating === 0);

//     res.render('viewdata', {
//       title: "Viewing Sales Data",
//       salesData: jsonData,
//       zeroRatedData: zeroRatedData
//     });
//   });
// });




// Catch-all route for any undefined routes

app.get('*', function(req, res) {
  //console.log('Accessed route:', req.url);
  res.render('error', { title: 'Error', message: 'Wrong Route' });
});
// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});



































