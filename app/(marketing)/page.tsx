import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { FeaturesTab } from "./_components/FeaturesTab";
import { Header } from "./_components/Header";
import { PricingCards } from "./_components/PricingCards";
import { Reviews } from "./_components/Reviews";
import { MainFeatures } from "./_components/MainFeatures";


const Main = () => {

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
     <Header /> 
      <FeaturesTab />
      <MainFeatures />
      <section className="pt-32">
        <Card className="bg-[#1f1d2e] text-white max-w-4xl mx-auto rounded-3xl overflow-hidden">
          <CardContent className="p-8 sm:p-12 flex flex-col items-center text-center">
            <div className="text-[#f4b8e4] text-6xl sm:text-7xl mb-6">’’</div>
            <p className="text-lg sm:text-xl leading-relaxed mb-6">
              In the last edition we launched Arloo.co, a next-generation online
              discussion forum. It has had a profound impact on the community-
              building aspect of the course. It is far more modern,
              user-friendly, interactive, and multi-faceted than any other
              platform out there, and we are making it the home of our student
              community.
            </p>
            <div className="text-[#9ccfd8] font-semibold">FORTE LABS</div>
          </CardContent>
        </Card>
      </section>
      <Reviews />
      <PricingCards />
    </div>
  );
};

export default Main;
