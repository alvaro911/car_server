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

function reg(str) {
  return str.replace(/[()]/g, '').trim();
}

function removeQr(str) {
  return str.replace(/QR Code Link to This Post/gi, '').trim();
}

//create that invokes getlinks and then async to map through and start my object asynchronously

function carBuilderInfo(html){
  const page = {}
  const $ = cheerio.load(html)
  const title = $('#titconstextonly')
  const postingInfo = $('.postinginfos .postinginfo:nth-child(1)')
  const tempText = postingInfo.text()
  const postingInfoText = tempText.split('').splice(9 ,(tempText.length)-9).join('')
  const titleText = title.text()
  const price = $('.price')
  const priceText = price.text()
  const city = $('.postingtitconstext small')
  const cityText = city.text()
  const img = $('.swipe-wrap img')
  const model = $('.attrgroup span:nth-child(1)').text().split(' ')
  const link = $('.print-qrcode').data('location')
  const paragraph = $('#postingbody').not('.print-information p').remove().text()

  page._id = postingInfoText
  page.city = reg(cityText)
  page.title = titleText
  page.price = priceText
  page.img = img['0'] && img['0'].attribs.src
  page.model = model[1]
  page.link = link
  page.paragraph = removeQr(paragraph)
  return page
}

module.exports = {getLinks, carBuilderInfo}
