
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Edit2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

// Sample data - in a real app this would come from API/database
const sampleAccounts = [
  { id: 1, code: "1001", name: "固定资产", type: "资产" },
  { id: 2, code: "1002", name: "银行存款", type: "资产" },
  { id: 3, code: "2001", name: "应交税金", type: "负债" },
  { id: 4, code: "5001", name: "工资费用", type: "费用" },
  { id: 5, code: "6001", name: "主营业务收入", type: "收入" },
  { id: 6, code: "4001", name: "实收资本", type: "所有者权益" },
  { id: 7, code: "1003", name: "应收账款", type: "资产" },
  { id: 8, code: "2002", name: "应付账款", type: "负债" },
  { id: 9, code: "5002", name: "办公费用", type: "费用" },
  { id: 10, code: "6002", name: "其他业务收入", type: "收入" }
];

interface AccountListProps {
  onEdit: (account: any) => void;
}

const AccountList = ({ onEdit }: AccountListProps) => {
  const [accounts] = useState(sampleAccounts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("全部");
  const { toast } = useToast();

  const accountTypes = ["全部", "资产", "负债", "所有者权益", "收入", "费用"];

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = 
      account.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
      account.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "全部" || account.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const handleDelete = (id: number) => {
    // In a real app, this would call an API to delete the account
    toast({
      title: "删除成功",
      description: `科目 #${id} 已删除`,
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">科目列表</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="搜索科目代码或名称..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full border rounded-md p-2"
            >
              {accountTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-32">科目代码</TableHead>
              <TableHead>科目名称</TableHead>
              <TableHead>科目类型</TableHead>
              <TableHead className="w-24">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.code}</TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.type}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onEdit(account)} 
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 size={18} />
                    </button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 size={18} />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>确认删除</AlertDialogTitle>
                          <AlertDialogDescription>
                            您确定要删除这个科目吗？此操作无法撤销，且可能影响关联的凭证。
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>取消</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(account.id)}>
                            确认
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AccountList;
