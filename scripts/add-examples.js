/* eslint-disable no-console */
const fs = require('fs');

/* Pass one or three arguments when you run this script.
   
   ALWAYS REQUIRED:
   1. the product (maps or navigation)

   OPTIONAL, BUT IF ONE IS USED BOTH MUST BE USED:
   2. the folder name (a string)
   3. the activity name (SomethingActivity.java)
   
   If no folder and activity are provided, the script will run on all activities
   for that product that exist in the submodule, but are not used in any example pages.

   Examples:
   All maps activities: `node scripts/add-examples.js maps`
   One activity: `node scripts/add-examples.js maps dds ChoroplethJsonVectorMixActivity.java`

*/
let PRODUCT = process.argv[2];
let FOLDER = process.argv[3];
let ACTIVITY = process.argv[4];
let ACTIVITY_NAME;
if (ACTIVITY) ACTIVITY_NAME = ACTIVITY.split('.')[0];

/*************
 * VALIDATION *
 **************/

/* A product is required. Before anything else, check that a
   product has been specified and that it is valid. */
if (!PRODUCT || (PRODUCT !== 'maps' && PRODUCT !== 'navigation')) {
  throw new Error(
    `❌ You must include a product name. Use either \`maps\` or \`navigation\`.`
  );
}

/********************
 * PREPARE RESOURCES *
 *********************/

/* Paths to folders and files we need to read.  */
const exampleJsFile = './src/example-code/';
const submoduleFolder = {
  maps:
    './examples/maps/MapboxAndroidDemo/src/main/java/com/mapbox/mapboxandroiddemo/examples/',
  navigation:
    './examples/navigation/app/src/main/java/com/mapbox/services/android/navigation/testapp/activity/'
};
const fileLocations = {
  mainActivity: {
    maps:
      './examples/maps/MapboxAndroidDemo/src/global/java/com/mapbox/mapboxandroiddemo/MainActivity.java',
    navigation:
      './examples/navigation/app/src/main/java/com/mapbox/services/android/navigation/testapp/MainActivity.java'
  },
  imageList: {
    maps:
      './examples/maps/MapboxAndroidDemo/src/main/res/values/urls_strings.xml',
    navigation: './examples/navigation/app/src/main/res/values/strings.xml'
  },
  titleList: {
    maps:
      './examples/maps/MapboxAndroidDemo/src/main/res/values/titles_strings.xml',
    navigation: './examples/navigation/app/src/main/res/values/strings.xml'
  },
  descriptionList: {
    maps:
      './examples/maps/MapboxAndroidDemo/src/main/res/values/descriptions_strings.xml',
    navigation: './examples/navigation/app/src/main/res/values/strings.xml'
  }
};

/* File contents that are needed in all cases. */
const titleListFileContents = fs.readFileSync(
  fileLocations['titleList'][PRODUCT],
  {
    encoding: 'utf-8'
  }
);
const descriptionListFileContents = fs.readFileSync(
  fileLocations['descriptionList'][PRODUCT],
  {
    encoding: 'utf-8'
  }
);
const imageListFileContents = fs.readFileSync(
  fileLocations['imageList'][PRODUCT],
  {
    encoding: 'utf-8'
  }
);

const demoToExampleConfig = {
  maps: {
    basics: {
      examplePath: 'maps',
      topic: 'Getting started'
    },
    camera: {
      examplePath: 'maps',
      topic: 'Camera'
    },
    dds: {
      examplePath: 'maps',
      topic: 'Data visualization'
    },
    extrusions: {
      examplePath: 'maps',
      topic: 'Extrusions'
    },
    javaservices: {
      examplePath: 'java',
      topic: 'Getting started'
    },
    labs: {
      examplePath: 'maps',
      topic: ''
    },
    location: {
      examplePath: 'maps',
      topic: ''
    },
    offline: {
      examplePath: 'maps',
      topic: 'Offline'
    },
    plugins: {
      examplePath: 'plugins',
      topic: 'Getting started'
    },
    query: {
      examplePath: 'maps',
      topic: ''
    },
    snapshot: {
      examplePath: 'maps',
      topic: 'Image generation'
    },
    styles: {
      examplePath: 'maps',
      topic: 'Dynamic styling'
    }
  },
  navigation: {
    navigationui: {
      examplePath: 'navigation',
      topic: 'Getting started'
    },
    notification: {
      examplePath: 'navigation',
      topic: 'Notifications'
    }
  }
};

