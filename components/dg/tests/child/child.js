FamousFramework.scene('dg:tests:child', {
    events: {
        '$public': {
            'parent-dispatcher-broadcast': function($dispatcher, $payload) {
                // will not log
                $dispatcher.broadcast('log', {origin: $payload, target: ['child', '$public']});
            },
            'parent-selector-behavior': function($dispatcher, $payload) {
                $dispatcher.broadcast('log', {origin: $payload, target: ['child#foo', '$public']});
            },
            'grandchild-dispatcher-emit': function($dispatcher, $payload) {
                // will not log 
                $dispatcher.broadcast('log', {origin: $payload, target: ['child', '$public']});
            }
        },
        '$private': {
            'parent-dispatcher-broadcast': function($dispatcher, $payload) {
                // will not log
                $dispatcher.broadcast('log', {origin: $payload, target: ['child', '$private']});
            },
            'parent-selector-behavior': function($dispatcher, $payload) {
                // will not log
                $dispatcher.broadcast('log', {origin: $payload, target: ['child#foo', '$private']});
            },
            'grandchild-dispatcher-emit': function($dispatcher, $payload) {
                // will not log 
                $dispatcher.broadcast('log', {origin: $payload, target: ['child', '$private']});
            }
        },
        '$self': {
            'parent-dispatcher-broadcast': function($dispatcher, $payload) {
                $dispatcher.broadcast('log', {origin: $payload, target: ['child', '$self']});
            },
            'parent-selector-behavior': function($dispatcher, $payload) {
                // will not log
                $dispatcher.broadcast('log', {origin: $payload, target: ['child', '$self']});
            },
            'grandchild-dispatcher-emit': function($dispatcher, $payload) {
                $dispatcher.broadcast('log', {origin: $payload, target: ['child', '$self']});
            }
        },
        '#bar': {
            'parent-dispatcher-broadcast': function($dispatcher, $payload) {
                $dispatcher.broadcast('log', {origin: $payload, target: ['child', '#bar']});
            },
            'parent-selector-behavior': function($dispatcher, $payload) {
                // will not log
                $dispatcher.broadcast('log', {origin: $payload, target: ['child', '#bar']});
            },
            'grandchild-dispatcher-emit': function($dispatcher, $payload) {
                $dispatcher.broadcast('log', {origin: $payload, target: ['child', '#bar']});
            }
        }
    },
    tree: `
        <dg:logger></dg:logger>
        <dg:tests:grandchild id="bar"></dg:tests:grandchild>
    `
});
