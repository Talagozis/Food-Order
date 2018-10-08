#!/usr/bin/env node
// This file when run (i.e: npm run postbuild) will add a hash to these files: main.js, main.css, polyfills.js, vendor.js
// and will update index.html so that the script/link tags request those files with their corresponding hashes
// Based upon source: https://gist.github.com/haydenbr/7df417a8678efc404c820c61b6ffdd24
// Don't forget to: chmod 755 scripts/cache-busting.js

var fs = require('fs'),
    path = require('path'),
    cheerio = require('cheerio'),
    revHash = require('rev-hash');

var rootDir = path.resolve(__dirname, './');
// rootDir = "Food-Order";
// var wwwRootDir = path.resolve(rootDir, 'platforms', 'browser', 'www');
var wwwRootDir = path.resolve(rootDir, 'www');
var buildDir = path.join(wwwRootDir, 'build');
var indexPath = path.join(wwwRootDir, 'index.html');

var cssPath = path.join(buildDir, 'main.css');
var cssFileHash = revHash(fs.readFileSync(cssPath));
var cssNewFileName = `main.${cssFileHash}.css`;
var cssNewPath = path.join(buildDir, cssNewFileName);
var cssNewRelativePath = path.join('build', cssNewFileName);

var jsPath = path.join(buildDir, 'main.js');
var jsFileHash = revHash(fs.readFileSync(jsPath));
var jsNewFileName = `main.${jsFileHash}.js`;
var jsNewPath = path.join(buildDir, jsNewFileName);
var jsNewRelativePath = path.join('build', jsNewFileName);

var jsPolyfillsPath = path.join(buildDir, 'polyfills.js');
var jsPolyfillsFileHash = revHash(fs.readFileSync(jsPolyfillsPath));
var jsPolyfillsNewFileName = `polyfills.${jsPolyfillsFileHash}.js`;
var jsPolyfillsNewPath = path.join(buildDir, jsPolyfillsNewFileName);
var jsPolyfillsNewRelativePath = path.join('build', jsPolyfillsNewFileName);

var jsVendorPath = path.join(buildDir, 'vendor.js');
var jsVendorFileHash = revHash(fs.readFileSync(jsVendorPath));
var jsVendorNewFileName = `vendor.${jsVendorFileHash}.js`;
var jsVendorNewPath = path.join(buildDir, jsVendorNewFileName);
var jsVendorNewRelativePath = path.join('build', jsVendorNewFileName);

// rename main.css to main.[hash].css
fs.renameSync(cssPath, cssNewPath);

// rename main.js to main.[hash].js
fs.renameSync(jsPath, jsNewPath);

// rename polyfills.js to polyfills.[hash].js
fs.renameSync(jsPolyfillsPath, jsPolyfillsNewPath);

// rename vendor.js to vendor.[hash].js
fs.renameSync(jsVendorPath, jsVendorNewPath);

// update index.html to load main.[hash].css
$ = cheerio.load(fs.readFileSync(indexPath, 'utf-8'));

$('head link[href="build/main.css"]').attr('href', cssNewRelativePath);
$('body script[src="build/main.js"]').attr('src', jsNewRelativePath);
$('body script[src="build/polyfills.js"]').attr('src', jsPolyfillsNewRelativePath);
$('body script[src="build/vendor.js"]').attr('src', jsVendorNewRelativePath);

fs.writeFileSync(indexPath, $.html());