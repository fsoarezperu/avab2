import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const orders = await db.order.findMany({
      select: {
        id: true,
        orderNumber: true,
        total: true,
        status: true,
        paymentStatus: true,
        createdAt: true,
        customer: {
          select: {
            firstName: true,
            lastName: true,
          }
        },
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const formattedOrders = orders.map(order => ({
      id: order.id,
      orderNumber: order.orderNumber,
      customer: `${order.customer.firstName} ${order.customer.lastName}`,
      date: order.createdAt.toISOString().split('T')[0],
      total: `S/. ${order.total}`,
      status: order.status,
      paymentStatus: order.paymentStatus
    }));

    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error('Error loading orders:', error);
    return NextResponse.json({ error: 'Error loading orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const order = await db.order.create({
      data: {
        orderNumber: `ORD-${Date.now()}`,
        customerId: data.customerId,
        total: data.total,
        status: 'Processing',
        paymentStatus: 'Pending',
        items: {
          create: data.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
} 