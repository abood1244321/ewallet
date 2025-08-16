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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {transferOptions.map((option, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => handleTransferOptionClick(option)}
              data-testid={`card-transfer-option-${index}`}
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-100/20 to-transparent dark:from-blue-500/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100/20 to-transparent dark:from-red-500/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              {/* Content */}
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 dark:from-blue-500 dark:to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <ServiceCube
                      icon={option.icon}
                      title=""
                      onClick={() => {}}
                      className="w-7 h-7 !p-0 !bg-transparent !shadow-none text-white"
                    />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-blue-400 transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {option.description}
                  </p>
                </div>
                
                {/* Arrow indicator */}
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 bg-red-500 dark:bg-blue-500 rounded-full flex items-center justify-center">
                    <ArrowLeft className="w-4 h-4 text-white transform rotate-180" />
                  </div>
                </div>
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