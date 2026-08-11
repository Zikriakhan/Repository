const breakfastItems = [
  {
    name: "SPANISH BREAKFAST / الفطور الإسباني",
    price: "$30.00",
    numPrice: 30,
    image: "https://res.cloudinary.com/um3irlrh/image/upload/v1786177913/Gemini_Generated_Image_y71yumy71yumy71y_mctxhn.png",
    desc: "Rustic Spanish style omelet with wholesome goodness of mushrooms, chopped tomatoes, green chilies and served with Mushroom Sauce, Sausages and Italian Garlic Bread. / أوملت على الطريقة الإسبانية الريفية مع الفطر والطماطم المفرومة والفلفل الأخضر وتقدم مع صلصة الفطر والنقانق وخبز الثوم الإيطالي.",
    rating: 5,
    active: true
  },
  {
    name: "ENGLISH BREAKFAST / الفطور الإنجليزي",
    price: "$32.00",
    numPrice: 32,
    image: "https://res.cloudinary.com/um3irlrh/image/upload/v1786177909/Gemini_Generated_Image_1o5gds1o5gds1o5g_1_nq9mte.png",
    desc: "Eggs served any style with crispy sausages, fresh mushrooms, sizzling beef bacon and butter.Served with tea or Coffee. / يتم تقديم البيض مع النقانق المقرمشة والفطر الطازج واللحم المقدد والزبدة.تقدم مع الشاي أو القهوة.",
    rating: 5,
    active: true
  },
  {
    name: "BAKED CROISSANT & CHEESE OMELETTE / كرواسون طازج مع جبنة أومليت",
    price: "$15.00",
    numPrice: 15,
    image: "https://res.cloudinary.com/um3irlrh/image/upload/v1786177918/Gemini_Generated_Image_gx9z8pgx9z8pgx9z_qlpad5.png",
    desc: "Fresh out of the oven croissant with Italian omelet, mushroom and cheese infused delight makes for the perfect start to the day! / كرواسون طازج من الفرن مع أوملت إيطالي، مملوءة بالفطر والجبنة لتجعل يومك ذو بداية مثالية!",
    rating: 5,
    active: true
  },
  {
    name: "ITALIAN PIZZA BREAKFAST / فطور البيتزا الإيطالي",
    price: "$25.00",
    numPrice: 25,
    image: "https://res.cloudinary.com/um3irlrh/image/upload/v1786177922/Gemini_Generated_Image_54cs9454cs9454cs_xvccas.png",
    desc: "The ultimate delicacy! Omelette infused with fresh mozzarella, mushrooms, tomatoes and cooked to perfection.Served with Italian Garlic Bread and Sausages. / إنها النعومة الفائقة أومليت ممزوج بجبنة الموزاريلا الطازجة مع الفطر والطماطم، مطبوخة بإتقان تام، تقدم مع خبز الثوم الإيطالي والنقانق.",
    rating: 5,
    active: true
  },
  {
    name: "CRISPY FRENCH TOAST WITH CREAM / توست فرنسي مقرمش مع كريمة",
    price: "$20.00",
    numPrice: 20,
    image: "https://res.cloudinary.com/um3irlrh/image/upload/v1786177915/Gemini_Generated_Image_22llom22llom22ll_uonzvw.png",
    desc: "Enjoy our delicious French toast, flavored with a touch of cinnamon and nutmeg.Set beneath a mountain of fruit and freshly whipped cream, this is a legendary way to start the day! Served with fresh fruit and tea or coffee. / استمتع بالتوسط الفرنسي اللذيذ بنكهة القرفة وجوزة الطيب، موضوعة تحت جيل ضخم من الفاكهة والكريمة المخفوقة الطازجة.إنها حقاً طريقة أسطورية لبدء اليوم! تقدم مع فواكه طازجة وشاي أو قهوة.",
    rating: 5,
    active: true
  },
  {
    name: "HEALTHY EGG WHITE OMELETTE / أومليت بياض البيض الصحي",
    price: "$20.00",
    numPrice: 20,
    image: "https://res.cloudinary.com/um3irlrh/image/upload/v1786177917/Gemini_Generated_Image_3jkor33jkor33jko_qrdkyy.png",
    desc: "Fresh Fluffy Egg Whites served with your favorite Italian garlic bread and butter or jam. / بياض بيض رقيق طازج يقدم مع خبز الثوم الإيطالي المفضل مع الزبدة أو المربى.",
    rating: 5,
    active: true
  }
];

async function seed() {
  const API_URL = 'https://repository-nine-navy.vercel.app/api';
  for (const item of breakfastItems) {
    try {
      const res = await fetch(`${API_URL}/menu`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, category: 'breakfast' })
      });
      const data = await res.json();
      console.log('Added:', data.name || data);
    } catch (err) {
      console.error('Failed to add:', item.name, err);
    }
  }
}

seed();