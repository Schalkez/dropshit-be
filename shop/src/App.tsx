import React, { useEffect } from "react";
import "./App.css";
import RenderRouter from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider, theme as a } from "antd";
import requestService from "api/request";
import { useAppDispatch, useAppSelector } from "store";
import { setCart, setUser } from "store/app";
function App() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.app);
  const getMe = async () => {
    try {
      const res = await requestService.get("/profile/me");
      if (res && res.data) {
        dispatch(setUser(res.data?.data));
      }
    } catch (error) {
      console.log(error);
      window.localStorage.clear();
    }
  };
  useEffect(() => {
    if (!user &&  JSON.parse(window.localStorage.getItem('tokens') as any)?.accessToken) {
      getMe();
    }
  }, [user]);
  useEffect(()=>{
    const carts =localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || [] as any) : []
    dispatch(setCart(carts))
  },[dispatch])
  return (
    <ConfigProvider theme={{
      token:{
        colorPrimary:"#e62e04"
      }
    }}>
      <div className="App">
        <Router>
          <RenderRouter />
        </Router>
      </div>
    </ConfigProvider>
  );
}

export default App;
