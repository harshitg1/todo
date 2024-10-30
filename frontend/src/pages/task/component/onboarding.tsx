import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import group from "@/assets/Group.svg";
import ellipse from "@/assets/Ellipse.svg";
import group2 from "@/assets/Group25.svg";

export function Onbarding({ handleClick }: { handleClick: () => void }) {
  return (
    <>
      <div className="flex justify-center items-center p-0 ">
      <Card className="w-[380px] h-[670px] flex flex-col">
        <CardContent className="relative h-[400px] bg-[#4566EC] flex-shrink-0">
          <img
            src={ellipse} 
            alt="task"
            className="absolute top-0 right-0 mr-0 mt-0"
          />
          <img
            src={group} 
            alt="task"
            className="absolute top-0 left-0 ml-0 mt-2"
          />
          <img
            src={group2}
            alt="task"
            className="absolute bottom-0 right-0 mb-2 mr-0"
          />
        </CardContent>
        <CardContent className="flex flex-col py-2 justify-between flex-grow">
          <div className="mt-4 space-y-2">
            <h1 className="w-full text-2xl font-bold">
              Manage What To Do
            </h1>
            <p className="text-left text-sm text-gray-500">
              The best way to manage what you have to do, <br/> don't forget your plans
            </p>
          </div>
          <Button variant="secondary" className="bg-[#4566EC] hover:bg-[#4566EC] w-full mb-6 text-white" onClick={handleClick}>
            Get Started
          </Button>
        </CardContent>
      </Card>
      </div>
    </>
  );
}
