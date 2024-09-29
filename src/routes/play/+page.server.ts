import { records } from './record.server';

export function load({ params, url }) {
	let count = url.searchParams.get('c');

	return {
		records: getRandomValues(records, Number(count) ?? 10),
    translations: records.map(record => record.translation)
	};
}

function getRandomValues<T>(array: T[], n: number): T[] {
	if (n > array.length) {
		throw new Error('n cannot be larger than the array length');
	}

	const result: T[] = [];
	const usedIndices = new Set<number>();

	while (result.length < n) {
		const randomIndex = Math.floor(Math.random() * array.length);

		// すでに選ばれたインデックスはスキップ
		if (!usedIndices.has(randomIndex)) {
			result.push(array[randomIndex]);
			usedIndices.add(randomIndex);
		}
	}

	return result;
}
