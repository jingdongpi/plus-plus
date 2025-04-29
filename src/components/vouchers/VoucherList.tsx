
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Edit2, Trash2, FileText, ChevronDown, ChevronUp } from "lucide-react";
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
const sampleVouchers = [
  {
    id: 1,
    date: "2023-04-10",
    voucherNumber: "PZ202304001",
    description: "购买办公设备",
    items: [
      { id: 1, account: "1001 固定资产", description: "购买电脑", debit: 10000, credit: 0 },
      { id: 2, account: "1002 银行存款", description: "支付电脑款", debit: 0, credit: 10000 }
    ],
    receipts: ["receipt-v001.jpg"]
  },
  {
    id: 2,
    date: "2023-04-15",
    voucherNumber: "PZ202304002",
    description: "收到客户款项",
    items: [
      { id: 3, account: "1002 银行存款", description: "客户XYZ付款", debit: 8000, credit: 0 },
      { id: 4, account: "6001 主营业务收入", description: "确认收入", debit: 0, credit: 8000 }
    ],
    receipts: []
  },
  {
    id: 3,
    date: "2023-04-20",
    voucherNumber: "PZ202304003",
    description: "支付员工工资",
    items: [
      { id: 5, account: "5001 工资费用", description: "4月份工资", debit: 25000, credit: 0 },
      { id: 6, account: "2001 应交税金", description: "代扣个人所得税", debit: 0, credit: 2500 },
      { id: 7, account: "1002 银行存款", description: "实发工资", debit: 0, credit: 22500 }
    ],
    receipts: ["receipt-v002.jpg", "receipt-v003.jpg"]
  }
];

interface VoucherListProps {
  onEdit: (voucher: any) => void;
}

const VoucherList = ({ onEdit }: VoucherListProps) => {
  const [vouchers] = useState(sampleVouchers);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expandedVouchers, setExpandedVouchers] = useState<Record<number, boolean>>({});
  const { toast } = useToast();

  const toggleVoucherExpand = (voucherId: number) => {
    setExpandedVouchers(prev => ({
      ...prev,
      [voucherId]: !prev[voucherId]
    }));
  };

  const handleDelete = (id: number) => {
    // In a real app, this would call an API to delete the voucher
    toast({
      title: "删除成功",
      description: `凭证 #${id} 已删除`,
    });
  };

  const handleViewReceipt = (receipt: string) => {
    // In a real app, this would show the receipt image/file
    alert(`查看票据: ${receipt}`);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">凭证列表</h2>
        
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
              <TableHead></TableHead>
              <TableHead>日期</TableHead>
              <TableHead>凭证号</TableHead>
              <TableHead>摘要</TableHead>
              <TableHead>借方合计</TableHead>
              <TableHead>贷方合计</TableHead>
              <TableHead>附件</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vouchers.map((voucher) => {
              // Calculate totals
              const debitTotal = voucher.items.reduce((sum, item) => sum + item.debit, 0);
              const creditTotal = voucher.items.reduce((sum, item) => sum + item.credit, 0);
              const isExpanded = expandedVouchers[voucher.id] || false;
              
              return (
                <>
                  <TableRow key={voucher.id}>
                    <TableCell>
                      <button 
                        onClick={() => toggleVoucherExpand(voucher.id)}
                        className="focus:outline-none"
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </TableCell>
                    <TableCell>{voucher.date}</TableCell>
                    <TableCell>{voucher.voucherNumber}</TableCell>
                    <TableCell>{voucher.description}</TableCell>
                    <TableCell className="text-right">{debitTotal.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{creditTotal.toFixed(2)}</TableCell>
                    <TableCell>
                      {voucher.receipts.length > 0 ? (
                        <div className="flex gap-1">
                          {voucher.receipts.map((receipt, idx) => (
                            <button 
                              key={idx}
                              onClick={() => handleViewReceipt(receipt)} 
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <FileText size={16} />
                            </button>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">无</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => onEdit(voucher)} 
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
                                您确定要删除这张凭证吗？此操作无法撤销。
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>取消</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(voucher.id)}>
                                确认
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                  
                  {/* Expanded details */}
                  {isExpanded && (
                    <TableRow className="bg-gray-50">
                      <TableCell colSpan={8}>
                        <div className="px-4 py-2">
                          <h4 className="font-medium mb-2">凭证明细</h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>科目</TableHead>
                                <TableHead>摘要</TableHead>
                                <TableHead className="text-right">借方金额</TableHead>
                                <TableHead className="text-right">贷方金额</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {voucher.items.map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell>{item.account}</TableCell>
                                  <TableCell>{item.description}</TableCell>
                                  <TableCell className="text-right">{item.debit > 0 ? item.debit.toFixed(2) : '-'}</TableCell>
                                  <TableCell className="text-right">{item.credit > 0 ? item.credit.toFixed(2) : '-'}</TableCell>
                                </TableRow>
                              ))}
                              <TableRow className="font-medium">
                                <TableCell colSpan={2}>合计</TableCell>
                                <TableCell className="text-right">{debitTotal.toFixed(2)}</TableCell>
                                <TableCell className="text-right">{creditTotal.toFixed(2)}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VoucherList;
