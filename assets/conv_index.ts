import * as fs from 'fs';
import * as path from 'path';

function convertToCSV(inputFile: string, outputFile: string) {
	const data: { filename: string; alphaidx: string; text: string }[] = [];
	const fileContent = fs.readFileSync(inputFile, 'utf-8');
	const lines = fileContent.split('\n');
	let currentData: any = {};

	lines.forEach((line: string) => {
		if (line.startsWith('[')) {
			// ファイル名の行
			if (currentData.filename) {
				data.push(currentData);
			}
			currentData = { filename: line.replace(/\[|\]/g, '') };
		} else if (line.startsWith('SWAC_ALPHAIDX=')) {
			currentData.alphaidx = line.split('=')[1].trim();
		} else if (line.startsWith('SWAC_TEXT=')) {
			currentData.text = line.split('=')[1].trim();
		}
	});

	if (currentData.filename) {
		data.push(currentData);
	}

	const csvContent = [
		'filename,alphaidx,text',
		...data.map((row) => `${row.filename},${row.alphaidx},${row.text}`)
	].join('\n');
	fs.writeFileSync(outputFile, csvContent);
}

const inputFilePath = path.join(__dirname, 'rus-balm-voc_flac', 'index.tags.txt');
const outputFilePath = path.join(__dirname, 'rus-balm-voc_flac.csv');
convertToCSV(inputFilePath, outputFilePath);
