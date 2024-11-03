import { _buildData } from './+page.ts'
/** @type {import('./$types').PageServerLoad} */

const buildData = _buildData();

export function load() {
	return buildData;
}