/* eslint-disable unicorn/consistent-function-scoping */
import React, { useEffect, useRef } from 'react';

interface IPieChartProps {
  width: number;
  height: number;
  data: { value: number }[];
}

const cy = 138;
const ry = 138;

const PieChart = ({ width, height, data }: IPieChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const ellipse: { cx: number; cy: number; rx: number; ry: number; phi: number } = {
    cx: width / 2,
    cy,
    rx: width / 2,
    ry,
    phi: 0,
  };

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const arr = Pie(data);
    for (let i = 0; i <= arr.length; i++) {
      const item = arr[i];
      if (svgRef.current) {
        svgRef.current.innerHTML += `<g>
          <path d="${item?.d}" stroke="none" fill="${item?.color}" />
        </g>`;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const Pie = (data: { value: number }[]) => {
    let start = 0;
    return data.map((item, index) => {
      const percent = item.value;
      const pie = {
        start: rad(start),
        delta: rad(start + percentToDeg(percent)) - rad(start),
      };

      start += percentToDeg(percent);

      const { x1, y1, x2, y2, fa, fs } = getEndpointParameters(
        ellipse.cx,
        ellipse.cy,
        ellipse.rx,
        ellipse.ry,
        ellipse.phi,
        pie.start,
        pie.delta,
      );

      const { cx, cy } = getCenterParameters(
        x1,
        y1,
        x2,
        y2,
        fa,
        fs,
        ellipse.rx,
        ellipse.ry,
        ellipse.phi,
      );

      return {
        d: `M ${cx} ${cy}
        L ${x1} ${y1}
        A ${ellipse.rx} ${ellipse.ry} ${deg(ellipse.phi)} ${fa} ${fs} ${x2} ${y2}
        Z`,
        index,
        percent,
        color: dynamicColors(),
      };
    });
  };

  const rad = (deg: number) => {
    return (deg * Math.PI) / 180;
  };

  const dynamicColors = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  };

  const percentToDeg = (percent: number) => (percent * 360) / 100;

  const getEndpointParameters = (
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    phi: number,
    theta: number,
    dTheta: number,
  ) => {
    const [x1, y1] = getEllipsePointForAngle(cx, cy, rx, ry, phi, theta);
    const [x2, y2] = getEllipsePointForAngle(cx, cy, rx, ry, phi, theta + dTheta);

    const fa = Math.abs(dTheta) > Math.PI ? 1 : 0;
    const fs = dTheta > 0 ? 1 : 0;

    return { x1, y1, x2, y2, fa, fs };
  };

  const getEllipsePointForAngle = (
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    phi: number,
    theta: number,
  ) => {
    const { abs, sin, cos } = Math;

    const M = abs(rx) * cos(theta);
    const N = abs(ry) * sin(theta);

    return [cx + cos(phi) * M - sin(phi) * N, cy + sin(phi) * M + cos(phi) * N];
  };

  const getCenterParameters = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    fa: number,
    fs: number,
    rx: number,
    ry: number,
    phi: number,
  ) => {
    const { abs, sin, cos, sqrt } = Math;
    const pow = (n: number) => Math.pow(n, 2);

    const sinphi = sin(phi);
    const cosphi = cos(phi);

    // Step 1: simplify through translation/rotation
    const x = (cosphi * (x1 - x2)) / 2 + (sinphi * (y1 - y2)) / 2;
    const y = (-sinphi * (x1 - x2)) / 2 + (cosphi * (y1 - y2)) / 2;

    const px = pow(x);
    const py = pow(y);
    const prx = pow(rx);
    const pry = pow(ry);

    // correct of out-of-range radii
    const L = px / prx + py / pry;

    if (L > 1) {
      rx = sqrt(L) * abs(rx);
      ry = sqrt(L) * abs(ry);
    } else {
      rx = abs(rx);
      ry = abs(ry);
    }

    // Step 2 + 3: compute center
    const sign = fa === fs ? -1 : 1;
    const M = sqrt((prx * pry - prx * py - pry * px) / (prx * py + pry * px)) * sign;

    const _cx = (M * (rx * y)) / ry;
    const _cy = (M * (-ry * x)) / rx;

    const cx = cosphi * _cx - sinphi * _cy + (x1 + x2) / 2;
    const cy = sinphi * _cx + cosphi * _cy + (y1 + y2) / 2;

    // Step 4: compute θ and dθ
    const theta = vectorAngle([1, 0], [(x - _cx) / rx, (y - _cy) / ry]);

    let _dTheta =
      deg(vectorAngle([(x - _cx) / rx, (y - _cy) / ry], [(-x - _cx) / rx, (-y - _cy) / ry])) % 360;

    if (fs === 0 && _dTheta > 0) {
      _dTheta -= 360;
    }
    if (fs === 1 && _dTheta < 0) {
      _dTheta += 360;
    }

    return { cx, cy, theta, dTheta: rad(_dTheta) };
  };

  const vectorAngle = ([ux, uy]: number[], [vx, vy]: number[]) => {
    const { acos, sqrt } = Math;
    const sign = ux * vy - uy * vx < 0 ? -1 : 1;
    const ua = sqrt(ux * ux + uy * uy);
    const va = sqrt(vx * vx + vy * vy);
    const dot = ux * vx + uy * vy;

    return sign * acos(dot / (ua * va));
  };

  const deg = (rad: number) => {
    return (rad * 180) / Math.PI;
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      ref={svgRef}
    >
      <ellipse opacity='0.5' cx='159.5' cy='158' rx='159' ry='138' fill='#08AADD' />
      <ellipse
        cx={ellipse.cx}
        cy={ellipse.cy}
        rx={ellipse.rx}
        ry={ellipse.ry}
        fill='#08AADD'
        transform={`rotate(${deg(ellipse.phi)} ${ellipse.cx} ${ellipse.cy})`}
      />
    </svg>
  );
};

export default PieChart;
