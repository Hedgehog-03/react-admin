import React from 'react';
import {
  Table,
  Card,
  Input,
  Button,
  Alert,
  Modal,
  Form,
  DatePicker,
  Pagination
} from 'antd';
import {
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined
} from '@ant-design/icons';

import style from './style.module.css';
import useTrain from './useTrain';
import {
  CARD_TITLE,
  CREATE_MODAL_TITLE,
  DELETE_MODAL_TITLE,
  SEARCH_PLACEHOLDER
} from './const';

function Train() {
  const {
    searchValue,
    handleInputChange,
    setNewItemModalVisible,
    batchDelete,
    hasSelected,
    columns,
    setData,
    setSelectedRowKeys,
    batchDeleteModalVisible,
    handleBatchDeleteOk,
    handleBatchDeleteCancel,
    validateMessages,
    newItemModalVisible,
    handleTableChange,
    pagination,
    intersectionArr,
    noActionColumns,
    handleNewItemCancel,
    loading,
    onNewItemModalFinish
  } = useTrain();

  return (
    <div>
      <Card
        title={
          <span style={{ fontSize: '30px', fontWeight: 700 }}>
            {CARD_TITLE}
          </span>
        }
        style={{ width: '100%', marginTop: '20px' }}
      >
        <Input.Search
          value={searchValue}
          placeholder={SEARCH_PLACEHOLDER}
          allowClear
          enterButton={
            <Button type='primary' icon={<SearchOutlined />}>
              查询
            </Button>
          }
          size='large'
          onChange={handleInputChange}
          onSearch={val => {
            val &&
              setData(
                data.filter(item => {
                  const isSearch = item.id === Number(val);
                  return isSearch;
                })
              );
          }}
          addonBefore={<span>ID:</span>}
          className='searchInput'
        />
        <div>
          <Button
            type='primary'
            onClick={e => setNewItemModalVisible(true)}
            size='middle'
            icon={<PlusOutlined />}
            className='btn'
          >
            新建
          </Button>
          <Button
            type='danger'
            onClick={batchDelete}
            disabled={!hasSelected}
            loading={loading}
            size='middle'
            icon={<DeleteOutlined />}
            className='btn'
          >
            批量删除
          </Button>
        </div>
        <Alert
          className={style.alert}
          type='info'
          message={
            `一共 ${data.length} 项---` +
            (hasSelected
              ? `已选择 ${selectedRowKeys.length} 项`
              : '请选择要操作的项来执行更多功能')
          }
        />
        <Table
          columns={columns}
          dataSource={data}
          style={{ marginBottom: '15px' }}
          rowKey='id'
          rowSelection={{
            selectedRowKeys,
            onChange: selectedRowKeys => setSelectedRowKeys(selectedRowKeys)
          }}
          pagination={false}
        />
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={total}
          onChange={handleTableChange}
        />
      </Card>
      <Modal
        title={DELETE_MODAL_TITLE}
        visible={batchDeleteModalVisible}
        onOk={handleBatchDeleteOk}
        onCancel={handleBatchDeleteCancel}
        okText='删除'
        cancelText='取消'
        width={1000}
      >
        <Alert type='warning' message={`一共${intersectionArr.length}项`} />
        <Table
          rowKey='id'
          columns={noActionColumns}
          dataSource={intersectionArr}
        />
      </Modal>
      <Modal
        title={CREATE_MODAL_TITLE}
        visible={newItemModalVisible}
        onCancel={handleNewItemCancel}
        footer={null}
        getContainer={false}
      >
        <Form
          validateMessages={validateMessages}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 15 }}
          form={form}
          onFinish={onNewItemModalFinish}
        >
          <Form.Item
            name='id'
            label='员工ID'
            hasFeedback
            rules={[
              {
                required: true,
                type: 'number',
                transform(value) {
                  if (value) {
                    return Number(value);
                  }
                }
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='trainingMethod'
            label='训练项目'
            hasFeedback
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='startTime'
            label='开始日期'
            hasFeedback
            rules={[{ required: true }]}
          >
            <DatePicker placeholder='' style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name='endTime'
            label='结束日期'
            hasFeedback
            dependencies={['startTime']}
            rules={[
              {
                required: true
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('startTime') < value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('开始日期应早于结束日期！'));
                }
              })
            ]}
          >
            <DatePicker placeholder='' style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name='score'
            label='评分'
            hasFeedback
            rules={[
              {
                required: true,
                type: 'number',
                transform(value) {
                  if (value) {
                    return Number(value);
                  }
                },
                min: 0,
                max: 100
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6 }}>
            <Button type='primary' htmlType='submit' className='btn'>
              新建
            </Button>
            <Button
              htmlType='button'
              onClick={handleNewItemCancel}
              className='btn'
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Train;
