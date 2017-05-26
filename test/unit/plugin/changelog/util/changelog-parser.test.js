define(function(require) {
    
    var ChangelogParser = require('plugin/changelog/util/changelog-parser'),
        Protoplast = require('protoplast');
    
    describe('ChangelogParser', function() {
        
        var parser;
        
        beforeEach(function() {
            parser = ChangelogParser.create();
        });
        
        it('WHEN null object is passed THEN empty collection is returned', function() {
            // WHEN
            var data = parser.parse(null);

            // THEN
            chai.assert.isTrue(Protoplast.Collection.isPrototypeOf(data));
            chai.assert.lengthOf(data, 0);
        });
        
    });
    
});
