import * as echarts from "echarts";

const xLabel = ["3.26", "3.27", "3.28", "3.29", "3.30", "3.31"];
const goToSchool = ["40", "60", "22", "85", "50", "40"];
const goOutSchool = ["20", "50", "12", "65", "30", "60"];
export const lineOption = {
  backgroundColor: "#0e1c47",
  tooltip: {
    trigger: "axis",
    backgroundColor: "transparent",
    axisPointer: {
      lineStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(126,199,255,0)", // 0% 处的颜色
            },
            {
              offset: 0.5,
              color: "rgba(126,199,255,1)", // 100% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(126,199,255,0)", // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
    formatter: (p) => {
      let dom = `<div style="width: 79px;
	height: 50px;;color:#fff;position: relative;">
        <svg style="position: absolute;top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);" class="svg" xmlns="http://www.w3.org/2000/svg" width="100" height="71" viewBox="0 0 84 55">
      <defs>
        <style>
          .cls-1 {
            fill: #07172c;
            fill-opacity: 0.8;
            stroke: #a7d8ff;
            stroke-linejoin: round;
            stroke-opacity: 0.2;
            stroke-width: 1px;
            fill-rule: evenodd;
          }

        </style>
      </defs>
      <path id="矩形_419" data-name="矩形 419" class="cls-1" d="M266,595h74v50H266V624.046L261,620l5-3.984V595Z"
        transform="translate(-258.5 -592.5)" />
    </svg>
        <div style="padding: 4px 8px 4px 14px;display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;position: relative;z-index: 1;">
            <div style="margin-bottom: 4px;width:100%;display:${
              p[0] ? "flex" : "none"
            };justify-content:space-between;align-items:center;">
                <span style="font-size:14px;color:#7ec7ff;">${
                  p[0] ? p[0].seriesName : ""
                }</span>
                <span style="font-size:14px;color:#fff;">${
                  p[0] ? p[0].data : ""
                }</span>
            </div>
            <div style="width:100%;height:100%;display:${
              p[1] ? "flex" : "none"
            };justify-content:space-between;align-items:center;">
                <span style="font-size:14px;color:#7ec7ff;">${
                  p[1] ? p[1].seriesName : ""
                }</span>
                <span style="font-size:14px;color:#fff;">${
                  p[1] ? p[1].data : ""
                }</span>
            </div>
        </div>
    </div>`;
      return dom;
    },
  },
  legend: {
    align: "left",
    right: "10%",
    top: "10%",
    type: "plain",
    textStyle: {
      color: "#7ec7ff",
      fontSize: 16,
    },
    // icon:'rect',
    itemGap: 25,
    itemWidth: 18,
    icon: "path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",

    data: [
      {
        name: "上层",
      },
      {
        name: "下层",
      },
    ],
  },
  grid: {
    top: "20%",
    left: "10%",
    right: "10%",
    bottom: "15%",
    // containLabel: true
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      axisLine: {
        //坐标轴轴线相关设置。数学上的x轴
        show: true,
        lineStyle: {
          color: "#233653",
        },
      },
      axisLabel: {
        //坐标轴刻度标签的相关设置
        textStyle: {
          color: "#7ec7ff",
          padding: 16,
          fontSize: 14,
        },
        formatter: function (data) {
          return data;
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#192a44",
        },
      },
      axisTick: {
        show: false,
      },
      data: xLabel,
    },
  ],
  yAxis: [
    {
      name: "高度",
      nameTextStyle: {
        color: "#7ec7ff",
        fontSize: 16,
        padding: 10,
      },
      min: 0,
      splitLine: {
        show: true,
        lineStyle: {
          color: "#192a44",
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#233653",
        },
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#7ec7ff",
          padding: 16,
        },
        formatter: function (value) {
          if (value === 0) {
            return value;
          }
          return value;
        },
      },
      axisTick: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: "上层",
      type: "line",
      symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
      showAllSymbol: true,
      symbolSize: 0,
      smooth: true,
      lineStyle: {
        normal: {
          width: 5,
          color: "rgba(25,163,223,1)", // 线条颜色
        },
        borderColor: "rgba(0,0,0,.4)",
      },
      itemStyle: {
        color: "rgba(25,163,223,1)",
        borderColor: "#646ace",
        borderWidth: 2,
      },
      tooltip: {
        show: true,
      },
      areaStyle: {
        //区域填充样式
        normal: {
          //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(25,163,223,.3)",
              },
              {
                offset: 1,
                color: "rgba(25,163,223, 0)",
              },
            ],
            false
          ),
          shadowColor: "rgba(25,163,223, 0.5)", //阴影颜色
          shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
        },
      },
      data: goToSchool,
    },
    {
      name: "下层",
      type: "line",
      symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
      showAllSymbol: true,
      symbolSize: 0,
      smooth: true,
      lineStyle: {
        normal: {
          width: 5,
          color: "rgba(10,219,250,1)", // 线条颜色
        },
        borderColor: "rgba(0,0,0,.4)",
      },
      itemStyle: {
        color: "rgba(10,219,250,1)",
        borderColor: "#646ace",
        borderWidth: 2,
      },
      tooltip: {
        show: true,
      },
      areaStyle: {
        //区域填充样式
        normal: {
          //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(10,219,250,.3)",
              },
              {
                offset: 1,
                color: "rgba(10,219,250, 0)",
              },
            ],
            false
          ),
          shadowColor: "rgba(10,219,250, 0.5)", //阴影颜色
          shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
        },
      },
      data: goOutSchool,
    },
  ],
};

