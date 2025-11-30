import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus, faShoppingBag } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const taxRate = 0.08; // 8% tax
  const shipping = getCartTotal() > 0 ? 299.70 : 0; // 9.99 USD = 299.70 EGP

  const subtotal = getCartTotal();
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shipping;
  const itemsCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 sm:py-16 lg:py-20 mt-[110px] sm:mt-[120px] lg:mt-0">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-100 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faShoppingBag} className="text-5xl sm:text-6xl text-gray-400" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mb-8 max-w-md mx-auto">
            Start shopping to add items to your cart and enjoy our amazing products
          </p>
          <Link to="/products">
            <button className="bg-white text-gray-900 border-2 border-black px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-lg hover:bg-[#ff5252] hover:text-white hover:border-[#ff5252] transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12 mt-[110px] sm:mt-[120px] lg:mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {itemsCount} {itemsCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
              {/* Cart Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-0">
                  Cart Items ({itemsCount})
                </h2>
                <button
                  onClick={clearCart}
                  className="text-sm sm:text-base text-[#ff5252] hover:text-[#e53935] font-semibold transition-colors duration-200 flex items-center gap-2 focus:outline-none"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-xs sm:text-sm" />
                  <span>Clear Cart</span>
                </button>
              </div>
              
              {/* Cart Items List */}
              <div className="space-y-4 sm:space-y-6">
                {cart.items.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pb-4 sm:pb-6 ${
                      index !== cart.items.length - 1 ? 'border-b border-gray-200' : ''
                    }`}
                  >
                    {/* Product Image */}
                    <div className="w-full sm:w-24 h-48 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1 w-full sm:w-auto">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                        {item.name}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-0">
                        {item.price.toFixed(2)} EGP per item
                      </p>
                      
                      {/* Mobile: Quantity and Price */}
                      <div className="sm:hidden flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg border-2 border-black bg-white text-gray-900 flex items-center justify-center hover:bg-[#ff5252] hover:text-white hover:border-[#ff5252] transition-all duration-300 font-semibold focus:outline-none"
                          >
                            <FontAwesomeIcon icon={faMinus} className="text-xs" />
                          </button>
                          <span className="w-10 text-center font-semibold text-base">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg border-2 border-black bg-white text-gray-900 flex items-center justify-center hover:bg-[#ff5252] hover:text-white hover:border-[#ff5252] transition-all duration-300 font-semibold focus:outline-none"
                          >
                            <FontAwesomeIcon icon={faPlus} className="text-xs" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-base text-gray-900">
                            {(item.price * item.quantity).toFixed(2)} EGP
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Desktop: Quantity Controls */}
                    <div className="hidden sm:flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 rounded-lg border-2 border-black bg-white text-gray-900 flex items-center justify-center hover:bg-[#ff5252] hover:text-white hover:border-[#ff5252] transition-all duration-300 font-semibold focus:outline-none"
                      >
                        <FontAwesomeIcon icon={faMinus} className="text-sm" />
                      </button>
                      <span className="w-12 text-center font-semibold text-base">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 rounded-lg border-2 border-black bg-white text-gray-900 flex items-center justify-center hover:bg-[#ff5252] hover:text-white hover:border-[#ff5252] transition-all duration-300 font-semibold focus:outline-none"
                      >
                        <FontAwesomeIcon icon={faPlus} className="text-sm" />
                      </button>
                    </div>
                    
                    {/* Desktop: Price and Remove */}
                    <div className="hidden sm:block text-right min-w-[120px]">
                      <p className="font-bold text-lg text-gray-900 mb-2">
                        {(item.price * item.quantity).toFixed(2)} EGP
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-[#ff5252] hover:text-[#e53935] font-medium transition-colors duration-200 flex items-center gap-1 justify-end focus:outline-none"
                      >
                        <FontAwesomeIcon icon={faTrash} className="text-xs" />
                        <span>Remove</span>
                      </button>
                    </div>
                    
                    {/* Mobile: Remove Button */}
                    <div className="sm:hidden w-full">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-full text-sm text-[#ff5252] hover:text-[#e53935] font-medium transition-colors duration-200 flex items-center gap-2 justify-center py-2 border border-[#ff5252] rounded-lg hover:bg-[#ff5252] hover:text-white focus:outline-none"
                      >
                        <FontAwesomeIcon icon={faTrash} className="text-xs" />
                        <span>Remove Item</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 sticky top-24 lg:top-28">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base">Subtotal</span>
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">{subtotal.toFixed(2)} EGP</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base">Shipping</span>
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">{shipping.toFixed(2)} EGP</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base">Tax (8%)</span>
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">{tax.toFixed(2)} EGP</span>
                </div>
                <div className="border-t-2 border-gray-300 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg sm:text-xl font-bold text-gray-900">Total</span>
                    <span className="text-lg sm:text-xl font-bold text-[#ff5252]">{total.toFixed(2)} EGP</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-white text-gray-900 border-2 border-black px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-lg hover:bg-[#ff5252] hover:text-white hover:border-[#ff5252] transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none">
                  Proceed to Checkout
                </button>
                
                <Link to="/products" className="block">
                  <button className="w-full bg-white text-gray-900 border-2 border-black px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-lg hover:bg-[#ff5252] hover:text-white hover:border-[#ff5252] transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none">
                    Continue Shopping
                  </button>
                </Link>
              </div>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>Free shipping on orders over 400 EGP. 30-day easy returns.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;