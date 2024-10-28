import { Box } from "@mui/material";

type CustomCalendarProps = {
  totalDays: number;
  completedDays: number[];
  onDayClick?: (day: number) => void;
};

const CustomCalendar = ({
  totalDays,
  completedDays,
  onDayClick,
}: CustomCalendarProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        gap: "5px",
      }}
    >
      {Array.from({ length: totalDays }, (_, i) => (
        <Box
          key={i}
          onClick={() => onDayClick && onDayClick(i + 1)}
          style={{
            backgroundColor: completedDays.includes(i + 1) ? "green" : "red",
            flex: "0 0 calc(100% / 7 - 5px)",
            height: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.2rem",
            fontWeight: completedDays.includes(i + 1) ? "normal" : "bold",
            cursor: onDayClick ? "pointer" : "default",
          }}
        >
          {i + 1}
        </Box>
      ))}
    </Box>
  );
};

export default CustomCalendar;
