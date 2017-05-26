define(function(require) {
    
    var Protoplast = require('protoplast');
    
    var ChangelogParser = Protoplast.extend({

        /**
         * Convert Changelog saved in json into a collection of ChangelogEntry object
         * @param {Object[]} jsonChangelog
         * @param {String} jsonChangelog.title
         * @param {String} jsonChangelog.date  date saved as DD/MM/YYYY
         * @param {String} jsonChangelog.more  link to more info
         * @returns {*}
         */
        parse: function(jsonChangelog) {
            return Protoplast.Collection.create();
        }

    });
    
    return ChangelogParser;
});