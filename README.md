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

## Road Map

1. Clean up for best practices.
