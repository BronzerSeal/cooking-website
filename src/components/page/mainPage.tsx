import { Flex } from "@radix-ui/themes";
import FilterSection from "../ui/filterSection";
import HomeSection from "../ui/homeSection";

function MainPage() {
  return (
    <Flex>
      <Flex direction={"column"} mr={"5"}>
        <FilterSection />
      </Flex>
      <HomeSection />
    </Flex>
  );
}

export default MainPage;
