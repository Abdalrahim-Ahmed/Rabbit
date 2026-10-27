/**
 * Rabbit E-Commerce Shared Application Logic
 * Supports cart persistence, slide-over cart drawer, toasts, and navigation.
 */

// Cart state in LocalStorage
const CART_STORAGE_KEY = 'rabbit_cart_items';
const WISHLIST_STORAGE_KEY = 'rabbit_wishlist_items';

const arabicTranslations = {
  'Rabbit | Good Food Closer to You': 'رابيت | طعام طازج أقرب إليك',
  'Fresh Produce | Rabbit Everyday Essentials': 'خضروات وفواكه طازجة | أساسيات رابيت اليومية',
  "Today's Deals | Rabbit": 'عروض اليوم | رابيت',
  'Help & FAQs | Rabbit Support Center': 'المساعدة والأسئلة الشائعة | مركز دعم رابيت',
  'How Rabbit Works | From Browsing to Delivery': 'كيف تعمل رابيت | من التصفح إلى التوصيل',
  'About Rabbit | Good Food Brings Us Together': 'عن رابيت | الطعام الطازج يجمعنا',
  '404 Page Not Found | Rabbit': 'الصفحة غير موجودة | رابيت',
  "Lay's Potato Chips | Rabbit": 'رقائق بطاطس ليز | رابيت',
  'Shop': 'تسوّق',
  'Categories': 'الأقسام',
  'Deals': 'العروض',
  'How it works': 'كيف تعمل الخدمة',
  'About': 'عن Rabbit',
  'Help': 'المساعدة',
  'Help / FAQ': 'المساعدة والأسئلة الشائعة',
  'Home': 'الرئيسية',
  'Order Now': 'اطلب الآن',
  'menu': 'menu',
  'Shop the deals': 'تسوّق العروض',
  'Good Food': 'طعام طازج',
  'Closer to You': 'أقرب إليك',
  'Fresh groceries, snacks, drinks and more delivered faster, at better prices.': 'خضروات وفواكه طازجة، ووجبات خفيفة، ومشروبات، والمزيد، تصلك بسرعة وبأفضل الأسعار.',
  'FRESH': 'طازج',
  'DEALS': 'عروض',
  'EVERYDAY!': 'كل يوم!',
  'Fast Delivery': 'توصيل سريع',
  'Under 30-60 mins': 'خلال 30–60 دقيقة',
  'Great Prices': 'أسعار رائعة',
  'Daily top offers': 'أفضل العروض يوميًا',
  'Wide Selection': 'تشكيلة واسعة',
  'Over 3,000 items': 'أكثر من ٣٬٠٠٠ منتج',
  'Trusted by Thousands': 'موثوق بها من الآلاف',
  '5-star customer rating': 'تقييم ٥ نجوم من العملاء',
  'Summer Deals': 'عروض الصيف',
  'Up to 40% OFF on selected products': 'خصم يصل إلى ٤٠٪ على منتجات مختارة',
  'Shop now': 'تسوّق الآن',
  'Your Daily Essentials Delivered Faster': 'احتياجاتك اليومية تصلك أسرع',
  'Watch video': 'شاهد الفيديو',
  'Shop by Category': 'تسوّق حسب القسم',
  'See all categories': 'عرض كل الأقسام',
  'Fresh Produce': 'خضروات وفواكه طازجة',
  'Dairy & Eggs': 'ألبان وبيض',
  'Snacks & Sweets': 'وجبات خفيفة وحلويات',
  'Drinks': 'مشروبات',
  'Bakery': 'مخبوزات',
  'Personal Care': 'عناية شخصية',
  'Home Essentials': 'مستلزمات المنزل',
  'Featured Deals': 'عروض مميزة',
  'See all deals': 'عرض كل العروض',
  'Coca-Cola Original': 'كوكاكولا أصلي',
  'Lay\'s Potato Chips': 'رقائق بطاطس ليز',
  'Lay\'s Potato Chips 170g': 'رقائق بطاطس ليز ١٧٠ جم',
  'Lay\'s Chips': 'رقائق ليز',
  'Oreo Biscuits': 'بسكويت أوريو',
  'Juhayna Full Cream Milk': 'لبن جهينة كامل الدسم',
  'Nutella Chocolate Spread': 'سبريد شوكولاتة نوتيلا',
  'Fairy Dishwashing Liquid': 'سائل غسيل الأطباق فيري',
  'Dettol Hand Wash': 'غسول اليدين ديتول',
  'Kleenex Tissues': 'مناديل كلينكس',
  'Aquafina Water': 'مياه أكوافينا',
  'Nemo Chips': 'شيبسي نيمو',
  'Nescafe Classic': 'نسكافيه كلاسيك',
  'Huggies Pants L40': 'حفاضات هجيز مقاس كبير × ٤٠',
  'Pringles Original': 'برينجلز أصلي',
  'Doritos Nacho Cheese': 'دوريتوس بنكهة الناتشو والجبن',
  'Chipsy Family Pack': 'شيبسي عبوة عائلية',
  'Twinkies Bites': 'توينكيز بايتس',
  'Sprite Zero': 'سبرايت زيرو',
  'Kiri Cream Cheese': 'جبنة كيري كريمية',
  'Yoplait Vanilla Yogurt': 'زبادي يوبليه بالفانيليا',
  'Fino Sliced White Bread': 'خبز فينو أبيض شرائح',
  'Coca-Cola': 'كوكاكولا',
  'Strawberries': 'فراولة',
  'Greek Yogurt': 'زبادي يوناني',
  'Free Range Eggs': 'بيض بلدي',
  'Sourdough Bread': 'خبز ساوردو',
  'Sparkling Water': 'مياه فوارة',
  'Cherry Tomatoes': 'طماطم كرزية',
  'Banana': 'موز',
  'Fresh Tomatoes': 'طماطم طازجة',
  'Lettuce': 'خس',
  'Cucumbers': 'خيار',
  'Potatoes': 'بطاطس',
  'Carrots': 'جزر',
  'Oranges': 'برتقال',
  'Bell Pepper': 'فلفل ألوان',
  'Lemons': 'ليمون',
  '1 piece': 'قطعة واحدة',
  'Zucchini': 'كوسة',
  'Red Onions': 'بصل أحمر',
  'Onions': 'بصل',
  'Same essentials': 'نفس الاحتياجات',
  'Happier days': 'وأيام أسعد',
  'Get your daily fruit, dairy, and pantry goods delivered fast, fresh, and wrapped with care.': 'اطلب الفاكهة ومنتجات الألبان ومستلزمات مطبخك اليومية لتصلك طازجة وسريعًا بعناية.',
  'Explore more': 'اكتشف المزيد',
  'Why Choose Rabbit?': 'لماذا تختار رابيت؟',
  'All your essential groceries and snacks in one convenient place.': 'كل احتياجاتك من البقالة والوجبات الخفيفة في مكان واحد.',
  'Better Prices': 'أسعار أفضل',
  'Great daily deals and discount guarantees on all top brands.': 'عروض يومية رائعة وخصومات مضمونة على أشهر العلامات التجارية.',
  'Faster Delivery': 'توصيل أسرع',
  'Bringing your fresh orders directly to your door in minutes.': 'نوصّل طلباتك الطازجة إلى باب منزلك خلال دقائق.',
  'Loved by real customers with 5-star ratings across all cities.': 'يحظى بثقة عملائنا وتقييماتهم بخمس نجوم في مختلف المدن.',
  'Everyday essentials delivered faster at better prices.': 'احتياجاتك اليومية تصلك أسرع وبأسعار أفضل.',
  'Everyday essentials delivered faster at better prices across Egypt.': 'احتياجاتك اليومية تصلك أسرع وبأسعار أفضل في جميع أنحاء مصر.',
  "Rabbit is Egypt's leading ultra-fast grocery delivery app. Everyday essentials, snacks, fresh food and beverages delivered directly to your doorstep in minutes.": 'رابيت من أسرع تطبيقات توصيل البقالة في مصر. احتياجاتك اليومية والوجبات الخفيفة والأطعمة الطازجة والمشروبات تصلك إلى باب منزلك خلال دقائق.',
  "Rabbit is Egypt's leading ultra-fast grocery delivery app. Fresh produce, everyday essentials, and more — delivered to your door in minutes.": 'رابيت من أسرع تطبيقات توصيل البقالة في مصر. خضروات وفواكه طازجة واحتياجات يومية والمزيد، تصلك إلى باب منزلك خلال دقائق.',
  "Rabbit is Egypt's leading ultra-fast grocery delivery app. Get fresh produce, snacks, beverages, and essentials delivered to your door in 30–40 minutes.": 'رابيت من أسرع تطبيقات توصيل البقالة في مصر. اطلب الخضروات والفواكه الطازجة والوجبات الخفيفة والمشروبات والاحتياجات اليومية لتصلك خلال ٣٠–٤٠ دقيقة.',
  'Pages': 'روابط مهمة',
  'Company': 'الشركة',
  'Get the App': 'حمّل التطبيق',
  'Download on the': 'حمّله من',
  'Get it on': 'حمّله من',
  'GET IT ON': 'حمّله من',
  '© 2026 Rabbit Fast Commerce Inc. All rights reserved.': '© ٢٠٢٦ رابيت للتجارة السريعة. جميع الحقوق محفوظة.',
  'Home': 'الرئيسية',
  'Fresh Produce': 'خضروات وفواكه طازجة',
  "Today's Deals": 'عروض اليوم',
  'Product Details': 'تفاصيل المنتج',
  'About Us': 'من نحن',
  'How Rabbit Works': 'كيف تعمل رابيت',
  'Help & FAQs': 'المساعدة والأسئلة الشائعة',
  '404 Demo Page': 'صفحة الخطأ 404',
  'Careers': 'الوظائف',
  'Contact Support': 'تواصل مع الدعم',
  'Rabbit is Egypt’s leading ultra-fast grocery delivery app. Everyday essentials, snacks, fresh food and beverages delivered directly to your doorstep in minutes.': 'رابيت من أسرع تطبيقات توصيل البقالة في مصر. احتياجاتك اليومية والوجبات الخفيفة والأطعمة الطازجة والمشروبات تصلك إلى باب منزلك خلال دقائق.',
  'Today\'s': 'عروض',
  'Today\'s Deals': 'عروض اليوم',
  '03. Today\'s Deals': '٠٣. عروض اليوم',
  'Handpicked for you. Better prices on your everyday favorites.': 'اخترناها لك بعناية، بأسعار أفضل على منتجاتك اليومية المفضلة.',
  'Shop All Deals': 'تسوّق كل العروض',
  '🔥 20 hot deals today': '🔥 ٢٠ عرضًا مميزًا اليوم',
  'All Deals': 'كل العروض',
  'More': 'المزيد',
  'Add to cart': 'أضف إلى السلة',
  'Add to Cart': 'أضف إلى السلة',
  'New deals weekly': 'عروض جديدة كل أسبوع',
  'More Deals every week': 'المزيد من العروض كل أسبوع',
  'Come back every week for fresh handpicked savings on your favourite products.': 'عُد كل أسبوع لاكتشاف عروض جديدة على منتجاتك المفضلة.',
  'Categories': 'الأقسام',
  'Home': 'الرئيسية',
  'All': 'الكل',
  'Fruits': 'فواكه',
  'Vegetables': 'خضروات',
  'Salads & Herbs': 'سلطات وأعشاب',
  'Organic': 'عضوي',
  'Cut & Packaged': 'مقطّع ومعبأ',
  'Filters': 'التصفية',
  'Clear all': 'مسح الكل',
  'Price Range': 'نطاق السعر',
  'Max: 100 EGP': 'الحد الأقصى: ١٠٠ جنيه',
  'Brands': 'العلامات التجارية',
  'Fresh Farm': 'مزرعة طازجة',
  'Dole': 'دول',
  'Egyptian Farms': 'مزارع مصرية',
  'Organic Valley': 'أورجانيك فالي',
  'Product Type': 'نوع المنتج',
  'In stock only': 'المتوفر فقط',
  '12 products': '١٢ منتجًا',
  'Sort by:': 'ترتيب حسب:',
  'Popularity': 'الأكثر رواجًا',
  'Price: Low to High': 'السعر: من الأقل إلى الأعلى',
  'Price: High to Low': 'السعر: من الأعلى إلى الأقل',
  'rabbit': 'رابيت',
  'Rabbit': 'رابيت',
  'About Rabbit': 'عن Rabbit',
  'Support Center': 'مركز الدعم',
  'Status & Service': 'حالة الخدمة',
  'Customer Care': 'خدمة العملاء',
  'How can we help?': 'كيف يمكننا مساعدتك؟',
  'Search our help center or browse categories below.': 'ابحث في مركز المساعدة أو تصفّح الأقسام أدناه.',
  'Search for help…': 'ابحث عن إجابة…',
  'Search': 'بحث',
  'Delivery time': 'مدة التوصيل',
  'Cancel order': 'إلغاء الطلب',
  'Payment': 'الدفع',
  'Refunds': 'استرداد الأموال',
  'Track order': 'تتبّع الطلب',
  'Browse Topics': 'تصفّح المواضيع',
  'Orders & Delivery': 'الطلبات والتوصيل',
  'My Account': 'حسابي',
  'Payments': 'المدفوعات',
  'Returns & Refunds': 'الإرجاع واسترداد الأموال',
  'Browse Deals': 'تصفّح العروض',
  'General': 'أسئلة عامة',
  'Need more help?': 'هل تحتاج إلى مزيد من المساعدة؟',
  'Start Live Chat': 'ابدأ محادثة مباشرة',
  'Everything you need to know about placing and receiving orders.': 'كل ما تحتاج إلى معرفته عن تقديم الطلبات واستلامها.',
  'Manage your profile, addresses, and preferences.': 'أدِر ملفك الشخصي وعناوينك وتفضيلاتك.',
  'Payment methods, billing, and transaction queries.': 'طرق الدفع والفواتير والاستفسارات عن المعاملات.',
  'How to return items and request refunds.': 'كيفية إرجاع المنتجات وطلب استرداد الأموال.',
  'How to find and redeem offers and discounts.': 'كيفية العثور على العروض والخصومات والاستفادة منها.',
  'General questions about the Rabbit service.': 'أسئلة عامة حول خدمات رابيت.',
  'No results found': 'لم نعثر على نتائج',
  'Try a different search term or browse categories on the left.': 'جرّب كلمة بحث أخرى أو تصفّح الأقسام.',
  'How long does delivery take?': 'كم يستغرق التوصيل؟',
  'Rabbit delivers in': 'توصّل رابيت طلبك خلال',
  'from the moment you confirm your order. Our dark stores are located throughout Cairo and Alexandria, ensuring near-instant dispatch. If your order is delayed beyond 45 minutes, you\'ll automatically receive a discount on your next order.': 'من لحظة تأكيد الطلب. تنتشر متاجرنا في القاهرة والإسكندرية لضمان إرساله بسرعة. إذا تأخر طلبك لأكثر من ٤٥ دقيقة، ستحصل تلقائيًا على خصم لطلبك القادم.',
  'Can I track my order?': 'هل يمكنني تتبّع طلبي؟',
  'Yes! Once your order is confirmed, you\'ll receive a tracking link via SMS and in-app notification. You can see your rider\'s real-time location on a live map directly in the Rabbit app. Estimated arrival time is updated every 30 seconds.': 'نعم! بعد تأكيد طلبك، سنرسل إليك رابط التتبّع برسالة نصية وإشعار في التطبيق. يمكنك متابعة موقع مندوب التوصيل مباشرةً على الخريطة، ويتحدث وقت الوصول المتوقع كل ٣٠ ثانية.',
  'How do I cancel my order?': 'كيف ألغي طلبي؟',
  'You can cancel your order within': 'يمكنك إلغاء طلبك خلال',
  'of placing it through the app (before picking begins). Go to Orders → Your Order → Cancel Order. After picking has started, cancellations are reviewed case by case. Contact live chat for urgent cancellations.': 'من تقديمه عبر التطبيق (قبل بدء تجهيز المنتجات). انتقل إلى الطلبات ← طلبك ← إلغاء الطلب. بعد بدء التجهيز، تُراجع طلبات الإلغاء كل حالة على حدة. للإلغاء العاجل، تواصل معنا عبر المحادثة المباشرة.',
  'How will I know when my order is on the way?': 'كيف أعرف أن طلبي أصبح في الطريق؟',
  'You\'ll receive push notifications at each stage: Order Confirmed, Picking in Progress, Order Dispatched, and Arrived. SMS notifications are sent as backup. You can also check the live order status in the app at any time.': 'ستصلك إشعارات في كل مرحلة: تأكيد الطلب، وتجهيز المنتجات، وإرسال الطلب، ووصوله. كما نرسل إشعارات نصية احتياطية، ويمكنك متابعة حالة طلبك في التطبيق في أي وقت.',
  'What happens if an item is out of stock?': 'ماذا يحدث إذا نفد أحد المنتجات؟',
  'If an item goes out of stock after you\'ve ordered, we\'ll notify you immediately and remove it from your order. You\'ll be refunded for that item automatically within 24 hours. You can also set a substitution preference in the app to receive a similar product instead.': 'إذا نفد منتج بعد تقديم طلبك، سنبلغك فورًا ونزيله من الطلب، ثم نعيد قيمته تلقائيًا خلال ٢٤ ساعة. ويمكنك تحديد تفضيلات البدائل في التطبيق لاستلام منتج مشابه.',
  'What payment methods do you accept?': 'ما طرق الدفع المتاحة؟',
  'We accept a wide range of payment options: Credit & Debit cards (Visa, Mastercard), Cash on Delivery, Vodafone Cash, Orange Money, Etisalat Cash, Fawry, and Rabbit Wallet credits. Apple Pay and Google Pay are available on the mobile app.': 'نقبل بطاقات الائتمان والخصم (فيزا وماستركارد)، والدفع نقدًا عند الاستلام، وفودافون كاش، وأورنج موني، واتصالات كاش، وفوري، ورصيد محفظة رابيت. كما يتوفر Apple Pay وGoogle Pay في التطبيق.',
  'Is there a minimum order value?': 'هل يوجد حد أدنى للطلب؟',
  'There is no minimum order value — you can order as little or as much as you like. However, orders under': 'لا يوجد حد أدنى لقيمة الطلب، ويمكنك طلب الكمية التي تريدها. لكن الطلبات الأقل من',
  'will incur a small delivery fee of 15 EGP. Orders over 200 EGP qualify for': 'تُضاف إليها رسوم توصيل بسيطة قدرها ١٥ جنيهًا. والطلبات التي تتجاوز ٢٠٠ جنيه مؤهلة للحصول على',
  'free delivery': 'توصيل مجاني',
  'Do you offer free delivery?': 'هل تقدمون توصيلًا مجانيًا؟',
  'Yes! Delivery is completely': 'نعم! التوصيل',
  '. For orders below this threshold, a flat 15 EGP delivery fee applies. We also run periodic free delivery promotions — check the Deals page or enable notifications to stay updated.': '. أما الطلبات الأقل من هذا المبلغ فتُطبق عليها رسوم توصيل ثابتة قدرها ١٥ جنيهًا. نقدم أيضًا عروضًا دورية للتوصيل المجاني؛ تصفّح صفحة العروض أو فعّل الإشعارات لتبقى على اطلاع.',
  'Can I change my delivery address after placing an order?': 'هل يمكنني تغيير عنوان التوصيل بعد تقديم الطلب؟',
  'Address changes can only be made within the first': 'يمكن تغيير العنوان خلال أول',
  'after placing an order, before picking has begun. To request a change, contact our live support chat immediately. Once picking starts, the address is locked for logistical reasons. Always double-check your address before confirming!': 'من تقديم الطلب، وقبل بدء التجهيز. لطلب التغيير، تواصل فورًا مع الدعم المباشر. بعد بدء التجهيز، لا يمكن تعديل العنوان لأسباب لوجستية. تحقّق من عنوانك قبل التأكيد!',
  'How do I contact Rabbit support?': 'كيف أتواصل مع دعم رابيت؟',
  'You can reach us 24/7 through multiple channels:': 'يمكنك التواصل معنا على مدار الساعة عبر القنوات التالية:',
  'in the app (fastest response),': 'في التطبيق (أسرع استجابة)،',
  'at hello@rabbit.eg (reply within 2 hours), or our': 'عبر hello@rabbit.eg (نرد خلال ساعتين)، أو من خلال',
  'for self-service answers. For urgent delivery issues, always use live chat for the fastest resolution.': 'للعثور على إجابات فورية. للمشكلات العاجلة المتعلقة بالتوصيل، استخدم المحادثة المباشرة للحصول على أسرع مساعدة.',
  'Showing 10 of 48 articles': 'عرض ١٠ من أصل ٤٨ مقالًا',
  'Load more': 'عرض المزيد',
  'Still need help?': 'هل ما زلت بحاجة للمساعدة؟',
  'Our support team is available 24/7 — we\'re here for you.': 'فريق الدعم متاح على مدار الساعة لمساعدتك.',
  'Live Chat': 'محادثة مباشرة',
  'Chat with a real support agent instantly. Available 24/7 with average response in under 2 minutes.': 'تواصل فورًا مع أحد موظفي الدعم. الخدمة متاحة على مدار الساعة، ومتوسط وقت الرد أقل من دقيقتين.',
  'Start Chat →': 'ابدأ المحادثة ←',
  'Email Us': 'راسلنا',
  'Send us a message at hello@rabbit.eg and we\'ll get back to you within 2 business hours.': 'أرسل رسالة إلى hello@rabbit.eg وسنرد عليك خلال ساعتَي عمل.',
  'Email Now →': 'أرسل بريدًا الآن ←',
  'Help Center': 'مركز المساعدة',
  'Browse self-service articles and guides to find answers quickly without waiting for a response.': 'تصفّح المقالات والأدلة للعثور على إجابات بسرعة دون انتظار الرد.',
  'Browse Articles →': 'تصفّح المقالات ←',
  'It\'s ridiculously simple': 'الأمر في غاية البساطة',
  'How Rabbit Works': 'كيف تعمل رابيت',
  'From browsing to delivery, we make it simple. Fresh groceries and everyday essentials delivered to your door in under 40 minutes.': 'من التصفح حتى التوصيل، جعلنا الأمر بسيطًا. تصلك البقالة الطازجة والاحتياجات اليومية إلى بابك خلال أقل من ٤٠ دقيقة.',
  'Four Simple Steps': 'أربع خطوات بسيطة',
  'No complexity, no confusion. Just groceries at your door.': 'بلا تعقيد أو حيرة؛ كل ما تحتاجه يصلك إلى بابك.',
  'Browse': 'تصفّح',
  'Explore a wide range of products across all your favourite grocery categories — fresh produce, snacks, dairy and more.': 'اكتشف تشكيلة واسعة من منتجاتك المفضلة في أقسام البقالة المختلفة، من الخضروات والفواكه الطازجة إلى الوجبات الخفيفة والألبان والمزيد.',
  'Add to Cart': 'أضف إلى السلة',
  'Choose your favourites and quantities. Lock your prices and prepare your order — it only takes a few taps.': 'اختر منتجاتك المفضلة وكمياتها، وثبّت أسعارها وجهّز طلبك ببضع نقرات فقط.',
  'We Deliver': 'نوصّل طلبك',
  'Your order is carefully packed and delivered straight to your door within 20–40 minutes. No delays, no excuses.': 'نجهّز طلبك بعناية ونوصّله إلى بابك خلال ٢٠–٤٠ دقيقة، بلا تأخير.',
  'Enjoy': 'استمتع',
  'Set your essentials on autopilot. Reorder in just 2 taps with saved favourites and never run out of what you need.': 'اجعل احتياجاتك اليومية دائمًا في متناولك. أعد طلب مفضلاتك بنقرتين فقط ولا تدع ما تحتاجه ينفد.',
  'Min Delivery': 'أقل مدة للتوصيل',
  'Products': 'منتج',
  'On-Time Rate': 'معدل الالتزام بالمواعيد',
  'Support': 'الدعم',
  'See It in Action': 'شاهدها بنفسك',
  'Watch how easy it is to get your groceries delivered.': 'شاهد مدى سهولة توصيل مشترياتك إلى بابك.',
  'Watch how Rabbit works': 'شاهد كيف تعمل رابيت',
  '2 min · See the full delivery experience': 'دقيقتان · شاهد تجربة التوصيل كاملة',
  'Start Shopping Today': 'ابدأ التسوّق اليوم',
  'Groceries, snacks and more': 'بقالة ووجبات خفيفة والمزيد',
  'Delivered to your door': 'تصلك إلى بابك',
  'Skip the queue. Forget the traffic. Let Rabbit bring everything you need — fresh, fast and at better prices.': 'تجاوز الطوابير وانسَ الازدحام. دع رابيت توصل كل ما تحتاجه طازجًا وبسرعة وبأسعار أفضل.',
  'Free delivery over 200 EGP': 'توصيل مجاني للطلبات فوق ٢٠٠ جنيه',
  'No membership required': 'لا حاجة إلى اشتراك',
  'Order Now →': 'اطلب الآن ←',
  'Delivery in 20–40 minutes. Always.': 'التوصيل خلال ٢٠–٤٠ دقيقة، دائمًا.',
  'Frequently Asked Questions': 'الأسئلة الشائعة',
  'Quick answers to common questions about how Rabbit works.': 'إجابات سريعة عن الأسئلة الشائعة حول خدمات رابيت.',
  'How fast is Rabbit delivery?': 'ما سرعة التوصيل من رابيت؟',
  'Rabbit delivers in 20–40 minutes from the moment you place your order. Our warehouses are strategically located across Cairo and Alexandria so we can reach you quickly — rain or shine.': 'تصلك طلبات رابيت خلال ٢٠–٤٠ دقيقة من تقديم الطلب. تنتشر مستودعاتنا في أنحاء القاهرة والإسكندرية لنصل إليك بسرعة في كل الأوقات.',
  'What areas does Rabbit deliver to?': 'ما المناطق التي تغطيها خدمة رابيت؟',
  'We currently deliver across greater Cairo (including New Cairo, Maadi, Zamalek, Heliopolis, 6th of October, and Sheikh Zayed) as well as Alexandria. We\'re expanding rapidly — enter your address to check availability in your area.': 'نوصّل حاليًا في القاهرة الكبرى (بما في ذلك القاهرة الجديدة والمعادي والزمالك ومصر الجديدة ومدينة ٦ أكتوبر والشيخ زايد) وكذلك الإسكندرية. نتوسع باستمرار؛ أدخل عنوانك للتحقق من توفر الخدمة في منطقتك.',
  'Can I schedule my delivery for later?': 'هل يمكنني تحديد موعد لاحق للتوصيل؟',
  'Yes! You can schedule deliveries up to 7 days in advance. Simply choose your preferred delivery window at checkout. Scheduled deliveries are guaranteed to arrive within your chosen 30-minute slot.': 'نعم! يمكنك جدولة التوصيل قبل موعده بسبعة أيام. اختر موعد التوصيل المناسب عند إتمام الطلب، وسنوصله ضمن الفترة المحددة التي تبلغ ٣٠ دقيقة.',
  'View all FAQs': 'عرض كل الأسئلة الشائعة',
  'Fresh groceries, zero hassle.': 'مشتريات طازجة، بلا عناء.',
  'Join 50,000+ customers who trust Rabbit for their daily essentials.': 'انضم إلى أكثر من ٥٠ ألف عميل يثقون برابيت لتلبية احتياجاتهم اليومية.',
  'Start Shopping →': 'ابدأ التسوّق ←',
  'About Rabbit': 'عن رابيت',
  'Good Food Brings Us Together': 'الطعام الطازج يجمعنا',
  'We\'re on a mission to make everyday essentials more accessible, more affordable, and closer to you. Rabbit started with a simple idea: everyone deserves easy access to fresh food and everyday essentials. What began as a small team of grocery enthusiasts has grown into a trusted platform serving thousands of customers across Egypt.': 'نسعى إلى جعل احتياجاتك اليومية أقرب إليك وأكثر توفيرًا. بدأت رابيت بفكرة بسيطة: يستحق الجميع الحصول بسهولة على الطعام الطازج والاحتياجات اليومية. انطلقنا كفريق صغير من محبي البقالة، وأصبحنا اليوم منصة موثوقة تخدم آلاف العملاء في أنحاء مصر.',
  'Shop the Deals →': 'تسوّق العروض ←',
  'Happy Customers': 'عميل سعيد',
  'Products Available': 'منتج متاح',
  '30 min': '٣٠ دقيقة',
  'Average Delivery': 'متوسط مدة التوصيل',
  'Cities Covered': 'مدينة نخدمها',
  'Our Story': 'قصتنا',
  'From a small idea to Egypt\'s fastest grocery platform': 'من فكرة صغيرة إلى أسرع منصة بقالة في مصر',
  'It all started in 2022 when a group of friends kept running into the same problem — getting fresh groceries quickly and affordably was harder than it should be. So we built Rabbit: a simple, fast, and reliable way to get your everyday essentials without the hassle.': 'بدأت قصتنا عام ٢٠٢٢ عندما واجهت مجموعة من الأصدقاء المشكلة نفسها: كان الحصول على البقالة الطازجة بسرعة وبسعر مناسب أمرًا أصعب مما ينبغي. لذلك أنشأنا رابيت، طريقة بسيطة وسريعة وموثوقة للحصول على احتياجاتك اليومية بلا عناء.',
  'Today, Rabbit operates across 25+ cities, partners with 100+ local suppliers, and delivers thousands of orders every day. We believe that good food should be accessible to everyone, not just those who have time to shop.': 'تعمل رابيت اليوم في أكثر من ٢٥ مدينة، وتتعاون مع أكثر من ١٠٠ مورّد محلي، وتوصّل آلاف الطلبات يوميًا. نؤمن بأن الطعام الطازج يجب أن يكون متاحًا للجميع، وليس فقط لمن لديهم وقت للتسوّق.',
  'Partnered with 100+ local brands': 'نتعاون مع أكثر من ١٠٠ علامة تجارية محلية',
  'Free delivery on orders above 200 EGP': 'توصيل مجاني للطلبات التي تتجاوز ٢٠٠ جنيه',
  'What We Stand For': 'ما نؤمن به',
  'Customer First': 'العميل أولًا',
  'Every decision we make starts with one question: is this better for our customers? We listen, we adapt, we improve.': 'يبدأ كل قرار نتخذه بسؤال واحد: هل يصبّ في مصلحة عملائنا؟ نصغي إليهم ونتطور باستمرار.',
  'Better Everyday': 'نطور خدماتنا كل يوم',
  'We\'re never satisfied. We constantly push to improve quality, speed, selection, and service across every order.': 'نسعى دائمًا إلى تحسين الجودة والسرعة وتنوع المنتجات ومستوى الخدمة في كل طلب.',
  'Local Impact': 'أثر محلي',
  'We work with local Egyptian suppliers and farmers to keep money in communities and support homegrown businesses.': 'نتعاون مع المورّدين والمزارعين المصريين لدعم المجتمعات والشركات المحلية.',
  'A Greener Future': 'مستقبل أكثر استدامة',
  'We\'re committed to sustainable packaging, reducing food waste, and building a delivery operation that cares about the planet.': 'نلتزم باستخدام عبوات مستدامة والحد من هدر الطعام وبناء خدمة توصيل تراعي كوكبنا.',
  'Ready to Try Rabbit?': 'هل أنت مستعد لتجربة رابيت؟',
  'It only takes 3 steps to your door': 'ثلاث خطوات فقط لتصلك مشترياتك',
  'Explore thousands of products across fresh produce, snacks, drinks, and essentials.': 'اكتشف آلاف المنتجات من الخضروات والفواكه الطازجة والوجبات الخفيفة والمشروبات والاحتياجات اليومية.',
  'Shop Now →': 'تسوّق الآن ←',
  'Pick what you need, add it to your basket, and review your order before checkout.': 'اختر ما تحتاجه وأضفه إلى سلتك، ثم راجع طلبك قبل إتمامه.',
  'View Basket →': 'عرض السلة ←',
  'Sit back while Rabbit riders bring your order straight to your door in under 40 minutes.': 'استرخِ بينما يوصّل مندوبو رابيت طلبك إلى بابك خلال أقل من ٤٠ دقيقة.',
  'Learn More →': 'اعرف المزيد ←',
  'Fresh groceries, zero hassle.': 'مشتريات طازجة، بلا عناء.',
  'Oops! Page not found.': 'عذرًا! الصفحة غير موجودة.',
  'The page you\'re looking for doesn\'t exist or has been moved. But don\'t worry — there are plenty of fresh groceries waiting for you.': 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها. لا تقلق، هناك الكثير من المنتجات الطازجة بانتظارك.',
  'Go to Home': 'العودة للرئيسية',
  'Browse Deals': 'تصفّح العروض',
  'Or try:': 'أو جرّب:',
  'Shop All': 'تسوّق كل المنتجات',
  'How It Works': 'كيف تعمل الخدمة',
  'Help Center': 'مركز المساعدة',
  'While you\'re here, check these out': 'تفقّد هذه المنتجات أيضًا',
  'Shop all': 'تسوّق الكل',
  'Pack of 3': 'عبوة من ٣ قطع',
  '500g punnet': 'عبوة ٥٠٠ جم',
  'Dozen': 'دستة',
  'Large loaf': 'رغيف كبير',
  '6 × 500ml': '٦ × ٥٠٠ مل',
  '250g': '٢٥٠ جم',
  'Error 404 · Page Not Found · rabbit.eg': 'خطأ ٤٠٤ · الصفحة غير موجودة · rabbit.eg',
  'Product Details': 'تفاصيل المنتج',
  'Snacks & Sweets': 'وجبات خفيفة وحلويات',
  'Sour Cream & Onion, 170g': 'قشطة وبصل، ١٧٠ جم',
  '(12.3k reviews)': '(١٢٫٣ ألف تقييم)',
  'Quantity': 'الكمية',
  'Add to Basket': 'أضف إلى السلة',
  'Fast Delivery': 'توصيل سريع',
  '30-40 min': '٣٠–٤٠ دقيقة',
  'In Stock': 'متوفر',
  '✓ Available': '✓ متاح',
  'Official': 'أصلي',
  '✓ Genuine': '✓ مضمون',
  'Product details': 'تفاصيل المنتج',
  'Lay\'s Potato Chips in Sour Cream & Onion flavor. Made from selected potatoes, cooked to crispy perfection. Net weight: 170g. Contains: Potatoes, Vegetable Oil, Salt, Sour Cream & Onion Seasoning.': 'رقائق بطاطس ليز بنكهة القشطة والبصل، مصنوعة من بطاطس مختارة ومقرمشة بإتقان. الوزن الصافي: ١٧٠ جم. المكونات: بطاطس، زيت نباتي، ملح، وتوابل القشطة والبصل.',
  'Nutrition information': 'القيمة الغذائية',
  'Nutrient': 'العنصر الغذائي',
  'Per 28g serving': 'لكل حصة ٢٨ جم',
  'Calories': 'السعرات الحرارية',
  'Total Fat': 'إجمالي الدهون',
  'Sodium': 'الصوديوم',
  'Carbohydrates': 'الكربوهيدرات',
  'Protein': 'البروتين',
  'Reviews (2.3k)': 'التقييمات (٢٫٣ ألف)',
  'Ahmed M.': 'أحمد م.',
  'Amazing taste! Can\'t stop eating them. The sour cream & onion flavor is perfectly balanced. Will definitely order again!': 'مذاق رائع! لا أستطيع التوقف عن تناولها. نكهة القشطة والبصل متوازنة تمامًا، سأطلبها بالتأكيد مرة أخرى!',
  'Sara K.': 'سارة ك.',
  'Best chips in Egypt, hands down. Super crispy and fresh. Rabbit delivered in under 30 minutes too!': 'أفضل رقائق بطاطس في مصر بلا منافس. مقرمشة وطازجة جدًا، كما وصلني الطلب خلال أقل من ٣٠ دقيقة!',
  'You might also like': 'قد يعجبك أيضًا',
  'Beverages': 'مشروبات',
  'Done!': 'تم!',
  'Your Basket': 'سلة مشترياتك',
  'Subtotal': 'المجموع الفرعي',
  'Delivery fee': 'رسوم التوصيل',
  'Total': 'الإجمالي',
  'FREE': 'مجانًا',
  'Checkout Now': 'أتمم طلبك الآن',
  'Start Shopping': 'ابدأ التسوّق',
  'Your cart is empty': 'سلة مشترياتك فارغة',
  'Add items from our fresh grocery selection': 'أضف منتجات من تشكيلتنا الطازجة',
  'Removed from wishlist': 'تمت الإزالة من المفضلة',
  'Added to wishlist ❤️': 'تمت الإضافة إلى المفضلة ❤️',
  'Your wishlist has items saved ❤️': 'لديك منتجات محفوظة في المفضلة ❤️',
  'Your cart is empty!': 'سلة مشترياتك فارغة!',
  'Cart cleared': 'تم إفراغ السلة',
  'FREE DELIVERY': 'توصيل مجاني',
  'FREE': 'مجانًا',
  'Available': 'متاح',
  'Fresh Farm': 'مزرعة طازجة',
  'products': 'منتجات',
  '404': '٤٠٤',
  'Status & Service': 'حالة الخدمة',
  'Contact': 'تواصل معنا',
  'Live Chat: In-App': 'المحادثة المباشرة: عبر التطبيق',
  'Email Us: hello@rabbit.eg': 'راسلنا: hello@rabbit.eg',
  'Help Center:': 'مركز المساعدة:',
  'Visit FAQ': 'زيارة الأسئلة الشائعة',
  'Customer Care': 'خدمة العملاء',
  'apple': 'apple',
  'android': 'android',
  'search': 'search',
  'favorite_border': 'favorite_border',
  'favorite': 'favorite',
  'shopping_bag': 'shopping_bag',
  'bolt': 'bolt',
  'sell': 'sell',
  'category': 'category',
  'verified': 'verified',
  'play_circle': 'play_circle',
  'inventory_2': 'inventory_2',
  'payments': 'payments',
  'two_wheeler': 'two_wheeler',
  'sentiment_satisfied': 'sentiment_satisfied',
  'people': 'people',
  'schedule': 'schedule',
  'location_on': 'location_on',
  'check_circle': 'check_circle',
  'trending_up': 'trending_up',
  'handshake': 'handshake',
  'eco': 'eco',
  'add_shopping_cart': 'add_shopping_cart',
  'local_shipping': 'local_shipping',
  'grocery_store': 'grocery_store',
  'rocket_launch': 'rocket_launch',
  'expand_more': 'expand_more',
  'arrow_forward': 'arrow_forward',
  'support_agent': 'support_agent',
  'package_2': 'package_2',
  'person': 'person',
  'credit_card': 'credit_card',
  'assignment_return': 'assignment_return',
  'local_offer': 'local_offer',
  'info': 'info',
  'search_off': 'search_off',
  'chat': 'chat',
  'mail': 'mail',
  'phone_iphone': 'phone_iphone',
  'star': 'star',
  'star_half': 'star_half',
  'add': 'add',
  'delete': 'delete',
  'play_arrow': 'play_arrow',
  'favorite_border': 'favorite_border',
  'Check out our deals': 'تفقّد عروضنا',
  'Checkout Now': 'أتمم طلبك الآن',
  'Clear all': 'مسح الكل',
  'FREE delivery': 'توصيل مجاني',
  'Wishlist coming soon!': 'قائمة المفضلة قريبًا!',
  'Wishlist view': 'عرض قائمة المفضلة',
  'Proceeding to checkout…': 'جارٍ الانتقال لإتمام الطلب…',
  'Checkout Now': 'أتمم طلبك الآن',
  'Shop the deals': 'تسوّق العروض',
  'See all categories': 'عرض كل الأقسام',
  'See all deals': 'عرض كل العروض',
  'Shop now': 'تسوّق الآن',
  'Under 30-60 mins': 'خلال ٣٠–٦٠ دقيقة',
  '30 min': '٣٠ دقيقة',
  '50,000+': 'أكثر من ٥٠٬٠٠٠',
  '25+': 'أكثر من ٢٥',
  '100+': 'أكثر من ١٠٠',
  '20–40 minutes': '٢٠–٤٠ دقيقة',
  '2 minutes': 'دقيقتين',
  '200 EGP': '٢٠٠ جنيه',
  'free on all orders over 200 EGP': 'مجاني لجميع الطلبات التي تتجاوز ٢٠٠ جنيه',
  'Live Chat: In-App': 'المحادثة المباشرة: عبر التطبيق',
  'Email Us: hello@rabbit.eg': 'راسلنا: hello@rabbit.eg',
  'Help Center:': 'مركز المساعدة:',
  'Visit FAQ': 'زيارة الأسئلة الشائعة',
  '1.5L': '١٫٥ لتر',
  '170g • Sour Cream & Onion': '١٧٠ جم • قشطة وبصل',
  '16x38g pack': 'عبوة ١٦ × ٣٨ جم',
  '1L': '١ لتر',
  '1.5L': '١٫٥ لتر',
  '170g': '١٧٠ جم',
  '165g': '١٦٥ جم',
  '198g': '١٩٨ جم',
  '160g': '١٦٠ جم',
  '85g': '٨٥ جم',
  '150g × 4': '١٥٠ جم × ٤',
  '600g': '٦٠٠ جم',
  '400g': '٤٠٠ جم',
  '400ml': '٤٠٠ مل',
  '250ml': '٢٥٠ مل',
  '5pk': 'عبوة ٥',
  'L size × 40': 'مقاس كبير × ٤٠',
  '8 portions': '٨ قطع',
  '16x38g pack': 'عبوة ١٦ × ٣٨ جم',
  'Checkout Now': 'أتمم طلبك الآن',
  'FREE': 'مجانًا',
  'Brings Us Together': 'يجمعنا',
  'Enjoy Delivery': 'استمتع بالتوصيل',
  'Fresh Avocados': 'أفوكادو طازج',
  'Farm-fresh fruits and vegetables delivered crisp, chilled, and directly to your door in minutes.': 'خضروات وفواكه طازجة من المزرعة، تصلك مبردة وبحالة ممتازة إلى بابك خلال دقائق.',
  'Snacks & Drinks': 'وجبات خفيفة ومشروبات',
  '404 Error Demo': 'تجربة صفحة الخطأ ٤٠٤',
  '100g': '١٠٠ جم',
  '200g': '٢٠٠ جم',
  'Email': 'البريد الإلكتروني',
  'App Store': 'متجر App Store',
  'Google Play': 'Google Play',
  '160 kcal': '١٦٠ سعرة حرارية',
  '10g': '١٠ جم',
  '170mg': '١٧٠ مجم',
  '15g': '١٥ جم',
  '2g': '٢ جم',
  'A': 'أ',
  '1L': '١ لتر',
  'Oops! The page you\'re looking for doesn\'t exist. Head back to Rabbit and keep shopping.': 'الصفحة التي تبحث عنها غير موجودة. عُد إلى رابيت وتابع التسوّق.',
  'Find answers to your questions about Rabbit grocery delivery. Orders, delivery, payments, returns and more.': 'اعثر على إجابات أسئلتك حول توصيل البقالة من رابيت: الطلبات والتوصيل والدفع والإرجاع والمزيد.',
  'Discover how Rabbit delivers fresh groceries to your door in 20–40 minutes. Simple steps, lightning-fast delivery.': 'اكتشف كيف توصل رابيت مشترياتك الطازجة إلى بابك خلال ٢٠–٤٠ دقيقة، بخطوات بسيطة وسرعة فائقة.',
  'No complexity, no confusion. Just groceries at your door.': 'بلا تعقيد أو حيرة؛ كل ما تحتاجه يصلك إلى بابك.',
  'Showing 10 of 48 articles · ': 'عرض ١٠ من أصل ٤٨ مقالًا',
  '100+ local suppliers': 'أكثر من ١٠٠ مورّد محلي',
  'Download on the App Store': 'حمّله من متجر App Store',
  'GET IT ON Google Play': 'حمّله من Google Play',
  'S': 'س',
  'Avocados': 'أفوكادو',
  'Rabbit delivery courier': 'مندوب توصيل رابيت',
  'Fresh grocery produce': 'منتجات بقالة طازجة',
  'Nutella': 'نوتيلا',
  'Lay\'s': 'ليز',
  'Rabbit Grocery Box': 'صندوق بقالة رابيت',
  'Rabbit Courier': 'مندوب رابيت',
  'Juhayna Milk': 'لبن جهينة',
  'Avocado and Tomato': 'أفوكادو وطماطم',
  'Rabbit grocery delivery': 'توصيل بقالة رابيت',
  'Groceries': 'بقالة',
  'Lay\'s view 1': 'ليز - الصورة ١',
  'Lay\'s view 2': 'ليز - الصورة ٢',
  'Lay\'s view 3': 'ليز - الصورة ٣'
};

