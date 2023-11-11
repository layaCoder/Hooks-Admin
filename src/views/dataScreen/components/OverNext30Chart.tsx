import { useEcharts } from "@/hooks/useEcharts";
import { EChartsOption } from "echarts";
import { randomNum } from "@/utils/util";
import dayjs from "dayjs";
import "./OverNext30Chart.less";

const OverNext30Chart = (props: any) => {
	const {
		equiptData: { longWangMiao1, longWangMiao2 }
	} = props;
	if (!longWangMiao1.length || !longWangMiao2.length) return;

	// js 获取当前日期到之后一个月30天的日期区间
	const initDate = (): string[] => {
		let dateList = [];
		let startDate = new Date();
		let endDate = new Date();
		endDate.setDate(startDate.getDate() + 30);
		startDate.setDate(startDate.getDate() + 1);
		while (endDate.getTime() - startDate.getTime() >= 0) {
			let month =
				(startDate.getMonth() + 1).toString().length === 1
					? "0" + (startDate.getMonth() + 1).toString()
					: startDate.getMonth() + 1;
			let day = startDate.getDate().toString().length === 1 ? "0" + startDate.getDate() : startDate.getDate();
			dateList.push(month + "/" + day);
			startDate.setDate(startDate.getDate() + 1);
		}
		return dateList;
	};

	const xArr = longWangMiao1.map(it => dayjs(it.DateTime).format("MM月DD日/ HH:mm"));
	const equiptData1 = longWangMiao1.map(it => it.TotalDZ);
	const equiptData2 = longWangMiao2.map(it => it.TotalDZ);

	let data = {
		unit: ["累计偏移量"],
		data: { equiptData1, equiptData2 }
	};

	const option: EChartsOption = {
		tooltip: {
			trigger: "axis",
			confine: true,
			formatter: (params: any) => {
				console.log(params, 50);
				let tipData1 = params[0];
				let tipData2 = params[1];
				let html = `<div class="lineChart-bg">
                        <div><span style="">1号设备 <i >${tipData1.value}</i></span></div>
						 <div><span style="">2号设备 <i >${tipData2.value}</i></span></div>
                    </div>`;
				return html;
			},
			backgroundColor: "transparent", //提示标签背景颜色
			borderColor: "transparent",
			axisPointer: {
				lineStyle: {
					type: "dashed"
				},
				snap: true
			},
			extraCssText: "box-shadow: none;padding:0"
		},
		grid: {
			top: "15%",
			left: "5%",
			right: "5%",
			bottom: "15%"
			// containLabel: true
		},
		xAxis: [
			{
				type: "category",
				boundaryGap: false,
				axisLine: {
					//坐标轴轴线相关设置。数学上的x轴
					show: true,
					symbol: ["none", "arrow"],
					symbolOffset: [0, 30],
					lineStyle: {
						color: "#233653",
						shadowOffsetX: 20,
						shadowColor: "#233653"
					}
				},
				axisLabel: {
					//坐标轴刻度标签的相关设置
					color: "#7ec7ff",
					padding: 0,
					fontSize: 12,
					formatter: function (data) {
						return data;
					}
				},
				splitLine: {
					show: false,
					lineStyle: {
						color: "#192a44"
					}
				},
				axisTick: {
					show: false
				},
				data: xArr
			}
		],
		yAxis: data.unit.map((val: string, index: number) => {
			return {
				name: "累计偏移量",
				nameTextStyle: {
					color: "#7ec7ff",
					fontSize: 12,
					padding: [0, 30, -4, 0]
				},
				// nameGap:18,
				minInterval: 1,
				splitLine: {
					show: false,
					lineStyle: {
						color: "#192a44"
					}
				},
				axisLine: {
					show: index === 0 ? true : false,
					lineStyle: {
						color: "#233653"
					}
				},
				axisLabel: {
					show: true,
					color: "#7ec7ff",
					padding: 0,
					formatter: function (value: string) {
						if (Number(value) >= 10000) {
							value = Number(value) / 10000 + "w";
						}
						return value;
					}
				},
				axisTick: {
					show: false
				}
			};
		}),
		series: [
			{
				name: "龙王庙1号设备",
				type: "line",
				symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
				showSymbol: false,
				smooth: true,
				lineStyle: {
					width: 1,
					color: "#707070", // 线条颜色
					borderColor: "#707070"
				},
				itemStyle: {
					color: "#F5B348",
					shadowColor: "rgba(245, 179, 72, 0.3)",
					shadowBlur: 3
				},
				emphasis: {
					scale: true
				},
				areaStyle: {
					//区域填充样式
					//线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
					color: {
						type: "linear",
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: "#846B38" // 0% 处的颜色
							},
							{
								offset: 0.5,
								color: "#403E47" // 0% 处的颜色
							},
							{
								offset: 1,
								color: "#11144E" // 100% 处的颜色
							}
						],
						global: false // 缺省为 false
					},
					shadowColor: "rgba(255, 199, 37, 0)", //阴影颜色
					shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
				},
				data: data.data.equiptData1
			},
			{
				name: "龙王庙2号设备",
				type: "line",
				symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
				showSymbol: false,
				smooth: true,
				lineStyle: {
					width: 1,
					color: "#707010", // 线条颜色
					borderColor: "#707010"
				},
				itemStyle: {
					color: "#F5B348",
					shadowColor: "rgba(245, 179, 72, 0.3)",
					shadowBlur: 3
				},
				emphasis: {
					scale: true
				},
				areaStyle: {
					//区域填充样式
					//线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
					color: {
						type: "linear",
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: "#843B38" // 0% 处的颜色
							},
							{
								offset: 0.5,
								color: "#453E47" // 0% 处的颜色
							},
							{
								offset: 1,
								color: "#11146E" // 100% 处的颜色
							}
						],
						global: false // 缺省为 false
					},
					shadowColor: "rgba(255, 199, 37, 0)", //阴影颜色
					shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
				},
				data: data.data.equiptData2
			}
		]

		// series: [
		// 	{
		// 		name: 'Email',
		// 		type: 'line',
		// 		stack: 'Total',
		// 		data: [120, 132, 101, 134, 90, 230, 210]
		// 	},
		// 	{
		// 		name: 'Union Ads',
		// 		type: 'line',
		// 		stack: 'Total',
		// 		data: [220, 182, 191, 234, 290, 330, 310]
		// 	}
		// ]
	};
	const [echartsRef] = useEcharts(option, data);
	return <div className="echarts" ref={echartsRef}></div>;
};

export default OverNext30Chart;
