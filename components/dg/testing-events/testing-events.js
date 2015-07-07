FamousFramework.scene('dg:testing-events', {
	behaviors: {
		'$self': {
			'style': {
				'overflow': 'auto'
			}
		},
		'.table-body': {
			'inner-html': function(logs) {
				if(!logs) return;
				return Object.keys(logs).map(function(eventName) {
					return logs[eventName].map(function(event, i, arr) {
						var key = i < 1 ? `<td rowspan="${arr.length}">${event.origin.component} : ${event.origin.dispatchedBy} : ${event.origin.dispatchedOn}</td>` : '';
						var value = `<td>${event.target.component} ${event.target.selector}</td>`;
						return	`<tr>${key}${value}</tr>`;
					}).join('');
				}).join('');
			}
		}
	},
	events: {
		'$self': {
			'logs-change': function($state, $payload) {
				var obj  = {},
					logs = $payload;
				
				logs.forEach(function(log) {
					formatLogsByEventName(obj, log);
				});

				$state.set('logs', obj);

				function formatLogsByEventName(obj, log) {
					var origin = `${log.origin.component}-${log.origin.dispatchedBy}-${log.origin.dispatchedOn}`;
					if(!obj[origin]) {
						obj[origin] = [log]
					}
					else{
						obj[origin].push(log);
					}
				}
			}
		},
		'$lifecycle': {
			'post-load': function($dispatcher) {
				$dispatcher.broadcast('app-ready');
			}
		}
	},
	states: {},
	tree: 'testing-events.html'
})
.config({
	includes: ['app.js', 'bootstrap.css', 'styles.css']
});