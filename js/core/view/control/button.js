define(function(require) {

    var Protoplast = require('protoplast');

    var Button = Protoplast.Component.extend({

        html: '<button type="button" />',
        
        label: null,

        init: function() {
            Protoplast.utils.bind(this, 'label', this._updateLabel.bind(this));

            this.root.onclick = this._clicked.bind(this);
        },

        _updateLabel: function() {
            this.root.innerHTML = this.label;
        },

        _clicked: function() {
            this.dispatch('clicked');
        },

        destroy: function() {
            this.root.onclick = null;
        }

    });

    return Button;
});