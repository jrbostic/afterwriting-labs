define(function(require) {
    
    var ChangelogParser = require('plugin/changelog/util/changelog-parser'),
        ChangelogEntry = require('plugin/changelog/model/changelog-entry'),
        Protoplast = require('protoplast');
    
    describe('ChangelogParser', function() {
        
        var parser;
        
        beforeEach(function() {
            parser = ChangelogParser.create();
        });
        
        it('WHEN null object is passed THEN empty array is returned', function() {
            // WHEN
            var data = parser.parse(null);

            // THEN
            chai.assert.lengthOf(data, 0);
        });

        it('WHEN 2 entries are THEN array with 2 ChangelogEntry objects is returned', function() {
            // WHEN
            var data = parser.parse([
                {title: 'foo', date: '01/01/2000'},
                {title: 'bar', date: '02/01/2000'}
            ]);

            // THEN
            chai.assert.lengthOf(data, 2);
            chai.assert.isTrue(ChangelogEntry.isPrototypeOf(data[0]));
            chai.assert.isTrue(ChangelogEntry.isPrototypeOf(data[1]));
        });

        it('WHEN date is as DD/MM/YY with the title THEN date is saved as Date object and title as it is', function() {
            // WHEN
            var data = parser.parse([
                {title: 'foo', date: '01/01/2000'},
                {title: 'bar', date: '02/01/2000'}
            ]);

            // THEN
            chai.assert.equal(data[0].title, "foo");
            chai.assert.equal(data[1].title, "bar");

            chai.assert.equal(data[0].date.getTime(), new Date(2000, 0, 1).getTime());
            chai.assert.equal(data[1].date.getTime(), new Date(2000, 0, 2).getTime());
        });

        it('WHEN no date and/or title is passed THEN parser throws an exception', function() {
            // WHEN
            var empty = [{}];
            var justTitle = [{title: 'foo'}];
            var justDate = [{date: '01/01/2000'}];

            // THEN
            chai.assert.throws(parser.parse.bind(parser, empty), 'InvalidEntry');
            chai.assert.throws(parser.parse.bind(parser, justTitle), 'InvalidEntry');
            chai.assert.throws(parser.parse.bind(parser, justDate), 'InvalidEntry');
        });

        it('WHEN more info link is set THEN it is saved to moreLink info', function() {
            // WHEN
            var data = parser.parse([
                {title: 'foo', date: '01/01/2000', more: 'http://more.more'},
                {title: 'bar', date: '02/01/2000', more: null},
                {title: 'xyz', date: '03/01/2000'}
            ]);

            // THEN
            chai.assert.equal(data[0].moreLink, "http://more.more");
            chai.assert.equal(data[1].moreLink, null);
            chai.assert.equal(data[2].moreLink, null);

        });

    });
    
});
