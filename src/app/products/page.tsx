"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useCart, Product } from '@/contexts/CartContext';
import Link from 'next/link';

// بيانات المنتجات التجريبية
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Luxury Royal Bed',
    nameAr: 'سرير ملكي فاخر',
    price: 2500,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2b608f2f-b1cb-4288-a8c0-71279aa7956c.png',
    images: [
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1791a7de-f8cc-4e6a-abcf-bac9123460d2.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6aaa3ad7-1b71-47d2-a6d2-2cf0e7929601.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9922764c-2358-4560-b5b2-1876473c8006.png'
    ],
    category: 'bedroom',
    categoryAr: 'غرف النوم',
    description: 'Luxurious royal bed with carved wooden frame and velvet upholstered headboard',
    descriptionAr: 'سرير ملكي فاخر بإطار خشبي منحوت ولوح رأس مبطن بالمخمل، مصنوع من أجود أنواع الخشب مع تفاصيل ذهبية أنيقة',
    inStock: true,
    rating: 4.8,
    reviews: 24,
    dimensions: '200x180x120 سم',
    material: 'خشب البلوط الصلب',
    color: 'بني داكن مع تفاصيل ذهبية'
  },
  {
    id: '2',
    name: 'Classic Living Room Set',
    nameAr: 'طقم صالون كلاسيكي',
    price: 4200,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/589a46a6-9129-4795-8168-2fdf14329a7e.png',
    images: [
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/458713c0-f2bc-4bff-a6a9-90cfb358f481.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8b0f1fa4-622e-4545-9327-61feb418ebc8.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d9549777-15c2-4051-b312-6084f1e0fe27.png'
    ],
    category: 'living-room',
    categoryAr: 'الصالونات',
    description: 'Elegant classical living room set with velvet upholstery and marble coffee table',
    descriptionAr: 'طقم صالون كلاسيكي أنيق بكسوة مخملية فاخرة وطاولة رخامية، يتضمن كنبة ثلاثية ومقعدين مفردين وطاولة وسط',
    inStock: true,
    rating: 4.9,
    reviews: 18,
    dimensions: 'الكنبة: 220x90x85 سم',
    material: 'إطار خشبي صلب مع قماش مخملي',
    color: 'ذهبي مع تفاصيل بنية'
  },
  {
    id: '3',
    name: 'Modern Kitchen Set',
    nameAr: 'مطبخ متكامل حديث',
    price: 8500,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b278c619-cfc8-4beb-b74a-b8085ad28863.png',
    images: [
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/98ad43f4-aaf3-45bd-9d9a-b2079698d94d.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2b27488c-3ae9-463e-a476-763b4fa6fe15.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2ff081a0-9cbe-47db-bf03-4ff6de392cac.png'
    ],
    category: 'kitchen',
    categoryAr: 'المطابخ',
    description: 'Complete modern kitchen with island, built-in appliances and LED lighting',
    descriptionAr: 'مطبخ متكامل حديث يشمل جزيرة وسطية وأجهزة مدمجة وإضاءة LED، مع خزائن عالية الجودة ورخام طبيعي',
    inStock: true,
    rating: 4.7,
    reviews: 31,
    dimensions: '4x3 متر',
    material: 'خشب MDF مع رخام طبيعي',
    color: 'أبيض مع رمادي'
  },
  {
    id: '4',
    name: 'Executive Office Desk',
    nameAr: 'مكتب تنفيذي راقي',
    price: 1800,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0bb73bb0-a6e6-4d0a-8619-6fa285120c1b.png',
    images: [
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/34289faf-1d50-4bc5-a41b-d1707f86b6fb.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/83337535-a55b-4d7f-9569-a30290aa436f.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c025a332-f18a-477b-90f0-0eb81f20dfcd.png'
    ],
    category: 'office',
    categoryAr: 'المكاتب',
    description: 'Executive office desk with walnut wood, gold details and hidden drawer',
    descriptionAr: 'مكتب تنفيذي راقي من خشب الجوز مع تفاصيل ذهبية ودرج سري، مصمم خصيصاً للمدراء ورجال الأعمال',
    inStock: true,
    rating: 4.6,
    reviews: 12,
    dimensions: '180x80x75 سم',
    material: 'خشب الجوز الطبيعي',
    color: 'بني داكن مع ذهبي'
  },
  {
    id: '5',
    name: 'Dining Room Set',
    nameAr: 'طقم غرفة الطعام',
    price: 3200,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2a1c4f5f-ce5f-41a9-860a-b209940945cd.png',
    images: [
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7d8fbdc7-0ff9-48ba-8c66-51cdc1dc7dd0.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a5d24178-4e4b-4b24-8e07-321fea81065d.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/50a52369-27cc-40e3-8da7-b2ff14402a86.png'
    ],
    category: 'dining',
    categoryAr: 'غرف الطعام',
    description: 'Complete dining room set with marble table and 8 upholstered chairs',
    descriptionAr: 'طقم غرفة طعام متكامل يضم طاولة رخامية فاخرة و8 كراسي مبطنة مع بوفيه جانبي للتخزين',
    inStock: true,
    rating: 4.5,
    reviews: 22,
    dimensions: 'الطاولة: 240x110x75 سم',
    material: 'رخام طبيعي مع خشب صلب',
    color: 'أبيض رخامي مع بني'
  },
  {
    id: '6',
    name: 'Bedroom Wardrobe',
    nameAr: 'دولاب غرفة النوم',
    price: 1900,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9f0172c0-9bff-4ce4-8747-51a3e709333b.png',
    images: [
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4f5e38fb-eb53-4e59-9c6d-fc19b8328d50.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/be639e9e-1caa-4f6d-9b3a-528b06253b19.png',
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a67af6a6-cfbe-45c1-ac20-84567612e7b0.png'
    ],
    category: 'bedroom',
    categoryAr: 'غرف النوم',
    description: 'Large bedroom wardrobe with sliding doors, mirror and LED lighting',
    descriptionAr: 'دولاب غرفة نوم واسع بأبواب منزلقة وتنظيم داخلي ممتاز مع مرآة كاملة وإضاءة LED',
    inStock: true,
    rating: 4.4,
    reviews: 19,
    dimensions: '250x60x220 سم',
    material: 'خشب MDF مع مرآة',
    color: 'أبيض مع رمادي'
  },
];

