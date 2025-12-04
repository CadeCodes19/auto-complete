import json

input_file = "100k.txt"
output_file = "words.json"

with open(input_file, "r", encoding="utf-8") as f:
    words = f.readlines()

lowered = [word.strip().lower() for word in words]

with open(output_file, "w", encoding="utf-8") as f:
    json.dump(lowered, f, ensure_ascii=False, indent=2)
