
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface TransactionFormProps {
  transaction?: any;
  onSave: () => void;
  onCancel: () => void;
}

const TransactionForm = ({ transaction, onSave, onCancel }: TransactionFormProps) => {
  const isEditing = !!transaction;
  const [date, setDate] = useState(transaction?.date || "");
  const [description, setDescription] = useState(transaction?.description || "");
  const [amount, setAmount] = useState(transaction?.amount || "");
  const [category, setCategory] = useState(transaction?.category || "");
  const [notes, setNotes] = useState(transaction?.notes || "");
  const [receipt, setReceipt] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!date || !description || !amount) {
      toast({
        title: "表单不完整",
        description: "请填写所有必填字段",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would save to an API/database
    onSave();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? "编辑交易" : "添加新交易"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <label htmlFor="category" className="block mb-1">类别</label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-md p-2"
              placeholder="例如：办公费用、工资、销售收入"
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="description" className="block mb-1">
              描述 <span className="text-red-500">*</span>
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-md p-2"
              required
              placeholder="交易描述"
            />
          </div>
          
          <div>
            <label htmlFor="amount" className="block mb-1">
              金额 (¥) <span className="text-red-500">*</span>
              <span className="text-sm text-gray-500 ml-2">(收入为正数，支出为负数)</span>
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded-md p-2"
              required
              placeholder="例如：-100.50 或 500.00"
            />
          </div>
          
          <div>
            <label htmlFor="receipt" className="block mb-1">票据上传</label>
            <input
              id="receipt"
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setReceipt(e.target.files?.[0] || null)}
              className="w-full border rounded-md p-2"
            />
            {isEditing && transaction.receipt && !receipt && (
              <p className="text-sm mt-1">
                已上传文件: {transaction.receipt}
              </p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="notes" className="block mb-1">备注</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border rounded-md p-2"
              rows={3}
              placeholder="其他相关信息"
            />
          </div>
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

export default TransactionForm;
