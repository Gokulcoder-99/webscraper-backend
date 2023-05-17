const asyncHandler = require("express-async-handler");
const axios = require('axios')
const cheerio = require("cheerio");
const productvalue = require('./model');
const createProduct = asyncHandler(async (req, res) => {


    
  const product =  {
      Image :"",
      Name :"",
      Rating :"",
      Price :"",
      Link:""
      };
  
  //Set interval
  const handle = setInterval(scrape, 42300000);
  
  async function scrape() {
    const {url} = req.body
    console.log(url)
  
    const regex = /amazon/i;
    const isAmazonLink = regex.test(url);
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
          console.log(product)
          const{Image,Name,Rating,Price,Link}=  product ;
          const Product = await productvalue.create({
            Image,
            Name,
            Rating,
            Price,
            Link,   
          });
         
          res.status(201).json(Product);
      }else{
          console.log("Not a valid link")
      }
  } 
  scrape()


  });


module.exports = createProduct