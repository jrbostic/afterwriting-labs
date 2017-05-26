define(function(require) {
    
    var Protoplast = require('protoplast');
    
    var ChangeEntry = Protoplast.Model.extend({

        title: null,

        date: null,

        moreLink: null
        
    });
    
    return ChangeEntry;
});