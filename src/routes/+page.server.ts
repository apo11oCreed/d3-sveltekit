import { _buildData } from './+page'
/** @type {import('./$types').PageServerLoad} */

const buildData = _buildData();

export function load() {
	return buildData;
}