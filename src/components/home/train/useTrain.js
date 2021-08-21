import { useEffect, useState } from 'react';
import moment from 'moment';
import { Tag, Modal, message, Form } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getTrain, deleteTrain, postTrain } from '@/request/train';

export default function useTrain() {
  // 搜索框的数据源(受控组件)
  const [searchValue, setSearchValue] = useState('');
  // 表格的列(固定值)
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      ellipsis: true,
      width: 70,
      align: 'center'
    },
    {
      title: '姓名',
      dataIndex: 'staffName',
      key: 'staffName',
      ellipsis: true,
      width: 100,
      align: 'center'
    },
    {
      title: '训练',
      dataIndex: 'trainingMethod',
      key: 'trainingMethod',
      render: value => <Tag color='success'>{value}</Tag>,
      ellipsis: true,
      width: 110,
      align: 'center'
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      render: value => moment(value).format('YYYY-MM-DD'),
      ellipsis: true,
      align: 'center'
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      render: value => moment(value).format('YYYY-MM-DD'),
      ellipsis: true,
      align: 'center'
    },
    {
      title: '持续时间',
      dataIndex: 'lastTime',
      key: 'lastTime',
      ellipsis: true,
      align: 'center'
    },
    {
      title: '评分',
      dataIndex: 'score',
      key: 'score',
      ellipsis: true,
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <a href='/#' onClick={e => deleteByKey(e, record.id)}>
          删除
        </a>
      ),
      ellipsis: true,
      align: 'center'
    }
  ];
  const noActionColumns = columns.filter(
    (_, index) => index !== columns.length - 1
  );
  // 表格数据
  const [data, setData] = useState([]);
  // 表格选中项的key
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // 批量删除按钮的loading
  const [loading, setLoading] = useState(false);
  // 批量删除对话框的显示与隐藏
  const [batchDeleteModalVisible, setBatchDeleteModalVisible] = useState(false);
  // 新建元素对话框的显示与隐藏
  const [newItemModalVisible, setNewItemModalVisible] = useState(false);
  // 批量删除对话框里表格数据
  const [intersectionArr, setIntersectionArr] = useState([]);
  // 新建元素对话框里form表单
  const [form] = Form.useForm();
  // 分页器
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  });

  // 监听搜索输入框的改变
  const handleInputChange = e => {
    setSearchValue(e.target.value);
    if (!e.target.value) handleGetTrain();
  };
  // 页码变化时改变表格数据
  const handleTableChange = (current, size) => {
    setPagination({
      current: current,
      pageSize: size
    });
  };
  // 监听批量删除按钮的点击事件
  const batchDelete = () => {
    setLoading(true);
    setBatchDeleteModalVisible(true);
    const arr = [];
    console.log(data);
    data.forEach(x => {
      selectedRowKeys.forEach(y => {
        if (x.id === y)
          // 交集，表示要显示在确认删除页面里的数据
          arr.push(x);
      });
    });
    console.log(arr);
    setIntersectionArr(arr);
  };
  // 监听批量删除对话框的确认事件
  const handleBatchDeleteOk = () => {
    selectedRowKeys.forEach(item => handleDeleteTrain(item));
    setSelectedRowKeys([]);
    setBatchDeleteModalVisible(false);
    setLoading(false);
  };
  // 监听批量删除对话框的取消事件
  const handleBatchDeleteCancel = () => {
    setBatchDeleteModalVisible(false);
    setLoading(false);
    message.info('已取消删除！');
  };
  // 监听单行删除按钮的点击
  const deleteByKey = (e, id) => {
    e.preventDefault();
    // 确认删除对话框
    Modal.confirm({
      title: '确定删除吗?',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        handleDeleteTrain(id);
        handleGetTrain();
      },
      onCancel() {
        message.info('已取消删除！');
      }
    });
  };
  // 监听新建对话框的取消事件
  const handleNewItemCancel = () => {
    form.resetFields();
    setNewItemModalVisible(false);
    message.info('已取消新建列表项！');
  };
  // 监听新建对话框的确认事件(表单的onFinish替代)
  const onNewItemModalFinish = values => {
    form.resetFields();
    values.staffId = Number(values.id);
    delete values.id;
    values.score = Number(values.score);
    values.startTime = values.startTime.valueOf();
    values.endTime = values.endTime.valueOf();
    postTrain(values).then(res => {
      console.log(res);
      if (res.data.status !== 200) return message.error('新建失败！');
      handleGetTrain();
      message.success('新建成功！');
    });
    setNewItemModalVisible(false);
  };
  const hasSelected = selectedRowKeys.length > 0;
  const validateMessages = {
    required: `${label} 不能为空 !`,
    types: {
      number: '请输入数字 !'
    },
    number: {
      range: `${label} 必须在 ${min} - ${max}之间`
    },
    pattern: {
      mismatch: `${label}只能由中文或英文组成，且长度不超过10位！`
    }
  };
  // 删除表格数据
  const handleDeleteTrain = id => {
    deleteTrain(id).then(res => {
      if (res.status !== 200) return message.error('删除失败！');
      message.success('删除成功！');
    });
  };
  // 获取表格数据
  const handleGetTrain = () => {
    getTrain(pagination.current, pagination.pageSize, '').then(res => {
      if (res.data.status !== 200) return message.error('获取表格数据失败！');
      setData(res.data.trainingDTOList);
      setTotal(res.data.totalCount);
    });
  };
  // 组件挂载时获取表格数据
  useEffect(() => {
    handleGetTrain();
  }, [pagination, total]);

  return {
    searchValue,
    handleInputChange,
    setNewItemModalVisible,
    batchDelete,
    hasSelected,
    columns,
    loading,
    handleTableChange,
    handleBatchDeleteOk,
    handleBatchDeleteCancel,
    handleNewItemCancel,
    onNewItemModalFinish,
    setSelectedRowKeys,
    batchDeleteModalVisible,
    handleBatchDeleteOk,
    handleBatchDeleteCancel,
    validateMessages,
    newItemModalVisible,
    handleTableChange,
    pagination,
    noActionColumns,
    intersectionArr,
    loading
  };
}
