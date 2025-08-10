import React from 'react';
import { ArrowDown, ArrowUp, ArrowLeftRight } from 'lucide-react';
import type { Transaction } from '@shared/schema';

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'receive':
        return <ArrowDown className="text-green-600 dark:text-green-400" />;
      case 'send':
        return <ArrowUp className="text-red-600 dark:text-red-400" />;
      case 'transfer':
        return <ArrowLeftRight className="text-blue-600 dark:text-blue-400" />;
      default:
        return <ArrowLeftRight className="text-gray-600 dark:text-gray-400" />;
    }
  };

  const getAmountColor = (type: string) => {
    switch (type) {
      case 'receive':
        return 'text-green-600 dark:text-green-400';
      case 'send':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const formatAmount = (amount: string, type: string) => {
    const num = parseFloat(amount);
    const formatted = new Intl.NumberFormat('ar-EG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
    
    const prefix = type === 'receive' ? '+' : type === 'send' ? '-' : '';
    return `${prefix}${formatted}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('ar-EG', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (diffInHours < 48) {
      return 'أمس - ' + date.toLocaleTimeString('ar-EG', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    } else {
      return date.toLocaleDateString('ar-EG');
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          {getTransactionIcon(transaction.type)}
        </div>
        <div>
          <p className="font-medium text-red-600 dark:text-blue-400">{transaction.description}</p>
          <p className="text-sm text-gray-500">{formatDate(transaction.createdAt?.toString() || '')}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-semibold ${getAmountColor(transaction.type)}`}>
          {formatAmount(transaction.amount, transaction.type)} ريال
        </p>
        <p className="text-sm text-gray-500">{transaction.currency}</p>
      </div>
    </div>
  );
}
