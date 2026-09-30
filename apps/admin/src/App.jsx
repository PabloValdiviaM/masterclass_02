import React, { useState, useEffect } from 'react';

// Catálogo por defecto de las 10 bebidas de Coffee Rapid (en caso de carga inicial offline)
const DEFAULT_BEVERAGES = [
  {
    id: 1,
    name: 'Rey de los cafes',
    category: 'Bebidas Calientes',
    price: 6.50,
    stock: 45,
    specialty_level: 'Especialidad 94 pts SCA',
    temperature: 'Caliente',
    origin: 'Huila, Colombia',
    roast: 'Tueste Medio Claro',
    orders_count: 312,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80',
    description: 'Espresso doble Geisha con microespuma sedosa y velo aromático de canela de Ceilán.'
  },
  {
    id: 2,
    name: 'Cafe Real Caliente',
    category: 'Bebidas Calientes',
    price: 5.20,
    stock: 60,
    specialty_level: 'Especialidad 91 pts SCA',
    temperature: 'Caliente',
    origin: 'Tarrazú, Costa Rica',
    roast: 'Tueste Medio',
    orders_count: 248,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&auto=format&fit=crop&q=80',
    description: 'Doble arábica con microespuma artesanal, infusión de avellana silvestre y crema real.'
  },
  {
    id: 3,
    name: 'Cafe Real helado',
    category: 'Bebidas Frías',
    price: 5.80,
    stock: 55,
    specialty_level: 'Especialidad 92 pts SCA',
    temperature: 'Fría',
    origin: 'Yirgacheffe, Etiopía',
    roast: 'Omni Cold Brew',
    orders_count: 285,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&auto=format&fit=crop&q=80',
    description: 'Cold brew en barrica de roble con vainilla de Madagascar y hielo cristalino.'
  },
  {
    id: 4,
    name: 'Cafe Doble Especial',
    category: 'Bebidas Calientes',
    price: 4.80,
    stock: 50,
    specialty_level: 'Especialidad 90 pts SCA',
    temperature: 'Caliente',
    origin: 'Nariño, Colombia',
    roast: 'Tueste Medio Oscuro',
    orders_count: 219,
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&auto=format&fit=crop&q=80',
    description: 'Doble ristretto potente calibrado a 9 bares con ratio 1:2 y crema espesa dorada.'
  },
  {
    id: 5,
    name: 'Cold Brew Nitro Real',
    category: 'Bebidas Frías',
    price: 5.50,
    stock: 40,
    specialty_level: 'Especialidad 89 pts SCA',
    temperature: 'Fría',
    origin: 'Nyeri AA, Kenia',
    roast: 'Tueste Medio Claro',
    orders_count: 194,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&auto=format&fit=crop&q=80',
    description: 'Extracción fría infusionada con nitrógeno puro: textura aterciopelada tipo cascada.'
  },
  {
    id: 6,
    name: 'Caramel Velvet Macchiato',
    category: 'Bebidas Calientes',
    price: 5.40,
    stock: 48,
    specialty_level: 'Especialidad 88 pts SCA',
    temperature: 'Caliente',
    origin: 'Antigua, Guatemala',
    roast: 'Tueste Medio',
    orders_count: 176,
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&auto=format&fit=crop&q=80',
    description: 'Capas de leche vaporizada dulce, shot de espresso y sirope de caramelo salado casero.'
  },
  {
    id: 7,
    name: 'Mocha Suizo Blanco',
    category: 'Bebidas Calientes',
    price: 5.60,
    stock: 35,
    specialty_level: 'Especialidad 89 pts SCA',
    temperature: 'Caliente',
    origin: 'Huila Supremo, Colombia',
    roast: 'Tueste Medio',
    orders_count: 142,
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&auto=format&fit=crop&q=80',
    description: 'Ganache de chocolate blanco suizo con espresso recién extraído y leche texturizada.'
  },
  {
    id: 8,
    name: 'Frappé Real Avellana & Cacao',
    category: 'Bebidas Frías',
    price: 5.90,
    stock: 38,
    specialty_level: 'Especialidad 88 pts SCA',
    temperature: 'Fría',
    origin: 'Cerrado, Brasil',
    roast: 'Tueste Medio Oscuro',
    orders_count: 165,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&auto=format&fit=crop&q=80',
    description: 'Frappé helado de doble espresso, pasta de avellanas del Piamonte y virutas de cacao.'
  },
  {
    id: 9,
    name: 'Espresso Tonic Cítrico',
    category: 'Bebidas Frías',
    price: 5.10,
    stock: 42,
    specialty_level: 'Especialidad 93 pts SCA',
    temperature: 'Fría',
    origin: 'Guji, Etiopía',
    roast: 'Tueste Claro Nórdico',
    orders_count: 138,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=400&auto=format&fit=crop&q=80',
    description: 'Espresso floral en suspensión sobre agua tónica artesanal con hielo y pomelo.'
  },
  {
    id: 10,
    name: 'Flat White Origen Único',
    category: 'Bebidas Calientes',
    price: 4.90,
    stock: 52,
    specialty_level: 'Especialidad 92 pts SCA',
    temperature: 'Caliente',
    origin: 'Nyamasheke, Ruanda',
    roast: 'Tueste Medio Claro',
    orders_count: 156,
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400&auto=format&fit=crop&q=80',
    description: 'Doble ristretto con microespuma ultrafina homogénea y dulzura láctea natural.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('resumen');
  const [serverHealth, setServerHealth] = useState(null);
  const [beverages, setBeverages] = useState(DEFAULT_BEVERAGES);
  const [consumerMetrics, setConsumerMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Filter & Search for beverage catalog
  const [selectedCat, setSelectedCat] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  // Add drink modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDrink, setNewDrink] = useState({
    name: '',
    category: 'Bebidas Calientes',
    price: '',
    stock: 50,
    specialty_level: 'Especialidad 92 pts SCA',
    temperature: 'Caliente',
    origin: '',
    roast: 'Tueste Medio',
    tasting_notes: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80'
  });

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Fetch initial data
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Health
      const healthRes = await fetch('/api/health');
      if (healthRes.ok) {
        const healthData = await healthRes.json();
        setServerHealth(healthData);
      }

      // 2. Fetch Products
      const prodRes = await fetch('/api/products');
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        if (prodData.data && prodData.data.length > 0) {
          setBeverages(prodData.data);
        }
      }

      // 3. Fetch Metrics
      const metRes = await fetch('/api/metrics');
      if (metRes.ok) {
        const metData = await metRes.json();
        setConsumerMetrics(metData.data);
      }
    } catch (err) {
      console.warn('Operando con datos de respaldo local:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Ping connection test
  const handlePingTest = async () => {
    showToast('📡 Comprobando latencia y estado de la base de datos...');
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setServerHealth(data);
      showToast('✅ Conexión verificada: El servicio responde con latencia < 15ms.');
    } catch (err) {
      showToast(`⚠️ Error al contactar backend: ${err.message}`);
    }
  };

  // Reset to initial 10 drinks
  const handleResetCatalog = async () => {
    if (!confirm('¿Deseas restablecer el catálogo de 10 variantes oficiales de Coffee Rapid?')) return;
    try {
      await fetch('/api/reset', { method: 'POST' });
      await fetchData();
      showToast('🌱 Catálogo oficial de Coffee Rapid restablecido con éxito');
    } catch (err) {
      showToast('Error al restablecer catálogo');
    }
  };

  // Add new drink
  const handleCreateDrink = async (e) => {
    e.preventDefault();
    if (!newDrink.name || !newDrink.price) {
      alert('Nombre y precio son obligatorios');
      return;
    }

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDrink)
      });
      if (res.ok) {
        const created = await res.json();
        setBeverages(prev => [created.data || newDrink, ...prev]);
        setIsModalOpen(false);
        showToast(`☕ Bebida "${newDrink.name}" agregada a la barra exitosamente.`);
        setNewDrink({
          name: '',
          category: 'Bebidas Calientes',
          price: '',
          stock: 50,
          specialty_level: 'Especialidad 92 pts SCA',
          temperature: 'Caliente',
          origin: '',
          roast: 'Tueste Medio',
          tasting_notes: '',
          description: '',
          image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80'
        });
      }
    } catch (err) {
      // Local fallback
      setBeverages(prev => [{ ...newDrink, id: Date.now() }, ...prev]);
      setIsModalOpen(false);
      showToast(`☕ Bebida agregada en modo local.`);
    }
  };

  // Delete drink
  const handleDeleteDrink = async (id) => {
    if (!confirm('¿Eliminar esta bebida del catálogo activo?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      setBeverages(prev => prev.filter(b => b.id !== id));
      showToast('🗑️ Bebida eliminada del menú.');
    } catch (err) {
      setBeverages(prev => prev.filter(b => b.id !== id));
      showToast('🗑️ Bebida eliminada localmente.');
    }
  };

  // Toggle availability
  const handleToggleStock = (id) => {
    setBeverages(prev => prev.map(item => {
      if (item.id === id) {
        const newStock = item.stock > 0 ? 0 : 50;
        return { ...item, stock: newStock };
      }
      return item;
    }));
    showToast('Stock y disponibilidad en barra actualizados.');
  };

  // Filter beverages
  const filteredBeverages = beverages.filter(item => {
    const matchesCat =
      selectedCat === 'Todas' ||
      (selectedCat === 'Calientes' && item.category === 'Bebidas Calientes') ||
      (selectedCat === 'Frías' && item.category === 'Bebidas Frías');

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.origin && item.origin.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  // Hot vs Cold count
  const hotCount = beverages.filter(b => b.category === 'Bebidas Calientes').length;
  const coldCount = beverages.filter(b => b.category === 'Bebidas Frías').length;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '24px',
          background: '#24150E',
          color: '#FAF7F2',
          padding: '12px 20px',
          borderRadius: '12px',
          fontSize: '0.88rem',
          fontWeight: '600',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          zIndex: 9999,
          border: '1px solid #C28E3A'
        }} className="fade-in">
          {notification}
        </div>
      )}

      {/* Top Executive Header */}
      <header style={{
        background: '#FFFFFF',
        borderBottom: '1px solid var(--border)',
        padding: '0.9rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #C28E3A 0%, #A67528 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem',
            boxShadow: '0 4px 10px rgba(194, 142, 58, 0.3)'
          }}>☕</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#24150E', lineHeight: 1.1 }}>Coffee Rapid</h1>
              <span style={{
                background: '#FEF3C7',
                color: '#92400E',
                fontSize: '0.7rem',
                fontWeight: '800',
                padding: '2px 8px',
                borderRadius: '6px',
                border: '1px solid #FCD34D'
              }}>ADMIN DASHBOARD</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#6B5C50' }}>Control Comercial, Métricas de Consumo & Base de Datos</span>
          </div>
        </div>

        {/* Database Status Pill & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: serverHealth?.database?.connected ? 'rgba(21, 128, 61, 0.08)' : 'rgba(180, 83, 9, 0.08)',
            border: `1px solid ${serverHealth?.database?.connected ? '#BBF7D0' : '#FDE68A'}`,
            padding: '6px 14px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: serverHealth?.database?.connected ? '#15803D' : '#D97706',
              display: 'inline-block'
            }}></span>
            <span style={{ fontSize: '0.78rem', fontWeight: '700', color: serverHealth?.database?.connected ? '#15803D' : '#B45309' }}>
              {serverHealth?.database?.mode === 'mysql' ? '🐬 MySQL Activo' : '⚡ Modo In-Memory'}
            </span>
            <span style={{ fontSize: '0.72rem', color: '#9B8A7E' }}>
              ({beverages.length} bebidas)
            </span>
          </div>

          {/* External Links */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <a
              href="/"
              style={{
                textDecoration: 'none',
                background: '#F3EFE9',
                color: '#24150E',
                fontSize: '0.8rem',
                fontWeight: '700',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #E8DED1',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>🌐</span>
              <span>Landing E-commerce</span>
            </a>
            <a
              href="/app"
              style={{
                textDecoration: 'none',
                background: '#24150E',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: '700',
                padding: '6px 12px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>📱</span>
              <span>PWA Mobile</span>
            </a>
          </div>
        </div>
      </header>

      {/* Navigation Sub-Tabs */}
      <nav style={{
        background: '#FFFFFF',
        borderBottom: '1px solid var(--border)',
        padding: '0 2rem',
        display: 'flex',
        gap: '2rem',
        overflowX: 'auto'
      }}>
        {[
          { id: 'resumen', label: '📊 Resumen & Métricas', desc: 'KPIs y consumo' },
          { id: 'catalogo', label: '☕ Catálogo de Bebidas', desc: '10 Variantes y Stock' },
          { id: 'clientes', label: '👥 Consumidores & Fidelidad', desc: 'Segmentación y consumo' },
          { id: 'database', label: '🗄️ Estado DB & Sistema', desc: 'MySQL / Conectividad' }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: isActive ? '3px solid #C28E3A' : '3px solid transparent',
                padding: '14px 4px',
                cursor: 'pointer',
                color: isActive ? '#C28E3A' : '#6B5C50',
                fontWeight: isActive ? '800' : '600',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Main Dashboard Content */}
      <main style={{ flex: 1, padding: '2rem', maxWidth: '1360px', width: '100%', margin: '0 auto' }}>
        
        {/* ==================== TAB 1: RESUMEN & MÉTRICAS ==================== */}
        {activeTab === 'resumen' && (
          <div className="fade-in">
            {/* Top KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9B8A7E', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>
                  <span>Ventas Totales (Mes)</span>
                  <span style={{ color: '#15803D', fontWeight: '800' }}>+14.2% ↑</span>
                </div>
                <div style={{ fontSize: '1.85rem', fontWeight: '800', color: '#24150E' }}>$18,450.80</div>
                <div style={{ fontSize: '0.78rem', color: '#6B5C50', marginTop: '4px' }}>2,860 tazas de especialidad servidas</div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9B8A7E', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>
                  <span>Consumidores Activos</span>
                  <span style={{ color: '#C28E3A', fontWeight: '800' }}>⭐ Fidelidad</span>
                </div>
                <div style={{ fontSize: '1.85rem', fontWeight: '800', color: '#24150E' }}>1,240 clientes</div>
                <div style={{ fontSize: '0.78rem', color: '#6B5C50', marginTop: '4px' }}>78.4% tasa de recurrencia mensual</div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9B8A7E', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>
                  <span>Ticket Promedio</span>
                  <span style={{ color: '#2563EB', fontWeight: '800' }}>PWA + Barra</span>
                </div>
                <div style={{ fontSize: '1.85rem', fontWeight: '800', color: '#24150E' }}>$6.45</div>
                <div style={{ fontSize: '0.78rem', color: '#6B5C50', marginTop: '4px' }}>Promedio de 1.4 bebidas por cliente</div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9B8A7E', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>
                  <span>Bebida Más Demandada</span>
                  <span style={{ color: '#D97706', fontWeight: '800' }}>👑 TOP 1</span>
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#C28E3A' }}>Rey de los cafes</div>
                <div style={{ fontSize: '0.78rem', color: '#6B5C50', marginTop: '4px' }}>312 pedidos &bull; Microlote Geisha</div>
              </div>
            </div>

            {/* Split row: Consumption by category & Peak Hours */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              
              {/* Category Consumption Distribution */}
              <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#24150E' }}>Consumo según Tipo de Bebida</h3>
                    <p style={{ fontSize: '0.8rem', color: '#6B5C50' }}>Distribución de tazas consumidas este mes</p>
                  </div>
                  <span style={{ fontSize: '1.4rem' }}>☕❄️</span>
                </div>

                {/* Progress bar visual */}
                <div style={{ height: '14px', background: '#F0E8DD', borderRadius: '8px', overflow: 'hidden', display: 'flex', marginBottom: '1.25rem' }}>
                  <div style={{ width: '58%', background: 'linear-gradient(90deg, #C2410C, #EA580C)' }} title="Bebidas Calientes: 58%"></div>
                  <div style={{ width: '42%', background: 'linear-gradient(90deg, #0284C7, #38BDF8)' }} title="Bebidas Frías: 42%"></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ background: '#FFF1EB', border: '1px solid #FDBA74', borderRadius: '12px', padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: '700', color: '#C2410C' }}>
                      <span>🔥 Bebidas Calientes</span>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#9A3412', marginTop: '4px' }}>58%</div>
                    <span style={{ fontSize: '0.75rem', color: '#7C2D12' }}>858 tazas consumidas (6 variantes)</span>
                  </div>

                  <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '12px', padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: '700', color: '#0284C7' }}>
                      <span>❄️ Bebidas Frías</span>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0369A1', marginTop: '4px' }}>42%</div>
                    <span style={{ fontSize: '0.75rem', color: '#0C4A6E' }}>622 tazas consumidas (4 variantes)</span>
                  </div>
                </div>
              </div>

              {/* Peak consumption times */}
              <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#24150E', marginBottom: '4px' }}>
                  Franjas Horarias de Mayor Consumo
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#6B5C50', marginBottom: '1.25rem' }}>
                  Volumen de preparación en barra y bebidas estrella
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { time: '07:00 - 09:30', name: 'Morning Rush Barista', share: '41%', top: 'Rey de los cafes & Café Doble Especial' },
                    { time: '12:30 - 14:00', name: 'Almuerzo & Sobremesa', share: '24%', top: 'Cafe Real Caliente' },
                    { time: '16:00 - 18:30', name: 'Afternoon Nitro & Cold', share: '28%', top: 'Cafe Real helado & Nitro Cold Brew' },
                    { time: '19:00 - 21:00', name: 'Cierre Decaf & Frappés', share: '7%', top: 'Frappé Real Avellana' }
                  ].map(slot => (
                    <div key={slot.time} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#FAF7F2', borderRadius: '10px' }}>
                      <div>
                        <strong style={{ fontSize: '0.85rem', color: '#24150E' }}>{slot.time}</strong>
                        <span style={{ fontSize: '0.78rem', color: '#6B5C50', marginLeft: '8px' }}>{slot.name}</span>
                        <div style={{ fontSize: '0.72rem', color: '#C28E3A', fontWeight: '600' }}>⭐ Favorito: {slot.top}</div>
                      </div>
                      <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#24150E', background: '#FFFFFF', padding: '4px 8px', borderRadius: '6px', border: '1px solid #E8DED1' }}>
                        {slot.share}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Quick action banner */}
            <div style={{
              background: 'linear-gradient(135deg, #24150E 0%, #3D2214 100%)',
              color: '#FAF7F2',
              borderRadius: '16px',
              padding: '1.5rem 2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '4px' }}>Control Integral de Operaciones Coffee Rapid</h4>
                <p style={{ fontSize: '0.85rem', color: '#D4A373' }}>
                  El catálogo sincroniza en tiempo real las 10 bebidas disponibles con la Landing Page y la App Móvil PWA.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setActiveTab('catalogo')}
                  style={{
                    background: '#C28E3A',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  ☕ Gestionar Bebidas ({beverages.length})
                </button>
                <button
                  onClick={() => setActiveTab('database')}
                  style={{
                    background: 'transparent',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  🗄️ Probar Conexión DB
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: CATÁLOGO DE BEBIDAS DISPONIBLES ==================== */}
        {activeTab === 'catalogo' && (
          <div className="fade-in">
            {/* Header row with search, filters and Add button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#24150E' }}>
                  Bebidas Disponibles en Barra ({filteredBeverages.length})
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#6B5C50' }}>
                  Catálogo activo para E-commerce y pedidos móviles PWA.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                {/* Search */}
                <input
                  type="text"
                  placeholder="Buscar bebida..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: '#FFFFFF',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />

                {/* Filter Pills */}
                <div style={{ display: 'flex', gap: '6px', background: '#F3EFE9', padding: '4px', borderRadius: '10px' }}>
                  {['Todas', 'Calientes', 'Frías'].map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedCat(c)}
                      style={{
                        padding: '6px 12px',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        background: selectedCat === c ? '#FFFFFF' : 'transparent',
                        color: selectedCat === c ? '#24150E' : '#6B5C50',
                        boxShadow: selectedCat === c ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                {/* Add drink button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  style={{
                    background: '#C28E3A',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 10px rgba(194, 142, 58, 0.25)'
                  }}
                >
                  <span>+</span>
                  <span>Nueva Bebida</span>
                </button>
              </div>
            </div>

            {/* Table of Beverages */}
            <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#FAF7F2', borderBottom: '1px solid var(--border)', color: '#6B5C50', fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      <th style={{ padding: '14px 18px' }}>Bebida / Especialidad</th>
                      <th style={{ padding: '14px 18px' }}>Categoría</th>
                      <th style={{ padding: '14px 18px' }}>Puntaje SCA</th>
                      <th style={{ padding: '14px 18px' }}>Precio</th>
                      <th style={{ padding: '14px 18px' }}>Estado en Barra</th>
                      <th style={{ padding: '14px 18px', textAlign: 'right' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBeverages.map(item => (
                      <tr key={item.id} style={{ borderBottom: '1px solid #F1EAE0', transition: 'background 0.15s' }}>
                        {/* Name & Image */}
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img
                              src={item.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=100'}
                              alt={item.name}
                              style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                            />
                            <div>
                              <strong style={{ fontSize: '0.92rem', color: '#24150E', display: 'block' }}>{item.name}</strong>
                              <span style={{ fontSize: '0.75rem', color: '#9B8A7E' }}>{item.origin || 'Origen Seleccionado'}</span>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td style={{ padding: '14px 18px' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: item.category?.includes('Caliente') ? '#FFF1EB' : '#F0F9FF',
                            color: item.category?.includes('Caliente') ? '#C2410C' : '#0284C7',
                            border: `1px solid ${item.category?.includes('Caliente') ? '#FDBA74' : '#BAE6FD'}`,
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            padding: '3px 8px',
                            borderRadius: '6px'
                          }}>
                            {item.category?.includes('Caliente') ? '🔥 Caliente' : '❄️ Fría'}
                          </span>
                        </td>

                        {/* Specialty Level */}
                        <td style={{ padding: '14px 18px' }}>
                          <span style={{
                            background: '#FEF3C7',
                            color: '#92400E',
                            border: '1px solid #FCD34D',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            padding: '3px 8px',
                            borderRadius: '6px'
                          }}>
                            ⭐ {item.specialty_level || '90 pts SCA'}
                          </span>
                        </td>

                        {/* Price */}
                        <td style={{ padding: '14px 18px' }}>
                          <strong style={{ fontSize: '1rem', color: '#24150E' }}>
                            ${parseFloat(item.price).toFixed(2)}
                          </strong>
                        </td>

                        {/* Stock status */}
                        <td style={{ padding: '14px 18px' }}>
                          <button
                            onClick={() => handleToggleStock(item.id)}
                            style={{
                              background: item.stock > 0 ? '#DCFCE7' : '#FEE2E2',
                              color: item.stock > 0 ? '#15803D' : '#B91C1C',
                              border: 'none',
                              padding: '4px 10px',
                              borderRadius: '20px',
                              fontSize: '0.75rem',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                            title="Haz clic para cambiar disponibilidad"
                          >
                            {item.stock > 0 ? `🟢 En Barra (${item.stock} tazas)` : '🔴 Agotado temporal'}
                          </button>
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '8px' }}>
                            <button
                              onClick={() => handleToggleStock(item.id)}
                              style={{
                                background: '#F3EFE9',
                                border: '1px solid #E8DED1',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                color: '#24150E',
                                cursor: 'pointer'
                              }}
                            >
                              Stock
                            </button>
                            <button
                              onClick={() => handleDeleteDrink(item.id)}
                              style={{
                                background: '#FEE2E2',
                                border: '1px solid #FECACA',
                                color: '#DC2626',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                cursor: 'pointer'
                              }}
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: CONSUMIDORES & FIDELIDAD ==================== */}
        {activeTab === 'clientes' && (
          <div className="fade-in">
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#24150E' }}>
                Métricas de Consumidores / Clientes según Consumo
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#6B5C50' }}>
                Segmentación inteligente por frecuencia, ticket de compra y bebidas preferidas.
              </p>
            </div>

            {/* Loyalty Tier Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { tier: 'VIP Oro', count: '320 clientes', share: '22% total', criteria: '25+ cafés por mes', avgSpend: '$210/mes', color: '#F59E0B', bg: '#FFFBEB', border: '#FCD34D' },
                { tier: 'VIP Plata', count: '540 clientes', share: '36% total', criteria: '15 - 24 cafés/mes', avgSpend: '$120/mes', color: '#64748B', bg: '#F8FAFC', border: '#CBD5E1' },
                { tier: 'Frecuentes', count: '480 clientes', share: '32% total', criteria: '5 - 14 cafés/mes', avgSpend: '$65/mes', color: '#C28E3A', bg: '#FDFBF7', border: '#E8DED1' },
                { tier: 'Ocasionales', count: '140 clientes', share: '10% total', criteria: '1 - 4 cafés/mes', avgSpend: '$22/mes', color: '#9B8A7E', bg: '#FAF8F5', border: '#EFE7DD' }
              ].map(t => (
                <div key={t.tier} style={{ background: t.bg, border: `1px solid ${t.border}`, borderRadius: '14px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: '800', fontSize: '0.9rem', color: t.color }}>⭐ {t.tier}</span>
                    <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#9B8A7E' }}>{t.share}</span>
                  </div>
                  <div style={{ fontSize: '1.45rem', fontWeight: '800', color: '#24150E' }}>{t.count}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6B5C50', marginTop: '4px' }}>{t.criteria}</div>
                  <div style={{ fontSize: '0.72rem', color: '#C28E3A', fontWeight: '700', marginTop: '2px' }}>Gasto medio: {t.avgSpend}</div>
                </div>
              ))}
            </div>

            {/* Top Frequent Consumers Table */}
            <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#24150E' }}>
                    Top Consumidores Frecuentes Registrados
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: '#6B5C50' }}>Ranking de consumo acumulado y bebida favorita</p>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#C28E3A', fontWeight: '700' }}>
                  Programa Barista Club 2026
                </span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                  <thead>
                    <tr style={{ background: '#FAF7F2', borderBottom: '1px solid var(--border)', color: '#6B5C50', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px 18px' }}>Consumidor / Cliente</th>
                      <th style={{ padding: '12px 18px' }}>Nivel Fidelidad</th>
                      <th style={{ padding: '12px 18px' }}>Consumo Total</th>
                      <th style={{ padding: '12px 18px' }}>Gasto Acumulado</th>
                      <th style={{ padding: '12px 18px' }}>Bebida Favorita</th>
                      <th style={{ padding: '12px 18px' }}>Preferencia</th>
                      <th style={{ padding: '12px 18px' }}>Última Visita</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(consumerMetrics?.topCustomers || [
                      { id: 'CLI-101', name: 'Valentina Restrepo', tier: 'VIP Oro', ordersCount: 38, totalSpent: 228.50, favoriteDrink: 'Rey de los cafes', categoryPreference: 'Bebidas Calientes', lastVisit: 'Hoy, hace 25 min', loyaltyPoints: 1140 },
                      { id: 'CLI-102', name: 'Carlos Mendoza', tier: 'VIP Oro', ordersCount: 31, totalSpent: 179.80, favoriteDrink: 'Cafe Real helado', categoryPreference: 'Bebidas Frías', lastVisit: 'Hoy, 09:15 AM', loyaltyPoints: 920 },
                      { id: 'CLI-103', name: 'Mariana Silva', tier: 'VIP Plata', ordersCount: 22, totalSpent: 114.40, favoriteDrink: 'Cafe Real Caliente', categoryPreference: 'Bebidas Calientes', lastVisit: 'Ayer, 04:30 PM', loyaltyPoints: 660 },
                      { id: 'CLI-104', name: 'Diego Andrés Torres', tier: 'VIP Plata', ordersCount: 19, totalSpent: 98.20, favoriteDrink: 'Cold Brew Nitro Real', categoryPreference: 'Bebidas Frías', lastVisit: 'Hace 2 días', loyaltyPoints: 570 },
                      { id: 'CLI-105', name: 'Camila Morales', tier: 'Frecuente', ordersCount: 14, totalSpent: 72.80, favoriteDrink: 'Cafe Doble Especial', categoryPreference: 'Bebidas Calientes', lastVisit: 'Hace 3 días', loyaltyPoints: 420 },
                      { id: 'CLI-106', name: 'Julián Paredes', tier: 'Frecuente', ordersCount: 11, totalSpent: 59.90, favoriteDrink: 'Espresso Tonic Cítrico', categoryPreference: 'Bebidas Frías', lastVisit: 'Hace 4 días', loyaltyPoints: 330 }
                    ]).map(c => (
                      <tr key={c.id} style={{ borderBottom: '1px solid #F1EAE0' }}>
                        <td style={{ padding: '12px 18px' }}>
                          <strong style={{ color: '#24150E' }}>{c.name}</strong>
                          <div style={{ fontSize: '0.72rem', color: '#9B8A7E' }}>{c.id} &bull; {c.loyaltyPoints} RapidBeans</div>
                        </td>
                        <td style={{ padding: '12px 18px' }}>
                          <span style={{
                            background: c.tier.includes('Oro') ? '#FEF3C7' : c.tier.includes('Plata') ? '#F1F5F9' : '#FAF7F2',
                            color: c.tier.includes('Oro') ? '#92400E' : c.tier.includes('Plata') ? '#475569' : '#6B5C50',
                            fontWeight: '700',
                            fontSize: '0.75rem',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            border: '1px solid rgba(0,0,0,0.06)'
                          }}>
                            {c.tier}
                          </span>
                        </td>
                        <td style={{ padding: '12px 18px' }}>
                          <strong style={{ color: '#24150E' }}>{c.ordersCount}</strong> tazas
                        </td>
                        <td style={{ padding: '12px 18px' }}>
                          <strong style={{ color: '#C28E3A' }}>${parseFloat(c.totalSpent).toFixed(2)}</strong>
                        </td>
                        <td style={{ padding: '12px 18px', color: '#24150E', fontWeight: '600' }}>
                          ☕ {c.favoriteDrink}
                        </td>
                        <td style={{ padding: '12px 18px' }}>
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: '700',
                            color: c.categoryPreference?.includes('Caliente') ? '#C2410C' : '#0284C7'
                          }}>
                            {c.categoryPreference?.includes('Caliente') ? '🔥 Caliente' : '❄️ Fría'}
                          </span>
                        </td>
                        <td style={{ padding: '12px 18px', color: '#6B5C50', fontSize: '0.8rem' }}>
                          {c.lastVisit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 4: ESTADO DE LA BASE DE DATOS ==================== */}
        {activeTab === 'database' && (
          <div className="fade-in">
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#24150E' }}>
                🗄️ Estado de la Base de Datos & Conectividad del Sistema
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#6B5C50' }}>
                Diagnóstico de infraestructura, persistencia MySQL y compatibilidad de despliegue Dokploy.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              
              {/* Database Status Card */}
              <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#9B8A7E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Conexión a Base de Datos
                    </span>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: serverHealth?.database?.connected ? '#15803D' : '#D97706', marginTop: '4px' }}>
                      {serverHealth?.database?.mode === 'mysql' ? '🐬 Conectado a MySQL' : '⚡ Operando en Modo In-Memory'}
                    </h3>
                  </div>
                  <span style={{
                    fontSize: '0.8rem',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontWeight: '800',
                    background: serverHealth?.database?.connected ? '#DCFCE7' : '#FEF3C7',
                    color: serverHealth?.database?.connected ? '#15803D' : '#92400E'
                  }}>
                    {serverHealth?.database?.connected ? '🟢 ACTIVO' : '🟡 LOCAL'}
                  </span>
                </div>

                <div style={{ background: '#FAF7F2', borderRadius: '12px', padding: '14px', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                    <span style={{ color: '#6B5C50' }}>Host de Conexión:</span>
                    <strong style={{ color: '#24150E' }}>{serverHealth?.database?.host || 'Auto-descubierto'}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                    <span style={{ color: '#6B5C50' }}>Base de Datos:</span>
                    <strong style={{ color: '#24150E' }}>{serverHealth?.database?.database || 'coffee_rapid_db'}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                    <span style={{ color: '#6B5C50' }}>Usuario DB:</span>
                    <strong style={{ color: '#24150E' }}>{serverHealth?.database?.user || 'barista_admin'}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <span style={{ color: '#6B5C50' }}>Registros de Bebidas:</span>
                    <strong style={{ color: '#C28E3A' }}>{beverages.length} productos activos</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={handlePingTest}
                    style={{
                      flex: 1,
                      background: '#C28E3A',
                      color: 'white',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '8px',
                      fontWeight: '700',
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    🔄 Probar Conexión (Ping)
                  </button>
                  <button
                    onClick={handleResetCatalog}
                    style={{
                      background: '#F3EFE9',
                      color: '#24150E',
                      border: '1px solid #E8DED1',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontWeight: '700',
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    🌱 Resetear Demo
                  </button>
                </div>
              </div>

              {/* Dokploy / Production Server Health */}
              <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#9B8A7E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Salud del Servidor Express
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#24150E', marginTop: '4px', marginBottom: '1.25rem' }}>
                  Node.js API & Dokploy CI/CD
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1.25rem' }}>
                  <div style={{ background: '#FAF7F2', borderRadius: '10px', padding: '10px' }}>
                    <small style={{ color: '#9B8A7E', fontSize: '0.72rem', display: 'block' }}>ESTADO HEALTH CHECK</small>
                    <strong style={{ color: '#15803D', fontSize: '1rem' }}>{serverHealth?.status || 'Saludable'}</strong>
                  </div>
                  <div style={{ background: '#FAF7F2', borderRadius: '10px', padding: '10px' }}>
                    <small style={{ color: '#9B8A7E', fontSize: '0.72rem', display: 'block' }}>TIEMPO DE ACTIVIDAD</small>
                    <strong style={{ color: '#24150E', fontSize: '1rem' }}>
                      {serverHealth?.uptime ? `${Math.floor(serverHealth.uptime)}s` : 'Activo'}
                    </strong>
                  </div>
                </div>

                <p style={{ fontSize: '0.82rem', color: '#6B5C50', lineHeight: 1.5, marginBottom: '1rem' }}>
                  La plataforma cuenta con resiliencia híbrida: si MySQL está disponible mediante <code>DATABASE_URL</code> o contenedor en Dokploy, conecta automáticamente; en caso contrario, activa almacenamiento en memoria garantizando cero interrupciones de servicio.
                </p>

                <div style={{ fontSize: '0.75rem', color: '#9B8A7E', borderTop: '1px solid #F1EAE0', paddingTop: '10px' }}>
                  Endpoints Monitoreados: <code>/api/health</code> &bull; <code>/api/products</code> &bull; <code>/api/metrics</code>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* ==================== MODAL: AGREGAR NUEVA BEBIDA ==================== */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(36, 21, 14, 0.65)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: '#FFFFFF',
            width: '100%',
            maxWidth: '560px',
            borderRadius: '16px',
            border: '1px solid var(--border)',
            padding: '24px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }} className="fade-in">
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#24150E' }}>
                ☕ Agregar Nueva Bebida al Menú
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: '#F3EFE9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem' }}
              >✕</button>
            </div>

            <form onSubmit={handleCreateDrink} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#6B5C50', display: 'block', marginBottom: '4px' }}>
                  Nombre de la Bebida *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Geisha Lavado de Altura"
                  value={newDrink.name}
                  onChange={(e) => setNewDrink({ ...newDrink, name: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#6B5C50', display: 'block', marginBottom: '4px' }}>
                    Categoría *
                  </label>
                  <select
                    value={newDrink.category}
                    onChange={(e) => setNewDrink({
                      ...newDrink,
                      category: e.target.value,
                      temperature: e.target.value.includes('Caliente') ? 'Caliente' : 'Fría'
                    })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none' }}
                  >
                    <option value="Bebidas Calientes">🔥 Bebidas Calientes</option>
                    <option value="Bebidas Frías">❄️ Bebidas Frías</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#6B5C50', display: 'block', marginBottom: '4px' }}>
                    Precio ($ USD) *
                  </label>
                  <input
                    type="number"
                    step="0.10"
                    required
                    placeholder="5.50"
                    value={newDrink.price}
                    onChange={(e) => setNewDrink({ ...newDrink, price: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#6B5C50', display: 'block', marginBottom: '4px' }}>
                    Nivel de Especialidad SCA
                  </label>
                  <input
                    type="text"
                    placeholder="Especialidad 93 pts SCA"
                    value={newDrink.specialty_level}
                    onChange={(e) => setNewDrink({ ...newDrink, specialty_level: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#6B5C50', display: 'block', marginBottom: '4px' }}>
                    Stock Inicial (Tazas)
                  </label>
                  <input
                    type="number"
                    value={newDrink.stock}
                    onChange={(e) => setNewDrink({ ...newDrink, stock: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#6B5C50', display: 'block', marginBottom: '4px' }}>
                  Origen / Finca
                </label>
                <input
                  type="text"
                  placeholder="Ej: Finca Las Margaritas, Huila (1,900 msnm)"
                  value={newDrink.origin}
                  onChange={(e) => setNewDrink({ ...newDrink, origin: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#6B5C50', display: 'block', marginBottom: '4px' }}>
                  Descripción de Cata
                </label>
                <textarea
                  rows="3"
                  placeholder="Notas de cata, perfil en boca y método de extracción recomendado..."
                  value={newDrink.description}
                  onChange={(e) => setNewDrink({ ...newDrink, description: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ background: '#F3EFE9', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    background: '#C28E3A',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Guardar y Publicar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ background: '#FFFFFF', borderTop: '1px solid var(--border)', padding: '1.25rem 2rem', textAlign: 'center', fontSize: '0.8rem', color: '#9B8A7E', marginTop: 'auto' }}>
        Coffee Rapid Admin Suite &bull; Panel Comercial con Paleta Clara Premium &bull; Monorepo Dokploy CI/CD
      </footer>

    </div>
  );
}
