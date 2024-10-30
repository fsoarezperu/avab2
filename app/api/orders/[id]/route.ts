import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const deletedOrder = await prisma.order.delete({
      where: { id },
    });

    return NextResponse.json(deletedOrder);
  } catch (error) {
    console.error('Error eliminando la orden:', error);
    return NextResponse.json(
      { error: 'Error eliminando la orden' },
      { status: 500 }
    );
  }
} 