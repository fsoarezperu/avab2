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

    const deletedCustomer = await prisma.customer.delete({
      where: { id },
    });

    return NextResponse.json(deletedCustomer);
  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.json(
      { error: 'Error al eliminar el cliente' },
      { status: 500 }
    );
  }
} 