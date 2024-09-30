import pandas as pd
from googletrans import Translator
import time

# Load the CSV file
df = pd.read_csv('indexes/nld-balm-dorenda_flac.csv')

# Initialize the translator
translator = Translator()

# Function to translate with a delay and progress display
def translate_en_with_delay(text, idx, total):
    translation = translator.translate(text, src='nl', dest='en').text
    print(f"Translating {idx + 1}/{total}: {text} to {translation}")
    time.sleep(0)  # Wait for 1 second between translations
    return translation

# Function to translate with a delay and progress display
def translate_ja_with_delay(text, idx, total):
    translation = translator.translate(text, src='nl', dest='ja').text
    print(f"Translating {idx + 1}/{total}: {text} to {translation}")
    time.sleep(0)  # Wait for 1 second between translations
    return translation

# Get the total number of rows
total_rows = len(df)

# Translate the "translation" column to Japanese with delay and progress display
df.pop('filename')
df = df.rename(columns={'text': 'word'})
df['translation_en'] = [translate_en_with_delay(text, idx, total_rows) for idx, text in enumerate(df['word'])]
df['translation_jp'] = [translate_ja_with_delay(text, idx, total_rows) for idx, text in enumerate(df['word'])]

# Save the new dataframe with Japanese translations to a new CSV
df.to_csv('records/nld-balm-dorenda_flac.csv', index=False)

# Display the first few rows of the dataframe to verify
print(df.head())
