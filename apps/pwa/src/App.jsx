import React, { useState, useEffect } from 'react';

// Catálogo base de 10 bebidas de autor de Coffee Rapid
const INITIAL_MENU = [
  {
    id: 1,
    name: 'Rey de los cafes',
    category: 'Bebidas Calientes',
    temperature: 'Caliente',
    price: 6.50,
    specialtyLevel: '94 pts SCA',
    origin: 'Huila, Colombia',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80',
    description: 'Espresso doble Geisha con microespuma sedosa y velo aromático de canela de Ceilán.'
  },
  {
    id: 2,
    name: 'Cafe Real Caliente',
    category: 'Bebidas Calientes',
    temperature: 'Caliente',
    price: 5.20,
    specialtyLevel: '91 pts SCA',
    origin: 'Tarrazú, Costa Rica',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&auto=format&fit=crop&q=80',
    description: 'Doble arábica con microespuma artesanal, infusión de avellana silvestre y crema real.'
  },
  {
    id: 3,
    name: 'Cafe Real helado',
    category: 'Bebidas Frías',
    temperature: 'Fría',
    price: 5.80,
    specialtyLevel: '92 pts SCA',
    origin: 'Yirgacheffe, Etiopía',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=80',
    description: 'Cold brew en barrica de roble con leche infusionada en vainilla de Madagascar y hielo cristalino.'
  },
  {
    id: 4,
    name: 'Cafe Doble Especial',
    category: 'Bebidas Calientes',
    temperature: 'Caliente',
    price: 4.80,
    specialtyLevel: '90 pts SCA',
    origin: 'Nariño, Colombia',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500&auto=format&fit=crop&q=80',
    description: 'Doble ristretto potente calibrado a 9 bares con ratio 1:2 y crema dorada ultra espesa.'
  },
  {
    id: 5,
    name: 'Cold Brew Nitro Real',
    category: 'Bebidas Frías',
    temperature: 'Fría',
    price: 5.50,
    specialtyLevel: '89 pts SCA',
    origin: 'Nyeri AA, Kenia',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&auto=format&fit=crop&q=80',
    description: 'Extracción en frío infusionada con nitrógeno puro: cascada sedosa sin azúcar añadida.'
  },
  {
    id: 6,
    name: 'Caramel Velvet Macchiato',
    category: 'Bebidas Calientes',
    temperature: 'Caliente',
    price: 5.40,
    specialtyLevel: '88 pts SCA',
    origin: 'Antigua, Guatemala',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=500&auto=format&fit=crop&q=80',
    description: 'Capas de leche dulce texturizada, espresso vertido y sirope de caramelo salado casero.'
  },
  {
    id: 7,
    name: 'Mocha Suizo Blanco',
    category: 'Bebidas Calientes',
    temperature: 'Caliente',
    price: 5.60,
    specialtyLevel: '89 pts SCA',
    origin: 'Huila, Colombia',
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=500&auto=format&fit=crop&q=80',
    description: 'Chocolate blanco suizo fundido, espresso de especialidad y crema chantilly con nibs.'
  },
  {
    id: 8,
    name: 'Frappé Real Avellana & Cacao',
    category: 'Bebidas Frías',
    temperature: 'Fría',
    price: 5.90,
    specialtyLevel: '88 pts SCA',
    origin: 'Cerrado, Brasil',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=80',
    description: 'Frappé helado de espresso, pasta de avellanas del Piamonte y virutas de cacao oscuro.'
  },
  {
    id: 9,
    name: 'Espresso Tonic Cítrico',
    category: 'Bebidas Frías',
    temperature: 'Fría',
    price: 5.10,
    specialtyLevel: '93 pts SCA',
    origin: 'Guji, Etiopía',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500&auto=format&fit=crop&q=80',
    description: 'Espresso etíope floral en suspensión sobre agua tónica botánica y pomelo rosado.'
  },
  {
    id: 10,
    name: 'Flat White Origen Único',
    category: 'Bebidas Calientes',
    temperature: 'Caliente',
    price: 4.90,
    specialtyLevel: '92 pts SCA',
    origin: 'Ruanda Bourbon',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=500&auto=format&fit=crop&q=80',
    description: 'Doble ristretto con microespuma ultrafina brillante y equilibrio frutal inmaculado.'
  }
];

