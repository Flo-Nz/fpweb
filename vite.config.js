import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  return {
    // vite config
    define: {
      "process.env.GOOGLE_MAP_API_KEY": JSON.stringify(env.GOOGLE_MAP_API_KEY),
      "process.env.JWT_SECRET": JSON.stringify(env.VITE_JWT_SECRET),
      "process.env.API_BASE_URL": JSON.stringify(env.VITE_API_BASE_URL),
      "process.env.DISCORD_OAUTH_URL": JSON.stringify(
        env.VITE_DISCORD_OAUTH_URL
      ),
      "process.env.API_KEY": JSON.stringify(env.VITE_FP_API_KEY),
      "process.env.YOEL_API_KEY": JSON.stringify(env.VITE_YOEL_API_KEY),
      "process.env.GOOGLE_OAUTH_ID_CLIENT": JSON.stringify(
        env.VITE_GOOGLE_OAUTH_ID_CLIENT
      ),
      "process.env.AUTHORIZED_SCRIBES": JSON.stringify(
        env.VITE_AUTHORIZED_SCRIBES
      ),
    },
    plugins: [svgr(), react()],
  };
});
