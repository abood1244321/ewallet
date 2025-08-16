import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceCube } from '@/components/ServiceCube';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';

export default function FinancialTransfers() {
  const { toast } = useToast();

  const transferOptions = [
    {
      icon: 'user-plus',
      title: 'تحويل إلى مشترك',
      description: 'تحويل أموال إلى مشترك آخر في التطبيق'
    },
    {
      icon: 'repeat',
      title: 'تحويل بين حساباتي',
      description: 'تحويل أموال بين محافظك المختلفة'
    },
    {
      icon: 'network-wired',
      title: 'حوالات شبكات محلية',
      description: 'تحويل عبر الشبكات المحلية'
    },
    {
      icon: 'download',
      title: 'طلبات استلام حوالة',
      description: 'إنشاء وإدارة طلبات استلام الأموال'
    },
    {
      icon: 'building',
      title: 'بنوك ومحافظ',
      description: 'التحويل من وإلى البنوك والمحافظ الأخرى'
    },
    {
      icon: 'wallet',
      title: 'تحويل إلى محافظ أخرى',
      description: 'تحويل إلى محافظ خارجية'
    }
  ];

  const handleTransferOptionClick = (option: typeof transferOptions[0]) => {
    toast({ 
      title: option.title, 
      description: 'سيتم تطوير هذه الخدمة قريباً...' 
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="bg-white dark:bg-black shadow-sm border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" data-testid="button-back">
              <ArrowLeft className="h-5 w-5 text-red-600 dark:text-blue-400" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-red-600 dark:text-blue-400">
            التحويلات المالية
          </h1>
        </div>
      </header>

      <div className="p-4">
        {/* Transfer Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transferOptions.map((option, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleTransferOptionClick(option)}
              data-testid={`card-transfer-option-${index}`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mb-4">
                  <ServiceCube
                    icon={option.icon}
                    title=""
                    onClick={() => {}}
                    className="w-8 h-8 !p-0 !bg-transparent !shadow-none"
                  />
                </div>
                <h3 className="text-lg font-semibold text-red-600 dark:text-blue-400 mb-2">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Info Section */}
        <div className="mt-8 bg-blue-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-blue-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-blue-600 dark:text-red-400 mb-3">
            معلومات مهمة
          </h3>
          <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
              جميع التحويلات آمنة ومشفرة بأحدث التقنيات
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
              يمكنك تتبع جميع معاملاتك في قسم المعاملات
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
              في حالة وجود مشكلة، تواصل مع خدمة العملاء
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}