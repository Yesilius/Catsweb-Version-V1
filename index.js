import express from "express"
import puppeteer from "puppeteer-core";
import { createCursor } from "ghost-cursor";

import fs from "node:fs/promises";

const app = express()
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString("en-US", {
  day: "2-digit",
  month: "numeric",
  year: "numeric",
});
let cookiesFromBrowser = "";
console.log(`Today's date is ${formattedDate}`);


let username = "320204478"
let caseNumber = "0123171144"



async function createCase(page, cursor) {
  try {
    await page.goto(
      "https://spectranetics.myassurx.com/assurx/main.aspx?WCI=Main&WCE=LogCA&WCU=u%3dCategory%3dComplaint%7c*%7es%3d8H7KZDZ83B4GRHDN1MEM51IKGPWNW008017"
    );
    const date1 = await page.waitForSelector("#CTRLDate2");
    const date2 = await page.waitForSelector("#CTRLDate3");
    const date3 = await page.waitForSelector("#CTRLStandardDate004");

    await date1.type(`${formattedDate}`);
    await date2.type(`${formattedDate}`);
    await date3.type(`${formattedDate}`);
    await cursor.click("#TDCAPStandardDate004");
    await page.waitForNavigation();
    await page.waitForSelector("#CTRLStandardText044");

    await cursor.click("#CTRLStandardText044");
    await page.select("#CTRLStandardText044", "System");
    await page.waitForSelector("#CTRLShortText2");
    await page.select("#CTRLShortText2", "System");
    await page.waitForSelector("#CTRLStandardText023");
    await page.select("#CTRLStandardText023", "Volcano Europe");

    await page.waitForSelector("#CTRLStandardText037");
    await cursor.click("#CTRLStandardText037");
    await page.type("#CTRLStandardText037", "Lukasz Patorski");
    await cursor.click("#CTRLStandardText037");
    await page.type("#CTRLStandardText038", "+32 48 56 137");
    await cursor.click("#CTRLStandardText063");
    await page.type("#CTRLStandardText063", "lukaz@email.com");
    await page.select("#CTRLStandardText048", "Phone");
    await page.waitForNavigation();
    await page.select("#CTRLStandardText002", "No");
    await page.waitForNavigation({ waitUntil: "networkidle0" });

    await page.select(
      "#CTRLStandardText041",
      "System is repairable in the field"
    );

    await page.waitForNavigation({ waitUntil: "networkidle0" });

    await page.select("#CTRLStandardText013", "N/A - No Patient Involvement");
    await page.waitForNavigation({ waitUntil: "networkidle0" });
    await page.select("#CTRLStandardText064", "Rancho Cordova");
    await page.select("#CTRLStandardText003", "N/A");
    await page.waitForSelector("#CTRLText3");
    await page.select("#CTRLText3", "No");
    await page.waitForSelector("#CTRLStandardText052");
    await page.select("#CTRLStandardText052", "ServiceMax");
    await page.waitForSelector("#CTRLStandardText012");
    await page.select("#CTRLStandardText012", "No");
    await page.type("#CTRLStandardText034", "unknown");
    await page.type("#CTRLStandardText010", "n/a");
    await page.type("#CTRLStandardText059", "n/a");
    await page.type("#CTRLStandardText036", "n/a");
    await page.select("#CTRLStandardText022", "N/A - No Patient Involvement");
    await page.select("#CTRLStandardText057", "No");
    await page.select("#CTRLStandardText047", "No");

    await page.select(
      "#CTRLStandardText046",
      "Prior to procedure (no patient present/ during PM)"
    );
    await page.waitForSelector("#CTRLStandardText018");
    await page.select("#CTRLStandardText018", "SFDC");
    await page.waitForSelector("#CTRLStandardText068");
    await page.type("#CTRLStandardText068", "SFDC");

    await page.waitForSelector("#CTRLStandardText018");
    await cursor.click("#CTRLRELOAD");
    await page.waitForSelector("#CTRLStandardText051");
    const checkElement = await page.$$("#CTRLStandardText051").value;

    if (checkElement === undefined) {
      await page.waitForSelector("#CTRLStandardText018");
      await page.select("#CTRLStandardText018", "New Contact");
    }
  } catch (error) {
    console.log(error);
  }
}
app.get('/', async (req, res)=>{
  
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
      executablePath: 'C:/Users/320204478/AppData/Local/Google/Chrome/Application/chrome.exe'
    });
    const page = await browser.newPage();
    const cursor = createCursor(page);
  
   //ServiceMax START
    // LOGIN
  
    await page.goto("https://philipsb2bsc.my.salesforce.com/console")
    await page.waitForSelector("#i0116")
    await page.type("#i0116", "yesayi.suprikyan@philips.com")
    await page.click("#idSIButton9")
  
    await Promise.all([
      page.waitForSelector("#i0118"),
    page.type("#i0118", "Amazon03!!")
    ]).then( ()=> console.log("Success"))
   await cursor.click("#idSIButton9")
  
  
   
  page.waitForNavigation().then(async ()=>{
    const searchCase = await page.waitForSelector("#phSearchInput")
  await searchCase.type(caseNumber)
  
    await searchCase.press("Enter")
    console.log("Enter")
    
  
    
    
  
  }).catch((e)=> console.log(e)).finally(async()=>{
    
    console.log("Search completed.")
    try {
      await page.waitForNavigation()
      const element = await page.$$eval('a', (el)=> el.value === "0123171144" ? el : ()=> {throw new Error("Unable to find case, Check case number.")})
      await element.click()
    } catch (error) {
      console.log(error)
    }
  })
   
    
  
  
  
   //ServiceMax END
  
    
    // await page.goto(
    //   "https://spectranetics.myassurx.com/assurx/main.aspx?WCI=Main&WCE=ViewDashboard&WCU=s%3dDEX3426JOUCNM035YCOI3ZS0YV6KK7R4017%7c*%7er%3dVOLC%20Home%20Page%7c*%7eq%3d1"
    // );
  
    // if (cookiesFromBrowser.length > 0)
    //   await page.setCookie(...cookiesFromBrowser);
    // else {
    //   await page.waitForSelector("#CTRLCompany");
  
    //   await cursor.click("#CTRLCompany");
    //   await page.type("#CTRLCompany", "Spectranetics");
    //   await cursor.click("#CTRLemployeeid");
    //   await page.type("#CTRLemployeeid", "320204478");
    //   const element = await page.waitForSelector("#CTRLPasswordPrompt");
  
    //   await element.type("Deeznuts4!");
    //   const btnSubmit = await page.waitForSelector("button");
    //   await btnSubmit.click();
    // }
  
    // await page.waitForSelector("#TDWinButtonsRowTopComplaintVOLCFolderHomePage");
  
    // createCase(page, cursor);
    // await page.goto(
    //   "main.aspx?WCI=Main&WCE=DrillDown&WCU=r%3dComplaint%20VOLC%20Folder%20Home%20Page%7c*%7ep%3dDisplay%20Parts%7c*%7ef%3dDisplay%20Part%20%2D%20Virtual%20Folders%7c*%7eq%3dLongText004%7c*%7ea%3dVOLC%20Home%20Page%7c*%7eb%3d1%7c*%7eo%3dAdminSubcomponent%7c*%7es%3dIV13YJ79SY3ERRQUINT7MLZQTM6NBWN4017"
    // );
    // await page.goto(
    //   "https://spectranetics.myassurx.com/assurx/main.aspx?WCI=Main&WCE=ViewDashboard&WCU=s%3d4UK98Z7TRWJPV8ON0SUN8PTO5XQ1EVLL017%7c*%7er%3dVOLC%20Home%20Page%7c*%7eq%3d1", {delay: 35}
    // );
    // await page.type(".k_my-input", "Yerevan", { delay: 500 });
    // await cursor.click(".JyN0-name-container");
    // await page.type("[data-test-destination]", "Brussel");
    // const element = await page.waitForSelector('[aria-label="Brussel, België"]');
    // await cursor.click(element);
    // await page.goto(
    //   "https://www.momondo.be/flight-search/BRU-EVN/2024-01-10/2024-01-24?sort=bestflight_a"
    // );
    // const button = await page.waitForSelector(".oVHK");
    // await cursor.click(button);
    // await page.waitForSelector(".OQa--right-container").innerText;
    //   await browser.close();
  ;
})





app.listen(process.env.PORT || 3000, ()=>{
  console.log("Backend stared...")
})