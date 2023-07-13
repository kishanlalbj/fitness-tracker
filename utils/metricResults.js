const RESULTS = {
  UNKNOWN: "UN KNOWN",
  OBESE: "OBESE",
  NORMAL: "NORMAL",
  UNDERWEIGHT: "UNDER WEIGHT",
  OVERWEIGHT: "OVER WEIGHT",
  ATHLETES: "ATHELETES",
  FITNESS: "FITNESS",
  AVERAGE: "AVERAGE",
  ESSENTIAL: "ESSENTIAL FATS"
};

const COLORS = {
  OBESE: "red",
  NORMAL: "green",
  OVERWEIGHT: "rgb(251, 124, 88)",
  UNDERWEIGHT: "yellow",
  ATHLETES: "green",
  AVERAGE: "yellow",
  FITNESS: "green",
  UNKNOWN: "BLACK"
};

function findBMIRange(bmi) {
  if (typeof bmi !== "number") return;

  switch (true) {
    case bmi < 18.5:
      return {
        result: RESULTS.UNDERWEIGHT,
        color: COLORS.UNDERWEIGHT
      };
    case bmi >= 18.5 && bmi <= 25:
      return { result: RESULTS.NORMAL, color: COLORS.NORMAL };
    case bmi > 25 && bmi < 30:
      return { result: RESULTS.OVERWEIGHT, color: COLORS.OVERWEIGHT };
    case bmi >= 30:
      return { result: RESULTS.OBESE, color: COLORS.OBESE };
    default:
      return {
        result: RESULTS.UNKNOWN,
        color: COLORS.UNKNOWN
      };
  }
}

function findBodyFatRange(bodyFat) {
  switch (true) {
    case bodyFat >= 2 && bodyFat <= 5:
      return { result: RESULTS.ESSENTIAL, color: COLORS.UNDERWEIGHT };
    case bodyFat >= 6 && bodyFat <= 13:
      return { result: RESULTS.ATHLETES, color: COLORS.ATHLETES };
    case bodyFat >= 14 && bodyFat <= 17:
      return { result: RESULTS.FITNESS, color: COLORS.FITNESS };
    case bodyFat >= 18 && bodyFat < 25:
      return { result: RESULTS.AVERAGE, color: COLORS.AVERAGE };
    case bodyFat >= 25:
      return { result: RESULTS.OBESE, color: COLORS.OBESE };
    default:
      return { result: RESULTS.UNKNOWN, color: COLORS.UNKNOWN };
  }
}

module.exports = {
  findBMIRange,
  findBodyFatRange
};
