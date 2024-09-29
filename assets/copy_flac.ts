import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import flac_csv from './rus-balm-voc_flac.csv';
import output_csv from './output.csv';
import type { flac } from './filter_data';

let flacs = parse(fs.readFileSync(flac_csv), { columns: true }) as flac[];
let records = parse(fs.readFileSync(output_csv), { columns: true }) as {
	word: string;
	translation: string;
}[];

flacs
	.filter((flac) => records.map((record) => record.word).includes(flac.text))
	.forEach((flac) => {
		const inputFilePath = path.join(__dirname, 'rus-balm-voc_flac', flac.filename);
		const outputFilePath = path.join(__dirname, '..', 'static', 'flac', flac.text + '.flac',);
		fs.copyFileSync(
      inputFilePath,
      outputFilePath
		);
	});
