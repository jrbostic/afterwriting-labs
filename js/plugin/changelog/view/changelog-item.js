define(function(require) {
    
    var Protoplast = require('protoplast'),
        BaseComponent = require('core/view/base-component'),
        helper = require('utils/helper');
    
    return BaseComponent.extend({
    
        html: '<p>' +
         '<span class="changelog-item__bullet">’</span>' +
        '<span data-prop="$info" class="changelog-item__info"></span>' +
        '<a data-prop="$link" class="changelog-item__link" style="display:none">(more)</a>' +
        '<span data-prop="$date" class="changelog-item__date"></span>' +
        '</p>',

        $date: null,

        $info: null,

        $link: null,

        item: null,
        
        addBindings: function() {
            Protoplast.utils.bind(this, 'item', this._renderItem.bind(this));
        },
        
        _renderItem: function() {
            this.$info.text(this.item.title);
            this.$date.text(helper.format_date(this.item.date, {descriptive: true}));
            if (this.item.moreLink) {
                this.$link.css('display', 'inline');
                this.$link.attr('href', this.item.moreLink);
            }
        }
        
    });
});

