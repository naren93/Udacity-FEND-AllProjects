/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         //run for loop through RSS urls to check if defined
         it('have defined urls', function() {
            for(var i in allFeeds) {
            expect(allFeeds[i].url).toBeDefined();
            expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         //run for loop through RSS names to check if defined
         it('have defined names', function() {
            for(var i in allFeeds) {
            expect(allFeeds[i].name).toBeDefined();
            expect(allFeeds[i].name.length).not.toBe(0);
            expect(typeof allFeeds[i].name).toBe('string');
            }
        })
    });


    /* A new test suite named "The menu" */
    //menu is hidden with toggleClass
    describe('Menu', function() {
        var menuHide = $('body').hasClass('menu-hidden');
        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         //when page loads check to see if body has .menu-hidden
         it('menu is hidden by default', function() {
            expect(menuHide).toEqual(true);
         });
         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          //check body has and does not have .menu-hidden on 
          //every other click of menu-icon
          it('menu visibility changes on click', function() {
            var menuIcon = $('.menu-icon-link');

            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toEqual(true);
          });
      });
    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         //beforeEach to wait for async call to finish
         beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });    
         });
         
         //checks to see if at least 1 feed entry has been added
         it('feed container has minimum of 1 entry', function() {
            var entryNumber = $('.entry').length;
            expect(entryNumber).toBeGreaterThan(0);
         });
    });
    /* A new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {
        var compareFeedFirst;
        var compareFeedSecond;
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous.
         */

        //beforeEach to wait for async calls to finish
        beforeEach(function(done) {
            loadFeed(1, function() {
                compareFeedFirst = $('.feed').html();
                loadFeed(2, function() {
                    done();
                });
            });        
         });

        //afterEach to reload first entry
        afterEach(function() {
            loadFeed(0);
        });

        //determine that each entry is defined
        //compares both headers from compareFeedFirst and compareFeedSecond 
        //to detrmine that the entry has changed
         it('displays feed content change on menu select', function() {
            expect(compareFeedFirst).toBeDefined();
            compareFeedSecond = $('.feed').html();
            expect(compareFeedSecond).toBeDefined();
            expect(compareFeedFirst).not.toEqual(compareFeedSecond);
         }); 
    });     
}());
