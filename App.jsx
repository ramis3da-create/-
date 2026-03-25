import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';

// Context Providers
import { DarkModeProvider } from './contexts/DarkModeContext';
import { CartProvider } from './contexts/CartContext';
import { ExchangeRateProvider } from './contexts/ExchangeRateContext';
import { ServerConnectionProvider } from './contexts/ServerConnectionContext';

// Utils
import './utils/disableReactDevTools.js';
import { useUser } from './contexts/UserContext.jsx';

// Styles - الهوية البصرية السورية
import './styles/syrian-brand.css';

// React Components
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/Loading/LoadingSpinner';
import ServerStatusIndicator from './components/ServerStatusIndicator';

// Layout Components
import SimpleNavbar from './components/SimpleNavbar';
// import VerticalNavbar from './components/VerticalNavbar'; // تم إخفاء النافبار العمودية
import Footer from './components/Footer';

// Auth Components
import AuthGuard from './components/AuthGuard.jsx';

// Public Pages - Lazy Loading للأداء الأمثل
const Home = lazy(() => import('./Pages/Home'));
const About = lazy(() => import('./Pages/About'));
const Products = lazy(() => import('./Pages/Products'));
const StoresPage = lazy(() => import('./Pages/StoresPage'));
const Offers = lazy(() => import('./Pages/Offers'));
const Cart = lazy(() => import('./Pages/Cart'));
const Checkout = lazy(() => import('./Pages/Checkout'));
const Orders = lazy(() => import('./Pages/Orders'));
const OrdersStatus = lazy(() => import('./Pages/OrdersStatus.jsx'));
const StoreNotifications = lazy(() => import('./Pages/StoreNotifications'));
const ShippingManagement = lazy(() => import('./Pages/ShippingManagement'));
const LocationManagement = lazy(() => import('./Pages/LocationManagement'));
const DistanceShippingManagement = lazy(
  () => import('./Pages/DistanceShippingManagement')
);
const GuestShopping = lazy(
  () => import('./components/Guest/GuestShopping.jsx')
);

// Auth Pages - Lazy Loading
const Login = lazy(() => import('./Pages/Login'));
const SignUp = lazy(() => import('./Pages/SignUp'));
const ForgotPassword = lazy(() => import('./Pages/ForgotPassword'));

// User Dashboard Pages - Lazy Loading
const CustomerDashboard = lazy(
  () => import('./components/Customer/CustomerDashboard.jsx')
);
const StoreOwnerDashboard = lazy(
  () => import('./components/StoreOwner/StoreOwnerDashboard.jsx')
);
const AdminDashboard = lazy(
  () => import('./components/Admin/AdminDashboard.jsx')
);
const SiteOwnerDashboard = lazy(
  () => import('./components/SiteOwner/SiteOwnerDashboard.jsx')
);

// Store Owner Pages - Lazy Loading
const AddProduct = lazy(() => import('./Pages/AddProduct.jsx'));
const StoreProducts = lazy(
  () => import('./components/StoreOwner/StoreProducts.jsx')
);
const StoreOrders = lazy(
  () => import('./components/StoreOwner/StoreOrders.jsx')
);
const ProductManagement = lazy(
  () => import('./components/StoreOwner/ProductManagement.jsx')
);
const ReportsAndAnalytics = lazy(
  () => import('./components/StoreOwner/ReportsAndAnalytics.jsx')
);
const OrderManagement = lazy(
  () => import('./components/StoreOwner/OrderManagement.jsx')
);
const StoreWallet = lazy(
  () => import('./components/StoreOwner/StoreWallet.jsx')
);
const StoreControlPanel = lazy(
  () => import('./components/StoreOwner/StoreControlPanel.jsx')
);

// SEO Pages - Lazy Loading
const ProductDetailEnhanced = lazy(
  () => import('./Pages/ProductDetailEnhanced.jsx')
);
const TrendyolProductPage = lazy(
  () => import('./components/ProductDisplay/TrendyolProductPage')
);
const StoreDetail = lazy(() => import('./Pages/StoreDetail.jsx'));

// Customer Pages - Lazy Loading
const WalletManagement = lazy(
  () => import('./components/Customer/WalletManagement.jsx')
);
const Wallet = lazy(() => import('./Pages/Wallet.jsx'));

// Settings & Profile Pages - Lazy Loading
const Notifications = lazy(() => import('./Pages/Notifications.jsx'));
const Profile = lazy(() => import('./Pages/ProfileEnhanced'));
const AccountSettings = lazy(() => import('./Pages/AccountSettings'));
const Settings = lazy(() => import('./Pages/Settings'));
const StoreVerification = lazy(() => import('./Pages/StoreVerification'));

