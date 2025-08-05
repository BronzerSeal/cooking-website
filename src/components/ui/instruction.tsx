import { Text } from "@radix-ui/themes";
import StepEl from "./stepEl";
import type { FC } from "react";

type InstructionProps = {
  instruction: string;
};

const Instruction: FC<InstructionProps> = ({ instruction }) => {
  const steps = instruction
    .split(/(?:\.\s+|\.\n)/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <>
      <Text as="div" weight={"bold"} size={"6"}>
        Instructions
      </Text>
      {steps.map((step, index) => (
        <StepEl key={index} step={step} index={index} />
      ))}
    </>
  );
};

export default Instruction;
