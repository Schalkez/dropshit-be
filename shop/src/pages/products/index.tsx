import React from 'react'

const Products = () => {
    return (
        <section className="mb-4 pt-3">
            <div className="container sm-px-0">
                <form className="" id="search-form" action="" method="GET">
                    <div className="row">
                        <div className="col-xl-3">
                            <div className="aiz-filter-sidebar collapse-sidebar-wrap sidebar-xl sidebar-right z-1035">
                                <div
                                    className="overlay overlay-fixed dark c-pointer"
                                    data-toggle="class-toggle"
                                    data-target=".aiz-filter-sidebar"
                                    data-same=".filter-sidebar-thumb"
                                />
                                <div className="collapse-sidebar c-scrollbar-light text-left">
                                    <div className="d-flex d-xl-none justify-content-between align-items-center pl-3 border-bottom">
                                        <h3 className="h6 mb-0 fw-600">Bộ lọc</h3>
                                        <button
                                            type="button"
                                            className="btn btn-sm p-2 filter-sidebar-thumb"
                                            data-toggle="class-toggle"
                                            data-target=".aiz-filter-sidebar"
                                        >
                                            <i className="fas fa-times la-2x" />
                                        </button>
                                    </div>
                                    <div className="bg-white shadow-sm rounded mb-3">
                                        <div className="fs-15 fw-600 p-3 border-bottom">Thể loại</div>
                                        <div className="p-3">
                                            <ul className="list-unstyled">
                                                <li className="mb-2">
                                                    <a
                                                        className="text-reset fs-14 fw-600"
                                                        href="#/search"
                                                    >
                                                        <i className="fas fa-angle-left" />
                                                        Tất cả danh mục
                                                    </a>
                                                </li>
                                                <li className="mb-2">
                                                    <a
                                                        className="text-reset fs-14 fw-600"
                                                        href="#/category/m%C3%A1y%20t%C3%ADnh&ph%E1%BB%A5%20ki%E1%BB%87n"
                                                    >
                                                        <i className="fas fa-angle-left" />
                                                        Máy tính&amp;Phụ kiện
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="bg-white shadow-sm rounded mb-3">
                                        <div className="fs-15 fw-600 p-3 border-bottom">
                                            Phạm vi giá
                                        </div>
                                        <div className="p-3">
                                            <div className="aiz-range-slider">
                                                <div
                                                    id="input-slider-range"
                                                    data-range-value-min=" 0.01 "
                                                    data-range-value-max={9999}
                                                    className="noUi-target noUi-ltr noUi-horizontal noUi-txt-dir-ltr"
                                                >
                                                    <div className="noUi-base">
                                                        <div className="noUi-connects">
                                                            <div
                                                                className="noUi-connect"
                                                                style={{
                                                                    transform:
                                                                        "translate(0.240024%, 0px) scale(0.127513, 1)"
                                                                }}
                                                            />
                                                        </div>
                                                        <div
                                                            className="noUi-origin"
                                                            style={{
                                                                transform: "translate(-997.6%, 0px)",
                                                                zIndex: 5
                                                            }}
                                                        >

                                                        </div>
                                                        <div
                                                            className="noUi-origin"
                                                            style={{
                                                                transform: "translate(-870.087%, 0px)",
                                                                zIndex: 6
                                                            }}
                                                        >

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mt-2">
                                                    <div className="col-6">
                                                        <span
                                                            className="range-slider-value value-low fs-14 fw-600 opacity-70"
                                                            data-range-value-low={24}
                                                            id="input-slider-range-value-low"
                                                        >
                                                            24.00
                                                        </span>
                                                    </div>
                                                    <div className="col-6 text-right">
                                                        <span
                                                            className="range-slider-value value-high fs-14 fw-600 opacity-70"
                                                            data-range-value-high={1299}
                                                            id="input-slider-range-value-high"
                                                        >
                                                            1299.00
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9">
                            <ul className="breadcrumb bg-transparent p-0">
                                <li className="breadcrumb-item opacity-50">
                                    <a className="text-reset" href="#">
                                        Trang Chủ
                                    </a>
                                </li>
                                <li className="breadcrumb-item opacity-50">
                                    <a
                                        className="text-reset"
                                        href="#/search"
                                    >
                                        Tất cả danh mục
                                    </a>
                                </li>
                                <li className="text-dark fw-600 breadcrumb-item">
                                    <a
                                        className="text-reset"
                                        href="#/category/m%C3%A1y%20t%C3%ADnh&ph%E1%BB%A5%20ki%E1%BB%87n"
                                    >
                                        "Máy tính&amp;Phụ kiện"
                                    </a>
                                </li>
                            </ul>
                            <div className="text-left">
                                <div className="row gutters-5 flex-wrap align-items-center">
                                    <div className="col-lg col-10">
                                        <h1 className="h6 fw-600 text-body">Máy tính&amp;Phụ kiện</h1>
                                        <input type="hidden" name="keyword" defaultValue="" />
                                    </div>
                                    <div className="col-2 col-lg-auto d-xl-none mb-lg-3 text-right">
                                        <button
                                            type="button"
                                            className="btn btn-icon p-0"
                                            data-toggle="class-toggle"
                                            data-target=".aiz-filter-sidebar"
                                        >
                                            <i className="fa fa-filter la-2x" />
                                        </button>
                                    </div>
                                    <div className="col-6 col-lg-auto mb-3 w-lg-200px">
                                        <label className="mb-0 opacity-50">Nhãn hiệu</label>
                                        <div className="dropdown bootstrap-select form-control form-control-sm aiz-">
                                            <select
                                                className="form-control form-control-sm aiz-selectpicker"
                                                data-live-search="true"
                                                name="brand"

                                                tabIndex={-98}
                                            >
                                                <option value="">Tất cả các thương hiệu</option>
                                                <option value="-acvyo">ACER</option>
                                                <option value="-jk6hd">Adidas</option>
                                                <option value="-poncu">Aigner</option>
                                                <option value="-fugx7">Alosa</option>
                                                <option value="-txjhd">Apato</option>
                                                <option value="-gdjd6">Apple</option>
                                                <option value="-jmklf">ASUS</option>
                                                <option value="-lqtcf">Yamaha</option>
                                                <option value="-huafu">millet</option>
                                                <option value="-3vpqe">Wood worm</option>
                                                <option value="-9mekv">Volvo</option>
                                                <option value="-px88h">Victoria's Secret</option>
                                                <option value="-jfqgc">Urban decay</option>
                                                <option value="-huiiv">Toy Pinot</option>
                                                <option value="-4e379">Toyota</option>
                                                <option value="-bqurr">Crystal bride</option>
                                                <option value="-tfkow">Tanishk</option>
                                                <option value="Reebok-TeG7J">Reebok</option>
                                                <option value="-bfw5y">OnePlus</option>
                                                <option value="-4ylt9">Sony</option>
                                                <option value="-2eto5">Samsung</option>
                                                <option value="-zkqhs">SEPHORA</option>
                                                <option value="-ztygh">polo</option>
                                                <option value="-sjsar">Suzuki</option>
                                                <option value="-lnigx">Riyal Enfield</option>
                                                <option value="-l7buq">Rolex</option>
                                                <option value="-frtyp">Rezel</option>
                                                <option value="-fnctq">Rolls-Royce</option>
                                                <option value="-cwvuv">Royal Enfield</option>
                                                <option value="-j1iry">philips</option>
                                                <option value="-zfq2o">Puma</option>
                                                <option value="-c1d6t">pampers</option>
                                                <option value="-s9s47">Infant care</option>
                                                <option value="-6ipq1">Baby clothing</option>
                                                <option value="-owmnw">Baby TV</option>
                                                <option value="-jcdw9">Belly baby</option>
                                                <option value="-bewuu">axe</option>
                                                <option value="-bprsd">Baby and Me</option>
                                                <option value="-t9jqp">audi</option>
                                                <option value="-wq7cg">Bass Vampire</option>
                                                <option value="Fila-mYswr">Fila</option>
                                                <option value="G2000-dm3se">G2000</option>
                                                <option value="Lenovo-raft1">Lenovo</option>
                                                <option value="Enfagrow-ZGSPY">Enfagrow</option>
                                                <option value="Friso-bEVFC">Friso</option>
                                                <option value="Aptamil-OaGXP">Aptamil</option>
                                                <option value="Similac-fWvH8">Similac</option>
                                                <option value="Olay-ZKFk8">Olay</option>
                                                <option value="INCERUN-G6UuS">INCERUN</option>
                                                <option value="GUESS-XwcDO">GUESS</option>
                                                <option value="Mido-1yzHx">Mido</option>
                                                <option value="Levis-pzYS1">Levi's</option>
                                                <option value="No-Brand-FMfIF">No Brand</option>
                                                <option value="Meowbon-VaJpx">Meowbon</option>
                                                <option value="JINISO-FNlrw">JINISO</option>
                                                <option value="More-Women-Bags-from-David-Jones-czLdI">
                                                    More Women Bags from David Jones
                                                </option>
                                            </select>
                                            <button
                                                type="button"
                                                className="btn dropdown-toggle btn-light"
                                                data-toggle="dropdown"
                                                role="combobox"
                                                aria-owns="bs-select-1"
                                                aria-haspopup="listbox"
                                                aria-expanded="false"
                                                title="Tất cả các thương hiệu"
                                            >
                                                <div className="filter-option">
                                                    <div className="filter-option-inner">
                                                        <div className="filter-option-inner-inner">
                                                            Tất cả các thương hiệu
                                                        </div>
                                                    </div>{" "}
                                                </div>
                                            </button>
                                            <div className="dropdown-menu ">
                                                <div className="bs-searchbox">
                                                    <input
                                                        type="search"
                                                        className="form-control"
                                                        autoComplete="off"
                                                        role="combobox"
                                                        aria-label="Search"
                                                        aria-controls="bs-select-1"
                                                        aria-autocomplete="list"
                                                    />
                                                </div>
                                                <div
                                                    className="inner show"
                                                    role="listbox"
                                                    id="bs-select-1"
                                                    tabIndex={-1}
                                                >
                                                    <ul
                                                        className="dropdown-menu inner show"
                                                        role="presentation"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-auto mb-3 w-lg-200px">
                                        <label className="mb-0 opacity-50">Sắp xếp theo</label>
                                        <div className="dropdown bootstrap-select form-control form-control-sm aiz-">
                                            <select
                                                className="form-control form-control-sm aiz-selectpicker"
                                                name="sort_by"

                                                tabIndex={-98}
                                            >
                                                <option value="newest">Mới nhất</option>
                                                <option value="oldest">Cũ nhất</option>
                                                <option value="price-asc">Giá thấp đến cao</option>
                                                <option value="price-desc">Giá từ cao đến thấp</option>
                                            </select>
                                            <button
                                                type="button"
                                                className="btn dropdown-toggle btn-light"
                                                data-toggle="dropdown"
                                                role="combobox"
                                                aria-owns="bs-select-2"
                                                aria-haspopup="listbox"
                                                aria-expanded="false"
                                                title="Mới nhất"
                                            >
                                                <div className="filter-option">
                                                    <div className="filter-option-inner">
                                                        <div className="filter-option-inner-inner">
                                                            Mới nhất
                                                        </div>
                                                    </div>{" "}
                                                </div>
                                            </button>
                                            <div className="dropdown-menu ">
                                                <div
                                                    className="inner show"
                                                    role="listbox"
                                                    id="bs-select-2"
                                                    tabIndex={-1}
                                                >
                                                    <ul
                                                        className="dropdown-menu inner show"
                                                        role="presentation"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input type="hidden" name="min_price" defaultValue="" />
                            <input type="hidden" name="max_price" defaultValue="" />
                            <div className="row gutters-5 row-cols-xxl-4 row-cols-xl-3 row-cols-lg-4 row-cols-md-3 row-cols-2">
                                <div className="col">
                                    <div className="aiz-card-box border border-light rounded hov-shadow-md mt-1 mb-2 has-transition bg-white">
                                        <div className="position-relative">
                                            <a
                                                href="#/product/6762431454-tpE9n8YO-iseWj"
                                                className="d-block"
                                            >
                                                <img
                                                    className="img-fit mx-auto h-140px h-md-210px lazyloaded"
                                                    src="https://down-sg.img.susercontent.com/file/sg-11134201-7qvdb-lfuqdh2i2y835b"
                                                    data-src="https://down-sg.img.susercontent.com/file/sg-11134201-7qvdb-lfuqdh2i2y835b"
                                                    alt="Hinomi Smart Voice Control Standing Desk Lift Office Table Adjustable"

                                                />
                                            </a>
                                            <div className="absolute-top-right aiz-p-hov-icon">
                                                <a
                                                    href="javascript:void(0)"

                                                    data-toggle="tooltip"
                                                    data-title="Thêm vào danh sách yêu thích"
                                                    data-placement="left"
                                                >
                                                    <i className="fa fa-heart" />
                                                </a>
                                                <a
                                                    href="javascript:void(0)"

                                                    data-toggle="tooltip"
                                                    data-title="Thêm vào để so sánh"
                                                    data-placement="left"
                                                >
                                                    <i className="fas fa-sync" />
                                                </a>
                                                <a
                                                    href="javascript:void(0)"

                                                    data-toggle="tooltip"
                                                    data-title="Thêm vào giỏ hàng"
                                                    data-placement="left"
                                                >
                                                    <i className="fas fa-shopping-cart" />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="p-md-3 p-2 text-left">
                                            <div className="fs-15">
                                                <span className="fw-700 text-primary">$599.00</span>
                                            </div>
                                            <div className="rating rating-sm mt-1">
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                            </div>
                                            <h3 className="fw-600 fs-13 text-truncate-2 lh-1-4 mb-0 h-35px">
                                                <a
                                                    href="#/product/6762431454-tpE9n8YO-iseWj"
                                                    className="d-block text-reset"
                                                >
                                                    Hinomi Smart Voice Control Standing Desk Lift Office Table
                                                    Adjustable
                                                </a>
                                            </h3>
                                            <div className="rounded px-2 mt-2 bg-soft-primary border-soft-primary border">
                                                Điểm câu lạc bộ:
                                                <span className="fw-700 float-right">0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="aiz-pagination aiz-pagination-center mt-4">
                                <nav>
                                    <ul className="pagination">
                                        <li
                                            className="page-item disabled"
                                            aria-disabled="true"
                                            aria-label="« Previous"
                                        >
                                            <span className="page-link" aria-hidden="true">
                                                ‹
                                            </span>
                                        </li>
                                        <li className="page-item active" aria-current="page">
                                            <span className="page-link">1</span>
                                        </li>
                                        <li className="page-item">
                                            <a
                                                className="page-link"
                                                href="#/category/m%C3%A1y%20t%C3%ADnh&ph%E1%BB%A5%20ki%E1%BB%87n?page=2"
                                            >
                                                2
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a
                                                className="page-link"
                                                href="#/category/m%C3%A1y%20t%C3%ADnh&ph%E1%BB%A5%20ki%E1%BB%87n?page=3"
                                            >
                                                3
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a
                                                className="page-link"
                                                href="#/category/m%C3%A1y%20t%C3%ADnh&ph%E1%BB%A5%20ki%E1%BB%87n?page=4"
                                            >
                                                4
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a
                                                className="page-link"
                                                href="#/category/m%C3%A1y%20t%C3%ADnh&ph%E1%BB%A5%20ki%E1%BB%87n?page=5"
                                            >
                                                5
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a
                                                className="page-link"
                                                href="#/category/m%C3%A1y%20t%C3%ADnh&ph%E1%BB%A5%20ki%E1%BB%87n?page=6"
                                            >
                                                6
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a
                                                className="page-link"
                                                href="#/category/m%C3%A1y%20t%C3%ADnh&ph%E1%BB%A5%20ki%E1%BB%87n?page=7"
                                            >
                                                7
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a
                                                className="page-link"
                                                href="#/category/m%C3%A1y%20t%C3%ADnh&ph%E1%BB%A5%20ki%E1%BB%87n?page=8"
                                            >
                                                8
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a
                                                className="page-link"
                                                href="#/category/m%C3%A1y%20t%C3%ADnh&ph%E1%BB%A5%20ki%E1%BB%87n?page=9"
                                            >
                                                9
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a
                                                className="page-link"
                                                href="#/category/m%C3%A1y%20t%C3%ADnh&ph%E1%BB%A5%20ki%E1%BB%87n?page=10"
                                            >
                                                10
                                            </a>
                                        </li>
                                        <li className="page-item disabled" aria-disabled="true">
                                            <span className="page-link">...</span>
                                        </li>
                                        <li className="page-item">
                                            <a
                                                className="page-link"
                                                href="#/category/m%C3%A1y%20t%C3%ADnh&ph%E1%BB%A5%20ki%E1%BB%87n?page=89"
                                            >
                                                89
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a
                                                className="page-link"
                                                href="#/category/m%C3%A1y%20t%C3%ADnh&ph%E1%BB%A5%20ki%E1%BB%87n?page=90"
                                            >
                                                90
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a
                                                className="page-link"
                                                href="#/category/m%C3%A1y%20t%C3%ADnh&ph%E1%BB%A5%20ki%E1%BB%87n?page=2"
                                                rel="next"
                                                aria-label="Next »"
                                            >
                                                ›
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>

    )
}

export default Products