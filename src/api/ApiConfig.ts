const DEFAULT_ROOT = "../decisions/Primary/";

declare var DecisionsRestConfig: {
  cors: boolean;
  restRoot: string;
};

export const ApiConfig = {
  cors: true,
  getFetchMode(): RequestMode {
    return this.cors ? "cors" : "same-origin";
  },
  isLoaded: false,
  loadConfig() {
    // check for it on the global namespace:
    if (!!DecisionsRestConfig) {
      this.cors = DecisionsRestConfig.cors;
      this.restRoot = DecisionsRestConfig.restRoot;
      return;
    }
    // if it wasn't there, try to load it:
    fetch(`./rest-config.json`)
      .then(value =>
        value
          .json()
          .then(json => {
            this.restRoot = json.restRoot;
            this.cors = json.cors;
            this.isLoaded = true;
          })
          .catch(logRootConfigLoadError)
      )
      .catch(logRootConfigLoadError);
  },
  restRoot: DEFAULT_ROOT
};

function logRootConfigLoadError(reason: any) {
  // tslint:disable-next-line:no-console
  console.error("failed to load rest-root", reason);
}
