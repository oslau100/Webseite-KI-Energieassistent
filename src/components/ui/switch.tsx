import * as React from "react"; import * as SwitchPrimitives from "@radix-ui/react-switch"; import { cn } from "@/lib/utils";
const Switch=React.forwardRef<any,any>(({className,...props},ref)=><SwitchPrimitives.Root className={cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",className)} {...props} ref={ref}><SwitchPrimitives.Thumb className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform" /></SwitchPrimitives.Root>);
export { Switch };
