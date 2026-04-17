const configFiles = import.meta.glob("../clients/*/{api-config,chatbot-config,site-config}.json");

export async function loadConfigs(brand: string) {
  const loadJson = async (file: string) => {
    const loader = configFiles[file];

    if (!loader) {
      throw new Error(`Config file not found: ${file}`);
    }

    const mod: any = await loader();
    return mod.default;
  };

  const basePath = `../clients/${brand}`;

  const [apiConfig, chatbotConfig, siteConfig] = await Promise.all([
    loadJson(`${basePath}/api-config.json`),
    loadJson(`${basePath}/chatbot-config.json`),
    loadJson(`${basePath}/site-config.json`),
  ]);

  return {
    apiConfig,
    chatbotConfig,
    siteConfig,
  };
}