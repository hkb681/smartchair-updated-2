import { useState } from 'react';
import Footer from '../components/Footer';
import Icon, { icons } from '../components/Icon';
import styles from './Order.module.css';

const PRODUCT = {
  name: 'SmartChair AI Wheelchair',
  price: 350000,
  features: [
    'Voice Command Control',
    // 'Real-time Obstacle Detection',
    'Autonomous Navigation',
    'Emergency Alert System',
    'GPS Tracking',
    'Mobile App Control',
    'Long Battery Life (20km)',
    'Weather Resistant (IPX4)',
    'Multiple User Profiles',
    '1-Year Warranty',
  ],
};

const COLORS = [
  { name: 'Midnight Black', hex: '#1a1a1a' },
  { name: 'Steel Gray',     hex: '#6B7280' },
  { name: 'Ocean Blue',     hex: '#2563EB' },
  { name: 'Arctic White',   hex: '#E2E8F0' },
];

const formatPKR = (amount) => 'Rs. ' + amount.toLocaleString('en-PK');

// Detailed wheelchair SVG that changes color
const WheelchairSVG = ({ color }) => (
  <svg viewBox="0 0 280 260" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    {/* Shadow */}
    <ellipse cx="155" cy="248" rx="80" ry="8" fill="rgba(0,0,0,0.08)"/>

    {/* ── SEAT BACK ── */}
    <rect x="90" y="80" width="14" height="90" rx="7" fill={color} opacity="0.9"/>
    <rect x="150" y="80" width="14" height="90" rx="7" fill={color} opacity="0.9"/>

    {/* ── SEAT ── */}
    <rect x="85" y="155" width="90" height="16" rx="8" fill={color}/>
    {/* seat cushion */}
    <rect x="88" y="152" width="84" height="12" rx="6" fill={color} opacity="0.7"/>

    {/* ── ARMRESTS ── */}
    <rect x="78" y="115" width="70" height="10" rx="5" fill={color} opacity="0.85"/>
    <rect x="108" y="115" width="70" height="10" rx="5" fill={color} opacity="0.85"/>

    {/* ── FOOTREST ── */}
    <rect x="105" y="168" width="8" height="40" rx="4" fill={color} opacity="0.8"/>
    <rect x="145" y="168" width="8" height="40" rx="4" fill={color} opacity="0.8"/>
    <rect x="95" y="203" width="68" height="10" rx="5" fill={color}/>

    {/* ── LARGE REAR WHEELS ── */}
    {/* Left wheel */}
    <circle cx="100" cy="200" r="46" fill="none" stroke={color} strokeWidth="6"/>
    <circle cx="100" cy="200" r="36" fill="none" stroke={color} strokeWidth="2" opacity="0.3"/>
    <circle cx="100" cy="200" r="8" fill={color}/>
    {/* Spokes left */}
    {[0,45,90,135,180,225,270,315].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      return <line key={i} x1="100" y1="200" x2={100 + 38*Math.cos(rad)} y2={200 + 38*Math.sin(rad)} stroke={color} strokeWidth="2" opacity="0.6"/>;
    })}
    {/* Push rim left */}
    <circle cx="100" cy="200" r="42" fill="none" stroke={color} strokeWidth="3" opacity="0.4"/>

    {/* Right wheel */}
    <circle cx="210" cy="200" r="46" fill="none" stroke={color} strokeWidth="6"/>
    <circle cx="210" cy="200" r="36" fill="none" stroke={color} strokeWidth="2" opacity="0.3"/>
    <circle cx="210" cy="200" r="8" fill={color}/>
    {/* Spokes right */}
    {[0,45,90,135,180,225,270,315].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      return <line key={i} x1="210" y1="200" x2={210 + 38*Math.cos(rad)} y2={200 + 38*Math.sin(rad)} stroke={color} strokeWidth="2" opacity="0.6"/>;
    })}
    {/* Push rim right */}
    <circle cx="210" cy="200" r="42" fill="none" stroke={color} strokeWidth="3" opacity="0.4"/>

    {/* ── SMALL FRONT WHEELS ── */}
    <circle cx="175" cy="225" r="16" fill="none" stroke={color} strokeWidth="4"/>
    <circle cx="175" cy="225" r="5" fill={color}/>

    {/* ── PERSON ── */}
    {/* Head */}
    <circle cx="130" cy="48" r="22" fill="#FBBF8C"/>
    {/* Hair */}
    <path d="M108 42 Q130 20 152 42 Q145 30 130 28 Q115 30 108 42Z" fill="#92400E"/>
    {/* Face details */}
    <circle cx="122" cy="46" r="2.5" fill="#7C3AED" opacity="0.7"/>
    <circle cx="138" cy="46" r="2.5" fill="#7C3AED" opacity="0.7"/>
    <path d="M122 56 Q130 62 138 56" stroke="#7C3AED" strokeWidth="2" fill="none" strokeLinecap="round"/>
    {/* Body */}
    <rect x="105" y="72" width="50" height="60" rx="10" fill={color} opacity="0.85"/>
    {/* AI badge on shirt */}
    <rect x="118" y="90" width="24" height="16" rx="4" fill="white" opacity="0.9"/>
    <text x="130" y="102" textAnchor="middle" fontSize="8" fontWeight="bold" fill={color}>AI</text>
    {/* Arms */}
    <rect x="88" y="80" width="20" height="10" rx="5" fill="#FBBF8C"/>
    <rect x="152" y="80" width="20" height="10" rx="5" fill="#FBBF8C"/>
    {/* Hands */}
    <circle cx="88" cy="85" r="7" fill="#FBBF8C"/>
    <circle cx="172" cy="85" r="7" fill="#FBBF8C"/>
    {/* Legs */}
    <rect x="108" y="132" width="20" height="28" rx="6" fill="#1E3A5F"/>
    <rect x="132" y="132" width="20" height="28" rx="6" fill="#1E3A5F"/>
    {/* Shoes */}
    <rect x="104" y="156" width="26" height="10" rx="5" fill="#111827"/>
    <rect x="130" y="156" width="26" height="10" rx="5" fill="#111827"/>

    {/* ── AI SIGNALS (decorative) ── */}
    <circle cx="100" cy="200" r="52" fill="none" stroke={color} strokeWidth="1" opacity="0.15" strokeDasharray="4 4"/>
    <circle cx="210" cy="200" r="52" fill="none" stroke={color} strokeWidth="1" opacity="0.15" strokeDasharray="4 4"/>

    {/* Wifi/signal waves near head */}
    <path d="M155 30 Q165 22 175 30" stroke={color} strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round"/>
    <path d="M158 24 Q167 14 177 24" stroke={color} strokeWidth="2" fill="none" opacity="0.4" strokeLinecap="round"/>
    <path d="M161 18 Q168 6 178 18" stroke={color} strokeWidth="2" fill="none" opacity="0.2" strokeLinecap="round"/>
  </svg>
);

