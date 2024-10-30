'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Container, Paper, Typography } from '@mui/material';

interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
  customerGroup: string;
  status: string;
  storeCredit?: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/api/customers');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h5">Customers</Typography>
          <Link href="/dashboard/customers/add">
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </Link>
        </div>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Group</TableHead>
                <TableHead>Store Credit</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{`${customer.firstName} ${customer.lastName}`}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.company || '-'}</TableCell>
                  <TableCell>{customer.phone || '-'}</TableCell>
                  <TableCell>{customer.customerGroup}</TableCell>
                  <TableCell>S/.{customer.storeCredit || '0'}</TableCell>
                  <TableCell>{customer.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Container>
  );
} 