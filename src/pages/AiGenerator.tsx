import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AiGenerator() {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState('1K');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<{url: string, prompt: string}[]>([]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, size })
      });

      if (!res.ok) throw new Error('Generation failed');
      
      const data = await res.json();
      setGeneratedImages(prev => [{ url: data.imageUrl, prompt }, ...prev]);
    } catch (error) {
      console.error(error);
      alert('Failed to generate image. Make sure server supports /api/generate-image');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-[#0F62FE]" />
          AI Studio Generator
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Create premium product concepts and custom branding materials using our next-generation AI image models.
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-[24px] shadow-sm border border-slate-200 mb-12">
        <form onSubmit={handleGenerate} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Image Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A luxurious titanium smartwatch floating over water splashes, studio lighting..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#0F62FE] resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">Resolution</label>
            <div className="flex gap-4">
              {['1K', '2K', '4K'].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`flex-1 py-3 rounded-xl border font-medium transition-all ${
                    size === s 
                      ? 'border-[#0F62FE] bg-[#0F62FE]/5 text-[#0F62FE]' 
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <Button 
            disabled={!prompt.trim() || isGenerating}
            className="w-full h-14 rounded-full text-base font-semibold bg-[#0F62FE] text-white hover:bg-[#0F62FE]/90"
          >
            {isGenerating ? (
              <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating...</>
            ) : (
              <><ImageIcon className="w-5 h-5 mr-2" /> Generate Image</>
            )}
          </Button>
        </form>
      </div>

      {generatedImages.length > 0 && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-slate-900 border-b pb-4">Your Creations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {generatedImages.map((img, i) => (
               <div key={i} className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
                  <div className="aspect-square bg-slate-200 relative">
                     <img src={img.url} alt={img.prompt} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                     <p className="text-sm text-slate-600 line-clamp-2">{img.prompt}</p>
                  </div>
               </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
