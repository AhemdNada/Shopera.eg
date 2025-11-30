import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const ProductCardSlider = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className="w-3 h-3 text-yellow-500"
          fill={i <= rating ? 'currentColor' : 'none'}
          stroke={i <= rating ? 'currentColor' : 'currentColor'}
          viewBox="0 0 24 24"
        >
          {i <= rating ? (
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          ) : (
            <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
          )}
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="productItem shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)]">
      <div className="group imgWrapper w-[100%] overflow-hidden rounded-md rounded-bl-none rounded-br-none relative">
        <Link to={product.link || `/product/${product.id}`}>
          <div className="img h-[200px] overflow-hidden relative">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.hoverImage && (
              <img
                src={product.hoverImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105"
              />
            )}
          </div>
        </Link>
        {discount > 0 && (
          <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-primary text-white rounded-lg p-1 text-[12px] font-[500]">
            {discount}%
          </span>
        )}
        <div className="actions absolute top-[-20px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
          <button
            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white group transition-colors flex items-center justify-center"
            type="button"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-[18px] !text-black group-hover:text-white" height="1em" width="1em">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="m15 3 2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3h-6zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3v6zm6 12-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6h6zm12-6-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6v-6z"></path>
            </svg>
          </button>
          <button
            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white group transition-colors flex items-center justify-center"
            type="button"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-[18px] !text-black group-hover:text-white" height="1em" width="1em">
              <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="m304 160-64-64 64-64m-97 320 64 64-64 64"></path>
              <circle cx="112" cy="96" r="48" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></circle>
              <circle cx="400" cy="416" r="48" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></circle>
              <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M256 96h84a60 60 0 0 1 60 60v212m-145 48h-84a60 60 0 0 1-60-60V144"></path>
            </svg>
          </button>
          <button
            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-primary hover:text-white group transition-colors flex items-center justify-center"
            type="button"
          >
            <FontAwesomeIcon icon={faHeart} className="text-[18px] !text-black group-hover:text-white" />
          </button>
        </div>
      </div>
      <div className="info p-3 py-5 relative pb-[50px] h-[190px]">
        <h6 className="text-[13px] !font-[400]">
          <span className="link transition-all">{product.brand || 'Brand'}</span>
        </h6>
        <h3 className="text-[12px] lg:text-[13px] title mt-1 font-[500] mb-1 text-[#000]">
          <Link to={product.link || `/product/${product.id}`} className="link transition-all">
            {product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}
          </Link>
        </h3>
        <div className="flex items-center gap-1 mb-2" role="img" aria-label={`${product.rating} Stars`}>
          {renderStars(product.rating || 0)}
        </div>
        <div className="flex items-center gap-4 justify-between mb-3">
          {product.originalPrice && (
            <span className="oldPrice line-through text-gray-500 text-[12px] lg:text-[14px] font-[500]">
              ₹{product.originalPrice.toFixed(2)}
            </span>
          )}
          <span className="price text-primary text-[12px] lg:text-[14px] font-[600]">
            ₹{product.price.toFixed(2)}
          </span>
        </div>
        <div className="!absolute bottom-[15px] left-0 pl-3 pr-3 w-full">
          <button
            onClick={handleAddToCart}
            className="btn-org addToCartBtn btn-border flex w-full btn-sm gap-2 bg-transparent border-2 border-red-500 hover:bg-red-50 text-red-500 px-3 py-2 rounded text-[12px] font-[500] transition-colors items-center justify-center"
            type="button"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-[18px]" height="1em" width="1em">
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

export default ProductCardSlider;

