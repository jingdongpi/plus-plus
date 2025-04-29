
import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface VoucherItem {
  id: number;
  account: string;
  description: string;
  debit: number | string;
  credit: number | string;
}

interface VoucherFormProps {
  voucher?: any;
  onSave: () => void;
  onCancel: () => void;
}

// Sample account data - in a real app this would come from API/database
const sampleAccounts = [
  { code: "1001", name: "固定资产" },
  { code: "1002", name: "银行存款" },
  { code: "2001", name: "应交税金" },
  { code: "5001", name: "工资费用" },
  { code: "6001", name: "主营业务收入" },
];

const VoucherForm = ({ voucher, onSave, onCancel }: VoucherFormProps) => {
  const isEditing = !!voucher;
  
  const [date, setDate] = useState(voucher?.date || "");
  const [voucherNumber, setVoucherNumber] = useState(voucher?.voucherNumber || "");
  const [description, setDescription] = useState(voucher?.description || "");
  const [items, setItems] = useState<VoucherItem[]>(
    voucher?.items || [{ id: Date.now(), account: "", description: "", debit: "", credit: "" }]
  );
  const [receipts, setReceipts] = useState<File[]>([]);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const addItem = () => {
    setItems([
      ...items,
      { 
        id: Date.now(), 
        account: "", 
        description: "", 
        debit: "", 
        credit: "" 
      }
    ]);
  };

  const removeItem = (id: number) => {
    if (items.length <= 1) {
      toast({
        title: "无法删除",
        description: "凭证至少需要一个明细行",
        variant: "destructive"
      });
      return;
    }
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: number, field: string, value: string) => {
    setItems(
      items.map(item => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const calculateTotals = () => {
    let debitTotal = 0;
    let creditTotal = 0;
    
    items.forEach(item => {
      debitTotal += Number(item.debit) || 0;
      creditTotal += Number(item.credit) || 0;
    });
    
    return { debitTotal, creditTotal };
  };

  const { debitTotal, creditTotal } = calculateTotals();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!date || !voucherNumber || !description) {
      setError("请填写所有必填字段");
      return;
    }
    
    // Validate items
    for (const item of items) {
      if (!item.account || (!item.debit && !item.credit) || (Number(item.debit) > 0 && Number(item.credit) > 0)) {
        setError("每个明细行必须选择科目，且借贷方只能填写一项");
        return;
      }
    }
    
    // Validate double-entry balance
    if (Math.abs(debitTotal - creditTotal) > 0.001) { // Using a small epsilon for floating point comparison
      setError("借方合计必须等于贷方合计");
      return;
    }
    
    // Reset error if validation passed
    setError("");
    
    // In a real app, this would save to an API/database
    onSave();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setReceipts(Array.from(e.target.files));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? "编辑凭证" : "添加新凭证"}
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="date" className="block mb-1">
              日期 <span className="text-red-500">*</span>
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          
          <div>
            <label htmlFor="voucherNumber" className="block mb-1">
              凭证号 <span className="text-red-500">*</span>
            </label>
            <input
              id="voucherNumber"
              type="text"
              value={voucherNumber}
              onChange={(e) => setVoucherNumber(e.target.value)}
              className="w-full border rounded-md p-2"
              required
              placeholder="例如：PZ202304001"
            />
          </div>
          
          <div className="md:col-span-1">
            <label htmlFor="description" className="block mb-1">
              摘要 <span className="text-red-500">*</span>
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-md p-2"
              required
              placeholder="凭证总体描述"
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">凭证明细</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">科目</th>
                  <th className="border p-2 text-left">摘要</th>
                  <th className="border p-2 text-right">借方金额</th>
                  <th className="border p-2 text-right">贷方金额</th>
                  <th className="border p-2 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="border p-2">
                      <select
                        value={item.account}
                        onChange={(e) => updateItem(item.id, "account", e.target.value)}
                        className="w-full border rounded p-1"
                      >
                        <option value="">选择科目</option>
                        {sampleAccounts.map((account) => (
                          <option key={account.code} value={`${account.code} ${account.name}`}>
                            {account.code} {account.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, "description", e.target.value)}
                        className="w-full border rounded p-1"
                        placeholder="明细摘要"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        step="0.01"
                        value={item.debit}
                        onChange={(e) => {
                          updateItem(item.id, "debit", e.target.value);
                          if (e.target.value && Number(e.target.value) > 0) {
                            updateItem(item.id, "credit", "");
                          }
                        }}
                        className="w-full border rounded p-1 text-right"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        step="0.01"
                        value={item.credit}
                        onChange={(e) => {
                          updateItem(item.id, "credit", e.target.value);
                          if (e.target.value && Number(e.target.value) > 0) {
                            updateItem(item.id, "debit", "");
                          }
                        }}
                        className="w-full border rounded p-1 text-right"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="border p-2">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                
                {/* Summary row */}
                <tr className="font-medium bg-gray-50">
                  <td colSpan={2} className="border p-2 text-right">
                    合计:
                  </td>
                  <td className="border p-2 text-right">{debitTotal.toFixed(2)}</td>
                  <td className="border p-2 text-right">{creditTotal.toFixed(2)}</td>
                  <td className="border p-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Balance indicator */}
          <div className="mt-2">
            {Math.abs(debitTotal - creditTotal) < 0.001 ? (
              <p className="text-green-600 text-sm">借贷平衡 ✓</p>
            ) : (
              <p className="text-red-600 text-sm">借贷不平衡 ✗ (差额: {Math.abs(debitTotal - creditTotal).toFixed(2)})</p>
            )}
          </div>
          
          <button
            type="button"
            onClick={addItem}
            className="mt-3 flex items-center text-blue-600 hover:text-blue-800"
          >
            <Plus size={16} className="mr-1" /> 添加明细行
          </button>
        </div>
        
        <div>
          <label htmlFor="receipts" className="block mb-1">票据上传</label>
          <input
            id="receipts"
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="w-full border rounded-md p-2"
          />
          {isEditing && voucher.receipts?.length > 0 && (
            <div className="mt-2">
              <p className="text-sm">已上传文件:</p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {voucher.receipts.map((receipt: string, idx: number) => (
                  <li key={idx}>{receipt}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button
            type="submit"
            className="bg-[#1a3b5d] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            保存
          </button>
        </div>
      </form>
    </div>
  );
};

export default VoucherForm;
