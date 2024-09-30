import csv

# 入力ファイルのパス
input_file = './spa-wims-octavio_flac/index.tags.txt'
# 出力するCSVファイルのパス
output_file = './indexes/spa-wims-octavio_flac.csv'

# CSVヘッダー
csv_header = ['filename', 'text']

# CSV用のデータを保持するリスト
csv_data = []

# 現在のFLACファイル名を一時保存する変数
current_flac_file = None

# ファイルを読み込み
with open(input_file, 'r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()

        # [*.flac]を見つけたら、ファイル名を抽出
        if line.startswith('[') and line.endswith('.flac]'):
            current_flac_file = line[1:-1]  # []を取り除いてファイル名を保存
        # 各プロパティを読み取って対応する値を保存
        elif line.startswith('SWAC_TEXT='):
            swac_text = line.split('=')[1]
            # 全ての値が揃ったらリストに追加
            csv_data.append([current_flac_file, swac_text])

# CSVファイルに書き込み
with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(csv_header)  # ヘッダーの書き込み
    writer.writerows(csv_data)   # データの書き込み

print("CSVファイルに変換完了:", output_file)
