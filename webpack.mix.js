const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js')
.react('resources/js/components/troops/troopResCalc.js', 'public/js/components')
.react('resources/js/components/resources/resources2.js', 'public/js/components')
.react('resources/js/components/speeds/speeds.js', 'public/js/components')
.react('resources/js/components/accounts/accounts.js', 'public/js/components')
.react('resources/js/components/buildings/buildings.js', 'public/js/components')
.react('resources/js/components/consumption/consumption.js', 'public/js/components')
.react('resources/js/components/helpers/helpersMain.js', 'public/js/components')
.sass('resources/sass/app.scss', 'public/css');
