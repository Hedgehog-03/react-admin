import React, { useState } from 'react';
import { Table, Button, Space, Card } from 'antd';

function Train() {
  const [sortedInfo, setSortInfo] = useState({});
  const [columns, setColumns] = useState(
    [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id.length - b.id.length,
        sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
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
        sorter: (a, b) => a.score.length - b.score.length,
        sortOrder: sortedInfo.columnKey === 'score' && sortedInfo.order,
        ellipsis: true,
      },
    ])
  const [data, setData] = useState(
    [
      {
        key: '1',
        id: '004',
        train: 32,
        score: 400,
      },
      {
        key: '2',
        id: '007',
        train: 42,
        score: 200,
      },
      {
        key: '3',
        id: '003',
        train: 32,
        score: 300,
      },
      {
        key: '4',
        id: '002',
        train: 55,
        score: 400,
      },
    ]);

  const setAgeSort = () => {
    setSortInfo({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };
  const handleChange = (pagination, filters, sorter) => {
    console.log(filters, sorter);
    setSortInfo(sorter);
  }
  return (
    <div>
      <Card title="员工参与的公司培训表" style={{ width: "100%", marginTop: "20px" }}>
        <p>Card content</p>
        <Table rowSelection={{
          type: "checkbox"
        }} columns={columns} dataSource={data} onChange={handleChange} />
      </Card>
    </div>
  );
}

export default Train;
