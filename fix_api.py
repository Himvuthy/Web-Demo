import os
import re

for root, _, files in os.walk('src'):
    for f in files:
        if f.endswith('.jsx'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Replace single or double quoted strings starting with http://127.0.0.1:5000
            content = re.sub(r'[\'\"]http://127\.0\.0\.1:5000(.*?)[\'\"]', r'`${import.meta.env.VITE_API_URL || \'http://127.0.0.1:5000\'}\1`', content)
            
            # Replace inside backticks
            content = content.replace('http://127.0.0.1:5000', '${import.meta.env.VITE_API_URL || \'http://127.0.0.1:5000\'}')
            
            with open(path, 'w', encoding='utf-8') as file:
                file.write(content)
print('Done replacing API URLs!')
