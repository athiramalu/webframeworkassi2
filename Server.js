
//step-2
// Import the 'express' library to create an Express application
const express = require('express');
// Create an instance of the Express application
const app = express();
// Define the port on which the server will listen
const port = 5500;
// Import the 'fs' (file system) module for file-related operations
const fs = require('fs');
app.use(express.urlencoded({ extended: true }));
// Define a route for the root path ('/')
app.get('/', function (req, res) {
    // Send a response back to the client with the text 'Athira, N01539688'
    res.send('Athira, N01539688');
});




//step3

app.get('/about', function (req, res) {
  
  res.sendFile(__dirname + '/resume.html')
   
})









//step5
//define route for route URL (/data)
app.get('/data',(req, res) => {
  
  fs.readFile("ite5315-A1-Car_sales.json", (err, data) => {
      if (err) {
         
          console.error(err);
          res.status(500).send('Error loading JSON data');
      } else {
        res.send('JSON data is loaded');
          console.log(JSON.parse(data));
          
          
      }
  });
  console.log('Athira')
});



//step6
app.get('/data/invoiceNo/:index', (req, res) => {
  const index = parseInt(req.params.index);

  if (isNaN(index)) {
      res.status(400).send('You enter a invalid value');
      return;
  }
  fs.readFile('ite5315-A1-Car_sales.json',  (err, data) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error loading JSON data');
      } else {
          console.log('JSON data is loaded');

          try {
              const jsonData = JSON.parse(data);

              if (index >= 0 && index < jsonData.carSales.length) {
                  const invoiceNo = jsonData.carSales[index].InvoiceNo;
                  res.send(invoiceNo);
              } else {
                  res.status(404).send('Result not found');
              }
          } catch (err) {
              console.error(err);
              res.status(500).send('Error parsing JSON data');
          }
      }
  });
});


//step 6 second part

app.get('/search/invoiceNo', (req, res) => {
    res.send(`
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f0f0f0;">
            <form method="post" action="/search/invoiceNo" style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                <h2>Search by Invoice Number</h2>
                <table>
                    <tr>
                        <td><label for="invoiceNo">Enter InvoiceNo:</label></td>
                        <td><input type="text" name="invoiceNo" placeholder="Enter invoiceNo"></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><input type="submit" value="Search"></td>
                    </tr>
                </table>
            </form>
        </div>
    `);
});

app.post('/search/invoiceNo', (req, res) => {
    const invoiceNoToSearch = req.body.invoiceNo;
    fs.readFile('ite5315-A1-Car_sales.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error loading JSON data');
        } else {
            const jsonData = JSON.parse(data);
            const foundData = jsonData.carSales.find(item => item.InvoiceNo === invoiceNoToSearch);

            if (foundData) {
                res.send(`
                    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f0f0f0;">
                        <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                            <h2>Car Details</h2>
                            <table style="width: 100%;">
                                <tr>
                                    <td><strong>Invoice Number:</strong></td>
                                    <td>${foundData.InvoiceNo}</td>
                                </tr>
                                <tr>
                                    <td><strong>Manufacturer:</strong></td>
                                    <td>${foundData.Manufacturer}</td>
                                </tr>
                                <tr>
                                    <td><strong>Model:</strong></td>
                                    <td>${foundData.Model}</td>
                                </tr>
                                <tr>
                                    <td><strong>Sales in Thousands:</strong></td>
                                    <td>${foundData.Sales_in_thousands}</td>
                                </tr>
                                <tr>
                                    <td><strong>Year Resale Value:</strong></td>
                                    <td>${foundData._year_resale_value}</td>
                                </tr>
                                <tr>
                                    <td><strong>Vehicle Type:</strong></td>
                                    <td>${foundData.Vehicle_type}</td>
                                </tr>
                                <tr>
                                    <td><strong>Price in Thousands:</strong></td>
                                    <td>$ ${foundData.Price_in_thousands}</td>
                                </tr>
                                <tr>
                                    <td><strong>Engine Size:</strong></td>
                                    <td>${foundData.Engine_size}</td>
                                </tr>
                                <tr>
                                    <td><strong>Horsepower:</strong></td>
                                    <td>${foundData.Horsepower}</td>
                                </tr>
                                <tr>
                                    <td><strong>Wheelbase:</strong></td>
                                    <td>${foundData.wheelbase}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                `);
            } else {
                res.status(404).send('Invoice not found');
            }
        }
    });
});





//step 7

app.get('/search/manufacturer', (req, res) => {
    res.send(`
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f0f0f0;">
            <form method="post" action="/search/manufacturer" style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                <h2>Search by Manufacturer</h2>
                <table>
                    <tr>
                        <td><label for="manufacturer">Enter Manufacturer:</label></td>
                        <td><input type="text" name="manufacturer" placeholder="Enter Manufacturer"></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><input type="submit" value="Search"></td>
                    </tr>
                </table>
            </form>
        </div>
    `);
});

app.post('/search/manufacturer', (req, res) => {
    const manufacturerToSearch = req.body.manufacturer;
    fs.readFile('ite5315-A1-Car_sales.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error loading JSON data');
        } else {
            const jsonData = JSON.parse(data);
            const foundData = jsonData.carSales.filter(item => item.Manufacturer.includes(manufacturerToSearch)).slice(0, 3);
//This code filters the data to find all items where the Manufacturer property contains the manufacturerToSearch text. 
//So, if the user enters a partial manufacturer name, it will still return matching results.
            if (foundData.length > 0) {
                let htmlContent = '';
                for (const dataItem of foundData) {
                    htmlContent += `
                        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f0f0f0;">
                            <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                                <h2>Car Details</h2>
                                <table style="width: 100%;">
                                    <tr>
                                        <td><strong>Invoice Number:</strong></td>
                                        <td>${dataItem.InvoiceNo}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Manufacturer:</strong></td>
                                        <td>${dataItem.Manufacturer}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Model:</strong></td>
                                        <td>${dataItem.Model}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Sales in Thousands:</strong></td>
                                        <td>${dataItem.Sales_in_thousands}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Year Resale Value:</strong></td>
                                        <td>${dataItem._year_resale_value}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Vehicle Type:</strong></td>
                                        <td>${dataItem.Vehicle_type}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Price in Thousands:</strong></td>
                                        <td>$ ${dataItem.Price_in_thousands}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Engine Size:</strong></td>
                                        <td>${dataItem.Engine_size}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Horsepower:</strong></td>
                                        <td>${dataItem.Horsepower}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Wheelbase:</strong></td>
                                        <td>${dataItem.wheelbase}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    `;
                }
                res.send(htmlContent);
            } else {
                res.status(404).send('Manufacturer not found');
            }
        }
    });
});









//step 4
app.use((req, res) => {
  res.status(404).send('404 Not Found,check your path');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
/*** 
*	ITE5315 – Assignment 1 
*	I declare that this assignment is my own work in accordance with Humber Academic Policy.   *  No part of this assignment has been copied manually or electronically from any other source *  (including web sites) or distributed to other students. 
*  
*	Name: ___________Athira Gopalakrishna Pillai________ Student ID: ____n01539688___________ Date: ___10/3/2023_________________ 
* 
* 
******************************************************************************
**/  
