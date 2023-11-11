import Ract from "react";
import { useEcharts } from "@/hooks/useEcharts";
import { EChartsOption } from "echarts";
import { ranking1, ranking2, ranking3, ranking4 } from "../assets/ranking-icon";
import "./HotPlateChart.less";
interface ChartProp {
	name: string;
	value: number;
	percentage: string;
	maxValue: number;
}
const HotPlateChart = (props: any) => {
	const { equiptData = {} } = props;

	let data = [
		{
			value: Math.abs(Number(equiptData.DE)),
			name: "东坐标偏值",
			// percentage: `${Math.abs(Number(equiptData.DE))}%`,
			maxValue: 0.5
		},
		{
			value: Math.abs(Number(equiptData.DH)),
			name: "高程移偏值",
			// percentage: "60%",
			maxValue: 0.5
		},
		{
			value: Math.abs(Number(equiptData.DN)),
			name: "北坐标位值",
			// percentage: "50%",
			maxValue: 0.5
		},
		{
			value: Math.abs(Number(equiptData.DX)),
			name: "空间北坐标",
			// percentage: "50%",
			maxValue: 10
		},
		{
			value: Math.abs(Number(equiptData.DY)),
			name: "空间东坐标",
			// percentage: "40%",
			maxValue: 10
		},
		{
			value: Math.abs(Number(equiptData.DZ)),
			name: "空间高程坐标",
			// percentage: "30%",
			maxValue: 10
		}
	];
	const colors = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
	const option: EChartsOption = {
		grid: {
			top: "5%",
			left: "7%",
			right: "4%",
			bottom: "1%",
			containLabel: true
		},
		xAxis: {
			type: "value",
			axisLine: {
				show: false,
				lineStyle: {
					color: "white"
				}
			},
			nameGap: 1,
			splitLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				show: false,
				fontSize: 16
			},
			// boundaryGap: ["3%", "2%"],
			// splitNumber: 4,
			triggerEvent: false
		},
		yAxis: [
			{
				show: true,
				data: data.map((val: ChartProp) => val.name),
				inverse: true,
				axisLine: {
					show: false
				},
				splitLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					color: "#fff",
					formatter: function (value: any) {
						let str = value.length > 6 ? value.slice(0, 6) + "..." : value;
						let index = data.map((item: ChartProp) => item.name).indexOf(value) + 1;
						return ["{title|" + str + "}", "{" + (index > 3 ? "lg" : "lg" + index) + "|NO." + index + "}"].join(" ");
					},
					rich: {
						lg1: {
							width: 60,
							backgroundColor: {
								image: ranking1
							},
							color: "#fff",
							align: "center",
							height: 20,
							fontSize: 13
						},
						lg2: {
							width: 60,
							backgroundColor: {
								image: ranking2
							},
							color: "#fff",
							align: "center",
							height: 20,
							fontSize: 13
						},
						lg3: {
							width: 60,
							backgroundColor: {
								image: ranking3
							},
							color: "#fff",
							align: "center",
							height: 20,
							fontSize: 13
						},
						lg: {
							width: 60,
							backgroundColor: {
								image: ranking4
							},
							color: "#fff",
							align: "center",
							height: 20,
							fontSize: 13
						},
						title: {
							width: 60,
							fontSize: 13,
							align: "center",
							padding: [0, 10, 0, 15]
						}
					}
				},
				triggerEvent: false
			},
			{
				show: true,
				inverse: true,
				data: data,
				axisLabel: {
					fontSize: 14,
					color: "#fff",
					// align: "right",
					margin: 20,
					formatter: (value: any) => {
						return value;
					}
				},
				axisLine: {
					show: false
				},
				splitLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				triggerEvent: false
			}
		]
		// series: [
		// 	{
		// 		name: "条",
		// 		type: "bar",
		// 		yAxisIndex: 0,
		// 		data: data,
		// 		barWidth: 12,
		// 		itemStyle: {
		// 			borderRadius: 30,
		// 			color: function (params) {
		// 				console.log(params, 186)
		// 				let num = colors.length;
		// 				return colors[params.dataIndex % num];
		// 			}
		// 		},
		// 		label: {
		// 			show: true,
		// 			position: [12, 0],
		// 			lineHeight: 14,
		// 			color: "#fff",
		// 			formatter: (params: any) => {
		// 				return params.data.percentage;
		// 			}
		// 		}
		// 	},
		// 	{
		// 		name: "框",
		// 		type: "bar",
		// 		yAxisIndex: 1,
		// 		data: data.map((val: ChartProp) => {
		// 			if (!val.maxValue) {
		// 				return 5;
		// 			}
		// 			return val.maxValue;
		// 		}),
		// 		barWidth: 12,
		// 		itemStyle: {
		// 			color: "none",
		// 			borderColor: "#00c1de",
		// 			borderWidth: 1,
		// 			borderRadius: 15
		// 		},
		// 		silent: true
		// 	}
		// ]
	};
	const [echartsRef] = useEcharts(option, data);

	const renderRow = (key, value) => {
		return (
			<div className="echarts-content ">
				<span className="key-txt">{key}</span>
				<span className="up-down-txt">{value > 0 ? "上升" : "下降"}</span>
				<span className="value-txt">{value}</span>
			</div>
		);
	};

	return (
		<>
			<div className="echarts-header">
				<span>坐标</span>
				<span className="colum-2">正负</span>
				<span>偏移值</span>
			</div>
			<div className="data-area">
				<div>{renderRow("平面东坐标位移偏值", equiptData.DE)}</div>
				<div>{renderRow("平面高程坐标位移偏值", equiptData.DH)}</div>
				<div>{renderRow("平面北坐标位移偏值", equiptData.DN)}</div>
				<div>{renderRow("空间直角北坐标差值", equiptData.DX)}</div>
				<div>{renderRow("空间直角东坐标差值", equiptData.DY)}</div>
				<div>{renderRow("空间直角高程坐标差值", equiptData.DZ)}</div>
			</div>
		</>
	);
};

export default HotPlateChart;
