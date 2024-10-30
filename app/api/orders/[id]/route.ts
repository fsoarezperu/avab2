import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Primero eliminar todos los OrderItems asociados
    await prisma.orderItem.deleteMany({
      where: {
        orderId: params.id
      }
    });

    // Luego eliminar la orden
    const order = await prisma.order.delete({
      where: {
        id: params.id
      }
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json({ error: 'Error deleting order' }, { status: 500 });
  }
} 