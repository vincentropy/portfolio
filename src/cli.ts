import * as fs from 'fs';
const mdPath = './public/content/';
console.log('reading md files from: ' + mdPath);

const files = fs.readdirSync(mdPath).filter((value) => value.endsWith('.md'));
console.log('found: ' + files.join(', '));
const outputData: Record<string, any> = {};
outputData['pages'] = files.map((value) => ({ filename: value }));

const outString = JSON.stringify(outputData);

fs.writeFileSync('./public/content_index.json', outString);
