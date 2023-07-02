import React, { useEffect, useRef } from "react";
import SvgGauge from "svg-gauge";
import "../assets/css/Gauge.css";


const Gauge = (props) => {
  const gaugeEl = useRef(null);
  const gaugeRef = useRef(null);
  const {defaultOptions} = props
  useEffect(() => {
    if (!gaugeRef.current) {
      const options = { ...defaultOptions, ...props };
      gaugeRef.current = SvgGauge(gaugeEl.current, options);
      gaugeRef.current.setValue(options.initialValue);
    }
    gaugeRef.current.setValueAnimated(props.value, 1);
  }, [props]);

  return (
    <div ref={gaugeEl} className="gauge-container two" />
  );
};

export default Gauge;


