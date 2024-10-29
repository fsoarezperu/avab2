'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";
import {
  Container, Box, Typography, Grid, Paper, Stack, Button, AppBar, Toolbar, Avatar,
  TextField, FormControl, InputLabel, Select, MenuItem, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Chip, IconButton, InputAdornment,
  Accordion, AccordionSummary, AccordionDetails,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PaymentIcon from '@mui/icons-material/Payment';
import EmailIcon from '@mui/icons-material/Email';
import SecurityIcon from '@mui/icons-material/Security';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Decimal } from '@prisma/client/runtime/library';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number | string | Decimal;
  stock: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateCreated: string;
  orders: number;
  totalSpent: string;
  status: string;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [currentView, setCurrentView] = useState('dashboard');
  const [customerData, setCustomerData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    notes: '',
    customerGroup: '',
    storeCredit: '',
    status: 'active'
  });
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [orders] = useState([
    {
      id: '3001',
      orderNumber: '#ORD-2024-001',
      customer: 'John Doe',
      date: '2024-03-15',
      total: 'S/. 299.99',
      status: 'Processing',
      paymentStatus: 'Paid'
    },
    {
      id: '3002',
      orderNumber: '#ORD-2024-002',
      customer: 'Jane Smith',
      date: '2024-03-14',
      total: 'S/. 149.50',
      status: 'Delivered',
      paymentStatus: 'Paid'
    },
  ]);
  const [productData, setProductData] = useState({
    name: '',
    sku: '',
    price: '',
    description: '',
    brand: '',
    category: '',
    weight: '',
    stock: '',
    status: 'active',
    taxable: true,
    visibility: 'visible'
  });
  const [orderData, setOrderData] = useState({
    customer: '',
    items: [],
    shippingAddress: {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phone: ''
    },
    billingAddress: {
      sameAsShipping: true,
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phone: ''
    },
    shippingMethod: '',
    paymentMethod: '',
    notes: ''
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ id: '', type: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(customerData);
  };

  const handleDeleteClick = (id: string, type: string) => {
    setItemToDelete({ id, type });
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`/api/${itemToDelete.type}s/${itemToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error deleting record');

      // Actualizar el estado según el tipo
      if (itemToDelete.type === 'customer') {
        setCustomers(customers.filter(customer => customer.id !== itemToDelete.id));
      } else if (itemToDelete.type === 'product') {
        setProducts(products.filter(product => product.id !== itemToDelete.id));
      }

      setDeleteDialogOpen(false);
      setItemToDelete({ id: '', type: '' });
    } catch (error) {
      console.error('Error:', error);
      // Aquí podrías agregar un mensaje de error para el usuario
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Error fetching products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers');
      if (!response.ok) throw new Error('Error fetching customers');
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error loading customers:', error);
    } finally {
      setLoadingCustomers(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const renderMainContent = () => {
    switch(currentView) {
      case 'addCustomer':
        return (
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Add a Customer
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Customer Information
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Email"
                    value={customerData.email}
                    onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Customer Group</InputLabel>
                    <Select
                      value={customerData.customerGroup}
                      label="Customer Group"
                      onChange={(e) => setCustomerData({...customerData, customerGroup: e.target.value})}
                    >
                      <MenuItem value="retail">Retail</MenuItem>
                      <MenuItem value="wholesale">Wholesale</MenuItem>
                      <MenuItem value="vip">VIP</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="First Name"
                    value={customerData.firstName}
                    onChange={(e) => setCustomerData({...customerData, firstName: e.target.value})}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Last Name"
                    value={customerData.lastName}
                    onChange={(e) => setCustomerData({...customerData, lastName: e.target.value})}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Company"
                    value={customerData.company}
                    onChange={(e) => setCustomerData({...customerData, company: e.target.value})}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Customer Notes"
                    value={customerData.notes}
                    onChange={(e) => setCustomerData({...customerData, notes: e.target.value})}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Store Credit"
                    type="number"
                    value={customerData.storeCredit}
                    onChange={(e) => setCustomerData({...customerData, storeCredit: e.target.value})}
                    InputProps={{
                      startAdornment: <Typography>S/.</Typography>,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={customerData.status}
                      label="Status"
                      onChange={(e) => setCustomerData({...customerData, status: e.target.value})}
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      color="inherit"
                      onClick={() => setCurrentView('dashboard')}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Save Customer
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        );
      case 'customers':
        return (
          <Paper sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 3 
            }}>
              <Typography variant="h5">
                Customers
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                >
                  Filter
                </Button>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setCurrentView('addCustomer')}
                >
                  Add Customer
                </Button>
              </Box>
            </Box>

            {/* Search and Filters */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                placeholder="Search customers by name, email, or phone..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                size="small"
              />
            </Box>

            {/* Customers Table */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Date Created</TableCell>
                    <TableCell>Orders</TableCell>
                    <TableCell>Total Spent</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id} hover>
                      <TableCell>{`${customer.firstName} ${customer.lastName}`}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.dateCreated}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>{customer.totalSpent}</TableCell>
                      <TableCell>
                        <Chip
                          label={customer.status}
                          color={customer.status === 'Active' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" onClick={() => handleDeleteClick(customer.id, 'customer')}>
                          <DeleteIcon color="error" />
                        </IconButton>
                        <IconButton size="small">
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mt: 3 
            }}>
              {/* Add your pagination component here */}
            </Box>
          </Paper>
        );
      case 'products':
        return (
          <Paper sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 3 
            }}>
              <Typography variant="h5">
                Products
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                >
                  Filter
                </Button>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setCurrentView('addProduct')}
                >
                  Add Product
                </Button>
              </Box>
            </Box>

            {/* Search and Filters */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                placeholder="Search products by name, SKU, or price..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                size="small"
              />
            </Box>

            {/* Products Table */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">Loading products...</TableCell>
                    </TableRow>
                  ) : products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">No products found</TableCell>
                    </TableRow>
                  ) : (
                    products.map((product) => (
                      <TableRow key={product.id} hover>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>
                          S/. {typeof product.price === 'number' 
                            ? product.price.toFixed(2) 
                            : parseFloat(product.price.toString()).toFixed(2)}
                        </TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <Chip
                            label={product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                            color={product.stock > 0 ? 'success' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small" onClick={() => handleDeleteClick(product.id, 'product')}>
                            <DeleteIcon color="error" />
                          </IconButton>
                          <IconButton size="small">
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mt: 3 
            }}>
              {/* Add your pagination component here */}
            </Box>
          </Paper>
        );
      case 'orders':
        return (
          <Paper sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 3 
            }}>
              <Typography variant="h5">
                Orders
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                >
                  Filter
                </Button>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setCurrentView('createOrder')}
                >
                  Create Order
                </Button>
              </Box>
            </Box>

            {/* Search and Filters */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                placeholder="Search orders by order number, customer name..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                size="small"
              />
            </Box>

            {/* Orders Table */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order #</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Payment</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} hover>
                      <TableCell>{order.orderNumber}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          color={
                            order.status === 'Delivered' 
                              ? 'success' 
                              : order.status === 'Processing' 
                                ? 'warning' 
                                : 'default'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={order.paymentStatus}
                          color={order.paymentStatus === 'Paid' ? 'success' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" onClick={() => handleDeleteClick(order.id, 'order')}>
                          <DeleteIcon color="error" />
                        </IconButton>
                        <IconButton size="small">
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mt: 3 
            }}>
              {/* Add your pagination component here */}
            </Box>
          </Paper>
        );
      case 'settings':
        return (
          <Paper sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 3 
            }}>
              <Typography variant="h5">
                Settings
              </Typography>
            </Box>

            {/* Settings Sections */}
            <Stack spacing={2}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <StorefrontIcon />
                    <Typography variant="h6">Store Setup</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    <Button variant="text" sx={{ justifyContent: 'flex-start' }}>Store Profile</Button>
                    <Button variant="text" sx={{ justifyContent: 'flex-start' }}>Store Settings</Button>
                    <Button variant="text" sx={{ justifyContent: 'flex-start' }}>Tax Settings</Button>
                  </Stack>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <PaymentIcon />
                    <Typography variant="h6">Payments</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    <Button variant="text" sx={{ justifyContent: 'flex-start' }}>Payment Methods</Button>
                    <Button variant="text" sx={{ justifyContent: 'flex-start' }}>Currency Settings</Button>
                  </Stack>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LocalShippingIcon />
                    <Typography variant="h6">Shipping</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    <Button variant="text" sx={{ justifyContent: 'flex-start' }}>Shipping Zones</Button>
                    <Button variant="text" sx={{ justifyContent: 'flex-start' }}>Shipping Methods</Button>
                    <Button variant="text" sx={{ justifyContent: 'flex-start' }}>Shipping Labels</Button>
                  </Stack>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <EmailIcon />
                    <Typography variant="h6">Notifications</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    <Button variant="text" sx={{ justifyContent: 'flex-start' }}>Email Templates</Button>
                    <Button variant="text" sx={{ justifyContent: 'flex-start' }}>Notification Settings</Button>
                  </Stack>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <SecurityIcon />
                    <Typography variant="h6">Security</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    <Button variant="text" sx={{ justifyContent: 'flex-start' }}>User Accounts</Button>
                    <Button variant="text" sx={{ justifyContent: 'flex-start' }}>API Settings</Button>
                    <Button variant="text" sx={{ justifyContent: 'flex-start' }}>SSL Settings</Button>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Stack>
          </Paper>
        );
      case 'addProduct':
        return (
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Add a Product
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Basic Information */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Basic Information
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Product Name"
                    value={productData.name}
                    onChange={(e) => setProductData({...productData, name: e.target.value})}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    value={productData.description}
                    onChange={(e) => setProductData({...productData, description: e.target.value})}
                  />
                </Grid>

                {/* Pricing & Inventory */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
                    Pricing & Inventory
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="SKU"
                    value={productData.sku}
                    onChange={(e) => setProductData({...productData, sku: e.target.value})}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Price"
                    type="number"
                    value={productData.price}
                    onChange={(e) => setProductData({...productData, price: e.target.value})}
                    InputProps={{
                      startAdornment: <Typography>S/.</Typography>,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Stock"
                    type="number"
                    value={productData.stock}
                    onChange={(e) => setProductData({...productData, stock: e.target.value})}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Weight (kg)"
                    type="number"
                    value={productData.weight}
                    onChange={(e) => setProductData({...productData, weight: e.target.value})}
                  />
                </Grid>

                {/* Categories & Brand */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
                    Categories & Brand
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={productData.category}
                      label="Category"
                      onChange={(e) => setProductData({...productData, category: e.target.value})}
                    >
                      <MenuItem value="electronics">Electronics</MenuItem>
                      <MenuItem value="clothing">Clothing</MenuItem>
                      <MenuItem value="accessories">Accessories</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      color="inherit"
                      onClick={() => setCurrentView('dashboard')}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Save Product
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        );
      case 'createOrder':
        return (
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Create Order
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Customer Selection */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Customer
                  </Typography>
                  <Autocomplete
                    fullWidth
                    options={customers}
                    getOptionLabel={(option) => `${option.name} (${option.email})`}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search Customer"
                        required
                      />
                    )}
                    onChange={(event, newValue) => {
                      setOrderData({...orderData, customer: newValue?.id || ''});
                    }}
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        );
      default:
        return (
          <Grid container spacing={3}>
            {/* Stats cards */}
            {[
              { title: 'Total Orders', value: '156', color: '#1976d2' },
              { title: 'Total Sales', value: 'S/. 15,690', color: '#2e7d32' },
              { title: 'Active Customers', value: '89', color: '#ed6c02' },
              { title: 'Products', value: '234', color: '#9c27b0' }
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderTop: 3,
                    borderColor: stat.color
                  }}
                >
                  <Typography variant="h4" sx={{ color: stat.color }}>
                    {stat.value}
                  </Typography>
                  <Typography color="text.secondary">
                    {stat.title}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Navbar Superior */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'white',
          color: 'text.primary'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="subtitle2">
              {session?.user?.name}
            </Typography>
            <Avatar 
              src={session?.user?.image || ''} 
              alt={session?.user?.name || ''}
              sx={{ width: 32, height: 32 }}
            />
            <Button
              onClick={() => signOut({ callbackUrl: '/' })}
              startIcon={<LogoutIcon />}
              variant="outlined"
              size="small"
              sx={{
                textTransform: 'none',
                borderColor: 'text.primary',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              Sign Out
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        sx={{
          width: 240,
          flexShrink: 0,
          bgcolor: 'grey.900',
          height: '100vh',
          color: 'white',
          p: 2,
          pt: 8
        }}
      >
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Button
              startIcon={<DashboardIcon />}
              onClick={() => setCurrentView('dashboard')}
              sx={{ 
                color: 'white',
                justifyContent: 'flex-start',
                textTransform: 'none',
                py: 1
              }}
            >
              Dashboard
            </Button>
            <Button
              startIcon={<ShoppingCartIcon />}
              onClick={() => setCurrentView('products')}
              sx={{ 
                color: 'white',
                justifyContent: 'flex-start',
                textTransform: 'none',
                py: 1
              }}
            >
              Products
            </Button>
            <Button
              startIcon={<PeopleIcon />}
              onClick={() => setCurrentView('customers')}
              sx={{ 
                color: 'white',
                justifyContent: 'flex-start',
                textTransform: 'none',
                py: 1
              }}
            >
              Customers
            </Button>
            <Button
              startIcon={<LocalShippingIcon />}
              onClick={() => setCurrentView('orders')}
              sx={{ 
                color: 'white',
                justifyContent: 'flex-start',
                textTransform: 'none',
                py: 1
              }}
            >
              Orders
            </Button>
            <Button
              startIcon={<SettingsIcon />}
              onClick={() => setCurrentView('settings')}
              sx={{ 
                color: 'white',
                justifyContent: 'flex-start',
                textTransform: 'none',
                py: 1
              }}
            >
              Settings
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Main content - Ajusta el margen superior para el nuevo navbar */}
      <Box sx={{ 
        flexGrow: 1, 
        p: 3,
        pt: 10 // Añade padding top para el navbar
      }}>
        <Container maxWidth="xl">
          {renderMainContent()}
        </Container>
      </Box>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DeleteIcon color="error" />
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this {itemToDelete.type}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 