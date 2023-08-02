import { View, Views } from "@client/views/views";
import { create } from "zustand";

interface ViewState {
    view: View;
    setView: (view: View) => void;
}

const useViewStore = create<ViewState>(set => ({
    view: Views.Map,
    setView: (view: View) => set({ view })
}));

export default useViewStore;