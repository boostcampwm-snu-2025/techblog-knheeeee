import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import PreviewTab from "./TabContent/PreviewTab";
import BrowserTab from "./TabContent/BrowserTab";
import AiChatTab from "./TabContent/AiChatTab";

export default function EditorSidePanel() {
  return (
    <Tabs defaultValue="preview" className="h-full px-8">
      <TabsList>
        <TabsTrigger value="preview">미리보기</TabsTrigger>
        <TabsTrigger value="external-search">외부 검색</TabsTrigger>
        <TabsTrigger value="ai-chat">AI chat</TabsTrigger>
      </TabsList>
      <div className="overflow-y-auto">
        <TabsContent value="preview">
          <PreviewTab />
        </TabsContent>
        <TabsContent value="external-search">
          <BrowserTab />
        </TabsContent>
        <TabsContent value="ai-chat">
          <AiChatTab />
        </TabsContent>
      </div>
    </Tabs>
  );
}
