import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const customers = await prisma.customer.findMany();
    return NextResponse.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { error: 'Error al obtener los clientes' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const customer = await prisma.customer.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        company: data.company || null,
        phone: data.phone || null,
        notes: data.notes || null,
        customerGroup: data.customerGroup || null,
        storeCredit: data.storeCredit ? parseFloat(data.storeCredit) : 0,
        status: data.status || 'active',
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json(
      { error: 'Error creating customer' },
      { status: 500 }
    );
  }
}

