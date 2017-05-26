define(function(require) {

    var InitChangelogController = require('plugin/changelog/controller/init-changelog-controller'),
        mock = require('test/proto-mock'),
        MockChangelogDataProvider = mock(require('plugin/changelog/util/changelog-data-provider')),
        MockChangelogParser = mock(require('plugin/changelog/util/changelog-parser')),
        MockChangelogModel = mock(require('plugin/changelog/model/changelog-model')),
        MockStorage = mock(require('core/model/storage'));

    describe.only('InitChangelogController', function() {

        var START_TIME = 1000,
            initChangelogController,
            mockStorage,
            clock;

        beforeEach(function() {
            clock = sinon.useFakeTimers(START_TIME);
            mockStorage = MockStorage.create();

            initChangelogController = InitChangelogController.create();

            initChangelogController.storage = mockStorage;
            initChangelogController.changelogModel = MockChangelogModel.create();
            initChangelogController.changelogDataProvider = MockChangelogDataProvider.create();
            initChangelogController.changelogParser  =MockChangelogParser.create();
        });

        afterEach(function() {
            clock.restore();
        });

        it('WHEN changelog is initialised THEN last visit date is updated', function() {
            // WHEN
            initChangelogController.init();

            // THEN
            sinon.assert.calledOnce(mockStorage.setItem);
            sinon.assert.calledWithExactly(mockStorage.setItem, 'last-visit', START_TIME);
        });

        it('WHEN changelog is initialised THEN last visit timestamp is read', function() {
            // WHEN
            initChangelogController.init();

            // THEN
            sinon.assert.calledOnce(mockStorage.getItem);
            sinon.assert.calledWithExactly(mockStorage.getItem, 'last-visit');
        });

        it('WHEN last date is read THEN it converts timestamp to date object', function() {
            // GIVEN
            mockStorage.getItem.returns(99);

            // WHEN
            var date = initChangelogController.getLastVisitDate();

            // THEN
            chai.assert.strictEqual(date.getTime(), 99);
        });
        
        it('WHEN the changelog is initialised THEN latest changes are saved to model', function() {
            // GIVEN
            var jsonEntries = [];
            var changeLogEntries = [];
            initChangelogController.changelogDataProvider.getJsonEntries.returns(jsonEntries);
            initChangelogController.changelogParser.parse.returns(changeLogEntries);
            
            // WHEN
            initChangelogController.init();
            
            // THEN
            sinon.assert.calledWithExactly(initChangelogController.changelogParser.parse, jsonEntries);
            chai.assert.strictEqual(initChangelogController.changelogModel.changes, changeLogEntries);
        });

    });

});
