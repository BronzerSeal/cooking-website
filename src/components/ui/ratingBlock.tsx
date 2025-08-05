import { Flex, Text } from "@radix-ui/themes";
import { Rating, Star } from "@smastrom/react-rating";
import RatingDistribution from "./ratingDistribution";
import { getRandomNum } from "@/utils/getRandomNum";
import { StarRating } from "@/utils/starRating";

const RatingBlock = () => {
  const stars = getRandomNum(0.5, 5);
  const myStyles = {
    itemShapes: Star,
    activeFillColor: "#171412",
    inactiveFillColor: "#cecdc3ff",
  };

  return (
    <>
      <Flex direction={"column"}>
        <Text weight={"bold"} style={{ fontSize: "36px" }}>
          {stars}
        </Text>
        <Rating
          style={{ maxWidth: 140 }}
          itemStyles={myStyles}
          value={stars}
          readOnly
        />
        <Text mt={"2"}>{`${getRandomNum(1, 500, 0)} reviews`}</Text>
      </Flex>
      <RatingDistribution ratings={StarRating(stars)} />
    </>
  );
};

export default RatingBlock;