const arabicProductNames = [
  'Coca-Cola Original', 'Lay\'s Potato Chips 170g', 'Lay\'s Potato Chips', 'Lay\'s Chips',
  'Oreo Biscuits', 'Juhayna Full Cream Milk', 'Nutella Chocolate Spread',
  'Fairy Dishwashing Liquid', 'Dettol Hand Wash', 'Kleenex Tissues', 'Aquafina Water',
  'Nemo Chips', 'Nescafe Classic', 'Huggies Pants L40', 'Pringles Original',
  'Doritos Nacho Cheese', 'Chipsy Family Pack', 'Twinkies Bites', 'Sprite Zero',
  'Kiri Cream Cheese', 'Yoplait Vanilla Yogurt', 'Fino Sliced White Bread',
  'Fresh Tomatoes', 'Banana', 'Lettuce', 'Cucumbers', 'Potatoes', 'Carrots',
  'Oranges', 'Bell Pepper', 'Lemons', 'Zucchini', 'Red Onions', 'Onions'
].sort((a, b) => b.length - a.length);

function translateArabic(value) {
  const trimmed = value.trim();
  const translation = arabicTranslations[trimmed];
  const localized = translation
    ? value.replace(trimmed, translation)
    : value
      .replace(/\bEGP\b/g, 'ج.م')
      .replace(/\bFREE\b/g, 'مجانًا')
      .replace(/\b(\d+)\s+products?\b/g, (_, count) => `${count} منتج`)
      .replace(/Max:\s*(\d+)\s*ج\.م/i, (_, amount) => `الحد الأقصى: ${amount} جنيه`)
      .replace(/Showing\s+(\d+)\s+of\s+(\d+)\s+articles\s*[·.]?/i, (_, shown, total) => `عرض ${shown} من أصل ${total} مقالًا`)
      .replace(/(\d+)g\b/g, '$1 جم')
      .replace(/(\d+)ml\b/g, '$1 مل');
  const withProductNames = arabicProductNames.reduce((text, name) => {
    const translatedName = arabicTranslations[name];
    return translatedName ? text.split(name).join(translatedName) : text;
  }, localized);
  return withProductNames.replace(/\d/g, digit => '٠١٢٣٤٥٦٧٨٩'[Number(digit)]);
}

