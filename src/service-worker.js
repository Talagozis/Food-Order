/**
 * Check out https://googlechromelabs.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
	name: 'ionic-cache'
};

// pre-cache our key assets
self.toolbox.precache(
	[
		'./build/main.js?v=20180808',
		'./build/vendor.js?v=20180808',
		'./build/main.css?v=20180808',
		'./build/polyfills.js?v=20180808',
		'index.html?v=20180808',
		'manifest.json'
	]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.fastest);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;
