define(function(require) {
    
    var Protoplast = require('protoplast');
    
    var Dialog = Protoplast.extend({
        
        /**
         * @type {Protoplast.Component}
         */
        content: null,
    
        /**
         * @type {Protoplast.Collection}
         */
        buttons: null,
    
        /**
         * @type {Function}
         */
        callback: null,
        
        $create: function(content, buttons, callback) {
            this.content = content;
            this.buttons = Protoplast.Collection.create(buttons);
            this.callback = callback;
        },

        getButtonByLabel: function(buttonLabel) {
            var result = null;
            this.buttons.forEach(function(button) {
                if (button.label === buttonLabel) {
                    result = button;
                }
            });
            return result;
        }
    
    });
    
    return Dialog;
});