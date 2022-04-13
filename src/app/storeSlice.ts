import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IStoreMessages {
  id: number;
  name: string;
  message: string;
}

export interface IStore {
  name: string;
  data: IStoreMessages[];
}

const initialState: IStore = {
  name: "",
  data: [
    // {
    //   id: 1,
    //   name: "Pushkin",
    //   message:
    //     "  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates recusandae labore quas odio, aliquid veniam...",
    // },
    // {
    //   id: 2,
    //   name: "Lermontov",
    //   message:
    //     "  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates recusandae labore quas odio, aliquid veniam...",
    // },
  ],
};

export const storeSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setHistory: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      const history = localStorage.getItem(action.payload);
      if (history) {
        const jsonHistory = JSON.parse(history);
        jsonHistory.forEach((element: IStoreMessages) =>
          state.data.push(element)
        );
      }
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.data.push({
        id: (state.data.length * Math.random()) / Math.random(),
        name: state.name,
        message: action.payload,
      });
      localStorage.setItem(state.name, JSON.stringify(state.data));
    },
  },
});

export const { setHistory, setName, setMessage } = storeSlice.actions;

export default storeSlice.reducer;
