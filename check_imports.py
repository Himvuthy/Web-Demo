import re

with open('src/StudentDashboard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract all JSX elements: <Element ... or </Element>
elements = set(re.findall(r'<([A-Z][a-zA-Z0-9_]*)', content))
print("JSX Elements found:", elements)

# Extract imports from lucide-react
import_match = re.search(r"import\s+\{([^}]+)\}\s+from\s+['\"]lucide-react['\"]", content)
if import_match:
    imports = set([i.strip() for i in import_match.group(1).split(',') if i.strip()])
    print("Lucide Imports:", imports)
    
    missing = elements - imports
    print("Potentially Missing from lucide-react:", missing)
else:
    print("No lucide-react imports found")
