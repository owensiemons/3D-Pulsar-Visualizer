import re
import json

# Input and output file paths
input_file = "raw_pulsar_data.txt"
output_file = "cleaned_pulsar_data.json"

def is_valid(value):
    return value != "*" and value.lower() != "nan"

def extract_first_value(token_list):
    for token in token_list:
        if re.match(r"^[\d\.\-+Ee:]+$", token) and is_valid(token):
            return token
    return None

def parse_line(line):
    parts = line.strip().split()

    if len(parts) < 10:
        return None

    try:
        name = parts[1]
        psrj = parts[3]

        raj_index = next(i for i, p in enumerate(parts) if re.match(r"\d{2}:\d{2}:\d{2}", p))
        raj = parts[raj_index]
        decj = parts[raj_index + 3]

        pmra = extract_first_value(parts[raj_index + 6 : raj_index + 9])
        pmdec = extract_first_value(parts[raj_index + 9 : raj_index + 12])
        px = extract_first_value(parts[raj_index + 12 : raj_index + 15])
        p0 = extract_first_value(parts[raj_index + 15 : raj_index + 18])
        p1 = extract_first_value(parts[raj_index + 18 : raj_index + 21])

        binary_index = raj_index + 21
        binary = parts[binary_index] if is_valid(parts[binary_index]) else None

        dist = parts[binary_index + 2] if is_valid(parts[binary_index + 2]) else None
        disc_date = parts[binary_index + 3] if is_valid(parts[binary_index + 3]) else None
        r_lum = parts[binary_index + 4] if is_valid(parts[binary_index + 4]) else None
        age = parts[binary_index + 5] if is_valid(parts[binary_index + 5]) else None

        return {
            "NAME": name,
            "PSRJ": psrj,
            "RAJ": raj,
            "DECJ": decj,
            "PMRA": pmra,
            "PMDEC": pmdec,
            "PX": px,
            "P0": p0,
            "P1": p1,
            "BINARY": binary,
            "DIST": dist,
            "DISC_DATE": disc_date,
            "R_LUM": r_lum,
            "AGE": age
        }
    except Exception:
        return None

def parse_data_file(file_path):
    cleaned_data = []
    with open(file_path, 'r') as file:
        for line in file:
            if re.match(r"^\d+\s+J?\w", line):
                entry = parse_line(line)
                if entry:
                    cleaned_data.append(entry)
    return cleaned_data

if __name__ == "__main__":
    results = parse_data_file(input_file)
    with open(output_file, 'w') as f:
        json.dump(results, f, indent=2)
    print(f"✅ Cleaned data written to: {output_file}")