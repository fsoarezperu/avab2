import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    // Primero eliminar todas las órdenes relacionadas
    // Esto también eliminará automáticamente los OrderItems relacionados debido a la cascada
    await prisma.order.deleteMany({
      where: {
        customerId: id
      }
    });

    // Luego eliminar el cliente
    const deletedCustomer = await prisma.customer.delete({
      where: {
        id: id
      }
    });

    return NextResponse.json(deletedCustomer);
  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.json(
      { error: 'Error deleting customer' },
      { status: 500 }
    );
  }
} 