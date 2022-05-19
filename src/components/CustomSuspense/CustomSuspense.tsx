import { Suspense } from "react";

export function CustomSuspense (props: {children: any, fallback?: any}) {
  return <Suspense fallback={props.fallback || <div>Loading...</div>} {...props}/>
}