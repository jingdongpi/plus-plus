
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface AccountFormProps {
  account?: any;
  onSave: () => void;
  onCancel: () => void;
}

const AccountForm = ({ account, onSave, onCancel }: AccountFormProps) => {
  const isEditing = !!account;
  const [code, setCode] = useState(account?.code || "");
  const [name, setName] = useState(account?.name || "");
  const [type, setType] = useState(account?.type || "资产");
  const { toast } = useToast();

  const accountTypes = ["资产", "负债", "所有者权益", "收入", "费用"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!code || !name) {
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
        {isEditing ? "编辑科目" : "添加新科目"}
      </h2>
      
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label htmlFor="code" className="block mb-1">
            科目代码 <span className="text-red-500">*</span>
          </label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border rounded-md p-2"
            required
            placeholder="例如：1001"
          />
        </div>
        
        <div>
          <label htmlFor="name" className="block mb-1">
            科目名称 <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-md p-2"
            required
            placeholder="例如：固定资产"
          />
        </div>
        
        <div>
          <label htmlFor="type" className="block mb-1">
            科目类型 <span className="text-red-500">*</span>
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          >
            {accountTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
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

export default AccountForm;
