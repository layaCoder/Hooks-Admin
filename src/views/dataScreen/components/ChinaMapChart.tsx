import { useEcharts } from "@/hooks/useEcharts";
import { EChartsOption } from "echarts";
import echarts from "@/utils/echarts";
import mapJson from "../assets/china.json";
import wuhan from "../assets/wuhan/wuhan.json";
import "./ChinaMapChart.less";

const ChinaMapChart = () => {
	echarts.registerMap("wuhan", wuhan as any);
	/* echarts sysmbol */
	// let planePath: string =
	// 	"path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";
	// let data = [
	// 	{
	// 		fromName: "北京",
	// 		toName: "上海",
	// 		coords: [
	// 			[116.4551, 40.2539],
	// 			[121.4648, 31.2891]
	// 		]
	// 	},
	// 	{
	// 		fromName: "上海",
	// 		toName: "北京",
	// 		coords: [
	// 			[121.4648, 31.2891],
	// 			[116.4551, 40.2539]
	// 		]
	// 	},
	// 	{
	// 		fromName: "北京",
	// 		toName: "广州",
	// 		coords: [
	// 			[116.4551, 40.2539],
	// 			[113.5107, 23.2196]
	// 		]
	// 	},
	// 	{
	// 		fromName: "广州",
	// 		toName: "北京",
	// 		coords: [
	// 			[113.5107, 23.2196],
	// 			[116.4551, 40.2539]
	// 		]
	// 	},
	// 	{
	// 		fromName: "北京",
	// 		toName: "成都",
	// 		coords: [
	// 			[116.4551, 40.2539],
	// 			[103.9526, 30.7617]
	// 		]
	// 	},
	// 	{
	// 		fromName: "成都",
	// 		toName: "北京",
	// 		coords: [
	// 			[103.9526, 30.7617],
	// 			[116.4551, 40.2539]
	// 		]
	// 	},
	// 	{
	// 		fromName: "成都",
	// 		toName: "新疆维吾尔自治区",
	// 		coords: [
	// 			[103.9526, 30.7617],
	// 			[85.294711, 41.371801]
	// 		]
	// 	},
	// 	{
	// 		fromName: " 新疆维吾尔自治区",
	// 		toName: "成都",
	// 		coords: [
	// 			[85.294711, 41.371801],
	// 			[103.9526, 30.7617]
	// 		]
	// 	}
	// ];

	const option: EChartsOption = {
		// 悬浮窗
		tooltip: {
			trigger: "item",
			formatter: function (params: any) {
				return `${params.name}: ${params.value || "-"}`;
			}
		},
		// echarts大小位置
		grid: {
			left: "0px",
			right: "80px",
			top: "10px",
			bottom: "10px"
		},
		geo: {
			map: "wuhan",
			zoom: 3.9,
			// center: [102.848234, 32.82333],
			scaleLimit: {
				min: 1
			},
			label: {
				color: "#fff",
				show: true
			},
			emphasis: {
				label: {
					color: "#fff",
					show: true
				},
				itemStyle: {
					areaColor: {
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: "#073684" // 0% 处的颜色
							},
							{
								offset: 1,
								color: "#2B91B7" // 100% 处的颜色
							}
						]
					}
				}
			},
			roam: false,
			itemStyle: {
				areaColor: {
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [
						{
							offset: 0,
							color: "#073684" // 0% 处的颜色
						},
						{
							offset: 1,
							color: "#061E3D" // 100% 处的颜色
						}
					]
				},
				borderColor: new echarts.graphic.LinearGradient(
					0,
					0,
					0,
					1,
					[
						{
							offset: 0,
							color: "#00F6FF"
						},
						{
							offset: 1,
							color: "#87ADCB"
						}
					],
					false
				),
				shadowColor: "rgba(10,76,139,1)",
				shadowOffsetY: 0,
				shadowBlur: 60,
				borderWidth: 1
			},
			tooltip: {
				show: false
			}
		},
		series: [
			{
				type: "scatter",
				name: "title",
				coordinateSystem: "geo",
				data: [
					{
						name: "龙王庙1/2号设备",
						value: [114.30368, 30.573438]
					}
				],
				itemStyle: {
					normal: {
						color: "#CD2626",
						shadowColor: "#83bff6",
						shadowBlur: 3,
						shadowOffsetX: 1,
						shadowOffsetY: 2
					}
				},
				label: {
					formatter: "{b}",
					position: "right",
					show: true
				},
				// itemStyle: {
				// 	color: '#ddb926'
				// },
				emphasis: {
					label: {
						show: true
					}
				}
			}
		]
	};

	const [echartsRef] = useEcharts(option);

	return (
		<div className="content-box">
			<div className="map-ball"></div>
			<div ref={echartsRef} className="echarts"></div>
		</div>
	);
};

export default ChinaMapChart;
