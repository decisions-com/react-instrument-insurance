# React Musical Instrument Insurance

Here at Decisions, we often show potential customers a Musical Instrument Insurance
demonstration project, which covers many facets of the product. This repository
illustrates how Decisions can be used as a back end for any other UI client.

## Goals

The goal of this project is simply to illustrate how a UI hosted anywhere could interact
with Decisions as a back-end resource. As such it demonstrates running flows and rules
via API call, and one way to authenticate those calls.

## Tech Details

This project was created using [create-react-app](https://github.com/facebook/create-react-app), and because we use [TypeScript](https://www.typescriptlang.org/)
internally, uses TypeScript. Because it's a fairly trivial app, there are no
state management libraries involved and is mostly vanilla React, with the exception
of [React Router](https://reacttraining.com/react-router/).

### Note About CORS

This project was not configured to run Cross Domain, but has some example hooks
for doing so. However, the Decisions web host will need to be configured to accept
remote origin requests by modifying the web.config file.

To do so add the following to `<decisions install>\ Files\Decisions\Decisions Web Host\web.config` in the `<system.webserver>` section:

```xml
  <httpProtocol>
    <customHeaders>
      <add name="Access-Control-Allow-Origin" value="*"/>
      <add name="Access-Control-Allow-Methods" value="GET,PUT,POST,DELETE,OPTIONS"/>
      <add name="Access-Control-Allow-Headers" value="Content-Type"/>
    </customHeaders>
  </httpProtocol>
```

### Deploying a Client Router in IIS

This Demo uses React Router, which rewrites URLs and requires subsequent URLs
to be forwarded to the `index.html` of this little app via the [web.config](./public/web.config). This would be true for any client-side routing an embedded UI might need.

The other not-so-obvious requirement is an additional [IIS URL Rewrite extension](https://www.iis.net/downloads/microsoft/url-rewrite). Make sure to download the version that matches your processor architecture. A more detailed explanation can be found [here](https://medium.com/@mateioprea/setting-up-a-react-app-with-react-router-in-iis-71cb86aee376).

None of this is IIS configuration is necessary if your UI is hosted elsewhere.

## Road Map

1. Clean up for best practices.
