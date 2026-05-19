/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_SHEETS_API_KEY: string;
  readonly VITE_GOOGLE_SHEET_ID: string;
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  readonly VITE_OPENWEATHER_API_KEY: string;
  readonly VITE_APPS_SCRIPT_URL: string;
  readonly VITE_WRITE_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
