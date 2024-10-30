import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const deletedCustomer = await prisma.customer.delete({
      where: { id },
    });

    return NextResponse.json(deletedCustomer);
  } catch (error) {
    console.error('Error eliminando el cliente:', error);
    return NextResponse.json(
      { error: 'Error eliminando el cliente' },
      { status: 500 }
    );
  }
} 