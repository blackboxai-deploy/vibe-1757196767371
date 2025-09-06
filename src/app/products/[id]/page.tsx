"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart, Product } from '@/contexts/CartContext';
import Link from 'next/link';

// بيانات تجريبية للمنتجات (نفس البيانات من صفحة المنتجات)
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Luxury Royal Bed',
    nameAr: 'سرير ملكي فاخر',
    price: 2500,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2f32019c-946a-4256-b495-962ba6f7d5b6.png',
    images: [
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/80699f1c-02b4-4fe6-a44e-22a31f66d42e.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/46ff68fc-fa77-4488-b341-a9279985d79a.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/542f1fd8-a5f3-45ad-a268-acba80529577.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1e252711-5439-4599-a45c-faeb3058d81a.png'
    ],
    category: 'bedroom',
    categoryAr: 'غرف النوم',
    description: 'Luxurious royal bed with carved wooden frame and velvet upholstered headboard',
    descriptionAr: 'سرير ملكي فاخر مصنوع من أجود أنواع خشب البلوط الصلب، يتميز بإطار منحوت يدوياً بتفاصيل ذهبية أنيقة ولوح رأس مبطن بأفخر أنواع القماش المخملي. السرير مصمم ليوفر الراحة والأناقة، مع دعم ممتاز للمرتبة وتصميم يضفي طابعاً ملكياً على غرفة النوم. يأتي مع طاولتين جانبيتين مطابقتين بنفس التصميم والجودة.',
    inStock: true,
    rating: 4.8,
    reviews: 24,
    dimensions: '200x180x120 سم',
    material: 'خشب البلوط الصلب مع قماش مخملي',
    color: 'بني داكن مع تفاصيل ذهبية'
  },
  {
    id: '2',
    name: 'Classic Living Room Set',
    nameAr: 'طقم صالون كلاسيكي',
    price: 4200,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0dfb2dc7-7a08-4cd2-a923-868c16db62d4.png',
    images: [
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f6a4d3cc-36e7-4cfa-b71e-b81477f05336.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1db96349-7d26-472c-b60f-71d46b54ca12.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cacebb37-27ff-41d2-90b5-a479c3029a87.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/db772a43-3d64-42ef-9d0a-dd3f64507883.png'
    ],
    category: 'living-room',
    categoryAr: 'الصالونات',
    description: 'Elegant classical living room set with velvet upholstery and marble coffee table',
    descriptionAr: 'طقم صالون كلاسيكي فاخر مكون من كنبة ثلاثية ومقعدين مفردين وطاولة وسط رخامية. التنجيد من أفخر أنواع القماش المخملي بلون ذهبي أنيق، مع إطار خشبي صلب منحوت يدوياً بتفاصيل باروكية رائعة. طاولة الوسط من الرخام الطبيعي عالي الجودة مع قاعدة معدنية ذهبية منحوتة. الطقم مصمم ليضفي لمسة من الفخامة والأناقة الكلاسيكية على صالة الاستقبال.',
    inStock: true,
    rating: 4.9,
    reviews: 18,
    dimensions: 'الكنبة: 220x90x85 سم، المقاعد: 90x90x85 سم',
    material: 'إطار خشبي صلب مع قماش مخملي ورخام طبيعي',
    color: 'ذهبي مخملي مع تفاصيل بنية'
  },
  {
    id: '3',
    name: 'Modern Kitchen Set',
    nameAr: 'مطبخ متكامل حديث',
    price: 8500,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6b474d25-8eab-406c-9bf5-4bb50e457b54.png',
    images: [
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fee8fe40-0012-4f64-90b7-4d6ce8aca935.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8fb24cbb-0b6f-4dfe-b06b-73bcb84698f2.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8f017f8a-ddb7-46ca-951f-00a0a7017ba1.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a1487322-27f5-4c2e-a32a-7b6015fe9ca6.png'
    ],
    category: 'kitchen',
    categoryAr: 'المطابخ',
    description: 'Complete modern kitchen with island, built-in appliances and LED lighting',
    descriptionAr: 'مطبخ متكامل بتصميم عصري يلبي احتياجات المطبخ الحديث، يشمل خزائن علوية وسفلية بتشطيبات عالية الجودة وجزيرة وسطية متعددة الاستخدامات. الأسطح من الرخام الطبيعي المقاوم للحرارة والخدوش، مع إضاءة LED مخفية تضفي إضاءة مثالية. يتضمن المطبخ جميع الأجهزة المدمجة من الفرن والشفاط وغسالة الأطباق. التصميم يجمع بين الوظائف العملية والجمالية ليناسب نمط الحياة المعاصر.',
    inStock: true,
    rating: 4.7,
    reviews: 31,
    dimensions: '4x3 متر مع جزيرة 2x1 متر',
    material: 'خشب MDF مقاوم للرطوبة مع رخام طبيعي',
    color: 'أبيض ناصع مع رمادي أنثراسيت'
  },
  {
    id: '4',
    name: 'Executive Office Desk',
    nameAr: 'مكتب تنفيذي راقي',
    price: 1800,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b8fdb5f3-600c-4a24-8ad1-751ce26d61ad.png',
    images: [
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8a3c6214-7a6b-4fd9-986f-78bc47cfbbe5.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a87ec311-41dd-4eb3-b131-c813df8c6a98.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ade60532-40d1-4973-a8ed-80b79d891fa3.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fb17cc11-667c-46de-8fbe-4005c2199c22.png'
    ],
    category: 'office',
    categoryAr: 'المكاتب',
    description: 'Executive office desk with walnut wood, gold details and hidden drawer',
    descriptionAr: 'مكتب تنفيذي راقي مصنوع من خشب الجوز الطبيعي الفاخر، مصمم خصيصاً للمدراء ورجال الأعمال الذين يقدرون الجودة والأناقة. يتميز بسطح عمل واسع مكسو بالجلد الطبيعي، وأدراج متعددة بآليات إغلاق ناعمة، ودرج سري مخفي بنظام قفل آمن. التفاصيل الذهبية المنحوتة تضفي لمسة من الفخامة والوقار. المكتب يوفر مساحة تخزين ممتازة مع تنظيم عملي لجميع مستلزمات المكتب.',
    inStock: true,
    rating: 4.6,
    reviews: 12,
    dimensions: '180x80x75 سم مع أدراج جانبية',
    material: 'خشب الجوز الطبيعي مع جلد أصلي وتفاصيل نحاسية',
    color: 'بني جوزي داكن مع تفاصيل ذهبية'
  },
];

