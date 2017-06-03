define(function(require) {
    
    var Protoplast = require('protoplast'),
        ChangelogModel = require('plugin/changelog/model/changelog-model'),
        ThemeController = require('theme/aw-bubble/controller/theme-controller');
    
    var ShowChangelog = Protoplast.Object.extend({

        themeController: {
            inject: ThemeController
        },

        changelogModel: {
            inject: ChangelogModel
        },

        init: function() {
            Protoplast.util.bind(this.changelogModel, 'changesSinceLastVisit', this._showLastChanges.bind(this));
        },

        _showLastChanges: function() {
            if (this.changelogModel.changesSinceLastVisit.length === 0) {
                console.log('No entries');
            }
            this.changelogModel.changesSinceLastVisit.forEach(function(entry) {
                console.log(entry.date, entry.title);
            });
        }

    });
    
    return ShowChangelog;
});