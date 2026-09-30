import React, { useState, useEffect } from 'react';

// Catálogo base de 10 bebidas de autor de Coffee Rapid (Edición Dark Premium)
const INITIAL_MENU = [
  {
    id: 1,
    name: 'Rey de los cafes',
    category: 'Bebidas Calientes',
    temperature: 'Caliente',
    price: 6.50,
    specialtyLevel: '94 pts SCA',
    rating: '4.9',
    origin: 'Huila, Colombia',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80',
    composition: '40% Doble Geisha, 60% Leche sedosa',
    description: 'Espresso doble Geisha con microespuma sedosa y velo aromático de canela de Ceilán.'
  },
  {
    id: 2,
    name: 'Cafe Real Caliente',
    category: 'Bebidas Calientes',
    temperature: 'Caliente',
    price: 5.20,
    specialtyLevel: '91 pts SCA',
    rating: '4.8',
    origin: 'Tarrazú, Costa Rica',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&auto=format&fit=crop&q=80',
    composition: '35% Ristretto, 65% Crema real avellana',
    description: 'Doble arábica con microespuma artesanal, infusión de avellana silvestre y crema real.'
  },
  {
    id: 3,
    name: 'Cafe Real helado',
    category: 'Bebidas Frías',
    temperature: 'Fría',
    price: 5.80,
    specialtyLevel: '92 pts SCA',
    rating: '5.0',
    origin: 'Yirgacheffe, Etiopía',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=80',
    composition: '50% Cold Brew Oak-Aged, 50% Leche Vainilla',
    description: 'Cold brew en barrica de roble con vainilla de Madagascar y hielo cristalino.'
  },
  {
    id: 4,
    name: 'Cafe Doble Especial',
    category: 'Bebidas Calientes',
    temperature: 'Caliente',
    price: 4.80,
    specialtyLevel: '90 pts SCA',
    rating: '4.7',
    origin: 'Nariño, Colombia',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500&auto=format&fit=crop&q=80',
    composition: '100% Extracción Ristretto a 9 Bares',
    description: 'Doble ristretto potente calibrado a 9 bares con ratio 1:2 y crema espesa dorada.'
  },
  {
    id: 5,
    name: 'Cold Brew Nitro Real',
    category: 'Bebidas Frías',
    temperature: 'Fría',
    price: 5.50,
    specialtyLevel: '89 pts SCA',
    rating: '4.9',
    origin: 'Nyeri AA, Kenia',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&auto=format&fit=crop&q=80',
    composition: 'Infusión en frío con nitrógeno puro N2',
    description: 'Extracción fría infusionada con nitrógeno puro: textura aterciopelada tipo cascada.'
  },
  {
    id: 6,
    name: 'Caramel Velvet Macchiato',
    category: 'Bebidas Calientes',
    temperature: 'Caliente',
    price: 5.40,
    specialtyLevel: '88 pts SCA',
    rating: '4.8',
    origin: 'Antigua, Guatemala',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=500&auto=format&fit=crop&q=80',
    composition: '25% Espresso, 70% Leche, 5% Caramelo salado',
    description: 'Capas de leche vaporizada dulce, shot de espresso y sirope de caramelo salado casero.'
  },
  {
    id: 7,
    name: 'Mocha Suizo Blanco',
    category: 'Bebidas Calientes',
    temperature: 'Caliente',
    price: 5.60,
    specialtyLevel: '89 pts SCA',
    rating: '4.8',
    origin: 'Huila, Colombia',
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=500&auto=format&fit=crop&q=80',
    composition: 'Ganache de chocolate blanco suizo & espresso',
    description: 'Ganache de chocolate blanco suizo con espresso recién extraído y leche texturizada.'
  },
  {
    id: 8,
    name: 'Frappé Real Avellana & Cacao',
    category: 'Bebidas Frías',
    temperature: 'Fría',
    price: 5.90,
    specialtyLevel: '88 pts SCA',
    rating: '4.9',
    origin: 'Cerrado, Brasil',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=80',
    composition: 'Doble espresso frappé con avellana y chantilly',
    description: 'Frappé helado de doble espresso, pasta de avellanas del Piamonte y virutas de cacao.'
  },
  {
    id: 9,
    name: 'Espresso Tonic Cítrico',
    category: 'Bebidas Frías',
    temperature: 'Fría',
    price: 5.10,
    specialtyLevel: '93 pts SCA',
    rating: '4.9',
    origin: 'Guji, Etiopía',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500&auto=format&fit=crop&q=80',
    composition: '35% Espresso Guji, 65% Tónica Botánica',
    description: 'Espresso floral en suspensión sobre agua tónica artesanal con hielo y pomelo.'
  },
  {
    id: 10,
    name: 'Flat White Origen Único',
    category: 'Bebidas Calientes',
    temperature: 'Caliente',
    price: 4.90,
    specialtyLevel: '92 pts SCA',
    rating: '4.9',
    origin: 'Ruanda Bourbon',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=500&auto=format&fit=crop&q=80',
    composition: '40% Ristretto Ruanda, 60% Microespuma fina',
    description: 'Doble ristretto con microespuma ultrafina homogénea y dulzura láctea natural.'
  }
];

