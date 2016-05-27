#!/usr/bin/env node
const semver = require( 'semver' );
const colors = require( 'colors' );
const child_process = require( 'child_process' );
const engines = require( '../../package' ).engines;

const hasAllowedNodeVersion = semver.satisfies( process.version, engines.node );
const results = child_process.spawnSync( 'npm', [ '-v' ], { encoding : 'utf8' } );
const hasAllowedNpmVersion = results.stdout && semver.satisfies( results.stdout, engines.npm );

if ( ! hasAllowedNodeVersion || ! hasAllowedNpmVersion ) {
	console.error(
		'Dette prosjektet krever node %s og npm %s,\nDu har node %s og npm %s\nVennligst bytt ved å bruke nvm eller n!\nEller se https://nodejs.org for instruksjoner.'.red,
		engines.node,
		engines.npm,
		process.version,
		results.stdout || 'unknown'
	);

	process.exit(1);
}