/*********************
 * NEW CONTENT FORMAT *
 **********************/

function createContent(folder, activityName) {
  return `const rawJavaCode = require('raw-loader!../.${
    submoduleFolder[PRODUCT]
  }${folder}/${activityName}.js');

const rawKotlinCode = "// Not available"

export { rawJavaCode, rawKotlinCode };`;
}

function createMarkdownContent(
  activityName,
  frontMatterValues,
  subFolder,
  mdFileName
) {
  return `---
title: ${frontMatterValues.title}
description: ${frontMatterValues.description}
thumbnail: ${frontMatterValues.image}
topic: ${subFolder ? demoToExampleConfig[PRODUCT][subFolder].topic : ''}
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import video${activityName} from '../../../video/example-${mdFileName}.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/${activityName}.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={video${activityName}}
    rotation="horizontal"
    device="pixel-2"
  />
}}

<!-- Any notes about this example would go here.  -->

{{
  <ToggleableCodeBlock 
    java={rawJavaCode}
  />
}}`;
}

/*******************************
 * DETERMINE FRONTMATTER VALUES *
 ********************************/

/* Logic for creating necessary files to display 
   an example on a web page. */
function createExampleAssets(folder, activityName, mdFileName) {
  /* Read the MainActivity file */
  const mainActivityFileContents = fs.readFileSync(
    fileLocations['mainActivity'][PRODUCT],
    { encoding: 'utf-8' }
  );

  /* Use regexp to find the section that is related to the 
     current activity. */
  const activityRegexpString = {
    maps: `exampleItemModels.add\\(new ExampleItemModel\\(\\n\\s+R.id.\\S+,\\n\\s+R.string.(\\S+),\\n\\s+R.string.(\\S+),\\n\\s+new Intent\\(MainActivity.this, ${activityName}.class\\),\\n\\s+null,\\n\\s+R.string.(\\S+),`,
    navigation: `getString\\(R.string.(\\S+)\\),\\n\\s+getString\\(R.string.(\\S+)\\),\\n\\s+${activityName}.class`
  };
  const activityRegex = new RegExp(activityRegexpString[PRODUCT], 'm');
  const activityRegexResult = activityRegex.exec(mainActivityFileContents);

  /* Store the resulting title, description, and image
     idenifiers in an object. */
  let identifiers = {
    title: '',
    description: '',
    image: ''
  };

  /* Update the object with the title, description, and image
     ids that were found with the regexp. */
  if (activityRegexResult) {
    identifiers['title'] = activityRegexResult[1];
    identifiers['description'] = activityRegexResult[2];
    identifiers['image'] = activityRegexResult[3];
  }

  /* Find the related title via the identifiers["title"] in the
     `titles_strings.xml` file */
  const titleRegex = new RegExp(
    `<string name="${identifiers['title']}">(.+)</string>`
  );
  const titleRegexResult = titleRegex.exec(titleListFileContents);

  /* Find the related title via the identifiers["description"] in the
     `descriptions_strings.xml` file */
  const descriptionRegex = new RegExp(
    `<string name="${identifiers['description']}">(.+)</string>`
  );
  const descriptionRegexResult = descriptionRegex.exec(
    descriptionListFileContents
  );

  /* Find the related title via the identifiers["image"] in the
     `urls_strings.xml` file */
  const imageRegex = new RegExp(
    `<string name="${
      identifiers['image']
    }" translatable="false">(https?://i.imgur.com/\\S+.png)</string>`
  );
  const imageRegexResult = imageRegex.exec(imageListFileContents);

  /* Prepare an object to store the resulting title,
     description, and image strings. */
  let frontMatterValues = {
    title: '',
    description: '',
    image: ''
  };

  /* Update the object with the title, description, and image url
     that was found with the regexp. */
  if (imageRegexResult) frontMatterValues['image'] = imageRegexResult[1];
  if (titleRegexResult) frontMatterValues['title'] = titleRegexResult[1];
  if (descriptionRegexResult)
    frontMatterValues['description'] = descriptionRegexResult[1];

  /* Create an new `example-code` js file to load the Java and
     Kotlin that will be imported into the example md file. */
  fs.appendFile(
    `./src/example-code/${activityName}.js`,
    createContent(folder, activityName),
    err => {
      if (err) throw err;
      console.log(`Created example-code file for ${activityName}`);
    }
  );

  /* Create a new `src/pages/{product}/examples/` md file. Pass the
     frontMatterValues when creating the new file. */
  fs.appendFile(
    `./src/pages/${demoToExampleConfig[PRODUCT][folder].examplePath}/examples/${
      mdFileName.split('-activity')[0]
    }.md`,
    createMarkdownContent(activityName, frontMatterValues, folder, mdFileName),
    err => {
      if (err) throw err;
      console.log(`Created md file for ${activityName}`);
    }
  );
}

