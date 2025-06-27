export type BoothClaim = {
  name: string;
  claimed: number;
  unclaimed: number;
};

export type CardData = {
  totalRegistered: number;
  totalAttendees: number;
  totalBooth: number;
  totalClaims: number;
}
