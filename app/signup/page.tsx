import { SignupContainer } from "@/components/auth/SignupContainer";
import { SignupVisual } from "@/components/auth/SignupVisual";

export default function SignupPage() {
  return (
    <main className="min-h-screen lg:grid lg:grid-cols-2">
      <SignupVisual />
      <SignupContainer />
    </main>
  );
}
