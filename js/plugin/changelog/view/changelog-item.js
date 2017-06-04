define(function(require) {
    
    var Protoplast = require('protoplast'),
        BaseComponent = require('core/view/base-component');
    
    return BaseComponent.extend({
    
        tag: 'p',
        
        item: null,
        
        addBindings: function() {
            Protoplast.utils.bind(this, 'item', this._renderItem.bind(this));
        },
        
        _renderItem: function() {
            this.root.innerText = this.item.title + ' ' + this.item.date + ' ' + this.item.moreLink;
        }
        
    });
});

