import os
import re

src_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'src')

replacements = [
    # Burgundy / Chocolate -> Green-Patina Enamel (#3C5B42) & variations
    (re.compile(r'3a1e26', re.IGNORECASE), '3C5B42'),
    (re.compile(r'2a151b', re.IGNORECASE), '2E4633'),
    (re.compile(r'522a36', re.IGNORECASE), '4A6D51'),
    (re.compile(r'5a2e38', re.IGNORECASE), '4A6D51'),
    (re.compile(r'4a252f', re.IGNORECASE), '3C5B42'),
    (re.compile(r'8b1b36', re.IGNORECASE), '3C5B42'),
    (re.compile(r'991b36', re.IGNORECASE), '3C5B42'),
    (re.compile(r'7a172b', re.IGNORECASE), '2E4633'),
    (re.compile(r'631323', re.IGNORECASE), '2E4633'),

    # Vibrant Pink / Crimson -> Red Ribbon Fabric (#B63737) & variations
    (re.compile(r'92141f', re.IGNORECASE), 'B63737'),
    (re.compile(r'92141f', re.IGNORECASE), '962D2D'),
    (re.compile(r'e11e5c', re.IGNORECASE), 'C74A4A'),
    (re.compile(r'ce1650', re.IGNORECASE), 'B63737'),
    (re.compile(r'c21153', re.IGNORECASE), '962D2D'),
    (re.compile(r'a00d43', re.IGNORECASE), '802525'),
    (re.compile(r'8b0a3c', re.IGNORECASE), '802525'),

    # Luxury Gold / Amber -> Aged Brass Metalwork (#A4936B) & Lightest Highlight (#BFB394)
    (re.compile(r'ffd700', re.IGNORECASE), 'A4936B'),
    (re.compile(r'fbbf24', re.IGNORECASE), 'BFB394'),
    (re.compile(r'f59e0b', re.IGNORECASE), 'A4936B'),
    (re.compile(r'd97706', re.IGNORECASE), 'A4936B'),
    (re.compile(r'b45309', re.IGNORECASE), '827453'),
    (re.compile(r'f57c00', re.IGNORECASE), 'A4936B'),
    (re.compile(r'eab308', re.IGNORECASE), 'BFB394'),

    # Light Backgrounds -> Neutral White (#FFFFFF) & Cream White (#E8E2CF)
    (re.compile(r'fdfaf5', re.IGNORECASE), 'E8E2CF'),
    (re.compile(r'FAF5E8', re.IGNORECASE), 'E8E2CF'),
    (re.compile(r'fef9f3', re.IGNORECASE), 'E8E2CF'),
    (re.compile(r'fdfaf6', re.IGNORECASE), 'E8E2CF'),
    (re.compile(r'F5F5F5', re.IGNORECASE), 'FFFFFF'),
    (re.compile(r'F9FAFB', re.IGNORECASE), 'FFFFFF'),
    (re.compile(r'F3F4F6', re.IGNORECASE), 'E8E2CF')
]

updated_count = 0
for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.jsx', '.js', '.css', '.html')):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            modified = content
            for regex, repl in replacements:
                modified = regex.sub(repl, modified)
                
            if content != modified:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(modified)
                print(f"Updated: {os.path.relpath(file_path, src_dir)}")
                updated_count += 1

print(f"Color update complete! Total files updated: {updated_count}")