// Business & Management Pages - Lazy Loading
const SellerDashboard = lazy(() => import('./components/SellerDashboard.jsx'));
const SellerRegistration = lazy(
  () => import('./components/SellerRegistration.jsx')
);
const StoreOwnerRegistration = lazy(
  () => import('./components/StoreOwnerRegistration.jsx')
);
const AdminSellerManagement = lazy(
  () => import('./components/AdminSellerManagement.jsx')
);

// Financial Pages - Lazy Loading
const Earnings = lazy(() => import('./Pages/Earnings'));
const SellerProfitDashboard = lazy(
  () => import('./Pages/SellerProfitDashboard.jsx')
);
const AdminProfitManagement = lazy(
  () => import('./Pages/AdminProfitManagement.jsx')
);
const SellerEarningsDashboard = lazy(
  () => import('./Pages/SellerEarningsDashboard.jsx')
);
const AdminSellerEarningsManagement = lazy(
  () => import('./Pages/AdminSellerEarningsManagement.jsx')
);

// Order & Checkout Pages - Lazy Loading
const OrderTrackingPage = lazy(() => import('./Pages/OrderTracking'));
const OrderManagementPage = lazy(() => import('./Pages/OrderManagement'));

// Account Management Pages - Lazy Loading
const AdvancedAccountManager = lazy(
  () => import('./components/AdvancedAccountManager.jsx')
);
const Favorites = lazy(() => import('./Pages/Favorites'));

// Business System Pages - Lazy Loading
const LocalStoreDashboard = lazy(
  () => import('./components/LocalStoreDashboard.jsx')
);
const LocalPaymentSystem = lazy(
  () => import('./components/LocalPaymentSystem.jsx')
);
const LocalDeliverySystem = lazy(
  () => import('./components/LocalDeliverySystem.jsx')
);
const ReviewSystem = lazy(() => import('./components/ReviewSystem.jsx'));
const PromotionsSystem = lazy(
  () => import('./components/PromotionsSystem.jsx')
);
const SmallBusinessManager = lazy(
  () => import('./components/SmallBusinessManager.jsx')
);
const AdvancedAnalytics = lazy(
  () => import('./components/AdvancedAnalytics.jsx')
);
const SupportSystem = lazy(() => import('./components/SupportSystem.jsx'));
const SMEBusinessPortal = lazy(
  () => import('./components/SMEBusinessPortal.jsx')
);

// Legal & Policy Pages - Lazy Loading
const PrivacyPolicy = lazy(() => import('./Pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./Pages/TermsOfService'));
const DataProtectionPolicy = lazy(() => import('./Pages/DataProtectionPolicy'));
const ReturnPolicy = lazy(() => import('./Pages/ReturnPolicy'));
const PaymentMethods = lazy(() => import('./Pages/PaymentMethods'));
const CompanyInfo = lazy(() => import('./Pages/CompanyInfo'));

// Additional Components - Lazy Loading
const ProfitNotifications = lazy(
  () => import('./components/ProfitNotifications.jsx')
);

const App = () => {
  return (
    <BrowserRouter>
      <ServerConnectionProvider>
        <DarkModeProvider>
          <ExchangeRateProvider>
            <CartProvider>
              <AppContent />
            </CartProvider>
          </ExchangeRateProvider>
        </DarkModeProvider>
      </ServerConnectionProvider>
    </BrowserRouter>
  );
};

