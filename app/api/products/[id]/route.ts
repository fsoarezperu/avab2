import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Obtener un producto específico
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(product);
  } catch (error: unknown) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Error fetching product' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar un producto
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();

    // Validate and parse input data
    const updatedData = {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      imageUrl: data.imageUrl,
      stock: parseInt(data.stock, 10),
    };

    const product = await prisma.product.update({
      where: { id: params.id },
      data: updatedData,
    });
    return NextResponse.json(product);
  } catch (error: unknown) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Error updating product' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar un producto
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.error('Error eliminando el producto:', error);
    return NextResponse.json(
      { error: 'Error eliminando el producto' },
      { status: 500 }
    );
  }
} 