$files = Get-ChildItem -Path "src" -Recurse -Include "*.jsx", "*.js", "*.css"
foreach ($file in $files) {
    $content = [IO.File]::ReadAllText($file.FullName)
    $modified = $content
    # 1. Vibrant Pinks / Magenta / Crimson / Reds -> Racing Red (#92141f) & Dark Racing Red (#b30c15)
    $modified = $modified -replace '92141f', '92141f'
    $modified = $modified -replace '92141f', 'b30c15'
    $modified = $modified -replace 'e11e5c', '92141f'
    $modified = $modified -replace 'ce1650', 'c70e18'
    $modified = $modified -replace 'c21153', 'b30c15'
    $modified = $modified -replace 'a00d43', '8a080f'
    $modified = $modified -replace '8b0a3c', '8a080f'
    $modified = $modified -replace '9e2a4b', '92141f'
    $modified = $modified -replace '800020', 'b30c15'
    $modified = $modified -replace '6d1f3b', 'b30c15'
    $modified = $modified -replace '86284a', '92141f'
    $modified = $modified -replace '73223f', 'b30c15'
    $modified = $modified -replace '5a1930', '8a080f'
    $modified = $modified -replace 'from-pink-400', 'from-[#92141f]'
    $modified = $modified -replace 'to-pink-500', 'to-[#b30c15]'
    $modified = $modified -replace 'pink-400', 'red-500'
    $modified = $modified -replace 'pink-500', 'red-700'

    # 2. Dark Burgundy / Chocolate / Deep Brown -> British Racing Green Dark (#044d1d) & Deep Forest (#033815)
    $modified = $modified -replace '3a1e26', '044d1d'
    $modified = $modified -replace '2a151b', '033815'
    $modified = $modified -replace '522a36', '065f24'
    $modified = $modified -replace '5a2e38', '065f24'
    $modified = $modified -replace '4a252f', '044d1d'
    $modified = $modified -replace '8b1b36', '044d1d'
    $modified = $modified -replace '991b36', '044d1d'
    $modified = $modified -replace '7a172b', '033815'
    $modified = $modified -replace '631323', '033815'
    $modified = $modified -replace '3d1a29', '033815'

    # 3. Gold / Yellow / Amber Accents -> British Racing Green Light (#d0dbd4) & Sleek Highlights
    $modified = $modified -replace 'ffd700', 'd0dbd4'
    $modified = $modified -replace 'fbbf24', 'd0dbd4'
    $modified = $modified -replace 'f59e0b', 'd0dbd4'
    $modified = $modified -replace 'd97706', 'd0dbd4'
    $modified = $modified -replace 'eab308', 'd0dbd4'
    $modified = $modified -replace 'f57c00', 'd0dbd4'
    $modified = $modified -replace 'c69214', '044d1d'
    $modified = $modified -replace 'b8860b', '044d1d'
    $modified = $modified -replace 'b45309', '044d1d'

    # 4. Warm Cream / Off-White Light Backgrounds -> Theme Light (#F2F2F2) & Pure White (#FFFFFF)
    $modified = $modified -replace 'fdfaf5', 'F2F2F2'
    $modified = $modified -replace 'FAF5E8', 'F2F2F2'
    $modified = $modified -replace 'fef9f3', 'F2F2F2'
    $modified = $modified -replace 'fdfaf6', 'F2F2F2'
    $modified = $modified -replace 'fff8ed', 'F2F2F2'
    $modified = $modified -replace 'fcf9f2', 'F2F2F2'
    $modified = $modified -replace 'F3F4F6', 'F2F2F2'
    $modified = $modified -replace 'F5F5F5', 'F2F2F2'
    $modified = $modified -replace 'F9FAFB', 'F2F2F2'

    if ($content -ne $modified) {
        [IO.File]::WriteAllText($file.FullName, $modified)
        Write-Host "Updated $($file.Name)"
    }
}
Write-Host "All colors updated successfully!"
