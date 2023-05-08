import { Carousel } from "./components/Carousel";
import { ExploreTopBooks } from "./components/ExploreTopBooks";
import { Heros } from "./components/Heros";
import { LibraryServices } from "./components/LibraryServices";
// a new home page component, which is going to be our parent component for the entire home
// This page is going to be the page in the component that App.tsx refers to and inside HomePage.tsx We are going to have all the components that we built.
export const HomePage = () => {
  return (
    <>
      <ExploreTopBooks/>
      <Carousel/>
      <Heros/>
      <LibraryServices/>
    </>
  );
}