FamousFramework.scene('dg:tests:parent', {
    behaviors: {
        '#foo': {
            'parent-selector-behavior': ['parent', 'behavior', '#foo']
        },
        '#bar': {
            'parent-selector-behavior': ['parent', 'behavior', '#bar']
        },
        '$self': {
            'parent-self-behavior': ['parent', 'behavior', '$self']
        }
    },
    events: {
        '$lifecycle': {
            'post-load': function($dispatcher, $payload) {
                $dispatcher.broadcast('parent-ready');
                $dispatcher.broadcast('parent-dispatcher-broadcast', ['parent', '$dispatcher', 'broadcast']);
                $dispatcher.trigger('parent-dispatcher-trigger', ['parent', '$dispatcher', 'trigger']);
            }
        },
        '$self': {
            'parent-self-behavior': function($dispatcher, $payload) {
                $dispatcher.broadcast('log', {origin: $payload, target: ['parent', '$self']});
            },
            'parent-dispatcher-trigger': function($dispatcher, $payload) {
                // will not log
                $dispatcher.broadcast('log', {origin: $payload, target: ['parent', '$self']});
            },
            'grandchild-dispatcher-emit': function($dispatcher, $payload) {
                $dispatcher.broadcast('log', {origin: $payload, target: ['parent', '$self']});
            }
        },
        '$public': {
            'parent-self-behavior': function($dispatcher, $payload) {
                // will not log 
                $dispatcher.broadcast('log', {origin: $payload, target: ['parent', '$public']});
                // If the same event is declared for $public and $private, 
                // $private wil take precedence
            },
            'parent-dispatcher-trigger': function($dispatcher, $payload) {
                $dispatcher.broadcast('log', {origin: $payload, target: ['parent', '$public']});
            },
            'grandchild-dispatcher-emit': function($dispatcher, $payload) {
                // will not log 
                $dispatcher.broadcast('log', {origin: $payload, target: ['parent', '$public']});
            }
        },
        '$private': {
            'parent-self-behavior': function($dispatcher, $payload) {
                $dispatcher.broadcast('log', {origin: $payload, target: ['parent', '$private']});
            },
            'parent-dispatcher-trigger': function($dispatcher, $payload) {
                $dispatcher.broadcast('log', {origin: $payload, target: ['parent', '$private']});
            },
            'grandchild-dispatcher-emit': function($dispatcher, $payload) {
                // will not log 
                $dispatcher.broadcast('log', {origin: $payload, target: ['parent', '$private']});
            }
        },
        '#foo': {
            'parent-dispatcher-broadcast': function($dispatcher, $payload) {
                $dispatcher.broadcast('log', {origin: $payload, target: ['parent', '#foo']});
            },
            'parent-selector-behavior': function($dispatcher, $payload) {
                // will not log
                $dispatcher.broadcast('log', {origin: $payload, target: ['parent', '#foo']});
            },
            'parent-dispatcher-trigger': function($dispatcher, $payload) {
                $dispatcher.broadcast('log', {origin: $payload, target: ['parent', '#foo']});
            },
            'grandchild-dispatcher-emit': function($dispatcher, $payload) {
                $dispatcher.broadcast('log', {origin: $payload, target: ['parent', '#foo']});
            }
        }
    },
    tree: `
        <dg:logger></dg:logger>
        <dg:tests:child id="foo"></dg:tests:child>
    `
});
