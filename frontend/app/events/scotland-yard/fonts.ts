import { Abril_Fatface, IM_Fell_English, IM_Fell_English_SC, Special_Elite } from "next/font/google";

export const fell = IM_Fell_English({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--font-fell" });
export const fellSC = IM_Fell_English_SC({ weight: "400", subsets: ["latin"], variable: "--font-fell-sc" });
export const abril = Abril_Fatface({ weight: "400", subsets: ["latin"], variable: "--font-abril" });
export const elite = Special_Elite({ weight: "400", subsets: ["latin"], variable: "--font-elite" });

export const fontVariables = [fell, fellSC, abril, elite].map((f) => f.variable).join(" ");
