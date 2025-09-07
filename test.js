import { Browser, Builder, By, Key } from 'selenium-webdriver';
import { expect } from 'chai';

const color=["Red","Blue","Black","Green"];
const selectedProduct="Nike air zoom pegasus 35";

function getRandomNumber(min,max){
   return Math.floor(Math.random()*(max-min)+min);
}

async function test(){
  const driver=await new Builder().forBrowser(Browser.CHROME).build();
  await driver.manage().window().maximize();
  await driver.get('https://demo.evershop.io/');
  
  await driver.findElement(By.className("search-icon")).click();
  await driver.findElement(By.xpath("//input[@placeholder='Search']")).sendKeys("Nike Air");
  await driver.findElement(By.xpath("//input[@placeholder='Search']")).sendKeys(Key.ENTER);
  await driver.findElement(By.xpath("(//a[contains(@href,'nike-air-zoom-pegasus-35')])[2]")).click();
  await driver.findElement(By.xpath("//a[text()='M']")).click();
  await driver.sleep(2000);
  const getRandomData=getRandomNumber(1,4);
  await driver.findElement(By.xpath(`//a[text()='${color[getRandomData]}']`)).click();
  await driver.sleep(2000);
  await driver.findElement(By.name("qty")).clear();
  await driver.findElement(By.name("qty")).sendKeys(2);
  await driver.findElement(By.xpath("//span[contains(text(),'ADD TO CART')]")).click();
  const viewCart="//a[contains(text(),'VIEW CART')]";

  await driver.sleep(2000);
  await driver.findElement(By.xpath(viewCart)).click();

  const actualProduct=await driver.findElement(By.xpath("//a[contains(@href,'nike-air')]")).getText();
  expect(selectedProduct).to.eql(actualProduct);

  await driver.quit();
}
test()
