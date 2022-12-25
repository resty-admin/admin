import { InitialsPipe } from "./initials.pipe";
import { LeadingZeroPipe } from "./leading-zero.pipe";

export const SHARED_PIPES = [InitialsPipe, LeadingZeroPipe];

export * from "./initials.pipe";
export * from "./leading-zero.pipe";
