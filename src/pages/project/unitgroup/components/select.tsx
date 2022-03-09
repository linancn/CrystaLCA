import type { FC } from 'react';
import { useRef, useState } from 'react';
import { Button, Drawer, Space, Tabs, Tooltip } from 'antd';
import { CloseOutlined, DatabaseOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import TabPane from '@ant-design/pro-card/lib/components/TabPane';

const UnitGroupSelect: FC = () => {
  const [drawerVisible, handleDrawerVisible] = useState(false);
  const formRefCreate = useRef<ProFormInstance>();

  return (
    <>
      <Tooltip title="Select From Database">
        <Button
          size={'middle'}
          type="text"
          icon={<DatabaseOutlined />}
          onClick={() => {
            handleDrawerVisible(true);
          }}
        />
      </Tooltip>
      <Drawer
        title="Select From Database"
        width="100%"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => handleDrawerVisible(false)}
          />
        }
        maskClosable={false}
        visible={drawerVisible}
        onClose={() => handleDrawerVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => handleDrawerVisible(false)}>Cancel</Button>
            <Button onClick={() => formRefCreate.current?.submit()} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Tabs type="card" size="large">
          <TabPane tab="CrystaLCA" key="CrystaLCA">
            {/* <CrystaLCA projectId={16} /> */}
          </TabPane>
          <TabPane tab="USLCI" key="USLCI">
            {/* <USLCI /> */}
          </TabPane>
        </Tabs>
      </Drawer>
    </>
  );
};

export default UnitGroupSelect;
