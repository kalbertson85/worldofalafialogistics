import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        asChild
        size="lg"
        className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        <a
          href="https://chat.whatsapp.com/LBkWUfczT6bLo2wv7QGqb4?mode=ac_t"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </a>
      </Button>
      
      {/* Tooltip */}
      <div className="absolute bottom-16 right-0 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us on WhatsApp
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
      </div>
    </div>
  );
};

export default WhatsAppButton;