/*************
 * VALIDATION *
 **************/

/* If you are running this for a single activity, check to make sure inputs are valid
   before creating any files. */

if (FOLDER) {
  /* If a second argument exists, a third must also exist. */
  if (FOLDER && !ACTIVITY) {
    throw new Error(
      `❌ You must include both a folder name and an activity name.`
    );
  }
  /* The name of the folder must be identifcal to a folder in the submodule
     for the specified product. */
  if (FOLDER && Object.keys(demoToExampleConfig[PRODUCT]).indexOf(FOLDER) < 0) {
    throw new Error(
      `❌ Invalid folder name: ${FOLDER}. Use one of the following: ${Object.keys(
        demoToExampleConfig[PRODUCT]
      )}.`
    );
  }
  /* The name of the activity must be identifcal to a file in the specified folder. */
  if (
    ACTIVITY &&
    fs.readdirSync(`${submoduleFolder[PRODUCT]}${FOLDER}`).indexOf(ACTIVITY) < 0
  ) {
    throw new Error(
      `❌ Invalid activity name: ${ACTIVITY}. Use one of the following: ${fs.readdirSync(
        `${submoduleFolder[PRODUCT]}${FOLDER}`
      )}.`
    );
  }
}

/******************
 * WRITE THE FILES *
 *******************/

/* If a second argument is not passed, check for all activities in 
   the `examples/{product}` folder that are not currently used in an
   example, and create example assets for each. */
if (!FOLDER && !ACTIVITY && PRODUCT) {
  const allExampleJsFiles = fs.readdirSync(exampleJsFile).map(file => {
    return file.split('.')[0];
  });
  fs.readdir(submoduleFolder[PRODUCT], (err, subfolders) => {
    subfolders.forEach(subFolder => {
      let subfoldersPath;
      if (subFolder.indexOf('.') < 0) {
        subfoldersPath = submoduleFolder[PRODUCT] + subFolder;
        fs.readdir(subfoldersPath, (err, files) => {
          files.forEach(file => {
            const activityName = file.split('.')[0];
            const fileType = file.split('.')[1];
            const mdFileName = activityName
              .replace(/(^[A-Z])/g, g => g[0].toLowerCase())
              .replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
            if (
              allExampleJsFiles.indexOf(activityName) < 0 &&
              fileType === 'java'
            ) {
              createExampleAssets(subFolder, activityName, mdFileName);
            }
          });
        });
      }
    });
  });
  /* If a second argument is passed, only create example assets
   for that activity. */
} else if (FOLDER && ACTIVITY && PRODUCT) {
  const mdFileName = ACTIVITY.replace(/(^[A-Z])/g, g =>
    g[0].toLowerCase()
  ).replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
  createExampleAssets(FOLDER, ACTIVITY_NAME, mdFileName);
}
