import CreatedGallery from "./components/CreatedGallery";
import PromptArea from "./components/PromptArea";

export default function Home() {
  return (
    <div className="flex flex-col justify-center pt-8">
      <CreatedGallery />
      <PromptArea />
    </div>
  );
}
