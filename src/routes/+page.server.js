import { _buildData } from './+page.js'
/** @type {import('./$types').PageServerLoad} */

const buildData = _buildData();

export function load({ params }) {
	return buildData;
}