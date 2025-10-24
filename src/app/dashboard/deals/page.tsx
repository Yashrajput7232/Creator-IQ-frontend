'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockDeals } from '@/lib/mock-data';
import type { Deal } from '@/lib/types';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, PlusCircle } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const dealSchema = z.object({
  brandName: z.string().min(1, 'Brand name is required.'),
  deliverables: z.string().min(1, 'Deliverables are required.'),
  amount: z.coerce.number().min(0, 'Amount cannot be negative.'),
  deadline: z.date({ required_error: 'A deadline is required.' }),
  status: z.enum(['pending', 'invoiced', 'paid']),
});

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof dealSchema>>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      brandName: '',
      deliverables: '',
      amount: 0,
      status: 'pending',
    },
  });

  function onSubmit(values: z.infer<typeof dealSchema>) {
    const newDeal: Deal = {
      id: (deals.length + 1).toString(),
      ...values,
    };
    setDeals([newDeal, ...deals]);
    form.reset();
    setIsDialogOpen(false);
  }

  const statusColors: { [key in Deal['status']]: string } = {
    paid: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    invoiced: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-headline">Campaign & Deal Tracker</CardTitle>
          <CardDescription>Log your brand deals, deadlines, and invoices.</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Deal</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Deal</DialogTitle>
              <DialogDescription>Enter the details of your new brand collaboration.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="brandName" render={({ field }) => (
                  <FormItem><FormLabel>Brand Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="deliverables" render={({ field }) => (
                  <FormItem><FormLabel>Deliverables</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="amount" render={({ field }) => (
                  <FormItem><FormLabel>Amount ($)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="deadline" render={({ field }) => (
                  <FormItem className="flex flex-col"><FormLabel>Deadline</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="status" render={({ field }) => (
                  <FormItem><FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="invoiced">Invoiced</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <DialogFooter>
                  <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                  <Button type="submit">Save Deal</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Brand</TableHead>
              <TableHead>Deliverables</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deals.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell className="font-medium">{deal.brandName}</TableCell>
                <TableCell className="text-muted-foreground">{deal.deliverables}</TableCell>
                <TableCell>{deal.deadline.toLocaleDateString()}</TableCell>
                <TableCell><Badge className={cn("border-none", statusColors[deal.status])}>{deal.status}</Badge></TableCell>
                <TableCell className="text-right">${deal.amount.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
