import { useState } from "react";
import DisconnectButton from "./DisconnectButton";
import VolcanoSerialNumber from "./features/SerialNumber/SerialNumberContainer";
import HoursOfOperation from "./features/HoursOfOperation/HoursOfOperationContainer";
import VolcanoFirmwareVersion from "./features/VolcanoFirmwareVersion/VolcanoFirmwareVersionContainer";
import BleFirmwareVersion from "./features/BleFirmwareVersion/BleFirmwareVersionContainer";
import HeatOn from "./features/HeatOn/HeatOnContainer";
import FanOn from "./features/FanOn/FanOnContainer";
import FOrC from "./features/FOrC/FOrCContainer";
import CurrentTemperature from "./features/CurrentTemperature/CurrentTemperatureContainer";
import WriteTemperature from "./features/WriteTemperature/WriteTemperatureContainer";

import "./Volcano.css";

function Volcano() {
  const [isF, setIsF] = useState(undefined);
  return (
    <div>
      <DisconnectButton />
      <VolcanoSerialNumber />
      <HoursOfOperation />
      <VolcanoFirmwareVersion />
      <BleFirmwareVersion />
      <FOrC setIsF={setIsF} isF={isF} />
      <CurrentTemperature isF={isF} />
      <div className="footer">
        <div className="footer-main-div">
          <WriteTemperature isF={isF} />

          <div className="heat-air-div">
            <HeatOn />
            <FanOn />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Volcano;
