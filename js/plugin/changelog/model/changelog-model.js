define(function(require) {
    
    var Protoplast = require('protoplast');
    
    var ChangelogModel = Protoplast.Model.extend({

        allChanges: null,
        
        newChanges: null,
        
        $create: function() {
            this.allChanges = Protoplast.Collection.create();
        },
        
        createAllChangesCollection: function(entries) {
            var collection = Protoplast.Collection.create(entries);
            this.allChanges = Protoplast.CollectionView.create(collection);
    
            // Sort by date (last first)
            this.allChanges.addSort({
                fn: function(a, b) {
                    return b.date.getTime() - a.date.getTime();
                }.bind(this)
            });
        },
    
        createNewChangesCollection: function(lastDisplayedEntryDate) {
            var view = Protoplast.CollectionView.create(this.allChanges);
    
            // Sort by date (last last)
            view.addSort({
                fn: function(a, b) {
                    return a.date.getTime() - b.date.getTime();
                }.bind(this)
            });
    
            // Filter out items created before last visit
            view.addFilter({
                fn: function(entry) {
                    return entry.date.getTime() > lastDisplayedEntryDate.getTime();
                }.bind(this)
            });
            
            this.newChanges = view;
        }
    });
    
    return ChangelogModel;
});