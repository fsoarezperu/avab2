import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(request: NextRequest) {
  try {
    const id = request.url.split('/').pop();

    if (!id) {
      return NextResponse.json(
        { error: 'ID no proporcionado' },
        { status: 400 }
      );
    }

    const deletedOrder = await prisma.order.delete({
      where: { id },
    });

    return NextResponse.json(deletedOrder);
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json(
      { error: 'Error al eliminar la orden' },
      { status: 500 }
    );
  }
} 