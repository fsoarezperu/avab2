import { NextResponse } from 'next/server';
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
  } catch (error) {
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
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        imageUrl: data.imageUrl,
        stock: parseInt(data.stock),
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating product' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar un producto
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    // Primero eliminar todos los OrderItems relacionados
    await prisma.orderItem.deleteMany({
      where: {
        productId: id
      }
    });

    // Luego eliminar el producto
    const deletedProduct = await prisma.product.delete({
      where: {
        id: id
      }
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Error deleting product' },
      { status: 500 }
    );
  }
} 