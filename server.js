const express = require('express');
const app = express();
const cors = require('cors')
const connectDb = require("./config");
const env = require('dotenv');
const scrape = require('./scrape')
const route = require('./routes')
connectDb();
env.config();
app.use(cors({
    origin:"*"
}))
app.use(express.json());
const urls = [
    "https://www.amazon.in/Apple-iPhone-128GB-Deep-Purple/dp/B0BDJH6GL8/ref=sr_1_4?crid=1QXO5DCTSFZL&keywords=iphone+14+pro+max&qid=1688785380&sprefix=iphone+14+pro+%2Caps%2C238&sr=8-4",
    "https://www.amazon.in/Apple-iPhone-Pro-128GB-Gold/dp/B0BDJBGBF3/ref=sr_1_5?crid=14MTW4LKX9GC7&keywords=iphone+14+pro&qid=1688785362&sprefix=iphone+14+%2Caps%2C239&sr=8-5",
   "https://www.flipkart.com/apple-iphone-14-pro-max-deep-purple-128-gb/p/itm5256789ae40c7?pid=MOBGHWFHCWHXRZZJ&lid=LSTMOBGHWFHCWHXRZZJ9EECH5&marketplace=FLIPKART&q=iphone+14+pro+max&store=tyy%2F4io&srno=s_1_1&otracker=AS_QueryStore_OrganicAutoSuggest_2_13_na_na_ps&otracker1=AS_QueryStore_OrganicAutoSuggest_2_13_na_na_ps&fm=search-autosuggest&iid=4e9d80d9-4e65-4821-ba88-8b86b5d8ac32.MOBGHWFHCWHXRZZJ.SEARCH&ppt=sp&ppn=sp&ssid=enfg7n7eds0000001688785295041&qH=37e37d60a349d989",
   "https://www.flipkart.com/apple-iphone-14-pro-space-black-128-gb/p/itm6e6711f2982c8?pid=MOBGHWFHZBHSYBBW&lid=LSTMOBGHWFHZBHSYBBWZRMCHS&marketplace=FLIPKART&q=iphone+14+pro&store=tyy%2F4io&srno=s_1_1&otracker=AS_QueryStore_OrganicAutoSuggest_1_2_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_2_na_na_na&fm=organic&iid=58f3a5fe-de4e-4e43-b31c-e7fe75a2365e.MOBGHWFHZBHSYBBW.SEARCH&ppt=browse&ppn=browse&ssid=t7c3iebz5c0000001688785269254&qH=73a41d19c3188cc2",
   "https://www.snapdeal.com/product/mivi-bs5pltq-bluetooth-speaker-turquoise/6341068929463814583#bcrumbLabelId:46102537",
   "https://www.amazon.in/Mivi-Bluetooth-Playtime-Exceptional-Mic-Black/dp/B094RCC4L1/ref=sr_1_1?crid=10HEDTFBVD218&keywords=mivi+speaker&qid=1688832995&sprefix=mivi+%2Caps%2C390&sr=8-1",
   "https://www.flipkart.com/mivi-play-5-w-portable-bluetooth-speaker/p/itm9dcdfcd2431db?pid=ACCG25T3Z4CHBUAP&lid=LSTACCG25T3Z4CHBUAPT90YZB&marketplace=FLIPKART&q=muvi+speaker&store=search.flipkart.com&srno=s_1_2&otracker=search&otracker1=search&fm=Search&iid=en_Knjbw50jh0u9joPJ6iASqrdKFvWh56aeHSxTlwQLDH_EELQSaYUC3YnFeFSOlFylsQt-Tvp16LD7exg0P6io-w%3D%3D&ppt=sp&ppn=sp&ssid=65eotoezeo0000001688832964079&qH=73eea33793b6c24a",
   "https://www.snapdeal.com/product/boat-stone-650-raging-red/5764608174029762839#bcrumbLabelId:46102537",
   "https://www.amazon.in/Stone-650-Wireless-Bluetooth-Speaker/dp/B07NBWT3Z2/ref=sr_1_2?crid=IAUI3FQQN2U8&keywords=boat+stone+650+10w+wireless+speaker&qid=1688833204&sprefix=mivi+speake%2Caps%2C450&sr=8-2",
   "https://www.flipkart.com/boat-stone-650-10-w-bluetooth-speaker/p/itmfdcanh2mzugbq?pid=ACCFDBHAUAH3ZAVB&lid=LSTACCFDBHAUAH3ZAVBNB2ZJI&marketplace=FLIPKART&q=boat+stone+1500+100w+bluetooth+speaker&store=0pm%2F0o7&srno=s_1_27&otracker=AS_QueryStore_OrganicAutoSuggest_2_35_na_pm_na&otracker1=AS_QueryStore_OrganicAutoSuggest_2_35_na_pm_na&fm=search-autosuggest&iid=8a1c3519-89b5-4fb2-bd86-d63fb6c01023.ACCFDBHAUAH3ZAVB.SEARCH&ppt=sp&ppn=sp&ssid=sfcgq0841c0000001688833162368&qH=0d255d1db78aa156",
   "https://www.snapdeal.com/product/boat-rockerz-235-v2-neckband/640865907744#bcrumbLabelId:46102452",
   "https://www.flipkart.com/boat-rockerz-235v2-238-asap-charge-upto-8-hours-playback-bluetooth-headset/p/itme2dcecb00587a?pid=ACCFZGAQJGYCYDCM&lid=LSTACCFZGAQJGYCYDCM2ZL3UG&marketplace=FLIPKART&q=boat-rockerz-235&store=0pm%2Ffcn&srno=s_1_4&otracker=search&otracker1=search&fm=Search&iid=b5111ede-1723-40a2-b339-4d68995d071f.ACCFZGAQJGYCYDCM.SEARCH&ppt=sp&ppn=sp&ssid=z87p8h8xv40000001688833391922&qH=dd02d8b31b3d351e",
   "https://www.amazon.in/boAt-Rockerz-245v2-Bluetooth-Resistance/dp/B097DTJRWZ/ref=sr_1_3?crid=242DNLP4HO951&keywords=boat+rockerz+235v2+bluetooth+headset&qid=1688833490&sprefix=boat+rockerz+235v2+bluetooth+headset%2Caps%2C830&sr=8-3",
   "https://www.snapdeal.com/product/boat-airdopes-381-on-ear/634621916769",
   "https://www.flipkart.com/boat-airdopes-381-sunburn-upto-20-hours-playback-asap-charge-bluetooth-headset/p/itm664f528593555?pid=ACCGC3JC25PMCFH5&lid=LSTACCGC3JC25PMCFH52ZNCMO&marketplace=FLIPKART&q=boat+airdopes+381&store=0pm%2Ffcn%2F821%2Fa7x%2F2si&srno=s_1_4&otracker=AS_QueryStore_OrganicAutoSuggest_1_16_sc_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_16_sc_na_na&fm=search-autosuggest&iid=1106ce2f-c7c5-4cd9-8403-4f2f03f036fd.ACCGC3JC25PMCFH5.SEARCH&ppt=sp&ppn=sp&ssid=j1bu6mka4w0000001688833659633&qH=c2c28b44d0eb0dcf",
   "https://www.amazon.in/Renewed-Airdopes-Bluetooth-Wireless-Earbuds/dp/B09KVBPGNR/ref=sr_1_3?crid=15X2LK3YBQ5F3&keywords=boat+airdopes+381&qid=1688833720&sprefix=boat+airdopes+381%2Caps%2C292&sr=8-3",
   "https://www.snapdeal.com/product/boult-audio-probass-thunder-over/636984976207#bcrumbLabelId:46102452",
   "https://www.flipkart.com/boult-audio-thunder-protein-lether-padding-adjustable-headband-40mm-drivers-boomx-bluetooth-headset/p/itm48d9e161831f9?pid=ACCFRY83ZWHDVK3M&lid=LSTACCFRY83ZWHDVK3MXQ4O2T&marketplace=FLIPKART&q=Boult+Audio+ProBass+Thunder+Over-Ear+Wireless+Bluetooth+Headphones&store=0pm%2Ffcn&srno=s_1_3&otracker=search&otracker1=search&fm=Search&iid=8784b6ec-cc4a-44f2-aee7-f916788a146c.ACCFRY83ZWHDVK3M.SEARCH&ppt=sp&ppn=sp&ssid=byzgnuk1ps0000001688833839164&qH=8160013bf7e5ac85",
   "https://www.amazon.in/Boult-Audio-Bluetooth-Headphones-Cancellation/dp/B088YKSNTX/ref=sr_1_3?crid=39PZOPBC4M9SG&keywords=Boult+Audio+ProBass+Thunder+Over-Ear+Wireless+Bluetooth+Headphones&qid=1688833853&sprefix=boat+airdop%2Caps%2C1460&sr=8-3",
   "https://www.flipkart.com/zebronics-zeb-buddy-500-speaker-wired-mic-tws-rgb-lights-usb-msd-aux-fm-25-w-bluetooth-party/p/itm52b3a33c4f4dd?pid=ACCGEFQ9GUCJGMAM&lid=LSTACCGEFQ9GUCJGMAMSODKMM&marketplace=FLIPKART&q=zebronics+zeb+buddy+500&store=0pm&srno=s_1_1&otracker=search&otracker1=search&fm=Search&iid=9ac9e2d2-3581-4666-8b6e-6168d1909357.ACCGEFQ9GUCJGMAM.SEARCH&ppt=sp&ppn=sp&ssid=51pvxpy2ww0000001688834362291&qH=a7affaacde36ae28",
   "https://www.amazon.in/ZEBRONICS-Zeb-Buddy-500-Portable-Rechargeable/dp/B09SLXCTDV/ref=sr_1_2?crid=13JKZIDWP4SGN&keywords=Zebronics+Zeb-Buddy+500&qid=1688834389&sprefix=boult+audio+probass+thunder+over-ear+wireless+bluetooth+headphoneszebronics+zeb-buddy+500+compone%2Caps%2C4625&sr=8-2",
   "https://www.flipkart.com/zebronics-zeb-buddy-100-15-w-bluetooth-party-speaker/p/itma8eaa6333c29d?pid=ACCG9ZWGMY7RM5XV&lid=LSTACCG9ZWGMY7RM5XVDFDRB2&marketplace=FLIPKART&q=zebronics+zeb+buddy+100&store=0pm&srno=s_1_3&otracker=AS_Query_OrganicAutoSuggest_1_21_na_na_ps&otracker1=AS_Query_OrganicAutoSuggest_1_21_na_na_ps&fm=search-autosuggest&iid=d33fb2c4-2721-4d7a-90b2-5fcd92806734.ACCG9ZWGMY7RM5XV.SEARCH&ppt=sp&ppn=sp&ssid=vc3czfsurk0000001688834548586&qH=accf70dda8e30699",
   "https://www.amazon.in/ZEBRONICS-Zeb-Buddy-100-Portable-Rechargeable/dp/B09P53B3M5/ref=sr_1_3?crid=13JKZIDWP4SGN&keywords=Zebronics+Zeb-Buddy+500&qid=1688834389&sprefix=boult+audio+probass+thunder+over-ear+wireless+bluetooth+headphoneszebronics+zeb-buddy+500+compone%2Caps%2C4625&sr=8-3",
   "https://www.flipkart.com/zebronics-zeb-bt2750-ruf-60-w-bluetooth-home-theatre/p/itm737470cac566a?pid=ACCFV5XFAZMG3WFV&lid=LSTACCFV5XFAZMG3WFV3HOG9C&marketplace=FLIPKART&q=zebronics+2.1+home+theatre&store=0pm%2F0o7&srno=s_1_7&otracker=AS_QueryStore_OrganicAutoSuggest_1_53_na_pm_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_53_na_pm_na&fm=search-autosuggest&iid=f074c96b-b71c-4dc6-8995-32a4acd759f4.ACCFV5XFAZMG3WFV.SEARCH&ppt=sp&ppn=sp&ssid=rffcjswikg0000001688835043273&qH=829cb730f49cf903",
   "https://www.amazon.in/Zebronics-Zeb-BT2750RUF-Multimedia-Bluetooth-connectivity/dp/B07S9QLSW4/ref=sr_1_10?crid=13JKZIDWP4SGN&keywords=Zebronics+Zeb-Buddy+500&qid=1688834389&sprefix=boult+audio+probass+thunder+over-ear+wireless+bluetooth+headphoneszebronics+zeb-buddy+500+compone%2Caps%2C4625&sr=8-10"
];
    
    for (const url of urls) {
      scrape(url);
    }
    
    // Set interval to scrape and update every 3 minutes
    setInterval(() => {
      for (const url of urls) {
        scrape(url);
      }
    }, 1000 * 60 * 3);

app.use("/api",route)

app.listen(process.env.PORT,()=>{
    console.log(`server is listening ${process.env.PORT}`)
})