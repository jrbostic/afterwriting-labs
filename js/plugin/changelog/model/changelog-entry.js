define(function(require) {
    
    var Protoplast = require('protoplast');
    
    var ChangelogEntry = Protoplast.Model.extend({

        title: null,

        date: null,

        moreLink: null,

        $create: function(title, date, more) {
            this.title = title;
            this.date = date;
            this.moreLink = more;
        }

    });
    
    return ChangelogEntry;
});