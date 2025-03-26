"use client";
import { ResponsiveLine } from "@nivo/line";

// @ts-ignore
export default function ProgressionGraph({ data }) {
  const labeledData = data.map((group: any) => ({
    ...group,
    id: `Group ${group.id}`,
  }));

  return (
    <div
      style={{
        height: 180,
        width: "100%",
      }}
    >
      <ResponsiveLine
        data={labeledData}
        margin={{ top: 0, right: 110, bottom: 36, left: 36 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2%"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: 36,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        curve="catmullRom"
        axisLeft={null}
        lineWidth={3}
        pointSize={0}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(255, 255, 255, 0.5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        theme={{
          background: "#ffffff",
          axis: {
            ticks: {
              text: {
                fontFamily: "Quicksand, sans-serif",
                fontSize: 12,
              },
            },
            legend: {
              text: {
                fontFamily: "Quicksand, sans-serif",
                fontSize: 14,
              },
            },
          },
          legends: {
            text: {
              fontFamily: "Quicksand, sans-serif",
              fontSize: 12,
            },
          },
          tooltip: {
            container: {
              fontFamily: "Quicksand, sans-serif",
              borderRadius: "8px",
              padding: "8px",
              background: "#ffffff",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.15)",
            },
          },
        }}
      />
    </div>
  );
}
