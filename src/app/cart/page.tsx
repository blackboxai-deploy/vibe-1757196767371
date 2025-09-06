"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

const CartPage = () => {
  const { state, updateQuantity, removeFromCart, clearCart } = useCart();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    notes: '',
  });

  const shippingCost = state.total > 1000 ? 0 : 50;
  const finalTotal = state.total + shippingCost;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا يمكن إرسال الطلب إلى الخادم
    alert('تم إرسال طلبك بنجاح! سنتواصل معك قريباً.');
    clearCart();
    setShowOrderForm(false);
    setOrderForm({
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      notes: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOrderForm({
      ...orderForm,
      [e.target.name]: e.target.value,
    });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-6xl">🛒</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4 font-amiri">
                سلة التسوق فارغة
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                لم تقم بإضافة أي منتجات إلى سلة التسوق بعد
              </p>
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 font-amiri">
                <Link href="/products">تصفح المنتجات</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 font-amiri text-right">
            سلة التسوق
          </h1>
          <p className="text-gray-600 text-lg text-right">
            مراجعة وتأكيد منتجاتك المحددة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* قائمة المنتجات */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.product.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* صورة المنتج */}
                    <div className="w-full md:w-32 h-32 flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.nameAr}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* تفاصيل المنتج */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 font-amiri text-right">
                          {item.product.nameAr}
                        </h3>
                        <p className="text-gray-600 text-right">{item.product.categoryAr}</p>
                        {item.product.color && (
                          <p className="text-sm text-gray-500 text-right">
                            اللون: {item.product.color}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* الكمية */}
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Label className="text-sm font-medium">الكمية:</Label>
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </Button>
                            <span className="px-4 py-2 min-w-[60px] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </div>

                        {/* السعر */}
                        <div className="text-right">
                          <div className="text-lg font-bold text-amber-600 font-amiri">
                            {(item.product.price * item.quantity).toLocaleString()} ر.س
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-sm text-gray-500">
                              {item.product.price.toLocaleString()} ر.س × {item.quantity}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* أزرار الإجراءات */}
                      <div className="flex justify-between items-center">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="font-amiri"
                        >
                          إزالة من السلة
                        </Button>
                        
                        <Button variant="outline" size="sm" className="font-amiri" asChild>
                          <Link href={`/products/${item.product.id}`}>
                            عرض التفاصيل
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* أزرار إدارة السلة */}
            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-red-600 border-red-600 hover:bg-red-50 font-amiri"
              >
                مسح السلة
              </Button>
              
              <Button variant="outline" className="font-amiri" asChild>
                <Link href="/products">متابعة التسوق</Link>
              </Button>
            </div>
          </div>

          {/* ملخص الطلب */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-right font-amiri">ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* تفاصيل التكلفة */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">المجموع الفرعي:</span>
                    <span className="font-semibold font-amiri">
                      {state.total.toLocaleString()} ر.س
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">الشحن:</span>
                    <span className={`font-semibold font-amiri ${shippingCost === 0 ? 'text-green-600' : ''}`}>
                      {shippingCost === 0 ? 'مجاني' : `${shippingCost} ر.س`}
                    </span>
                  </div>
                  
                  {shippingCost === 0 && (
                    <p className="text-sm text-green-600 text-right">
                      🎉 تأهلت للشحن المجاني!
                    </p>
                  )}
                  
                  {state.total < 1000 && (
                    <p className="text-sm text-amber-600 text-right">
                      أضف {(1000 - state.total).toLocaleString()} ر.س للحصول على الشحن المجاني
                    </p>
                  )}

                  <Separator />
                  
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>المجموع الكلي:</span>
                    <span className="text-amber-600 font-amiri">
                      {finalTotal.toLocaleString()} ر.س
                    </span>
                  </div>
                </div>

                {/* عدد القطع */}
                <div className="bg-gray-50 p-3 rounded-lg text-right">
                  <p className="text-sm text-gray-600">
                    إجمالي القطع: {state.items.reduce((count, item) => count + item.quantity, 0)} قطعة
                  </p>
                </div>

                {/* زر إتمام الطلب */}
                <Button
                  className="w-full bg-amber-600 hover:bg-amber-700 font-amiri"
                  size="lg"
                  onClick={() => setShowOrderForm(true)}
                >
                  إتمام الطلب
                </Button>

                {/* معلومات إضافية */}
                <div className="space-y-2 text-sm text-gray-600 text-right">
                  <p>✅ دفع آمن ومحمي</p>
                  <p>🚚 تسليم سريع</p>
                  <p>📞 دعم فني متخصص</p>
                  <p>🔄 إرجاع مجاني خلال 30 يوم</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* نموذج الطلب */}
        {showOrderForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="text-right font-amiri">إتمام الطلب</CardTitle>
                <p className="text-gray-600 text-right">
                  املأ بياناتك لإتمام عملية الطلب
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleOrderSubmit} className="space-y-6">
                  {/* معلومات شخصية */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-right block mb-2">
                        الاسم الكامل *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={orderForm.name}
                        onChange={handleInputChange}
                        placeholder="أدخل اسمك الكامل"
                        required
                        className="text-right"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="text-right block mb-2">
                        رقم الهاتف *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={orderForm.phone}
                        onChange={handleInputChange}
                        placeholder="05xxxxxxxx"
                        required
                        className="text-right"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-right block mb-2">
                      البريد الإلكتروني
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={orderForm.email}
                      onChange={handleInputChange}
                      placeholder="example@email.com"
                      className="text-right"
                    />
                  </div>

                  {/* عنوان التسليم */}
                  <div>
                    <Label htmlFor="city" className="text-right block mb-2">
                      المدينة *
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={orderForm.city}
                      onChange={handleInputChange}
                      placeholder="الرياض، جدة، الدمام..."
                      required
                      className="text-right"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-right block mb-2">
                      العنوان التفصيلي *
                    </Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={orderForm.address}
                      onChange={handleInputChange}
                      placeholder="رقم الشارع، اسم الحي، رقم المبنى، رقم الشقة..."
                      required
                      className="text-right min-h-[80px]"
                    />
                  </div>

                  {/* ملاحظات إضافية */}
                  <div>
                    <Label htmlFor="notes" className="text-right block mb-2">
                      ملاحظات إضافية
                    </Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={orderForm.notes}
                      onChange={handleInputChange}
                      placeholder="أي طلبات خاصة أو ملاحظات للتسليم..."
                      className="text-right min-h-[60px]"
                    />
                  </div>

                  {/* ملخص الطلب */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3 text-right font-amiri">
                      ملخص طلبك:
                    </h3>
                    <div className="space-y-2">
                      {state.items.map((item) => (
                        <div key={item.product.id} className="flex justify-between items-center text-sm">
                          <span>{item.product.nameAr} × {item.quantity}</span>
                          <span className="font-semibold font-amiri">
                            {(item.product.price * item.quantity).toLocaleString()} ر.س
                          </span>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex justify-between items-center font-bold">
                        <span>المجموع الكلي:</span>
                        <span className="text-amber-600 font-amiri">
                          {finalTotal.toLocaleString()} ر.س
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* أزرار الإجراءات */}
                  <div className="flex gap-4 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowOrderForm(false)}
                      className="font-amiri"
                    >
                      إلغاء
                    </Button>
                    
                    <Button
                      type="submit"
                      className="bg-amber-600 hover:bg-amber-700 font-amiri"
                    >
                      تأكيد الطلب
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;