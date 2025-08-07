#!/usr/bin/env pwsh
# Clean up unused theme files
Remove-Item "d:\scratch\code-app-dataverse\src\ThemeProvider.tsx" -ErrorAction SilentlyContinue
Remove-Item "d:\scratch\code-app-dataverse\src\ThemeWrapper.tsx" -ErrorAction SilentlyContinue
Remove-Item "d:\scratch\code-app-dataverse\src\hooks\useTheme.ts" -ErrorAction SilentlyContinue
Remove-Item "d:\scratch\code-app-dataverse\install-fluent.ps1" -ErrorAction SilentlyContinue
