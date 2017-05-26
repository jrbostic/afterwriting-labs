define(function(require) {
    
    var Protoplast = require('protoplast');
    
    var ChangelogEntry = Protoplast.Model.extend({

        title: null,

        date: null,

        moreLink: null
        
    });
    
    return ChangelogEntry;
});