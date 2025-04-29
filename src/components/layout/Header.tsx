
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import MainSidebar from "./Sidebar";

const Header = () => {
  return (
    <header className="bg-[#1a3b5d] text-white py-4 px-6 shadow-md md:hidden">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#1a3b5d] text-white w-64 p-0">
              <MainSidebar />
            </SheetContent>
          </Sheet>
          <Link to="/" className="text-xl font-bold">
            <h1>内部财务管理系统</h1>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
