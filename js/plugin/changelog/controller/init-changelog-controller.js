define(function(require) {

    var Protoplast = require('protoplast'),
        ChangelogDataProvider = require('plugin/changelog/util/changelog-data-provider'),
        ChangelogList = require('plugin/changelog/view/changelog-list'),
        ChangelogParser = require('plugin/changelog/util/changelog-parser'),
        ChangelogModel = require('plugin/changelog/model/changelog-model'),
        ThemeController = require('theme/aw-bubble/controller/theme-controller');

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

        themeController: {
            inject: ThemeController
        },

        load: {
            sub: 'app/init',
            value: function() {
                var jsonEntries = this.changelogDataProvider.getJsonEntries();
                var entriesArray = this.changelogParser.parse(jsonEntries);
                this.changelogModel.createAllChangesCollection(entriesArray);

                var lastDisplayedEntry = this.storage.getItem('last-changelog-entry-date'),
                    lastDisplayedEntryDate;

                if (lastDisplayedEntry) {
                    lastDisplayedEntryDate = new Date();
                    lastDisplayedEntryDate.setTime(parseInt(lastDisplayedEntry, 10));

                    this.changelogModel.createNewChangesCollection(lastDisplayedEntryDate);
                    if (this.changelogModel.newChanges.length) {
                        var changelogList = ChangelogList.create();
                        changelogList.items = this.changelogModel.newChanges;

                        this.themeController.showDialog("Check out new stuff:", changelogList, [
                            {label: 'OK, show me the goodies!', value: true}
                        ], function() {
                            this.themeController.closeDialog();
                        }.bind(this));
                    }
                }

                if (this.changelogModel.allChanges.length) {
                    var lastEntry = this.changelogModel.allChanges.get(0);
                    this.storage.setItem('last-changelog-entry-date', lastEntry.date.getTime());
                }

            }
        }
    });

    return InitChangelogController;
});