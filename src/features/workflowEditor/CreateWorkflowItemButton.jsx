import { useSelector, useDispatch } from "react-redux";
import { WriteNewConfigToLocalStorage } from "../../services/utils";
import styled from "styled-components";
import Button from "../shared/styledComponents/Button";
import cloneDeep from "lodash/cloneDeep";
import { setCurrentWorkflows } from "../settings/settingsSlice";
import WorkflowItemTypes from "../../constants/enums";

const StyledButton = styled(Button)`
  min-height: 50px;
  margin-top: 15px;
  color: ${(props) => props.theme.settingsPageColor};
`;

export default function CreateWorkflowItemButton(props) {
  const config = useSelector((state) => state.settings.config);
  const dispatch = useDispatch();
  const onClick = () => {
    const newConfig = cloneDeep(config);
    const workflow = newConfig.workflows.find((r) => r.id === props.id);
    const nextId = workflow.payload.length + 1;
    workflow.payload.push({
      type: WorkflowItemTypes.HEAT_OFF,
      id: nextId,
    });
    WriteNewConfigToLocalStorage(newConfig);
    dispatch(setCurrentWorkflows(newConfig.workflows));
  };

  return <StyledButton onClick={onClick}>Add Workflow Item</StyledButton>;
}