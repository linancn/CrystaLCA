import type { FC } from 'react';
import { useState } from 'react';
import { Button, Descriptions, Drawer, Space, Tooltip } from 'antd';
import { CloseOutlined, ProfileOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getUnitGroupByPkid } from '@/services/unitgroup/api';
import type { ActionType } from '@ant-design/pro-table';
import UnitGroupEdit from './edit';
import UnitGroupDelete from './delete';
import styles from '@/style/custom.less';
type Props = {
  pkid: number;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const UnitGroupView: FC<Props> = ({ pkid, actionRef }) => {
  const [viewDescriptions, setViewDescriptions] = useState<JSX.Element>();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [footerButtons, setFooterButtons] = useState<JSX.Element>();

  const onView = () => {
    setDrawerVisible(true);
    getUnitGroupByPkid(pkid).then(async (result) => {
      setViewDescriptions(
        <Descriptions column={1}>
          <Descriptions.Item label="Data Name">{result.dataName}</Descriptions.Item>
          <Descriptions.Item label="Last Change">
            {moment(result.lastChange).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="Description">{result.description}</Descriptions.Item>
          <Descriptions.Item label="Version">{result.version}</Descriptions.Item>
        </Descriptions>,
      );
    });
    setFooterButtons(
      <>
        <UnitGroupEdit
          pkid={pkid}
          buttonType={'text'}
          actionRef={actionRef}
          setViewDrawerVisible={setDrawerVisible}
        />
        <UnitGroupDelete
          pkid={pkid}
          buttonType={'text'}
          actionRef={actionRef}
          setViewDrawerVisible={setDrawerVisible}
        />
      </>,
    );
  };
  return (
    <>
      <Tooltip title="View">
        <Button shape="circle" icon={<ProfileOutlined />} size="small" onClick={onView} />
      </Tooltip>
      <Drawer
        title="View"
        width="400px"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => setDrawerVisible(false)}
          />
        }
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            {footerButtons}
          </Space>
        }
        maskClosable={true}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      >
        {viewDescriptions}
      </Drawer>
    </>
  );
};

export default UnitGroupView;
