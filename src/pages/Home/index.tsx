import React from 'react';
import {
  CategoryCarousel,
  PromotionBanner,
  Recommended,
  SEO,
} from '../../components';
import style from './index.module.scss';

const Home: React.FC = () => {
  return (
    <>
      <SEO title="The Best Ecommerce Around" description="Home page" />
      <PromotionBanner />
      <div className={style.home}>
        <CategoryCarousel />
        <Recommended />
      </div>
    </>
  );
};

export default Home;
