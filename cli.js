#!/usr/bin/env node
const semver = require( 'semver' );
const colors = require( 'colors' );
const child_process = require( 'child_process' );
const engines = require( '../package' ).engines;

const hasAllowedNodeVersion = semver.satisfies( process.version, engines.node );
const results = child_process.spawnSync( 'npm', [ '-v' ], { encoding : 'utf8' } );
const hasAllowedNpmVersion = results.stdout && semver.satisfies( results.stdout, engines.npm );

if ( ! hasAllowedNodeVersion || ! hasAllowedNpmVersion ) {
	console.error(
		'This project requires node %s and npm %s,\nYou have node %s and npm %s\nPlease switch using nvm or n! Or see https://nodejs.org for instructions.'.red,
		engines.node,
		engines.npm,
		process.version,
		results.stdout || 'unknown'
	);
}
