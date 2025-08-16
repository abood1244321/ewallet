import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Bell, Moon, Sun, User, Home as HomeIcon, CreditCard, Scan, BarChart, UserCircle } from 'lucide-react';
import { WalletCard } from '@/components/WalletCard';
import { ServiceCube } from '@/components/ServiceCube';
import { TransactionItem } from '@/components/TransactionItem';
import { useTheme } from '@/components/ThemeProvider';
import { useAuth } from '@/hooks/useAuth';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import type { Wallet, Transaction } from '@shared/schema';

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();

  // Initialize wallets for new users
  const initializeWalletsMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/wallets/initialize');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/wallets'] });
    },
  });

  // Fetch user wallets
  const { data: wallets = [], isLoading: walletsLoading } = useQuery<Wallet[]>({
    queryKey: ['/api/wallets'],
    enabled: !!user,
  });

  // Fetch recent transactions
  const { data: transactions = [], isLoading: transactionsLoading } = useQuery<Transaction[]>({
    queryKey: ['/api/transactions'],
    enabled: !!user,
  });

  // Initialize wallets if user doesn't have any
  useEffect(() => {
    if (user && wallets.length === 0 && !walletsLoading) {
      initializeWalletsMutation.mutate();
    }
  }, [user, wallets.length, walletsLoading]);

  const quickActions = [
    { icon: 'paper-plane', title: 'تحويل سريع' },
    { icon: 'mobile-alt', title: 'شحن رصيد' },
    { icon: 'receipt', title: 'دفع فواتير' },
    { icon: 'qrcode', title: 'دفع بالكود' },
  ];

  const services = [
    { icon: 'exchange-alt', title: 'تحويلات مالية' },
    { icon: 'building', title: 'خدمات الحبيشي' },
    { icon: 'credit-card', title: 'الشحن والسداد' },
    { icon: 'shopping-cart', title: 'شراء أونلاين' },
    { icon: 'money-bill-wave', title: 'سحب نقدي' },
    { icon: 'university', title: 'مدفوعات حكومية' },
    { icon: 'gamepad', title: 'خدمات ترفيه' },
    { icon: 'ellipsis-h', title: 'المزيد' },
  ];

  const handleLogout = () => {
    window.location.href = '/api/logout';
  };

  const handleServiceClick = (service: { title: string }) => {
    if (service.title === 'تحويلات مالية') {
      navigate('/financial-transfers');
    } else {
      toast({ title: service.title, description: 'قريباً...' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="bg-white dark:bg-black shadow-sm border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-blue-600" />
              ) : (
                <Sun className="h-5 w-5 text-red-400" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <Bell className="h-5 w-5 text-red-600 dark:text-blue-400" />
            </Button>
          </div>

          <h1 className="text-xl font-bold text-red-600 dark:text-blue-400">
            المحفظة الإلكترونية
          </h1>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-10 h-10 rounded-full bg-blue-600 dark:bg-red-600 flex items-center justify-center"
          >
            <User className="h-5 w-5 text-white" />
          </Button>
        </div>
      </header>

      <div className="p-4 pb-24">
        {/* Currency Wallets Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-red-600 dark:text-blue-400">
              محافظ العملات
            </h2>
            <Button variant="link" className="text-blue-600 dark:text-red-400 text-sm">
              عرض الكل
            </Button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 currency-scroll">
            {walletsLoading ? (
              <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="min-w-[280px] h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : (
              wallets.map((wallet) => (
                <WalletCard key={wallet.id} wallet={wallet} />
              ))
            )}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-red-600 dark:text-blue-400 mb-4">
            الإجراءات السريعة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <ServiceCube
                key={index}
                icon={action.icon}
                title={action.title}
                onClick={() => toast({ title: action.title, description: 'قريباً...' })}
              />
            ))}
          </div>
        </section>

        {/* Services Grid */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-red-600 dark:text-blue-400 mb-4">
            الخدمات
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <ServiceCube
                key={index}
                icon={service.icon}
                title={service.title}
                onClick={() => handleServiceClick(service)}
                className="p-4"
                data-testid={`service-${service.title.replace(/\s+/g, '-')}`}
              />
            ))}
          </div>
        </section>

        {/* Recent Transactions */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-red-600 dark:text-blue-400">
              المعاملات الأخيرة
            </h2>
            <Button variant="link" className="text-blue-600 dark:text-red-400 text-sm">
              عرض الكل
            </Button>
          </div>

          <div className="space-y-3">
            {transactionsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : transactions.length > 0 ? (
              transactions.slice(0, 5).map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                لا توجد معاملات حتى الآن
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center justify-around">
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-blue-600 dark:text-red-400">
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs">الرئيسية</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-gray-500">
            <CreditCard className="w-6 h-6" />
            <span className="text-xs">المعاملات</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-gray-500">
            <Scan className="w-6 h-6" />
            <span className="text-xs">المسح</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-gray-500">
            <BarChart className="w-6 h-6" />
            <span className="text-xs">التقارير</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-gray-500">
            <UserCircle className="w-6 h-6" />
            <span className="text-xs">الملف الشخصي</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}
