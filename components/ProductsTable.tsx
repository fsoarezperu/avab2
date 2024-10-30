'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

export default function ProductsTable({ 
  onEdit, 
  onDelete 
}: { 
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Error fetching products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Error loading products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }

      const result = await response.json();
      console.log('Producto eliminado:', result);
      // Actualiza el estado local para reflejar la eliminación
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error(error);
      alert('Hubo un error al eliminar el producto. Inténtalo de nuevo.');
    }
  };

  if (loading) return <Typography>Loading products...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Image 
                  src={product.imageUrl || '/placeholder.png'} 
                  alt={product.name} 
                  width={50} 
                  height={50} 
                  style={{ objectFit: 'cover' }}
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>S/. {product.price.toFixed(2)}</TableCell>
              <TableCell>
                <Chip 
                  label={product.stock}
                  color={product.stock > 0 ? 'success' : 'error'}
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(product)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(product.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 