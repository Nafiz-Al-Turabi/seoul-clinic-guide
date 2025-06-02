import PrivateRoute from "@/components/private/PrivateRoute";
import ReviewForm from "@/components/ReviewForm/ReviewForm";

export default function ReviewPage() {
  return (
    <PrivateRoute>
      <ReviewForm />
    </PrivateRoute>
  );
}
