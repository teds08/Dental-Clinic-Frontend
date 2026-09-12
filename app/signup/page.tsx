import { SignupContainer } from "@/components/signup/SignupContainer";
import { SignupVisual } from "@/components/signup/SignupVisual";

export default function SignupPage() {
  return (
    <main className="min-h-screen lg:grid lg:grid-cols-2">
      <SignupVisual />
      <SignupContainer />
    </main>
  );
}
