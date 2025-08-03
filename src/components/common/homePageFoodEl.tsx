import { Flex, Text } from "@radix-ui/themes";
import type { FC } from "react";

type HomePageFoodElProps = {
  img: string;
  name: string;
  onClick?: () => void;
};

const HomePageFoodEl: FC<HomePageFoodElProps> = ({ img, name, onClick }) => {
  return (
    <Flex
      direction={"column"}
      width={"190px"}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <img src={img} style={{ borderRadius: "15px" }} alt="" />
      <Text weight={"bold"} mt={"2"}>
        {name}
      </Text>
    </Flex>
  );
};

export default HomePageFoodEl;
