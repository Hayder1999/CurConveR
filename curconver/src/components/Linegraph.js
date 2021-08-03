import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Linegraph = (props) => {
  const { chartData } = props;

  return (
    <ResponsiveContainer width="100%" height="75%">
      <LineChart
        data={ chartData }
        margin={ {
          top: 10,
          right: 10,
          left: 10,
          bottom: 5,
        } }
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" dy={ 10 } />
        <YAxis domain={ ['auto', 'auto'] } />
        <Tooltip />
        <Line type="monotone" dataKey="rate" stroke="#1C69DC" activeDot={ true } />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default Linegraph;