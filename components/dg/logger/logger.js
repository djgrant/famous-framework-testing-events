FamousFramework.scene('dg:logger', {
	events: {
		'$self': {
			'app-ready': function($state, $dispatcher) {
				$state.set('appReady', true);
				if($state.get('logsDirty')) {
					$dispatcher.trigger('logs-change', $state.get('logs'));
				}
			},
			'log': function($state, $dispatcher, $payload) {
				$state.set('logs', $state.get('logs').concat(app.config.messageFormat($payload)));

				if($state.get('appReady')) {
					$dispatcher.trigger('logs-change', $state.get('logs'));
				}
				else {
					$state.set('logsDirty', true);
				}
			}
		},
		'$public': {
			'logs-change': function($state, $dispatcher, $payload) {
				$dispatcher.emit('logs-change', $state.get('logs'));
			}
		}
	},
	states: {
		appReady: false,
		logs: [],
		logsDirty: false
	}
});