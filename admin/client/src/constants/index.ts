import { GiftIcon, HomeIcon, SpeedometerIcon, UserIcon, UsersIcon } from "@icons";
import type { CardData } from "@types";
import type { ComponentType } from "react";


export const departments = [
  "All",
  "Production Department - LRN",
  "Admin Department - LRN",
  "Engineering Department - LRN",
  "Information Technology Department - LRN",
  "Quality Assurance Department - LRN",
  "Human Resources Department - LRN",
  "Supply Chain Department - LRN",
  "Research and Innovation Department - LRN",
  "Creative Department - LRN",
  "Quality Control Department - LRN",
  "Safety, Health, & Environment Department - LRN",
  "Internal Security Department - LRN",
  "Sales Department - LRN",
  "Admin Department - LRN"
];

export const cards: {
  icon: ComponentType<any>;
  name: string;
  valueKey: keyof CardData; 
}[] = [
  { icon: UserIcon, name: "Total Registered", valueKey: "totalRegistered" },
  { icon: UsersIcon, name: "Total Attendees", valueKey: "totalAttendees" },
  { icon: HomeIcon, name: "Total Booths", valueKey: "totalBooth" },
  { icon: GiftIcon, name: "Total Claims", valueKey: "totalClaims" },
];

export const legends = [
  {
    name: "Claimed",
    className: "bg-green-500",
  },
  {
    name: "Unclaimed",
    className: "bg-lime-500",
  }
]


export const menus = [
  {
    name:"Dashboard",
    icon: SpeedometerIcon
  },
  { 
    name:"Booth",
    icon: HomeIcon
  }
]
