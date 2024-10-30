import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export const config = {
  runtime: 'edge', // si deseas que funcione en el runtime de Vercel Edge Functions
};

export async function DELETE(
  request: NextRequest,
  { params }: { params: { type: 'products' | 'customers' | 'orders'; id: string } }
) {
  try {
    const { type, id } = params;
    let result;

    switch (type) {
      case 'products':
        result = await prisma.product.delete({
          where: { id },
        });
        break;
      case 'customers':
        result = await prisma.customer.delete({
          where: { id },
        });
        break;
      case 'orders':
        result = await prisma.order.delete({
          where: { id },
        });
        break;
      default:
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