function AppContent() {
  const location = useLocation();
  const { isLoggedIn } = useUser();

  const isAuthPage =
    location.pathname !== '/login' &&
    location.pathname !== '/signup' &&
    location.pathname !== '/register' &&
    location.pathname !== '/store-owner/dashboard';

  // Loading Component للأداء الأمثل
  const LoadingFallback = () => (
    <LoadingSpinner fullScreen={false} text='جاري تحميل الصفحة...' />
  );

  return (
    <ErrorBoundary>
      <SimpleNavbar />
      {/* <VerticalNavbar /> */} {/* تم إخفاء النافبار العمودية */}
      <div
        className='app-main-content'
        style={{ padding: '20px 20px 0 20px', position: 'relative', zIndex: 1 }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ErrorBoundary>
            <Routes>
              {/* Default Route - Products Page */}
              <Route path='/' element={<Products />} />
              {/* Public Routes */}
              <Route path='/home' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/products' element={<Products />} />
              <Route path='/search' element={<Products />} />
              <Route path='/stores' element={<StoresPage />} />
              <Route path='/offers' element={<Offers />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/orders-status' element={<OrdersStatus />} />
              <Route
                path='/store-notifications'
                element={<StoreNotifications />}
              />
              <Route
                path='/shipping-management'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['عمل', 'محل']}>
                    <ShippingManagement />
                  </AuthGuard>
                }
              />
              <Route
                path='/location-management'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['عمل', 'محل']}>
                    <LocationManagement />
                  </AuthGuard>
                }
              />
              <Route
                path='/distance-shipping'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['عمل', 'محل']}>
                    <DistanceShippingManagement />
                  </AuthGuard>
                }
              />
              <Route path='/guest-shopping' element={<GuestShopping />} />
              {/* SEO Routes */}
              <Route
                path='/product/:productId'
                element={<TrendyolProductPage />}
              />
              <Route
                path='/product-old/:productId'
                element={<ProductDetailEnhanced />}
              />
              <Route path='/store/:storeId' element={<StoreDetail />} />
              {/* Authentication Routes */}
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/register' element={<SignUp />} />{' '}
              {/* Redirect old register path */}
              <Route path='/forgot-password' element={<ForgotPassword />} />
              {/* Store Owner Routes */}
              <Route
                path='/store-owner/dashboard'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['عمل', 'محل']}>
                    <StoreOwnerDashboard />
                  </AuthGuard>
                }
              />
              <Route
                path='/store-owner/add-product'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['عمل', 'محل']}>
                    <AddProduct />
                  </AuthGuard>
                }
              />
              <Route
                path='/store-owner/products'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['عمل', 'محل']}>
                    <StoreProducts />
                  </AuthGuard>
                }
              />
              <Route
                path='/store-owner/orders'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['عمل', 'محل']}>
                    <StoreOrders />
                  </AuthGuard>
                }
              />
              <Route
                path='/store-owner/verification'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['عمل', 'محل']}>
                    <StoreVerification />
                  </AuthGuard>
                }
              />
              <Route
                path='/store-owner/wallet'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['عمل', 'محل']}>
                    <StoreWallet />
                  </AuthGuard>
                }
              />
              <Route
                path='/store-owner/control-panel'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['عمل', 'محل']}>
                    <StoreControlPanel />
                  </AuthGuard>
                }
              />
              <Route
                path='/store-registration'
                element={<StoreOwnerRegistration />}
              />
              {/* Seller Routes */}
              <Route
                path='/seller-registration'
                element={<SellerRegistration />}
              />
              <Route
                path='/seller-dashboard'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['بائع']}>
                    <SellerDashboard />
                  </AuthGuard>
                }
              />
              {/* Customer Routes */}
              <Route
                path='/customer-dashboard'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['عميل']}>
                    <CustomerDashboard />
                  </AuthGuard>
                }
              />
              <Route
                path='/wallet-management'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['عميل']}>
                    <WalletManagement />
                  </AuthGuard>
                }
              />
              <Route
                path='/wallet'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['عميل']}>
                    <Wallet />
                  </AuthGuard>
                }
              />
              {/* Site Owner (الممول) Routes - محمي */}
              <Route
                path='/site-owner'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['ممول']}>
                    <SiteOwnerDashboard />
                  </AuthGuard>
                }
              />
              <Route
                path='/site-owner/dashboard'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['ممول']}>
                    <SiteOwnerDashboard />
                  </AuthGuard>
                }
              />
              {/* Admin Routes */}
              <Route
                path='/admin-dashboard'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['مدير']}>
                    <AdminDashboard />
                  </AuthGuard>
                }
              />
              <Route
                path='/admin/sellers'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['مدير']}>
                    <AdminSellerManagement />
                  </AuthGuard>
                }
              />
              <Route
                path='/admin/orders'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['مدير']}>
                    <OrderManagementPage />
                  </AuthGuard>
                }
              />
              <Route
                path='/admin-profits'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['مدير']}>
                    <AdminProfitManagement />
                  </AuthGuard>
                }
              />
              <Route
                path='/admin-seller-earnings'
                element={
                  <AuthGuard
                    requireAuth={true}
                    allowedRoles={['مدير', 'admin']}
                  >
                    <AdminSellerEarningsManagement />
                  </AuthGuard>
                }
              />
              {/* Protected User Routes */}
              <Route
                path='/notifications'
                element={
                  <AuthGuard requireAuth={true}>
                    <Notifications />
                  </AuthGuard>
                }
              />
              <Route
                path='/profile'
                element={
                  <AuthGuard requireAuth={true}>
                    <Profile />
                  </AuthGuard>
                }
              />
              <Route
                path='/account-settings'
                element={
                  <AuthGuard requireAuth={true}>
                    <AccountSettings />
                  </AuthGuard>
                }
              />
              <Route path='/settings' element={<Settings />} />
              <Route
                path='/favorites'
                element={
                  <AuthGuard requireAuth={true}>
                    <Favorites />
                  </AuthGuard>
                }
              />
              <Route
                path='/checkout'
                element={
                  <AuthGuard requireAuth={true}>
                    <Checkout />
                  </AuthGuard>
                }
              />
              <Route
                path='/earnings'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['عمل']}>
                    <Earnings />
                  </AuthGuard>
                }
              />
              <Route
                path='/seller-profits'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['عمل']}>
                    <SellerProfitDashboard />
                  </AuthGuard>
                }
              />
              <Route
                path='/seller-earnings'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['عمل']}>
                    <SellerEarningsDashboard />
                  </AuthGuard>
                }
              />
              <Route
                path='/product-management'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['عمل']}>
                    <ProductManagement />
                  </AuthGuard>
                }
              />
              <Route
                path='/reports-analytics'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['عمل']}>
                    <ReportsAndAnalytics />
                  </AuthGuard>
                }
              />
              <Route
                path='/order-management'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['عمل']}>
                    <OrderManagement />
                  </AuthGuard>
                }
              />
              {/* Order & Tracking Routes */}
              <Route
                path='/order-tracking'
                element={
                  <AuthGuard requireAuth={true}>
                    <OrderTrackingPage />
                  </AuthGuard>
                }
              />
              {/* Account Management Routes */}
              <Route
                path='/account-manager'
                element={
                  <AuthGuard requireAuth={true}>
                    <AdvancedAccountManager />
                  </AuthGuard>
                }
              />
              {/* Business System Routes */}
              <Route
                path='/local-store-dashboard'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['عمل']}>
                    <LocalStoreDashboard />
                  </AuthGuard>
                }
              />
              <Route
                path='/payment'
                element={
                  <AuthGuard requireAuth={true}>
                    <LocalPaymentSystem />
                  </AuthGuard>
                }
              />
              <Route
                path='/delivery'
                element={
                  <AuthGuard requireAuth={true}>
                    <LocalDeliverySystem />
                  </AuthGuard>
                }
              />
              <Route
                path='/reviews'
                element={
                  <AuthGuard requireAuth={true}>
                    <ReviewSystem />
                  </AuthGuard>
                }
              />
              <Route
                path='/promotions'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['مدير', 'عمل']}>
                    <PromotionsSystem />
                  </AuthGuard>
                }
              />
              <Route
                path='/business-management'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['مدير']}>
                    <SmallBusinessManager />
                  </AuthGuard>
                }
              />
              <Route
                path='/analytics'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['مدير', 'عمل']}>
                    <AdvancedAnalytics />
                  </AuthGuard>
                }
              />
              <Route
                path='/support'
                element={
                  <AuthGuard
                    requireAuth={true}
                    allowedRoles={['مدير', 'دعم فني']}
                  >
                    <SupportSystem />
                  </AuthGuard>
                }
              />
              <Route
                path='/sme-portal'
                element={
                  <AuthGuard requireAuth={true} allowedRoles={['مدير', 'عمل']}>
                    <SMEBusinessPortal />
                  </AuthGuard>
                }
              />
              {/* Store & Product Routes */}
              <Route path='/store/:storeId' element={<StoreProducts />} />
              {/* Legal & Policy Routes */}
              <Route path='/privacy-policy' element={<PrivacyPolicy />} />
              <Route path='/terms-of-service' element={<TermsOfService />} />
              <Route
                path='/data-protection-policy'
                element={<DataProtectionPolicy />}
              />
              <Route path='/return-policy' element={<ReturnPolicy />} />
              <Route path='/payment-methods' element={<PaymentMethods />} />
              <Route path='/company/:companyName' element={<CompanyInfo />} />
              {/* Redirects */}
              <Route
                path='/add-product'
                element={<Navigate to='/store-owner/add-product' replace />}
              />
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </div>
      {/* Footer - Only show on non-auth pages */}
      {isAuthPage && <Footer />}
      {/* تم إزالة أيقونة الواتساب من أسفل الموقع */}
      {/* Active Accounts Display - Hidden */}
      {/* {isLoggedIn() && !isAuthPage && <ActiveAccountsDisplay />} */}
      {/* Profit Notifications - Only show for sellers - Lazy Loaded */}
      {isLoggedIn() && !isAuthPage && (
        <ErrorBoundary>
          <Suspense fallback={null}>
            <ProfitNotifications />
          </Suspense>
        </ErrorBoundary>
      )}
      {/* Server Status Indicator */}
      <ServerStatusIndicator
        showDetails={true}
        position='bottom-right'
        autoHide={true}
        hideDelay={5000}
      />
    </ErrorBoundary>
  );
}

// Export default App component
export default App;