const dataX = [
  "XX街道",
  "XX街道",
  "XX街道",
  "XX街道",
  "XX街道",
  "XX街道",
  "XX街道",
  "XX街道",
  "XX街道",
  "XX街道",
  "XX街道",
  "XX街道",
  "XX街道",
  "XX街道",
  "XX街道",
  "XX街道",
  "XX街道",
  "XX街道",
]; //名称
const dataY = [
  20, 50, 15, 35, 50, 30, 40, 50, 60, 20, 50, 15, 35, 50, 30, 40, 50, 60,
]; //数据
const zoomShow = false;
export const barOption = {
  backgroundColor: "#0D2753",
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    top: "10%",
    right: "5%",
    left: "8%",
    bottom: "15%",
  },
  xAxis: [
    {
      type: "category",
      data: dataX,
      axisLine: {
        lineStyle: {
          color: "rgba(66, 192, 255, .3)",
        },
      },
      axisLabel: {
        interval: 0,
        margin: 10,
        color: "#05D5FF",
        textStyle: {
          fontSize: 11,
        },
        rotate: "45",
      },
      axisTick: {
        //刻度
        show: false,
      },
    },
  ],
  yAxis: [
    {
      axisLabel: {
        padding: [3, 0, 0, 0],
        formatter: "{value}",
        color: "rgba(95, 187, 235, 1)",
        textStyle: {
          fontSize: 11,
        },
      },
      axisTick: {
        show: true,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(66, 192, 255, .3)",
        },
      },
      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,0)",
        },
      },
    },
  ],
  dataZoom: [
    //滚动条
    {
      show: zoomShow,
      type: "slider",
      realtime: true,
      startValue: 0,
      endValue: 14,
      xAxisIndex: [0],
      bottom: "10",
      left: "30",
      height: 10,
      borderColor: "rgba(0,0,0,0)",
      textStyle: {
        color: "#05D5FF",
      },
    },
  ],
  series: [
    {
      type: "bar",
      data: dataY,
      barWidth: "10",
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(5, 213, 255, 1)", // 0% 处的颜色
              },
              {
                offset: 0.98,
                color: "rgba(5, 213, 255, 0)", // 100% 处的颜色
              },
            ],
            false
          ),
          shadowColor: "rgba(5, 213, 255, 1)",
          shadowBlur: 4,
        },
      },
      label: {
        normal: {
          show: true,
          lineHeight: 10,
          formatter: "{c}",
          position: "top",
          textStyle: {
            color: "#fff",
            fontSize: 10,
          },
        },
      },
    },
  ],
};

export const lineOption1 = {
  title: {
    // text: "Stacked Line",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: [
      "广州西门子变压器公司",
      "耐恒（广州）纸品有限公司",
      "广州斗原钢铁有限公司",
      "广州璨宇光学有限公司",
      "佐登妮丝（广州）有限公司",
    ],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [
      "2021-12-20 00:00:00",
      "2021-12-20 06:00:00",
      "2021-12-20 12:00:00",
      "2021-12-20 18:00:00",
      "2021-12-21 00:00:00",
      "2021-12-21 06:00:00",
      "2021-12-21 12:00:00",
      "2021-12-21 18:00:00",
      "2021-12-22 00:00:00",
    ],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "广州西门子变压器公司",
      type: "line",
      // stack: 'Total',
      data: [130, 105, 135, 120, 175, 205, 185, 195, 208],
      smooth: true,
    },
    {
      name: "耐恒（广州）纸品有限公司",
      type: "line",
      // stack: 'Total',
      data: [225, 222, 180, 234, 205, 180, 170, 220, 231],
      smooth: true,
    },
    {
      name: "广州斗原钢铁有限公司",
      type: "line",
      // stack: 'Total',
      data: [180, 230, 201, 150, 230, 230, 240, 210, 240],
      smooth: true,
    },
    {
      name: "广州璨宇光学有限公司",
      type: "line",
      // stack: 'Total',
      data: [180, 175, 201, 210, 200, 142, 205, 235, 248],
      smooth: true,
    },
    {
      name: "佐登妮丝（广州）有限公司",
      type: "line",
      // stack: 'Total',
      data: [235, 250, 238, 252, 260, 245, 235, 235, 230],
      smooth: true,
    },
  ],
};

