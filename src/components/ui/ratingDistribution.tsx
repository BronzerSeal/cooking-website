type RatingDistributionProps = {
  ratings: { [stars: number]: number }; // Пример: { 5: 65, 4: 45, 3: 15, 2: 8, 1: 5 }
};

const RatingDistribution: React.FC<RatingDistributionProps> = ({ ratings }) => {
  return (
    <div style={{ width: "300px", fontFamily: "sans-serif" }}>
      {[5, 4, 3, 2, 1].map((star) => (
        <div
          key={star}
          style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
        >
          <div style={{ width: 20, textAlign: "right", marginRight: 8 }}>
            {star}
          </div>
          <div
            style={{
              position: "relative",
              background: "#e8e2de",
              height: 8,
              borderRadius: 4,
              flexGrow: 1,
            }}
          >
            <div
              style={{
                position: "absolute",
                background: "#14100f",
                height: "100%",
                width: `${ratings[star]}%`,
                borderRadius: 4,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RatingDistribution;
