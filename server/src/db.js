const mysql = require('mysql2/promise');

// 10 Variantes Destacadas de Café de Especialidad para Coffee Rapid
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Rey de los cafes',
    category: 'Bebidas Calientes',
    price: 6.50,
    stock: 45,
    specialty_level: 'Especialidad 94 pts SCA',
    temperature: 'Caliente',
    origin: 'Geisha de Finca El Paraíso, Huila (1,950 msnm)',
    roast: 'Tueste Medio Claro',
    tasting_notes: 'Jazmín, flor de café, bergamota, melocotón y miel pura',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    description: 'Nuestra creación insigne: espresso doble Geisha de altura con vaporización sedosa de leche de granja y delicado velo de canela de Ceilán.'
  },
  {
    id: 2,
    name: 'Cafe Real Caliente',
    category: 'Bebidas Calientes',
    price: 5.20,
    stock: 60,
    specialty_level: 'Especialidad 91 pts SCA',
    temperature: 'Caliente',
    origin: 'Bourbon Rosado, Tarrazú, Costa Rica (1,800 msnm)',
    roast: 'Tueste Medio',
    tasting_notes: 'Avellanas tostadas, toffee artesanal, cacao 70% y cardamomo',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&auto=format&fit=crop&q=80',
    description: 'Extracción doble de café arábica con microespuma cremosa, infusión de avellana silvestre y terminado con crema real aterciopelada.'
  },
  {
    id: 3,
    name: 'Cafe Real helado',
    category: 'Bebidas Frías',
    price: 5.80,
    stock: 55,
    specialty_level: 'Especialidad 92 pts SCA',
    temperature: 'Fría',
    origin: 'Etiopía Yirgacheffe lavado (2,100 msnm)',
    roast: 'Tueste Omni Cold Brew',
    tasting_notes: 'Vainilla Bourbon, caramelo rubio, arándanos silvestres y cuerpo denso',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80',
    description: 'Cold brew reposado 20 horas en barrica de roble francés con leche infusionada en vainas de vainilla de Madagascar y hielo cristalino artesanal.'
  },
  {
    id: 4,
    name: 'Cafe Doble Especial',
    category: 'Bebidas Calientes',
    price: 4.80,
    stock: 50,
    specialty_level: 'Especialidad 90 pts SCA',
    temperature: 'Caliente',
    origin: 'Nariño & Antioquia Reserve Blend (1,900 msnm)',
    roast: 'Tueste Medio Oscuro Equilibrado',
    tasting_notes: 'Chocolate amargo, panela orgánica, nuez moscada y crema dorada',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&auto=format&fit=crop&q=80',
    description: 'Doble ristretto potente calibrado a 9 bares de presión con ratio 1:2, entregando crema densa avellanada y una persistencia en boca memorable.'
  },
  {
    id: 5,
    name: 'Cold Brew Nitro Real',
    category: 'Bebidas Frías',
    price: 5.50,
    stock: 40,
    specialty_level: 'Especialidad 89 pts SCA',
    temperature: 'Fría',
    origin: 'Kenia Nyeri AA Single Origin (1,850 msnm)',
    roast: 'Tueste Medio Claro',
    tasting_notes: 'Grosella negra, ciruela roja, cascada cremosa nitro y final aterciopelado',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop&q=80',
    description: 'Extracción en frío infusionada con microburbujas de nitrógeno puro a presión para una textura tipo terciopelo sin azúcar añadida.'
  },
  {
    id: 6,
    name: 'Caramel Velvet Macchiato',
    category: 'Bebidas Calientes',
    price: 5.40,
    stock: 48,
    specialty_level: 'Especialidad 88 pts SCA',
    temperature: 'Caliente',
    origin: 'Guatemala Antigua Los Volcanes (1,700 msnm)',
    roast: 'Tueste Medio',
    tasting_notes: 'Caramelo de mantequilla salada, vainilla pura y manzana horneada',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=600&auto=format&fit=crop&q=80',
    description: 'Capas armónicas de leche vaporizada dulce, shot de espresso vertido suavemente y reducción de caramelo artesanal elaborada en casa.'
  },
  {
    id: 7,
    name: 'Mocha Suizo Blanco',
    category: 'Bebidas Calientes',
    price: 5.60,
    stock: 35,
    specialty_level: 'Especialidad 89 pts SCA',
    temperature: 'Caliente',
    origin: 'Colombia Huila Supremo (1,750 msnm)',
    roast: 'Tueste Medio',
    tasting_notes: 'Ganache de chocolate blanco suizo, crema chantilly y nibs de cacao crujientes',
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=600&auto=format&fit=crop&q=80',
    description: 'Unión indulgente de espresso de especialidad recién molido con manteca de cacao pura de chocolate blanco suizo y leche texturizada a 65°C.'
  },
  {
    id: 8,
    name: 'Frappé Real Avellana & Cacao',
    category: 'Bebidas Frías',
    price: 5.90,
    stock: 38,
    specialty_level: 'Especialidad 88 pts SCA',
    temperature: 'Fría',
    origin: 'Brasil Cerrado Mineiro Natural (1,200 msnm)',
    roast: 'Tueste Medio Oscuro',
    tasting_notes: 'Pasta pura de avellanas del Piamonte, praliné crujiente y cacao belga',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
    description: 'Frappé frappado en frío con doble espresso, leche orgánica, pasta de avellanas y corona de crema chantilly con ralladura de chocolate amargo.'
  },
  {
    id: 9,
    name: 'Espresso Tonic Cítrico',
    category: 'Bebidas Frías',
    price: 5.10,
    stock: 42,
    specialty_level: 'Especialidad 93 pts SCA',
    temperature: 'Fría',
    origin: 'Etiopía Guji Shakiso Orgánico (2,200 msnm)',
    roast: 'Tueste Claro Nórdico',
    tasting_notes: 'Agua tónica botánica, pomelo rosado, lima kaffir y jazmín silvestre',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80',
    description: 'La máxima expresión de frescura: espresso etíope floral en suspensión sobre agua tónica artesanal con hielo cúbico y gajo de pomelo deshidratado.'
  },
  {
    id: 10,
    name: 'Flat White Origen Único',
    category: 'Bebidas Calientes',
    price: 4.90,
    stock: 52,
    specialty_level: 'Especialidad 92 pts SCA',
    temperature: 'Caliente',
    origin: 'Ruanda Nyamasheke Red Bourbon (1,900 msnm)',
    roast: 'Tueste Medio Claro',
    tasting_notes: 'Miel silvestre, mandarinas dulces, ciruela negra y microespuma de seda',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&auto=format&fit=crop&q=80',
    description: 'Doble ristretto extraído con precisión milimétrica y mezclado con microespuma húmeda sin burbujas visibles, acentuando la dulzura natural.'
  }
];

