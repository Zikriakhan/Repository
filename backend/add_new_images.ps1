$items = @(
    @{ category = 'bites'; name = 'NEW MENU BITE 1'; price = '$12.95'; numPrice = 12.95; rating = 4.5; calories = '500 Cal'; desc = 'Delicious new bite for you to try.'; image = '/menu-images/10.jpg'; active = $true },
    @{ category = 'bites'; name = 'NEW MENU BITE 2'; price = '$12.95'; numPrice = 12.95; rating = 4.5; calories = '500 Cal'; desc = 'Delicious new bite for you to try.'; image = '/menu-images/11.jpg'; active = $true },
    @{ category = 'bites'; name = 'NEW MENU BITE 3'; price = '$12.95'; numPrice = 12.95; rating = 4.5; calories = '500 Cal'; desc = 'Delicious new bite for you to try.'; image = '/menu-images/12.jpg'; active = $true },
    @{ category = 'bites'; name = 'NEW MENU BITE 4'; price = '$12.95'; numPrice = 12.95; rating = 4.5; calories = '500 Cal'; desc = 'Delicious new bite for you to try.'; image = '/menu-images/13.jpg'; active = $true },
    @{ category = 'bites'; name = 'NEW MENU BITE 5'; price = '$12.95'; numPrice = 12.95; rating = 4.5; calories = '500 Cal'; desc = 'Delicious new bite for you to try.'; image = '/menu-images/2.jpg'; active = $true },
    @{ category = 'bowls'; name = 'NEW MENU BOWL 1'; price = '$18.95'; numPrice = 18.95; rating = 4.5; calories = '800 Cal'; desc = 'Delicious new bowl for you to try.'; image = '/menu-images/3.jpg'; active = $true },
    @{ category = 'bowls'; name = 'NEW MENU BOWL 2'; price = '$18.95'; numPrice = 18.95; rating = 4.5; calories = '800 Cal'; desc = 'Delicious new bowl for you to try.'; image = '/menu-images/4.jpg'; active = $true },
    @{ category = 'bowls'; name = 'NEW MENU BOWL 3'; price = '$18.95'; numPrice = 18.95; rating = 4.5; calories = '800 Cal'; desc = 'Delicious new bowl for you to try.'; image = '/menu-images/7.jpg'; active = $true },
    @{ category = 'bowls'; name = 'NEW MENU BOWL 4'; price = '$18.95'; numPrice = 18.95; rating = 4.5; calories = '800 Cal'; desc = 'Delicious new bowl for you to try.'; image = '/menu-images/8.jpg'; active = $true },
    @{ category = 'desserts'; name = 'NEW MENU DESSERT 1'; price = '$9.95'; numPrice = 9.95; rating = 4.5; calories = '1000 Cal'; desc = 'Delicious new dessert for you to try.'; image = '/menu-images/9.jpg'; active = $true },
    @{ category = 'desserts'; name = 'NEW MENU DESSERT 2'; price = '$9.95'; numPrice = 9.95; rating = 4.5; calories = '1000 Cal'; desc = 'Delicious new dessert for you to try.'; image = '/menu-images/f.jpg'; active = $true },
    @{ category = 'desserts'; name = 'NEW MENU DESSERT 3'; price = '$9.95'; numPrice = 9.95; rating = 4.5; calories = '1000 Cal'; desc = 'Delicious new dessert for you to try.'; image = '/menu-images/image1.jpg'; active = $true },
    @{ category = 'desserts'; name = 'NEW MENU DESSERT 4'; price = '$9.95'; numPrice = 9.95; rating = 4.5; calories = '1000 Cal'; desc = 'Delicious new dessert for you to try.'; image = '/menu-images/s.jpg'; active = $true }
)

foreach ($item in $items) {
    $json = $item | ConvertTo-Json
    Invoke-RestMethod -Uri "http://localhost:5000/api/menu" -Method Post -Body $json -ContentType "application/json"
    Write-Host "Added $($item.name)"
}
