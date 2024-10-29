import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Primero eliminamos los items relacionados
    await db.orderItem.deleteMany({
      where: {
        orderId: params.id
      }
    });

    // Luego eliminamos la orden
    await db.order.delete({
      where: {
        id: params.id
      }
    });

    return NextResponse.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json({ error: 'Error deleting order' }, { status: 500 });
  }
} 