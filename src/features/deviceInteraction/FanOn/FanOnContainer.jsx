import FanOn from "./FanOn";

export default function FanOnContainer(props) {
  return <FanOn ref={props.fanOnRef} onChange={props.onClick} isFanOn={props.isFanOn} />;
}
