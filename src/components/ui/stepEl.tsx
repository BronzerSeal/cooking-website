import { Flex, Text } from "@radix-ui/themes";
import type { FC } from "react";

type stepElProps = {
  step: string;
  index: number;
};

const StepEl: FC<stepElProps> = ({ step, index }) => {
  return (
    <Flex gap="2" align="start" mt={"3"}>
      <Text weight="bold" size="4" style={{ minWidth: "60px" }}>
        Step {index + 1}
      </Text>
      <Text size="3" color="gray" style={{ width: "700px", color: "#897261" }}>
        {step}.
      </Text>
    </Flex>
  );
};

export default StepEl;
