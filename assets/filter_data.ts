import { parse } from 'csv-parse/sync';
import * as fs from 'fs';
import words_csv from './russian3/words.csv';
import translations_csv from './russian3/translations.csv';
import flac_csv from './rus-balm-voc_flac.csv';
import frequency_list_csv from './frequency_list.csv';

// const text = translate(word.bare, { from: 'ru', to: 'jp' });
// const res = await fetch('https://libretranslate.com/translate', {
// 	method: 'POST',
// 	body: JSON.stringify({
// 		q: 'где',
// 		source: 'ru',
// 		target: 'jp'
// 	}),
// 	headers: { 'Content-Type': 'application/json' }
// });

let words = parse(fs.readFileSync(words_csv), { columns: true }) as word[];
let translations = parse(fs.readFileSync(translations_csv), { columns: true }) as translation[];
let flacs = parse(fs.readFileSync(flac_csv), { columns: true }) as flac[];
let frequency_list = parse(fs.readFileSync(frequency_list_csv), { columns: true }) as {
	word: string;
}[];
console.log('Read Finished');

translations = translations.filter((t) => t.lang == 'en');
// words = words.slice(0, 1000);

let flactext = flacs.map((flac) => flac.text);
let translationwordid = translations.map((translation) => translation.word_id);
let frequencywords = frequency_list.map((value) => value.word);

let filtered_words: word[] = words
	.filter((word, index) => {
		console.log('woid:', index, '/', words.length);
		let hava_flac = flactext.includes(word.bare);
		let have_translation = translationwordid.includes(word.id);
		let in_list = frequencywords.includes(word.bare);

		return hava_flac && have_translation && in_list;
	})
	.slice(0, 1000);

(async () => {
	let records = filtered_words.map(async (word) => {
		// console.log('========================');
		// console.log(translations.find((v) => v.word_id == word.id)?.tl);
		// console.log(translations.filter((v) => v.word_id == word.id)?.map((v) => v.tl).join('|'));
		// console.log('========================');
		return {
			word: word.bare,
			translation: translations.find((v) => v.word_id == word.id)?.tl
		};
	});

	let csvContentArray = ['word,translation'];

	for (let recordP of records) {
		let record = await recordP;
		csvContentArray.push(`${record.word},"${record.translation}"`);
	}

	fs.writeFileSync('output.csv', csvContentArray.join('\n'));
})();

export type record = {
	word: string;
	translation: string;
};

export type word = {
	id: string;
	position: string;
	bare: string;
	accented: string;
	derived_from_word_id: string;
	rank: string;
	disabled: string;
	audio: string;
	usage_de: string;
	usage_en: string;
	type: string;
	level: string;
	created_at: string;
};

export type translation = {
	id: string;
	lang: string;
	word_id: string;
	position: string;
	tl: string;
	example_ru: string;
	example_tl: string;
	info: string;
};

export type flac = {
	filename: string;
	alphaidx: string;
	text: string;
};
