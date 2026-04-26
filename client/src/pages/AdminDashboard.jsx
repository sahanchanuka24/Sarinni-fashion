import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Clock, CheckCircle, Truck, Trash2, Eye, X, Phone, Mail, MapPin, Hash, User, Plus, ShoppingBag, Layers, Info, Tag, DollarSign, Box } from 'lucide-react';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'products'
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [stats, setStats] = useState({ total: 0, revenue: 0, processing: 0, productCount: 0 });
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Silk',
    fabric: '',
    color: '',
    stock: 1,
    imageUrl: ''
  });

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/admin/all-orders');
      setOrders(data.orders);
      
      const revenue = data.orders.reduce((acc, order) => acc + order.totalPrice, 0);
      const processing = data.orders.filter(o => o.orderStatus === 'Processing').length;
      
      setStats(prev => ({
        ...prev,
        total: data.orders.length,
        revenue,
        processing
      }));
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/products');
      setProducts(data.products);
      setStats(prev => ({ ...prev, productCount: data.products.length }));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const loadData = async () => {
    setLoading(true);
    await Promise.all([fetchOrders(), fetchProducts()]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/admin/orders/${id}`, { status });
      fetchOrders();
      if (selectedOrder && selectedOrder._id === id) {
        setSelectedOrder({ ...selectedOrder, orderStatus: status });
      }
    } catch (error) {
      alert('Error updating status');
    }
  };

  const deleteOrder = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`/admin/orders/${id}`);
        fetchOrders();
        setSelectedOrder(null);
      } catch (error) {
        alert('Error deleting order');
      }
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...newProduct,
        images: [{ url: newProduct.imageUrl }]
      };
      await axios.post('/admin/product/new', productData);
      setShowProductModal(false);
      setNewProduct({
        name: '', description: '', price: '', category: 'Silk',
        fabric: '', color: '', stock: 1, imageUrl: ''
      });
      fetchProducts();
      alert('Product added successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Delete this product?')) {
      try {
        await axios.delete(`/admin/product/${id}`);
        fetchProducts();
      } catch (error) {
        alert('Error deleting product');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Delivered': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) return (
    <div className="pt-32 flex justify-center min-h-screen bg-premium-cream">
      <div className="w-12 h-12 border-4 border-premium-gold border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="pt-32 bg-premium-cream min-h-screen pb-20">
      <div className="container mx-auto px-6">
        {/* Header and Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-4xl font-serif text-premium-black mb-2">Admin Dashboard</h1>
            <div className="flex space-x-6 mt-4">
              <button 
                onClick={() => setActiveTab('orders')}
                className={`text-xs uppercase tracking-[0.2em] font-bold pb-2 transition-all ${activeTab === 'orders' ? 'text-premium-gold border-b-2 border-premium-gold' : 'text-premium-black/40 hover:text-premium-black'}`}
              >
                Orders ({stats.total})
              </button>
              <button 
                onClick={() => setActiveTab('products')}
                className={`text-xs uppercase tracking-[0.2em] font-bold pb-2 transition-all ${activeTab === 'products' ? 'text-premium-gold border-b-2 border-premium-gold' : 'text-premium-black/40 hover:text-premium-black'}`}
              >
                Inventory ({stats.productCount})
              </button>
            </div>
          </div>
          
          <div className="mt-6 md:mt-0 flex space-x-4">
            {activeTab === 'orders' ? (
              <>
                <div className="bg-white p-4 shadow-sm border border-premium-black/5 min-w-[150px]">
                  <p className="text-[10px] text-premium-black/40 uppercase tracking-widest mb-1">Total Revenue</p>
                  <p className="text-xl font-serif text-premium-black">LKR {stats.revenue.toLocaleString()}</p>
                </div>
                <div className="bg-premium-black p-4 shadow-xl min-w-[150px]">
                  <p className="text-[10px] text-premium-gold uppercase tracking-widest mb-1">Processing</p>
                  <p className="text-xl font-serif text-premium-cream">{stats.processing}</p>
                </div>
              </>
            ) : (
              <button 
                onClick={() => setShowProductModal(true)}
                className="bg-premium-black text-premium-cream px-8 py-4 flex items-center space-x-3 hover:bg-premium-gold transition-all shadow-xl group"
              >
                <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                <span className="text-xs font-bold uppercase tracking-widest">Add New Product</span>
              </button>
            )}
          </div>
        </div>

        {activeTab === 'orders' ? (
          /* Orders Table */
          <div className="bg-white shadow-sm overflow-hidden border border-premium-black/5 rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-premium-black text-premium-cream text-[11px] uppercase tracking-[0.2em]">
                    <th className="px-6 py-5 font-medium">Order ID</th>
                    <th className="px-6 py-5 font-medium">Customer</th>
                    <th className="px-6 py-5 font-medium">Total</th>
                    <th className="px-6 py-5 font-medium">Status</th>
                    <th className="px-6 py-5 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <motion.tr 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={order._id} 
                      className="hover:bg-premium-cream/30 transition-colors"
                    >
                      <td className="px-6 py-6">
                        <span className="font-mono text-xs text-premium-black/60">#{order._id.slice(-8).toUpperCase()}</span>
                      </td>
                      <td className="px-6 py-6">
                        <div className="text-sm font-medium text-premium-black">{order.shippingInfo.email}</div>
                        <div className="text-[10px] text-premium-black/40 uppercase tracking-wider">{order.shippingInfo.phoneNo}</div>
                      </td>
                      <td className="px-6 py-6 text-sm font-semibold text-premium-black">
                        LKR {order.totalPrice.toLocaleString()}
                      </td>
                      <td className="px-6 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-right space-x-4">
                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="text-premium-gold hover:text-premium-black transition-colors"
                          title="View Full Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => deleteOrder(order._id)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                          title="Delete Order"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            {orders.length === 0 && (
              <div className="py-24 text-center text-premium-black/30 italic">
                <Package size={48} className="mx-auto mb-4 opacity-10" />
                No orders found in the system.
              </div>
            )}
          </div>
        ) : (
          /* Products Inventory Table */
          <div className="bg-white shadow-sm overflow-hidden border border-premium-black/5 rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-premium-black text-premium-cream text-[11px] uppercase tracking-[0.2em]">
                    <th className="px-6 py-5 font-medium">Product</th>
                    <th className="px-6 py-5 font-medium">Category</th>
                    <th className="px-6 py-5 font-medium">Price</th>
                    <th className="px-6 py-5 font-medium text-center">Stock</th>
                    <th className="px-6 py-5 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <motion.tr 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={product._id} 
                      className="hover:bg-premium-cream/30 transition-colors"
                    >
                      <td className="px-6 py-6">
                        <div className="flex items-center space-x-4">
                          <img src={product.images[0]?.url} alt="" className="w-12 h-16 object-cover bg-gray-50 border border-gray-100" />
                          <div>
                            <div className="text-sm font-serif text-premium-black">{product.name}</div>
                            <div className="text-[10px] text-premium-black/30 uppercase tracking-widest">{product.fabric}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-premium-gold px-2 py-1 bg-premium-gold/5 rounded-sm">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-sm font-semibold text-premium-black">
                        LKR {product.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-6 text-center">
                        <span className={`text-xs font-bold ${product.stock < 5 ? 'text-red-500' : 'text-premium-black/60'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-right space-x-4">
                        <button 
                          onClick={() => handleDeleteProduct(product._id)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            {products.length === 0 && (
              <div className="py-24 text-center text-premium-black/30 italic">
                <ShoppingBag size={48} className="mx-auto mb-4 opacity-10" />
                Your inventory is empty. Start adding products!
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Add Modal */}
      <AnimatePresence>
        {showProductModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProductModal(false)}
              className="absolute inset-0 bg-premium-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 50 }}
              className="relative bg-premium-cream w-full max-w-2xl overflow-hidden shadow-2xl rounded-xl"
            >
              <div className="p-8 bg-premium-black text-premium-cream flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Box className="text-premium-gold" size={24} />
                  <h2 className="text-2xl font-serif">Add New Product</h2>
                </div>
                <button onClick={() => setShowProductModal(false)} className="hover:text-premium-gold transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleProductSubmit} className="p-8 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-premium-black/40 mb-2 block">Product Name</label>
                    <input 
                      required
                      type="text"
                      className="w-full bg-white border border-gray-100 py-3 px-4 outline-none focus:border-premium-gold transition-colors"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-premium-black/40 mb-2 block">Description</label>
                    <textarea 
                      required
                      rows="3"
                      className="w-full bg-white border border-gray-100 py-3 px-4 outline-none focus:border-premium-gold transition-colors"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-premium-black/40 mb-2 block">Price (LKR)</label>
                    <div className="relative">
                      <DollarSign size={14} className="absolute left-3 top-4 text-gray-300" />
                      <input 
                        required
                        type="number"
                        className="w-full bg-white border border-gray-100 py-3 pl-8 pr-4 outline-none focus:border-premium-gold transition-colors"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-premium-black/40 mb-2 block">Category</label>
                    <select 
                      className="w-full bg-white border border-gray-100 py-3 px-4 outline-none focus:border-premium-gold transition-colors"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    >
                      {['Silk', 'Cotton', 'Batik', 'Handloom', 'Premium', 'Resort Wear', 'Bridal', 'Party Wear'].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-premium-black/40 mb-2 block">Fabric Type</label>
                    <input 
                      required
                      type="text"
                      className="w-full bg-white border border-gray-100 py-3 px-4 outline-none focus:border-premium-gold transition-colors"
                      value={newProduct.fabric}
                      onChange={(e) => setNewProduct({...newProduct, fabric: e.target.value})}
                      placeholder="e.g. Pure Silk"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-premium-black/40 mb-2 block">Color</label>
                    <input 
                      required
                      type="text"
                      className="w-full bg-white border border-gray-100 py-3 px-4 outline-none focus:border-premium-gold transition-colors"
                      value={newProduct.color}
                      onChange={(e) => setNewProduct({...newProduct, color: e.target.value})}
                      placeholder="e.g. Midnight Blue"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-premium-black/40 mb-2 block">Stock Level</label>
                    <input 
                      required
                      type="number"
                      className="w-full bg-white border border-gray-100 py-3 px-4 outline-none focus:border-premium-gold transition-colors"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-premium-black/40 mb-2 block">Image URL</label>
                    <input 
                      required
                      type="text"
                      className="w-full bg-white border border-gray-100 py-3 px-4 outline-none focus:border-premium-gold transition-colors"
                      value={newProduct.imageUrl}
                      onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})}
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                </div>

                <div className="mt-12">
                  <button 
                    type="submit"
                    className="w-full py-4 bg-premium-black text-premium-cream font-bold uppercase tracking-[0.3em] text-xs hover:bg-premium-gold transition-all duration-500 shadow-xl"
                  >
                    Add Product to Catalog
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-premium-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="relative bg-premium-cream w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl rounded-xl"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-premium-black text-premium-cream p-6 flex justify-between items-center z-10">
                <div className="flex items-center space-x-4">
                  <Hash className="text-premium-gold" size={20} />
                  <h2 className="text-xl font-serif">Order Details - #{selectedOrder._id.slice(-8).toUpperCase()}</h2>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="hover:text-premium-gold transition-colors p-1"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Customer & Shipping Info */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 shadow-sm rounded-lg border border-premium-black/5">
                      <h3 className="text-xs uppercase tracking-[0.2em] text-premium-gold font-bold mb-6 flex items-center">
                        <User size={14} className="mr-2" /> Customer Information
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Mail size={16} className="text-premium-black/30 mt-1" />
                          <div>
                            <p className="text-[10px] text-premium-black/40 uppercase tracking-widest">Email Address</p>
                            <p className="text-sm font-medium">{selectedOrder.shippingInfo.email}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Phone size={16} className="text-premium-black/30 mt-1" />
                          <div>
                            <p className="text-[10px] text-premium-black/40 uppercase tracking-widest">Phone Number</p>
                            <p className="text-sm font-medium">{selectedOrder.shippingInfo.phoneNo}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <MapPin size={16} className="text-premium-black/30 mt-1" />
                          <div>
                            <p className="text-[10px] text-premium-black/40 uppercase tracking-widest">Delivery Address</p>
                            <p className="text-sm font-medium leading-relaxed">
                              {selectedOrder.shippingInfo?.address || 'N/A'},<br />
                              {selectedOrder.shippingInfo?.city || 'N/A'}, {selectedOrder.shippingInfo?.postalCode || ''}<br />
                              {selectedOrder.shippingInfo?.country || 'Sri Lanka'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 shadow-sm rounded-lg border border-premium-black/5">
                      <h3 className="text-xs uppercase tracking-[0.2em] text-premium-gold font-bold mb-6">Order Status</h3>
                      <div className="flex flex-col space-y-4">
                        <div className={`text-center py-2 rounded border font-bold text-xs uppercase tracking-widest ${getStatusColor(selectedOrder.orderStatus)}`}>
                          {selectedOrder.orderStatus}
                        </div>
                        <select 
                          className="w-full bg-premium-cream border border-premium-black/10 py-3 px-4 text-xs uppercase tracking-widest font-bold outline-none focus:border-premium-gold transition-colors"
                          value={selectedOrder.orderStatus}
                          onChange={(e) => updateStatus(selectedOrder._id, e.target.value)}
                        >
                          <option value="Processing">Set as Processing</option>
                          <option value="Shipped">Set as Shipped</option>
                          <option value="Delivered">Set as Delivered</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white shadow-sm rounded-lg border border-premium-black/5 overflow-hidden">
                      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h3 className="text-xs uppercase tracking-[0.2em] text-premium-black font-bold">Ordered Items</h3>
                        <span className="text-[10px] font-bold bg-premium-black text-white px-2 py-1 rounded">
                          {selectedOrder.orderItems.length} ITEMS
                        </span>
                      </div>
                      <div className="divide-y divide-gray-50">
                        {selectedOrder.orderItems.map((item, i) => (
                          <div key={i} className="p-6 flex items-center space-x-6 hover:bg-gray-50/50 transition-colors">
                            <div className="w-20 h-24 flex-shrink-0 border border-gray-100 shadow-sm overflow-hidden">
                              <img src={item.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow">
                              <h4 className="text-lg font-serif text-premium-black mb-1">{item.name}</h4>
                              <p className="text-xs text-premium-black/40 uppercase tracking-widest">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold">LKR {(item.price * item.quantity).toLocaleString()}</p>
                              <p className="text-[10px] text-premium-black/30">LKR {item.price.toLocaleString()} each</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-6 bg-premium-black text-premium-cream">
                        <div className="flex justify-between items-center mb-2 text-xs text-premium-cream/60 uppercase tracking-widest">
                          <span>Items Subtotal</span>
                          <span>LKR {selectedOrder.itemsPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4 text-xs text-premium-cream/60 uppercase tracking-widest">
                          <span>Shipping Fee</span>
                          <span>LKR {selectedOrder.shippingPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center border-t border-premium-gold/30 pt-4">
                          <span className="text-sm font-bold uppercase tracking-widest text-premium-gold">Total Revenue</span>
                          <span className="text-2xl font-serif">LKR {selectedOrder.totalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
