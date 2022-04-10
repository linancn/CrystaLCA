import type { FC } from 'react';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
import { Button, Drawer, message, Space, Tooltip } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormSelect } from '@ant-design/pro-form';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import type { ActionType } from '@ant-design/pro-table';
import { createUnitJson } from '@/services/unitgroup/api';
import { FormattedMessage } from 'umi';

type Props = {
  unitGroupPkid: number;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const UnitJsonCreate: FC<Props> = ({ unitGroupPkid, actionRef }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const formRefEdit = useRef<ProFormInstance>();

  const reload = useCallback(() => {
    actionRef.current?.reload();
  }, [actionRef]);

  return (
    <>
      <Tooltip title={<FormattedMessage id="options.create" defaultMessage="Create" />}>
        <Button
          size={'middle'}
          type="text"
          icon={<PlusOutlined />}
          onClick={() => setDrawerVisible(true)}
        />
      </Tooltip>
      <Drawer
        title={<FormattedMessage id="options.create" defaultMessage="Create" />}
        width="400px"
        closable={false}
        extra={
          <Button
            icon={<CloseOutlined />}
            style={{ border: 0 }}
            onClick={() => setDrawerVisible(false)}
          />
        }
        maskClosable={false}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        footer={
          <Space size={'middle'} className={styles.footer_right}>
            <Button onClick={() => setDrawerVisible(false)}>
              {' '}
              <FormattedMessage id="options.cancel" defaultMessage="Cancel" />
            </Button>
            <Button onClick={() => formRefEdit.current?.submit()} type="primary">
              <FormattedMessage id="options.submit" defaultMessage="Submit" />
            </Button>
          </Space>
        }
      >
        <ProForm
          formRef={formRefEdit}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            createUnitJson({
              ...values,
              unitGroupPkid,
            }).then(async (result) => {
              if (result === 'ok') {
                message.success(
                  <FormattedMessage
                    id="options.createsuccess"
                    defaultMessage="Created Successfully!"
                  />,
                );
                setDrawerVisible(false);
                reload();
              } else {
                message.error(result);
              }
            });
            return true;
          }}
        >
          <ProFormText
            width="md"
            name="name"
            label={<FormattedMessage id="unitgroup.dataName" defaultMessage="Data Name" />}
          />
          <ProFormText
            width="md"
            name="conversionFactor"
            label={
              <FormattedMessage
                id="unitgroup.conversionFactor"
                defaultMessage="Conversion Factor"
              />
            }
          />
          <ProFormSelect
            options={[
              {
                value: 'true',
                label: 'true',
              },
              {
                value: 'false',
                label: 'false',
              },
            ]}
            width="md"
            name="referenceUnit"
            label={
              <FormattedMessage id="unitgroup.referenceUnit" defaultMessage="Reference Unit" />
            }
          />
          <ProFormTextArea
            width="md"
            name="description"
            label={<FormattedMessage id="unitgroup.description" defaultMessage="Description" />}
          />
        </ProForm>
      </Drawer>
    </>
  );
};

export default UnitJsonCreate;
