import React, { useState } from 'react';
import screenfull from 'screenfull';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { message } from 'antd';

const FullScreen = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const changedFullscreen = () => {
    if (!screenfull.isEnabled) {
      message.warning('you browser can not work');
      return false;
    }
    screenfull.toggle();
  };
  return (
    <>
      {isFullscreen ? (
        <FullscreenExitOutlined
          style={{ fontSize: '24px', marginRight: '20px' }}
          title="全屏"
          onClick={() => {
            changedFullscreen();
            setIsFullscreen(false);
          }}
        />
      ) : (
        <FullscreenOutlined
          style={{ fontSize: '24px', marginRight: '20px' }}
          title="取消全屏"
          onClick={() => {
            changedFullscreen();
            setIsFullscreen(true);
          }}
        />
      )}
    </>
  );
};

export default FullScreen;
