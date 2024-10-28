import { BibleBooks } from "@/lib/BibleBooks";
import { BibleContextType } from "@/types/bible";
import { ProviderProps } from "@/types/common";
import { createContext, useContext } from "react";

const initialState: BibleContextType = {
  bibleBooks: BibleBooks,
};

const BibleContext = createContext<BibleContextType>(initialState);

const BibleProvider = ({ children }: ProviderProps) => {
  return (
    <BibleContext.Provider
      value={{
        bibleBooks: initialState.bibleBooks,
      }}
    >
      {children}
    </BibleContext.Provider>
  );
};

const useBibleContext = () => {
  return useContext(BibleContext);
};

export { BibleContext, BibleProvider, useBibleContext };
