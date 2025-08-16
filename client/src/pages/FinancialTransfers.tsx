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
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
          {transferOptions.map((option, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-md p-2 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-red-300 dark:hover:border-blue-400 transition-all duration-200 cursor-pointer"
              onClick={() => handleTransferOptionClick(option)}
              data-testid={`card-transfer-option-${index}`}
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="w-8 h-8 bg-red-100 dark:bg-blue-900/30 rounded-md flex items-center justify-center mb-1 group-hover:bg-red-200 dark:group-hover:bg-blue-800/40 transition-colors">
                  <ServiceCube
                    icon={option.icon}
                    title=""
                    onClick={() => {}}
                    className="w-4 h-4 !p-0 !bg-transparent !shadow-none text-red-600 dark:text-blue-400"
                  />
                </div>
                
                {/* Title */}
                <h3 className="text-xs font-semibold text-gray-800 dark:text-white mb-1 leading-tight text-center">
                  {option.title}
                </h3>
                
                {/* Description - hidden on small cards */}
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight line-clamp-1 hidden sm:block">
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