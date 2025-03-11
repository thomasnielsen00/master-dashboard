import React from "react";
import styles from "./engagement_meter.module.css";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

type EngagementLevelProps = {
  engagement_value: number;
  size: "large" | "small";
};

export default function EngagementLevel({
  engagement_value,
  size,
}: EngagementLevelProps) {
  // Quick range check on the input
  let value_prop = 0;
  if (engagement_value > 100) {
    value_prop = 100;
  } else if (engagement_value < 0) {
    value_prop = 0;
  } else {
    value_prop = engagement_value;
  }

  const sizeValue = {
    large: { width: 130, height: 75, fontSize: 20, fill: "#f1f1f1" },
    small: { width: 100, height: 60, fontSize: 14, fill: "#fff" },
  };

  const settings = {
    width: sizeValue[size].width,
    height: sizeValue[size].height,
    value: value_prop,
    startAngle: -90,
    endAngle: 90,
  };

  // Conditionally define the gradient IDs based on the value
  let gradientId;
  let gradientStops;
  if (value_prop <= 33) {
    gradientId = "gaugeGradientRedOrange";
    gradientStops = (
      <>
        <stop offset="0%" stopColor="red" />
        <stop offset="100%" stopColor="orange" />
      </>
    );
  } else if (value_prop <= 66) {
    gradientId = "gaugeGradientRedOrangeYellow";
    gradientStops = (
      <>
        <stop offset="0%" stopColor="red" />
        <stop offset="33%" stopColor="orange" />
        <stop offset="66%" stopColor="yellow" />
      </>
    );
  } else {
    gradientId = "gaugeGradientRedOrangeYellowGreen";
    gradientStops = (
      <>
        <stop offset="0%" stopColor="red" />
        <stop offset="33%" stopColor="orange" />
        <stop offset="66%" stopColor="yellow" />
        <stop offset="100%" stopColor="green" />
      </>
    );
  }

  return (
    <div>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id={gradientId}>{gradientStops}</linearGradient>
        </defs>
      </svg>

      <Gauge
        {...settings}
        cornerRadius="50%"
        sx={() => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: sizeValue[size].fontSize,
            color: "#686666",
            fontWeight: 500,
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: `url(#${gradientId})`,
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: sizeValue[size].fill,
          },
        })}
      />
    </div>
  );
}
