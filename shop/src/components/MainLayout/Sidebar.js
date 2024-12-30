import { message } from 'antd'
import requestService from 'api/request'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'store'
import { setUser } from 'store/app'

const Sidebar = ({ isOpenSidebar, setIsOpenSidebar }) => {
    const { user } = useAppSelector((state) => state.app)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const handleLogout = async () => {
        try {
            const res = await requestService.delete("/profile/logout");
            localStorage.clear();
            dispatch(setUser(null))
            setIsOpenSidebar(false)
            navigate('/login')
        } catch (error) {
            message.error(error?.response?.data?.message);
            localStorage.clear();
            setIsOpenSidebar(false)
            navigate('/')
        }
    };

    return (
        <div className="aiz-mobile-side-nav collapse-sidebar-wrap sidebar-xl d-xl-none z-1035 active">
            <div
                className="overlay dark c-pointer overlay-fixed"
                data-toggle="class-toggle"
                data-backdrop="static"
                data-target=".aiz-mobile-side-nav"
                data-same=".mobile-side-nav-thumb"
                onClick={() => setIsOpenSidebar(false)}
            />
            <div className="collapse-sidebar bg-white">
                <div className="aiz-user-sidenav-wrap position-relative z-1 shadow-sm">
                    <div className="aiz-user-sidenav rounded overflow-auto c-scrollbar-light pb-5 pb-xl-0">
                        <div className="p-4 text-xl-center mb-4 border-bottom bg-primary text-white position-relative">
                            <span className="avatar avatar-md mb-3">
                                <img
                                    src="https://www.albbcbe-cme-vn.com/public/assets/img/avatar-place.png"
                                    className="image rounded-circle"
                                    onerror="this.onerror=null;this.src='https://www.albbcbe-cme-vn.com/public/assets/img/avatar-place.png';"
                                />
                            </span>
                            <h4 className="h5 fs-16 mb-1 fw-600">{user?.name}</h4>
                            <div className="text-truncate opacity-60">
                                {user?.email}
                            </div>
                        </div>
                        <div className="sidemnenu mb-3">
                            <ul
                                className="aiz-side-nav-list px-2 metismenu"
                                data-toggle="aiz-side-menu"
                            >
                                <li className="aiz-side-nav-item">
                                    <Link
                                        to="/dashboard-client"
                                        className="aiz-side-nav-link "
                                    >
                                        <i className="fas fa-home aiz-side-nav-icon" />
                                        <span className="aiz-side-nav-text">bảng điều khiển</span>
                                    </Link>
                                </li>
                                <li className="aiz-side-nav-item">
                                    <Link
                                        to="/dashboard-client/history"
                                        className="aiz-side-nav-link "
                                    >
                                        <i className="fas fa-file-alt aiz-side-nav-icon" />
                                        <span className="aiz-side-nav-text">Lịch sử thanh toán</span>
                                    </Link>
                                </li>

                                {/* <li className="aiz-side-nav-item">
                                    <a
                                        href="https://www.albbcbe-cme-vn.com/sent-refund-request"
                                        className="aiz-side-nav-link "
                                    >
                                        <i className="fas fa-backward aiz-side-nav-icon" />
                                        <span className="aiz-side-nav-text">
                                            Yêu cầu hoàn lại tiền đã gửi
                                        </span>{" "}
                                    </a>
                                </li> */}
                                {/* <li className="aiz-side-nav-item">
                                    <a
                                        href="https://www.albbcbe-cme-vn.com/wishlists"
                                        className="aiz-side-nav-link "
                                    >
                                        <i className="la la-heart-o aiz-side-nav-icon" />
                                        <span className="aiz-side-nav-text">
                                            Danh sách yêu thích
                                        </span>{" "}
                                    </a>
                                </li> */}
                                {/* <li className="aiz-side-nav-item">
                                    <a
                                        href="https://www.albbcbe-cme-vn.com/compare"
                                        className="aiz-side-nav-link "
                                    >
                                        <i className="la la-refresh aiz-side-nav-icon" />
                                        <span className="aiz-side-nav-text">Đối chiếu</span>{" "}
                                    </a>
                                </li> */}
                                <li className="aiz-side-nav-item">
                                    <Link
                                        to="/dashboard-client/message"
                                        className="aiz-side-nav-link "
                                        style={{ alignItems: "center" }}
                                    >
                                        <i className="fas fa-comment aiz-side-nav-icon" />
                                        <span className="aiz-side-nav-text">Cuộc trò chuyện</span>
                                        <span
                                            className="badge badge-danger badge-circle badge-sm badge-dot"
                                            id="conversations"
                                            style={{ display: "none" }}
                                        >
                                            {" "}
                                        </span>
                                    </Link>
                                </li>

                                <li className="aiz-side-nav-item">
                                    <Link
                                        to="/dashboard-client/wallet"
                                        className="aiz-side-nav-link "
                                    >
                                        <i className="fas fa-dollar-sign aiz-side-nav-icon" />
                                        <span className="aiz-side-nav-text">Ví của tôi</span>
                                    </Link>
                                </li>
                                {/* <li className="aiz-side-nav-item">
                                    <a
                                        href="https://www.albbcbe-cme-vn.com/wallet"
                                        className="aiz-side-nav-link "
                                    >
                                        <i className="fas fa-dollar-sign aiz-side-nav-icon" />
                                        <span className="aiz-side-nav-text">Ví của tôi</span>{" "}
                                    </a>
                                </li>
                                <li className="aiz-side-nav-item">
                                    <a
                                        href="https://www.albbcbe-cme-vn.com/earning-points"
                                        className="aiz-side-nav-link "
                                    >
                                        <i className="fas fa-dollar-sign aiz-side-nav-icon" />
                                        <span className="aiz-side-nav-text">Kiếm được điểm</span>{" "}
                                    </a>
                                </li>
                                <li className="aiz-side-nav-item">
                                    <a
                                        href="https://www.albbcbe-cme-vn.com/support_ticket"
                                        className="aiz-side-nav-link "
                                    >
                                        <i className="fas fa-atom aiz-side-nav-icon" />
                                        <span className="aiz-side-nav-text">Vé ủng hộ</span>
                                    </a>
                                </li>
                                <li className="aiz-side-nav-item">
                                    <a href="/user/transaction" className="aiz-side-nav-link">
                                        <i className="fas fa-wallet aiz-side-nav-icon" />
                                        <span className="aiz-side-nav-text">
                                            Transaction Password
                                        </span>{" "}
                                    </a>
                                </li>
                                <li className="aiz-side-nav-item">
                                    <a
                                        href="https://www.albbcbe-cme-vn.com/profile"
                                        className="aiz-side-nav-link "
                                    >
                                        <i className="fas fa-user aiz-side-nav-icon" />
                                        <span className="aiz-side-nav-text">Quản lý hồ sơ</span>{" "}
                                    </a>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                    <div
                        className="fixed-bottom d-xl-none bg-white border-top d-flex justify-content-between px-2"
                        style={{ boxShadow: "0 -5px 10px rgb(0 0 0 / 10%)" }}
                    >
                        <a

                            onClick={handleLogout}
                            className="btn btn-sm p-2 d-flex align-items-center"
                            href="javascript:void(0)"
                        >
                            <i className="fas fa-sign-out-alt fs-18 mr-2" />
                            <span>Đăng xuất</span>
                        </a>
                        <button
                            className="btn btn-sm p-2 "
                            data-toggle="class-toggle"
                            data-backdrop="static"
                            data-target=".aiz-mobile-side-nav"
                            data-same=".mobile-side-nav-thumb"
                        >
                            <i className="fas fa-times la-2x" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Sidebar