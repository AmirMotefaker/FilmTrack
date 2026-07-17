import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ir.filmtrack.app',
  appName: 'FilmTrack',
  webDir: 'public/app',
  server: {
    url: "https://filmtrack.ir",
    cleartext: true
  }
};

export default config;