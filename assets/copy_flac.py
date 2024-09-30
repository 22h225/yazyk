import pandas as pd
import shutil
import os

# CSVファイルの読み込み
records_df = pd.read_csv('./records/nld-balm-dorenda_flac.csv')
indexes_df = pd.read_csv('./indexes/nld-balm-dorenda_flac.csv')

# wordとfilenameの対応を辞書に変換
word_to_filename = dict(zip(indexes_df['text'], indexes_df['filename']))

# 保存先ディレクトリが存在しない場合は作成
destination_dir = '../static/dutch/'
os.makedirs(destination_dir, exist_ok=True)

# records.csvの単語ごとに処理
for _, row in records_df.iterrows():
    word = row['word']
    if word in word_to_filename:
        flac_filename = word_to_filename[word]
        source_path = f'./nld-balm-dorenda_flac/{flac_filename}'
        destination_path = f'{destination_dir}{word}.flac'
        
        # ファイルをコピー
        try:
            shutil.copy(source_path, destination_path)
            print(f"Copied: {source_path} to {destination_path}")
        except FileNotFoundError:
            print(f"File not found: {source_path}")

print("File copying completed.")
