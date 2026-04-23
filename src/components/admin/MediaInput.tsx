import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadToMedia } from "@/lib/storage";
import { Upload, Link as LinkIcon, X } from "lucide-react";
import { toast } from "sonner";

interface Props {
  value?: string | null;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  accept?: string;
}

const MediaInput = ({ value, onChange, folder = "uploads", label = "Imagem", accept = "image/*,video/*" }: Props) => {
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<"url" | "upload">(value ? "url" : "upload");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadToMedia(file, folder);
      onChange(url);
      toast.success("Ficheiro enviado");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao enviar";
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex gap-2">
        <Button
          type="button"
          variant={mode === "upload" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("upload")}
        >
          <Upload className="w-3 h-3 mr-1" /> Upload
        </Button>
        <Button
          type="button"
          variant={mode === "url" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("url")}
        >
          <LinkIcon className="w-3 h-3 mr-1" /> URL
        </Button>
      </div>
      {mode === "upload" ? (
        <Input type="file" accept={accept} onChange={handleFile} disabled={busy} />
      ) : (
        <Input
          type="url"
          placeholder="https://..."
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {value && (
        <div className="relative inline-block mt-2">
          {value.match(/\.(mp4|webm|mov)$/i) ? (
            <video src={value} className="h-24 rounded border" controls />
          ) : (
            <img src={value} alt="preview" className="h-24 rounded border object-cover" />
          )}
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MediaInput;
