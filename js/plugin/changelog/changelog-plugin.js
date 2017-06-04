define(function(require) {

    var Plugin = require('core/plugin'),
        InitChangelogController = require('plugin/changelog/controller/init-changelog-controller'),
        ShowChangelogController = require('plugin/changelog/controller/show-changelog-controller'),
        ChangelogDataProvider = require('plugin/changelog/util/changelog-data-provider'),
        ChangelogParser = require('plugin/changelog/util/changelog-parser'),
        ChangelogModel = require('plugin/changelog/model/changelog-model');

    var ChangelogPlugin = Plugin.extend({
        
        $create: function(context) {
            context.register(InitChangelogController.create());
            context.register(ShowChangelogController.create());
            context.register(ChangelogDataProvider.create());
            context.register(ChangelogParser.create());
            context.register(ChangelogModel.create());
        }
        
    });

    return ChangelogPlugin;
});