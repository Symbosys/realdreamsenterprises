import { useRouterState } from "@tanstack/react-router";
import { useGetWebConfig, getConfigValue } from "@/api/webconfig.api";
import { SITE_CONTACT } from "@/data/site";

export function FloatingWhatsAppButton() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { data: webConfig } = useGetWebConfig();

  // Hide WhatsApp button inside admin portal
  if (pathname.startsWith("/admin")) {
    return null;
  }

  // Get dynamic WhatsApp number / URL from admin WebConfig
  const configuredWhatsapp = getConfigValue(
    webConfig,
    "social.whatsapp",
    getConfigValue(webConfig, "contact.phoneRaw", SITE_CONTACT.phoneRaw || "6513511561")
  );

  let whatsappUrl = "https://wa.me/916513511561";

  if (configuredWhatsapp) {
    if (configuredWhatsapp.startsWith("http://") || configuredWhatsapp.startsWith("https://")) {
      whatsappUrl = configuredWhatsapp;
    } else {
      const digitsOnly = configuredWhatsapp.replace(/\D/g, "");
      const finalNumber = digitsOnly.length === 10 ? `91${digitsOnly}` : digitsOnly;
      const message = encodeURIComponent(
        "Hi! I am interested in Rashmi TMT & SME-TMT steel bars. Please share current prices and availability."
      );
      whatsappUrl = `https://wa.me/${finalNumber || "916513511561"}?text=${message}`;
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip Label */}
      <span className="mr-3 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-slate-900/90 text-white text-xs font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-md border border-white/10 whitespace-nowrap">
        Chat on WhatsApp
      </span>

      {/* Floating Button with Ambient Pulse Effect */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-emerald-600 active:scale-95 border-2 border-white/30 cursor-pointer"
      >
        {/* Pulse ring animation */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/40 animate-ping pointer-events-none opacity-75" />

        {/* WhatsApp Vector Icon */}
        <svg
          className="h-7 w-7 fill-current relative z-10"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.486 1.332 5.004L2 22l5.143-1.348a9.96 9.96 0 0 0 4.869 1.258h.004c5.506 0 9.99-4.478 9.99-9.984A9.957 9.957 0 0 0 12.012 2zm.004 16.275h-.003a8.284 8.284 0 0 1-4.225-1.157l-.303-.18-3.14.823.837-3.061-.198-.315a8.272 8.272 0 0 1-1.272-4.417c.001-4.568 3.719-8.283 8.288-8.283 2.213 0 4.293.862 5.857 2.428a8.243 8.243 0 0 1 2.424 5.86c-.002 4.568-3.72 8.283-8.287 8.283zm4.542-6.208c-.249-.125-1.474-.727-1.703-.81-.229-.083-.395-.125-.561.125-.166.249-.645.81-.79 1.002-.145.192-.29.214-.539.089-.249-.125-1.052-.387-2.004-1.236-.741-.661-1.241-1.477-1.386-1.726-.145-.249-.015-.384.109-.508.112-.112.249-.29.374-.435.125-.145.166-.249.249-.415.083-.166.042-.311-.021-.435-.062-.125-.561-1.351-.77-1.85-.203-.487-.41-.421-.561-.429-.143-.007-.307-.008-.472-.008a.908.908 0 0 0-.658.307c-.229.249-.873.852-.873 2.079 0 1.226.893 2.41 1.018 2.576.125.166 1.758 2.684 4.258 3.764.595.257 1.06.41 1.423.525.598.19 1.142.163 1.572.099.48-.071 1.474-.602 1.682-1.184.208-.581.208-1.08.145-1.184-.063-.103-.229-.165-.478-.29z" />
        </svg>
      </a>
    </div>
  );
}