export default function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Tabs: 'menu' | 'ofertas' | 'ordenes' | 'perfil'
  const [activeTab, setActiveTab] = useState('menu');

  // Filters & search
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart & simulation
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [notification, setNotification] = useState(null);

  // Customization
  const [customizingItem, setCustomizingItem] = useState(null);
  const [customSize, setCustomSize] = useState('Mediano (12 oz)');
  const [customMilk, setCustomMilk] = useState('Leche Entera de Granja');
  const [customSweetness, setCustomSweetness] = useState('Sin azúcar (Recomendado SCA)');

  // Orders list
  const [orders, setOrders] = useState([
    {
      id: 'CR-8921',
      date: 'Hoy, hace 12 min',
      items: [
        { name: 'Rey de los cafes', size: 'Mediano (12 oz)', milk: 'Leche de Granja', qty: 1, price: 6.50 }
      ],
      total: 6.50,
      status: 'Listo en Barra',
      statusStep: 3,
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
      alert('Para instalar Coffee Rapid PWA: En tu navegador selecciona "Instalar aplicación" o "Agregar a pantalla de inicio".');
      return;
    }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  const handleOpenCustomize = (product) => {
    setCustomizingItem(product);
    setCustomSize('Mediano (12 oz)');
    setCustomMilk('Leche Entera de Granja');
    setCustomSweetness('Sin azúcar (Recomendado SCA)');
  };

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

  const updateQuantity = (cartId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = appliedCoupon ? (cartSubtotal * appliedCoupon.discount) : 0;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const applyCouponCode = (code, discount, label) => {
    setAppliedCoupon({ code, discount, label });
    showNotification(`🏷️ Cupón aplicado: ${label}`);
  };

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

    setOrders(prev => [newOrder, ...prev]);

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

    setCart([]);
    setIsCartOpen(false);
    setActiveTab('ordenes');
    showNotification(`🎉 ¡Compra simulada con éxito! Orden ${newOrderId} en barra.`);
  };

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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', background: '#0D0907' }}>
      
      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#1F140D',
          color: '#FAF7F2',
          padding: '10px 18px',
          borderRadius: '9999px',
          fontSize: '0.85rem',
          fontWeight: '600',
          boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          border: '1px solid #D4A373',
          maxWidth: '90%',
          textAlign: 'center'
        }} className="fade-in">
          {notification}
        </div>
      )}

      {/* Header Dark Mobile (Matches phone mockup in reference image) */}
      <header style={{
        background: 'rgba(18, 12, 8, 0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #24170F',
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
            background: 'linear-gradient(135deg, #2A1C14 0%, #150E09 100%)',
            border: '1px solid rgba(212,163,115,0.4)',
            color: '#D4A373',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            fontSize: '1.1rem'
          }}>☕</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: '700', color: '#F7EFE8', letterSpacing: '0.04em' }}>
              COFFEE <span style={{ color: '#D4A373' }}>RAPID</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: '#7E6E63', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Specialty Mobile Bar
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Online badge */}
          <span style={{
            fontSize: '0.68rem',
            padding: '3px 8px',
            borderRadius: '10px',
            fontWeight: '700',
            background: isOnline ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            color: isOnline ? '#22C55E' : '#EF4444',
            border: `1px solid ${isOnline ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
          }}>
            {isOnline ? '● Online' : '● Offline'}
          </span>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              background: '#1F150F',
              border: '1px solid #2E1F16',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#F7EFE8',
              fontSize: '1rem'
            }}
          >
            🛒
            {totalItemsCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#D4A373',
                color: '#140E0A',
                fontSize: '0.7rem',
                fontWeight: '800',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.5)'
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
            
            {/* Hero Mini Banner (Like reference mobile screen) */}
            <div style={{
              background: 'linear-gradient(135deg, #1C120B 0%, #120A06 100%)',
              border: '1px solid rgba(212,163,115,0.25)',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '16px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <span style={{ fontSize: '0.65rem', color: '#D4A373', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                ⭐ PREMIUM COFFEE
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: '600', color: '#F7EFE8', lineHeight: 1.25, marginBottom: '6px' }}>
                Unlock a Superior Taste in Every Sip!
              </h2>
              <p style={{ fontSize: '0.78rem', color: '#B8A79B', lineHeight: 1.4, maxWidth: '240px', marginBottom: '10px' }}>
                Barra de especialidad calibrada al minuto. Tuestes frescos y entrega rápida.
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#D4A373', color: '#140E0A', fontSize: '0.72rem', fontWeight: '800', padding: '4px 12px', borderRadius: '20px' }}>
                <span>Explore Catalog</span>
                <span>→</span>
              </div>
            </div>

            {/* Search Input */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#160E09',
              border: '1px solid #281B13',
              borderRadius: '12px',
              padding: '8px 14px',
              marginBottom: '14px'
            }}>
              <span style={{ marginRight: '8px', color: '#7E6E63' }}>🔍</span>
              <input
                type="text"
                placeholder="Buscar Rey de los cafes, Cold brew..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  width: '100%',
                  fontSize: '0.85rem',
                  color: '#F7EFE8'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ border: 'none', background: 'transparent', color: '#7E6E63', cursor: 'pointer' }}
                >✕</button>
              )}
            </div>

            {/* Category Pills */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '14px' }}>
              {[
                { id: 'Todas', label: '☕ Todas (10)' },
                { id: 'Calientes', label: '🔥 Calientes' },
                { id: 'Frías', label: '❄️ Frías' },
                { id: 'Especialidad', label: '⭐ +91 SCA' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    whiteSpace: 'nowrap',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    border: '1px solid',
                    borderColor: selectedCategory === cat.id ? '#D4A373' : '#281B13',
                    background: selectedCategory === cat.id ? '#D4A373' : '#160E09',
                    color: selectedCategory === cat.id ? '#140E0A' : '#B8A79B',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Popular Drinks Title */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#D4A373', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Our Popular Drinks
              </span>
              <span style={{ fontSize: '0.72rem', color: '#7E6E63' }}>{filteredMenu.length} disponibles</span>
            </div>

            {/* Menu Items List (Dark cards with rating badge & gold circle +) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredMenu.map(coffee => (
                <div
                  key={coffee.id}
                  style={{
                    background: '#18110D',
                    borderRadius: '16px',
                    border: '1px solid #281B13',
                    padding: '12px',
                    display: 'flex',
                    gap: '12px',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                    alignItems: 'center',
                    transition: 'border-color 0.2s'
                  }}
                >
                  {/* Thumbnail with Rating badge */}
                  <div style={{ position: 'relative', width: '85px', height: '85px', flexShrink: 0, borderRadius: '12px', overflow: 'hidden' }}>
                    <img
                      src={coffee.image}
                      alt={coffee.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      fontSize: '0.62rem',
                      fontWeight: '800',
                      padding: '2px 5px',
                      borderRadius: '6px',
                      background: 'rgba(255,255,255,0.92)',
                      color: '#140E0A',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '2px'
                    }}>
                      <span>{coffee.rating}</span>
                      <span style={{ color: '#D4A373' }}>★</span>
                    </span>
                    <span style={{
                      position: 'absolute',
                      bottom: '4px',
                      left: '4px',
                      fontSize: '0.62rem',
                      fontWeight: '700',
                      padding: '1px 5px',
                      borderRadius: '4px',
                      background: coffee.temperature === 'Caliente' ? 'rgba(46,20,10,0.9)' : 'rgba(10,30,48,0.9)',
                      color: coffee.temperature === 'Caliente' ? '#F97316' : '#38BDF8'
                    }}>
                      {coffee.temperature === 'Caliente' ? '🔥' : '❄️'}
                    </span>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', fontWeight: '600', color: '#F7EFE8', marginBottom: '2px', lineHeight: 1.2 }}>
                      {coffee.name}
                    </h3>

                    <div style={{ fontSize: '0.68rem', color: '#D4A373', marginBottom: '2px', fontWeight: '600' }}>
                      ⭐ {coffee.specialtyLevel} &bull; <span style={{ color: '#7E6E63' }}>{coffee.origin}</span>
                    </div>

                    <div style={{ fontSize: '0.72rem', color: '#7E6E63', marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {coffee.composition}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#F7EFE8' }}>
                        ${coffee.price.toFixed(2)}
                      </span>

                      <button
                        onClick={() => handleOpenCustomize(coffee)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: '#D4A373',
                          color: '#140E0A',
                          border: 'none',
                          fontSize: '1.15rem',
                          fontWeight: '800',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(212,163,115,0.3)'
                        }}
                        title="Personalizar bebida"
                      >
                        +
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
              <span style={{ fontSize: '0.7rem', color: '#D4A373', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Descuentos de Barra
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: '600', color: '#F7EFE8', marginTop: '2px' }}>
                🏷️ Promociones & Ofertas
              </h2>
            </div>

            {/* Promo 1: 2x1 */}
            <div style={{
              background: 'linear-gradient(135deg, #20150F 0%, #160E0A 100%)',
              border: '1px solid rgba(212,163,115,0.35)',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '14px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.5)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ background: '#D4A373', color: '#140E0A', fontSize: '0.68rem', fontWeight: '800', padding: '3px 8px', borderRadius: '6px' }}>
                  PROMO DEL DÍA
                </span>
                <span style={{ fontSize: '1.2rem' }}>❄️☕</span>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#F7EFE8', marginBottom: '4px' }}>
                2x1 en Café Real Helado
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#B8A79B', marginBottom: '12px' }}>
                Lleva dos cold brews reposados 20h en barrica de roble por solo el valor de uno.
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
                        size: 'Mediano (12 oz) [2 tazas]',
                        milk: 'Leche Vainilla Real',
                        sweetness: 'Recomendado SCA',
                        quantity: 1,
                        image: item.image,
                        category: item.category
                      }
                    ]);
                    showNotification('🎉 ¡Promo 2x1 Café Real Helado añadida!');
                  }
                }}
                style={{
                  background: '#D4A373',
                  color: '#140E0A',
                  border: 'none',
                  padding: '9px 16px',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  fontWeight: '800',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                ☕ Agregar Promo 2x1 ($5.80)
              </button>
            </div>

            {/* Promo 2: Combo Barista */}
            <div style={{
              background: '#18110D',
              border: '1px solid #281B13',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '14px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ background: 'rgba(34,197,94,0.15)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.3)', fontSize: '0.68rem', fontWeight: '800', padding: '3px 8px', borderRadius: '6px' }}>
                  COMBO BARISTA
                </span>
                <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#22C55E' }}>Ahorras $2.20</span>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', color: '#F7EFE8', marginBottom: '4px' }}>
                Rey de los cafes + Croissant
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#B8A79B', marginBottom: '12px' }}>
                Microlote Geisha 94 pts acompañado de un croissant francés horneado esta mañana.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', textDecoration: 'line-through', color: '#7E6E63', marginRight: '6px' }}>$10.10</span>
                  <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#D4A373' }}>$7.90</span>
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
                    background: '#281B13',
                    border: '1px solid #D4A373',
                    color: '#D4A373',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
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
              background: '#140E0A',
              border: '2px dashed rgba(212,163,115,0.4)',
              borderRadius: '16px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '4px' }}>🎟️</span>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', color: '#F7EFE8', marginBottom: '4px' }}>
                Cupón: BIENVENIDA20
              </h4>
              <p style={{ fontSize: '0.78rem', color: '#B8A79B', marginBottom: '12px' }}>
                20% de descuento directo en tu primera compra simulada de bebidas.
              </p>
              <button
                onClick={() => applyCouponCode('BIENVENIDA20', 0.20, '20% OFF Bienvenida')}
                style={{
                  background: appliedCoupon?.code === 'BIENVENIDA20' ? '#22C55E' : '#D4A373',
                  color: '#140E0A',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '800',
                  cursor: 'pointer'
                }}
              >
                {appliedCoupon?.code === 'BIENVENIDA20' ? '✓ Cupón Activado' : 'Aplicar Cupón al Carrito'}
              </button>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: ÓRDENES ==================== */}
        {activeTab === 'ordenes' && (
          <div className="fade-in">
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '0.7rem', color: '#D4A373', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Preparación en Barra
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', color: '#F7EFE8', marginTop: '2px' }}>
                🧾 Mis Órdenes
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {orders.map((ord, idx) => (
                <div
                  key={ord.id}
                  style={{
                    background: '#18110D',
                    borderRadius: '16px',
                    border: idx === 0 ? '1px solid #D4A373' : '1px solid #281B13',
                    padding: '16px',
                    boxShadow: idx === 0 ? '0 6px 20px rgba(212,163,115,0.15)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div>
                      <span style={{ fontWeight: '800', color: '#F7EFE8', fontSize: '0.95rem' }}>{ord.id}</span>
                      <span style={{ fontSize: '0.72rem', color: '#7E6E63', marginLeft: '8px' }}>{ord.date}</span>
                    </div>
                    <span style={{
                      background: ord.status.includes('Listo') ? 'rgba(34,197,94,0.15)' : 'rgba(212,163,115,0.15)',
                      color: ord.status.includes('Listo') ? '#22C55E' : '#D4A373',
                      border: `1px solid ${ord.status.includes('Listo') ? 'rgba(34,197,94,0.3)' : 'rgba(212,163,115,0.3)'}`,
                      fontSize: '0.7rem',
                      fontWeight: '800',
                      padding: '3px 8px',
                      borderRadius: '8px'
                    }}>
                      {ord.status}
                    </span>
                  </div>

                  {/* Preparation Stepper Timeline */}
                  <div style={{ background: '#120A06', borderRadius: '10px', padding: '10px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                              background: isDone ? '#D4A373' : '#281B13',
                              color: isDone ? '#140E0A' : '#7E6E63',
                              fontSize: '0.7rem',
                              fontWeight: '800',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              margin: '0 auto 4px'
                            }}>
                              {isDone ? '✓' : st.step}
                            </div>
                            <span style={{ fontSize: '0.65rem', fontWeight: isDone ? '700' : '500', color: isDone ? '#F7EFE8' : '#7E6E63' }}>
                              {st.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Items list */}
                  <div style={{ borderTop: '1px solid #281B13', paddingTop: '10px', marginBottom: '10px' }}>
                    {ord.items.map((item, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                        <span style={{ color: '#F7EFE8' }}>
                          <strong style={{ color: '#D4A373' }}>{item.qty || 1}x</strong> {item.name} <small style={{ color: '#7E6E63' }}>({item.size || ''})</small>
                        </span>
                        <span style={{ fontWeight: '700', color: '#B8A79B' }}>
                          ${((item.price || 5.0) * (item.qty || 1)).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Total and pickup */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #281B13', paddingTop: '8px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#B8A79B' }}>
                      📍 {ord.pickupType}
                    </span>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#7E6E63', marginRight: '6px' }}>Total Pagado:</span>
                      <strong style={{ fontSize: '1.05rem', color: '#D4A373' }}>${ord.total.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 4: PERFIL ==================== */}
        {activeTab === 'perfil' && (
          <div className="fade-in">
            {/* VIP Card Dark Premium */}
            <div style={{
              background: '#18110D',
              borderRadius: '20px',
              border: '1px solid #281B13',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                background: '#140E0A',
                border: '2px solid #D4A373',
                margin: '0 auto 12px',
                overflow: 'hidden'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                  alt="Perfil Barista Club"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', color: '#F7EFE8', marginBottom: '2px' }}>
                Valentina Restrepo
              </h2>
              <span style={{
                display: 'inline-block',
                background: 'rgba(212,163,115,0.15)',
                color: '#D4A373',
                border: '1px solid rgba(212,163,115,0.3)',
                fontSize: '0.72rem',
                fontWeight: '800',
                padding: '3px 10px',
                borderRadius: '12px',
                marginBottom: '14px'
              }}>
                ⭐ MIEMBRO VIP ORO &bull; BARISTA CLUB
              </span>

              {/* Loyalty meter */}
              <div style={{
                background: 'linear-gradient(135deg, #140C08 0%, #20130D 100%)',
                border: '1px solid rgba(212,163,115,0.25)',
                borderRadius: '14px',
                padding: '16px',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.72rem', color: '#D4A373', fontWeight: '800', textTransform: 'uppercase' }}>
                    Saldo RapidBeans
                  </span>
                  <span style={{ fontSize: '1.1rem' }}>☕✨</span>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#F7EFE8', marginBottom: '6px' }}>
                  1,140 <small style={{ fontSize: '0.8rem', color: '#D4A373' }}>pts</small>
                </div>
                <div style={{ background: '#261811', height: '6px', borderRadius: '4px', overflow: 'hidden', marginBottom: '6px' }}>
                  <div style={{ width: '85%', height: '100%', background: '#D4A373' }}></div>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#B8A79B' }}>
                  ¡Faltan 60 pts para tu próximo <strong>Rey de los cafes</strong> de cortesía!
                </span>
              </div>
            </div>

            {/* Navigation links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: '#18110D',
                  border: '1px solid #281B13',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: '#F7EFE8',
                  fontSize: '0.85rem',
                  fontWeight: '600'
                }}
              >
                <span>🌐 Ir a la Landing Page Dark E-commerce</span>
                <span style={{ color: '#D4A373' }}>→</span>
              </a>
              <a
                href="/admin"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: '#18110D',
                  border: '1px solid #281B13',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: '#F7EFE8',
                  fontSize: '0.85rem',
                  fontWeight: '600'
                }}
              >
                <span>⚙️ Abrir Panel Administrativo & Métricas</span>
                <span style={{ color: '#D4A373' }}>→</span>
              </a>

              {deferredPrompt && (
                <button
                  onClick={handleInstallClick}
                  style={{
                    marginTop: '8px',
                    background: '#D4A373',
                    color: '#140E0A',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '12px',
                    fontWeight: '800',
                    fontSize: '0.85rem',
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

      {/* Floating Cart Trigger */}
      {cart.length > 0 && !isCartOpen && (
        <div style={{
          position: 'fixed',
          bottom: '72px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: '428px',
          background: '#1F140D',
          border: '1px solid #D4A373',
          color: '#F7EFE8',
          padding: '12px 18px',
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
          zIndex: 45
        }} className="fade-in">
          <div>
            <div style={{ fontSize: '0.72rem', color: '#D4A373', fontWeight: '800' }}>
              {totalItemsCount} {totalItemsCount === 1 ? 'bebida seleccionada' : 'bebidas seleccionadas'}
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#F7EFE8' }}>
              ${cartTotal.toFixed(2)}
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              background: '#D4A373',
              color: '#140E0A',
              border: 'none',
              padding: '8px 18px',
              borderRadius: '20px',
              fontWeight: '800',
              fontSize: '0.82rem',
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

      {/* Bottom Navigation Bar Dark */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '460px',
        background: 'rgba(18, 12, 8, 0.96)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid #281B13',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '8px 6px calc(8px + env(safe-area-inset-bottom, 0px))',
        zIndex: 50,
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.6)'
      }}>
        {[
          { id: 'menu', label: 'Menú', icon: '☕' },
          { id: 'ofertas', label: 'Ofertas', icon: '🏷️' },
          { id: 'ordenes', label: 'Órdenes', icon: '🧾' },
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
                color: isActive ? '#D4A373' : '#7E6E63',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{ fontSize: '1.25rem', marginBottom: '2px' }}>{tab.icon}</span>
              <span style={{ fontSize: '0.72rem', fontWeight: isActive ? '800' : '600' }}>
                {tab.label}
              </span>

              {isActive && (
                <span style={{
                  position: 'absolute',
                  bottom: '-2px',
                  width: '16px',
                  height: '2px',
                  background: '#D4A373',
                  borderRadius: '2px'
                }}></span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Customize Modal Dark */}
      {customizingItem && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#18110D',
            border: '1px solid rgba(212,163,115,0.3)',
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
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', color: '#F7EFE8' }}>{customizingItem.name}</h3>
                <span style={{ fontSize: '0.72rem', color: '#D4A373', fontWeight: '700' }}>⭐ {customizingItem.specialtyLevel}</span>
              </div>
              <button
                onClick={() => setCustomizingItem(null)}
                style={{ background: '#281B13', border: 'none', color: '#F7EFE8', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem' }}
              >✕</button>
            </div>

            {/* Size */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#D4A373', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
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
                      borderColor: customSize === sz.label ? '#D4A373' : '#281B13',
                      background: customSize === sz.label ? 'rgba(212,163,115,0.15)' : '#140E0A',
                      color: customSize === sz.label ? '#D4A373' : '#B8A79B',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div>{sz.label.split(' ')[0]}</div>
                    <small style={{ fontSize: '0.68rem', color: '#7E6E63' }}>{sz.delta}</small>
                  </button>
                ))}
              </div>
            </div>

            {/* Milk */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#D4A373', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
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
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      border: '1px solid',
                      borderColor: customMilk === m.label ? '#D4A373' : '#281B13',
                      background: customMilk === m.label ? 'rgba(212,163,115,0.15)' : '#140E0A',
                      color: '#F7EFE8',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{m.label}</span>
                    <span style={{ fontSize: '0.72rem', color: '#D4A373', fontWeight: '700' }}>{m.extra}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sweetness */}
            <div style={{ marginBottom: '22px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#D4A373', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
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
                      fontSize: '0.72rem',
                      fontWeight: '600',
                      border: '1px solid',
                      borderColor: customSweetness === sw ? '#D4A373' : '#281B13',
                      background: customSweetness === sw ? 'rgba(212,163,115,0.15)' : '#140E0A',
                      color: customSweetness === sw ? '#D4A373' : '#B8A79B',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    {sw}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              style={{
                width: '100%',
                background: '#D4A373',
                color: '#140E0A',
                border: 'none',
                padding: '14px',
                borderRadius: '16px',
                fontSize: '0.95rem',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              ☕ Agregar a la Orden
            </button>
          </div>
        </div>
      )}

      {/* Cart & Checkout Drawer Dark */}
      {isCartOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#18110D',
            border: '1px solid rgba(212,163,115,0.3)',
            width: '100%',
            maxWidth: '460px',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            padding: '24px 20px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column'
          }} className="slide-up">
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', color: '#F7EFE8' }}>Tu Orden Actual</h3>
                <span style={{ fontSize: '0.72rem', color: '#7E6E63' }}>Simulación de compra Coffee Rapid</span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{ background: '#281B13', border: 'none', color: '#F7EFE8', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem' }}
              >✕</button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px', paddingRight: '4px' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px 10px', color: '#7E6E63' }}>
                  <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '8px' }}>🛒</span>
                  <p style={{ fontWeight: '700', color: '#F7EFE8' }}>El carrito está vacío</p>
                  <small>Agrega tus bebidas favoritas desde el Menú.</small>
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
                      borderBottom: '1px solid #281B13'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#F7EFE8' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#7E6E63' }}>
                        {item.size} &bull; {item.milk}
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#D4A373', marginTop: '2px' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#120A06', borderRadius: '20px', padding: '4px 8px', border: '1px solid #281B13' }}>
                      <button
                        onClick={() => updateQuantity(item.cartId, -1)}
                        style={{ border: 'none', background: 'transparent', fontWeight: '800', fontSize: '0.9rem', color: '#B8A79B', cursor: 'pointer', width: '20px' }}
                      >-</button>
                      <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#F7EFE8' }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartId, 1)}
                        style={{ border: 'none', background: 'transparent', fontWeight: '800', fontSize: '0.9rem', color: '#B8A79B', cursor: 'pointer', width: '20px' }}
                      >+</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Totals */}
            {cart.length > 0 && (
              <div>
                {appliedCoupon && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    background: 'rgba(34,197,94,0.15)',
                    border: '1px solid rgba(34,197,94,0.3)',
                    color: '#22C55E',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    marginBottom: '10px'
                  }}>
                    <span>🎟️ {appliedCoupon.label}</span>
                    <span>- ${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div style={{ background: '#120A06', border: '1px solid #281B13', borderRadius: '12px', padding: '12px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#7E6E63', marginBottom: '4px' }}>
                    <span>Subtotal:</span>
                    <span>${cartSubtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#22C55E', marginBottom: '4px' }}>
                      <span>Descuento aplicado:</span>
                      <span>- ${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: '800', color: '#F7EFE8', borderTop: '1px solid #281B13', paddingTop: '6px', marginTop: '4px' }}>
                    <span>Total a Pagar:</span>
                    <span style={{ color: '#D4A373' }}>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleConfirmOrder('Retiro en Barra Express')}
                  style={{
                    width: '100%',
                    background: '#D4A373',
                    color: '#140E0A',
                    border: 'none',
                    padding: '14px',
                    borderRadius: '16px',
                    fontSize: '0.95rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(212,163,115,0.35)'
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
