import React, { useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_URL } from "@/config/config";
// import AnnualUseChart from "./components/AnnualUseChart";
import { getLongWangMiao1, getLongWangMiao2 } from "../../service/index";
import HotPlateChart from "./components/HotPlateChart";
import OverNext30Chart from "./components/OverNext30Chart";
import ChinaMapChart from "./components/ChinaMapChart";
import Headertime from "./components/DataHeaderTime";
import dataScreenTitle from "./images/dataScreen-title.png";
import { useRequest } from "ahooks";
import dayjs from "dayjs";

import "./index.less";

const DataScreen = () => {
	const [longWangMiao1, setLongWangMiao1] = useState([]);
	const [longWangMiao2, setLongWangMiao2] = useState([]);

	const navigate = useNavigate();
	const handleTo = () => {
		// navigate(HOME_URL);
	};
	const dataScreenRef = useRef<HTMLDivElement>(null);

	/* 浏览器监听 resize 事件 */
	const resize = () => {
		if (dataScreenRef.current) {
			dataScreenRef.current.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
		}
	};

	/* 根据浏览器大小推断缩放比例 */
	const getScale = (width = 1920, height = 1080) => {
		let ww = window.innerWidth / width;
		let wh = window.innerHeight / height;
		return ww < wh ? ww : wh;
	};

	useLayoutEffect(() => {
		if (dataScreenRef.current) {
			dataScreenRef.current.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
			dataScreenRef.current.style.width = `1920px`;
			dataScreenRef.current.style.height = `1080px`;
		}
		// 为浏览器绑定事件
		window.addEventListener("resize", resize);
		return () => {
			window.removeEventListener("resize", resize);
		};
	}, []);

	useRequest(getLongWangMiao1, {
		onSuccess: res => {
			const {
				result: { data, count }
			} = res || {};
			data.sort(function (a, b) {
				return dayjs(b.DateTime).valueOf() - dayjs(a.DateTime).valueOf();
			});
			setLongWangMiao1(data);
		}
	});

	useRequest(getLongWangMiao2, {
		onSuccess: res => {
			const {
				result: { data, count }
			} = res || {};
			data.sort(function (a, b) {
				return dayjs(b.DateTime).valueOf() - dayjs(a.DateTime).valueOf();
			});
			setLongWangMiao2(data);
		}
	});

	return (
		<div className="dataScreen-container">
			<div className="dataScreen" ref={dataScreenRef}>
				<div className="dataScreen-header">
					<div className="header-lf">
						<span className="header-screening" onClick={handleTo}>
							首页
						</span>
					</div>
					<div className="header-ct">
						<div className="header-ct-title">
							<span>大数据展示平台</span>
						</div>
					</div>
					<div className="header-rg">
						<span className="header-download">统计报告</span>
						<Headertime />
					</div>
				</div>
				<div className="dataScreen-main">
					<div className="dataScreen-ct">
						<div className="dataScreen-map">
							<ChinaMapChart />
						</div>
						<div className="dataScreen-cb">
							<div className="dataScreen-main-title">
								<span>历史数据</span>
								<img src={dataScreenTitle} alt="" />
							</div>
							<div className="dataScreen-main-chart">
								<OverNext30Chart />
							</div>
						</div>
					</div>
					<div className="dataScreen-rg">
						<div className="dataScreen-top">
							<div className="dataScreen-main-title">
								<span>龙王庙1号设备</span>
								<img src={dataScreenTitle} alt="" />
							</div>
							<div className="dataScreen-main-chart">
								<HotPlateChart />
							</div>
						</div>
						<div className="dataScreen-top">
							<div className="dataScreen-main-title">
								<span>龙王庙2号设备</span>
								<img src={dataScreenTitle} alt="" />
							</div>
							<div className="dataScreen-main-chart">
								<HotPlateChart />
							</div>
						</div>
						{/* <div className="dataScreen-center">
							<div className="dataScreen-main-title">
								<span>年度游客量对比</span>
								<img src={dataScreenTitle} alt="" />
							</div>
							<div className="dataScreen-main-chart">
								<AnnualUseChart />
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DataScreen;
