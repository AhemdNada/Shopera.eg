import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products, testimonials, categories } from '../utils/data';
import ProductCard from '../components/common/ProductCard';
import Button from '../components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const featuredProducts = products.slice(0, 4);
  
  // Refs for navigation buttons and swiper instances
  const heroSliderPrevRef = useRef(null);
  const heroSliderNextRef = useRef(null);
  const heroSwiperRef = useRef(null);
  
  const popularProductsPrevRef = useRef(null);
  const popularProductsNextRef = useRef(null);
  const popularProductsSwiperRef = useRef(null);
  
  const latestProductsPrevRef = useRef(null);
  const latestProductsNextRef = useRef(null);
  const latestProductsSwiperRef = useRef(null);
  const categories = [
    {
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
      description: 'Cutting-edge technology',
      link: '/products?category=electronics'
    },
    {
      name: 'Clothing',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
      description: 'Style and comfort',
      link: '/products?category=clothing'
    },
    {
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop',
      description: 'Complete your look',
      link: '/products?category=accessories'
    },
    {
      name: 'Home & Living',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      description: 'Elevate your space',
      link: '/products?category=home'
    }
  ];

  const heroImages = [
    '/images/hero-1.png',
    '/images/hero-2.png',
    '/images/hero-3.png',
  ];

  const categorySliderItems = [
    {
      id: '69048cdd228db479bb634a90',
      name: 'Fashion',
      image: 'https://serviceapi.spicezgold.com/download/1763965324754_4819.png',
      link: '/products?catId=69048cdd228db479bb634a90'
    },
    {
      id: '69048d0c228db479bb634a95',
      name: 'Electronics',
      image: 'https://serviceapi.spicezgold.com/download/1761905929738_file_1734525218436_ele.png',
      link: '/products?catId=69048d0c228db479bb634a95'
    },
    {
      id: '69048d34228db479bb634a9a',
      name: 'Bags',
      image: 'https://serviceapi.spicezgold.com/download/1761905971086_file_1734525231018_bag.png',
      link: '/products?catId=69048d34228db479bb634a9a'
    },
    {
      id: '69048d41228db479bb634a9f',
      name: 'Footwear',
      image: 'https://serviceapi.spicezgold.com/download/1761905982766_file_1734525239704_foot.png',
      link: '/products?catId=69048d41228db479bb634a9f'
    },
    {
      id: '69048d4e228db479bb634aa4',
      name: 'Groceries',
      image: 'https://serviceapi.spicezgold.com/download/1761905996339_file_1734525248057_gro.png',
      link: '/products?catId=69048d4e228db479bb634aa4'
    },
    {
      id: '69048d57228db479bb634aa9',
      name: 'Beauty',
      image: 'https://serviceapi.spicezgold.com/download/1761906005923_file_1734525255799_beauty(1).png',
      link: '/products?catId=69048d57228db479bb634aa9'
    },
    {
      id: '69048d61228db479bb634aae',
      name: 'Wellness',
      image: 'https://serviceapi.spicezgold.com/download/1761906015678_file_1734525275367_well.png',
      link: '/products?catId=69048d61228db479bb634aae'
    },
    {
      id: '69048d6b228db479bb634ab3',
      name: 'Jewellery',
      image: 'https://serviceapi.spicezgold.com/download/1761906025549_file_1734525286186_jw.png',
      link: '/products?catId=69048d6b228db479bb634ab3'
    }
  ];

  // Prepare products for display - map products from data.js to format expected by ProductCard
  const prepareProductsForDisplay = (productsList) => {
    return productsList.map(product => ({
      ...product,
      hoverImage: product.images && product.images.length > 1 ? product.images[1] : null,
      brand: product.brand || 'Brand'
    }));
  };

  // Popular Products - filter by selected category or show all
  const getPopularProducts = () => {
    if (selectedCategory === 'all') {
      return products;
    }
    // Map category names to data.js categories
    const categoryMap = {
      'Electronics': 'electronics',
      'Clothing': 'clothing',
      'Accessories': 'accessories',
      'Home & Living': 'home'
    };
    const mappedCategory = categoryMap[selectedCategory] || 'all';
    if (mappedCategory === 'all') {
      return products;
    }
    return products.filter(p => p.category === mappedCategory);
  };

  const currentProducts = prepareProductsForDisplay(getPopularProducts());

  // Latest Products - show all products (or you can filter by date/rating if needed)
  const latestProducts = prepareProductsForDisplay(products);

  const bannerSlides = [
    {
      id: 'banner-1',
      image: '/images/banner-2.png',
      link: '/products?catId=67cfa3233c7fa6b8e3276e3d'
    },
    {
      id: 'banner-2',
      image: '/images/banner-1.png',
      link: '/products?catId=69048d4e228db479bb634aa4'
    },
    {
      id: 'banner-3',
      image: '/images/banner-3.png',
      link: '/products?subCatId=690498a5228db479bb63d529'
    },
    {
      id: 'banner-4',
      image: '/images/banner-4.png',
      link: '/products?catId=690498a5228db479bb63d529'
    }
    
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Swiper Slider */}
      <div className="homeSlider mt-[110px] sm:mt-[120px] lg:mt-0 pb-3 pt-3 lg:pb-5 lg:pt-5 relative z-[99]">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            onSwiper={(swiper) => {
              heroSwiperRef.current = swiper;
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="sliderHome rounded-[10px] overflow-hidden"
          >
            {heroImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="item rounded-[10px] overflow-hidden h-[180px] sm:h-[220px] md:h-[320px] xl:h-[420px]">
                  <img
                    src={image}
                    alt={`Banner slide ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Button
            ref={heroSliderPrevRef}
            variant="navigation"
            icon="prev"
            className="swiper-nav-btn swiper-nav-prev"
            aria-label="Previous slide"
            onClick={() => heroSwiperRef.current?.slidePrev()}
          />
          <Button
            ref={heroSliderNextRef}
            variant="navigation"
            icon="next"
            className="swiper-nav-btn swiper-nav-next"
            aria-label="Next slide"
            onClick={() => heroSwiperRef.current?.slideNext()}
          />
        </div>
      </div>

      {/* Categories Slider */}
      <div className="homeCatSlider pt-0 lg:pt-4 py-4 lg:py-8">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Swiper
            modules={[FreeMode]}
            spaceBetween={5}
            slidesPerView="auto"
            freeMode={true}
            className="mySwiper"
          >
            {categorySliderItems.map((category) => (
              <SwiperSlide key={category.id} style={{ width: 'auto' }}>
                <Link to={category.link}>
                  <div className="item py-4 lg:py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col min-w-[177px]">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-[40px] lg:w-[60px] transition-all"
                    />
                    <h3 className="text-[12px] lg:text-[15px] font-[500] mt-3">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Popular Products Section */}
      <section className="bg-white py-3 lg:py-8">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-col lg:flex-row mb-4">
            <div className="leftSec w-full lg:w-[40%] mb-4 lg:mb-0">
              <h2 className="text-[14px] sm:text-[14px] md:text-[16px] lg:text-[20px] font-[600]">
                Popular Products
              </h2>
              <p className="text-[12px] sm:text-[14px] md:text-[13px] lg:text-[14px] font-[400] mt-0 mb-0">
                Do not miss the current offers until the end of March.
              </p>
            </div>
            <div className="rightSec w-full lg:w-[60%]">
              {/* Swiper for mobile - hidden on large screens */}
              <div className="lg:hidden">
                <Swiper
                  modules={[FreeMode]}
                  spaceBetween={16}
                  slidesPerView="auto"
                  freeMode={{
                    enabled: true,
                    sticky: false,
                    momentumRatio: 0.5,
                    momentumVelocityRatio: 0.5,
                  }}
                  touchEventsTarget="container"
                  touchRatio={1}
                  resistance={true}
                  resistanceRatio={0.85}
                  className="categoryFilterSwiper"
                >
                  <SwiperSlide style={{ width: 'auto' }}>
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`px-0 py-2 text-[14px] font-[500] whitespace-nowrap transition-colors relative focus:outline-none focus:ring-0 ${
                        selectedCategory === 'all'
                          ? 'text-primary'
                          : 'text-[rgba(0,0,0,0.8)] hover:text-primary'
                      }`}
                    >
                      All
                      {selectedCategory === 'all' && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"></span>
                      )}
                    </button>
                  </SwiperSlide>
                  {['Electronics', 'Clothing', 'Accessories', 'Home & Living'].map((categoryName) => (
                    <SwiperSlide key={categoryName} style={{ width: 'auto' }}>
                      <button
                        onClick={() => setSelectedCategory(categoryName)}
                        className={`px-0 py-2 text-[14px] font-[500] whitespace-nowrap transition-colors relative focus:outline-none focus:ring-0 ${
                          selectedCategory === categoryName
                            ? 'text-primary'
                            : 'text-[rgba(0,0,0,0.8)] hover:text-primary'
                        }`}
                      >
                        {categoryName}
                        {selectedCategory === categoryName && (
                          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"></span>
                        )}
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              {/* Regular flex layout for large screens */}
              <div className="hidden lg:flex items-center justify-end gap-4 lg:gap-6">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-0 py-2 text-[14px] font-[500] whitespace-nowrap transition-colors relative focus:outline-none focus:ring-0 ${
                    selectedCategory === 'all'
                      ? 'text-primary'
                      : 'text-[rgba(0,0,0,0.8)] hover:text-primary'
                  }`}
                >
                  All
                  {selectedCategory === 'all' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"></span>
                  )}
                </button>
                {['Electronics', 'Clothing', 'Accessories', 'Home & Living'].map((categoryName) => (
                  <button
                    key={categoryName}
                    onClick={() => setSelectedCategory(categoryName)}
                    className={`px-0 py-2 text-[14px] font-[500] whitespace-nowrap transition-colors relative focus:outline-none focus:ring-0 ${
                      selectedCategory === categoryName
                        ? 'text-primary'
                        : 'text-[rgba(0,0,0,0.8)] hover:text-primary'
                    }`}
                  >
                    {categoryName}
                    {selectedCategory === categoryName && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="min-h-max lg:min-h-[60vh]">
            <div className="productsSlider pt-1 lg:pt-3 pb-0 relative">
              <Swiper
                modules={[FreeMode]}
                spaceBetween={10}
                slidesPerView="auto"
                freeMode={true}
                onSwiper={(swiper) => {
                  popularProductsSwiperRef.current = swiper;
                }}
                className="mySwiper"
              >
                {currentProducts.map((product) => (
                  <SwiperSlide key={product.id} style={{ width: 'auto', minWidth: '233px' }}>
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Button
                ref={popularProductsPrevRef}
                variant="navigation"
                icon="prev"
                className="swiper-nav-btn swiper-nav-prev"
                aria-label="Previous slide"
                onClick={() => popularProductsSwiperRef.current?.slidePrev()}
              />
              <Button
                ref={popularProductsNextRef}
                variant="navigation"
                icon="next"
                className="swiper-nav-btn swiper-nav-next"
                aria-label="Next slide"
                onClick={() => popularProductsSwiperRef.current?.slideNext()}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Products Slider */}
      <section className="py-3 lg:py-2 pt-0 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between gap-2">
            <h2 className="text-[20px] font-[600]">Latest Products</h2>
            <Link to="/products" className="flex">
              <Button
                type="button"
                variant="viewAll"
                size="sm"
                icon={faArrowRight}
                iconPosition="right"
                className="!px-4 !py-2 !text-sm !font-medium"
              >
                View All
              </Button>
            </Link>
          </div>
          <div className="productsSlider pt-1 lg:pt-3 pb-0 relative">
            <Swiper
              modules={[FreeMode]}
              spaceBetween={10}
              slidesPerView="auto"
              freeMode={true}
              onSwiper={(swiper) => {
                latestProductsSwiperRef.current = swiper;
              }}
              className="mySwiper"
            >
              {latestProducts.map((product) => (
                <SwiperSlide key={product.id} style={{ width: 'auto', minWidth: '233px' }}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
            <Button
              ref={latestProductsPrevRef}
              variant="navigation"
              icon="prev"
              className="swiper-nav-btn swiper-nav-prev"
              aria-label="Previous slide"
              onClick={() => latestProductsSwiperRef.current?.slidePrev()}
            />
            <Button
              ref={latestProductsNextRef}
              variant="navigation"
              icon="next"
              className="swiper-nav-btn swiper-nav-next"
              aria-label="Next slide"
              onClick={() => latestProductsSwiperRef.current?.slideNext()}
            />
          </div>
        </div>
      </section>

      {/* Banner Slider */}
      <section className="py-5 w-full">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Swiper
            modules={[FreeMode]}
            spaceBetween={5}
            slidesPerView="auto"
            freeMode={true}
            className="smlBtn"
          >
            {bannerSlides.map((banner) => (
              <SwiperSlide key={banner.id} style={{ width: 'auto', minWidth: '320px', maxWidth: '380px', display: 'flex', alignItems: 'flex-end' }}>
                <div className="box bannerBox overflow-hidden rounded-lg group w-full">
                  <Link to={banner.link} className="text-[16px] font-[600] link block w-full">
                    <img
                      src={banner.image}
                      alt="banner"
                      className="w-full h-auto transition-all group-hover:scale-105 group-hover:rotate-1"
                    />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>



    </div>
  );
};

export default Home;