import TopClinics from "@/components/Home/TopClinics/TopClinics";
import NewsLetter from "@/components/ui/NewsLetter/NewsLetter";
import TestimonialSlider from "@/components/ui/Testimonials/TestimonialSlider";
import ClinicDetails from "@/components/ClinicDetails/ClinicDetails";

const page = async ({ params }: { params: { slug: string } }) => {
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
