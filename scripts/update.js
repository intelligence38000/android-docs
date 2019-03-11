/* eslint-disable no-console */
const fs = require('fs');

/* Pass two arguments when you run this script:
   1. the product (maps or navigation)
   2. the version number (X.X.X)
   Example: `node scripts/update.js maps 1.0.0` 
*/
let PRODUCT = process.argv[2];
let VERSION = process.argv[3];

/* Variable names and filepaths that depend on product. */
const config = {
  maps: {
    variableName: 'MAP_SDK_VERSION',
    versionList: 'src/data/map-version-numbers.json',
    apiFiles: ['api/map-sdk/index.html']
  },
  navigation: {
    variableName: 'NAVIGATION_VERSION',
    versionList: 'src/data/navigation-version-numbers.json',
    apiFiles: [
      'api/navigation-sdk/navigation/index.html',
      'api/navigation-sdk/navigation-ui/index.html'
    ]
  }
};

/* Validate the arguments */
const validateProduct = Object.keys(config).indexOf(PRODUCT) < 0;
const validateVersion = !/[0-9]+\.[0-9]+\.[0-9]+-?([beta]+)?([rc]+)?\.?[0-9]?/.test(
  VERSION
);
if (validateProduct || validateVersion) {
  if (validateProduct)
    throw new Error(
      `❌ Invalid product type: ${PRODUCT}. Use either \`maps\` or \`navigation\`.`
    );
  if (validateVersion)
    throw new Error(
      `❌ Invalid version number: ${VERSION}. Use \`X.X.X\`, where X is an integer. Optional: append the version number with \`-beta.X\` or \`-rc.X\`.`
    );
}

/* Read file contents and write to those files */
function readAndWriteFile(filename) {
  const fileContents = fs.readFileSync(filename);
  let parsedfileContents = JSON.parse(fileContents);
  let successMessage = '';
  if (filename === 'src/constants.json') {
    parsedfileContents[config[PRODUCT].variableName] = VERSION;
    successMessage = `✅ Updated the ${
      config[PRODUCT].variableName
    } variable in src/constants.json`;
  } else {
    parsedfileContents.push(VERSION);
    successMessage = `✅ Added ${VERSION} to ${config[PRODUCT].versionList}`;
  }
  fs.writeFile(filename, JSON.stringify(parsedfileContents, null, 2), err => {
    if (err) throw err;
    console.log(successMessage);
  });
}

/* Update the relevant variable (`config[PRODUCT].variableName`) in src/constants.json */
readAndWriteFile('src/constants.json');

/* Add a new VERSION to the relevant data file (`config[PRODUCT].versionList`) */
readAndWriteFile(config[PRODUCT].versionList);

/* Rewrite relevant HTML redirect(s) (`config[PRODUCT].apiFiles`) using the new VERSION */
config[PRODUCT].apiFiles.forEach(apiFile => {
  fs.writeFile(
    apiFile,
    `<meta http-equiv="refresh" content="0; url=${VERSION}/" />`,
    err => {
      if (err) throw err;
      console.log(
        `✅ Rewrote ${apiFile} to redirect to docs for version ${VERSION}`
      );
    }
  );
});
