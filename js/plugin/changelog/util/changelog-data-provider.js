define(function(require) {
    
    var Protoplast = require('protoplast'),
        JsonEntries = require('text!data/changelog.json');
    
    var ChangelogDataProvider = Protoplast.extend({
        
        getJsonEntries: function() {
            return JSON.parse(JsonEntries);
        }
        
    });
    
    return ChangelogDataProvider;
});