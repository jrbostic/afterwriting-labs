define(function(require) {
    
    var $ = require('jquery'),
        Protoplast = require('protoplast'),
        ChangelogModel = require('plugin/changelog/model/changelog-model'),
        ChangelogList = require('plugin/changelog/view/changelog-list'),
        ThemeController = require('theme/aw-bubble/controller/theme-controller');
    
    var ShowChangelog = Protoplast.Object.extend({

        themeController: {
            inject: ThemeController
        },

        changelogModel: {
            inject: ChangelogModel
        },

        init: function() {
            Protoplast.utils.bind(this.changelogModel, 'changesSinceLastVisit', this._showLastChanges.bind(this));
        },

        _showLastChanges: function() {
            if (this.changelogModel.changesSinceLastVisit.length !== 0) {
                var changelogList = ChangelogList.create();
                changelogList.items = this.changelogModel.changesSinceLastVisit;
                changelogList.addBindings();
                $.prompt(changelogList.root.innerHTML, {
                    buttons: {'OK': true}
                });
            }
        }

    });
    
    return ShowChangelog;
});