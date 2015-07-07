FamousFramework.scene('dg:tests:grandchild', { 
    events: {
        '$public': {
            'parent-dispatcher-broadcast': function($dispatcher, $payload) {
                // will not log
                $dispatcher.broadcast('log', {origin: $payload, target: ['grandchild', '$public']});
            },
            'parent-selector-behavior': function($dispatcher, $payload) {
                // will not log
                $dispatcher.broadcast('log', {origin: $payload, target: ['grandchild', '$public']});
            }
        },
        '$self': {
            'parent-ready': function($dispatcher) {
                $dispatcher.emit('grandchild-dispatcher-emit', ['grandchild', '$dispatcher', 'emit']);
            },
            'parent-dispatcher-broadcast': function($dispatcher, $payload) {
                $dispatcher.broadcast('log', {origin: $payload, target: ['grandchild', '$self']});
            },
            'parent-selector-behavior': function($dispatcher, $payload) {
                // will not log
                $dispatcher.broadcast('log', {origin: $payload, target: ['grandchild', '$self']});
            }
        },
        '#baz': {
            'parent-dispatcher-broadcast': function($dispatcher, $payload) {
                $dispatcher.broadcast('log', {origin: $payload, target: ['grandchild', '#baz']});
            },
            'parent-selector-behavior': function($dispatcher, $payload) {
                // will not log
                $dispatcher.broadcast('log', {origin: $payload, target: ['grandchild', '#baz']});
            }
        }
    },
    tree: `
        <dg:logger></dg:logger>
        <node id="baz"></node>
    `
});
