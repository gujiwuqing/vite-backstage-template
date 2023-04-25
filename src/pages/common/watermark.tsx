import React from 'react';
import { Watermark } from 'antd';

const WatermarkPage: React.FC = () => (
    <Watermark
        height={30}
        width={130}
        content="Ant Design"
        image="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original"
    >
        <div style={{ height: 500 }} />
    </Watermark>
);

export default WatermarkPage;
