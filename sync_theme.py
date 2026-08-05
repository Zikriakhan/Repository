import os
import re

src_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'src')

# Mapping from old hardcoded classes/hexes to connected CSS variables and new static defaults
replacements = [
    # 1. Map Tailwind bracketed colors to var(--theme-...) for real-time dynamic admin connection
    # Primary (British Racing Green: #06732C)
    (re.compile(r'\[#(?:3a1e26|2a151b|522a36|5a2e38|4a252f|8b1b36|991b36|7a172b|631323|3C5B42|2E4633|4A6D51)\]', re.IGNORECASE), '[var(--theme-primary)]'),
    
    # Accent (Racing Red: #92141f) & Gold/Highlights mapped to red accent for sleek professional UI
    (re.compile(r'\[#(?:92141f|92141f|e11e5c|ce1650|c21153|a00d43|8b0a3c|B63737|962D2D|C74A4A|ffd700|fbbf24|f59e0b|d97706|b45309|f57c00|eab308|A4936B|BFB394|827453)\]', re.IGNORECASE), '[var(--theme-accent)]'),
    
    # Light Backgrounds & Creams (White/Grey: #F2F2F2)
    (re.compile(r'\[#(?:fdfaf5|FAF5E8|fef9f3|fdfaf6|F3F4F6|E8E2CF)\]', re.IGNORECASE), '[var(--theme-light)]'),

    # 2. Map any plain hex strings in JS/CSS/styles to the new British Racing Green, Red, White, Grey palette
    # British Racing Green (#06732C)
    (re.compile(r'#(?:3a1e26|2a151b|522a36|5a2e38|4a252f|8b1b36|991b36|7a172b|631323|3C5B42|2E4633|4A6D51)', re.IGNORECASE), '#06732C'),
    
    # Racing Red (#92141f)
    (re.compile(r'#(?:92141f|92141f|e11e5c|ce1650|c21153|a00d43|8b0a3c|B63737|962D2D|C74A4A|ffd700|fbbf24|f59e0b|d97706|b45309|f57c00|eab308|A4936B|BFB394|827453)', re.IGNORECASE), '#92141f'),
    
    # Soft White / Grey (#F2F2F2)
    (re.compile(r'#(?:fdfaf5|FAF5E8|fef9f3|fdfaf6|F3F4F6|E8E2CF)', re.IGNORECASE), '#F2F2F2'),
]

updated_files = []
for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.jsx', '.js', '.css', '.html')) and file != 'AdminTheme.jsx':
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            modified = content
            for regex, repl in replacements:
                modified = regex.sub(repl, modified)
                
            if content != modified:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(modified)
                rel_path = os.path.relpath(file_path, src_dir)
                updated_files.append(rel_path)
                print(f"Synced theme in: {rel_path}")

print(f"\n✅ Theme synchronization complete! Total files connected: {len(updated_files)}")
