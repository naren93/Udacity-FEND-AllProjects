# Website Performance Optimization portfolio project

## Project Objective -
The main goal of this project is to familiarise with the optimization techniques web developers use to make their webpages load in a smooth manner. Usage of PSI from google as a benchmark evaluate the places optimizations is necessary. In order to make use of PSI (Pagespeed Insights) we need to know how to use ngrok so that we can hook our local hosted web page to the internet. Another issue that is addressed was the slow screen scroll speed and changing pizza (for pizza.html and related files alone) size function.

## Steps used for optimization -

### Pre-requisites -
Make sure we have the following framework/programs installed in our system.
- Python -> For running our site on the local machine
- Ngrok -> For hosting our page to internet so that we can have the benchmarking done.
- NodeJs -> For making best use of node package manager
- Gulp -> For minification of html, js and css files along with image optimization.

### Getting used to Pagespeed Insight -
- Python installation and setting up port and local host (“python -m http.server 8080”) => Result found in http://localhost:8080/
- Using [Ngrok](https://ngrok.com/) to create a server and host local host on to the web
- Check the page speed insight score from [link](https://developers.google.com/speed/pagespeed/insights/)

### Optimization Part 1 -
- Used gulp to
	* Minify html
	* Minify javascript
	* Minify css
	* Compress image files
- Placed scripts before ending of the body tag so that javascript does not block the page loading.
- The way of loading of the stylesheets were changed and performed via use of [script](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery) code.
- Changed the image of pizza to a thumbnail image for faster loading of page.
- Use [Web Font Loader](https://github.com/typekit/webfontloader) to load the [Google web fonts](https://fonts.google.com/) asynchronously;

### Optimization Part 2 - Pizza fps -
- Changed `querySelector()` to `getElementById()`
- Changed `querySelectorAll` to `getElementsByClassName()`
- The number of background pizzas should be reduced to at least 24, a multiple of the current cols value.
- declare the pizzasDiv variable outside the loop, so only DOM call is made one.
- The `resizePizzas` function was changed to avoid requering the DOM elements and the new width calculation was moved to outside the loop
- Move `var pizzasDiv = document.getElementById("randomPizzas");` out of the for loop so the loop only makes one DOM call
- Make sure that the pizzas frame rate is more that 60 fps and the time to resize pizzas is less than 5 ms using the pizza size slider
