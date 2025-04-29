
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

type CompanyFormValues = {
  name: string;
  taxId: string;
  address: string;
  phone: string;
  email: string;
  bankName: string;
  bankAccount: string;
  description: string;
};

const CompanySettings = () => {
  // In a real app, you might fetch this from an API or local storage
  const [isLoading, setIsLoading] = useState(false);
  
  const defaultValues: CompanyFormValues = {
    name: '示例公司',
    taxId: '123456789012345',
    address: '北京市朝阳区某街道123号',
    phone: '010-12345678',
    email: 'contact@example.com',
    bankName: '中国银行',
    bankAccount: '6222000000000000000',
    description: '',
  };

  const form = useForm<CompanyFormValues>({
    defaultValues,
  });

  const onSubmit = (data: CompanyFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would save to backend/localStorage here
      console.log('Company data saved:', data);
      toast.success('公司信息已保存');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>公司名称</FormLabel>
                <FormControl>
                  <Input placeholder="请输入公司名称" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="taxId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>税号</FormLabel>
                <FormControl>
                  <Input placeholder="请输入税号" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>公司地址</FormLabel>
                <FormControl>
                  <Input placeholder="请输入公司地址" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>联系电话</FormLabel>
                <FormControl>
                  <Input placeholder="请输入联系电话" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>电子邮箱</FormLabel>
                <FormControl>
                  <Input placeholder="请输入电子邮箱" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>开户银行</FormLabel>
                <FormControl>
                  <Input placeholder="请输入开户银行" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bankAccount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>银行账号</FormLabel>
                <FormControl>
                  <Input placeholder="请输入银行账号" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>公司简介</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="请输入公司简介"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "保存中..." : "保存设置"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CompanySettings;
