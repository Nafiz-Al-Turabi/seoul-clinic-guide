import TopClinics from "@/components/Home/TopClinics/TopClinics";
import NewsLetter from "@/components/ui/NewsLetter/NewsLetter";
import TestimonialSlider from "@/components/ui/Testimonials/TestimonialSlider";
import ClinicDetails from "@/components/ClinicDetails/ClinicDetails";

interface PageProps {
  params: {
    slug: string;
  };
}
const page = async ({ params }: PageProps) => {
  const { slug } = await params;
  return (
    <div>
      <div>
        <ClinicDetails slug={slug} />
      </div>
      <NewsLetter />
      <TopClinics />
      <TestimonialSlider />
    </div>
  );
};

export default page;
