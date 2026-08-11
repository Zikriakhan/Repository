const items = [
  {
    "name": "ALFREDO SMOKED TURKEY / الفريدو ديك رومي مدخن",
    "price": "35",
    "numPrice": 35,
    "image": "https://loremflickr.com/480/360/alfredo%2Csmoked%2Cturkey?lock=1",
    "desc": "Creamy white Alfredo sauce & Turkey / صلصة الفريدو البيضاء و الديك الرومي",
    "rating": 5,
    "active": true
  },
  {
    "name": "BOLOGNESE / بولونيز",
    "price": "35",
    "numPrice": 35,
    "image": "https://loremflickr.com/480/360/bolognese?lock=1",
    "desc": "Traditional Mama's Italian homemade recipe with minced beef bolognese sauce / وصفة ماما الإيطالية التقليدية المنزلية مع صلصة البولونيز و اللحم البقري المفروم",
    "rating": 5,
    "active": true
  },
  {
    "name": "ITALIAN CLUB SANDWICH / ساندوتش إيطالي",
    "price": "20",
    "numPrice": 20,
    "image": "https://loremflickr.com/480/360/italian%2Cclub%2Csandwich?lock=1",
    "desc": "Chicken / Veg - Three layers of Chicken, Eggs and Homemade Mayo, served with Fries / دجاج / خضار - ثلاث طبقات من الدجاج والبيض والمايونيز، تقدم مع البطاطس المقلية",
    "rating": 5,
    "active": true
  },
  {
    "name": "CRISPY CHICKEN BURGER / برجر دجاج مقرمش",
    "price": "20",
    "numPrice": 20,
    "image": "https://loremflickr.com/480/360/crispy%2Cchicken%2Cburger?lock=1",
    "desc": "Fried Chicken with Cheese, Lettuce, Classic Sauce and Pickles served with French Fries / دجاج مقلي مع جبن، خس، كلاسيك صوص، مخلل يقدم مع بطاطا مقلية",
    "rating": 5,
    "active": true
  },
  {
    "name": "FIRE HOUSE CHICKEN BURGER / برجر فاير هاوس",
    "price": "20",
    "numPrice": 20,
    "image": "https://loremflickr.com/480/360/fire%2Chouse%2Cchicken%2Cburger?lock=1",
    "desc": "Fried Chicken, Lettuce, Jalapeno, Cheese, Fire Sauce / الدجاج المقلي، الخس، الهالابينو، الجبن، صلصة النار",
    "rating": 5,
    "active": true
  },
  {
    "name": "CLASSIC BEEF BURGER / برجر لحم البقر الكلاسيكية",
    "price": "22",
    "numPrice": 22,
    "image": "https://loremflickr.com/480/360/classic%2Cbeef%2Cburger?lock=1",
    "desc": "Wagyu Beef, Classic Sauce, Lettuce, Pickle, Fried Onion Ring / لحم البقر واغيو، الصلصة الكلاسيكية، الخس، المخلل، حلقة البصل المقلي",
    "rating": 5,
    "active": true
  },
  {
    "name": "MUSHROOM TRUFFLE BURGER / فطر الكمأة برجر",
    "price": "25",
    "numPrice": 25,
    "image": "https://loremflickr.com/480/360/mushroom%2Ctruffle%2Cburger?lock=1",
    "desc": "Wagyu Beef, Lettuce, Pickle, Fried Onion Ring, Cheese, Truffle Mushroom Sauce / لحم واغيو البقري، صلصة هالابينو، خس، مخلل، حلقة بصل مقلية",
    "rating": 5,
    "active": true
  },
  {
    "name": "JALAPENO BEEF BURGER / هالابينو بيف برجر",
    "price": "22",
    "numPrice": 22,
    "image": "https://loremflickr.com/480/360/jalapeno%2Cbeef%2Cburger?lock=1",
    "desc": "Wagyu Beef, Jalapeno Sauce, Lettuce, Pickle, Fried Onion Ring / لحم واغيو البقري، صلصة هالابينو، خس، مخلل، حلقة بصل مقلية",
    "rating": 5,
    "active": true
  },
  {
    "name": "LASAGNA AL FORNO BEEF / لازانيا الفورنو لحم",
    "price": "36",
    "numPrice": 36,
    "image": "https://loremflickr.com/480/360/lasagna%2Cal%2Cforno%2Cbeef?lock=1",
    "desc": "Italian goodness with minced beef and layers upon layers of cheese / سحر الطعمة الإيطالية مع اللحم المفروم وطبقات الجبن",
    "rating": 5,
    "active": true
  },
  {
    "name": "LASAGNA AL FORNO CHICKEN / لازانيا الفورنو دجاج",
    "price": "36",
    "numPrice": 36,
    "image": "https://loremflickr.com/480/360/lasagna%2Cal%2Cforno%2Cchicken?lock=1",
    "desc": "Italian goodness with minced chicken and layers upon layers of cheese / سحر الطعمة الإيطالية مع اللحم المفروم وطبقات الجبن",
    "rating": 5,
    "active": true
  },
  {
    "name": "VEGETABLE LASAGNA / لازانيا الخضار",
    "price": "32",
    "numPrice": 32,
    "image": "https://loremflickr.com/480/360/vegetable%2Clasagna?lock=1",
    "desc": "Fresh vegetables with layers of cheese makes for a delightful meal / خضار طازجة مع طبقات من الجبن مكونة وجبة لذيذة",
    "rating": 5,
    "active": true
  },
  {
    "name": "PASTA AL FORNO / مكرونة الفورنو",
    "price": "35",
    "numPrice": 35,
    "image": "https://loremflickr.com/480/360/pasta%2Cal%2Cforno?lock=1",
    "desc": "Oven Baked Pasta Lasagna - Penne with mozzarella with minced beef or chicken or veg / لازانيا مطبوخة بالفرن - خليط من البيني وجبنة الموزاريلا مع اللحم المفروم أو الدجاج أو الخضار",
    "rating": 5,
    "active": true
  },
  {
    "name": "MAC & CHEESE LASAGNA / لازانيا ماك اند تشيز",
    "price": "36",
    "numPrice": 36,
    "image": "https://loremflickr.com/480/360/mac%2C%26%2Ccheese%2Clasagna?lock=1",
    "desc": "Layers on layers of macaroni topped with mozzarella cheese and a choice of beef, chicken or vegetarian option / طبقات من المعكرونة مغطاة بجبنة الموزاريلا مع اللحم المفروم أو الدجاج أو الخضار",
    "rating": 5,
    "active": true
  },
  {
    "name": "CREAMY MUSHROOM / شوربة الفطر بالكريمة",
    "price": "15",
    "numPrice": 15,
    "image": "https://loremflickr.com/480/360/creamy%2Cmushroom?lock=1",
    "desc": "Served with Garlic Bread - The Real Taste of Rich Creamy Soup, this is how mushroom soup should be! Bursting with flavor and a generous portion of freshly picked Mushrooms, served with your favorite Italian garlic bread / تقدم مع خبز بالثوم - المذاق الحقيقي لشوربة الكريمة الغنية، شوربة الفطر كما ينبغي أن تكون! غنية بالنكهة مع كمية كبيرة من الفطر الطازج، مقدمة مع خبز الثوم الإيطالي المفضل",
    "rating": 5,
    "active": true
  },
  {
    "name": "RICH TOMATO BASIL / شوربة الطماطم الغنية بالريحان",
    "price": "15",
    "numPrice": 15,
    "image": "https://loremflickr.com/480/360/rich%2Ctomato%2Cbasil?lock=1",
    "desc": "Served with Garlic Bread - MAMA MIA! The taste of Italy comes to life with our homemade style creamy tomato soup, garnished with basil & cream and served with your favorite Italian garlic bread. Homemade / تقدم مع خبز بالثوم - ماما ميا! طعمة إيطالية نابضة بالحياة مع شوربة الطماطم الكريمية كما المطبوخة في المنزل والمزينة بالريحان والكريمة وتقدم مع خبز الثوم الإيطالي المفضل",
    "rating": 5,
    "active": true
  },
  {
    "name": "CHICKEN CREAM SOUP / شوربة الدجاج بالكريمة",
    "price": "14",
    "numPrice": 14,
    "image": "https://loremflickr.com/480/360/chicken%2Ccream%2Csoup?lock=1",
    "desc": "Chicken soup for the soul! Tender chicken, aromatic vegetables and herbs with cream, a splash of magic & topped with a touch of basil. Ultimate comfort soup / شوربة الدجاج تخاطب الروح! دجاج طري، خضروات ذات رائحة زكية وكريمة مخلوطة بالأعشاب اللذيذة، رشة من السحر مغطاة بلمسة من الريحان. شوربة الراحة المطلقة",
    "rating": 5,
    "active": true
  },
  {
    "name": "LENTIL SOUP / شوربة العدس",
    "price": "12",
    "numPrice": 12,
    "image": "https://loremflickr.com/480/360/lentil%2Csoup?lock=1",
    "desc": "Homemade Lentil Soup recipe is an Italian classic. It's a delicious, warming and healthy vegetarian soup. Comfort in a bowl! / شوربة العدس المنزلية على الطريقة الإيطالية التقليدية. إنها شوربة نباتية لذيذة ودافئة وصحية في آن معاً. السعادة في وعاء!",
    "rating": 5,
    "active": true
  },
  {
    "name": "CHICKEN BASKET / سلة الدجاج",
    "price": "35",
    "numPrice": 35,
    "image": "https://loremflickr.com/480/360/chicken%2Cbasket?lock=1",
    "desc": "Succulent fried chicken with french fries / دجاج مقلي طري مع بطاطس مقلية",
    "rating": 5,
    "active": true
  },
  {
    "name": "CAPTAIN SAAB'S GRILLED ITALIAN FISH / سمك الكابتن صعب المشوي الإيطالي",
    "price": "35",
    "numPrice": 35,
    "image": "https://loremflickr.com/480/360/captain%2Csaab%2Cs%2Cgrilled?lock=1",
    "desc": "An ode to a legend. A fish grilled and aged to perfection. Garnished with Italian herbs and served with french fries / لتخليد ذكراه. سمك مشوي ومعمر إلى حد الكمال، مزين بالأعشاب الإيطالية ويقدم مع البطاطس المقلية",
    "rating": 5,
    "active": true
  },
  {
    "name": "CHICKEN STEAK / شريحة دجاج",
    "price": "42",
    "numPrice": 42,
    "image": "https://loremflickr.com/480/360/chicken%2Csteak?lock=1",
    "desc": "Feeling Healthy? Our Steak is marinated for 24 hours and served to you fresh off the sizzler with french fries or vegetables. We won't tell your trainer if you went for the fries / الاختيار الصحي؟ يتم تتبيل ستيك لمة 24 ساعة ثم يقدم طازجاً مع البطاطس المقلية أو الخضار. لن نخبر مدربك إذا قررت تناول البطاطس المقلية",
    "rating": 5,
    "active": true
  },
  {
    "name": "FISH BASKET / سلة السمك",
    "price": "42",
    "numPrice": 42,
    "image": "https://loremflickr.com/480/360/fish%2Cbasket?lock=1",
    "desc": "Fried Fish with French Fries, nothing fancy... Just good ol' fish and chips. / سمك مقلي مع بطاطس مقلية، لا شيء خيالي ... عبارة عن سمك وبطاطس لذيذة",
    "rating": 5,
    "active": true
  },
  {
    "name": "CLASSIC CHICKEN MUSHROOM / دجاج تقليدي بالفطر",
    "price": "35",
    "numPrice": 35,
    "image": "https://loremflickr.com/480/360/classic%2Cchicken%2Cmushroom?lock=1",
    "desc": "Grilled Chicken with Mushroom sauce is our classic signature dish. Topped with creamy mushroom and olive oil, it is both healthy and great for sharing! / الدجاج المشوي مع صلصة الفطر هو طبقنا الكلاسيكي المميز. يقدم مغطى بالفطر الكريمي وزيت الزيتون، فهي صحية ورائعة للمشاركة!",
    "rating": 5,
    "active": true
  },
  {
    "name": "CHICKEN CORDON BLEU / كوردون بلو دجاج",
    "price": "42",
    "numPrice": 42,
    "image": "https://loremflickr.com/480/360/chicken%2Ccordon%2Cbleu?lock=1",
    "desc": "This classic dish features chicken breasts stuffed with thin slices of chicken and cheese that are then coated in breadcrumbs and pan-fried and is served with french fries. / يتميز هذا الطبق الكلاسيكي بصلر الدجاج المحشو بشرائح الدجاج والجبن الرفيعة التي تغطى بعد ذلك بفتات الخبز تقلى ثم تقدم مع البطاطس المقلية",
    "rating": 5,
    "active": true
  },
  {
    "name": "SIGNATURE TRUFFLE PASTA CHICKEN/VEG / مكرونة الفقع المميزة دجاج / خضار",
    "price": "35",
    "numPrice": 35,
    "image": "https://loremflickr.com/480/360/signature%2Ctruffle%2Cpasta%2Cchicken?lock=1",
    "desc": "Mama's favorite recipe going back generations with high quality truffle, creamy mamas alfredo white sauce and made with lots and lots of love! / الوصفة المفضلة لدى ماما تعود لأجيال مع فطر الفقع (الكمأة) عالي الجودة وصلصة ماماس الفريدو البيضاء الكريمية والمحضرة بالكثير والكثير من الحب!",
    "rating": 5,
    "active": true
  },
  {
    "name": "SNICKERS CHEESE CAKE / سنيكرز تشيز كيك",
    "price": "22",
    "numPrice": 22,
    "image": "https://loremflickr.com/480/360/snickers%2Ccheese%2Ccake?lock=1",
    "desc": "Rich Snickers flavored cheesecake",
    "rating": 5,
    "active": true
  },
  {
    "name": "RED VELVET CAKE WITH ICE CREAM / كعكة ريد فيلفيت مع آيس كريم",
    "price": "25",
    "numPrice": 25,
    "image": "https://loremflickr.com/480/360/red%2Cvelvet%2Ccake%2Cice?lock=1",
    "desc": "Classic red velvet cake served with vanilla ice cream",
    "rating": 5,
    "active": true
  },
  {
    "name": "SAFFRON MILK CAKE / كعكة حليب الزعفران",
    "price": "22",
    "numPrice": 22,
    "image": "https://loremflickr.com/480/360/saffron%2Cmilk%2Ccake?lock=1",
    "desc": "Soft sponge cake soaked in saffron infused milk",
    "rating": 5,
    "active": true
  },
  {
    "name": "LOTUS LAVA CAKE WITH ICE CREAM / كعكة لوتس لافا مع آيس كريم",
    "price": "25",
    "numPrice": 25,
    "image": "https://loremflickr.com/480/360/lotus%2Clava%2Ccake%2Cice?lock=1",
    "desc": "Warm Lotus lava cake served with vanilla ice cream",
    "rating": 5,
    "active": true
  },
  {
    "name": "SIZZLING BROWNIE WITH ICE CREAM / براوني الأزيز مع الآيس كريم",
    "price": "20",
    "numPrice": 20,
    "image": "https://loremflickr.com/480/360/sizzling%2Cbrownie%2Cice%2Ccream?lock=1",
    "desc": "Sizzling hot brownie topped with ice cream and chocolate sauce",
    "rating": 5,
    "active": true
  },
  {
    "name": "CHOCOLATE LAVA CAKE WITH ICE CREAM / كعكة الشوكولاته لافي مع آيس كريم",
    "price": "22",
    "numPrice": 22,
    "image": "https://loremflickr.com/480/360/chocolate%2Clava%2Ccake%2Cice?lock=1",
    "desc": "Molten chocolate lava cake topped with vanilla ice cream",
    "rating": 5,
    "active": true
  },
  {
    "name": "ICE CREAM SUNDAY 3 SCOOP / آيس كريم الأحد 3 سكوب",
    "price": "15",
    "numPrice": 15,
    "image": "https://loremflickr.com/480/360/ice%2Ccream%2Csunday?lock=1",
    "desc": "Three scoops of ice cream garnished with fresh fruit",
    "rating": 5,
    "active": true
  },
  {
    "name": "DOUBLE ESPRESSO / إسبرسو مزدوج",
    "price": "9",
    "numPrice": 9,
    "image": "https://loremflickr.com/480/360/double%2Cespresso?lock=1",
    "desc": "Rich double shot espresso",
    "rating": 5,
    "active": true
  },
  {
    "name": "CAFFE AMERICANO / كافيه أمريكانو",
    "price": "9",
    "numPrice": 9,
    "image": "https://loremflickr.com/480/360/caffe%2Camericano?lock=1",
    "desc": "Classic hot Americano coffee",
    "rating": 5,
    "active": true
  },
  {
    "name": "CAFFE MACCHIATO / كافيه ماكياتو",
    "price": "10",
    "numPrice": 10,
    "image": "https://loremflickr.com/480/360/caffe%2Cmacchiato?lock=1",
    "desc": "Espresso with a dash of milk foam",
    "rating": 5,
    "active": true
  },
  {
    "name": "CAPPUCCINO / كابتشينو",
    "price": "12",
    "numPrice": 12,
    "image": "https://loremflickr.com/480/360/cappuccino?lock=1",
    "desc": "Rich espresso topped with steamed milk foam",
    "rating": 5,
    "active": true
  },
  {
    "name": "CAFFE LATTE / كافيه لاتيه",
    "price": "12",
    "numPrice": 12,
    "image": "https://loremflickr.com/480/360/caffe%2Clatte?lock=1",
    "desc": "Smooth espresso blended with steamed milk",
    "rating": 5,
    "active": true
  },
  {
    "name": "FLAT WHITE / كافيه لاتيه",
    "price": "12",
    "numPrice": 12,
    "image": "https://loremflickr.com/480/360/flat%2Cwhite?lock=1",
    "desc": "Espresso with velvety steamed microfoam milk",
    "rating": 5,
    "active": true
  },
  {
    "name": "TURKISH COFFEE / قهوة تركية",
    "price": "10",
    "numPrice": 10,
    "image": "https://loremflickr.com/480/360/turkish%2Ccoffee?lock=1",
    "desc": "Traditional finely ground Turkish coffee",
    "rating": 5,
    "active": true
  },
  {
    "name": "BLACK TEA / شاي أسود",
    "price": "5",
    "numPrice": 5,
    "image": "https://loremflickr.com/480/360/black%2Ctea?lock=1",
    "desc": "Hot steeped black tea",
    "rating": 5,
    "active": true
  },
  {
    "name": "GREEN TEA / شاي أخضر",
    "price": "5",
    "numPrice": 5,
    "image": "https://loremflickr.com/480/360/green%2Ctea?lock=1",
    "desc": "Hot steeped green tea",
    "rating": 5,
    "active": true
  },
  {
    "name": "LOTUS MILKSHAKE / ملك شيك بسكويت اللوتس",
    "price": "20",
    "numPrice": 20,
    "image": "https://loremflickr.com/480/360/lotus%2Cmilkshake?lock=1",
    "desc": "Creamy milkshake blended with Lotus Biscoff",
    "rating": 5,
    "active": true
  },
  {
    "name": "FERRERO ROCHER / شوكولاتة فيرورو روش",
    "price": "20",
    "numPrice": 20,
    "image": "https://loremflickr.com/480/360/ferrero%2Crocher?lock=1",
    "desc": "Rich Ferrero Rocher hazelnut chocolate milkshake",
    "rating": 5,
    "active": true
  },
  {
    "name": "SNICKERS SHAKE / ميلك شيك سنيكرز",
    "price": "15",
    "numPrice": 15,
    "image": "https://loremflickr.com/480/360/snickers%2Cshake?lock=1",
    "desc": "Decadent Snickers peanut and caramel milkshake",
    "rating": 5,
    "active": true
  },
  {
    "name": "VANILLA MILKSHAKE / ملك شيك بالفانيلا",
    "price": "15",
    "numPrice": 15,
    "image": "https://loremflickr.com/480/360/vanilla%2Cmilkshake?lock=1",
    "desc": "Classic smooth vanilla milkshake",
    "rating": 5,
    "active": true
  },
  {
    "name": "STRAWBERRY MILKSHAKE / ملك شيك بالفرواله",
    "price": "15",
    "numPrice": 15,
    "image": "https://loremflickr.com/480/360/strawberry%2Cmilkshake?lock=1",
    "desc": "Sweet strawberry infused milkshake",
    "rating": 5,
    "active": true
  },
  {
    "name": "COOKIE CRUNCH + ICE CREAM / كوكو كرانش + ايس كريم",
    "price": "18",
    "numPrice": 18,
    "image": "https://loremflickr.com/480/360/cookie%2Ccrunch%2C%2B%2Cice?lock=1",
    "desc": "Cold drink with crunchy cookies and a scoop of ice cream",
    "rating": 5,
    "active": true
  },
  {
    "name": "MOCHA FRAPPE + ICE CREAM / موكا فرابيه + آيس كريم",
    "price": "18",
    "numPrice": 18,
    "image": "https://loremflickr.com/480/360/mocha%2Cfrappe%2C%2B%2Cice?lock=1",
    "desc": "Blended mocha frappe topped with ice cream",
    "rating": 5,
    "active": true
  },
  {
    "name": "VANILLA FRAPPE + ICE CREAM / فانيليا فرابيه + أيس كريم",
    "price": "18",
    "numPrice": 18,
    "image": "https://loremflickr.com/480/360/vanilla%2Cfrappe%2C%2B%2Cice?lock=1",
    "desc": "Blended vanilla frappe topped with ice cream",
    "rating": 5,
    "active": true
  },
  {
    "name": "CARAMEL FRAPPE + ICE CREAM / كراميل فرابيه + أيس كريم",
    "price": "18",
    "numPrice": 18,
    "image": "https://loremflickr.com/480/360/caramel%2Cfrappe%2C%2B%2Cice?lock=1",
    "desc": "Blended caramel frappe topped with ice cream",
    "rating": 5,
    "active": true
  },
  {
    "name": "COLD COFFEE + ICE CREAM / قهوة باردة مع أيس كريم",
    "price": "15",
    "numPrice": 15,
    "image": "https://loremflickr.com/480/360/cold%2Ccoffee%2C%2B%2Cice?lock=1",
    "desc": "Chilled coffee blend served with a scoop of ice cream",
    "rating": 5,
    "active": true
  },
  {
    "name": "CAPPUCCINO ICED COFFEE / قهوة كابتشينو مثلجة",
    "price": "12",
    "numPrice": 12,
    "image": "https://loremflickr.com/480/360/cappuccino%2Ciced%2Ccoffee?lock=1",
    "desc": "Refreshing iced cappuccino",
    "rating": 5,
    "active": true
  },
  {
    "name": "ICED LATTE / مثلج لاتيه",
    "price": "12",
    "numPrice": 12,
    "image": "https://loremflickr.com/480/360/iced%2Clatte?lock=1",
    "desc": "Chilled espresso and milk over ice",
    "rating": 5,
    "active": true
  },
  {
    "name": "ICED TEA / شاي مثلج",
    "price": "12",
    "numPrice": 12,
    "image": "https://loremflickr.com/480/360/iced%2Ctea?lock=1",
    "desc": "Refreshing chilled iced tea",
    "rating": 5,
    "active": true
  },
  {
    "name": "STRAWBERRY MOJITO / موهيتو فراولة",
    "price": "12",
    "numPrice": 12,
    "image": "https://loremflickr.com/480/360/strawberry%2Cmojito?lock=1",
    "desc": "Fizzy strawberry mojito with fresh mint and lime",
    "rating": 5,
    "active": true
  },
  {
    "name": "RASPBERRY MOJITO / موهيتو توت العليق",
    "price": "15",
    "numPrice": 15,
    "image": "https://loremflickr.com/480/360/raspberry%2Cmojito?lock=1",
    "desc": "Chilled raspberry mojito with lime and mint",
    "rating": 5,
    "active": true
  },
  {
    "name": "BLUEBERRY MOJITO / موهيتو توت أزرق",
    "price": "12",
    "numPrice": 12,
    "image": "https://loremflickr.com/480/360/blueberry%2Cmojito?lock=1",
    "desc": "Refreshing blueberry mojito",
    "rating": 5,
    "active": true
  },
  {
    "name": "MIXED BERRY MOJITO / موهيتو بيري مشكل",
    "price": "15",
    "numPrice": 15,
    "image": "https://loremflickr.com/480/360/mixed%2Cberry%2Cmojito?lock=1",
    "desc": "Blend of fresh berries in a sparkling mojito",
    "rating": 5,
    "active": true
  },
  {
    "name": "LEMON MINT MOJITO / موهيتو ليمون نعناع",
    "price": "12",
    "numPrice": 12,
    "image": "https://loremflickr.com/480/360/lemon%2Cmint%2Cmojito?lock=1",
    "desc": "Classic zesty lemon and fresh mint mojito",
    "rating": 5,
    "active": true
  },
  {
    "name": "TRUFFLE FRIES WITH MUSHROOM SAUCE / بطاطس مقلية بالفقع مع صلصة الفطر",
    "price": "20",
    "numPrice": 20,
    "image": "https://loremflickr.com/480/360/truffle%2Cfries%2Cmushroom%2Csauce?lock=1",
    "desc": "Mushroom sauce with a hint of truffle oil, it's a signature dish! / صلصة الفطر مع قليل من زيت الفقع (الكمأة) . طبق مطعمنا الخاص بنا!",
    "rating": 5,
    "active": true
  },
  {
    "name": "CHEESE FRIES / بطاطس مقلية بالجبنة",
    "price": "12",
    "numPrice": 12,
    "image": "https://loremflickr.com/480/360/cheese%2Cfries?lock=1",
    "desc": "Fried to perfection and oozing with mozzarella goodness. This is not to be missed! / مقلية بأفضل الطرق محشوة بجبن الموزاريلا. لا ينبغي تفويتها!",
    "rating": 5,
    "active": true
  },
  {
    "name": "CURLY CHEESE FRIES / بطاطس مقلية كيرلي بالجبنة",
    "price": "14",
    "numPrice": 14,
    "image": "https://loremflickr.com/480/360/curly%2Ccheese%2Cfries?lock=1",
    "desc": "Cheesy cheddar goodness with twister curly fries homemade style / روعة جبنة الشيدر مع بطاطا كيرلي على طريقة البيت",
    "rating": 5,
    "active": true
  },
  {
    "name": "BEEF CHILLI FRIES / بطاطس تشيلي باللحم",
    "price": "20",
    "numPrice": 20,
    "image": "https://loremflickr.com/480/360/beef%2Cchilli%2Cfries?lock=1",
    "desc": "Cheesy fries take a new meaning with minced chilli beef and mozzarella and parmesan. / تأخذ البطاطس المقلية معنى جديداً مع اللحم البقري المفروم والموزاريلا وجبنة بارميزان.",
    "rating": 5,
    "active": true
  },
  {
    "name": "FIRE FRIES / فاير فرايز",
    "price": "12",
    "numPrice": 12,
    "image": "https://loremflickr.com/480/360/fire%2Cfries?lock=1",
    "desc": "Sriracha Fries with Spicy Cheese - Feel the tangy and spicy flavor with our power packed fries! / (بطاطس سيراتشا) بالجبنة الحارة - ستشعر بالانتعاش بفضل نكهة البطاطس المقلية الحارة!",
    "rating": 5,
    "active": true
  },
  {
    "name": "ONION RINGS / حلقات البصل",
    "price": "12",
    "numPrice": 12,
    "image": "https://loremflickr.com/480/360/onion%2Crings?lock=1",
    "desc": "08 Pcs with Classic Sauce / 8 قطع مع صوص كلاسيك",
    "rating": 5,
    "active": true
  },
  {
    "name": "DORITOS CHICKEN STRIPS / شرائح دجاج دوريتوس",
    "price": "25",
    "numPrice": 25,
    "image": "https://loremflickr.com/480/360/doritos%2Cchicken%2Cstrips?lock=1",
    "desc": "Chicken tenders infused with doritos and fried to perfection served with French Fries and Mustard Sauce / تندرز دجاج مملوءة بدوريتوس ومقلية بإتقان تقدم مع بطاطس مقلية وصلصة الخردل",
    "rating": 5,
    "active": true
  },
  {
    "name": "CHEETOS CHICKEN STRIPS / شرائح دجاج شيتوس",
    "price": "25",
    "numPrice": 25,
    "image": "https://loremflickr.com/480/360/cheetos%2Cchicken%2Cstrips?lock=1",
    "desc": "Chicken tenders infused with cheetos and fried to perfection served with French Fries and Mustard Sauce / تندرز دجاج مملوءة بالشيتوس ومقلية بإتقان تقدم مع بطاطس مقلية وصلصة الخردل",
    "rating": 5,
    "active": true
  },
  {
    "name": "SHRIMP DYNAMITE / ديناميت الروبيان",
    "price": "30",
    "numPrice": 30,
    "image": "https://loremflickr.com/480/360/shrimp%2Cdynamite?lock=1",
    "desc": "Crispy shrimp coated with rich creamy Sriracha mayo and cooked to perfection with an Italian twist of garlic, herb and Mama's secret sauce. / روبيان مقرمش مغطى بمايونيز سيراتشا الكريمي الغني ومطبوخ بإتقان مع لمسة إيطالية من الثوم والأعشاب وصلصة ماما السرية.",
    "rating": 5,
    "active": true
  },
  {
    "name": "CHICKEN NUGGETS WITH FRIES",
    "price": "15",
    "numPrice": 15,
    "image": "https://loremflickr.com/480/360/chicken%2Cnuggets%2Cfries?lock=1",
    "desc": "Crispy chicken nuggets served with golden French fries and dipping sauce.",
    "rating": 5,
    "active": true
  },
  {
    "name": "ITALIAN GARLIC BREAD / خبز إيطالي بالثوم",
    "price": "9",
    "numPrice": 9,
    "image": "https://loremflickr.com/480/360/italian%2Cgarlic%2Cbread?lock=1",
    "desc": "The bread that made us famous! Freshly baked and as simple as it gets! / إنه الخبز الذي جعلنا مشهورين! طازجة وبسيطة كما يجب أن يكون!",
    "rating": 5,
    "active": true
  },
  {
    "name": "BRUSCHETTA / بروشيتا",
    "price": "12",
    "numPrice": 12,
    "image": "https://loremflickr.com/480/360/bruschetta?lock=1",
    "desc": "This classic Italian appetizer uses toasted Italian bread rubbed with garlic. It's then topped with a heavenly diced tomato medley including basil and balsamic vinegar / مقبلات إيطالية كلاسيكية، تستخدم خبز إيطالي محمص مفروك بالثوم، ثم تعلوها طماطم مقطعة مع إضافة القليل من الريحان والخل البلسمي",
    "rating": 5,
    "active": true
  },
  {
    "name": "CALZONE / كالزون",
    "price": "19",
    "numPrice": 19,
    "image": "https://loremflickr.com/480/360/calzone?lock=1",
    "desc": "Pizza Sandwich - The king of sandwiches! Contains tomato, mozzarella, Salami, Chicken, Mushroom and capsicum / ساندوتش بيتزا - ملك السندويشات! يحتوي على طماطم وجبن موزاربلا، سلامي، دجاج، مشروم وفلفل",
    "rating": 5,
    "active": true
  },
  {
    "name": "CHICKEN TANDOORI / دجاج تندوري",
    "price": "19",
    "numPrice": 19,
    "image": "https://loremflickr.com/480/360/chicken%2Ctandoori?lock=1",
    "desc": "A local delicacy inspired by our customers. This pizza is not to be missed. Bursting with spices, tomatoes, mozzarella, mushroom and tandoori chicken. / طعام شهي محلي مستوحى من زبائننا، هذه البيتزا لا ينبغي تفويتها، مليئة بالتوابل والطماطم والموتزاريلا والفطر ودجاج التندوري.",
    "rating": 5,
    "active": true
  },
  {
    "name": "PIZZA HAWAII / بيتزا هاواي",
    "price": "19",
    "numPrice": 19,
    "image": "https://loremflickr.com/480/360/pizza%2Chawaii?lock=1",
    "desc": "Back by popular demand! Pineapples, Pepperoni, Mozzarella and Tomato / بعد المطالبات الشعبية ... هنا مجدداً! أناناس، بيبيروني، موزاربلا وطماطم",
    "rating": 5,
    "active": true
  },
  {
    "name": "PEPPERONI / بيبيروني",
    "price": "19",
    "numPrice": 19,
    "image": "https://loremflickr.com/480/360/pepperoni?lock=1",
    "desc": "One of our all time favorites, a double meat combination of pepperoni and mozzarella cheese. / واحدة من المفضلات لدينا على الإطلاق، مزيج مزدوج من لحم البيبيروني وجبنة الموزاريلا.",
    "rating": 5,
    "active": true
  },
  {
    "name": "HOT DOG PIZZA / بيتزا هوت دوغ",
    "price": "19",
    "numPrice": 19,
    "image": "https://loremflickr.com/480/360/hot%2Cdog%2Cpizza?lock=1",
    "desc": "Al Wurstel Pizza with Chips Oman - A Sharjah Local delicacy Chicken hotdog sausages with mozzarella and marinara with Chips Oman as a topping / بيتزا أي ورستل مع شيبس عمان - نقانق هوت دوغ دجاج محلية و شهية بالشارقة مع جبن الموزاريلا المارينارا مع شيبس عمان كإضافة.",
    "rating": 5,
    "active": true
  },
  {
    "name": "DELIZIOSA / ديليز يوزا",
    "price": "19",
    "numPrice": 19,
    "image": "https://loremflickr.com/480/360/deliziosa?lock=1",
    "desc": "Literally means delicious! A medley of fresh ingredients with diced tomatoes, mozzarella, mushrooms, green olives, chicken and capsicum. / تعني حرفياً لذيذاً! مزيج من المكونات الطازجة مع مكعبات الطماطم وجبن الموزاريلا والفطر والزيتون الأخضر والدجاج والفليفلة.",
    "rating": 5,
    "active": true
  },
  {
    "name": "SAPORITA / سابوريتا",
    "price": "19",
    "numPrice": 19,
    "image": "https://loremflickr.com/480/360/saporita?lock=1",
    "desc": "Italian for Tasty. You can't go wrong with this one. Filled with Tomato, mozzarella, capsicum, beef and black olives / الإيطالية اللذيذة. لا يمكنك أن تخطئ في هذا، محشوة بالطماطم، موزاربلا، فليفلة، لحم بقري و زيتون أسود.",
    "rating": 5,
    "active": true
  },
  {
    "name": "PIZZA TONNO / بيتزا تونا",
    "price": "19",
    "numPrice": 19,
    "image": "https://loremflickr.com/480/360/pizza%2Ctonno?lock=1",
    "desc": "Tuna Pizza - Tomato, Mozzarella, Tuna and Onion / بيتزا تونا - طماطم، موزاربلا، تونة وبصل",
    "rating": 5,
    "active": true
  },
  {
    "name": "FUNGHI E POLLO / فونغي إي بولو",
    "price": "36",
    "numPrice": 36,
    "image": "https://loremflickr.com/480/360/funghi%2Ce%2Cpollo?lock=1",
    "desc": "Mushroom and Chicken Pasta - Chicken, Mushroom and your favorite creamy sauce / مكرونة الفطر والدجاج - دجاج، فطر و صوص الكريمة المفضلة",
    "rating": 5,
    "active": true
  },
  {
    "name": "DELLA NONNA / ديلا نونا",
    "price": "34",
    "numPrice": 34,
    "image": "https://loremflickr.com/480/360/della%2Cnonna?lock=1",
    "desc": "Veg. Alfredo Creamy Pasta - Vegetables in a rich creamy sauce / مكرونة ألفريدو النباتية مع الكريمية - خضروات بصلصة كريمية غنية",
    "rating": 5,
    "active": true
  },
  {
    "name": "SPICY SAUSAGES / مكرونة سجق حار",
    "price": "35",
    "numPrice": 35,
    "image": "https://loremflickr.com/480/360/spicy%2Csausages?lock=1",
    "desc": "Hot Dog Pasta - Fresh Tomato Sauce & Spicy Sausages / مكرونة هوت دووج - صلصة الطماطم الطازجة والنقانق الحارة",
    "rating": 5,
    "active": true
  },
  {
    "name": "CHASNI PASTA / مكرونة شاسني",
    "price": "37",
    "numPrice": 37,
    "image": "https://loremflickr.com/480/360/chasni%2Cpasta?lock=1",
    "desc": "Indian Inspired Pasta - Bursting with indian and local flavors it contains chicken, mortadella in red and white sauce / مكرونة مستوحاة من الهند - غني بالنكهات الهندية والمحلية يحتوي على دجاج ومرتديلا مع الصلصة الحمراء والبيضاء.",
    "rating": 5,
    "active": true
  },
  {
    "name": "CHICKEN ALFREDO / دجاج الفريدو",
    "price": "37",
    "numPrice": 37,
    "image": "https://loremflickr.com/480/360/chicken%2Calfredo?lock=1",
    "desc": "Rich creamy white sauce bursting with Italian herbs, tender chicken and mushrooms / صوص كريمي أبيض غني بالأعشاب الإيطالية ودجاج طري مع الفطر الطازج",
    "rating": 5,
    "active": true
  },
  {
    "name": "POMODORO / بومودورو",
    "price": "34",
    "numPrice": 34,
    "image": "https://loremflickr.com/480/360/pomodoro?lock=1",
    "desc": "Tomato Pasta - Rich thick tomato with Italian special sauce. / مكرونة الطماطم - صلصة طماطم سميكة غنية مع الصلصة الايطالية الخاصة.",
    "rating": 5,
    "active": true
  },
  {
    "name": "PINK SAUCE PASTA / مكرونة بينك سوس",
    "price": "35",
    "numPrice": 35,
    "image": "https://loremflickr.com/480/360/pink%2Csauce%2Cpasta?lock=1",
    "desc": "Italian Pizza Special - Our signature pasta dish with both red and white sauce mixed. Chicken and mushrooms and a touch of magic. This one is not to be missed. / بيتزا ايطالية خاصة - طبق الباستا المميز لدينا مع مزيج من الصلصة الحمراء والبيضاء، بالإضافة إلى الدجاج والفطر مع لمسة سحرية، لا ينبغي تفويتها أبداً",
    "rating": 5,
    "active": true
  },
  {
    "name": "ARRABBIATA / أرابياتا",
    "price": "35",
    "numPrice": 35,
    "image": "https://loremflickr.com/480/360/arrabbiata?lock=1",
    "desc": "Homemade spicy Italian sauce with vegetables and mushrooms. / صلصة إيطالية حارة منزلية مع الخضار والفطر.",
    "rating": 5,
    "active": true
  },
  {
    "name": "CAESAR SALAD / سلطة سيزر",
    "price": "20",
    "numPrice": 20,
    "image": "https://loremflickr.com/480/360/caesar%2Csalad?lock=1",
    "desc": "Iceberg Lettuce, sliced tomato, Capsicum, grilled chicken and Caesar Dressing. Served with Italian Bread. / خس ايسبرغ، شرائح طماطم، فليفلة، دجاج مشوي و صوص سيزر، تقدم مع خبز إيطالي.",
    "rating": 5,
    "active": true
  },
  {
    "name": "GREEK SALAD / سلطة يونانية",
    "price": "17",
    "numPrice": 17,
    "image": "https://loremflickr.com/480/360/greek%2Csalad?lock=1",
    "desc": "Lettuce, grated carrot, capsicum, tomato, black olives, feta cheese and olive oil and boiled egg. Served with Italian Bread. / خس، جزر مبشور، فلفل، طماطم، زيتون أسود، جبنة فيتا و زيت زيتون و بيض مسلوق. تقدم مع خبز إيطالي.",
    "rating": 5,
    "active": true
  },
  {
    "name": "ITALIAN PASTA SALAD / سلطة المكرونة الإيطالية",
    "price": "15",
    "numPrice": 15,
    "image": "https://loremflickr.com/480/360/italian%2Cpasta%2Csalad?lock=1",
    "desc": "Our signature salad with penne, pesto, olives, grilled chicken and olive oil. / سلطتنا المميزة مع البيني والبستو والزيتون والدجاج المشوي وزيت الزيتون.",
    "rating": 5,
    "active": true
  },
  {
    "name": "BAKED SWEET POTATO SALAD / سلطة البطاطا الحلوة المخبوزة",
    "price": "17",
    "numPrice": 17,
    "image": "https://loremflickr.com/480/360/baked%2Csweet%2Cpotato%2Csalad?lock=1",
    "desc": "Sweet Potato, beetroot mixed lettuce and garnished with almond flakes and honey mustard sauce / بطاطا حلوة، خس و شمندر مشكل مزينة برقائق اللوز وصلصة خردل بالعسل.",
    "rating": 5,
    "active": true
  },
  {
    "name": "BALSAMIC ITALIAN SALAD / سلطة بلسميك إيطالية",
    "price": "15",
    "numPrice": 15,
    "image": "https://loremflickr.com/480/360/balsamic%2Citalian%2Csalad?lock=1",
    "desc": "Red Cabbage, iceberg salad and shredded vegetables garnished with feta cheese / ملفوف أحمر، سلطة أيس بيرج وخضروات مبشورة مزينة بجبنة الفيتا.",
    "rating": 5,
    "active": true
  },
  {
    "name": "ITALIAN FATTOUSH SALAD / سلطة فتوش ايطالية",
    "price": "15",
    "numPrice": 15,
    "image": "https://loremflickr.com/480/360/italian%2Cfattoush%2Csalad?lock=1",
    "desc": "Crispy Arabic baked twirls, lettuce, cucumber, tomato, capsicum and mint parsley. / خبز عربي مقرمش، خس، خيار، طماطم، فلفل، بقدونس ونعناع.",
    "rating": 5,
    "active": true
  }
];

