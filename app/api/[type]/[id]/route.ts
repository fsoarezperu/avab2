import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { type: string; id: string } }
) {
  try {
    const { type, id } = params;
    let result;

    switch (type) {
      case 'products':
        result = await prisma.product.delete({
          where: { id }
        });
        break;
      case 'customers':
        result = await prisma.customer.delete({
          where: { id }
        });
        break;
      case 'orders':
        result = await prisma.order.delete({
          where: { id }
        });
        break;
      default:
        throw new Error('Invalid type');
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting record' },
      { status: 500 }
    );
  }
} 