import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return <>
  <div className="flex items-center justify-center">
    <div className="h-[100vh] md:my-48">
    <SignIn appearance={{baseTheme: dark}} />
    </div>
  
  </div>
  
  </>;
}