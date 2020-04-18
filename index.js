addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 * @param {string} name of the cookie to grab
 */

//Class to handle the webpage title
class th {
  element(e)
  {
    e.prepend("Raikan10's ");
  }
}
//Class to handle description
class des {
  element(e) {
    e.setInnerContent("If you guys are reading this, thank you from the bottom of my heart! You guys are awesome!");
  }
}
//class to handle the link
class link {
  element(e) {
    e.setInnerContent("Add me on LinkedIn");
    e.setAttribute("href", "https://www.linkedin.com/in/ajay-rajnikanth/");
  }
}

async function handleRequest(request) {
  const url = "https://cfw-takehome.developers.workers.dev/api/variants";
  var urls = await fetch(url)
    .then((response) => {
      return response.json();
    });
  
  let cookieString = request.headers.get('Cookie');
  const cookie = (cookieString)?cookieString[cookieString.length -1]:null;
  urls = urls.variants;
  var which = (cookie == null)?Math.floor(Math.random() * 2):cookie;
  console.log(which);
  var response = await fetch(urls[which]);

  //Rewriting HTML template
  const hr = new HTMLRewriter()
    .on('title', new th())
    .on('h1#title', new th())
    .on('p#description', new des())
    .on('a#url', new link());

  response = new Response(response.body, response)
  if(cookie==null)response.headers.set('Set-Cookie', 'which='+which);

  return hr.transform(response);
  
}
