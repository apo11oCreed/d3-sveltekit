import { _buildData } from './+page'
/** @type {import('./$types').PageServerLoad} */
export const prerender = true

const buildData = _buildData();

export function load() {
	return buildData;
}