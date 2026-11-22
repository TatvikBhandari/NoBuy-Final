import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { NegotiationModal } from './components/NegotiationModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ReceiptModal } from './components/ReceiptModal';
import { InspectionModal } from './components/InspectionModal';
import { ReviewModal } from './components/ReviewModal';
import { AddProductModal } from './components/AddProductModal';
import { AuthModal } from './components/AuthModal';
import { Dashboard } from './components/Dashboard';
import { Toast } from './components/Toast';
import './App.css';

function MainLayout() {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState('catalog'); // 'catalog' or 'dashboard'
  const [catalogSearch, setCatalogSearch] = useState('');

  // Modals state
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [bargainProduct, setBargainProduct] = useState(null);
  const [checkoutBooking, setCheckoutBooking] = useState(null);
  const [receiptPaymentId, setReceiptPaymentId] = useState(null);
  const [inspectionItem, setInspectionItem] = useState(null);
  const [reviewBooking, setReviewBooking] = useState(null);
  const [addProductOpen, setAddProductOpen] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleOpenAddProduct = () => {
    if (!isAuthenticated) {
      handleOpenAuth('login');
      return;
    }
    setAddProductOpen(true);
  };

  return (
    <div className="app-wrapper">
      {/* Toast Alert System */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />

      {/* Navigation */}
      <Navbar
        currentView={currentView}
        searchValue={catalogSearch}
        onViewChange={(view) => setCurrentView(view)}
        onSearchChange={setCatalogSearch}
        onOpenAuth={handleOpenAuth}
        onOpenAddProduct={handleOpenAddProduct}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {currentView === 'catalog' ? (
          <>
            <Hero searchValue={catalogSearch} onSearchChange={setCatalogSearch} />
            <ProductCatalog
              search={catalogSearch}
              onSearchChange={setCatalogSearch}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onBargainProduct={(p) => {
                if (!isAuthenticated) {
                  handleOpenAuth('login');
                  return;
                }
                setBargainProduct(p);
              }}
            />
          </>
        ) : (
          <Dashboard
            onOpenCheckout={(b) => setCheckoutBooking(b)}
            onOpenReceipt={(paymentId) => setReceiptPaymentId(paymentId)}
            onOpenInspection={(item) => setInspectionItem(item)}
            onOpenReview={(b) => setReviewBooking(b)}
            onOpenAddProduct={handleOpenAddProduct}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onBargain={(p) => setBargainProduct(p)}
          onBookingSuccess={(bookingId, title) => {
            showToast(`Rental request for "${title}" submitted to owner!`, 'success');
            setCurrentView('dashboard');
          }}
          onAuthRequired={handleOpenAuth}
        />
      )}

      {/* Bargaining / Counter-Offer Modal */}
      {bargainProduct && (
        <NegotiationModal
          product={bargainProduct}
          onClose={() => setBargainProduct(null)}
          onSuccess={(rate, title) => {
            showToast(`Offer of ₹${rate}/day for "${title}" sent to owner!`, 'success');
            setCurrentView('dashboard');
          }}
          onAuthRequired={handleOpenAuth}
        />
      )}

      {/* Simulated Checkout Modal */}
      {checkoutBooking && (
        <CheckoutModal
          booking={checkoutBooking}
          onClose={() => setCheckoutBooking(null)}
          onSuccess={(paymentId, txnId) => {
            showToast(`Payment confirmed! Simulated Txn: ${txnId}`, 'success');
            setReceiptPaymentId(paymentId);
          }}
        />
      )}

      {/* Payment Receipt Modal */}
      {receiptPaymentId && (
        <ReceiptModal
          paymentId={receiptPaymentId}
          onClose={() => setReceiptPaymentId(null)}
        />
      )}

      {/* Quality Return Inspection Modal */}
      {inspectionItem && (
        <InspectionModal
          returnItem={inspectionItem}
          onClose={() => setInspectionItem(null)}
          onSuccess={(refundedDeposit, title) => {
            showToast(`Return inspection for "${title}" completed. Deposit ₹${refundedDeposit} refunded!`, 'success');
          }}
        />
      )}

      {/* Review Modal */}
      {reviewBooking && (
        <ReviewModal
          booking={reviewBooking}
          onClose={() => setReviewBooking(null)}
          onSuccess={(rating, title) => {
            showToast(`Thank you! Your ${rating}★ review for "${title}" has been published.`, 'success');
          }}
        />
      )}

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={addProductOpen}
        onClose={() => setAddProductOpen(false)}
        onSuccess={(title) => {
          showToast(`"${title}" is now listed and available in the catalog!`, 'success');
          setCurrentView('catalog');
        }}
        onAuthRequired={handleOpenAuth}
      />

      {/* Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
        onSuccess={() => {
          showToast('Welcome to No-Buy! You are signed in.', 'success');
        }}
      />

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">NO-BUY</div>
            <p>Rent or borrow from people nearby instead of buying things you use only once in a while.</p>
          </div>
          <div>
            <div className="footer-heading">Explore</div>
            <div className="footer-link">Cameras</div>
            <div className="footer-link">Tools</div>
            <div className="footer-link">Electronics</div>
            <div className="footer-link">Outdoor Equipment</div>
          </div>
          <div>
            <div className="footer-heading">How it works</div>
            <div className="footer-link">Search by city</div>
            <div className="footer-link">Bargain on price</div>
            <div className="footer-link">Secure deposit</div>
            <div className="footer-link">Return inspection</div>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} No-Buy. All rights reserved.</span>
          <span>One account to rent and to list.</span>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