// بيانات تجريبية للتقييمات
const sampleReviews = [
  {
    id: '1',
    productId: '1',
    customerName: 'أحمد محمد',
    rating: 5,
    comment: 'منتج رائع جداً، الجودة عالية والتصميم فاخر. أنصح بالشراء.',
    date: '2024-01-15',
    verified: true
  },
  {
    id: '2',
    productId: '1',
    customerName: 'فاطمة العلي',
    rating: 4,
    comment: 'السرير جميل وجودة الخشب ممتازة، لكن التسليم تأخر قليلاً.',
    date: '2024-01-10',
    verified: true
  },
  {
    id: '3',
    productId: '2',
    customerName: 'سارة أحمد',
    rating: 5,
    comment: 'طقم الصالون تحفة فنية حقيقية، غير شكل البيت تماماً!',
    date: '2024-01-08',
    verified: true
  },
];

const ProductDetailPage = () => {
  const params = useParams();
  const productId = params.id as string;
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    // البحث عن المنتج
    const foundProduct = sampleProducts.find(p => p.id === productId);
    setProduct(foundProduct || null);
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">المنتج غير موجود</h1>
          <Button asChild className="bg-amber-600 hover:bg-amber-700 font-amiri">
            <Link href="/products">العودة للمنتجات</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const productReviews = sampleReviews.filter(review => review.productId === product.id);

  // منتجات مشابهة (نفس الفئة)
  const relatedProducts = sampleProducts.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* مسار التنقل */}
        <nav className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-amber-600">الرئيسية</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-amber-600">المنتجات</Link>
          <span>/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-amber-600">
            {product.categoryAr}
          </Link>
          <span>/</span>
          <span className="text-amber-600 font-medium">{product.nameAr}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* معرض الصور */}
          <div className="space-y-4">
            {/* الصورة الرئيسية */}
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.images[selectedImageIndex] || product.image}
                alt={product.nameAr}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* الصور المصغرة */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                    selectedImageIndex === index 
                      ? 'border-amber-600 shadow-lg' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.nameAr} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* تفاصيل المنتج */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-4">{product.categoryAr}</Badge>
              <h1 className="text-3xl font-bold text-gray-800 mb-4 font-amiri text-right">
                {product.nameAr}
              </h1>
              
              {/* التقييم */}
              <div className="flex items-center space-x-4 space-x-reverse mb-4">
                <div className="flex items-center space-x-1 space-x-reverse">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-lg ${
                        star <= Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-sm text-gray-600 mr-2">
                    ({product.rating}) - {product.reviews} تقييم
                  </span>
                </div>
                
                {product.inStock ? (
                  <Badge className="bg-green-600">متوفر</Badge>
                ) : (
                  <Badge variant="destructive">غير متوفر</Badge>
                )}
              </div>
            </div>

            {/* السعر */}
            <div className="text-right">
              <span className="text-4xl font-bold text-amber-600 font-amiri">
                {product.price.toLocaleString()} ر.س
              </span>
            </div>

            {/* الوصف المختصر */}
            <p className="text-gray-600 leading-relaxed text-right">
              {product.descriptionAr.substring(0, 200)}...
            </p>

            <Separator />

            {/* المواصفات السريعة */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-right">
                <h3 className="font-semibold text-gray-800 mb-2">الأبعاد</h3>
                <p className="text-gray-600">{product.dimensions}</p>
              </div>
              <div className="text-right">
                <h3 className="font-semibold text-gray-800 mb-2">المواد</h3>
                <p className="text-gray-600">{product.material}</p>
              </div>
              <div className="text-right">
                <h3 className="font-semibold text-gray-800 mb-2">اللون</h3>
                <p className="text-gray-600">{product.color}</p>
              </div>
              <div className="text-right">
                <h3 className="font-semibold text-gray-800 mb-2">الفئة</h3>
                <p className="text-gray-600">{product.categoryAr}</p>
              </div>
            </div>

            <Separator />

            {/* الكمية وإضافة للسلة */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 space-x-reverse">
                <label className="font-medium text-gray-700">الكمية:</label>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  className="flex-1 bg-amber-600 hover:bg-amber-700 font-amiri"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  أضف إلى السلة
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white font-amiri"
                >
                  أضف للمفضلة
                </Button>
              </div>
            </div>

            {/* معلومات إضافية */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-right">
              <p className="text-sm text-gray-600">🚚 شحن مجاني للطلبات أكثر من 1000 ر.س</p>
              <p className="text-sm text-gray-600">📞 خدمة عملاء 24/7</p>
              <p className="text-sm text-gray-600">🔧 تركيب مجاني في الرياض وجدة</p>
              <p className="text-sm text-gray-600">📅 ضمان شامل لمدة سنتين</p>
            </div>
          </div>
        </div>

        {/* تفاصيل إضافية */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="description" className="font-amiri">الوصف التفصيلي</TabsTrigger>
            <TabsTrigger value="specifications" className="font-amiri">المواصفات</TabsTrigger>
            <TabsTrigger value="reviews" className="font-amiri">آراء العملاء ({product.reviews})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-right font-amiri">الوصف التفصيلي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg max-w-none text-right rtl:text-right" dir="rtl">
                  <p className="text-gray-700 leading-relaxed">
                    {product.descriptionAr}
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-8 mb-4 font-amiri">ميزات المنتج:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>مصنوع من مواد عالية الجودة ومستدامة</li>
                    <li>تصميم أنيق يناسب الديكور الحديث والكلاسيكي</li>
                    <li>سهولة في التنظيف والصيانة</li>
                    <li>مقاوم للاستخدام اليومي والتآكل</li>
                    <li>يأتي مع ضمان شامل من الشركة المصنعة</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-right font-amiri">المواصفات التفصيلية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4 text-right">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">الأبعاد:</span>
                      <span className="text-gray-600">{product.dimensions}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">المواد:</span>
                      <span className="text-gray-600">{product.material}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">اللون:</span>
                      <span className="text-gray-600">{product.color}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">الفئة:</span>
                      <span className="text-gray-600">{product.categoryAr}</span>
                    </div>
                  </div>
                  <div className="space-y-4 text-right">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">الوزن:</span>
                      <span className="text-gray-600">حسب المنتج</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">بلد المنشأ:</span>
                      <span className="text-gray-600">تركيا / إيطاليا</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">الضمان:</span>
                      <span className="text-gray-600">سنتان شامل</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">التركيب:</span>
                      <span className="text-gray-600">مجاني في المدن الرئيسية</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-8">
            <div className="space-y-6">
              {/* إحصائيات التقييم */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-right">
                      <div className="text-3xl font-bold text-amber-600">{product.rating}</div>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-lg ${
                              star <= Math.floor(product.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">({product.reviews} تقييم)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* قائمة التقييمات */}
              <div className="space-y-4">
                {productReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-right">
                          <div className="flex items-center space-x-2 space-x-reverse mb-2">
                            <h4 className="font-medium">{review.customerName}</h4>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">مشترٍ موثق</Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-1 space-x-reverse mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={`text-sm ${
                                  star <= review.rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 text-right">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* منتجات مشابهة */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-right font-amiri">
              منتجات مشابهة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.nameAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg font-amiri text-right line-clamp-2">
                      {relatedProduct.nameAr}
                    </CardTitle>
                    <div className="flex items-center justify-between">
                      <div className="text-right">
                        <span className="text-xl font-bold text-amber-600 font-amiri">
                          {relatedProduct.price.toLocaleString()} ر.س
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <span className="text-yellow-400 text-sm">★</span>
                        <span className="text-sm text-gray-600">
                          {relatedProduct.rating}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full bg-amber-600 hover:bg-amber-700 font-amiri">
                      <Link href={`/products/${relatedProduct.id}`}>
                        عرض التفاصيل
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;