/* eslint-disable unicorn/consistent-function-scoping */
import React, { useEffect, useRef } from 'react';

interface IPieChartProps {
  width: number;
  height: number;
  data: {
    value: number;
  }[];
  color?: [];
  strokeWidth: number;
}

const PieChart = ({ width, height, data, color: colorProps, strokeWidth }: IPieChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.floor(width / 2 - strokeWidth / 2);
    const color = colorProps || ['#F6BB42', '#8CC152', '#3BAFDA', '#967ADC', '#DA4453'];

    const arr = Donut(centerX, centerY, radius, data);

    for (let i = 0; i <= arr.length; i++) {
      const item = arr[i];
      if (svgRef.current) {
        svgRef.current.innerHTML += `<g>
          <path d="${item?.d}" stroke="${color[i]}" fill="none" stroke-width="${strokeWidth}" />
        </g>`;
      }
    }
  }, [colorProps, data, height, strokeWidth, width]);

  const Donut = (cx: number, cy: number, radius: number, data: { value: number }[]) => {
    const arcRadius = (cx: number, cy: number, radius: number, degrees: number) => {
      const radians = ((degrees - 90) * Math.PI) / 180;
      return {
        x: cx + radius * Math.cos(radians),
        y: cy + radius * Math.sin(radians),
      };
    };

    let total = 0;
    const arr = [];
    let beg = 0;
    let end = 0;
    let count = 0;

    for (const datum of data) {
      total += datum.value;
    }

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const tmp: { index?: number; value?: number; data?: { value: number }; d?: string } = {};

      let p = +(((item.value + 1) / total) * 100).toFixed(2);

      count += p;

      if (i === data.length - 1 && count < 100) {
        p = p + (100 - count);
      }

      end = beg + (360 / 100) * p;
      tmp.index = i;
      tmp.value = item.value;
      tmp.data = item;

      const b = arcRadius(cx, cy, radius, end);
      const e = arcRadius(cx, cy, radius, beg);
      const la = end - beg <= 180 ? 0 : 1;

      tmp.d = [
        'M',
        b.x.toFixed(4),
        b.y.toFixed(4),
        'A',
        radius,
        radius,
        0,
        la,
        0,
        e.x.toFixed(4),
        e.y.toFixed(4),
      ].join(' ');
      arr.push(tmp);
      beg = end;
    }

    return arr;
  };

  return <svg ref={svgRef} width={width} height={height} />;
};
export default PieChart;
