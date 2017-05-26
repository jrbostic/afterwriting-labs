define(function(require) {
    
    var Protoplast = require('protoplast');
    
    var ChangelogModel = Protoplast.Model.extend({
    
        /**
         * @type {Protoplast.Collection}
         */
        changes: null,
        
        $create: function() {
            this.changes = Protoplast.Collection.create();
        }
        
    });
    
    return ChangelogModel;
});