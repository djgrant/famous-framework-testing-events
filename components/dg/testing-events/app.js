(function() {

	var app = {};

	app.config = {
		messageFormat: function(msg) {
			var obj = {
				origin: {
					component: msg.origin[0], 
					dispatchedBy: msg.origin[1],
					dispatchedOn: msg.origin[2]
				},
				target: {
					component: msg.target[0],
					selector: msg.target[1]
				}
			};
			return obj;
		},
		eventsSelectors: ['$self', '$public', '$private', '#foo'],
		behaviorsSelectors: ['$self', '#foo'],
		dispatcherMethods: ['broadcast()', 'emit()', 'trigger()']
	};

	window.app = app;

})();