function localizeArabicNode(root) {
  const visit = node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const parentTag = node.parentElement && node.parentElement.tagName;
      if (parentTag !== 'SCRIPT' && parentTag !== 'STYLE' && !(node.parentElement && node.parentElement.classList.contains('material-symbols-outlined'))) {
        const translated = translateArabic(node.nodeValue);
        if (translated !== node.nodeValue) node.nodeValue = translated;
      }
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE && node.nodeType !== Node.DOCUMENT_NODE) return;
    if (node.nodeType === Node.ELEMENT_NODE) {
      const attributes = ['alt', 'placeholder', 'title', 'aria-label'];
      if (node.tagName === 'META' && node.getAttribute('name') === 'description') {
        attributes.push('content');
      }
      attributes.forEach(attribute => {
        if (node.hasAttribute(attribute)) {
          node.setAttribute(attribute, translateArabic(node.getAttribute(attribute)));
        }
      });
    }
    node.childNodes.forEach(visit);
  };
  visit(root);
}

function initializeArabicExperience() {
  document.documentElement.lang = 'ar';
  document.documentElement.dir = 'rtl';

  const logo = document.querySelector('header a[href="index.html"]');
  if (logo) {
    logo.innerHTML = '<img src="logo.png" alt="رابيت" class="page-logo h-9 w-auto object-contain" />';
    logo.setAttribute('aria-label', 'الرئيسية');
  }

  const desktopNav = document.querySelector('header nav');
  if (desktopNav && !desktopNav.querySelector('a[href="index.html"]')) {
    const homeLink = document.createElement('a');
    homeLink.href = 'index.html';
    homeLink.className = 'text-white/80 hover:text-[#C2E31E] transition';
    homeLink.textContent = 'الرئيسية';
    desktopNav.prepend(homeLink);
  }

  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu && !mobileMenu.querySelector('a[href="index.html"]')) {
    const homeLink = document.createElement('a');
    homeLink.href = 'index.html';
    homeLink.className = 'block px-3 py-2 rounded-lg text-white font-medium hover:bg-white/10';
    homeLink.textContent = 'الرئيسية';
    mobileMenu.prepend(homeLink);
  }

  document.title = translateArabic(document.title);
  localizeArabicNode(document.body);

  const rtlStyle = document.createElement('style');
  rtlStyle.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap');
    html[dir="rtl"] body { font-family: 'Cairo', sans-serif !important; }
    header a[href="index.html"] > .page-logo ~ * { display: none !important; }
    html[dir="rtl"] #cartDrawer { left: auto !important; right: 0 !important; transform: none !important; translate: 100% 0 !important; transition: none !important; }
    html[dir="rtl"] #cartDrawer.cart-open { translate: 0 0 !important; }
    html.arabic-pending #cartDrawer { transition: none !important; }
    html[dir="rtl"] .text-left { text-align: right !important; }
    html[dir="rtl"] .text-right { text-align: left !important; }
    html[dir="rtl"] .left-0 { right: 0 !important; left: auto !important; }
    html[dir="rtl"] .right-0 { left: 0 !important; right: auto !important; }
    html[dir="rtl"] .left-1 { right: 0.25rem !important; left: auto !important; }
    html[dir="rtl"] .right-1 { left: 0.25rem !important; right: auto !important; }
    html[dir="rtl"] .left-2 { right: 0.5rem !important; left: auto !important; }
    html[dir="rtl"] .right-2 { left: 0.5rem !important; right: auto !important; }
    html[dir="rtl"] .left-4 { right: 1rem !important; left: auto !important; }
    html[dir="rtl"] .right-4 { left: 1rem !important; right: auto !important; }
    html[dir="rtl"] .left-6 { right: 1.5rem !important; left: auto !important; }
    html[dir="rtl"] .right-6 { left: 1.5rem !important; right: auto !important; }
    html[dir="rtl"] .left-1\\/2 { right: 50% !important; left: auto !important; }
    html[dir="rtl"] .right-1\\/2 { left: 50% !important; right: auto !important; }
    html[dir="rtl"] .-left-4 { right: -1rem !important; left: auto !important; }
    html[dir="rtl"] .-right-4 { left: -1rem !important; right: auto !important; }
    html[dir="rtl"] .-left-40 { right: -10rem !important; left: auto !important; }
    html[dir="rtl"] .-right-40 { left: -10rem !important; right: auto !important; }
    html[dir="rtl"] input { text-align: right; }
  `;
  document.head.appendChild(rtlStyle);

  const observer = new MutationObserver(records => {
    records.forEach(record => {
      if (record.type === 'characterData') {
        localizeArabicNode(record.target);
      } else {
        record.addedNodes.forEach(localizeArabicNode);
      }
    });
  });
  observer.observe(document.body, { childList: true, characterData: true, subtree: true });
  document.documentElement.classList.remove('arabic-pending');
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartBadge();
  renderCartDrawer();
}

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function toggleWishlist(productId, btnElement) {
  let list = getWishlist();
  const index = list.indexOf(productId);
  if (index > -1) {
    list.splice(index, 1);
    if (btnElement) btnElement.classList.remove('text-red-500', 'fill-current');
    showToast('تمت الإزالة من المفضلة');
  } else {
    list.push(productId);
    if (btnElement) btnElement.classList.add('text-red-500', 'fill-current');
    showToast('تمت الإضافة إلى المفضلة ❤️');
  }
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(list));
}

function addToCart(item) {
  const cart = getCart();
  if (cart[item.id]) {
    cart[item.id].qty += (item.qty || 1);
  } else {
    cart[item.id] = {
      id: item.id,
      title: item.title,
      price: item.price,
      oldPrice: item.oldPrice || null,
      unit: item.unit || '',
      image: item.image,
      qty: item.qty || 1
    };
  }
  saveCart(cart);
  showToast(`تمت إضافة ${item.title} إلى السلة 🛒`);
}

function updateCartQty(id, delta) {
  const cart = getCart();
  if (!cart[id]) return;
  cart[id].qty += delta;
  if (cart[id].qty <= 0) {
    delete cart[id];
  }
  saveCart(cart);
}

function removeCartItem(id) {
  const cart = getCart();
  delete cart[id];
  saveCart(cart);
}

function clearCart() {
  saveCart({});
  showToast('Cart cleared');
}

function updateCartBadge() {
  const cart = getCart();
  const totalCount = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(b => {
    b.textContent = totalCount.toLocaleString('ar-EG');
    b.style.display = totalCount > 0 ? 'flex' : 'none';
  });
}

function getCartTotal() {
  const cart = getCart();
  return Object.values(cart).reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('cart-open');
    overlay.classList.remove('hidden');
    renderCartDrawer();
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer && overlay) {
    drawer.classList.add('translate-x-full');
    drawer.classList.remove('cart-open');
    overlay.classList.add('hidden');
  }
}

function renderCartDrawer() {
  const container = document.getElementById('cartDrawerItems');
  const subtotalEl = document.getElementById('cartDrawerSubtotal');
  const totalEl = document.getElementById('cartDrawerTotal');
  if (!container) return;

  const cart = getCart();
  const items = Object.values(cart);

  if (items.length === 0) {
    container.innerHTML = `
      <div class="text-center py-16 text-gray-400">
        <span class="material-symbols-outlined text-6xl text-gray-300 mb-3">shopping_bag</span>
        <p class="font-bold text-gray-700">سلة مشترياتك فارغة</p>
        <p class="text-sm text-gray-500 mt-1">أضف منتجات من تشكيلتنا الطازجة</p>
        <a href="category.html" class="inline-block mt-4 px-6 py-2.5 rounded-xl bg-[#C2E31E] text-[#02392E] font-bold text-xs uppercase hover:bg-[#A9CB2C] transition">ابدأ التسوّق</a>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '0 EGP';
    if (totalEl) totalEl.textContent = '0 EGP';
    return;
  }

  let html = '';
  items.forEach(item => {
    html += `
      <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 transition">
        <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-contain rounded-xl bg-white p-1 border border-gray-100" />
        <div class="flex-1 min-w-0">
          <h4 class="font-bold text-sm text-gray-900 truncate">${item.title}</h4>
          <span class="text-xs text-gray-500">${item.unit || ''}</span>
          <div class="flex items-center justify-between mt-2">
            <span class="font-bold text-sm text-[#02392E]">${item.price} EGP</span>
            <div class="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-2 py-0.5 shadow-sm">
              <button onclick="updateCartQty('${item.id}', -1)" class="text-gray-500 hover:text-red-500 font-bold px-1">−</button>
              <span class="font-bold text-xs w-4 text-center">${item.qty}</span>
              <button onclick="updateCartQty('${item.id}', 1)" class="text-gray-500 hover:text-green-600 font-bold px-1">+</button>
            </div>
          </div>
        </div>
        <button onclick="removeCartItem('${item.id}')" class="text-gray-400 hover:text-red-500 p-1 text-sm">
          <span class="material-symbols-outlined text-lg">delete</span>
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
  const subtotal = getCartTotal();
  const delivery = subtotal > 0 ? (subtotal >= 200 ? 0 : 15) : 0;
  const total = subtotal + delivery;

  if (subtotalEl) subtotalEl.textContent = `${subtotal.toFixed(0)} EGP`;
  const deliveryEl = document.getElementById('cartDrawerDelivery');
  if (deliveryEl) deliveryEl.textContent = delivery === 0 ? 'FREE' : `${delivery} EGP`;
  if (totalEl) totalEl.textContent = `${total.toFixed(0)} EGP`;
}

function showToast(message) {
  const existing = document.getElementById('rabbitToast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'rabbitToast';
  toast.className = 'fixed bottom-6 right-6 z-[999] bg-[#02392E] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#C2E31E]/40 animate-bounce-in';
  toast.innerHTML = `
    <span class="w-6 h-6 rounded-full bg-[#C2E31E] text-[#02392E] flex items-center justify-center text-xs font-black">✓</span>
    <span class="text-sm font-semibold">${message}</span>
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function checkoutOrder() {
  const cart = getCart();
  if (Object.keys(cart).length === 0) {
    showToast('سلة مشترياتك فارغة!');
    return;
  }
  alert('شكرًا لطلبك من رابيت! ⚡ سيصلك طلبك خلال ٢٠–٤٠ دقيقة.');
  clearCart();
  closeCartDrawer();
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderCartDrawer();
  initializeArabicExperience();

  // Mobile menu toggle if present
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
});
