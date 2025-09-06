"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('products');
  
  // نموذج إضافة منتج جديد
  const [productForm, setProductForm] = useState({
    nameAr: '',
    name: '',
    price: '',
    category: '',
    descriptionAr: '',
    description: '',
    dimensions: '',
    material: '',
    color: '',
    images: ['', '', '', ''],
  });

  // نموذج إضافة صورة عمل
  const [workForm, setWorkForm] = useState({
    title: '',
    description: '',
    image: '',
    location: '',
    date: '',
  });

  // بيانات تجريبية للطلبات
  const [orders] = useState([
    {
      id: '001',
      customerName: 'أحمد محمد',
      phone: '0501234567',
      total: 4200,
      status: 'جديد',
      date: '2024-01-20',
      items: ['طقم صالون كلاسيكي'],
    },
    {
      id: '002',
      customerName: 'فاطمة العلي',
      phone: '0509876543',
      total: 2500,
      status: 'تم التسليم',
      date: '2024-01-18',
      items: ['سرير ملكي فاخر'],
    },
    {
      id: '003',
      customerName: 'محمد السالم',
      phone: '0551234567',
      total: 8500,
      status: 'قيد التنفيذ',
      date: '2024-01-19',
      items: ['مطبخ متكامل حديث'],
    },
  ]);

  // بيانات تجريبية للأعمال السابقة
  const [gallery] = useState([
    {
      id: '1',
      title: 'فيلا سكنية - الرياض',
      description: 'تأثيث كامل لفيلا من 4 غرف',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/acd8f563-d226-4f8a-8655-8408bffd1fd5.png',
      location: 'الرياض',
      date: '2023-12-15',
    },
    {
      id: '2',
      title: 'مكاتب شركة تجارية',
      description: 'تصميم وتأثيث مكاتب إدارية',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/aaa1f256-ccc7-4c7d-82c8-492ac8f0fe95.png',
      location: 'جدة',
      date: '2023-11-20',
    },
  ]);

  const categories = [
    { id: 'bedroom', name: 'غرف النوم' },
    { id: 'living-room', name: 'الصالونات' },
    { id: 'kitchen', name: 'المطابخ' },
    { id: 'office', name: 'المكاتب' },
    { id: 'dining', name: 'غرف الطعام' },
  ];

  const handleProductInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleWorkInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setWorkForm({
      ...workForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...productForm.images];
    newImages[index] = value;
    setProductForm({
      ...productForm,
      images: newImages,
    });
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا يمكن إرسال البيانات لحفظ المنتج
    alert('تم إضافة المنتج بنجاح!');
    setProductForm({
      nameAr: '',
      name: '',
      price: '',
      category: '',
      descriptionAr: '',
      description: '',
      dimensions: '',
      material: '',
      color: '',
      images: ['', '', '', ''],
    });
  };

  const handleWorkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا يمكن إرسال البيانات لحفظ العمل
    alert('تم إضافة العمل بنجاح!');
    setWorkForm({
      title: '',
      description: '',
      image: '',
      location: '',
      date: '',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'جديد':
        return 'bg-blue-600';
      case 'قيد التنفيذ':
        return 'bg-yellow-600';
      case 'تم التسليم':
        return 'bg-green-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 font-amiri text-right">
            لوحة إدارة المحتوى
          </h1>
          <p className="text-gray-600 text-lg text-right">
            إدارة المنتجات والطلبات ومعرض الأعمال
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="products" className="font-amiri">المنتجات</TabsTrigger>
            <TabsTrigger value="orders" className="font-amiri">الطلبات</TabsTrigger>
            <TabsTrigger value="gallery" className="font-amiri">معرض الأعمال</TabsTrigger>
            <TabsTrigger value="stats" className="font-amiri">الإحصائيات</TabsTrigger>
          </TabsList>

          {/* إدارة المنتجات */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-right font-amiri">إضافة منتج جديد</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProductSubmit} className="space-y-6">
                  {/* معلومات أساسية */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nameAr" className="text-right block mb-2">
                        اسم المنتج (عربي) *
                      </Label>
                      <Input
                        id="nameAr"
                        name="nameAr"
                        value={productForm.nameAr}
                        onChange={handleProductInputChange}
                        placeholder="مثال: سرير ملكي فاخر"
                        required
                        className="text-right"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="name" className="text-right block mb-2">
                        اسم المنتج (إنجليزي) *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={productForm.name}
                        onChange={handleProductInputChange}
                        placeholder="Example: Luxury Royal Bed"
                        required
                        className="text-right"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price" className="text-right block mb-2">
                        السعر (ر.س) *
                      </Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        value={productForm.price}
                        onChange={handleProductInputChange}
                        placeholder="2500"
                        required
                        className="text-right"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="category" className="text-right block mb-2">
                        الفئة *
                      </Label>
                      <Select value={productForm.category} onValueChange={(value) => setProductForm({...productForm, category: value})}>
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
                  </div>

                  {/* الوصف */}
                  <div>
                    <Label htmlFor="descriptionAr" className="text-right block mb-2">
                      الوصف (عربي) *
                    </Label>
                    <Textarea
                      id="descriptionAr"
                      name="descriptionAr"
                      value={productForm.descriptionAr}
                      onChange={handleProductInputChange}
                      placeholder="وصف تفصيلي للمنتج باللغة العربية..."
                      required
                      className="text-right min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-right block mb-2">
                      الوصف (إنجليزي) *
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={productForm.description}
                      onChange={handleProductInputChange}
                      placeholder="Detailed product description in English..."
                      required
                      className="text-right min-h-[100px]"
                    />
                  </div>

                  {/* المواصفات */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="dimensions" className="text-right block mb-2">
                        الأبعاد
                      </Label>
                      <Input
                        id="dimensions"
                        name="dimensions"
                        value={productForm.dimensions}
                        onChange={handleProductInputChange}
                        placeholder="200x180x120 سم"
                        className="text-right"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="material" className="text-right block mb-2">
                        المواد
                      </Label>
                      <Input
                        id="material"
                        name="material"
                        value={productForm.material}
                        onChange={handleProductInputChange}
                        placeholder="خشب البلوط الصلب"
                        className="text-right"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="color" className="text-right block mb-2">
                        اللون
                      </Label>
                      <Input
                        id="color"
                        name="color"
                        value={productForm.color}
                        onChange={handleProductInputChange}
                        placeholder="بني داكن مع تفاصيل ذهبية"
                        className="text-right"
                      />
                    </div>
                  </div>

                  {/* الصور */}
                  <div>
                    <Label className="text-right block mb-4">صور المنتج (روابط الصور)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {productForm.images.map((image, index) => (
                        <div key={index}>
                          <Label className="text-right block mb-2">
                            صورة {index + 1} {index === 0 && '(الصورة الرئيسية)'}
                          </Label>
                          <Input
                            value={image}
                            onChange={(e) => handleImageChange(index, e.target.value)}
                            placeholder="رابط الصورة..."
                            className="text-right"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 font-amiri">
                    إضافة المنتج
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* إدارة الطلبات */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-right font-amiri">الطلبات الحالية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="border-l-4 border-amber-600">
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                          <div className="text-right">
                            <h3 className="font-semibold font-amiri">طلب #{order.id}</h3>
                            <p className="text-gray-600">{order.customerName}</p>
                            <p className="text-sm text-gray-500">{order.phone}</p>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-sm text-gray-600 mb-1">المنتجات:</p>
                            {order.items.map((item, index) => (
                              <p key={index} className="text-sm">{item}</p>
                            ))}
                          </div>
                          
                          <div className="text-right">
                            <p className="text-lg font-bold text-amber-600 font-amiri">
                              {order.total.toLocaleString()} ر.س
                            </p>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                          
                          <div className="text-center">
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                            <div className="flex gap-2 mt-2">
                              <Button variant="outline" size="sm" className="font-amiri">
                                عرض
                              </Button>
                              <Button size="sm" className="bg-amber-600 hover:bg-amber-700 font-amiri">
                                تحديث
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* معرض الأعمال */}
          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-right font-amiri">إضافة عمل جديد</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWorkSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title" className="text-right block mb-2">
                        عنوان المشروع *
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={workForm.title}
                        onChange={handleWorkInputChange}
                        placeholder="مثال: فيلا سكنية - الرياض"
                        required
                        className="text-right"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="location" className="text-right block mb-2">
                        الموقع
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        value={workForm.location}
                        onChange={handleWorkInputChange}
                        placeholder="الرياض، جدة، الدمام..."
                        className="text-right"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-right block mb-2">
                      وصف المشروع *
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={workForm.description}
                      onChange={handleWorkInputChange}
                      placeholder="وصف تفصيلي للمشروع..."
                      required
                      className="text-right min-h-[80px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="image" className="text-right block mb-2">
                        رابط الصورة *
                      </Label>
                      <Input
                        id="image"
                        name="image"
                        value={workForm.image}
                        onChange={handleWorkInputChange}
                        placeholder="رابط الصورة..."
                        required
                        className="text-right"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="date" className="text-right block mb-2">
                        تاريخ الإنجاز
                      </Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={workForm.date}
                        onChange={handleWorkInputChange}
                        className="text-right"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 font-amiri">
                    إضافة العمل
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* الأعمال الحالية */}
            <Card>
              <CardHeader>
                <CardTitle className="text-right font-amiri">الأعمال الحالية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {gallery.map((work) => (
                    <Card key={work.id} className="overflow-hidden">
                      <div className="h-48">
                        <img
                          src={work.image}
                          alt={work.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-right font-amiri mb-2">
                          {work.title}
                        </h3>
                        <p className="text-sm text-gray-600 text-right mb-2">
                          {work.description}
                        </p>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <span>{work.location}</span>
                          <span>{work.date}</span>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1 font-amiri">
                            تعديل
                          </Button>
                          <Button variant="destructive" size="sm" className="flex-1 font-amiri">
                            حذف
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* الإحصائيات */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-600 mb-2">47</div>
                    <p className="text-gray-600 font-amiri">إجمالي المنتجات</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">23</div>
                    <p className="text-gray-600 font-amiri">الطلبات هذا الشهر</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">156</div>
                    <p className="text-gray-600 font-amiri">إجمالي العملاء</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
                    <p className="text-gray-600 font-amiri">المشاريع المنجزة</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-right font-amiri">ملخص الأداء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-600">إجمالي المبيعات هذا الشهر:</span>
                    <span className="text-2xl font-bold text-amber-600 font-amiri">
                      47,500 ر.س
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-600">متوسط قيمة الطلب:</span>
                    <span className="text-xl font-semibold text-gray-800 font-amiri">
                      2,065 ر.س
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-600">أكثر الفئات مبيعاً:</span>
                    <span className="text-lg font-medium text-gray-800">
                      غرف النوم (32%)
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">معدل الرضا:</span>
                    <span className="text-lg font-medium text-green-600">
                      ⭐ 4.7/5.0
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;