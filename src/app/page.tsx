"use client";

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HomePage = () => {
  // بيانات تجريبية للفئات
  const categories = [
    {
      id: 'bedroom',
      name: 'غرف النوم',
      description: 'أناقة وراحة لا مثيل لها',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/33e3ef2f-c7a9-441a-95c1-2fd707ece739.png',
      count: 25,
    },
    {
      id: 'living-room',
      name: 'الصالونات',
      description: 'مساحات للضيافة والاستقبال',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bdebcd82-d35d-46da-b8e9-838ee0bd2e3c.png',
      count: 18,
    },
    {
      id: 'kitchen',
      name: 'المطابخ',
      description: 'تصاميم عملية وأنيقة',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/48be8b28-3c38-471c-ba7c-fa3d225aea8b.png',
      count: 12,
    },
    {
      id: 'office',
      name: 'مكاتب',
      description: 'بيئة عمل مثالية ومريحة',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bee00837-14c3-4af9-a2c5-a9616492c71d.png',
      count: 15,
    },
  ];

  // منتجات مميزة
  const featuredProducts = [
    {
      id: '1',
      name: 'سرير ملكي مزدوج',
      price: 2500,
      originalPrice: 3200,
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/29135972-dfe6-46c4-8448-3537b9c98b4b.png',
      rating: 4.8,
      reviews: 24,
      badge: 'الأكثر مبيعاً',
    },
    {
      id: '2',
      name: 'طقم صالون كلاسيكي',
      price: 4200,
      originalPrice: 5000,
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/29913eca-44d2-4af4-945b-a29b10da5a97.png',
      rating: 4.9,
      reviews: 18,
      badge: 'جديد',
    },
    {
      id: '3',
      name: 'مطبخ متكامل حديث',
      price: 8500,
      originalPrice: 10000,
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/67b365b4-e27b-4189-8364-d804b4385895.png',
      rating: 4.7,
      reviews: 31,
      badge: 'عرض خاص',
    },
    {
      id: '4',
      name: 'مكتب تنفيذي راقي',
      price: 1800,
      originalPrice: 2200,
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/04ce1475-fdab-44ad-a22b-823c3ecf13a9.png',
      rating: 4.6,
      reviews: 12,
      badge: 'محدود',
    },
  ];

  // أعمال سابقة
  const pastWorks = [
    {
      id: '1',
      title: 'فيلا سكنية - الرياض',
      description: 'تأثيث كامل لفيلا من 4 غرف',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3c6d58c5-9131-497f-8669-bb0d3a0cc79c.png',
    },
    {
      id: '2',
      title: 'مكاتب شركة تجارية',
      description: 'تصميم وتأثيث مكاتب إدارية',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/10258156-747d-481c-9313-0dbfd9510eb2.png',
    },
    {
      id: '3',
      title: 'مطعم راقي - جدة',
      description: 'تأثيث كامل لمطعم 100 مقعد',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0d5561ee-4624-4043-86ef-33cbf0e29775.png',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a40e732b-532d-4bf8-a9d4-7d233316c08c.png')`
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white text-right">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 font-amiri leading-tight">
              خفاجي الديك
            </h1>
            <h2 className="text-2xl lg:text-3xl mb-4 font-amiri text-amber-300">
              أثاث فاخر وتصميم راقي
            </h2>
            <p className="text-lg lg:text-xl mb-8 text-gray-200 leading-relaxed">
              اكتشف مجموعتنا المتميزة من الأثاث العصري والكلاسيكي المصنوع بأجود المواد 
              وأحدث التقنيات لتحويل منزلك إلى تحفة فنية
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg font-amiri"
              >
                <Link href="/products">تسوق الآن</Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-amber-700 px-8 py-3 text-lg font-amiri bg-transparent"
              >
                <Link href="/gallery">أعمالنا</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* الفئات الرئيسية */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-amiri">
              فئات منتجاتنا
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              اختر من مجموعة متنوعة من الأثاث عالي الجودة لكل غرفة في منزلك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <Badge className="absolute top-3 right-3 bg-amber-600">
                    {category.count} منتج
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-amiri text-right">{category.name}</CardTitle>
                  <CardDescription className="text-right">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-amber-600 hover:bg-amber-700 font-amiri">
                    <Link href={`/products?category=${category.id}`}>
                      تصفح المنتجات
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* المنتجات المميزة */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-amiri">
              المنتجات المميزة
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              اختيارات مميزة من أفضل منتجاتنا بأسعار حصرية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className={`absolute top-3 right-3 ${
                    product.badge === 'الأكثر مبيعاً' ? 'bg-green-600' :
                    product.badge === 'جديد' ? 'bg-blue-600' :
                    product.badge === 'عرض خاص' ? 'bg-red-600' : 'bg-amber-600'
                  }`}>
                    {product.badge}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg font-amiri text-right line-clamp-2">
                    {product.name}
                  </CardTitle>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-right">
                      <span className="text-2xl font-bold text-amber-600 font-amiri">
                        {product.price.toLocaleString()} ر.س
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through mr-2">
                          {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button asChild className="w-full bg-amber-600 hover:bg-amber-700 font-amiri">
                    <Link href={`/products/${product.id}`}>
                      عرض التفاصيل
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white font-amiri">
              <Link href="/products">عرض جميع المنتجات</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* أعمالنا السابقة */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-amiri">
              أعمالنا السابقة
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              نفخر بثقة عملائنا وإنجازاتنا في مشاريع التأثيث والتصميم الداخلي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastWorks.map((work) => (
              <Card key={work.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-amiri text-right">{work.title}</CardTitle>
                  <CardDescription className="text-right">{work.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white font-amiri">
              <Link href="/gallery">عرض جميع الأعمال</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-right">
              <h3 className="text-xl font-bold mb-4 font-amiri">خفاجي الديك</h3>
              <p className="text-gray-300 leading-relaxed">
                شركة متخصصة في بيع وتصميم الأثاث الفاخر مع أكثر من 15 عاماً من الخبرة في السوق السعودي
              </p>
            </div>
            
            <div className="text-right">
              <h4 className="text-lg font-semibold mb-4 font-amiri">روابط سريعة</h4>
              <ul className="space-y-2">
                <li><Link href="/products" className="text-gray-300 hover:text-amber-400 transition-colors">المنتجات</Link></li>
                <li><Link href="/gallery" className="text-gray-300 hover:text-amber-400 transition-colors">أعمالنا</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-amber-400 transition-colors">من نحن</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-amber-400 transition-colors">اتصل بنا</Link></li>
              </ul>
            </div>
            
            <div className="text-right">
              <h4 className="text-lg font-semibold mb-4 font-amiri">الفئات</h4>
              <ul className="space-y-2">
                <li><Link href="/products?category=bedroom" className="text-gray-300 hover:text-amber-400 transition-colors">غرف النوم</Link></li>
                <li><Link href="/products?category=living-room" className="text-gray-300 hover:text-amber-400 transition-colors">الصالونات</Link></li>
                <li><Link href="/products?category=kitchen" className="text-gray-300 hover:text-amber-400 transition-colors">المطابخ</Link></li>
                <li><Link href="/products?category=office" className="text-gray-300 hover:text-amber-400 transition-colors">المكاتب</Link></li>
              </ul>
            </div>
            
            <div className="text-right">
              <h4 className="text-lg font-semibold mb-4 font-amiri">اتصل بنا</h4>
              <div className="space-y-3 text-gray-300">
                <p>📍 الرياض، المملكة العربية السعودية</p>
                <p>📞 +966 50 123 4567</p>
                <p>✉️ info@khafaji-furniture.com</p>
                <div className="flex space-x-4 space-x-reverse mt-4">
                  <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">📘</a>
                  <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">📷</a>
                  <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">🐦</a>
                  <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">📞</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">
              © 2024 خفاجي الديك. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;