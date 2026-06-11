import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.API_BASE_URL": JSON.stringify(env.VITE_API_BASE_URL),
      "process.env.DISCORD_OAUTH_URL": JSON.stringify(
        env.VITE_DISCORD_OAUTH_URL
      ),
      "process.env.API_KEY": JSON.stringify(env.VITE_FP_API_KEY),
      "process.env.GOOGLE_OAUTH_ID_CLIENT": JSON.stringify(
        env.VITE_GOOGLE_OAUTH_ID_CLIENT
      ),
      "process.env.AUTHORIZED_SCRIBES": JSON.stringify(
        env.VITE_AUTHORIZED_SCRIBES
      ),
    },
    plugins: [tailwindcss(), react()],
  };
});
