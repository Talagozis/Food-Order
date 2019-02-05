/**
 * Check out https://googlechromelabs.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');


var customFastestHandler = function (request, values, options) {	
	var x =  fetch(request).then(function(response) {
		for (var p of response.headers) {
			console.log(p);
		}
	});
	return self.toolbox.fastest(request, values, options);
};

self.toolbox.options.debug = true;


self.toolbox.options.cache = {
	name: 'ionic-cache-v1901282020a'
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

// post requests
self.toolbox.router.post(/.*/, self.toolbox.networkOnly)

// get home page
self.toolbox.router.get(/\/\?utm_source=a2hs$/mi, self.toolbox.networkOnly)

// get api
self.toolbox.router.get(/^.*\/api\/v.\/store.*$/gmi, self.toolbox.fastest, { cache: { name: "apiStore", maxAgeSeconds: 50 }})
self.toolbox.router.get(/^.*\/api\/v.\/product.*$/gmi, self.toolbox.fastest, { cache: { name: "apiProduct", maxAgeSeconds: 60 * 60 * 10 } })
self.toolbox.router.get(/^.*\/api\/v.\/offer.*level=1.*$/gmi, self.toolbox.fastest, { cache: { name: "apiOffer", maxAgeSeconds: 60 * 60 * 5 } })
self.toolbox.router.get(/^.*\/api\/v.\/offer.*level=2.*$/gmi, self.toolbox.fastest, { cache: { name: "apiOffer", maxAgeSeconds: 60 * 60 * 5 } })
self.toolbox.router.get(/^.*\/api\/v.\/hubuser.*$/gmi, self.toolbox.networkOnly)
self.toolbox.router.get(/^.*\/api\/v.\/.*$/gmi, self.toolbox.networkOnly)

// get google analytics
self.toolbox.router.get(/^.*www\.google\-analytics\.com.*$/gmi, self.toolbox.networkOnly)

// dynamically cache any local assets
self.toolbox.router.get(/^.*(\.jpg|\.png).*$/, self.toolbox.fastest)
self.toolbox.router.get(/^.*(\.js|\.css).*$/, self.toolbox.cacheFirst)

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;


self.addEventListener('message', function (event) {
	if (event.data === 'skipWaiting')
		self.skipWaiting();
});