
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Edit2, Trash2, FileText } from "lucide-react";
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
const sampleTransactions = [
  { 
    id: 1, 
    date: '2023-04-10', 
    description: '办公用品采购', 
    amount: -1500, 
    category: '办公费用', 
    notes: '为财务部购买打印纸和墨盒',
    receipt: 'receipt-001.jpg'
  },
  { 
    id: 2, 
    date: '2023-04-15', 
    description: '客户付款', 
    amount: 12000, 
    category: '销售收入', 
    notes: '客户XYZ公司支付服务费',
    receipt: null
  },
  { 
    id: 3, 
    date: '2023-04-20', 
    description: '水电费', 
    amount: -850, 
    category: '日常开支', 
    notes: '4月份办公室水电费',
    receipt: 'receipt-002.jpg'
  },
  { 
    id: 4, 
    date: '2023-04-25', 
    description: '员工工资', 
    amount: -25000, 
    category: '工资', 
    notes: '4月份员工工资发放',
    receipt: null
  }
];

interface TransactionListProps {
  onEdit: (transaction: any) => void;
}

const TransactionList = ({ onEdit }: TransactionListProps) => {
  const [transactions] = useState(sampleTransactions);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    // In a real app, this would call an API to delete the transaction
    toast({
      title: "删除成功",
      description: `交易记录 #${id} 已删除`,
    });
  };

  const handleViewReceipt = (receipt: string) => {
    // In a real app, this would show the receipt image/file
    alert(`查看票据: ${receipt}`);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">流水账记录</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex items-center">
            <label htmlFor="startDate" className="mr-2 whitespace-nowrap">开始日期:</label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded p-2"
            />
          </div>
          
          <div className="flex items-center">
            <label htmlFor="endDate" className="mr-2 whitespace-nowrap">结束日期:</label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded p-2"
            />
          </div>
          
          <button className="bg-[#1a3b5d] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors">
            筛选
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>日期</TableHead>
              <TableHead>描述</TableHead>
              <TableHead>金额 (¥)</TableHead>
              <TableHead>类别</TableHead>
              <TableHead>备注</TableHead>
              <TableHead>票据</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
                  {transaction.amount > 0 ? `+${transaction.amount.toFixed(2)}` : transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{transaction.notes}</TableCell>
                <TableCell>
                  {transaction.receipt ? (
                    <button 
                      onClick={() => handleViewReceipt(transaction.receipt!)} 
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FileText size={18} />
                    </button>
                  ) : (
                    <span className="text-gray-400">无</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onEdit(transaction)} 
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
                            您确定要删除这条交易记录吗？此操作无法撤销。
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>取消</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(transaction.id)}>
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

export default TransactionList;
