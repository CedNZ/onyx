import HeatOn from "./HeatOn/HeatOnContainer";
import FanOn from "./FanOn/FanOnContainer";
import CurrentTemperature from "./CurrentTemperature/CurrentTemperatureContainer";
import WriteTemperature from "./WriteTemperature/WriteTemperatureContainer";
import CurrentTargetTemperature from "./CurrentTargetTemperature/CurrentTargetTemperatureContainer";
import TargetTemperatureRange from "./TargetTemperatureRange/TargetTemperatureRange";

import WorkFlow from "../workflowEditor/WorkflowButtons";
import Container from "react-bootstrap/Container";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { useCallback, useEffect, useRef } from "react";
import {
    convertToUInt8BLE,
    convertBLEtoUint16,
    convertToggleCharacteristicToBool,
} from "../../services/utils";
import { getCharacteristic } from "../../services/BleCharacteristicCache";
import { fanOnUuid, fanOffUuid, register1Uuid } from "../../constants/uuids";
import { fanMask } from "../../constants/masks";
import { setIsFanOn } from "./deviceInteractionSlice";
import store from "../../store";
import { AddToQueue, AddToPriorityQueue } from "../../services/bleQueueing";

const Div = styled.div`
  align-self: flex-end;
  justify-content: end;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
function Volcano() {
    /* eslint-disable no-unused-vars */
    //little hack to make Pridetext reaminate when these states change
    const currentTargetTemperature = useSelector(
        (state) => state.deviceInteraction.targetTemperature
    );

    const currentTemperature = useSelector(
        (state) => state.deviceInteraction.currentTemperature
    );
    /* eslint-enable no-unused-vars */

    const isFanOn = useSelector((state) => state.deviceInteraction.isFanOn);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isFanOn === undefined) {
            const blePayload = async () => {
                const characteristicPrj1V = getCharacteristic(register1Uuid);
                const value = await characteristicPrj1V.readValue();
                const currentVal = convertBLEtoUint16(value);
                const initialFanValue = convertToggleCharacteristicToBool(currentVal, fanMask);
                if (store.getState().deviceInteraction.isFanOn !== initialFanValue) {
                    dispatch(setIsFanOn(initialFanValue));
                }
            };
            AddToQueue(blePayload);
        }
    }, [dispatch, isFanOn]);

    const onClick = useCallback((nextState) => {
        const blePayload = async () => {
            const targetCharacteristicUuid = nextState ? fanOnUuid : fanOffUuid;
            const characteristic = getCharacteristic(targetCharacteristicUuid);
            const buffer = convertToUInt8BLE(0);
            await characteristic.writeValue(buffer);
        };
        AddToPriorityQueue(blePayload);
    }, []);

    const fanOnRef = useRef(null);
    const spaceBarKeycode = 32;
    useEffect(() => {
        const handler = (e) => {
            if (e.keyCode === spaceBarKeycode) {
                fanOnRef.current.click();
            }
        };
        document.addEventListener('keyup', handler);

        return () => {
            document.removeEventListener('keyup', handler);
        };
    }, [onClick]);

    const clickHandler = (e) => {
        onClick(!isFanOn);
    };

    return (
        <Container style={{ display: "flex" }} onClick={clickHandler}>
            <Div>
                <CurrentTemperature />
                <CurrentTargetTemperature />
                <span onClick={(e) => e.stopPropagation()}>
                    <WriteTemperature />
                    <WorkFlow />
                    <TargetTemperatureRange />
                    <div className="heat-air-div">
                        <HeatOn />
                        <FanOn fanOnRef={fanOnRef} onChange={onClick} isFanOn={isFanOn} onClick={clickHandler} />
                    </div>
                </span>
            </Div>
        </Container>
    );
}

export default Volcano;