// Métricas de Consumidores / Clientes y Análisis de Consumo
const DEMO_CUSTOMERS = [
  {
    id: 'CLI-101',
    name: 'Valentina Restrepo',
    tier: 'VIP Oro',
    tierBadge: '⭐ VIP Oro',
    ordersCount: 38,
    totalSpent: 228.50,
    favoriteDrink: 'Rey de los cafes',
    categoryPreference: 'Bebidas Calientes',
    avgTicket: 6.01,
    frequency: 'Diario (4-5 veces por semana)',
    lastVisit: 'Hoy, hace 25 min',
    loyaltyPoints: 1140
  },
  {
    id: 'CLI-102',
    name: 'Carlos Mendoza',
    tier: 'VIP Oro',
    tierBadge: '⭐ VIP Oro',
    ordersCount: 31,
    totalSpent: 179.80,
    favoriteDrink: 'Cafe Real helado',
    categoryPreference: 'Bebidas Frías',
    avgTicket: 5.80,
    frequency: 'Diario (Tardes)',
    lastVisit: 'Hoy, 09:15 AM',
    loyaltyPoints: 920
  },
  {
    id: 'CLI-103',
    name: 'Mariana Silva',
    tier: 'VIP Plata',
    tierBadge: '✨ VIP Plata',
    ordersCount: 22,
    totalSpent: 114.40,
    favoriteDrink: 'Cafe Real Caliente',
    categoryPreference: 'Bebidas Calientes',
    avgTicket: 5.20,
    frequency: '3 veces por semana',
    lastVisit: 'Ayer, 04:30 PM',
    loyaltyPoints: 660
  },
  {
    id: 'CLI-104',
    name: 'Diego Andrés Torres',
    tier: 'VIP Plata',
    tierBadge: '✨ VIP Plata',
    ordersCount: 19,
    totalSpent: 98.20,
    favoriteDrink: 'Cold Brew Nitro Real',
    categoryPreference: 'Bebidas Frías',
    avgTicket: 5.17,
    frequency: '2-3 veces por semana',
    lastVisit: 'Hace 2 días',
    loyaltyPoints: 570
  },
  {
    id: 'CLI-105',
    name: 'Camila Morales',
    tier: 'Frecuente',
    tierBadge: '☕ Frecuente',
    ordersCount: 14,
    totalSpent: 72.80,
    favoriteDrink: 'Cafe Doble Especial',
    categoryPreference: 'Bebidas Calientes',
    avgTicket: 5.20,
    frequency: 'Semanal',
    lastVisit: 'Hace 3 días',
    loyaltyPoints: 420
  },
  {
    id: 'CLI-106',
    name: 'Julián Paredes',
    tier: 'Frecuente',
    tierBadge: '☕ Frecuente',
    ordersCount: 11,
    totalSpent: 59.90,
    favoriteDrink: 'Espresso Tonic Cítrico',
    categoryPreference: 'Bebidas Frías',
    avgTicket: 5.45,
    frequency: 'Fin de semana',
    lastVisit: 'Hace 4 días',
    loyaltyPoints: 330
  },
  {
    id: 'CLI-107',
    name: 'Sofía Navarro',
    tier: 'Nuevo',
    tierBadge: '🌱 Nuevo',
    ordersCount: 3,
    totalSpent: 17.60,
    favoriteDrink: 'Flat White Origen Único',
    categoryPreference: 'Bebidas Calientes',
    avgTicket: 5.86,
    frequency: 'En exploración',
    lastVisit: 'Hoy, 11:40 AM',
    loyaltyPoints: 90
  }
];

