/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('all contain non-empty URL', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('all contain non-empty name', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });


    /* Test suite named "The menu" */
    describe('The menu', function () {
        var menu = $('.menu-icon-link');
        var body = $('body');

        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('ensure menu is hidden at the start', function () {
            expect(body).toBeDefined();
            expect(menu).toBeDefined();
            expect(body.length).toBeGreaterThan(0);
            expect(menu.length).toBeGreaterThan(0);

            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        /*  Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('ensure menu class changes on click', function () {
            expect(body).toBeDefined();
            expect(menu).toBeDefined();
            expect(body.length).toBeGreaterThan(0);
            expect(menu.length).toBeGreaterThan(0);

            menu.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(false);
            menu.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function () {

        // Pass in the done function to load feed
        // so that it will be called after the 
        // ajax request completes
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('ensure .feed contains at least one element and not empty', function () {
            var feed = $('.feed');
            var entries = $('.feed .entry-link .entry');
            expect(feed).toBeDefined();
            expect(entries).toBeDefined();
            expect(feed.length).toBeGreaterThan(0);
            expect(entries.length).toBeGreaterThan(0);

            $.each(entries, function (index, entry) {
                expect(entry.innerHTML.length).toBeGreaterThan(0);
            });
        });
    });

    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        // Uses a beforeEach() to setup Async calls to get data
        // into the prev and new url that will contain the HTML returned
        // by these calls.  It verifies that the HTML
        // content has changed after the additional call.
        // Start with feed ID of 1 and then set the new URL to the feed of
        // ID of 0 so that we do not have to reset the feed after
        // the tests
        it('ensure loadFeed changes the content', function (done) {
            loadFeed(1, function () {
                var prevUrl = $('.feed')[0].innerHTML;
                loadFeed(0, function () {
                    var newUrl = $('.feed')[0].innerHTML;
                    expect(newUrl).not.toBe(prevUrl);
                    done();
                });
            });
        });
    });
}());
