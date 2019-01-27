/**
 * Check out https://googlechromelabs.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
	name: 'ionic-cache-v1901271754'
};

// pre-cache our key assets
self.toolbox.precache(
	[
		// './build/vendor.js',
		// './build/main.js',		
		// './build/main.css',
		// './build/polyfills.js',
		// // 'index.html',
		// 'manifest.json'
	]
);

// dynamically cache local index.html asset
self.toolbox.router.any(/index.html$/, self.toolbox.fastest);
self.toolbox.router.any(/^((?!^\/\?).)*$/mgi, self.toolbox.fastest);

// dynamically cache any other local assets
self.toolbox.router.any(/^((?!index.html).)*$/mgi, self.toolbox.fastest);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;
