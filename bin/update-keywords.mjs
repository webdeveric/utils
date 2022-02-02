#!/usr/bin/env node
import {
  dirname,
  extname,
  resolve,
} from 'path';
import {
  readdir,
  readFile,
  writeFile,
} from 'fs/promises';
import { URL } from 'url';

const rootDir = resolve(new URL(dirname(import.meta.url)).pathname, '..');
const srcDir = resolve(rootDir, 'src');
const packageFile = resolve(rootDir, 'package.json');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function getFileNames(dirPath) {
  const filenames = [];

  try {
    const entries = await readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        filenames.push(...await getFileNames(resolve(dirPath, entry.name)));
      } else if (entry.isFile()) {
        filenames.push(entry.name);
      }
    }
  } catch (err) {
    console.error(err);
  }

  return filenames;
}

const byLocale = (a, b) => a.localeCompare(b);

const files = (await getFileNames(srcDir))
  .map(file => file.replace(new RegExp(`${extname(file)}$`), ''))
  .filter(file => file !== 'index')
  .sort(byLocale);

const packageData = JSON.parse(await readFile(
  packageFile,
  { encoding: 'utf8' },
));

const uniqueKeywords = new Set(packageData.keywords);

files.forEach(item => uniqueKeywords.delete(item));

const keywords = [ ...uniqueKeywords ].sort(byLocale);

packageData.keywords = [
  ...keywords,
  ...files,
];

await writeFile(packageFile, JSON.stringify(packageData, null, 2) + '\n');
