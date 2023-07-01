import React from 'react';
import { Collapse } from 'antd';
import style from './index.module.scss';
import classNames from 'classnames';

import { Card } from '../../atoms';

const { Panel } = Collapse;

export interface IPanel {
  header: string;
  children: React.ReactNode;
  key: string;
}

interface CollapseProps {
  defaultActiveKey: string[];
  className?: string;
  onChange?: (key: string | string[]) => void;
  panels: IPanel[];
  ghost?: boolean;
  resetChildren?: React.ReactNode;
}

const Filter: React.FC<CollapseProps> = ({
  defaultActiveKey,
  className,
  onChange,
  panels,
  ghost,
  resetChildren,
}) => {
  const classProps = classNames(style.filter, className);

  return (
    <Card className={classProps}>
      <Collapse
        defaultActiveKey={defaultActiveKey}
        onChange={onChange}
        ghost={ghost}
      >
        {panels.map((panel) => (
          <Panel header={panel.header} key={panel.key}>
            {panel.children}
          </Panel>
        ))}
      </Collapse>
      {resetChildren}
    </Card>
  );
};

export default Filter;
