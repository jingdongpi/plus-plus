
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import MainSidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import CompanySettings from "@/components/settings/CompanySettings";
import InitialParameters from "@/components/settings/InitialParameters";

const Settings = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden md:flex">
        <MainSidebar />
      </div>
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 px-4 py-6 md:px-6">
          <h1 className="text-2xl font-bold mb-6">系统设置</h1>

          <Tabs defaultValue="company" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="company">公司信息</TabsTrigger>
              <TabsTrigger value="parameters">期初参数</TabsTrigger>
            </TabsList>
            <TabsContent value="company">
              <Card>
                <CardContent className="pt-6">
                  <CompanySettings />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="parameters">
              <Card>
                <CardContent className="pt-6">
                  <InitialParameters />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Settings;
