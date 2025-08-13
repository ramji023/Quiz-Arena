import { Eye } from "lucide-react";

export function ThemeCard() {
  return (
    <>
      <div className="w-72 bg-white shadow rounded-xl overflow-hidden">
        <img
          src="https://placehold.co/600x400/png"
          alt=""
          className="w-full h-50 object-cover"
        />
        <div className="py-2">
          <h1 className="py-1 px-2 text-primary font-semibold text-lg">Light</h1>
          <div className="py-1 px-2 flex justify-between items-center">
            <button className="bg-pink text-white px-3 py-2 rounded-md outline-1 outline-pink hover:bg-pink-600">
              Select Theme
            </button>
            <button className="px-3 py-2 rounded-md outline-1 outline-primary flex items-center justify-center text-primary font-semibold">
              <Eye />
              <span className="px-2">Preview</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
