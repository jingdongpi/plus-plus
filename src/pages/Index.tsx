
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import TransactionList from "@/components/transactions/TransactionList";
import TransactionForm from "@/components/transactions/TransactionForm";
import VoucherList from "@/components/vouchers/VoucherList";
import VoucherForm from "@/components/vouchers/VoucherForm";
import AccountList from "@/components/accounts/AccountList";
import AccountForm from "@/components/accounts/AccountForm";
import Header from "@/components/layout/Header";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("transactions");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();

  const handleAddNew = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleSave = (type: string) => {
    toast({
      title: "保存成功",
      description: editingItem ? "记录已更新" : "新记录已添加",
    });
    setShowForm(false);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="transactions">流水账</TabsTrigger>
              <TabsTrigger value="vouchers">凭证管理</TabsTrigger>
              <TabsTrigger value="accounts">科目管理</TabsTrigger>
            </TabsList>
            {!showForm && (
              <button
                onClick={handleAddNew}
                className="bg-[#1a3b5d] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
              >
                {activeTab === "transactions" && "添加交易"}
                {activeTab === "vouchers" && "添加凭证"}
                {activeTab === "accounts" && "添加科目"}
              </button>
            )}
          </div>

          <Card className="p-6">
            <TabsContent value="transactions">
              {showForm ? (
                <TransactionForm 
                  transaction={editingItem} 
                  onSave={() => handleSave("transaction")} 
                  onCancel={handleCancel} 
                />
              ) : (
                <TransactionList onEdit={handleEdit} />
              )}
            </TabsContent>
            
            <TabsContent value="vouchers">
              {showForm ? (
                <VoucherForm 
                  voucher={editingItem} 
                  onSave={() => handleSave("voucher")} 
                  onCancel={handleCancel} 
                />
              ) : (
                <VoucherList onEdit={handleEdit} />
              )}
            </TabsContent>
            
            <TabsContent value="accounts">
              {showForm ? (
                <AccountForm 
                  account={editingItem} 
                  onSave={() => handleSave("account")} 
                  onCancel={handleCancel} 
                />
              ) : (
                <AccountList onEdit={handleEdit} />
              )}
            </TabsContent>
          </Card>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
