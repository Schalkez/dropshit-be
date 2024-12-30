import React, { useEffect, useState } from "react";
import "./mess.css";
import { useLocation } from "react-router-dom";
import requestService from "api/request";
import { useAppSelector } from "store";
import { message, Spin } from "antd";
import { use } from "i18next";

const MessageDetail = () => {
  const detail = useLocation()?.state;
  const [loading, setLoading] = useState(false)
  const store = detail?.store
  const { user } = useAppSelector((state) => state.app);
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [product, setProduct] = useState()

  const getMessageStore = async () => {
    try {
      const res = await requestService.get(
        "/profile/getMessageUser/" + store?._id
      );
      if (res && res?.data) {
        setMsgs(res?.data?.data?.messages);
        setProduct(res?.data?.data?.product)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sendMessage = async () => {
    setLoading(true)
    try {
      const res = await requestService.post("/profile/chatMessage", {
        data: {
          store: store?._id,
          user: user?._id,
          text,
          product: detail?._id,
          sender: user?._id,
          type: "USER",
        },
      });
      if (res && res?.data) {

        await getMessageStore();
        setText("");
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
    setLoading(false)
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (user && store) {
        getMessageStore();
      }
    }, 5000); // 5000 milliseconds = 5 seconds
    getMessageStore();
    // Cleanup function to clear the interval
    return () => {
      clearInterval(intervalId);
    };
  }, [user, store]);



  return (
    <div id="wrapper" className="wrapper">
      <Spin fullscreen spinning={loading} />
      {/* end back-to-top */}
      {/* Start main_content */}
      <div id="main-content">
        <main>
          <section className="msger">
            <header className="msger-header">
              <div className="msger-header-title">
                <div className="author-img">
                  <img src={store?.store?.logoStore || "/images/avatar-place.png"} alt="Admin Image" />
                </div>
                <div className="author-info">
                  <div className="author-title-wrap">
                    <h3 className="author-name">{store?.store?.nameStore}</h3>
                    <svg
                      width={20}
                      height={20}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#212121"
                      gradientcolor1="#212121"
                      gradientcolor2="#212121"
                    >
                      <path d="M12.012 2.25c.734.009 1.466.093 2.182.253a.75.75 0 0 1 .582.649l.17 1.527a1.384 1.384 0 0 0 1.928 1.116l1.4-.615a.75.75 0 0 1 .85.174 9.793 9.793 0 0 1 2.204 3.792.75.75 0 0 1-.271.826l-1.242.915a1.38 1.38 0 0 0 .001 2.226l1.242.915a.75.75 0 0 1 .272.826 9.799 9.799 0 0 1-2.204 3.792.75.75 0 0 1-.848.175l-1.406-.616a1.381 1.381 0 0 0-1.927 1.113l-.169 1.526a.75.75 0 0 1-.572.648 9.518 9.518 0 0 1-4.406 0 .75.75 0 0 1-.572-.648l-.168-1.524a1.382 1.382 0 0 0-1.925-1.11l-1.407.616a.75.75 0 0 1-.849-.175 9.798 9.798 0 0 1-2.203-3.796.75.75 0 0 1 .271-.826l1.243-.916a1.381 1.381 0 0 0 0-2.226l-1.243-.914a.75.75 0 0 1-.271-.826 9.793 9.793 0 0 1 2.204-3.792.75.75 0 0 1 .85-.174l1.4.615a1.387 1.387 0 0 0 1.93-1.118l.17-1.526a.75.75 0 0 1 .583-.649c.717-.16 1.45-.244 2.201-.253Zm0 1.5a9.137 9.137 0 0 0-1.354.117l-.109.977A2.886 2.886 0 0 1 6.525 7.17l-.898-.394a8.293 8.293 0 0 0-1.348 2.317l.798.587a2.88 2.88 0 0 1 0 4.643l-.799.588c.32.842.776 1.626 1.348 2.322l.905-.397a2.882 2.882 0 0 1 4.017 2.318l.11.984c.889.15 1.798.15 2.687 0l.11-.984a2.881 2.881 0 0 1 4.018-2.322l.905.396a8.3 8.3 0 0 0 1.347-2.318l-.798-.588a2.88 2.88 0 0 1 0-4.642l.796-.588a8.293 8.293 0 0 0-1.348-2.317l-.896.393a2.884 2.884 0 0 1-4.023-2.324l-.11-.976a8.99 8.99 0 0 0-1.333-.117ZM12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Zm0 1.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                    </svg>
                  </div>
                  <p className="">{store?.store?.phone}</p>
                </div>
                <a href="#" />
              </div>
            </header>
            <main className="msger-chat">
              <div className="aiz-card-box border-light hov-shadow-md has-transition mb-2 mt-1 rounded border bg-white"
                style={{
                  maxWidth: "350px",
                  width: "100%"
                }}
              >
                <div className="position-relative" >
                  <a

                    className="d-block"
                    tabIndex={0}
                  >
                    <img
                      className="img-fit h-140px h-md-210px mx-auto lazyloaded"
                      src={detail?.images?.[0] || product?.images[0]}
                    />
                  </a>

                </div>
                <div className="p-md-3 p-2 text-left">
                  <div className="fs-15">
                    <span className="fw-700 text-primary">${detail?.price || product?.price}</span>
                  </div>
                  <div className="rating rating-sm mt-1">
                    <i className="fas fa-star active" />
                    <i className="fas fa-star active" />
                    <i className="fas fa-star active" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                  </div>
                  <h3 className="fw-600 fs-13 text-truncate-2 lh-1-4 h-35px mb-0">
                    <a

                      className="d-block text-reset"
                      tabIndex={0}
                    >
                      <span
                        style={{ display: "block" }}
                        className="obf-iengVNbgetVN123">
                        {detail?.name || product?.name}
                      </span>

                    </a>
                  </h3>

                </div>
              </div>
              {!msgs?.length && <div>Không có tin nhắn</div>}
              {!!msgs?.length &&
                msgs.map((item) => (
                  <>
                    {item?.type === "STORE" && (
                      <div className="msg left-msg">

                        <div className="msg-item">
                          <span className="msg-time">
                            {store?.store?.nameStore},{" "}
                            {new Date(item?.time)?.toLocaleString()}
                          </span>
                          <div className="msg-bubble">
                            <div className="msg-text">
                              <p>{item?.text}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {item?.type === "USER" && (
                      <div className="msg right-msg">
                        <div className="msg-item">
                          <span className="msg-time">
                            {"Me"},{" "}
                            {new Date(item?.time)?.toLocaleString()}
                          </span>
                          <div className="msg-bubble">
                            <div className="msg-text">
                              <p>{item?.text}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ))}
            </main>
            <div className="input-form">
              <div className="input-form-wrap">
                <div className="msger-inputarea">
                  <input
                    type="text"
                    className="msger-input"
                    placeholder="Type a message"
                    value={text}
                    onChange={(e) => setText(e?.target?.value)}
                  />
                  <button
                    className="msger-attachment-btn right-btn"
                    onClick={sendMessage}
                  >
                    <i className="fas fa-paper-plane" style={{
                      fontSize: "20px"
                    }}></i>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
        {/* End Main */}
      </div>
      {/* End main_content */}
    </div>
  );
};

export default MessageDetail;
