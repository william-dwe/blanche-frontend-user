import { Col, Row, Skeleton } from 'antd';
import React from 'react';
import { Card } from '../../atoms';
import style from './index.module.scss';

interface ListCardProductProps {
  count?: number;
  grid?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

const CardProductSkeleton: React.FC = () => {
  return (
    <Card className={style.card__product_skeleton}>
      <Skeleton.Image
        style={{
          width: '240px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 200,
        }}
      />
      <Skeleton style={{ padding: 5 }} />
    </Card>
  );
};

interface ListCardProductProps {
  count?: number;
  grid?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

const ListCardProductSkeleton: React.FC<ListCardProductProps> = ({
  count = 12,
  grid = { xs: 12, sm: 8, md: 6, lg: 6, xl: 4 },
}) => {
  const skeletons = Array.from({ length: count }, (_, i) => (
    <Col
      xs={grid.xs}
      sm={grid.sm}
      md={grid.md}
      lg={grid.lg}
      xl={grid.xl}
      key={i}
    >
      <CardProductSkeleton />
    </Col>
  ));

  return <Row gutter={[16, 32]}>{skeletons}</Row>;
};

export default ListCardProductSkeleton;
