import re

with open('src/StudentDashboard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace imports
content = content.replace('CheckCircle2', 'CheckCircle')
content = content.replace('ShieldAlert', 'XCircle')
content = content.replace('FlaskConical', 'PieChart')

with open('src/StudentDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Icons replaced in StudentDashboard.jsx")
