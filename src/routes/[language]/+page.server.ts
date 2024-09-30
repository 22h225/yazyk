import { error } from '@sveltejs/kit';

// モジュールのパス
const arabic = './arabic.server.ts';
const chinese = './chinese.server.ts';
const dutch = './dutch.server.ts';
const german = './german.server.ts';
const italian = './italian.server.ts';
const russian = './russian.server.ts';

type records_type = { word: string; translation_en: string; translation_jp: string };

export async function load({ params, url }) {
	let count = url.searchParams.get('c');
	let translation_language = url.searchParams.get('l') ?? 'en';
	let records_load: records_type[];

	switch (params.language) {
		case 'arabic':
			records_load = (await import(/* @vite-ignore */ arabic)).records;
			break;
		case 'chinese':
			records_load = (await import(/* @vite-ignore */ chinese)).records;
			break;
		case 'dutch':
			records_load = (await import(/* @vite-ignore */ dutch)).records;
			break;
		case 'german':
			records_load = (await import(/* @vite-ignore */ german)).records;
			break;
		case 'italian':
			records_load = (await import(/* @vite-ignore */ italian)).records;
			break;
		case 'russian':
			records_load = (await import(/* @vite-ignore */ russian)).records;
			break;
		default:
			error(404, 'Not found');
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
