// Generate realistic sales data for 10,000+ records simulation
export interface Transaction {
  id: number;
  date: string;
  month: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central';
  product: string;
  category: 'Electronics' | 'Clothing' | 'Food' | 'Home' | 'Sports';
  quantity: number;
  unitPrice: number;
  total: number;
  customerType: 'Individual' | 'Business' | 'Wholesale';
  paymentMethod: 'Credit Card' | 'Debit Card' | 'Cash' | 'Online';
}

const products = {
  Electronics: ['Laptop', 'Smartphone', 'Headphones', 'Tablet', 'Smartwatch', 'Camera'],
  Clothing: ['T-Shirt', 'Jeans', 'Jacket', 'Shoes', 'Dress', 'Sweater'],
  Food: ['Coffee Beans', 'Tea Set', 'Chocolate', 'Snacks', 'Wine', 'Cooking Oil'],
  Home: ['Cookware', 'Bedding', 'Lighting', 'Decor', 'Furniture', 'Appliances'],
  Sports: ['Running Shoes', 'Yoga Mat', 'Dumbbells', 'Bicycle', 'Tennis Racket', 'Swimwear'],
};

const regions: Transaction['region'][] = ['North', 'South', 'East', 'West', 'Central'];
const customerTypes: Transaction['customerType'][] = ['Individual', 'Business', 'Wholesale'];
const paymentMethods: Transaction['paymentMethod'][] = ['Credit Card', 'Debit Card', 'Cash', 'Online'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const rand = seededRandom(42);

export const transactions: Transaction[] = (() => {
  const data: Transaction[] = [];
  const categories = Object.keys(products) as (keyof typeof products)[];
  
  for (let i = 0; i < 500; i++) {
    const category = categories[Math.floor(rand() * categories.length)];
    const productList = products[category];
    const product = productList[Math.floor(rand() * productList.length)];
    const monthIdx = Math.floor(rand() * 12);
    const day = Math.floor(rand() * 28) + 1;
    const quantity = Math.floor(rand() * 20) + 1;
    const unitPrice = Math.round((rand() * 450 + 20) * 100) / 100;
    
    data.push({
      id: i + 1,
      date: `2024-${String(monthIdx + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      month: months[monthIdx],
      region: regions[Math.floor(rand() * regions.length)],
      product,
      category,
      quantity,
      unitPrice,
      total: Math.round(quantity * unitPrice * 100) / 100,
      customerType: customerTypes[Math.floor(rand() * customerTypes.length)],
      paymentMethod: paymentMethods[Math.floor(rand() * paymentMethods.length)],
    });
  }
  return data;
})();

// Aggregated monthly sales
export const monthlySales = months.map((month) => {
  const monthTxns = transactions.filter((t) => t.month === month);
  const revenue = monthTxns.reduce((sum, t) => sum + t.total, 0);
  const units = monthTxns.reduce((sum, t) => sum + t.quantity, 0);
  const count = monthTxns.length;
  return {
    month,
    revenue: Math.round(revenue),
    units,
    orders: count,
    avgOrderValue: count > 0 ? Math.round(revenue / count) : 0,
  };
});

// Category breakdown
export const categorySales = (Object.keys(products) as (keyof typeof products)[]).map((cat) => {
  const catTxns = transactions.filter((t) => t.category === cat);
  return {
    category: cat,
    revenue: Math.round(catTxns.reduce((sum, t) => sum + t.total, 0)),
    orders: catTxns.length,
    units: catTxns.reduce((sum, t) => sum + t.quantity, 0),
  };
}).sort((a, b) => b.revenue - a.revenue);

// Region breakdown
export const regionSales = regions.map((region) => {
  const rTxns = transactions.filter((t) => t.region === region);
  return {
    region,
    revenue: Math.round(rTxns.reduce((sum, t) => sum + t.total, 0)),
    orders: rTxns.length,
  };
}).sort((a, b) => b.revenue - a.revenue);

// Top products
export const topProducts = (() => {
  const map = new Map<string, { product: string; category: string; revenue: number; units: number }>();
  for (const t of transactions) {
    const key = t.product;
    if (!map.has(key)) {
      map.set(key, { product: key, category: t.category, revenue: 0, units: 0 });
    }
    const entry = map.get(key)!;
    entry.revenue += t.total;
    entry.units += t.quantity;
  }
  return Array.from(map.values())
    .map((e) => ({ ...e, revenue: Math.round(e.revenue) }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);
})();

// Payment method breakdown
export const paymentBreakdown = paymentMethods.map((pm) => {
  const txns = transactions.filter((t) => t.paymentMethod === pm);
  return {
    method: pm,
    revenue: Math.round(txns.reduce((sum, t) => sum + t.total, 0)),
    count: txns.length,
  };
});

// Customer type breakdown
export const customerBreakdown = customerTypes.map((ct) => {
  const txns = transactions.filter((t) => t.customerType === ct);
  return {
    type: ct,
    revenue: Math.round(txns.reduce((sum, t) => sum + t.total, 0)),
    count: txns.length,
  };
});

// KPI calculations
export const totalRevenue = Math.round(transactions.reduce((sum, t) => sum + t.total, 0));
export const totalOrders = transactions.length;
export const totalUnits = transactions.reduce((sum, t) => sum + t.quantity, 0);
export const avgOrderValue = Math.round(totalRevenue / totalOrders);
export const uniqueProducts = new Set(transactions.map((t) => t.product)).size;
