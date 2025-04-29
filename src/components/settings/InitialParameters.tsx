
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type InitialParametersValues = {
  fiscalYear: string;
  fiscalPeriod: string;
  initialCash: string;
  initialAccounts: string;
  initialInventory: string;
};

const InitialParameters = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const defaultValues: InitialParametersValues = {
    fiscalYear: '2024',
    fiscalPeriod: '1',
    initialCash: '0',
    initialAccounts: '0',
    initialInventory: '0',
  };

  const form = useForm<InitialParametersValues>({
    defaultValues,
  });

  const onSubmit = (data: InitialParametersValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would save to backend/localStorage here
      console.log('Initial parameters saved:', data);
      toast.success('期初参数已保存');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fiscalYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>会计年度</FormLabel>
                <FormControl>
                  <Input placeholder="请输入会计年度" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="fiscalPeriod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>会计期间</FormLabel>
                <FormControl>
                  <Input placeholder="请输入会计期间 (1-12)" type="number" min="1" max="12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="initialCash"
            render={({ field }) => (
              <FormItem>
                <FormLabel>期初现金</FormLabel>
                <FormControl>
                  <Input placeholder="请输入期初现金余额" type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="initialAccounts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>期初应收账款</FormLabel>
                <FormControl>
                  <Input placeholder="请输入期初应收账款" type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="initialInventory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>期初库存价值</FormLabel>
                <FormControl>
                  <Input placeholder="请输入期初库存价值" type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "保存中..." : "保存参数"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InitialParameters;
