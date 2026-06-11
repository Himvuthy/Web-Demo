import re

with open('src/TeacherDashboard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find any className="... ${isDark ? ... : ...} ..." and convert to className={`...`}
# We can just match className="something with ${" and replace the quotes.

def quote_replacer(match):
    inner = match.group(1)
    return f"className={{`{inner}`}}"

content = re.sub(r'className="([^"]*\$\{[^"]*)"', quote_replacer, content)

with open('src/TeacherDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed quotes in TeacherDashboard.jsx")
