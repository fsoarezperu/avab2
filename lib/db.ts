import prisma from './prisma'

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    })
    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

// Más funciones según necesites... 