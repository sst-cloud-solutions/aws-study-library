import os
import re

directory = r"c:\Users\SST\StudyMaterial\aws-sap\docs\Practice Exams"

files_data = [
    ("SAP-C02 Mock Exam.md", "Overview"),
    ("SAP-C02 Mock Exam - Part 1.md", "Part 1 (Questions 1-25)"),
    ("SAP-C02 Mock Exam - Part 2.md", "Part 2 (Questions 26-50)"),
    ("SAP-C02 Mock Exam - Part 3.md", "Part 3 (Questions 51-75)"),
    ("SAP-C02 Mock Exam 2 - Part 1.md", "Part 1 (Questions 1-25)"),
    ("SAP-C02 Mock Exam 2 - Part 2.md", "Part 2 (Questions 26-50)"),
    ("SAP-C02 Mock Exam 2 - Part 3.md", "Part 3 (Questions 51-75)"),
    ("SAP-C02 Mock Exam 3 - Part 1.md", "Part 1 (Questions 1-25)"),
    ("SAP-C02 Mock Exam 3 - Part 2.md", "Part 2 (Questions 26-50)"),
    ("SAP-C02 Mock Exam 3 - Part 3.md", "Part 3 (Questions 51-75)")
]

for filename, label in files_data:
    filepath = os.path.join(directory, filename)
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Locate front matter
    match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if match:
        front_matter = match.group(1)
        # Check if sidebar_label is already present
        if "sidebar_label:" not in front_matter:
            new_front_matter = front_matter.strip() + f"\nsidebar_label: {label}"
            new_content = f"---\n{new_front_matter}\n---" + content[match.end():]
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename} with sidebar_label: {label}")
        else:
            # Update the existing sidebar_label
            lines = front_matter.split('\n')
            new_lines = []
            for line in lines:
                if line.startswith("sidebar_label:"):
                    new_lines.append(f"sidebar_label: {label}")
                else:
                    new_lines.append(line)
            new_front_matter = "\n".join(new_lines)
            new_content = f"---\n{new_front_matter}\n---" + content[match.end():]
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Overwrote sidebar_label for {filename} with: {label}")
    else:
        # No front matter found, create one
        new_content = f"---\nsidebar_label: {label}\n---\n\n" + content
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Created front matter and added sidebar_label for {filename}")
