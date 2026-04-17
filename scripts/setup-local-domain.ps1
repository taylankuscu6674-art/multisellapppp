# Run this from an elevated PowerShell window if multiseller.local does not resolve.
$hostsPath = "$env:SystemRoot\System32\drivers\etc\hosts"
$entry = "127.0.0.1 multiseller.local app.multiseller.local multiseller.test"
$current = Get-Content -LiteralPath $hostsPath -ErrorAction Stop

if ($current -match "multiseller\.local") {
  Write-Host "multiseller.local is already present in hosts."
  exit 0
}

Add-Content -LiteralPath $hostsPath -Value "`n$entry" -ErrorAction Stop
Write-Host "Added local development domains:"
Write-Host $entry
