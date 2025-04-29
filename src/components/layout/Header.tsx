
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // In a real app, this would come from auth state

  return (
    <header className="bg-[#1a3b5d] text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#1a3b5d] text-white w-64">
              <nav className="flex flex-col space-y-4 mt-8">
                <a href="#" className="hover:text-[#f7c948] transition-colors">首页</a>
                <a href="#" className="hover:text-[#f7c948] transition-colors">流水账</a>
                <a href="#" className="hover:text-[#f7c948] transition-colors">凭证管理</a>
                <a href="#" className="hover:text-[#f7c948] transition-colors">科目管理</a>
              </nav>
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-bold">内部财务管理系统</h1>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-[#f7c948] transition-colors">首页</a>
          <a href="#" className="hover:text-[#f7c948] transition-colors">流水账</a>
          <a href="#" className="hover:text-[#f7c948] transition-colors">凭证管理</a>
          <a href="#" className="hover:text-[#f7c948] transition-colors">科目管理</a>
        </nav>
        
        <div>
          {isLoggedIn ? (
            <button 
              onClick={() => setIsLoggedIn(false)} 
              className="bg-transparent border border-white px-4 py-1 rounded hover:bg-white hover:text-[#1a3b5d] transition-colors"
            >
              退出
            </button>
          ) : (
            <button 
              onClick={() => setIsLoggedIn(true)} 
              className="bg-white text-[#1a3b5d] px-4 py-1 rounded hover:bg-opacity-90 transition-colors"
            >
              登录
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
