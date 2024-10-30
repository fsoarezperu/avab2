import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(request: NextRequest) {
  try {
    // Extrae el id directamente desde el pathname
    const id = request.nextUrl.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    // Primero eliminar todos los OrderItems asociados
    await prisma.orderItem.deleteMany({
      where: {
        orderId: id
      }
    });

    // Luego eliminar la orden
    const order = await prisma.order.delete({
      where: {
        id: id
      }
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json({ error: 'Error deleting order' }, { status: 500 });
  }
}
