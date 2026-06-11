import re

with open('src/TeacherDashboard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace simple cases like "dark:something " -> "${isDark ? 'something' : ''} "
# But since they are often inside template literals, we need to be careful.
# Actually, since everything is inside {`...`} we can do some regex magic.
# e.g., "bg-white dark:bg-black" -> "${isDark ? 'bg-black' : 'bg-white'}"

# A safer manual fix for the specific components complained about:
content = content.replace('bg-gray-100 dark:bg-[#111]', '${isDark ? \'bg-[#111]\' : \'bg-gray-100\'}')
content = content.replace('bg-gray-50 dark:bg-[#111] dark:border-white/10', '${isDark ? \'bg-[#111] border-white/10\' : \'bg-gray-50\'}')
content = content.replace('bg-white dark:bg-white/10', '${isDark ? \'bg-white/10\' : \'bg-white\'}')

# Also fix other dark: occurrences if possible, but let's just do a broad regex for `dark:xyz`
def replacer(match):
    # match is like "bg-red-500 dark:bg-red-900" 
    # we can't easily parse out the light version without a complex parser.
    # We will just replace "dark:cls" with "${isDark ? 'cls' : ''}"
    return f"${{isDark ? '{match.group(1)}' : ''}}"

# Find all dark:[something] and replace
content = re.sub(r'dark:([a-zA-Z0-9_/-]+|\[.*?\])', replacer, content)

# Clean up empty spaces and double strings if they happen
content = content.replace('  ', ' ')

with open('src/TeacherDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed dark classes in TeacherDashboard.jsx")
