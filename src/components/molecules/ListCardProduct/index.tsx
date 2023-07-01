import { Col, Row } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { IGetProductListResponse } from '../../../helpers/types';
import CardProduct from '../CardProduct';
import ListCardProductSkeleton from './ListCardProductSkeleton';

interface ListCardProductProps {
  data: IGetProductListResponse | undefined;
  isLoading: boolean;
  grid?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

const ListCardProduct: React.FC<ListCardProductProps> = ({
  data,
  isLoading,
  grid = { xs: 12, sm: 8, md: 6, lg: 6, xl: 4 },
}) => {
  const { slug } = useParams();

  if (isLoading) {
    return <ListCardProductSkeleton />;
  }

  return (
    <Row gutter={[16, 32]}>
      {data?.products
        .filter((product) => product.slug !== slug)
        .map((product) => (
          <Col
            xs={grid.xs}
            sm={grid.sm}
            md={grid.md}
            lg={grid.lg}
            xl={grid.xl}
            key={product.id}
          >
            <CardProduct isLoading={isLoading} product={product} />
          </Col>
        ))}
    </Row>
  );
};

export default ListCardProduct;
