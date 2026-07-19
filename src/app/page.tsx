import CategoryStatistics from "@/components/category-statistics";
import CategoriesSection from "@/components/CategorySection";
import CommunityReviews from "@/components/CommunityReviews";
import FeaturedPlants from "@/components/FeaturedPlants";
import Hero from "@/components/Hero";
import MeetPlantPalAI from "@/components/meet-plantpal-ai";
import PlantCareTips from "@/components/PlantCareTips";
import WhyChoosePlantPal from "@/components/why-choose-plantpal";


export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <FeaturedPlants></FeaturedPlants>
      <WhyChoosePlantPal></WhyChoosePlantPal>
      <MeetPlantPalAI></MeetPlantPalAI>
      <CategoriesSection></CategoriesSection>
      <CategoryStatistics></CategoryStatistics>
      <PlantCareTips></PlantCareTips>
      <CommunityReviews></CommunityReviews>
    </div>
  );
}