const ProductsPage = () => {
  const { addToCart } = useCart();
  const [products] = useState<Product[]>(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // فئات المنتجات
  const categories = [
    { id: 'all', name: 'جميع المنتجات' },
    { id: 'bedroom', name: 'غرف النوم' },
    { id: 'living-room', name: 'الصالونات' },
    { id: 'kitchen', name: 'المطابخ' },
    { id: 'office', name: 'المكاتب' },
    { id: 'dining', name: 'غرف الطعام' },
  ];

  // خيارات الترتيب
  const sortOptions = [
    { id: 'name', name: 'الاسم (أ-ي)' },
    { id: 'price-low', name: 'السعر (من الأقل)' },
    { id: 'price-high', name: 'السعر (من الأعلى)' },
    { id: 'rating', name: 'التقييم' },
    { id: 'reviews', name: 'الأكثر تقييماً' },
  ];

  // تطبيق الفلاتر
  useEffect(() => {
    let filtered = [...products];

    // فلتر البحث
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.descriptionAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryAr.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // فلتر الفئة
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // فلتر السعر
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // الترتيب
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        default:
          return a.nameAr.localeCompare(b.nameAr, 'ar');
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, priceRange, sortBy]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    // يمكن إضافة رسالة نجاح هنا
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* رأس الصفحة */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 font-amiri text-right">
            متجر المنتجات
          </h1>
          <p className="text-gray-600 text-lg text-right">
            اكتشف مجموعتنا المتميزة من الأثاث عالي الجودة
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* لوحة الفلاتر */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-right font-amiri">تصفية المنتجات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* البحث */}
                <div>
                  <Label htmlFor="search" className="text-right block mb-2">البحث</Label>
                  <Input
                    id="search"
                    placeholder="ابحث عن المنتجات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-right"
                  />
                </div>

                {/* الفئات */}
                <div>
                  <Label className="text-right block mb-3">الفئة</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* نطاق السعر */}
                <div>
                  <Label className="text-right block mb-3">
                    نطاق السعر: {priceRange[0]} - {priceRange[1]} ر.س
                  </Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10000}
                    min={0}
                    step={100}
                    className="mb-4"
                  />
                </div>

                {/* إعادة تعيين الفلاتر */}
                <Button 
                  variant="outline" 
                  className="w-full font-amiri"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setPriceRange([0, 10000]);
                  }}
                >
                  إعادة تعيين الفلاتر
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* منطقة المنتجات */}
          <div className="lg:w-3/4">
            {/* شريط التحكم العلوي */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="flex items-center gap-4">
                {/* زر إظهار الفلاتر للأجهزة الصغيرة */}
                <Button
                  variant="outline"
                  className="lg:hidden font-amiri"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? 'إخفاء الفلاتر' : 'إظهار الفلاتر'}
                </Button>

                {/* طريقة العرض */}
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    شبكة
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    قائمة
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {filteredProducts.length} منتج
                </span>

                {/* الترتيب */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 text-right">
                    <SelectValue placeholder="ترتيب حسب" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* عرض المنتجات */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">لا توجد منتجات تطابق معايير البحث</p>
                <Button 
                  variant="outline" 
                  className="mt-4 font-amiri"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setPriceRange([0, 10000]);
                  }}
                >
                  مسح جميع الفلاتر
                </Button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {filteredProducts.map((product) => (
                  <Card key={product.id} className={`group hover:shadow-xl transition-all duration-300 overflow-hidden ${
                    viewMode === 'list' ? 'flex flex-row' : ''
                  }`}>
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'w-48 h-48' : 'h-56'
                    }`}>
                      <img 
                        src={product.image}
                        alt={product.nameAr}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 space-y-2">
                        {product.inStock ? (
                          <Badge className="bg-green-600">متوفر</Badge>
                        ) : (
                          <Badge variant="destructive">غير متوفر</Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className={viewMode === 'list' ? 'flex-1' : ''}>
                      <CardHeader>
                        <CardTitle className="text-lg font-amiri text-right line-clamp-2">
                          {product.nameAr}
                        </CardTitle>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">{product.categoryAr}</Badge>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <span className="text-yellow-400">★</span>
                            <span className="text-sm text-gray-600">
                              {product.rating} ({product.reviews})
                            </span>
                          </div>
                        </div>
                        {viewMode === 'list' && (
                          <p className="text-sm text-gray-600 text-right line-clamp-2">
                            {product.descriptionAr}
                          </p>
                        )}
                      </CardHeader>
                      
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-right">
                            <span className="text-2xl font-bold text-amber-600 font-amiri">
                              {product.price.toLocaleString()} ر.س
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            asChild 
                            variant="outline" 
                            className="flex-1 font-amiri"
                          >
                            <Link href={`/products/${product.id}`}>
                              عرض التفاصيل
                            </Link>
                          </Button>
                          
                          <Button 
                            className="flex-1 bg-amber-600 hover:bg-amber-700 font-amiri"
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.inStock}
                          >
                            أضف للسلة
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;