# linfra-fe

A small web UI for [Linfra](https://github.com/enismustafaj/linfra-be): chat to request a VM, follow the request
through policy and provisioning, see what exists, resolve what the reconciler found, and set the tenant's policy.

| Page | What it does | Backend |
|---|---|---|
| Chat | Threads on the left. Describe what you need; the assistant proposes a VM with its price and fit; confirm the latest draft | `/api/v1/conversations` |
| Intents | Each request's state and the policy's decision. Approve or reject requests waiting for a human; plan proposed or expired ones | `/api/v1/intents` |
| Resources | What exists: instance type, region, IP, status, when the reconciler last saw it | `/api/v1/resources` |
| Findings | Orphans, duplicates, missing resources, drift and stuck requests, each with the actions it offers | `/api/v1/findings` |
| Policy | Allowed instance types and regions, monthly budget (with committed spend), auto-approve limit, production approval | `/api/v1/policy` |

## Running locally

**Prerequisites:** Node.js 20+, and the backend running on `:8080` with a tenant whose API key is `demo-key`.
The backend's [README](https://github.com/enismustafaj/linfra-be#running-locally) covers both.

```sh
npm install
npm start          # http://localhost:4200
```

The dev server proxies `/api` to `http://localhost:8080` and adds `Authorization: Bearer demo-key` to every call
(`proxy.conf.json`), so the UI has no login and the backend needs no CORS setup. To use another tenant, change the
key there and restart `npm start`. This is for local development only: a deployed UI would need real sign-in.

## A typical walk-through

1. **Chat:** start a conversation and ask for "a small VM for our staging API in the EU". Confirm the draft.
2. **Intents:** a request within policy is approved automatically and a few seconds later shows `succeeded`. Above
   the auto-approve limit, or for production, it waits: approve or reject it here.
3. **Resources:** the container that was created, with its IP.
4. **Findings:** within a minute of a change made outside Linfra (e.g. `docker rm` on that container), the reconciler
   reports it here with the actions you can take.
5. **Policy:** lower the auto-approve limit or restrict instance types, then confirm another draft to see the
   difference.

## Project layout

```
src/app/
  api/         models.ts (API types), api.service.ts (every call), error messages
  chat/        threads + conversation
  intents/     intent cards with plan / approve / reject
  resources/   resource table
  findings/    finding cards with their actions
  policy/      policy form
  shared/      draft summary and status badge, used by several pages
```

Angular 18 with standalone components and signals. No UI library: plain HTML and one stylesheet
(`src/styles.scss`) with light and dark mode.

## Build

```sh
npx ng build       # output in dist/linfra-fe
```

CI (`.github/workflows/build.yml`) runs the same build on every push and pull request to `main`.
