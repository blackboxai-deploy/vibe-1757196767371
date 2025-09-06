"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const Header = () => {
  const { getItemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems = [
    { name: 'الرئيسية', href: '/' },
    { 
      name: 'المنتجات', 
      href: '/products',
      subItems: [
        { name: 'غرف نوم', href: '/products?category=bedroom' },
        { name: 'صالونات', href: '/products?category=living-room' },
        { name: 'مطابخ', href: '/products?category=kitchen' },
        { name: 'مكاتب', href: '/products?category=office' },
        { name: 'إكسسوارات', href: '/products?category=accessories' },
      ]
    },
    { name: 'أعمالنا', href: '/gallery' },
    { name: 'من نحن', href: '/about' },
    { name: 'اتصل بنا', href: '/contact' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      {/* شريط علوي للإعلانات */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-2">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-medium">
            ✨ عروض خاصة على جميع المنتجات - خصم يصل إلى 30% ✨
          </p>
        </div>
      </div>

      {/* الرأس الرئيسي */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* الشعار */}
          <Link href="/" className="flex items-center space-x-2 space-x-reverse">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">خ</span>
            </div>
            <div className="text-right">
              <h1 className="text-2xl font-bold font-amiri text-amber-700">خفاجي الديك</h1>
              <p className="text-xs text-gray-600">أثاث فاخر وتصميم راقي</p>
            </div>
          </Link>

          {/* شريط البحث - الأجهزة الكبيرة */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="ابحث عن المنتجات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-4 pl-12 py-2 w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-amber-600 hover:bg-amber-700"
              >
                بحث
              </Button>
            </form>
          </div>

          {/* الأيقونات والقائمة */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* سلة التسوق */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <span className="sr-only">سلة التسوق</span>
                  🛒
                  {getItemCount() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 bg-amber-600 text-xs">
                      {getItemCount()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle className="text-right font-amiri">سلة التسوق</SheetTitle>
                  <SheetDescription className="text-right">
                    مراجعة المنتجات المحددة
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-8">
                  {getItemCount() === 0 ? (
                    <p className="text-center text-gray-500 py-8">
                      سلة التسوق فارغة
                    </p>
                  ) : (
                    <div>
                      <p className="text-center">سيتم تطوير عرض المنتجات قريباً</p>
                      <Link href="/cart">
                        <Button className="w-full mt-4 bg-amber-600 hover:bg-amber-700">
                          عرض سلة التسوق
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* قائمة التنقل للأجهزة الكبيرة */}
            <nav className="hidden lg:block">
              <NavigationMenu>
                <NavigationMenuList className="space-x-6 space-x-reverse">
                  {navigationItems.map((item) => (
                    <NavigationMenuItem key={item.name}>
                      {item.subItems ? (
                        <>
                          <NavigationMenuTrigger className="font-medium text-gray-700 hover:text-amber-600 font-amiri">
                            {item.name}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[200px] gap-3 p-4">
                              {item.subItems.map((subItem) => (
                                <li key={subItem.name}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={subItem.href}
                                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-amber-50 hover:text-amber-700 focus:bg-amber-50 focus:text-amber-700"
                                    >
                                      <div className="text-sm font-medium leading-none font-amiri">
                                        {subItem.name}
                                      </div>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className="font-medium text-gray-700 hover:text-amber-600 font-amiri px-3 py-2"
                        >
                          {item.name}
                        </Link>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            {/* قائمة الهامبرغر للأجهزة الصغيرة */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <span className="sr-only">فتح القائمة</span>
                  ☰
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <SheetHeader>
                  <SheetTitle className="text-right font-amiri">القائمة</SheetTitle>
                </SheetHeader>
                <div className="mt-8">
                  {/* شريط بحث للأجهزة الصغيرة */}
                  <form onSubmit={handleSearch} className="mb-6">
                    <Input
                      type="text"
                      placeholder="ابحث عن المنتجات..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="mb-2"
                    />
                    <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
                      بحث
                    </Button>
                  </form>
                  
                  {/* روابط التنقل */}
                  <nav className="space-y-4">
                    {navigationItems.map((item) => (
                      <div key={item.name}>
                        <Link
                          href={item.href}
                          className="block py-2 text-lg font-medium text-gray-700 hover:text-amber-600 font-amiri"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                        {item.subItems && (
                          <div className="mr-4 space-y-2 mt-2">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block py-1 text-sm text-gray-600 hover:text-amber-600 font-amiri"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                • {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;