function getCategory(item) {
  const text = (item.name + " " + item.desc).toLowerCase();
  if (text.includes('burger')) return 'burgers';
  if (text.includes('pizza') || text.includes('calzone') || text.includes('pepperoni') || text.includes('deliziosa') || text.includes('saporita')) return 'pizzas';
  if (text.includes('pasta') || text.includes('lasagna') || text.includes('alfredo') || text.includes('bolognese') || text.includes('pomodoro') || text.includes('arrabbiata') || text.includes('funghi e pollo') || text.includes('della nonna')) return 'pastas';
  if (text.includes('sandwich')) return 'sandwiches';
  if (text.includes('soup') || text.includes('creamy mushroom') || text.includes('rich tomato basil')) return 'soups';
  if (text.includes('salad')) return 'salads';
  if (text.includes('fries') || text.includes('onion rings') || text.includes('strips') || text.includes('nuggets') || text.includes('garlic bread') || text.includes('bruschetta') || text.includes('shrimp')) return 'appetizers';
  if (text.includes('cake') || text.includes('ice cream') || text.includes('brownie')) return 'desserts';
  if (text.includes('coffee') || text.includes('tea') || text.includes('espresso') || text.includes('caffe') || text.includes('cappuccino') || text.includes('latte') || text.includes('mojito') || text.includes('shake') || text.includes('frappe')) return 'drinks';

  return 'specialties';
}

async function seed() {
  const API_URL = 'https://repository-nine-navy.vercel.app/api';
  for (const item of items) {
    try {
      const category = getCategory(item);
      const res = await fetch(`${API_URL}/menu`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, category, price: `$${item.price}` })
      });
      const data = await res.json();
      console.log(`Added [${category}]:`, data.name || data);
    } catch (err) {
      console.error('Failed to add:', item.name, err);
    }
  }
}

seed();
