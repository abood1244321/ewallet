import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wallet, Shield, Smartphone, Globe } from 'lucide-react';

export default function Landing() {
  const handleLogin = () => {
    window.location.href = '/api/login';
  };

  const features = [
    {
      icon: <Wallet className="h-8 w-8 text-blue-600 dark:text-red-400" />,
      title: 'محافظ متعددة العملات',
      description: 'إدارة الريال اليمني والسعودي والدولار الأمريكي في مكان واحد'
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600 dark:text-red-400" />,
      title: 'أمان عالي المستوى',
      description: 'تشفير متقدم وحماية متعددة الطبقات لأموالك'
    },
    {
      icon: <Smartphone className="h-8 w-8 text-blue-600 dark:text-red-400" />,
      title: 'سهولة الاستخدام',
      description: 'واجهة عربية بسيطة ومناسبة لجميع الأجهزة'
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600 dark:text-red-400" />,
      title: 'خدمات شاملة',
      description: 'تحويلات، دفع فواتير، شحن رصيد، وخدمات مصرفية متكاملة'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 bg-blue-600 dark:bg-red-600 rounded-full flex items-center justify-center shadow-lg">
            <Wallet className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-red-600 dark:text-blue-400 mb-4">
            المحفظة الإلكترونية أموالي
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            محفظتك الرقمية الآمنة والشاملة لجميع المعاملات المالية مع دعم ثلاث عملات رئيسية
          </p>
        </header>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="service-cube border-blue-200 dark:border-red-800 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-red-600 dark:text-blue-400 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-md mx-auto bg-white/80 dark:bg-black/80 backdrop-blur-lg border-blue-200 dark:border-red-800">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-red-600 dark:text-blue-400 mb-4">
                ابدأ رحلتك المالية الآن
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                انضم إلى آلاف المستخدمين الذين يثقون في محفظة أموالي لإدارة أموالهم بأمان وسهولة
              </p>
              <Button 
                onClick={handleLogin}
                className="w-full bg-blue-600 dark:bg-red-600 text-white hover:opacity-90 py-3 text-lg font-medium"
                size="lg"
              >
                تسجيل الدخول
              </Button>
              <p className="text-xs text-gray-500 mt-4">
                مدعوم بتقنيات التشفير المتقدمة والحماية المصرفية
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
