import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Skills from "./Skills";
import { Education } from "./Education";
import Experience from "./Experience";

export function ProfileTabs() {
  return (
    <Tabs defaultValue="Education" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="Education">Education</TabsTrigger>
        <TabsTrigger value="Experience">Experience</TabsTrigger>
        <TabsTrigger value="Skills">Skills</TabsTrigger>
      </TabsList>
      <TabsContent value="Education">
        <Education />
      </TabsContent>
      <TabsContent value="Experience">
        <Experience />
      </TabsContent>
      <TabsContent value="Skills">
        <Skills />
      </TabsContent>
    </Tabs>
  );
}
