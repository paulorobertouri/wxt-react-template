# PowerShell script to rename the WXT React template project
# Usage: ./rename-template.ps1 NewProjectName
param(
    [Parameter(Mandatory = $true)]
    [string]$NewName
)

# Replace all occurrences of 'wxt-react-template' and 'WXT React Template' in all files
Get-ChildItem -Path . -Recurse -File | ForEach-Object {
    (Get-Content $_.FullName) -replace 'wxt-react-template', $NewName -replace 'WXT React Template', $NewName | Set-Content $_.FullName
}

Write-Host "Renamed project to $NewName. Please update package.json manually if needed."
