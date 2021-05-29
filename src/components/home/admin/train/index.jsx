// 员工参与的公司培训

import style from './style.module.css';
import React, { useState } from 'react';
import { Table, Card, Input, Button, Alert, Tag } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  PlusOutlined,
  RedoOutlined
} from '@ant-design/icons';
import _ from 'lodash';
const { Search } = Input;

function Train() {
  // 搜索框的数据源(受控组件)
  const [searchValue, setSearchValue] = useState(""); 
  // 表格的列(固定值)
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      ellipsis: true,
    },
    {
      title: '训练',
      dataIndex: 'train',
      key: 'train',
      ellipsis: true,
    },
    {
      title: '评分',
      dataIndex: 'score',
      key: 'score',
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: "action",
      ellipsis: true
    }
  ]
  // 表格数据源(发送网络请求)
  const [data, setData] = useState(
    [
      {
        key: '1',
        id: '004',
        train: <Tag color="success">商务合作</Tag>,
        score: 400,
        action:
          <span>
            <a href="" className={style.actionLink}>编辑</a>
            <a href="" className={`${style.actionLink} ${style.lastActionLink}`} onClick={e => deleteByKey(e, '1')}>删除</a>
          </span>
      },
      {
        key: '2',
        id: '007',
        train: <Tag color="success">入职培训</Tag>,
        score: 200,
        action:
          <span> 
            <a href="" className={style.actionLink}>编辑</a>
            <a href="" className={`${style.actionLink} ${style.lastActionLink}` } onClick={e => deleteByKey(e, '2')}>删除</a>
          </span>
      },
      {
        key: '3',
        id: '003',
        train: <Tag color="success">商务合作</Tag>,
        score: 300,
        action:
          <span>
            <a href="" className={style.actionLink}>编辑</a>
            <a href="" className={`${style.actionLink} ${style.lastActionLink}` } onClick={e => deleteByKey(e, '3')}>删除</a>
          </span>
      },
      {
        key: '4',
        id: '002',
        train: <Tag color="success">入职培训</Tag>,
        score: 400,
        action:
          <span>
            <a href="" className={style.actionLink}>编辑</a>
            <a href="" className={`${style.actionLink} ${style.lastActionLink}`} onClick={e => deleteByKey(e, '4')}>删除</a>
          </span>
      },
    ]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  // 监听搜索输入框的改变
  const handleInputChange = e => {
    setSearchValue(e.target.value);
  }
  // 搜索后对表格进行筛选
  const onSearch = value => {
    // 值为空时不执行setData
    if (value) setData(data.filter(item => item.id === value));
    else initTable();
  }
  // 页码变化时改变表格数据
  const handleTableChange = (pagination) => {
    console.log(pagination);
  }
  // 监听选中的数据改变
  const onSelectChange = selectedRowKeys => {
    // console.log(selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  }
  // 监听批量更新按钮的点击事件
  const batchUpdate = () => {
    setLoading(true);
  }
  // 监听批量删除按钮的点击事件
  const batchDelete = () => {
    setLoading(true);

    // lodash实现数组深拷贝
    const arr = _.cloneDeep(data);
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < selectedRowKeys.length; j++) {
        if (arr[i].key === selectedRowKeys[j]) {
          arr.splice(i, 1);
        }
      }
    }
    setData(arr);
    setSelectedRowKeys([]);
    setLoading(false);
  }
  // 监听重置按钮的点击事件
  const refreshTable = () => {
    setSearchValue("");
    initTable();
  }
  // 监听单行删除按钮的点击
  const deleteByKey = (e, key) => {
    e.preventDefault();
    setData(data.filter(item => item.key !== key));
  }
  // 重置和清空搜索框时初始化表格(发送网络请求)
  const initTable = () => {
    setData([
      {
        key: '1',
        id: '004',
        train: <Tag color="success">商务合作</Tag>,
        score: 400,
        action:
          <span>
            <a href="" className={style.actionLink}>编辑</a>
            <a href="" className={`${style.actionLink} ${style.lastActionLink}`} onClick={e => deleteByKey(e, '1')}>删除</a>
          </span>
      },
      {
        key: '2',
        id: '007',
        train: <Tag color="success">入职培训</Tag>,
        score: 200,
        action:
          <span> 
            <a href="" className={style.actionLink}>编辑</a>
            <a href="" className={`${style.actionLink} ${style.lastActionLink}`} onClick={e => deleteByKey(e, '2')}>删除</a>
          </span>
      },
      {
        key: '3',
        id: '003',
        train: <Tag color="success">商务合作</Tag>,
        score: 300,
        action:
          <span>
            <a href="" className={style.actionLink}>编辑</a>
            <a href="" className={`${style.actionLink} ${style.lastActionLink}`} onClick={e => deleteByKey(e, '3')}>删除</a>
          </span>
      },
      {
        key: '4',
        id: '002',
        train: <Tag color="success">入职培训</Tag>,
        score: 400,
        action:
          <span>
            <a href="" className={style.actionLink}>编辑</a>
            <a href="" className={`${style.actionLink} ${style.lastActionLink}`} onClick={e => deleteByKey(e, '4')}>删除</a>
          </span>
      },
    ])
  }
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <Card title={<span style={{ fontSize: "30px", fontWeight: 700 }}>员工参与的公司培训表</span>} style={{ width: "100%", marginTop: "20px" }}>
        <Search
          value={searchValue}
          placeholder="请输入"
          allowClear
          enterButton={<Button type="primary" icon={<SearchOutlined />}>查询</Button>}
          size="large"
          onChange={handleInputChange}
          onSearch={onSearch}
          addonBefore={<span>ID:</span>}
          className={style.searchInput}
        />
        <div>
          <Button type="primary" size="middle" icon={<PlusOutlined />} className={style.btn}>新建</Button>
          <Button type="default" onClick={batchUpdate} disabled={!hasSelected} loading={loading} size="middle" icon={<EditOutlined />} className={style.btn}>批量更新</Button>
          <Button type="danger" onClick={batchDelete} disabled={!hasSelected} loading={loading} size="middle" icon={<DeleteOutlined />} className={style.btn}>批量删除</Button>
          <Button type="default" size="middle" icon={<RedoOutlined />} className={style.btn} onClick={refreshTable}>重置</Button>
        </div>
        <Alert
          className={style.alert}
          type="info"
          message={`一共 ${data.length} 项---` + (hasSelected ? `已选择 ${selectedRowKeys.length} 项` : '请选择要操作的项来执行更多功能')} />
        <Table rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange
        }} columns={columns} dataSource={data} onChange={handleTableChange} />
      </Card>
    </div>
  );
}

export default Train;
