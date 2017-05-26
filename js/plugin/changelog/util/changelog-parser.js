define(function(require) {
    
    var Protoplast = require('protoplast'),
        ChangelogEntry = require('plugin/changelog/model/changelog-entry');

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
            var entries = [];

            if (jsonChangelog && jsonChangelog.length) {
               jsonChangelog.forEach(function(jsonEntry) {
                   if (!jsonEntry.title || !jsonEntry.date) {
                       throw new Error('InvalidEntry');
                   }
               });
            }

            return Protoplast.Collection.create(entries);
        }

    });
    
    return ChangelogParser;
});