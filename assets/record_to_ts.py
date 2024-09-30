import pandas as pd

def csv_to_ts(input_csv_path: str, output_ts_path: str):
    # Read the CSV file using pandas
    df = pd.read_csv(input_csv_path)
    
    # Start building the TypeScript export
    ts_output = 'export const records: { word: string, translation_en: string, translation_jp: string }[] = [\n'
    
    # Iterate over the dataframe and append each row to the TypeScript output
    for _, row in df.iterrows():
        ts_output += f'    {{ word: "{row["word"]}", translation_en: "{row["translation_en"]}", translation_jp: "{row["translation_jp"]}" }},\n'
    
    ts_output += '];'
    
    # Write the TypeScript result to the specified output file
    with open(output_ts_path, 'w', encoding='utf-8') as f:
        f.write(ts_output)

# Example usage:
csv_to_ts('./records/russian copy.csv', '../src/lib/russian.ts')
