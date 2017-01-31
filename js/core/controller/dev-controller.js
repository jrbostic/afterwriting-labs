define(function(require) {

    var common = require('utils/common'),
        Protoplast = require('protoplast'),
        ThemeController = require('aw-bubble/controller/theme-controller');

    var DevController = Protoplast.Object.extend({
        
        themeController: {
            inject: ThemeController
        },

        initialiseApp: {
            sub: 'app/init',
            value: function() {
                var footer = common.data.footer;
                footer += '<br /><span class="version">development version</span>';
                this.themeController.setFooter(footer);
            }
        }
        
    });

    return DevController;
});