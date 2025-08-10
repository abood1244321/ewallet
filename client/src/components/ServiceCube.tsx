import React from 'react';
import { Button } from '@/components/ui/button';
import * as Icons from 'lucide-react';

interface ServiceCubeProps {
  icon: string;
  title: string;
  onClick?: () => void;
  className?: string;
}

export function ServiceCube({ icon, title, onClick, className = "" }: ServiceCubeProps) {
  // Map icon names to Lucide icons
  const getIcon = (iconName: string) => {
    const iconMap: Record<string, any> = {
      'paper-plane': Icons.Send,
      'mobile-alt': Icons.Smartphone,
      'receipt': Icons.Receipt,
      'qrcode': Icons.QrCode,
      'exchange-alt': Icons.ArrowLeftRight,
      'building': Icons.Building,
      'credit-card': Icons.CreditCard,
      'shopping-cart': Icons.ShoppingCart,
      'money-bill-wave': Icons.Banknote,
      'university': Icons.University,
      'gamepad': Icons.Gamepad2,
      'ellipsis-h': Icons.MoreHorizontal,
    };

    const IconComponent = iconMap[iconName] || Icons.HelpCircle;
    return IconComponent;
  };

  const IconComponent = getIcon(icon);

  return (
    <Button
      variant="ghost"
      className={`service-cube p-6 rounded-xl text-center h-auto flex-col space-y-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-blue-200 dark:border-red-800 hover:shadow-lg hover:scale-105 transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      <IconComponent className="h-6 w-6 text-blue-600 dark:text-red-400" />
      <p className="font-medium text-red-600 dark:text-blue-400 text-sm">{title}</p>
    </Button>
  );
}
