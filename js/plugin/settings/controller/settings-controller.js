define(function(require) {

    var Protoplast = require('protoplast'),
        SettingsConfigProvider = require('plugin/settings/model/settings-config-provider'),
        SettingsWidgetModel = require('plugin/settings/model/settings-widget-model'),
        ThemeController = require('aw-bubble/controller/theme-controller');
    
    var SettingsController = Protoplast.Object.extend({
        
        scriptModel: {
            inject: 'script'
        },

        settingsLoaderModel: {
            inject: 'settingsLoaderModel'
        },
        
        settingsWidgetModel: {
            inject: SettingsWidgetModel
        },

        settings: {
            inject: 'settings'
        },

        storage: {
            inject: 'storage'
        },

        themeController: {
            inject: ThemeController
        },

        init: function() {
            var settingsConfigProvider = SettingsConfigProvider.create();
            this.settingsWidgetModel.groups = settingsConfigProvider.getSettingGroups();
            this._loadSettings();
        },

        updateValue: function(key, value) {
            this.settings[key] = value;
        },

        // TODO: unused?
        setValues: function(map) {
            for (var key in map) {
                if (map.hasOwnProperty(key)) {
                    this.updateValue(key, map[key]);
                }
            }
        },

        _loadSettings: function() {
            var userSettings =  this.storage.getItem('settings');
            this.settings.fromJSON(userSettings || {});
            this.settingsLoaderModel.userSettingsLoaded = true;
            this.settings.on('changed', this._saveCurrentSettings, this);

            Protoplast.utils.bind(this, {
                'settings.night_mode': this.themeController.nightMode,
                'settings.show_background_image': this.themeController.showBackgroundImage
            })
        },

        _saveCurrentSettings: function() {
            this.scriptModel.script = this.scriptModel.script; // parse again (e.g. to add/hide tokens)
            this.storage.setItem('settings', this.settings.toJSON());
        }

    });

    return SettingsController;
});