import Button from "@/components/ui/Button";
import OffPlanLaunchCard from "@/components/ui/OffPlanLaunchCard";
import propertyImage from "@/public/images/landingpage/propertyImg.png";
import carousel1 from "@/public/images/landingpage/landingpagecarousel1.jpg";
import carousel2 from "@/public/images/landingpage/landingpagecarousel2.jpg";
import carousel3 from "@/public/images/landingpage/landingpagecarousel3.jpg";
import carousel4 from "@/public/images/landingpage/landingpagecarousel4.jpg";

const OFF_PLAN_LAUNCHES = [
  {
    id: 1,
    image: carousel1,
    title: "Binghatti Skyflame",
    developer: "Binghatti Properties",
    price: "585K",
  },
  {
    id: 2,
    image: carousel2,
    title: "Golf Vale",
    developer: "Emaar Properties",
    price: "1.10M",
  },
  {
    id: 3,
    image: carousel3,
    title: "Binghatti Etherea",
    developer: "Binghatti Properties",
    price: "765K",
  },
  {
    id: 4,
    image: carousel4,
    title: "Hudayriyat Golf Estates",
    developer: "Modon",
    price: "4.25M",
  },
  {
    id: 5,
    image: propertyImage,
    title: "Greenz by Danube",
    developer: "Danube Properties",
    price: "3.5M",
  },
  {
    id: 6,
    image: carousel1,
    title: "Residences DIFC Zabeel",
    developer: "DIFC Developments",
    price: "2.6M",
  },
];

export default function OffPlanLaunches() {
  return (
    <section className="section-container">
      <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:gap-8 lg:mb-16 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="flex min-w-0 flex-col gap-4">
          <h3 className="section-sub-heading">Our Launches</h3>
          <h2 className="text-gold-gradient max-w-[640px]">
            Latest Off Plan Launches
          </h2>
        </div>

        <Button
          variant="secondary"
          className="w-full shrink-0 sm:w-auto lg:self-start"
        >
          View More
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3">
        {OFF_PLAN_LAUNCHES.map((launch) => (
          <OffPlanLaunchCard key={launch.id} launch={launch} />
        ))}
      </div>
    </section>
  );
}
