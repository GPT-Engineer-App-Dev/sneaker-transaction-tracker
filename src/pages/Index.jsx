import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { toast } from "sonner";

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: new Date(), amount: 100, type: "Income", category: "Nike" },
    { id: 2, date: new Date(), amount: 200, type: "Expense", category: "Adidas" },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    date: new Date(),
    amount: "",
    type: "",
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = () => {
    if (formData.id) {
      setTransactions((prev) =>
        prev.map((transaction) =>
          transaction.id === formData.id ? formData : transaction
        )
      );
      toast("Transaction updated successfully");
    } else {
      setTransactions((prev) => [
        ...prev,
        { ...formData, id: prev.length + 1 },
      ]);
      toast("Transaction added successfully");
    }
    setFormData({ id: null, date: new Date(), amount: "", type: "", category: "" });
  };

  const handleEdit = (transaction) => {
    setFormData(transaction);
  };

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
    toast("Transaction deleted successfully");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sneaker Accounting App</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="primary">Add New Transaction</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{formData.id ? "Edit Transaction" : "Add New Transaction"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <DatePickerDemo selected={formData.date} onSelect={handleDateChange} />
            <Input
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Amount"
            />
            <Select onValueChange={(value) => handleSelectChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Income">Income</SelectItem>
                <SelectItem value="Expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleSelectChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nike">Nike</SelectItem>
                <SelectItem value="Adidas">Adidas</SelectItem>
                <SelectItem value="Puma">Puma</SelectItem>
                <SelectItem value="Reebok">Reebok</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSubmit}>
              {formData.id ? "Update Transaction" : "Add Transaction"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Table className="mt-8">
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date.toDateString()}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => handleEdit(transaction)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(transaction.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Index;