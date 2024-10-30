import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    // Primero eliminar todos los OrderItems relacionados
    await prisma.orderItem.deleteMany({
      where: {
        orderId: id
      }
    });

    // Luego eliminar la orden
    const deletedOrder = await prisma.order.delete({
      where: {
        id: id
      }
    });

    return NextResponse.json(deletedOrder);
  } catch (error: unknown) {
    console.error('Error deleting order:', error);
    return NextResponse.json(
      { error: 'Error deleting order' },
      { status: 500 }
    );
  }
} 