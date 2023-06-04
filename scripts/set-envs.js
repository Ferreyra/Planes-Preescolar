const { writeFileSync, mkdirSync } = require('fs');
require('dotenv').config();

const targetPath = './src/environments/envirionment.ts';
const envFileContent = `
export const environment = {
   clientId: "${ process.env['CLIENT_ID']}",
};
`;

mkdirSync('./src/environments', { recursive: true });
writeFileSync( targetPath, envFileContent );