import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Rating from './Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const discount = useMemo(() => {
    if (!product.originalPrice || product.originalPrice <= 0) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  }, [product.originalPrice, product.price]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const fallbackHoverImage = product.images && product.images.length > 1 ? product.images[1] : null;

  return (
    <div className="productItem shadow-lg rounded-md overflow-hidden border border-[rgba(0,0,0,0.08)] bg-white transition-transform duration-200 hover:-translate-y-0.5">
      <div className="group imgWrapper w-full overflow-hidden rounded-md rounded-bl-none rounded-br-none relative">
        <Link to={product.link || `/product/${product.id}`} aria-label={product.name}>
          <div className="img h-[200px] overflow-hidden relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 100vw, 233px"
            />
            {(product.hoverImage || fallbackHoverImage) && (
              <img
                src={product.hoverImage || fallbackHoverImage}
                alt={`${product.name} alternate view`}
                className="w-full h-full object-cover transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            )}
          </div>
        </Link>
        {discount > 0 && (
          <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-primary text-white rounded-lg px-2 py-1 text-[12px] font-[600]">
            {discount}% OFF
          </span>
        )}
        <div className="actions absolute top-3 right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
          <button
            className="focus:outline-none focus:ring-0 w-[35px] h-[35px] min-w-[35px] rounded-full bg-white text-black hover:bg-primary hover:text-white transition-colors flex items-center justify-center shadow-md"
            type="button"
            aria-label="Compare"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-[18px] text-black hover:text-white transition-colors" height="1em" width="1em" aria-hidden="true">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="m15 3 2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3h-6zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3v6zm6 12-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6h6zm12-6-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6v-6z"></path>
            </svg>
          </button>

          <button
            className="focus:outline-none focus:ring-0 w-[35px] h-[35px] min-w-[35px] rounded-full bg-white text-black hover:bg-primary hover:text-white transition-colors flex items-center justify-center shadow-md"
            type="button"
            aria-label="Add to wishlist"
          >
            <FontAwesomeIcon icon={faHeart} className="text-[18px] text-black hover:text-white transition-colors" />
          </button>
        </div>
      </div>
      <div className="info p-3 py-5 relative pb-[50px] h-[190px]">
        <h6 className="text-[13px] font-[500] text-gray-600">
          <span className="link transition-all">{product.brand || 'Brand'}</span>
        </h6>
        <h3 className="text-[12px] lg:text-[13px] title mt-1 font-[600] mb-1 text-[#000] leading-tight">
          <Link to={product.link || `/product/${product.id}`} className="link transition-all" title={product.name}>
            {product.name.length > 50 ? `${product.name.substring(0, 50)}...` : product.name}
          </Link>
        </h3>
        <Rating rating={product.rating || 0} size="sm" showValue={false} className="mb-2" />
        <div className="flex items-center gap-4 justify-between mb-3">
          {product.originalPrice && (
            <span className="oldPrice line-through text-gray-500 text-[12px] lg:text-[14px] font-[500]">
              {product.originalPrice.toFixed(2)} EGP
            </span>
          )}
          <span className="price text-primary text-[12px] lg:text-[14px] font-[700]">
            {product.price.toFixed(2)} EGP
          </span>
        </div>
        <div className="absolute bottom-[15px] left-0 pl-3 pr-3 w-full">
          <button
            onClick={handleAddToCart}
            className="focus:outline-none focus:ring-0 btn-org addToCartBtn btn-border flex w-full btn-sm gap-2 bg-transparent border-2 border-red-500 hover:bg-red-50 text-red-500 px-3 py-2 rounded text-[12px] font-[600] transition-colors items-center justify-center"
            type="button"
            aria-label="Add to cart"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-[18px]" height="1em" width="1em" aria-hidden="true">
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0 0 20.01 4H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path>
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);