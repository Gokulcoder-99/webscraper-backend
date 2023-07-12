const asyncHandler = require("express-async-handler");
const axios = require('axios')
const cheerio = require("cheerio");
const productvalue = require('./model');
  const product =  {
      Image :"",
      Name :"",
      Rating :"",
      Price :"",
      Link:""
      };


  
 const scrape =asyncHandler( async(url)=> {
  
    const regexa = /amazon/i;
    const regexf = /flipkart/i;
    const regexs = /snapdeal/i;
    const isAmazonLink = regexa.test(url);
    const isFlipkartLink=regexf.test(url);
    const isSnapdealLink = regexs.test(url);
// Amzazon Product fetch
      if(isAmazonLink){  
          //Fetch the data
          const { data } = await axios.get(url);
          //Load up the html
          const $ = cheerio.load(data);
          const item = $("div#dp-container");
          //Extract the data that we need
          const imageTag = $(item).find("img#landingImage");
          if (imageTag.length > 0) {
          const src = imageTag.attr('src');
          product.Image= src
          }
          product.Name = $(item).find("h1 span#productTitle").text().trim();
          product.Rating= $(item).find("span .a-icon-alt").first().text();
          product.Link = url;
          const price = $(item)
              .find("span .a-price-whole")
              .first()
              .text()
              .replace(/[,.]/g, "");
          const priceNum = parseInt(price);
          product.Price = priceNum;
      }
// Flipkart Product fetch
      if(isFlipkartLink){
         //Fetch the data
         const { data } = await axios.get(url);
         //Load up the html
         const $ = cheerio.load(data)
         //Extract the data that we need
         const imageTag = $("div.CXW8mj._3nMexc > img");
         if (imageTag.length > 0) {
         const src = imageTag.attr('src');
         product.Image= src
         }
         product.Name = $("h1.yhB1nd > span.B_NuCI").text().trim();
         product.Rating= $("span._1lRcqv > div._3LWZlK").first().text();
         product.Link = url;
         const price = $("div.CEmiEU > div > div._30jeq3._16Jk6d")
             .first()
             .text()
             .replace(/[,.₹]/g, "");
             
         const priceNum = parseInt(price);
         product.Price = priceNum;
      }
// Snapdeal Product fetch
if(isSnapdealLink){
  //Fetch the data
  const { data } = await axios.get(url);
  //Load up the html
  const $ = cheerio.load(data)
  //Extract the data that we need
  const imageTag = $("#bx-slider-left-image-panel > li:nth-child(1) > img");
  if (imageTag.length > 0) {
  const src = imageTag.attr('src');
  product.Image= src
  }
  product.Name = $("div.row > div.col-xs-22 > h1").text().trim();
  product.Rating= $("div.pdp-e-i-ratings > div > span.avrg-rating").first().text().replace(/[()]/g, "");
  product.Link = url;
  const price = $(" div.pdp-e-i-PAY-r.disp-table-cell.lfloat > span.pdp-final-price > span")
      .first()
      .text()
      .replace(/[,.₹]/g, "");
    
  const priceNum = parseInt(price);
  product.Price = priceNum;
}
    //console.log(product)
      const{Image,Name,Rating,Price,Link}=  product ;
      const productFound = await productvalue.findOne({Name});
      if(!productFound){
      const Product = await productvalue.create({
        Image,
        Name,
        Rating,
        Price,
        Link,   
      });
    }
    if(productFound){
      productFound.Price = Price;
      await productFound.save()
    } 
 } )

  module.exports=scrape;