export default function App() {
  // PWA & Connectivity state
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // App Tabs: 'menu' | 'ofertas' | 'ordenes' | 'perfil'
  const [activeTab, setActiveTab] = useState('menu');

  // Menu filters & search
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart & Orders simulation
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [notification, setNotification] = useState(null);

  // Modal Customization
  const [customizingItem, setCustomizingItem] = useState(null);
  const [customSize, setCustomSize] = useState('Mediano (12 oz)');
  const [customMilk, setCustomMilk] = useState('Leche Entera de Granja');
  const [customSweetness, setCustomSweetness] = useState('Sin azúcar (Recomendado SCA)');

  // Orders list
  const [orders, setOrders] = useState([
    {
      id: 'CR-8921',
      date: 'Hoy, hace 15 min',
      items: [
        { name: 'Rey de los cafes', size: 'Mediano (12 oz)', milk: 'Leche de Granja', qty: 1, price: 6.50 }
      ],
      total: 6.50,
      status: 'Listo en Barra',
      statusStep: 3, // 1: Recibido, 2: Preparando, 3: Listo
      pickupType: 'Retiro en Barra Express'
    },
    {
      id: 'CR-8910',
      date: 'Ayer, 04:30 PM',
      items: [
        { name: 'Cafe Real helado', size: 'Grande (16 oz)', milk: 'Avena Barista', qty: 1, price: 6.60 },
        { name: 'Cafe Doble Especial', size: 'Mediano (12 oz)', milk: 'Sin leche', qty: 1, price: 4.80 }
      ],
      total: 11.40,
      status: 'Entregado',
      statusStep: 3,
      pickupType: 'Mesa #4'
    }
  ]);

  // Handle Online/Offline and PWA Install
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
    };
  }, []);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert('Para instalar Coffee Rapid PWA: En tu navegador presiona el botón de compartir o menú y selecciona "Instalar aplicación" o "Agregar a pantalla de inicio".');
      return;
    }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  // Open customization drawer for product
  const handleOpenCustomize = (product) => {
    setCustomizingItem(product);
    setCustomSize('Mediano (12 oz)');
    setCustomMilk('Leche Entera de Granja');
    setCustomSweetness('Sin azúcar (Recomendado SCA)');
  };

  // Add customized item to cart
  const handleAddToCart = () => {
    if (!customizingItem) return;

    let sizePriceAdjustment = 0;
    if (customSize.includes('Grande')) sizePriceAdjustment = 0.80;
    if (customSize.includes('Chico')) sizePriceAdjustment = -0.50;

    let milkPriceAdjustment = 0;
    if (customMilk.includes('Avena') || customMilk.includes('Almendras')) milkPriceAdjustment = 0.60;

    const finalItemPrice = Math.max(2.0, customizingItem.price + sizePriceAdjustment + milkPriceAdjustment);

    const cartItem = {
      cartId: `${customizingItem.id}-${Date.now()}`,
      id: customizingItem.id,
      name: customizingItem.name,
      basePrice: customizingItem.price,
      price: finalItemPrice,
      size: customSize,
      milk: customMilk,
      sweetness: customSweetness,
      quantity: 1,
      image: customizingItem.image,
      category: customizingItem.category
    };

    setCart(prev => [...prev, cartItem]);
    setCustomizingItem(null);
    showNotification(`☕ ${customizingItem.name} añadido a tu orden`);
  };

  // Update item quantity in cart
  const updateQuantity = (cartId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  // Cart calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = appliedCoupon ? (cartSubtotal * appliedCoupon.discount) : 0;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Apply Coupon
  const applyCouponCode = (code, discount, label) => {
    setAppliedCoupon({ code, discount, label });
    showNotification(`🏷️ Cupón aplicado: ${label}`);
  };

  // Simulate Purchase Confirmation
  const handleConfirmOrder = async (pickupType = 'Retiro en Barra Express') => {
    if (cart.length === 0) return;

    const newOrderId = `CR-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: newOrderId,
      date: 'Ahora mismo',
      items: cart.map(i => ({
        name: i.name,
        size: i.size,
        milk: i.milk,
        qty: i.quantity,
        price: i.price
      })),
      total: cartTotal,
      status: 'Molienda & Barista',
      statusStep: 2,
      pickupType: pickupType
    };

    // Save locally
    setOrders(prev => [newOrder, ...prev]);

    // Send to backend API asynchronously if available
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: 'Pablo Valdivia (PWA Mobile)',
          items: cart.map(i => `${i.name} (${i.size}) x${i.quantity}`),
          total: cartTotal,
          pickupType: pickupType
        })
      });
    } catch (err) {
      console.log('Simulación en modo local:', err.message);
    }

    // Clear cart and navigate to orders tab
    setCart([]);
    setIsCartOpen(false);
    setActiveTab('ordenes');
    showNotification(`🎉 ¡Compra simulada con éxito! Orden ${newOrderId} en preparación.`);
  };

  // Filtered menu list
  const filteredMenu = INITIAL_MENU.filter(item => {
    const matchesCategory =
      selectedCategory === 'Todas' ||
      (selectedCategory === 'Calientes' && item.category === 'Bebidas Calientes') ||
      (selectedCategory === 'Frías' && item.category === 'Bebidas Frías') ||
      (selectedCategory === 'Especialidad' && parseInt(item.specialtyLevel) >= 91);

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.origin.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      
      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#2C1810',
          color: '#FAF7F2',
          padding: '10px 18px',
          borderRadius: '9999px',
          fontSize: '0.85rem',
          fontWeight: '600',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          border: '1px solid #C28E3A',
          maxWidth: '90%',
          textAlign: 'center'
        }} className="fade-in">
          {notification}
        </div>
      )}

      {/* Top Mobile Status Header */}
      <header style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E8DED1',
        padding: '12px 18px',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: '#C28E3A',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            fontSize: '1.1rem'
          }}>☕</div>
          <div>
            <h1 style={{ fontSize: '1rem', fontWeight: '800', color: '#2C1810', lineHeight: 1.1 }}>Coffee Rapid</h1>
            <div style={{ fontSize: '0.68rem', color: '#76685E', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>📍 Barra Central Roastery</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Online badge */}
          <span style={{
            fontSize: '0.7rem',
            padding: '3px 8px',
            borderRadius: '10px',
            fontWeight: '700',
            background: isOnline ? 'rgba(22, 163, 74, 0.12)' : 'rgba(220, 38, 38, 0.12)',
            color: isOnline ? '#15803D' : '#B91C1C'
          }}>
            {isOnline ? '🟢 Online' : '🔴 Offline'}
          </span>

          {/* Cart Icon trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              background: '#F4EEE5',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            🛒
            {totalItemsCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#C28E3A',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: '800',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}>
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Tab Views */}
      <main style={{ flex: 1, padding: '16px 16px 110px 16px', overflowY: 'auto' }}>
        
        {/* ==================== TAB 1: MENÚ ==================== */}
        {activeTab === 'menu' && (
          <div className="fade-in">
            {/* Search Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#FFFFFF',
              border: '1px solid #E8DED1',
              borderRadius: '12px',
              padding: '8px 14px',
              marginBottom: '14px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
            }}>
              <span style={{ marginRight: '8px', color: '#A19184' }}>🔍</span>
              <input
                type="text"
                placeholder="Buscar bebidas, orígenes, notas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  width: '100%',
                  fontSize: '0.88rem',
                  color: '#2C1810'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ border: 'none', background: 'transparent', color: '#A19184', cursor: 'pointer', fontSize: '0.8rem' }}
                >✕</button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '12px' }}>
              {[
                { id: 'Todas', label: '☕ Todas (10)' },
                { id: 'Calientes', label: '🔥 Calientes (6)' },
                { id: 'Frías', label: '❄️ Frías (4)' },
                { id: 'Especialidad', label: '⭐ +91 pts SCA' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    whiteSpace: 'nowrap',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    border: '1px solid',
                    borderColor: selectedCategory === cat.id ? '#2C1810' : '#E8DED1',
                    background: selectedCategory === cat.id ? '#2C1810' : '#FFFFFF',
                    color: selectedCategory === cat.id ? '#FFFFFF' : '#726256',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Menu Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredMenu.map(coffee => (
                <div
                  key={coffee.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E8DED1',
                    padding: '12px',
                    display: 'flex',
                    gap: '14px',
                    boxShadow: '0 2px 8px rgba(44, 24, 16, 0.04)',
                    alignItems: 'center',
                    transition: 'transform 0.2s'
                  }}
                >
                  {/* Thumbnail Image with Temperature Badge */}
                  <div style={{ position: 'relative', width: '90px', height: '90px', flexShrink: 0, borderRadius: '12px', overflow: 'hidden' }}>
                    <img
                      src={coffee.image}
                      alt={coffee.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span style={{
                      position: 'absolute',
                      top: '4px',
                      left: '4px',
                      fontSize: '0.65rem',
                      fontWeight: '800',
                      padding: '2px 6px',
                      borderRadius: '8px',
                      background: coffee.temperature === 'Caliente' ? 'rgba(255,241,235,0.92)' : 'rgba(240,249,255,0.92)',
                      color: coffee.temperature === 'Caliente' ? '#C2410C' : '#0284C7'
                    }}>
                      {coffee.temperature === 'Caliente' ? '🔥' : '❄️'}
                    </span>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#2C1810', marginBottom: '2px', lineHeight: 1.2 }}>
                        {coffee.name}
                      </h3>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span style={{
                        background: '#FEF3C7',
                        color: '#92400E',
                        fontSize: '0.68rem',
                        fontWeight: '700',
                        padding: '1px 6px',
                        borderRadius: '6px'
                      }}>
                        ⭐ {coffee.specialtyLevel}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#A19184' }}>{coffee.origin}</span>
                    </div>

                    <p style={{
                      fontSize: '0.78rem',
                      color: '#726256',
                      lineHeight: 1.35,
                      marginBottom: '8px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {coffee.description}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#C28E3A' }}>
                        ${coffee.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleOpenCustomize(coffee)}
                        style={{
                          background: '#2C1810',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '6px 14px',
                          borderRadius: '20px',
                          fontSize: '0.78rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          boxShadow: '0 2px 6px rgba(44, 24, 16, 0.15)'
                        }}
                      >
                        <span>Personalizar</span>
                        <span>+</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 2: OFERTAS ==================== */}
        {activeTab === 'ofertas' && (
          <div className="fade-in">
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#2C1810', marginBottom: '4px' }}>
                🏷️ Promociones & Ofertas
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#726256' }}>
                Beneficios exclusivos para miembros de la comunidad Coffee Rapid.
              </p>
            </div>

            {/* Promo 1: 2x1 */}
            <div style={{
              background: 'linear-gradient(135deg, #FFF9ED 0%, #FFFFFF 100%)',
              border: '1px solid #FCD34D',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '14px',
              boxShadow: '0 4px 12px rgba(194, 142, 58, 0.08)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span style={{ background: '#F59E0B', color: 'white', fontSize: '0.7rem', fontWeight: '800', padding: '3px 8px', borderRadius: '8px' }}>
                  PROMO DEL DÍA
                </span>
                <span style={{ fontSize: '1.2rem' }}>❄️☕</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#2C1810', marginBottom: '4px' }}>
                2x1 en Café Real Helado
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#726256', marginBottom: '12px' }}>
                Lleva dos cold brews con vainilla de Madagascar reposados en roble por el precio de uno.
              </p>
              <button
                onClick={() => {
                  const item = INITIAL_MENU.find(i => i.id === 3);
                  if (item) {
                    setCart(prev => [
                      ...prev,
                      {
                        cartId: `promo-2x1-${Date.now()}`,
                        id: 3,
                        name: '2x1 Café Real Helado',
                        basePrice: 5.80,
                        price: 5.80,
                        size: 'Mediano (12 oz) [2 unidades]',
                        milk: 'Leche Vainilla Real',
                        sweetness: 'Recomendado',
                        quantity: 1,
                        image: item.image,
                        category: item.category
                      }
                    ]);
                    showNotification('🎉 ¡Promo 2x1 agregada a tu orden!');
                  }
                }}
                style={{
                  background: '#C28E3A',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                ☕ Agregar Promo 2x1 ($5.80)
              </button>
            </div>

            {/* Promo 2: Combo Barista */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E8DED1',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '14px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ background: '#DCFCE7', color: '#15803D', fontSize: '0.7rem', fontWeight: '800', padding: '3px 8px', borderRadius: '8px' }}>
                  COMBO DESAYUNO
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#15803D' }}>Ahorras $2.20</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#2C1810', marginBottom: '4px' }}>
                Rey de los cafes + Croissant Francés
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#726256', marginBottom: '12px' }}>
                Espresso Geisha 94 pts con leche sedosa acompañado de un croissant hojaldrado horneado hoy.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', textDecoration: 'line-through', color: '#A19184', marginRight: '6px' }}>$10.10</span>
                  <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#2C1810' }}>$7.90</span>
                </div>
                <button
                  onClick={() => {
                    const item = INITIAL_MENU.find(i => i.id === 1);
                    setCart(prev => [
                      ...prev,
                      {
                        cartId: `combo-${Date.now()}`,
                        id: 1,
                        name: 'Combo Rey de los cafes + Croissant',
                        basePrice: 7.90,
                        price: 7.90,
                        size: 'Mediano (12 oz)',
                        milk: 'Leche de Granja',
                        sweetness: 'Sin azúcar',
                        quantity: 1,
                        image: item?.image || '',
                        category: 'Combo'
                      }
                    ]);
                    showNotification('🥐 Combo Barista agregado al carrito');
                  }}
                  style={{
                    background: '#2C1810',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Agregar Combo
                </button>
              </div>
            </div>

            {/* Coupon Card */}
            <div style={{
              background: '#FDFBF7',
              border: '2px dashed #C28E3A',
              borderRadius: '16px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '4px' }}>🎟️</span>
              <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#2C1810', marginBottom: '4px' }}>
                Cupón: BIENVENIDA20
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#726256', marginBottom: '12px' }}>
                Obtén 20% de descuento en el total de tu orden de bebidas de especialidad.
              </p>
              <button
                onClick={() => applyCouponCode('BIENVENIDA20', 0.20, '20% OFF Bienvenida')}
                style={{
                  background: appliedCoupon?.code === 'BIENVENIDA20' ? '#15803D' : '#C28E3A',
                  color: 'white',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                {appliedCoupon?.code === 'BIENVENIDA20' ? '✅ Cupón Activado' : 'Aplicar Cupón al Carrito'}
              </button>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: ÓRDENES ==================== */}
        {activeTab === 'ordenes' && (
          <div className="fade-in">
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#2C1810', marginBottom: '4px' }}>
                🧾 Mis Órdenes
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#726256' }}>
                Seguimiento en tiempo real y simulación de preparación en barra.
              </p>
            </div>

            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E8DED1' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '8px' }}>☕</span>
                <p style={{ fontWeight: '700', color: '#2C1810', marginBottom: '8px' }}>No tienes órdenes activas</p>
                <button
                  onClick={() => setActiveTab('menu')}
                  style={{
                    background: '#C28E3A',
                    color: 'white',
                    border: 'none',
                    padding: '8px 18px',
                    borderRadius: '20px',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Ir al Menú y Pedir
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {orders.map((ord, idx) => (
                  <div
                    key={ord.id}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '16px',
                      border: idx === 0 ? '2px solid #C28E3A' : '1px solid #E8DED1',
                      padding: '16px',
                      boxShadow: idx === 0 ? '0 6px 18px rgba(194, 142, 58, 0.12)' : '0 2px 6px rgba(0,0,0,0.03)'
                    }}
                  >
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <div>
                        <span style={{ fontWeight: '800', color: '#2C1810', fontSize: '0.95rem' }}>{ord.id}</span>
                        <span style={{ fontSize: '0.75rem', color: '#A19184', marginLeft: '8px' }}>{ord.date}</span>
                      </div>
                      <span style={{
                        background: ord.status.includes('Listo') ? '#DCFCE7' : '#FEF3C7',
                        color: ord.status.includes('Listo') ? '#15803D' : '#92400E',
                        fontSize: '0.72rem',
                        fontWeight: '800',
                        padding: '3px 8px',
                        borderRadius: '8px'
                      }}>
                        {ord.status}
                      </span>
                    </div>

                    {/* Preparation Stepper Timeline */}
                    <div style={{
                      background: '#FAF7F2',
                      borderRadius: '10px',
                      padding: '10px',
                      marginBottom: '12px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                        {[
                          { step: 1, label: 'Recibido' },
                          { step: 2, label: 'Molienda & Barista' },
                          { step: 3, label: 'Listo en Barra' }
                        ].map(st => {
                          const isDone = (ord.statusStep || 2) >= st.step;
                          return (
                            <div key={st.step} style={{ textAlign: 'center', flex: 1 }}>
                              <div style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                background: isDone ? '#C28E3A' : '#E8DED1',
                                color: 'white',
                                fontSize: '0.7rem',
                                fontWeight: '800',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 4px'
                              }}>
                                {isDone ? '✓' : st.step}
                              </div>
                              <span style={{ fontSize: '0.68rem', fontWeight: isDone ? '700' : '500', color: isDone ? '#2C1810' : '#A19184' }}>
                                {st.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Items List */}
                    <div style={{ borderTop: '1px solid #F1EAE0', paddingTop: '10px', marginBottom: '10px' }}>
                      {ord.items.map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                          <span style={{ color: '#2C1810' }}>
                            <strong>{item.qty || 1}x</strong> {item.name} <small style={{ color: '#A19184' }}>({item.size || ''})</small>
                          </span>
                          <span style={{ fontWeight: '700', color: '#726256' }}>
                            ${((item.price || 5.0) * (item.qty || 1)).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1EAE0', paddingTop: '8px' }}>
                      <span style={{ fontSize: '0.75rem', color: '#726256' }}>
                        📍 {ord.pickupType}
                      </span>
                      <div>
                        <span style={{ fontSize: '0.8rem', color: '#A19184', marginRight: '6px' }}>Total Pagado:</span>
                        <strong style={{ fontSize: '1rem', color: '#C28E3A' }}>${ord.total.toFixed(2)}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 4: PERFIL ==================== */}
        {activeTab === 'perfil' && (
          <div className="fade-in">
            {/* User Profile Card */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E8DED1',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 4px 14px rgba(44, 24, 16, 0.05)',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                background: '#FAF7F2',
                border: '3px solid #C28E3A',
                margin: '0 auto 12px',
                overflow: 'hidden'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                  alt="Perfil Barista Club"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#2C1810', marginBottom: '2px' }}>
                Valentina Restrepo
              </h2>
              <span style={{
                display: 'inline-block',
                background: '#FEF3C7',
                color: '#92400E',
                fontSize: '0.75rem',
                fontWeight: '800',
                padding: '3px 10px',
                borderRadius: '12px',
                marginBottom: '14px'
              }}>
                ⭐ MIEMBRO VIP ORO &bull; BARISTA CLUB
              </span>

              {/* Loyalty points card */}
              <div style={{
                background: 'linear-gradient(135deg, #2C1810 0%, #3D2214 100%)',
                color: '#FAF7F2',
                borderRadius: '14px',
                padding: '16px',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#D4A373', fontWeight: '700', textTransform: 'uppercase' }}>
                    Saldo RapidBeans
                  </span>
                  <span style={{ fontSize: '1.2rem' }}>☕✨</span>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '6px' }}>
                  1,140 <small style={{ fontSize: '0.85rem', fontWeight: '500', color: '#D4A373' }}>pts</small>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.15)', height: '6px', borderRadius: '4px', overflow: 'hidden', marginBottom: '6px' }}>
                  <div style={{ width: '85%', height: '100%', background: '#C28E3A' }}></div>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#D6CBC2' }}>
                  ¡Solo 60 pts más para tu próximo <strong>Rey de los cafes</strong> de cortesía!
                </span>
              </div>
            </div>

            {/* Preferences & Navigation Links */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E8DED1', padding: '8px', marginBottom: '16px' }}>
              <div style={{ padding: '10px 14px', borderBottom: '1px solid #F1EAE0', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', color: '#726256' }}>Bebida predilecta</span>
                <strong style={{ fontSize: '0.85rem', color: '#2C1810' }}>Rey de los cafes</strong>
              </div>
              <div style={{ padding: '10px 14px', borderBottom: '1px solid #F1EAE0', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', color: '#726256' }}>Leche favorita</span>
                <strong style={{ fontSize: '0.85rem', color: '#2C1810' }}>Leche de Granja</strong>
              </div>
              <div style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', color: '#726256' }}>Método de pago</span>
                <strong style={{ fontSize: '0.85rem', color: '#2C1810' }}>Apple Pay (•••• 4242)</strong>
              </div>
            </div>

            {/* Quick links to Web & Admin */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: '#FFFFFF',
                  border: '1px solid #E8DED1',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: '#2C1810',
                  fontSize: '0.88rem',
                  fontWeight: '600'
                }}
              >
                <span>🌐 Ir a la Landing Page E-commerce</span>
                <span>→</span>
              </a>
              <a
                href="/admin"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: '#FFFFFF',
                  border: '1px solid #E8DED1',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: '#2C1810',
                  fontSize: '0.88rem',
                  fontWeight: '600'
                }}
              >
                <span>⚙️ Abrir Panel Administrativo & Métricas</span>
                <span>→</span>
              </a>

              {deferredPrompt && (
                <button
                  onClick={handleInstallClick}
                  style={{
                    marginTop: '8px',
                    background: '#C28E3A',
                    color: 'white',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '0.88rem',
                    cursor: 'pointer'
                  }}
                >
                  📲 Instalar PWA en Pantalla de Inicio
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Floating Cart Bar (Visible if cart has items and not on cart modal) */}
      {cart.length > 0 && !isCartOpen && (
        <div style={{
          position: 'fixed',
          bottom: '72px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: '428px',
          background: '#2C1810',
          color: '#FAF7F2',
          padding: '12px 18px',
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 10px 25px rgba(44, 24, 16, 0.25)',
          zIndex: 45
        }} className="fade-in">
          <div>
            <div style={{ fontSize: '0.75rem', color: '#D4A373', fontWeight: '700' }}>
              {totalItemsCount} {totalItemsCount === 1 ? 'bebida seleccionada' : 'bebidas seleccionadas'}
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: '800' }}>
              ${cartTotal.toFixed(2)}
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              background: '#C28E3A',
              color: 'white',
              border: 'none',
              padding: '8px 18px',
              borderRadius: '20px',
              fontWeight: '700',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Ver Orden</span>
            <span>→</span>
          </button>
        </div>
      )}

      {/* ==================== BOTTOM NAVIGATION TABS ==================== */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '460px',
        background: '#FFFFFF',
        borderTop: '1px solid #E8DED1',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '8px 6px calc(8px + env(safe-area-inset-bottom, 0px))',
        zIndex: 50,
        boxShadow: '0 -4px 16px rgba(44, 24, 16, 0.05)'
      }}>
        {[
          { id: 'menu', label: 'Menú', icon: '☕' },
          { id: 'ofertas', label: 'Ofertas', icon: '🏷️' },
          { id: 'ordenes', label: 'Órdenes', icon: '🧾', badge: orders.length > 0 ? orders[0].status : null },
          { id: 'perfil', label: 'Perfil', icon: '👤' }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'transparent',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px 12px',
                borderRadius: '12px',
                cursor: 'pointer',
                position: 'relative',
                color: isActive ? '#C28E3A' : '#76685E',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{ fontSize: '1.25rem', marginBottom: '2px' }}>{tab.icon}</span>
              <span style={{ fontSize: '0.72rem', fontWeight: isActive ? '800' : '600' }}>
                {tab.label}
              </span>

              {tab.id === 'ordenes' && orders.length > 0 && orders[0].status.includes('Molienda') && (
                <span style={{
                  position: 'absolute',
                  top: '2px',
                  right: '12px',
                  width: '8px',
                  height: '8px',
                  background: '#D97706',
                  borderRadius: '50%'
                }}></span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ==================== CUSTOMIZE PRODUCT MODAL ==================== */}
      {customizingItem && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(36, 22, 15, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#FFFFFF',
            width: '100%',
            maxWidth: '460px',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            padding: '24px 20px',
            maxHeight: '85vh',
            overflowY: 'auto'
          }} className="slide-up">
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#2C1810' }}>{customizingItem.name}</h3>
                <span style={{ fontSize: '0.75rem', color: '#C28E3A', fontWeight: '700' }}>⭐ {customizingItem.specialtyLevel}</span>
              </div>
              <button
                onClick={() => setCustomizingItem(null)}
                style={{ background: '#F4EEE5', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem' }}
              >✕</button>
            </div>

            {/* Size Options */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#726256', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                Tamaño de Vaso:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {[
                  { label: 'Chico (8 oz)', delta: '-$0.50' },
                  { label: 'Mediano (12 oz)', delta: 'Base' },
                  { label: 'Grande (16 oz)', delta: '+$0.80' }
                ].map(sz => (
                  <button
                    key={sz.label}
                    onClick={() => setCustomSize(sz.label)}
                    style={{
                      padding: '10px 6px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      border: '1px solid',
                      borderColor: customSize === sz.label ? '#C28E3A' : '#E8DED1',
                      background: customSize === sz.label ? '#FFF9ED' : '#FFFFFF',
                      color: customSize === sz.label ? '#A67528' : '#2C1810',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div>{sz.label.split(' ')[0]}</div>
                    <small style={{ fontSize: '0.68rem', color: '#A19184' }}>{sz.delta}</small>
                  </button>
                ))}
              </div>
            </div>

            {/* Milk Options */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#726256', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                Tipo de Leche / Base:
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { label: 'Leche Entera de Granja', extra: 'Incluida' },
                  { label: 'Leche de Avena Barista Edition', extra: '+$0.60' },
                  { label: 'Leche de Almendras Artesanal', extra: '+$0.60' },
                  { label: 'Sin leche (Solo Café de Especialidad)', extra: 'Sin costo' }
                ].map(m => (
                  <button
                    key={m.label}
                    onClick={() => setCustomMilk(m.label)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      fontSize: '0.82rem',
                      fontWeight: '600',
                      border: '1px solid',
                      borderColor: customMilk === m.label ? '#C28E3A' : '#F1EAE0',
                      background: customMilk === m.label ? '#FFF9ED' : '#FFFFFF',
                      color: '#2C1810',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{m.label}</span>
                    <span style={{ fontSize: '0.75rem', color: '#C28E3A', fontWeight: '700' }}>{m.extra}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sweetness */}
            <div style={{ marginBottom: '22px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#726256', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                Nivel de Dulzor:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {[
                  'Sin azúcar (Recomendado SCA)',
                  'Azúcar Mascabado (1 shot)',
                  'Miel Pura de Finca',
                  'Caramelo Artesanal (+ $0.40)'
                ].map(sw => (
                  <button
                    key={sw}
                    onClick={() => setCustomSweetness(sw)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '10px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      border: '1px solid',
                      borderColor: customSweetness === sw ? '#C28E3A' : '#E8DED1',
                      background: customSweetness === sw ? '#FFF9ED' : '#FFFFFF',
                      color: customSweetness === sw ? '#A67528' : '#726256',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    {sw}
                  </button>
                ))}
              </div>
            </div>

            {/* Action button */}
            <button
              onClick={handleAddToCart}
              style={{
                width: '100%',
                background: '#2C1810',
                color: 'white',
                border: 'none',
                padding: '14px',
                borderRadius: '16px',
                fontSize: '0.95rem',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(44, 24, 16, 0.2)'
              }}
            >
              ☕ Agregar a la Orden
            </button>
          </div>
        </div>
      )}

      {/* ==================== CART & SIMULATED CHECKOUT DRAWER ==================== */}
      {isCartOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(36, 22, 15, 0.65)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#FFFFFF',
            width: '100%',
            maxWidth: '460px',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            padding: '24px 20px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column'
          }} className="slide-up">
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#2C1810' }}>Tu Orden Actual</h3>
                <span style={{ fontSize: '0.75rem', color: '#726256' }}>Simulación de compra Coffee Rapid</span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{ background: '#F4EEE5', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem' }}
              >✕</button>
            </div>

            {/* Cart Items List */}
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px', paddingRight: '4px' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px 10px', color: '#726256' }}>
                  <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '8px' }}>🛒</span>
                  <p style={{ fontWeight: '700' }}>El carrito está vacío</p>
                  <small>Agrega tus bebidas favoritas desde la pestaña Menú.</small>
                </div>
              ) : (
                cart.map(item => (
                  <div
                    key={item.cartId}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 0',
                      borderBottom: '1px solid #F1EAE0'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#2C1810' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#A19184' }}>
                        {item.size} &bull; {item.milk}
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#C28E3A', marginTop: '2px' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FAF7F2', borderRadius: '20px', padding: '4px 8px' }}>
                      <button
                        onClick={() => updateQuantity(item.cartId, -1)}
                        style={{ border: 'none', background: 'transparent', fontWeight: '800', fontSize: '0.9rem', color: '#726256', cursor: 'pointer', width: '20px' }}
                      >-</button>
                      <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#2C1810' }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartId, 1)}
                        style={{ border: 'none', background: 'transparent', fontWeight: '800', fontSize: '0.9rem', color: '#726256', cursor: 'pointer', width: '20px' }}
                      >+</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Calculations & Order details */}
            {cart.length > 0 && (
              <div>
                {/* Coupon badge if applied */}
                {appliedCoupon && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    background: '#DCFCE7',
                    color: '#15803D',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    marginBottom: '10px'
                  }}>
                    <span>🎟️ {appliedCoupon.label}</span>
                    <span>- ${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                {/* Totals */}
                <div style={{ background: '#FAF7F2', borderRadius: '12px', padding: '12px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#726256', marginBottom: '4px' }}>
                    <span>Subtotal:</span>
                    <span>${cartSubtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#15803D', marginBottom: '4px' }}>
                      <span>Descuento aplicado:</span>
                      <span>- ${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: '800', color: '#2C1810', borderTop: '1px solid #E8DED1', paddingTop: '6px', marginTop: '4px' }}>
                    <span>Total a Pagar:</span>
                    <span style={{ color: '#C28E3A' }}>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Confirm Button */}
                <button
                  onClick={() => handleConfirmOrder('Retiro en Barra Express')}
                  style={{
                    width: '100%',
                    background: '#C28E3A',
                    color: 'white',
                    border: 'none',
                    padding: '14px',
                    borderRadius: '16px',
                    fontSize: '0.95rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(194, 142, 58, 0.3)',
                    marginBottom: '8px'
                  }}
                >
                  🚀 Confirmar y Simular Compra (${cartTotal.toFixed(2)})
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
