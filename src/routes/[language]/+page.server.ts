import { error } from '@sveltejs/kit';
import arabicData from './arabic.server';
import chineseData from './chinese.server';
import dutchData from './dutch.server';
import germanData from './german.server';
import italianData from './italian.server';
import russianData from './russian.server';

type records_type = { word: string; translation_en: string; translation_jp: string };

export async function load({ params, url }) {
	let count = url.searchParams.get('c');
	let translation_language = url.searchParams.get('l') ?? 'en';
	let records_load: records_type[];

	// 静的インポートされたデータを参照
	switch (params.language) {
		case 'arabic':
			records_load = arabicData;
			break;
		case 'chinese':
			records_load = chineseData;
			break;
		case 'dutch':
			records_load = dutchData;
			break;
		case 'german':
			records_load = germanData;
			break;
		case 'italian':
			records_load = italianData;
			break;
		case 'russian':
			records_load = russianData;
			break;
		default:
			throw error(404, 'Not found');
	}

	return {
		language: params.language,
		translation_language,
		records: getRandomValues(records_load, Number(count ?? 10)),
		translations_en: records_load.map((record) => record.translation_en),
		translations_jp: records_load.map((record) => record.translation_jp)
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

