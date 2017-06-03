define(function(require) {

    var Protoplast = require('protoplast'),
        ChangelogDataProvider = require('plugin/changelog/util/changelog-data-provider'),
        ChangelogParser = require('plugin/changelog/util/changelog-parser'),
        ChangelogModel = require('plugin/changelog/model/changelog-model');

    var InitChangelogController = Protoplast.Object.extend({

        storage: {
            inject: 'storage'
        },
        
        changelogModel: {
            inject: ChangelogModel
        },
        
        changelogDataProvider: {
            inject: ChangelogDataProvider
        },
        
        changelogParser: {
            inject: ChangelogParser
        },

        load: {
            sub: 'app/init',
            value: function() {
                this._loadEntries();
                this._updateLastVisit();
            }
        },

        /**
         * Return last visit date or null if it's the first visit
         * @returns {Date}
         */
        getLastVisitDate: function() {
            var lastVisitTimestamp = this.storage.getItem('last-visit'),
                lastVisitDate = null;

            if (lastVisitTimestamp) {
                lastVisitDate = new Date();
                lastVisitDate.setTime(parseInt(lastVisitTimestamp, 10));
            }

            return lastVisitDate;
        },
        
        _loadEntries: function() {
            var jsonEntries = this.changelogDataProvider.getJsonEntries();
            var entriesArray = this.changelogParser.parse(jsonEntries);
            this.changelogModel.changes.addAll(entriesArray);
        },

        /**
         * Update last visit date
         * @private
         */
        _updateLastVisit: function() {
            var lastVisitDate = new Date();
            this.storage.setItem('last-visit', lastVisitDate.getTime());
            this.changelogModel.lastVisit = lastVisitDate;
        }

    });

    return InitChangelogController;
});