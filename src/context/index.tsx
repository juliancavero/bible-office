import { BibleProvider } from "./custom/bible";
import QueryProv from "./query";
import RouterProv from "./router";
import ThemeProv from "./theme";

const MainProvider = () => {
  return (
    <QueryProv>
      <ThemeProv>
        <BibleProvider>
          <RouterProv />
        </BibleProvider>
      </ThemeProv>
    </QueryProv>
  );
};

export default MainProvider;
