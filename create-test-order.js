const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Crear 10 usuarios
  const users = await Promise.all(
    Array(10).fill().map(async (_, index) => {
      const timestamp = Date.now() + index; // Add timestamp to ensure uniqueness
      return await prisma.user.create({
        data: {
          email: `user${index + 1}_${timestamp}@example.com`,
          name: `Usuario Test ${index + 1}`,
        }
      })
    })
  )

  // Crear 10 clientes
  const customers = await Promise.all(
    Array(10).fill().map(async (_, index) => {
      return await prisma.customer.create({
        data: {
          email: `customer${index + 1}@example.com`,
          firstName: `Nombre${index + 1}`,
          lastName: `Apellido${index + 1}`,
          phone: `+1234567890${index}`,
          company: null,
          notes: null,
          customerGroup: 'default',
          storeCredit: 0,
          status: 'active'
        }
      })
    })
  )

  // Crear 10 productos con diferentes precios y características
  const products = await Promise.all(
    Array(10).fill().map(async (_, index) => {
      return await prisma.product.create({
        data: {
          name: `Producto ${index + 1}`,
          description: `Descripción detallada del producto ${index + 1}`,
          price: 49.99 + (index * 10), // Precios variados
          stock: 10 + (index * 5), // Stock variado
          sku: `SKU-${(index + 1).toString().padStart(3, '0')}`
        }
      })
    })
  )

  // Estados posibles para las órdenes
  const orderStatuses = ['Processing', 'Completed', 'Cancelled', 'Pending']
  const paymentStatuses = ['Pending', 'Paid', 'Failed', 'Refunded']

  // Crear 10 órdenes con diferentes estados y productos
  const orders = await Promise.all(
    Array(10).fill().map(async (_, index) => {
      const numItems = Math.floor(Math.random() * 3) + 1 // 1 a 3 items por orden
      const orderItems = Array(numItems).fill().map((_, itemIndex) => {
        const randomProduct = products[Math.floor(Math.random() * products.length)]
        const quantity = Math.floor(Math.random() * 3) + 1
        return {
          quantity,
          price: randomProduct.price,
          product: {
            connect: { id: randomProduct.id }
          }
        }
      })

      const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

      return await prisma.order.create({
        data: {
          orderNumber: `ORD-${(index + 1).toString().padStart(3, '0')}`,
          total,
          status: orderStatuses[index % orderStatuses.length],
          paymentStatus: paymentStatuses[index % paymentStatuses.length],
          customer: {
            connect: { id: customers[index % customers.length].id }
          },
          user: {
            connect: { id: users[index % users.length].id }
          },
          items: {
            create: orderItems
          }
        },
        include: {
          items: {
            include: {
              product: true
            }
          },
          customer: true,
          user: true
        }
      })
    })
  )

  console.log('Base de datos poblada con:')
  console.log(`- ${users.length} usuarios`)
  console.log(`- ${customers.length} clientes`)
  console.log(`- ${products.length} productos`)
  console.log(`- ${orders.length} órdenes`)

  // Mostrar resumen de las órdenes creadas
  orders.forEach(order => {
    console.log(`\nOrden ${order.orderNumber}:`)
    console.log(`- Estado: ${order.status}`)
    console.log(`- Estado de pago: ${order.paymentStatus}`)
    console.log(`- Total: $${order.total}`)
    console.log(`- Cliente: ${order.customer.firstName} ${order.customer.lastName}`)
    console.log(`- Productos:`)
    order.items.forEach(item => {
      console.log(`  * ${item.quantity}x ${item.product.name} ($${item.price}/u)`)
    })
  })
}

main()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })