import os
import re

def process_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    # 1. $ followed by digit
    content = re.sub(r'\$([0-9])', r'AED\1', content)
    
    # 2. $ followed by ${ in template literals (like `$${price}`)
    content = re.sub(r'\$\$\{', r'AED${', content)
    
    # 3. > followed by optional spaces and ${ (JSX)
    # wait, >${ could be >${variable} which means >$ then {variable}
    content = re.sub(r'>(\s*)\$\{', r'>\1AED{', content)

    # 4. ( followed by $ followed by {
    content = re.sub(r'\(\$\{', r'(AED{', content)

    # 5. \+ \$ followed by {
    content = re.sub(r'\+\s*\$\{', r'+ AED{', content)

    # 6. Any other literal $ not followed by { (excluding end of string or template)
    # Actually, the above might be enough.
    
    if original != content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)

for root, _, files in os.walk('src'):
    for f in files:
        if f.endswith('.jsx') or f.endswith('.js'):
            process_file(os.path.join(root, f))
