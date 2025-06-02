import ProtectedRoutes from "@/components/private/ProtectedRoutes";
import ReviewForm from "@/components/ReviewForm/ReviewForm";

export default function ReviewPage() {
  return (
    <ProtectedRoutes>
      <ReviewForm />
    </ProtectedRoutes>
  );
}
