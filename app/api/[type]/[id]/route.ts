import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { type: 'products' | 'customers' | 'orders'; id: string } }
) {
  try {
    const { type, id } = params;

    let result;

    if (type === 'products') {
      result = await prisma.product.delete({
        where: { id },
      });
    } else if (type === 'customers') {
      result = await prisma.customer.delete({
        where: { id },
      });
    } else if (type === 'orders') {
      result = await prisma.order.delete({
        where: { id },
      });
    } else {
      return NextResponse.json({ error: 'Tipo inválido' }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error deleting record:', error);
    return NextResponse.json(
      { error: 'Error eliminando el registro' },
      { status: 500 }
    );
  }
}
