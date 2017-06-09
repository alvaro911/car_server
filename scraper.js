const cheerio = require('cheerio')

function getLinks(html, city){
  const url = `https://${city}.craigslist.org`
  const $ = cheerio.load(html)
  let carsLink = $('.result-row a');
  const hrefs = Array.from(carsLink).map((link, i) => {
    return link.attribs.href.indexOf('.html') > -1 && link.attribs.href.startsWith('/cto') ? `${url}${link.attribs.href}` : null;
  }).filter(item => !!item).filter((item, pos, self) => {
    return self.indexOf(item) == pos
  })
  return hrefs
}


//create that invokes getlinks and then async to map through and start my object asynchronously

function carBuilderInfo(html){
  let page={}
  let $ = cheerio.load(html)
  let title=$('#titletextonly')
  let postingInfo  = $('.postinginfos .postinginfo:nth-child(1)')
  let tempText = postingInfo.text()
  let postingInfoText = tempText.split('').splice(9 ,(tempText.length)-9).join('')
  let titleText = title.text()
  let price=$('.price')
  let priceText=price.text()
  let city=$('.postingtitletext small')
  let cityText=city.text()
  let img=$('.swipe-wrap img')
  page._id=postingInfoText
  page.city=cityText
  page.title=titleText
  page.price=priceText
  page.img=img['0'] && img['0'].attribs.src
  return page
}

module.exports = {getLinks, carBuilderInfo}
