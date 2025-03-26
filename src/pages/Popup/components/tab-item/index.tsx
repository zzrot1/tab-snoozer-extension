import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { animate, MotionValue, Reorder, useMotionValue } from 'motion/react';
import { useTabController } from '../../../../controllers';

const initialItems = ['🍅 Tomato', '🥒 Cucumber', '🧀 Cheese', '🥬 Lettuce'];

export const TabItem = () => {
  const { tabManager } = useTabController();
  const [items, setItems] = useState(initialItems);
  console.log(tabManager);
  return (
    <Reorder.Group
      axis="y"
      onReorder={setItems}
      values={items}
      style={{ height: 100, border: '1px solid black', overflowY: 'auto' }}
      layoutScroll
    >
      {items.map((item) => (
        <Item key={item} item={item} />
      ))}
    </Reorder.Group>
  );
};

export const Item = (props: { item: string }) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);

  return (
    <Reorder.Item value={props.item} id={props.item} style={{ boxShadow, y }}>
      <span>{props.item}</span>
    </Reorder.Item>
  );
};

const inactiveShadow = '0px 0px 0px rgba(0,0,0,0.8)';

export function useRaisedShadow(value: MotionValue<number>) {
  const boxShadow = useMotionValue(inactiveShadow);

  useEffect(() => {
    let isActive = false;
    value.onChange((latest) => {
      const wasActive = isActive;
      if (latest !== 0) {
        isActive = true;
        if (isActive !== wasActive) {
          animate(boxShadow, '5px 5px 10px rgba(0,0,0,0.3)');
        }
      } else {
        isActive = false;
        if (isActive !== wasActive) {
          animate(boxShadow, inactiveShadow);
        }
      }
    });
  }, [value, boxShadow]);

  return boxShadow;
}
