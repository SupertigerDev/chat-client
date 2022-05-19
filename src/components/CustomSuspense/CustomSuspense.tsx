import { Suspense } from "preact/compat";

export function CustomSuspense (props: {children: any}, fallback?: any) {
  return <Suspense fallback={fallback || <div>Loading...</div>}>{props.children}</Suspense>
}