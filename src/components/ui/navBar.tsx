import darkLogo from "@/img/dark-logo.png";
import { Flex, Heading, Link } from "@radix-ui/themes";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/avatar";

function NavBar() {
  return (
    <Flex
      justify={"between"}
      height={"65px"}
      align={"center"}
      style={{ padding: "0px 20px" }}
    >
      <Flex>
        <Flex width={"180px"} mr={"5"}>
          <img src={darkLogo} alt="" width={"20px"} />
          <Heading size={"4"} weight={"bold"} ml={"2"}>
            Culinary Delights
          </Heading>
        </Flex>
        <Flex width={"350px"} justify={"between"}>
          <Link
            weight={"medium"}
            style={{ textDecoration: "none" }}
            color="gray"
            highContrast
            href="/"
          >
            Home
          </Link>
          <Link
            weight={"medium"}
            style={{ textDecoration: "none" }}
            color="gray"
            highContrast
            href="#"
          >
            Recipes
          </Link>
          <Link
            weight={"medium"}
            style={{ textDecoration: "none" }}
            color="gray"
            highContrast
            href="#"
          >
            Categories
          </Link>
          <Link
            weight={"medium"}
            style={{ textDecoration: "none" }}
            color="gray"
            highContrast
            href="#"
          >
            About Us
          </Link>
        </Flex>
      </Flex>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </Flex>
  );
}

export default NavBar;
