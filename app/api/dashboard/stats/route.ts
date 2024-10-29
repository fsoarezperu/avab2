import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const [
      totalOrders,
      totalSales,
      activeCustomers,
      totalProducts
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: {
          total: true
        }
      }),
      prisma.customer.count({
        where: { status: 'active' }
      }),
      prisma.product.count()
    ]);

    return NextResponse.json({
      totalOrders,
      totalSales: totalSales._sum.total || 0,
      activeCustomers,
      totalProducts
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Error fetching dashboard stats' },
      { status: 500 }
    );
  }
} 