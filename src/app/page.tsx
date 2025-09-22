import Hero from "./_components/_home/Hero";
import Categorys from "./_components/_home/categorys";

export default function Home() {
  return (
    <>
      <Hero />
      <hr className="border-t-2 border-gray-600/30 my-4 mx-9 md:mx-15 lg:mx-30" />
      <Categorys />
    </>
  );
}
