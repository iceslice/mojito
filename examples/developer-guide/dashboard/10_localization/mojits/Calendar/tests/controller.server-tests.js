
YUI.add('Calendar-tests', function(Y, NAME) {

    var suite = new YUITest.TestSuite('Calendar-tests'),
        controller = null,
        model = null,
        A = YUITest.Assert;

    suite.add(new YUITest.TestCase({
        
        name: 'Calendar user tests',
        
        setUp: function() {
            controller = Y.mojito.controllers.Calendar;
            model = Y.mojito.models.CalendarModelYQL;
        },
        tearDown: function() {
            controller = null;
        },
        
        'test mojit': function() {
            var ac,
                assetsResults,
                doneResults;
            ac = {
                assets: {
                    addCss: function(css) {
                        assetsResults = css;
                    }
                },
                models: {
                    get: function(modelName) {
                        A.areEqual('CalendarModelYQL', modelName, 'wrong model name');
                        return {
                               getData: function(params, cb) {
                                 cb(params);
                               }
                        }
                    }
                },
                done: function(data) {
                    doneResults = data;
                }
            };

            A.isNotNull(controller);
            A.isFunction(controller.index);
            controller.index(ac);
            A.isObject(doneResults);
            A.isTrue(doneResults.hasOwnProperty('results'));
            A.isObject(doneResults.results);
        }
        
    }));
    
    YUITest.TestRunner.add(suite);
    
}, '0.0.1', {requires: ['mojito-test', 'Calendar', 'CalendarModelYQL']});
