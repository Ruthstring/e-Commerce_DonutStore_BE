const csv = require('csvtojson');
const fs = require('fs'); //file system module

// Path to your CSV file
const csvFilePath = 'assets/DonutMenu.csv';

//case-sensitive. Convert CSV to JSON:
csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
      // Map the fields to lowercase
      const formattedData = jsonObj.map(item => ({
          title: item.Title,          // Map to lowercase
          price: item.Price,
          description: item.Description,
          categories:item.Categories,
          allergens:item.Allergens,
      }));

      // Save the correctly formatted JSON to a file
      fs.writeFileSync('menuItems.json', JSON.stringify(formattedData, null, 2));

      console.log('Formatted JSON:', formattedData);
  })
  .catch(err => {
      console.error('Error:', err.message);
  });




// Convert CSV to JSON
// csv()
//   .fromFile(csvFilePath)
//   .then((jsonObj) => {
//       // Save JSON to a file (optional)
//       fs.writeFileSync('menuItems.json', JSON.stringify(jsonObj, null, 2));

//       console.log(jsonObj);
//   });