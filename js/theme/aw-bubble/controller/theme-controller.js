define(function(require) {

    var Protoplast = require('protoplast'),
        ThemeModel = require('theme/aw-bubble/model/theme-model'),
        Dialog = require('theme/aw-bubble/model/dialog');
    
    var ThemeController = Protoplast.Object.extend({
        
        themeModel: {
            inject: ThemeModel
        },
        
        addSection: function(section) {
            this.themeModel.addSection(section.name, section);
        },

        selectSection: function(selectedSection) {
            this.themeModel.tooltip.text = '';
            this.themeModel.sections.selected = selectedSection;
            this.themeModel.sections.forEach(function(section) {
                section.isActive = section === selectedSection;
            });
        },

        selectSectionByName: function(name) {
            var section = this.themeModel.getSection(name);
            this.selectSection(section);
        },

        clearSelectedSection: function() {
            this.selectSection(null);
        },
        
        toggleExpanded: function() {
            this.themeModel.expanded = !this.themeModel.expanded;
        },
        
        allSectionsHidden: function() {
            this.themeModel.sections.forEach(function(section) {
                section.isFullyVisible = false;
            });
        },
        
        selectedSectionFullyVisible: function() {
            this.themeModel.sections.selected.isFullyVisible = true;
        },
        
        setFooter: function(content) {
            this.themeModel.footer = content;
        },

        showBackgroundImage: function(value) {
            this.themeModel.showBackgroundImage = value;
        },

        nightMode: function(value) {
            this.themeModel.nightMode = value;
        },

        showTooltip: function(text) {
            this.themeModel.tooltip.text = text;
        },

        hideTooltip: function() {
            this.themeModel.tooltip.text = '';
        },

        moveTooltip: function(x, y) {
            this.themeModel.tooltip.x = x;
            this.themeModel.tooltip.y = y;
        },
        
        showDialog: function(title, content, buttons, callback) {
            this.themeModel.dialog = Dialog.create(title, content, buttons, callback);
        },
        
        commitDialog: function(buttonLabel) {
            var data = this.themeModel.dialog.getButtonByLabel(buttonLabel);
            this.themeModel.dialog.callback(data.value);
        },
        
        closeDialog: function() {
            this.themeModel.dialog = null;
        }

    });

    return ThemeController;
});