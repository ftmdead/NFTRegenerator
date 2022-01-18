const fs = require('fs');


function processFile(content) {
  const zombie = JSON.parse(content);
  // reveal your secrets...
  Object.entries(zombie).forEach((element) => {
    const {edition} = element[1];
    const {data} = element[1];

    fs.writeFile(`2.Splitter/individualMetaData/${edition}.json`, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        throw err;
      }
      console.log(`Finished ${edition}.json`);
    });
  });
}

fs.readFile('2.Splitter/_metadata.json', 'utf8', function read(err, data) {
  if (err) {
    throw err;
  }
  const content = data;
  processFile(content);
});