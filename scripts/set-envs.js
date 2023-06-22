const { writeFileSync, mkdirSync } = require('fs');
require('dotenv').config();

const targetPath = './src/environments/environment.ts';
const objectConfig = JSON.parse(process.env['FIREBASE_CONFIG'])
const envFileContent = `
export const environment = {
   clientId: "${ process.env['CLIENT_ID'] }",
   firebaseConfig: {
      apiKey: "${ objectConfig.apiKey }",
      authDomain: "${ objectConfig.authDomain }",
      projectId: "${ objectConfig.projectId }",
      storageBucket: "${ objectConfig.storageBucket }",
      messagingSenderId: "${ objectConfig.messagingSenderId }",
      appId: "${ objectConfig.appId }"
   },
};
`;

mkdirSync('./src/environments', { recursive: true });
writeFileSync( targetPath, envFileContent );