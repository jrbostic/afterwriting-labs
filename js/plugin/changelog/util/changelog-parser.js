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
            var entries = [], entry, date;

            if (jsonChangelog && jsonChangelog.length) {
               jsonChangelog.forEach(function(jsonEntry) {
                   if (!jsonEntry.title || !jsonEntry.date) {
                       throw new Error('InvalidEntry');
                   }

                   date = this._stringToDate(jsonEntry.date);
                   entry = ChangelogEntry.create(jsonEntry.title, date, jsonEntry.more);
                   entries.push(entry);
               }, this);
            }

            return Protoplast.Collection.create(entries);
        },

        /**
         * Convert DD/MM/YYYY to Date
         * @private
         * @return {Date}
         */
        _stringToDate: function(date) {
            var dateVal = date.split('/');
            return new Date(
                parseInt(dateVal[2]),
                parseInt(dateVal[1]) - 1,
                parseInt(dateVal[0])
            )
        }

    });
    
    return ChangelogParser;
});