let inMemoryProducts = [...INITIAL_PRODUCTS];
let inMemoryOrders = [
  {
    id: 'ORD-9821',
    customer: 'Valentina Restrepo',
    items: ['Rey de los cafes (Mediano, Leche de Granja)'],
    total: 6.50,
    status: 'Preparando en Barra',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    pickupType: 'Retiro en Barra'
  },
  {
    id: 'ORD-9820',
    customer: 'Carlos Mendoza',
    items: ['Cafe Real helado (Grande, Hielo Extra)', 'Cold Brew Nitro Real (Mediano)'],
    total: 11.30,
    status: 'Listo para Retiro',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    pickupType: 'Entrega Express'
  },
  {
    id: 'ORD-9819',
    customer: 'Mariana Silva',
    items: ['Cafe Real Caliente (Mediano)'],
    total: 5.20,
    status: 'Entregado',
    timestamp: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
    pickupType: 'En Mesa #4'
  }
];

let pool = null;
let isConnectedToMySQL = false;
let lastDbError = null;

async function initDB() {
  const databaseUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;
  const host = process.env.DB_HOST || process.env.MYSQL_HOST;
  const user = process.env.DB_USER || process.env.MYSQL_USER || 'root';
  const password = process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || '';
  const database = process.env.DB_NAME || process.env.MYSQL_DATABASE || 'demo';
  const port = parseInt(process.env.DB_PORT || '3306', 10);

  if (!databaseUrl && !host) {
    lastDbError = 'Variables DB_HOST ni DATABASE_URL configuradas en el entorno.';
    console.log(`ℹ️ [DB Coffee Rapid] ${lastDbError} Operando en modo In-Memory para demostración.`);
    return;
  }

  try {
    if (databaseUrl) {
      console.log(`🔄 [DB Coffee Rapid] Intentando conectar a MySQL vía DATABASE_URL...`);
      pool = mysql.createPool(databaseUrl);
    } else {
      console.log(`🔄 [DB Coffee Rapid] Intentando conectar a MySQL en ${host}:${port} con usuario "${user}" a la BD "${database}"...`);
      pool = mysql.createPool({
        host,
        user,
        password,
        database,
        port,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 8000
      });
    }

    const connection = await pool.getConnection();
    console.log(`✅ [DB Coffee Rapid] Conectado exitosamente a MySQL (${host || 'URL'} - BD: ${database})`);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        specialty_level VARCHAR(100) DEFAULT 'Especialidad 90 pts SCA',
        temperature VARCHAR(50) DEFAULT 'Caliente',
        origin VARCHAR(255) DEFAULT '',
        roast VARCHAR(100) DEFAULT '',
        tasting_notes VARCHAR(255) DEFAULT '',
        image VARCHAR(500),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Sembrar datos iniciales de café si está vacía
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM products');
    if (rows[0].count === 0) {
      console.log('🌱 [DB Coffee Rapid] Inicializando catálogo de 10 variantes de café en MySQL...');
      for (const p of INITIAL_PRODUCTS) {
        await connection.query(
          `INSERT INTO products (name, category, price, stock, specialty_level, temperature, origin, roast, tasting_notes, image, description) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [p.name, p.category, p.price, p.stock, p.specialty_level, p.temperature, p.origin, p.roast, p.tasting_notes, p.image, p.description]
        );
      }
    }

    connection.release();
    isConnectedToMySQL = true;
    lastDbError = null;
  } catch (error) {
    lastDbError = error.message;
    console.warn(`⚠️ [DB Coffee Rapid] No se pudo conectar a MySQL: ${error.message}. Operando en modo In-Memory.`);
    isConnectedToMySQL = false;
  }
}

async function getProducts() {
  if (!isConnectedToMySQL && (process.env.DB_HOST || process.env.DATABASE_URL)) {
    await initDB();
  }

  if (isConnectedToMySQL && pool) {
    try {
      const [rows] = await pool.query('SELECT * FROM products ORDER BY id ASC');
      return rows;
    } catch (err) {
      console.error('Error consultando MySQL, recurriendo a memoria temporal:', err.message);
      lastDbError = err.message;
    }
  }
  return inMemoryProducts;
}

async function addProduct({ name, category, price, stock, specialty_level, temperature, origin, roast, tasting_notes, image, description }) {
  if (!isConnectedToMySQL && (process.env.DB_HOST || process.env.DATABASE_URL)) {
    await initDB();
  }

  const pPrice = parseFloat(price) || 0;
  const pStock = parseInt(stock, 10) || 0;
  const pSpecialty = specialty_level || 'Especialidad 90 pts SCA';
  const pTemp = temperature || (category?.includes('Fría') ? 'Fría' : 'Caliente');
  const pOrigin = origin || 'Origen Seleccionado';
  const pRoast = roast || 'Tueste Medio';
  const pNotes = tasting_notes || 'Notas florales y caramelo';
  const pImg = image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80';
  const pDesc = description || 'Bebida de especialidad Coffee Rapid recién calibrada.';

  if (isConnectedToMySQL && pool) {
    const [result] = await pool.query(
      `INSERT INTO products (name, category, price, stock, specialty_level, temperature, origin, roast, tasting_notes, image, description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, category || 'Bebidas Calientes', pPrice, pStock, pSpecialty, pTemp, pOrigin, pRoast, pNotes, pImg, pDesc]
    );
    return {
      id: result.insertId,
      name,
      category: category || 'Bebidas Calientes',
      price: pPrice,
      stock: pStock,
      specialty_level: pSpecialty,
      temperature: pTemp,
      origin: pOrigin,
      roast: pRoast,
      tasting_notes: pNotes,
      image: pImg,
      description: pDesc
    };
  }

  const newProduct = {
    id: Date.now(),
    name,
    category: category || 'Bebidas Calientes',
    price: pPrice,
    stock: pStock,
    specialty_level: pSpecialty,
    temperature: pTemp,
    origin: pOrigin,
    roast: pRoast,
    tasting_notes: pNotes,
    image: pImg,
    description: pDesc
  };
  inMemoryProducts.unshift(newProduct);
  return newProduct;
}

async function deleteProduct(id) {
  const numId = parseInt(id, 10);
  if (isConnectedToMySQL && pool) {
    await pool.query('DELETE FROM products WHERE id = ?', [numId]);
    return true;
  }
  inMemoryProducts = inMemoryProducts.filter(p => p.id !== numId);
  return true;
}

async function resetProducts() {
  if (isConnectedToMySQL && pool) {
    await pool.query('TRUNCATE TABLE products');
    for (const p of INITIAL_PRODUCTS) {
      await pool.query(
        `INSERT INTO products (name, category, price, stock, specialty_level, temperature, origin, roast, tasting_notes, image, description)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [p.name, p.category, p.price, p.stock, p.specialty_level, p.temperature, p.origin, p.roast, p.tasting_notes, p.image, p.description]
      );
    }
    return;
  }
  inMemoryProducts = [...INITIAL_PRODUCTS];
}

function getDbStatus() {
  return {
    mode: isConnectedToMySQL ? 'mysql' : 'in-memory',
    connected: isConnectedToMySQL,
    host: process.env.DB_HOST || (process.env.DATABASE_URL ? 'via-database-url' : 'local-in-memory'),
    database: process.env.DB_NAME || 'coffee_rapid_db',
    user: process.env.DB_USER || 'barista_admin',
    productsCount: inMemoryProducts.length,
    activePool: isConnectedToMySQL ? 'Conexión MySQL activa' : 'Memoria volátil de alta velocidad',
    error: lastDbError
  };
}

function getConsumerMetrics() {
  const totalConsumers = 1480;
  const activeThisMonth = 1240;
  const hotConsumptionPercent = 58; // 58%
  const coldConsumptionPercent = 42; // 42%
  const totalCupsServedToday = 247;
  const avgTicket = 6.45;
  const totalSalesMonth = 18450.80;

  // Segmentación por consumo
  const tierDistribution = {
    vipOro: { count: 320, percentage: 22, minOrders: 25, label: 'VIP Oro (25+ cafés/mes)' },
    vipPlata: { count: 540, percentage: 36, minOrders: 15, label: 'VIP Plata (15-24 cafés/mes)' },
    frecuentes: { count: 480, percentage: 32, minOrders: 5, label: 'Frecuentes (5-14 cafés/mes)' },
    ocasionales: { count: 140, percentage: 10, minOrders: 1, label: 'Ocasionales (1-4 cafés/mes)' }
  };

  const peakHours = [
    { hour: '07:00 - 09:30', name: 'Morning Rush Barista', volume: '41% del total diario', highlight: 'Café Doble Especial & Rey de los cafes' },
    { hour: '12:30 - 14:00', name: 'Almuerzo & Sobremesa', volume: '24% del total diario', highlight: 'Cafe Real Caliente' },
    { hour: '16:00 - 18:30', name: 'Afternoon Nitro & Cold', volume: '28% del total diario', highlight: 'Cafe Real helado & Nitro Cold Brew' },
    { hour: '19:00 - 21:00', name: 'Cierre Decaf & Frappés', volume: '7% del total diario', highlight: 'Frappé Real Avellana' }
  ];

  return {
    overview: {
      totalConsumers,
      activeThisMonth,
      totalCupsServedToday,
      avgTicket,
      totalSalesMonth,
      hotConsumptionPercent,
      coldConsumptionPercent
    },
    tierDistribution,
    peakHours,
    topCustomers: DEMO_CUSTOMERS
  };
}

function getOrders() {
  return inMemoryOrders;
}

function addOrder(orderData) {
  const newOrder = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    customer: orderData.customer || 'Cliente Coffee Rapid',
    items: orderData.items || ['Cafe Real Caliente'],
    total: parseFloat(orderData.total) || 5.20,
    status: 'Preparando en Barra',
    timestamp: new Date().toISOString(),
    pickupType: orderData.pickupType || 'Retiro en Barra'
  };
  inMemoryOrders.unshift(newOrder);
  return newOrder;
}

module.exports = {
  initDB,
  getProducts,
  addProduct,
  deleteProduct,
  resetProducts,
  getDbStatus,
  getConsumerMetrics,
  getOrders,
  addOrder,
  INITIAL_PRODUCTS,
  DEMO_CUSTOMERS
};
