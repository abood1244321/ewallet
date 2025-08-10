import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Send, Download } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import type { Wallet } from '@shared/schema';

interface WalletCardProps {
  wallet: Wallet;
}

const currencyInfo = {
  YER: { name: 'الريال اليمني', symbol: 'ريال' },
  SAR: { name: 'الريال السعودي', symbol: 'ريال' },
  USD: { name: 'الدولار الأمريكي', symbol: 'دولار' },
};

export function WalletCard({ wallet }: WalletCardProps) {
  const [isBalanceVisible, setIsBalanceVisible] = useState(!wallet.isHidden);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const toggleVisibilityMutation = useMutation({
    mutationFn: async () => {
      await apiRequest('PATCH', `/api/wallets/${wallet.id}/toggle-visibility`, {
        isHidden: !wallet.isHidden
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/wallets'] });
      setIsBalanceVisible(!wallet.isHidden);
    },
    onError: () => {
      toast({
        title: 'خطأ',
        description: 'فشل في تغيير إعدادات إظهار الرصيد',
        variant: 'destructive',
      });
    },
  });

  const formatBalance = (balance: string) => {
    const num = parseFloat(balance);
    return new Intl.NumberFormat('ar-EG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const info = currencyInfo[wallet.currency as keyof typeof currencyInfo];

  return (
    <Card className="wallet-card min-w-[280px] p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-red-900/20 dark:to-red-800/20 border-blue-200 dark:border-red-800">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-red-600 dark:text-blue-400">{info.name}</h3>
          <p className="text-sm text-gray-500">{wallet.currency}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleVisibilityMutation.mutate()}
          className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-lg"
          disabled={toggleVisibilityMutation.isPending}
        >
          {isBalanceVisible ? (
            <Eye className="h-4 w-4 text-blue-600 dark:text-red-400" />
          ) : (
            <EyeOff className="h-4 w-4 text-blue-600 dark:text-red-400" />
          )}
        </Button>
      </div>

      <div className="mb-4">
        <p 
          className={`text-2xl font-bold text-red-600 dark:text-blue-400 transition-all duration-300 ${
            !isBalanceVisible ? 'filter blur-md' : ''
          }`}
        >
          {formatBalance(wallet.balance)}
        </p>
        <p className="text-sm text-gray-500">{info.symbol}</p>
      </div>

      <div className="flex gap-2">
        <Button 
          className="flex-1 bg-blue-600 dark:bg-red-600 text-white hover:opacity-90"
          size="sm"
        >
          <Send className="h-4 w-4 ml-2" />
          إرسال
        </Button>
        <Button 
          variant="outline"
          className="flex-1 border-blue-600 dark:border-red-600 text-blue-600 dark:text-red-600"
          size="sm"
        >
          <Download className="h-4 w-4 ml-2" />
          استلام
        </Button>
      </div>
    </Card>
  );
}
