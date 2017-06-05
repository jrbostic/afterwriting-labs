define(function(require) {
    
    var Protoplast = require('protoplast'),
        Button = require('core/view/control/button');
    
    var DialogButtonBar = Protoplast.Component.extend({
        
        html: '<div class="dialog__button_bar"></div>',
        
        buttons: null,

        $create: function() {
            this.buttons = Protoplast.Collection.create();
        },
        
        init: function() {
            Protoplast.utils.renderList(this, 'buttons', {
                renderer: Button,
                property: 'label',
                create: function(parent, data, renderer, propertyName) {
                    var child = renderer.create();
                    child[propertyName] = data.label;
                    child.on('clicked', parent._buttonClicked.bind(parent, data.label));
                    parent.add(child);
                }
            });
        },
        
        _buttonClicked: function(buttonLabel) {
            this.dispatch('buttonClicked', buttonLabel)
        }
        
    });
    
    return DialogButtonBar;
});