import { usePreview } from "react-dnd-preview";
import { useTheme } from "styled-components";
import { isMobile } from "../../../constants/constants";
import { funId } from "../../../constants/themeIds";
import PrideText from "../../../themes/PrideText";
import { useMemo } from "react";
const MyPreview = () => {
  const preview = usePreview();
  const { item, style } = preview;
  const theme = useTheme();
  const memoPrideText = useMemo(
    () => <PrideText text={item?.itemName || ""} />,
    [item?.itemName]
  );
  if (!isMobile) {
    return <></>;
  }
  if (!preview.display) {
    return null;
  }
  style.top = -15;
  style.left = 17.5;

  return (
    <div
      className="item-list__item"
      style={{
        ...style,
        color: theme.iconColor,
        zIndex: 525600,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        style={{
          height: "23px",
          width: "23px",
          fontSize: 25,
          fontWeight: "bold",
          cursor: "move",
          marginLeft: "0",
          marginRight: "10",
          borderRadius: "1rem",
        }}
      >
        <path
          fill={theme.iconColor}
          d="M512 255.1c0 8.188-3.125 16.41-9.375 22.66l-72 72C424.4 356.9 416.2 360 408 360c-18.28 0-32-14.95-32-32c0-8.188 3.125-16.38 9.375-22.62L402.8 288H288v114.8l17.38-17.38C311.6 379.1 319.8 376 328 376c18.28 0 32 14.95 32 32c0 8.188-3.125 16.38-9.375 22.62l-72 72C272.4 508.9 264.2 512 256 512s-16.38-3.125-22.62-9.375l-72-72C155.1 424.4 152 416.2 152 408c0-17.05 13.73-32 32-32c8.188 0 16.38 3.125 22.62 9.375L224 402.8V288H109.3l17.38 17.38C132.9 311.6 136 319.8 136 328c0 17.05-13.73 32-32 32c-8.188 0-16.38-3.125-22.62-9.375l-72-72C3.125 272.4 0 264.2 0 255.1s3.125-16.34 9.375-22.59l72-72C87.63 155.1 95.81 152 104 152c18.28 0 32 14.95 32 32c0 8.188-3.125 16.38-9.375 22.62L109.3 224H224V109.3L206.6 126.6C200.4 132.9 192.2 136 184 136c-18.28 0-32-14.95-32-32c0-8.188 3.125-16.38 9.375-22.62l72-72C239.6 3.125 247.8 0 256 0s16.38 3.125 22.62 9.375l72 72C356.9 87.63 360 95.81 360 104c0 17.05-13.73 32-32 32c-8.188 0-16.38-3.125-22.62-9.375L288 109.3V224h114.8l-17.38-17.38C379.1 200.4 376 192.2 376 184c0-17.05 13.73-32 32-32c8.188 0 16.38 3.125 22.62 9.375l72 72C508.9 239.6 512 247.8 512 255.1z"
        />
      </svg>
      {theme.themeId !== funId ? (
        memoPrideText
      ) : (
        <PrideText text={item.itemName} />
      )}
    </div>
  );
};

export default MyPreview;
