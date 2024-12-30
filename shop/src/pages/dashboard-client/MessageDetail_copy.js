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
  const client = detail?.user
  const { user } = useAppSelector((state) => state.app);
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [product, setProduct] = useState()
  const getMessageStore = async () => {
    try {
      const res = await requestService.get(
        "/profile/getMessageStore/" + client?._id
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
          store: user?._id,
          user: client?._id,
          text,
          sender: user?._id,
          type: "STORE",
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
      if (user && client) {
        getMessageStore();
      }
    }, 5000); // 5000 milliseconds = 5 seconds
    getMessageStore();
    // Cleanup function to clear the interval
    return () => {
      clearInterval(intervalId);
    };
  }, [user, client]);
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
                  <img src="/images/avatar-place.png" alt="Admin Image" />
                </div>
                <div className="author-info">
                  <div className="author-title-wrap">
                    <h3 className="author-name">{client?.name}</h3>

                  </div>
                  <p>{client?.email}</p>
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
                      src={product?.images[0]}
                    />
                  </a>

                </div>
                <div className="p-md-3 p-2 text-left">
                  <div className="fs-15">
                    <span className="fw-700 text-primary">${product?.price}</span>
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
                        {product?.name}
                      </span>

                    </a>
                  </h3>

                </div>
              </div>
              {!msgs?.length && <div>Không có tin nhắn</div>}
              {!!msgs?.length &&
                msgs.map((item) => (
                  <>
                    {item?.type === "USER" && (
                      <div className="msg left-msg">
                        <div className="msg-img">
                          <img
                            src="/images/avatar-place.png"
                            alt="Admin Image"
                          />
                        </div>
                        <div className="msg-item">
                          <span className="msg-time">
                            {client?.name},{" "}
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
                    {item?.type === "STORE" && (
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
