import { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area,
} from 'recharts';
import {
  DollarSign, ShoppingCart, Package, TrendingUp, ArrowUpRight, ArrowDownRight,
  MapPin, CreditCard, Users, Filter, Download, RefreshCw,
} from 'lucide-react';
import {
  transactions, monthlySales, categorySales, regionSales, topProducts,
  paymentBreakdown, customerBreakdown, uniqueProducts,
} from '../data/salesData';

const COLORS = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

export default function SalesAnalytics() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [showRawData, setShowRawData] = useState(false);

  const filteredTxns = useMemo(() => {
    return transactions.filter((t) => {
      if (selectedCategory !== 'All' && t.category !== selectedCategory) return false;
      if (selectedRegion !== 'All' && t.region !== selectedRegion) return false;
      return true;
    });
  }, [selectedCategory, selectedRegion]);

  const filteredRevenue = Math.round(filteredTxns.reduce((s, t) => s + t.total, 0));
  const filteredOrders = filteredTxns.length;
  const filteredUnits = filteredTxns.reduce((s, t) => s + t.quantity, 0);
  const filteredAOV = filteredOrders > 0 ? Math.round(filteredRevenue / filteredOrders) : 0;

  const kpis = [
    { label: 'Total Revenue', value: `$${(filteredRevenue / 1000).toFixed(1)}K`, delta: '+12.4%', up: true, icon: DollarSign, color: 'from-purple-500 to-violet-500' },
    { label: 'Total Orders', value: filteredOrders.toLocaleString(), delta: '+8.1%', up: true, icon: ShoppingCart, color: 'from-pink-500 to-rose-500' },
    { label: 'Units Sold', value: filteredUnits.toLocaleString(), delta: '+5.3%', up: true, icon: Package, color: 'from-cyan-500 to-blue-500' },
    { label: 'Avg Order Value', value: `$${filteredAOV}`, delta: '-1.2%', up: false, icon: TrendingUp, color: 'from-emerald-500 to-teal-500' },
  ];

  const exportCSV = () => {
    const headers = ['ID', 'Date', 'Month', 'Region', 'Product', 'Category', 'Quantity', 'Unit Price', 'Total', 'Customer Type', 'Payment Method'];
    const rows = filteredTxns.map((t) => [t.id, t.date, t.month, t.region, t.product, t.category, t.quantity, t.unitPrice, t.total, t.customerType, t.paymentMethod]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sales_data.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-16">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium mb-3">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Live Analytics
              </div>
              <h1 className="text-4xl font-bold mb-2">Smart Sales Analytics Engine</h1>
              <p className="text-blue-200 max-w-2xl">
                Python-powered analytics pipeline processing 10,000+ transactional records. 
                Automated preprocessing, visualization workflows, and revenue pattern identification.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportCSV}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button
                onClick={() => setShowRawData(!showRawData)}
                className="flex items-center gap-2 px-4 py-2 bg-white text-blue-900 hover:bg-blue-50 rounded-lg font-medium transition-colors"
              >
                <Filter className="w-4 h-4" />
                {showRawData ? 'Hide Data' : 'View Data'}
              </button>
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
              <div className="text-xs text-blue-200">Records Processed</div>
              <div className="text-2xl font-bold">10,000+</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
              <div className="text-xs text-blue-200">Effort Reduction</div>
              <div className="text-2xl font-bold">30%</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
              <div className="text-xs text-blue-200">Unique Products</div>
              <div className="text-2xl font-bold">{uniqueProducts}</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
              <div className="text-xs text-blue-200">Regions Covered</div>
              <div className="text-2xl font-bold">5</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 flex flex-wrap gap-4 items-center border border-gray-100">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Filter className="w-4 h-4 text-purple-500" />
            Filters:
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>All</option>
              {['Electronics', 'Clothing', 'Food', 'Home', 'Sports'].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Region:</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>All</option>
              {['North', 'South', 'East', 'West', 'Central'].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
          {(selectedCategory !== 'All' || selectedRegion !== 'All') && (
            <button
              onClick={() => { setSelectedCategory('All'); setSelectedRegion('All'); }}
              className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          )}
        </div>

        {/* KPI Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <div key={i} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${kpi.color} rounded-xl flex items-center justify-center shadow-md`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${kpi.up ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {kpi.delta}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{kpi.value}</div>
                <div className="text-sm text-gray-500">{kpi.label}</div>
              </div>
            );
          })}
        </div>

        {/* Main Charts Row 1 */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Monthly Revenue Trend */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Monthly Revenue Trend</h3>
                <p className="text-sm text-gray-500">Revenue and orders over 12 months</p>
              </div>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-purple-500 rounded-sm" /> Revenue</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-pink-500 rounded-sm" /> Orders</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={monthlySales}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Revenue by Category</h3>
            <p className="text-sm text-gray-500 mb-4">Share of total revenue</p>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={categorySales}
                  dataKey="revenue"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {categorySales.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Revenue']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {categorySales.slice(0, 4).map((c, i) => (
                <div key={c.category} className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="text-gray-700 font-medium">{c.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Orders by Region */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-5 h-5 text-cyan-500" />
              <h3 className="text-lg font-bold text-gray-900">Revenue by Region</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">Geographic performance breakdown</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={regionSales} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                <YAxis dataKey="region" type="category" stroke="#94a3b8" fontSize={12} width={60} />
                <Tooltip formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#06b6d4" radius={[0, 8, 8, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Orders vs Units Monthly */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              <h3 className="text-lg font-bold text-gray-900">Orders & Units</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">Monthly orders and units sold</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="units" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Payment Methods */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-bold text-gray-900">Payment Methods</h3>
            </div>
            <div className="space-y-3">
              {paymentBreakdown.map((p, i) => {
                const total = paymentBreakdown.reduce((s, x) => s + x.revenue, 0);
                const pct = Math.round((p.revenue / total) * 100);
                return (
                  <div key={p.method}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 font-medium">{p.method}</span>
                      <span className="text-gray-500">{pct}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: COLORS[i] }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">${p.revenue.toLocaleString()} · {p.count} txns</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer Types */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-pink-500" />
              <h3 className="text-lg font-bold text-gray-900">Customer Segments</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={customerBreakdown}
                  dataKey="revenue"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                >
                  {customerBreakdown.map((_, i) => (
                    <Cell key={i} fill={['#ec4899', '#8b5cf6', '#06b6d4'][i]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Revenue']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {customerBreakdown.map((c, i) => (
                <div key={c.type} className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: ['#ec4899', '#8b5cf6', '#06b6d4'][i] }} />
                    <span className="text-gray-700">{c.type}</span>
                  </div>
                  <span className="text-gray-500">{c.count} orders</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 lg:col-span-1">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Top 5 Products</h3>
            <div className="space-y-3">
              {topProducts.slice(0, 5).map((p, i) => (
                <div key={p.product} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center text-sm font-bold text-purple-700">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">{p.product}</div>
                    <div className="text-xs text-gray-500">{p.category} · {p.units} units</div>
                  </div>
                  <div className="text-sm font-bold text-purple-600">${p.revenue.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights Panel */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-6 border border-purple-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Actionable Business Insights
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Peak Season', text: 'November and December show 35% higher revenue — allocate marketing budget accordingly.' },
              { title: 'Top Category', text: 'Electronics leads with ~25% of revenue. Double-down on premium product lines.' },
              { title: 'Growth Opportunity', text: 'South region underperforms. Launch targeted promotions to boost market share.' },
            ].map((ins, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-purple-100">
                <div className="text-sm font-bold text-purple-700 mb-2">{ins.title}</div>
                <div className="text-sm text-gray-600">{ins.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Raw Data Table */}
        {showRawData && (
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Transactional Records</h3>
              <span className="text-sm text-gray-500">Showing {filteredTxns.length} records</span>
            </div>
            <div className="overflow-x-auto max-h-96 overflow-y-auto border border-gray-200 rounded-xl">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    {['ID', 'Date', 'Region', 'Product', 'Category', 'Qty', 'Price', 'Total', 'Customer', 'Payment'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredTxns.slice(0, 200).map((t) => (
                    <tr key={t.id} className="hover:bg-purple-50">
                      <td className="px-4 py-2 text-gray-600">#{t.id}</td>
                      <td className="px-4 py-2 text-gray-600">{t.date}</td>
                      <td className="px-4 py-2"><span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">{t.region}</span></td>
                      <td className="px-4 py-2 font-medium text-gray-900">{t.product}</td>
                      <td className="px-4 py-2 text-gray-600">{t.category}</td>
                      <td className="px-4 py-2 text-gray-600">{t.quantity}</td>
                      <td className="px-4 py-2 text-gray-600">${t.unitPrice}</td>
                      <td className="px-4 py-2 font-semibold text-purple-700">${t.total.toFixed(2)}</td>
                      <td className="px-4 py-2 text-gray-600">{t.customerType}</td>
                      <td className="px-4 py-2 text-gray-600">{t.paymentMethod}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
