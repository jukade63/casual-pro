import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import General from "./General";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import BasicInfo from "./BasicInfo";

export function ProfileTabs() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="Basic information">Basic info</TabsTrigger>
        <TabsTrigger value="Education">Education</TabsTrigger>
        <TabsTrigger value="Experience">Experience</TabsTrigger>
        <TabsTrigger value="Skills">Skills</TabsTrigger>
      </TabsList>
      <TabsContent value="Basic information">
        <BasicInfo />
      </TabsContent>
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