export const barOption2 = {
  backgroundColor: "#031d33",
  legend: {
    top: "20",
    x: "center",
    textStyle: {
      fontSize: 16,
      color: "rgba(101, 213, 255, 1)",
    },
    icon: "path://M512 881.777778 512 881.777778C716.222629 881.777778 881.777778 716.222629 881.777778 512 881.777778 307.777371 716.222629 142.222222 512 142.222222 307.777373 142.222222 142.222222 307.777371 142.222222 512 142.222222 716.222629 307.777373 881.777778 512 881.777778L512 881.777778ZM512 1024 512 1024C229.230208 1024 0 794.769789 0 512 0 229.230211 229.230208 0 512 0 794.769789 0 1024 229.230211 1024 512 1024 794.769789 794.769789 1024 512 1024L512 1024Z",
    itemWidth: 8, // 设置宽度
    itemHeight: 8, // 设置高度、
    itemGap: 12, // 设置间距
  },
  tooltip: {
    show: true,
    trigger: "axis", //axis , item
    backgroundColor: "RGBA(0, 49, 85, 1)",
    borderColor: "rgba(0, 151, 251, 1)",
    borderWidth: 1,
    borderRadius: 0,
    textStyle: {
      color: "#BCE9FC",
      fontSize: 16,
      align: "left",
    },
  },
  grid: {
    right: "5%",
    top: "20%",
    left: "5%",
    bottom: "5%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: true,
    data: ["奉城镇", "南桥镇", "四团镇", "青村镇", "柘林镇"],
    axisLabel: {
      //坐标轴刻度标签的相关设置。
      interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
      //	margin:15,
      textStyle: {
        color: "#65D5FF",
        fontStyle: "normal",
        fontSize: 16,
      },
    },
    axisTick: {
      //坐标轴刻度相关设置。
      show: false,
    },
    axisLine: {
      //坐标轴轴线相关设置
      lineStyle: {
        color: "rgba(77, 128, 254, 0.2)",
      },
    },
    splitLine: {
      //坐标轴在 grid 区域中的分隔线。
      show: true,
      lineStyle: {
        color: "rgba(77, 128, 254, 0.2)",
      },
    },
  },
  yAxis: [
    {
      type: "value",
      splitNumber: 3,
      axisLabel: {
        textStyle: {
          color: "#65D5FF",
          fontStyle: "normal",
          fontSize: 16,
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(77, 128, 254, 0.2)",
        },
      },
    },
  ],
  series: [
    {
      name: "1月",
      type: "pictorialBar",
      barWidth: "60%",
      stack: "总量",
      label: {
        normal: {
          show: false,
        },
      },
      itemStyle: {
        normal: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(0, 151, 251, 1)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(0, 34, 66, 0.2)", // 100% 处的颜色
              },
            ],
            globalCoord: false, // 缺省为 false
          }, //渐变颜色
        },
      },
      symbol:
        "path://M12.000,-0.000 C12.000,-0.000 16.074,60.121 22.731,60.121 C26.173,60.121 -3.234,60.121 0.511,60.121 C7.072,60.121 12.000,-0.000 12.000,-0.000 Z",

      data: [23, 84, 101, 74, 87],
    },
    {
      name: "2月",
      type: "pictorialBar",
      barWidth: "60%",
      stack: "总量",
      label: {
        normal: {
          show: false,
        },
      },
      itemStyle: {
        normal: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(48, 236, 166, 1)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(0, 34, 66, 0.2)", // 100% 处的颜色
              },
            ],
            globalCoord: false, // 缺省为 false
          }, //渐变颜色
        },
      },
      symbol:
        "path://M12.000,-0.000 C12.000,-0.000 16.074,60.121 22.731,60.121 C26.173,60.121 -3.234,60.121 0.511,60.121 C7.072,60.121 12.000,-0.000 12.000,-0.000 Z",

      data: [13, 54, 71, 24, 57],
    },
  ],
};
