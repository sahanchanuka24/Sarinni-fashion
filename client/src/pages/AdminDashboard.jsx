import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, CheckCircle, Truck, Trash2, Eye, X, Phone, Mail,
  MapPin, Hash, User, Plus, ShoppingBag, DollarSign, Pencil
} from 'lucide-react';

const EMPTY_PRODUCT = {
  name: '', description: '', price: '', category: 'Insulated',
  material: '', color: '', stock: 1, imageUrl: ''
};

const CATEGORIES = ['Insulated', 'Glass', 'Plastic', 'Adventure', 'Lifestyle'];

const inputCls = "w-full bg-white border border-gray-200 py-2.5 px-3 text-sm outline-none focus:border-gray-800 transition-colors";
const labelCls = "block text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [stats, setStats] = useState({ total: 0, revenue: 0, processing: 0, productCount: 0 });

  // Product modal state
  const [productModal, setProductModal] = useState(null); // null | 'add' | 'edit'
  const [editingProduct, setEditingProduct] = useState(null); // product object being edited
  const [productForm, setProductForm] = useState(EMPTY_PRODUCT);
  const [saving, setSaving] = useState(false);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/admin/all-orders');
      setOrders(data.orders);
      const revenue = data.orders.reduce((acc, o) => acc + o.totalPrice, 0);
      const processing = data.orders.filter(o => o.orderStatus === 'Processing').length;
      setStats(prev => ({ ...prev, total: data.orders.length, revenue, processing }));
    } catch {}
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/products');
      setProducts(data.products || []);
      setStats(prev => ({ ...prev, productCount: data.products?.length || 0 }));
    } catch {}
  };

  useEffect(() => {
    Promise.all([fetchOrders(), fetchProducts()]).finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/admin/orders/${id}`, { status });
      fetchOrders();
      if (selectedOrder?._id === id) setSelectedOrder(prev => ({ ...prev, orderStatus: status }));
    } catch { alert('Error updating status'); }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm('Delete this order?')) return;
    try { await axios.delete(`/admin/orders/${id}`); fetchOrders(); setSelectedOrder(null); }
    catch { alert('Error deleting order'); }
  };

  // Open add modal
  const openAddModal = () => {
    setProductForm(EMPTY_PRODUCT);
    setEditingProduct(null);
    setProductModal('add');
  };

  // Open edit modal
  const openEditModal = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      category: product.category || 'Insulated',
      material: product.material || '',
      color: product.color || '',
      stock: product.stock || 1,
      imageUrl: product.images?.[0]?.url || ''
    });
    setProductModal('edit');
  };

  const closeProductModal = () => { setProductModal(null); setEditingProduct(null); };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...productForm,
        price: Number(productForm.price),
        stock: Number(productForm.stock),
        images: productForm.imageUrl ? [{ url: productForm.imageUrl }] : []
      };

      if (productModal === 'add') {
        await axios.post('/admin/product/new', payload);
      } else {
        await axios.put(`/admin/product/${editingProduct._id}`, payload);
      }

      closeProductModal();
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving product');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try { await axios.delete(`/admin/product/${id}`); fetchProducts(); }
    catch { alert('Error deleting product'); }
  };

  const statusColor = s => ({
    Processing: 'bg-amber-50 text-amber-700 border-amber-200',
    Shipped: 'bg-blue-50 text-blue-700 border-blue-200',
    Delivered: 'bg-green-50 text-green-700 border-green-200',
  }[s] || 'bg-gray-50 text-gray-600 border-gray-200');

  if (loading) return (
    <div className="pt-32 flex justify-center min-h-screen">
      <div className="w-8 h-8 border border-black border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="pt-20 bg-white min-h-screen pb-20">
      <div className="px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pt-8 border-b border-gray-100 pb-6">
          <div>
            <h1 className="text-2xl font-light tracking-tight text-gray-900 mb-4">Admin Dashboard</h1>
            <div className="flex gap-8">
              {[['orders', `Orders (${stats.total})`], ['products', `Inventory (${stats.productCount})`]].map(([id, label]) => (
                <button key={id} onClick={() => setActiveTab(id)}
                  className={`text-[11px] font-semibold uppercase tracking-widest pb-2 border-b-2 transition-all ${
                    activeTab === id ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-700'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            {activeTab === 'orders' ? (
              <div className="flex gap-3">
                <div className="border border-gray-200 p-4 min-w-[140px]">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Revenue</p>
                  <p className="text-base font-semibold">LKR {stats.revenue.toLocaleString()}</p>
                </div>
                <div className="bg-black text-white p-4 min-w-[100px]">
                  <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Pending</p>
                  <p className="text-base font-semibold">{stats.processing}</p>
                </div>
              </div>
            ) : (
              <button onClick={openAddModal}
                className="flex items-center gap-2 px-6 py-3 bg-black text-white text-[11px] font-semibold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                <Plus size={14} /> Add Product
              </button>
            )}
          </div>
        </div>

        {/* Orders Table */}
        {activeTab === 'orders' && (
          <div className="border border-gray-100 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map(order => (
                  <tr key={order._id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-gray-400">#{order._id.slice(-8).toUpperCase()}</td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-medium text-gray-900">{order.shippingInfo.email}</p>
                      <p className="text-[10px] text-gray-400">{order.shippingInfo.phoneNo}</p>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold">LKR {order.totalPrice.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border ${statusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => setSelectedOrder(order)} className="text-gray-400 hover:text-gray-900 transition-colors"><Eye size={16} /></button>
                        <button onClick={() => deleteOrder(order._id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && (
              <div className="py-20 text-center text-gray-300"><Package size={40} className="mx-auto mb-4 opacity-30" /><p className="text-sm">No orders yet.</p></div>
            )}
          </div>
        )}

        {/* Products Table */}
        {activeTab === 'products' && (
          <div className="border border-gray-100 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4 text-center">Stock</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map(product => (
                  <tr key={product._id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={product.images?.[0]?.url || ''} alt=""
                          className="w-10 h-14 object-cover bg-gray-100 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{product.name}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider">{product.material}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 px-2 py-1 bg-gray-100">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold">LKR {product.price?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-xs font-semibold ${product.stock < 5 ? 'text-red-500' : 'text-gray-600'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => openEditModal(product)}
                          className="text-gray-400 hover:text-gray-900 transition-colors"
                          title="Edit Product"
                        >
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => handleDeleteProduct(product._id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && (
              <div className="py-20 text-center text-gray-300"><ShoppingBag size={40} className="mx-auto mb-4 opacity-30" /><p className="text-sm">No products yet.</p></div>
            )}
          </div>
        )}
      </div>

      {/* ── Product Add / Edit Modal ── */}
      <AnimatePresence>
        {productModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeProductModal} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
              className="relative bg-white w-full max-w-xl shadow-2xl overflow-hidden">
              {/* Modal header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                <h2 className="text-sm font-semibold uppercase tracking-widest">
                  {productModal === 'edit' ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button onClick={closeProductModal} className="hover:opacity-60 transition-opacity"><X size={18} /></button>
              </div>

              <form onSubmit={handleProductSubmit} className="p-6 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Product Name *</label>
                    <input required type="text" className={inputCls} value={productForm.name}
                      onChange={e => setProductForm({...productForm, name: e.target.value})} />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelCls}>Description *</label>
                    <textarea required rows={3} className={inputCls + ' resize-none'} value={productForm.description}
                      onChange={e => setProductForm({...productForm, description: e.target.value})} />
                  </div>

                  <div>
                    <label className={labelCls}>Price (LKR) *</label>
                    <input required type="number" min="0" className={inputCls} value={productForm.price}
                      onChange={e => setProductForm({...productForm, price: e.target.value})} />
                  </div>

                  <div>
                    <label className={labelCls}>Stock *</label>
                    <input required type="number" min="0" className={inputCls} value={productForm.stock}
                      onChange={e => setProductForm({...productForm, stock: e.target.value})} />
                  </div>

                  <div>
                    <label className={labelCls}>Category</label>
                    <select className={inputCls} value={productForm.category}
                      onChange={e => setProductForm({...productForm, category: e.target.value})}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className={labelCls}>Material</label>
                    <input type="text" className={inputCls} placeholder="e.g. Stainless Steel" value={productForm.material}
                      onChange={e => setProductForm({...productForm, material: e.target.value})} />
                  </div>

                  <div>
                    <label className={labelCls}>Color</label>
                    <input type="text" className={inputCls} placeholder="e.g. Saffron Gold" value={productForm.color}
                      onChange={e => setProductForm({...productForm, color: e.target.value})} />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelCls}>Image URL</label>
                    <input type="url" className={inputCls} placeholder="https://…" value={productForm.imageUrl}
                      onChange={e => setProductForm({...productForm, imageUrl: e.target.value})} />
                    {productForm.imageUrl && (
                      <img src={productForm.imageUrl} alt="preview" className="mt-2 h-24 w-16 object-cover bg-gray-100" />
                    )}
                  </div>
                </div>

                <button type="submit" disabled={saving}
                  className="mt-6 w-full py-3.5 bg-black text-white text-[11px] font-semibold uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {saving ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving…</>
                  ) : (productModal === 'edit' ? 'Save Changes' : 'Add to Catalog')}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Order Details Modal ── */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
              className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center z-10">
                <h2 className="text-sm font-semibold uppercase tracking-widest">Order #{selectedOrder._id.slice(-8).toUpperCase()}</h2>
                <button onClick={() => setSelectedOrder(null)} className="hover:opacity-60"><X size={18} /></button>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Customer info */}
                <div className="md:col-span-1 space-y-4">
                  <div className="border border-gray-100 p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-4">Customer</p>
                    <div className="space-y-3 text-sm">
                      <p className="flex gap-2 items-start"><Mail size={13} className="text-gray-300 mt-0.5 shrink-0" />{selectedOrder.shippingInfo.email}</p>
                      <p className="flex gap-2 items-start"><Phone size={13} className="text-gray-300 mt-0.5 shrink-0" />{selectedOrder.shippingInfo.phoneNo}</p>
                      <p className="flex gap-2 items-start text-gray-500"><MapPin size={13} className="text-gray-300 mt-0.5 shrink-0" />
                        {selectedOrder.shippingInfo.address}, {selectedOrder.shippingInfo.city}
                      </p>
                    </div>
                  </div>
                  <div className="border border-gray-100 p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Update Status</p>
                    <select className="w-full border border-gray-200 py-2 px-3 text-xs outline-none focus:border-gray-800 transition-colors"
                      value={selectedOrder.orderStatus} onChange={e => updateStatus(selectedOrder._id, e.target.value)}>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                    </select>
                    <div className={`mt-2 text-center py-1.5 text-[10px] font-bold uppercase tracking-widest border ${statusColor(selectedOrder.orderStatus)}`}>
                      {selectedOrder.orderStatus}
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="md:col-span-2">
                  <div className="border border-gray-100">
                    <div className="border-b border-gray-100 px-5 py-3 flex justify-between">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Items</p>
                      <span className="text-[10px] bg-black text-white px-2 py-0.5">{selectedOrder.orderItems.length}</span>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {selectedOrder.orderItems.map((item, i) => (
                        <div key={i} className="flex gap-4 p-4">
                          <img src={item.image} alt="" className="w-14 h-18 object-cover bg-gray-100 flex-shrink-0" style={{height:'72px'}} />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-semibold">LKR {(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 p-5 bg-gray-50">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Subtotal</span><span>LKR {selectedOrder.itemsPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mb-3">
                        <span>Shipping</span><span>{selectedOrder.shippingPrice === 0 ? 'FREE' : `LKR ${selectedOrder.shippingPrice.toLocaleString()}`}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total</span><span>LKR {selectedOrder.totalPrice.toLocaleString()}</span>
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
