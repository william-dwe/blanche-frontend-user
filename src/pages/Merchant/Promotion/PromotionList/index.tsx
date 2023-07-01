import React from 'react';
import { PromotionList, SEO } from '../../../../components';
import style from './index.module.scss';

const Promotion: React.FC = () => {
  return (
    <>
      <SEO title="Promotion" description="Promotion page" />
      <div className={style.promotion__page}>
        <div className={style.promotion__page__header}>
          <h3 className={style.promotion__page__header__title}>
            Promotion List
          </h3>
        </div>
        <PromotionList />
      </div>
    </>
  );
};

export default Promotion;
