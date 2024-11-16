import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";

interface PostCardProps {
  onClose: () => void;
}

export const PostCard = ({ onClose }: PostCardProps) => {
  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={onClose}
      />
      <Card className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 z-50">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <CardContent className="p-4">
          <p>今のえもちは？</p>
        </CardContent>
        <div className="p-4 space-y-4">
          <textarea 
            className="w-full h-20 p-4 text-lg border rounded-md resize-none"
            placeholder="今のえもちを入力してください"
          />
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium">喜び</p>
              <Slider defaultValue={[0]} max={100} step={1} />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">怒り</p>
              <Slider defaultValue={[0]} max={100} step={1} />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">悲しみ</p>
              <Slider defaultValue={[0]} max={100} step={1} />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">驚き</p>
              <Slider defaultValue={[0]} max={100} step={1} />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">恐れ</p>
              <Slider defaultValue={[0]} max={100} step={1} />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>送信</Button>
          </div>
        </div>
      </Card>
    </>
  );
};
