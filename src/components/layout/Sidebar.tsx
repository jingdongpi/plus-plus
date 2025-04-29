import { useState } from "react";
import { Home, FileText, Book, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

const MainSidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  const menuItems = [
    {
      title: "首页",
      path: "/",
      icon: Home,
    },
    {
      title: "流水账",
      path: "/?tab=transactions",
      icon: FileText,
    },
    {
      title: "凭证管理",
      path: "/?tab=vouchers",
      icon: FileText,
    },
    {
      title: "科目管理",
      path: "/?tab=accounts",
      icon: Book,
    },
    {
      title: "系统设置",
      path: "/settings",
      icon: Settings,
    },
  ];

  const isActive = (itemPath: string) => {
    if (itemPath === "/") {
      return path === "/" && !location.search;
    }
    if (itemPath.includes("?tab=")) {
      const tabParam = new URLSearchParams(location.search).get("tab");
      return itemPath.includes(`tab=${tabParam}`);
    }
    return path === itemPath;
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center px-4 py-2">
          <h1 className="text-xl font-bold text-sidebar-foreground">内部财务管理系统</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                isActive={isActive(item.path)}
                asChild
                tooltip={item.title}
              >
                <Link to={item.path}>
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2">
          <UserStatusButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

// User login status and logout button component
const UserStatusButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // In a real app, this would come from auth state

  return (
    <button 
      onClick={() => setIsLoggedIn(!isLoggedIn)} 
      className={cn(
        "w-full py-2 px-4 rounded transition-colors text-sm",
        isLoggedIn 
          ? "bg-transparent border border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" 
          : "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-opacity-90"
      )}
    >
      {isLoggedIn ? "退出" : "登录"}
    </button>
  );
};

export default MainSidebar;