const Order = ({ setPage }) => {
  const [colorIdx, setColorIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [formError, setFormError] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Color overlays for each color option
  const colorOverlays = [
    { bg: 'transparent',      blend: 'normal',    opacity: 0    }, // Midnight Black - original
    { bg: '#6B7280',          blend: 'hue',        opacity: 0.75 }, // Steel Gray
    { bg: '#2563EB',          blend: 'hue',        opacity: 0.75 }, // Ocean Blue
    { bg: '#E2E8F0',          blend: 'luminosity', opacity: 0.6  }, // Arctic White
  ];

  const handlePurchase = () => {
    setFormError('');

    const required = [
      { value: firstName, label: 'First Name' },
      { value: lastName, label: 'Last Name' },
      { value: email, label: 'Email' },
      { value: phone, label: 'Phone Number' },
      { value: street, label: 'Street Address' },
      { value: city, label: 'City' },
      { value: province, label: 'Province' },
      { value: postalCode, label: 'Postal Code' },
    ];

    const missing = required.filter(f => !f.value.trim());
    if (missing.length) {
      setFormError(`Please fill in all fields: ${missing.map(f => f.label).join(', ')}.`);
      return;
    }

    if (paymentMethod === 'card' && (!cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim())) {
      setFormError('Please fill in all card details (Card Number, MM/YY, and CVV).');
      return;
    }

    setOrderPlaced(true);
  };

  if (orderPlaced) return (
    <div className={styles.successPage}>
      <div className={styles.successCard}>
        <div className={styles.successIcon}>🎉</div>
        <h2 className={styles.successTitle}>Order Placed Successfully!</h2>
        <p className={styles.successSub}>
          {paymentMethod === 'cod'
            ? 'Your SmartChair has been ordered with Cash on Delivery. Our team will call you shortly to confirm.'
            : 'Thank you for your purchase! Your SmartChair is on its way.'}
        </p>

        <div className={styles.successDetails}>
          <div className={styles.successRow}>
            <span>Product</span>
            <span>{PRODUCT.name}</span>
          </div>
          <div className={styles.successRow}>
            <span>Color</span>
            <span>{COLORS[colorIdx].name}</span>
          </div>
          <div className={styles.successRow}>
            <span>Quantity</span>
            <span>{qty}</span>
          </div>
          <div className={styles.successRow}>
            <span>Payment</span>
            <span>{paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card'}</span>
          </div>
          <div className={styles.successDivider} />
          <div className={`${styles.successRow} ${styles.successTotal}`}>
            <span>Total Amount</span>
            <span>{formatPKR(PRODUCT.price * qty + Math.round(PRODUCT.price * qty * 0.08))}</span>
          </div>
        </div>

        <div className={styles.successBadge}>
          {paymentMethod === 'cod' ? '🚚 Estimated Delivery: 3-5 Business Days' : '✅ Payment Confirmed'}
        </div>

        <div className={styles.successBtns}>
          <button className="btn-primary" onClick={() => { setOrderPlaced(false); setPage('home'); }}>
            Back to Home
          </button>
          <button className={styles.trackBtn} onClick={() => setPage('contact')}>
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );

  const selectedColor = COLORS[colorIdx];
  const subtotal = PRODUCT.price * qty;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  // Map color names to actual hex for the SVG
  const svgColors = ['#1a1a1a', '#6B7280', '#2563EB', '#94A3B8'];

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Order Your SmartChair</h1>
        <p>Configure your perfect AI-powered wheelchair</p>
      </div>

      <div className={styles.layout}>
        {/* ── Left column ── */}
        <div>
          {/* Product Card */}
          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>Your SmartChair</h3>

            <div className={styles.productCard}>
              {/* Wheelchair Image with color overlay */}
              <div className={styles.productImg}>
                <div className={styles.imageWrapper}>
                  <img
                    src="/wheelchair.png"
                    alt="SmartChair AI Wheelchair"
                    className={styles.wheelchairPhoto}
                  />
                  {colorIdx !== 0 && (
                    <div
                      className={styles.colorOverlay}
                      style={{
                        background: colorOverlays[colorIdx].bg,
                        mixBlendMode: colorOverlays[colorIdx].blend,
                        opacity: colorOverlays[colorIdx].opacity,
                      }}
                    />
                  )}
                  <div className={styles.colorBadge} style={{ background: COLORS[colorIdx].hex, color: colorIdx === 3 ? '#1a1a1a' : 'white' }}>
                    {COLORS[colorIdx].name}
                  </div>
                </div>
              </div>

              <div className={styles.productInfo}>
                <h2 className={styles.productName}>{PRODUCT.name}</h2>
                <p className={styles.productPrice}>{formatPKR(PRODUCT.price)}</p>
                <ul className={styles.featureList}>
                  {PRODUCT.features.map(f => <li key={f}>{f}</li>)}
                </ul>
              </div>
            </div>

            {/* Color selector */}
            <h3 className={styles.sectionTitle} style={{ marginTop: 24 }}>Choose Your Color</h3>
            <div className={styles.colorGrid}>
              {COLORS.map((c, i) => (
                <div
                  key={i}
                  className={`${styles.colorCard} ${colorIdx === i ? styles.selected : ''}`}
                  onClick={() => setColorIdx(i)}
                >
                  <div className={styles.swatch} style={{ background: c.hex }} />
                  <span className={styles.colorName}>{c.name}</span>
                  {colorIdx === i && (
                    <div className={styles.colorCheck}>
                      <Icon d={icons.check} style={{ width: 14, height: 14, stroke: 'var(--blue)' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Shipping & Payment */}
          <div className={styles.card} style={{ marginTop: 20 }}>
            <h3 className={styles.sectionTitle}>Shipping & Payment</h3>

            <p className={styles.fieldLabel}>Personal Information</p>
            <div className="form-2col" style={{ marginBottom: 12 }}>
              <input className="form-control" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
              <input className="form-control" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
            <div className="form-2col" style={{ marginBottom: 20 }}>
              <input className="form-control" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
              <input className="form-control" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>

            <p className={styles.fieldLabel}>Shipping Address</p>
            <input className="form-control" placeholder="Street Address" style={{ marginBottom: 12 }} value={street} onChange={e => setStreet(e.target.value)} />
            <div className="form-3col" style={{ marginBottom: 20 }}>
              <input className="form-control" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
              <input className="form-control" placeholder="Province" value={province} onChange={e => setProvince(e.target.value)} />
              <input className="form-control" placeholder="Postal Code" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
            </div>

            <p className={styles.fieldLabel}>Payment Method</p>

            {/* Payment Toggle */}
            <div className={styles.paymentToggle}>
              <div
                className={`${styles.paymentOption} ${paymentMethod === 'card' ? styles.paymentSelected : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className={styles.paymentRadio}>
                  {paymentMethod === 'card' && <div className={styles.paymentRadioDot}/>}
                </div>
                <div className={styles.paymentOptionContent}>
                  <span className={styles.paymentOptionIcon}>💳</span>
                  <div>
                    <p className={styles.paymentOptionTitle}>Credit / Debit Card</p>
                    <p className={styles.paymentOptionSub}>Visa, Mastercard, JazzCash</p>
                  </div>
                </div>
              </div>

              <div
                className={`${styles.paymentOption} ${paymentMethod === 'cod' ? styles.paymentSelected : ''}`}
                onClick={() => setPaymentMethod('cod')}
              >
                <div className={styles.paymentRadio}>
                  {paymentMethod === 'cod' && <div className={styles.paymentRadioDot}/>}
                </div>
                <div className={styles.paymentOptionContent}>
                  <span className={styles.paymentOptionIcon}>💵</span>
                  <div>
                    <p className={styles.paymentOptionTitle}>Cash on Delivery</p>
                    <p className={styles.paymentOptionSub}>Pay when you receive your order</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card fields — only show if card selected */}
            {paymentMethod === 'card' && (
              <div className={styles.cardFields}>
                <input className="form-control" placeholder="Card Number" style={{ marginBottom: 12 }} value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
                <div className="form-2col" style={{ marginBottom: 8 }}>
                  <input className="form-control" placeholder="MM/YY" value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} />
                  <input className="form-control" placeholder="CVV" value={cardCvv} onChange={e => setCardCvv(e.target.value)} />
                </div>
              </div>
            )}

            {/* COD notice */}
            {paymentMethod === 'cod' && (
              <div className={styles.codNotice}>
                <span>🚚</span>
                <p>You will pay <strong>Rs. {(PRODUCT.price * qty + Math.round(PRODUCT.price * qty * 0.08)).toLocaleString('en-PK')}</strong> in cash when your SmartChair is delivered to your doorstep.</p>
              </div>
            )}

            {formError && <p className={styles.errorMsg}>⚠️ {formError}</p>}

            <button
              onClick={handlePurchase}
              className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16 }}
            >
              <Icon d={icons.cart} style={{ width: 18, height: 18, stroke: 'white' }} />
              {paymentMethod === 'cod' ? 'Place Order (Cash on Delivery)' : 'Complete Purchase'}
            </button>
          </div>
        </div>

        {/* ── Order Summary ── */}
        <div className={styles.summary}>
          <h3 className={styles.summaryTitle}>Order Summary</h3>

          <p className={styles.summaryLabel}>Product</p>
          <p className={styles.summaryValue}>{PRODUCT.name}</p>

          <p className={styles.summaryLabel}>Color</p>
          <p className={styles.summaryValue}>{COLORS[colorIdx].name}</p>

          <p className={styles.summaryLabel} style={{ marginTop: 16 }}>Quantity</p>
          <div className={styles.qtyRow}>
            <button className={styles.qtyBtn} onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
            <span className={styles.qtyVal}>{qty}</span>
            <button className={styles.qtyBtn} onClick={() => setQty(qty + 1)}>+</button>
          </div>

          <div className={styles.divider} />

          <div className={styles.priceRow}><span>Subtotal</span><span>{formatPKR(subtotal)}</span></div>
          <div className={styles.priceRow}><span>Shipping</span><span className={styles.free}>FREE</span></div>
          <div className={styles.priceRow}><span>Tax (8%)</span><span>{formatPKR(tax)}</span></div>

          <div className={styles.divider} />

          <div className={styles.totalRow}><span>Total</span><span>{formatPKR(total)}</span></div>

          <div className={styles.perks}>
            <p>✓ Free shipping across Pakistan</p>
            <p>✓ 30-day money-back guarantee</p>
            <p>✓ 1-year warranty included</p>
          </div>
        </div>
      </div>

      <Footer setPage={setPage} />
    </>
  );
};

export default Order;
