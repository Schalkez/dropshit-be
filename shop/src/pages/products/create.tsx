import { Button, Card, Form, Input, Select, Upload, UploadProps, message } from 'antd'
import { Option } from 'antd/es/mentions';
import requestService from 'api/request';
import { UploadOutlined, LeftOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import { useAppSelector } from 'store';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const [dataBranch, setDataBranch] = useState([]);
    const [dataCategory, setCategory] = useState<string[]>([]);
    const [description, setDescription] = useState('')
    const [image, setImage] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useAppSelector((state) => state.app) as any
    const navigate = useNavigate()
    const onSubmit = async (form: any) => {
        try {
            setLoading(true)
            const res = await requestService.post('/profile/add-product', {
                data: {
                    ...form,
                    description,
                    images: image,
                    user: user._id
                }
            })
            if (res && res.data) {
                message.success("Thành công")
                navigate('/dashboard-seller/products')
            }
        } catch (error) {
            console.log(error);
            message.error("Có lỗi xảy ra")
        }
        setLoading(false)
    }

    const getBranch = async () => {
        try {
            const res = await requestService.get('/auth/category')
            if (res && res.data) {
                setCategory(res.data.data)
            }
        } catch (error) {
            console.log(error);

        }
    }
    const getBranch1 = async () => {
        try {
            const res = await requestService.get('/auth/branch')
            if (res && res.data) {
                setDataBranch(res.data.data)
            }
        } catch (error) {
            console.log(error);

        }
    }
    const props1: UploadProps = {
        name: 'file',
        action: `${process.env.REACT_APP_API_URL}/api/upload/file`,
        beforeUpload: (file) => {
            const isPNG = file.type === 'image/png' || 'image/jpeg';
            if (!isPNG) {
                message.error(`${file.name} is not a png file`);
            }
            return isPNG || Upload.LIST_IGNORE;
        },

        onChange: (info) => {
            if (info.file?.response?.url) setImage([...image, info.file?.response?.url] as any);
        },
    };
    useEffect(() => {
        const getData = async () => {

            const [data1, data2] = await Promise.all([getBranch(), getBranch1()])
        }

        getData()
    }, [])
    return (
        <div className="aiz-main-content">
            <div className="px-15px px-lg-25px">
                <h3>Thêm sản phẩm</h3>
                <Card>
                    <Form layout='vertical' onFinish={onSubmit}>
                        <Form.Item label="Tên sản phẩm" name='name'>
                            <Input size='large'></Input>
                        </Form.Item>
                        <div className='row'>
                            <div className='col-6'>
                                <Form.Item label="Số lượng" name='quantity'>
                                    <Input size='large' type='number'></Input>
                                </Form.Item>
                            </div>
                            <div className='col-6' >
                                <Form.Item label="Đơn giá" name='price'>
                                    <Input size='large' type='number'></Input>
                                </Form.Item>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <Form.Item label="Nhãn hiệu" name='branch'>
                                    <Select size='large'>
                                        {dataBranch.map((item: any) => (
                                            <Option value={item?._id}>
                                                {item?.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className='col-6'>
                                <Form.Item label="Thể loại" name='category'>
                                    <Select size='large'>
                                        {dataCategory.map((item: any) => (
                                            <Option value={item?._id}>
                                                {item?.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>

                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <Form.Item label='Mô tả sản phẩm'>
                                    <ReactQuill theme="snow"
                                        style={{ height: "100px" }} value={description} onChange={setDescription} />;
                                </Form.Item>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-6'>
                                <Form.Item label="Ảnh 1">
                                    <Upload {...props1}>
                                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                    </Upload>
                                </Form.Item>
                            </div>
                            <div className='col-6'>
                                <Form.Item label="Ảnh 2">
                                    <Upload {...props1}>
                                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                    </Upload>
                                </Form.Item>
                            </div>
                            <div className='col-6'>
                                <Form.Item label="Ảnh 3">
                                    <Upload {...props1}>
                                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                    </Upload>
                                </Form.Item>
                            </div>
                            <div className='col-6'>
                                <Form.Item label="Ảnh 4">
                                    <Upload {...props1}>
                                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                    </Upload>
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item >
                            <div className='d-flex justify-content-start'>
                                <Button type="primary" className="bg-primary" htmlType='submit' loading={loading} size='large'>
                                    Thêm sản phẩm
                                </Button>
                            </div>
                        </Form.Item>

                    </Form>
                </Card>
            </div>
            <div>

            </div>
        </div>
    )
}

export default CreateProduct