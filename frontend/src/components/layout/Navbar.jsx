import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
// FontAwesome (ONE import only)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// cspell:ignore Crosshairs
import { faTruckFast, faRotateLeft, faCircleQuestion, faLocationCrosshairs, faMagnifyingGlass, faHeart, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartItemsCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categoriesList = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'all', label: 'All Products' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'clothing', label: 'Clothing' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'home-living', label: 'Home & Living', categoryId: 'home' },
  ];
  const categorySearch = new URLSearchParams(location.search);
  const activeCategory = categorySearch.get('category') || 'all';
  const isProductsPage = location.pathname.startsWith('/products');

  return (
<>
<header className="bg-white fixed lg:sticky left-0 w-full top-0 lg:-top-[47px] z-[101] shadow-sm">
  {/* Top Strip */}
  <div className={`top-strip hidden lg:block py-2 border-t-[1px] border-b-[1px] border-gray-200 bg-gray-50 sticky top-0 transition-transform duration-300 ${isScrolled ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-gray-700">
      {/* Left Side */}
      <div className="flex items-center gap-6">
        <p className="text-[12px] font-[500] flex items-center gap-2">
          <FontAwesomeIcon icon={faTruckFast} className="text-gray-600" />
          Free Shipping on orders over EGP 400
        </p>
        <span className="h-4 w-[1px] bg-gray-300"></span>
        <p className="text-[12px] font-[500] flex items-center gap-2">
          <FontAwesomeIcon icon={faRotateLeft} className="text-gray-600" />
          30-Day Easy Returns
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        <Link to="/help-center" className="flex items-center gap-1 text-[12px] font-[500] hover:text-black transition">
          <FontAwesomeIcon icon={faCircleQuestion} className="text-gray-600 text-[13px]" /> Help Center
        </Link>
        <Link to="/order-tracking" className="flex items-center gap-1 text-[12px] font-[500] hover:text-black transition">
          <FontAwesomeIcon icon={faLocationCrosshairs} className="text-gray-600 text-[13px]" /> Track Order
        </Link>
      </div>
    </div>
  </div>

  {/* Main Header */}
  <div className="header py-2 lg:py-4 border-b-[1px] border-gray-200">
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Logo */}
      <div className="w-[40%] lg:w-[25%]">
        <Link to="/" className="flex items-center gap-1">
          <span className="text-3xl font-bold text-red-600">Shopera</span>
          <span className="text-3xl font-bold text-black">.eg</span>
        </Link>
      </div>

      {/* Search */}
      <div className={`fixed inset-0 lg:static lg:w-[40%] bg-white z-50 p-2 lg:p-0 ${isSearchOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="w-full h-[50px] bg-[#e5e5e5] rounded-md relative flex items-center">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full h-full px-3 text-[15px] bg-inherit focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="absolute right-2 w-9 h-9 rounded-full flex items-center justify-center text-black focus:outline-none"
            onClick={() => console.log('Search:', searchQuery)}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#4e4e4e] text-[22px]" />
          </button>
          {/* Close mobile search */}
          <button
            className="lg:hidden absolute right-12 w-9 h-9 rounded-full flex items-center justify-center text-black focus:outline-none"
            onClick={() => setIsSearchOpen(false)}
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em">
              <path d="M289.94 256l95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 lg:gap-6 w-[20%] lg:w-[30%] justify-end">
        {/* Login/Register */}
        <div className="hidden lg:flex items-center gap-2 text-[15px] font-medium">
          <Link to="/login" className="text-gray-700 hover:text-[#FF3B3B] transition-colors">Login</Link>
          <span className="text-gray-400">|</span>
          <Link to="/register" className="text-gray-700 hover:text-[#FF3B3B] transition-colors">Register</Link>
        </div>

        {/* Favorites */}
        <Link to="/favorites" className="relative">
          <FontAwesomeIcon icon={faHeart} className="w-5 h-5 text-gray-700 hover:text-[#FF3B3B] transition-colors" />
          <span className="absolute -top-1 -right-1 bg-[#FF3B3B] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
        </Link>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5 text-gray-700 hover:text-[#FF3B3B] transition-colors" />
          {getCartItemsCount() > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#FF3B3B] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{getCartItemsCount()}</span>
          )}
        </Link>
      </div>
    </div>
  </div>

{/* Categories Navigation */}
<nav className="navigation">
  <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="w-full lg:w-[60%] mx-auto flex items-center h-[60px] py-2">
      <Swiper
        spaceBetween={15}
        slidesPerView="auto"
        freeMode={true}
        className="mySwiper h-full"
      >
        {categoriesList.map((cat) => {
          const targetCategory = cat.categoryId || cat.id;
          const to = cat.path || `/products?category=${encodeURIComponent(targetCategory)}`;
          const isActive = cat.id === 'home'
            ? location.pathname === '/'
            : isProductsPage && activeCategory === targetCategory;
          return (
            <SwiperSlide key={cat.id} className="!w-auto flex items-center h-full">
              <Link
                to={to}
                className={`px-3 text-[14px] font-[500] transition text-[rgba(0,0,0,0.8)] hover:text-[#ff5252] ${
                  isActive ? 'text-[#ff5252]' : ''
                }`}
              >
                {cat.label}
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  </div>
</nav>



</header>

  {/* Bottom Tab Bar - Mobile Only */}
  <div className="
    lg:hidden 
    fixed bottom-0 left-0 right-0 
    bg-white 
    border-t-2 border-red-500 
    shadow-[0_-4px_20px_rgba(0,0,0,0.12)]
    rounded-t-3xl
    px-3 py-1.2
    z-[100]
    backdrop-blur-lg
  ">
    <div className="flex items-center justify-around h-[60px] px-2">
      {/* Search Button */}
      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors active:bg-gray-50 rounded-lg focus:outline-none"
      >
        <FontAwesomeIcon 
          icon={faMagnifyingGlass} 
          className={`text-[20px] transition-colors ${
            isSearchOpen ? 'text-[#FF3B3B]' : 'text-gray-600'
          }`} 
        />
        <span className={`text-[11px] font-medium transition-colors ${
          isSearchOpen ? 'text-[#FF3B3B]' : 'text-gray-600'
        }`}>
          Search
        </span>
      </button>

      {/* Divider */}
      <div className="w-[1px] h-8 bg-gray-200"></div>

      {/* Login Button */}
      <Link
        to="/login"
        className="flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors active:bg-gray-50 rounded-lg focus:outline-none"
      >
        <FontAwesomeIcon 
          icon={faUser} 
          className={`text-[20px] transition-colors ${
            location.pathname === '/login' ? 'text-[#FF3B3B]' : 'text-gray-600'
          }`} 
        />
        <span className={`text-[11px] font-medium transition-colors ${
          location.pathname === '/login' ? 'text-[#FF3B3B]' : 'text-gray-600'
        }`}>
          Login
        </span>
      </Link>

      {/* Divider */}
      <div className="w-[1px] h-8 bg-gray-200"></div>

      {/* Register Button */}
      <Link
        to="/register"
        className="flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors active:bg-gray-50 rounded-lg focus:outline-none"
      >
        <div className="relative">
          <FontAwesomeIcon 
            icon={faUser} 
            className={`text-[20px] transition-colors ${
              location.pathname === '/register' ? 'text-[#FF3B3B]' : 'text-gray-600'
            }`} 
          />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#FF3B3B] rounded-full border border-white"></span>
        </div>
        <span className={`text-[11px] font-medium transition-colors ${
          location.pathname === '/register' ? 'text-[#FF3B3B]' : 'text-gray-600'
        }`}>
          Register
        </span>
      </Link>
    </div>
  </div>
</>

  );

};

export default Navbar;
  