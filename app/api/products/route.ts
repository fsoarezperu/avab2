import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Obtener todos los productos
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Error al obtener los productos' },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo cliente
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log('Datos recibidos:', data);

    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        category: data.category,
        status: data.status || 'active',
        // Agrega aquí otros campos según tu schema de Product
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error detallado:', error);
    return NextResponse.json(
      { error: 'Error creating product' },
      { status: 500 }
    );
  }
} 