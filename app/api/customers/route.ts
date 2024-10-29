import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const customers = await db.customer.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        company: true,
        phone: true,
        customerGroup: true,
        storeCredit: true,
        status: true,
        createdAt: true,
        _count: {
          select: { orders: true }
        },
        orders: {
          select: {
            total: true
          }
        }
      }
    });

    const formattedCustomers = customers.map(customer => ({
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      dateCreated: customer.createdAt.toISOString().split('T')[0],
      orders: customer._count.orders,
      totalSpent: customer.orders.reduce((sum, order) => sum + Number(order.total), 0).toFixed(2),
      status: customer.status
    }));

    return NextResponse.json(formattedCustomers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { error: 'Error fetching customers' },
      { status: 500 }
    );
  }
} 