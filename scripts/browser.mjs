import {existsSync} from 'node:fs';
import {chromium} from 'playwright-core';

export const baseURL=process.env.SITE_TEST_URL||'http://localhost:3000';
export function launchBrowser(){
 const executablePath=process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE||[
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
 ].find(path=>existsSync(path));
 return chromium.launch({executablePath,headless:true});
}
