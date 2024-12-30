import requestService from "api/request";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "store";

const Message = () => {
  const { user } = useAppSelector((state) => state.app);
  const [msgs, setMsgs] = useState([]);
  const getMessageStore = async () => {
    try {
      const res = await requestService.get(
        "/profile/getConservationStore/" + user?._id
      );
      if (res && res?.data) {
        setMsgs(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) getMessageStore();
  }, [user]);
  return (
    <div className="aiz-user-panel">
      <div className="card">
        <ul className="list-group list-group-raw">
          {!msgs?.length ? (
            <li className="list-group-item">Không có tin nhắn</li>
          ) : (
            msgs?.map((i) => (
              <li className="list-group-item">
                <Link
                  className="text-reset"
                  to={"/dashboard-seller/message-detail"}
                  state={i}
                >
                  <div className="d-flex search-product align-items-center">
                    <div className="mr-3">
                      <img
                        className="size-40px img-fit rounded"
                        src="/images/avatar-place.png"
                      />
                    </div>
                    <div className="flex-grow-1 overflow--hidden">
                      <div className="product-name text-truncate fs-14 mb-5px">
                        {i?.user?.name}
                      </div>
                      <div className="opacity-60">
                        {i?.user?.email}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Message;
