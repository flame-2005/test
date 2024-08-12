import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return <>
  <div className="flex items-center justify-center">
    <div className="h-[100vh] md:my-20">
    <SignUp appearance={{baseTheme: dark}} />
    </div>
  
  </div>
  
  </>;
}