"use client";
import { useMap } from "react-leaflet";
import { Button } from "../ui/button";
import {
  Earth,
  HouseHeart,
  Leaf,
  LocateFixedIcon,
  Palette,
  Shell,
  Users,
} from "lucide-react";
import { ButtonGroup, ButtonGroupSeparator } from "../ui/button-group";
import React from "react";

type Props = {
  center: [number, number];
  selectedFileName: string;
  onSelectFile: (fileName: string) => void;
};

const navigationButton = [
  {
    fileName: "1_ocd.csv",
    icon: HouseHeart,
    label: "ย่านชุมชนเก่า",
  },
  {
    fileName: "2_natural.csv",
    icon: Leaf,
    label: "แหล่งธรรมชาติ",
  },
  {
    fileName: "3_world_heritage.csv",
    icon: Earth,
    label: "มรดกโลก",
  },
  {
    fileName: "4_tentative.csv",
    icon: Shell,
    label: "พื้นที่ชั่วคราว",
  },
  {
    fileName: "5_silpakam.csv",
    icon: Palette,
    label: "แหล่งศิลปกรรม",
  },
  {
    fileName: "6_conserv_center.csv",
    icon: Users,
    label: "หน่วยอนุรักษ์",
  },
];

export default function MapCustomController({
  center,
  selectedFileName,
  onSelectFile,
}: Props) {
  const map = useMap();

  const goToCenter = () => {
    map.stop();
    map.setView(center, 5.75, { animate: true });
  };

  const handleClick = (fileName: string) => {
    onSelectFile(fileName);
    goToCenter();
  };

  return (
    <div className="absolute right-1 sm:right-4 top-4 z-[1000] flex flex-col items-center gap-2">
      {/* Center button */}
      <Button
        size="icon-sm"
        onClick={goToCenter}
        className="bg-white hover:bg-gray-50 text-black cursor-pointer"
      >
        <LocateFixedIcon />
      </Button>

      <ButtonGroup
        orientation="vertical"
        aria-label="Media controls"
        className="h-fit"
      >
        {navigationButton.map((btn, idx) => (
          <React.Fragment key={btn.label}>
            <Button
              onClick={() => handleClick(btn.fileName)}
              variant={
                selectedFileName === btn.fileName ? "default" : "outline"
              }
              disabled={selectedFileName === btn.fileName}
              className="cursor-pointer"
              size="sm"
            >
              <btn.icon />
              <span className="hidden sm:inline ml-2">{btn.label}</span>
            </Button>
            {idx < navigationButton.length - 1 && <ButtonGroupSeparator />}
          </React.Fragment>
        ))}
      </ButtonGroup>
    </div>
  );
}
