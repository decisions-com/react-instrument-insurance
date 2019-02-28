const DEFAULT_ROOT = "../decisions/Primary/";

export const ApiConfig = {
  cors: true,
  getFetchMode(): RequestMode {
    return this.cors ? "cors" : "same-origin";
  },
  isLoaded: false,
  loadConfig() {
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
