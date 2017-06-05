define(function(require) {
    
    var Protoplast = require('protoplast'),
        ChangelogItem = require('plugin/changelog/view/changelog-item'),
        BaseComponent = require('core/view/base-component');
    
    return BaseComponent.extend({

        html: '<div></div>',

        items: null,

        addBindings: function() {
            Protoplast.utils.renderList(this, 'items', {
                renderer: ChangelogItem,
                property: 'item'
            });
        }
        
    });
});

