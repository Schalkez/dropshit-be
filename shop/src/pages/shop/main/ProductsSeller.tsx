import { Spin, Table } from 'antd'
import requestService from 'api/request'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'store'

const ProductsSeller = () => {
    const [data, setData] = useState([])
    const { user } = useAppSelector((state) => state.app) as any
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const getData = async () => {
        setLoading(true)
        try {
            const res = await requestService.get('/profile/get-product-user')
            if (res && res.data.data) {
                setData(res.data.data)
            }
        } catch (error) {
            console.log(error);

        }
        setLoading(false)
    }

    const columns = [
        {
            title: 'Tên SP',
            dataIndex: 'name',
            key: 'name',
            render: (name: any) => <div style={{ maxWidth: "350px" }}>{name}</div>
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Giá nhà kho',
            dataIndex: 'price',
            key: 'price',
            render: (price: any) => <div>
                {parseFloat(price) - parseFloat(price) * user?.profit / 100}
            </div>
        },
        {
            title: 'Sale Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Ảnh thu nhỏ',
            dataIndex: 'images',
            key: 'images',
            render: (images: any) => <img src={images?.[0]} width={40} />
        },
    ]
    useEffect(() => {
        if (user) getData()
    }, [user])
    return (
        <div className="aiz-main-content">
            <Spin fullscreen spinning={loading} />
            <div className="px-15px px-lg-25px">
                <div className="aiz-titlebar mt-2 mb-4">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h1 className="h3">Các sản phẩm</h1>
                        </div>
                    </div>
                </div>
                <div className="row gutters-10 justify-content-center">
                    <div className="col-md-4 mx-auto mb-3">
                        <div className="bg-grad-1 text-white rounded-lg overflow-hidden">
                            <span className="size-30px rounded-circle mx-auto bg-soft-primary d-flex align-items-center justify-content-center mt-3">
                                <i className="fas fa-upload"></i>
                            </span>
                            <div className="px-3 pt-3 pb-3">
                                <div className="h4 fw-700 text-center">{user?.package?.limit - user?.productQuantity || 0}</div>
                                <div className="opacity-50 text-center">Tải lên còn lại</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mx-auto mb-3">
                        <Link to="/dashboard-seller/store-house">
                            <div className="p-3 rounded mb-3 c-pointer text-center bg-white shadow-sm hov-shadow-lg has-transition">
                                <span className="size-60px rounded-circle mx-auto bg-secondary d-flex align-items-center justify-content-center mb-3">
                                    <i className="fas fa-plus text-white"></i>
                                </span>
                                <div className="fs-18 text-primary">Thêm sản phẩm mới</div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <a
                            href="/dashboard-seller/seller-packages"
                            className="text-center bg-white shadow-sm hov-shadow-lg text-center d-block p-3 rounded"
                        >
                            <img
                                src={user?.package?.img}
                                height={44}
                                className="mw-100 mx-auto"
                            />
                            <span className="d-block sub-title mb-2">
                                Gói hiện tại: {user?.package?.name}
                            </span>
                            <div className="btn btn-outline-primary py-1">Gói nâng cấp</div>
                        </a>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header row gutters-5">
                        <div className="col">
                            <h5 className="mb-md-0 h6">Tất cả sản phẩm</h5>
                        </div>
                        <div className="col-md-4">
                            <form className="" id="sort_brands" action="" method="GET">
                                <div className="input-group input-group-sm">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="search"
                                        name="search"
                                        placeholder="Tìm kiếm sản phẩm"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="card-body">

                        <Table columns={columns} dataSource={data} />
                    </div>
                </div>
            </div>

        </div>

    )
}

export default ProductsSeller