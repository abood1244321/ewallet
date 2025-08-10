import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TransactionItem } from '@/components/TransactionItem';
import { useAuth } from '@/hooks/useAuth';
import type { Transaction } from '@shared/schema';

export default function Transactions() {
  const { user } = useAuth();

  const { data: transactions = [], isLoading } = useQuery<Transaction[]>({
    queryKey: ['/api/transactions'],
    enabled: !!user,
  });

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="bg-white dark:bg-black shadow-sm border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-5 w-5 text-red-600 dark:text-blue-400" />
          </Button>
          <h1 className="text-xl font-bold text-red-600 dark:text-blue-400">
            تاريخ المعاملات
          </h1>
        </div>
      </header>

      <div className="p-4">
        {/* Search and Filter */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في المعاملات..."
              className="pr-10 border-gray-300 dark:border-gray-600"
            />
          </div>
          <Button variant="outline" size="sm" className="border-blue-600 dark:border-red-600">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Transaction List */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-red-600 dark:text-blue-400 mb-2">
                لا توجد معاملات
              </h3>
              <p className="text-gray-500">
                لم تقم بأي معاملات مالية حتى الآن
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
