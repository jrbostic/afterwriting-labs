define(function(require) {
    
    var Protoplast = require('protoplast'),
        DialogButtonBar = require('theme/aw-bubble/view/dialog-button-bar'),
        DialogPresenter = require('theme/aw-bubble/presenter/dialog-presenter');

    return Protoplast.Component.extend({
        
        $meta: {
            presenter: DialogPresenter
        },
        
        html: '<div class="dialog"><div data-comp="contentWrapper"></div><div data-comp="buttonBar"></div></div>',
        
        dialog: null,
        
        contentWrapper: {
            component: Protoplast.Component.extend({html: '<div class="dialog__content_wrapper"></div>'})
        },
        
        currentContent: null,
        
        buttonBar: {
            component: DialogButtonBar 
        },
        
        init: function() {
            Protoplast.utils.bind(this, 'dialog', this._updateDialog);
        },
        
        _updateDialog: function(dialog) {
            if (!dialog) {
                this.contentWrapper.removeAll();
                this.buttonBar.removeAll();

                this.root.style.display = 'none';

                this.contentWrapper._children.concat().forEach(function(child) {
                    this.contentWrapper.remove(child);
                }, this);

                this.buttonBar._children.concat().forEach(function(child) {
                    this.buttonBar.remove(child);
                }, this);
            }
            else {
                this.root.style.display = 'block';
                this.contentWrapper.add(dialog.content);
                this.currentContent = dialog.content;
                this.buttonBar.buttons = dialog.buttons;
                this.buttonBar.on('buttonClicked', this._buttonClicked);
            }
        },
        
        _buttonClicked: function(buttonLabel) {
            this.dispatch('buttonClicked', buttonLabel);
        }
        
    });
});

