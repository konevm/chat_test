import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IStoreMessages {
  id: number;
  name: string;
  message: string;
}

export interface IStore {
  chat: string;
  name: string;
  data: IStoreMessages[];
}

const initialState: IStore = {
  chat: "chat",
  name: "",
  data: [],
};

export const storeSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setHistory: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      const history = localStorage.getItem(state.chat);

      if (history) {
        const jsonHistory = JSON.parse(history);
        jsonHistory.forEach((element: IStoreMessages) =>
          state.data.push(element)
        );
      } else {
        localStorage.setItem(state.chat, JSON.stringify(state.data));
      }
    },
    setMessage: (state, action: PayloadAction<string>) => {
      const history = localStorage.getItem(state.chat);
      if (history) {
        const jsonHistory = JSON.parse(history);

        jsonHistory.push({
          id: (state.data.length * Math.random()) / Math.random(),
          name: state.name,
          message: action.payload,
        });
        localStorage.setItem(state.chat, JSON.stringify(jsonHistory));
        state.data = jsonHistory;
      }
      sessionStorage.setItem(state.name, JSON.stringify(state.data));
    },
  },
});

export const { setHistory, setMessage } = storeSlice.actions;

export default storeSlice.reducer;
