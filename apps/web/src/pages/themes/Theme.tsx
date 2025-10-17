import { Button } from "@repo/ui/components/ui/Button";
import { Plus } from "lucide-react";
import { ThemeCard } from "@repo/ui/components/ui/ThemeCard";
export default function Themes() {
  return (
    <>
      <div className="text-primary">
        {/* first section  */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold ">Happy To See You! Zassica</h1>
          <Button variant="primary">
            Add Quiz <Plus />
          </Button>
        </div>
        {/* second section  */}
        <div className="p-6">
          <ThemeCard/>
        </div>
      </div>
    </>
  );
}
