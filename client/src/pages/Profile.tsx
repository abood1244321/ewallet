import React from 'react';
import { ArrowLeft, User, Settings, Shield, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';

export default function Profile() {
  const { user } = useAuth();

  const handleLogout = () => {
    window.location.href = '/api/logout';
  };

  const menuItems = [
    { icon: Settings, title: 'الإعدادات العامة', description: 'إدارة تفضيلات الحساب' },
    { icon: Shield, title: 'الأمان والخصوصية', description: 'إعدادات الحماية والتحقق' },
    { icon: HelpCircle, title: 'المساعدة والدعم', description: 'الأسئلة الشائعة والدعم الفني' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="bg-white dark:bg-black shadow-sm border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-5 w-5 text-red-600 dark:text-blue-400" />
          </Button>
          <h1 className="text-xl font-bold text-red-600 dark:text-blue-400">
            الملف الشخصي
          </h1>
        </div>
      </header>

      <div className="p-4">
        {/* User Info Card */}
        <Card className="mb-6 border-blue-200 dark:border-red-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={user?.profileImageUrl || ''} />
                <AvatarFallback className="bg-blue-600 dark:bg-red-600 text-white text-xl">
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-red-600 dark:text-blue-400">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  ✓ حساب موثق
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-3 mb-6">
          {menuItems.map((item, index) => (
            <Card key={index} className="border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-red-700 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-blue-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-red-600 dark:text-blue-400">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut className="h-4 w-4 ml-2" />
          تسجيل الخروج
        </Button>

        {/* App Info */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>المحفظة الإلكترونية أموالي</p>
          <p>الإصدار 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
