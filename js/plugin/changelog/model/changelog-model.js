define(function(require) {
    
    var Protoplast = require('protoplast');
    
    var ChangelogModel = Protoplast.Model.extend({
    
        /**
         * @type {Protoplast.Collection}
         */
        changes: null,
        
        changesSinceLastVisit: null,
        
        lastVisit: null,
        
        $create: function() {
            this.changes = Protoplast.Collection.create();
            this._createChangesSinceLastVisitCollectionView();
        },
        
        addEntries: function(changes) {
            this.changes.addAll(changes);
        },

        _createChangesSinceLastVisitCollectionView: function() {
            var view = Protoplast.CollectionView.create(this.changes);

            // Sort by date
            view.addSort({
                fn: function(a, b) {
                    return a.date.getTime() - b.date.getTime();
                }.bind(this)
            });

            // Filter out items created before last visit
            view.addFilter({
                fn: function(entry) {
                    return this.lastVisit && entry.date.getTime() >= this.lastVisit.getTime();
                }.bind(this)
            });

            // Invalidate filter when last visit is set
            Protoplast.utils.bind(this, 'lastVisit', function() {
                view.refresh();
            }.bind(this));

            this.changesSinceLastVisit = view;
        }
        
    });
    
    return ChangelogModel;
});