---
description: how to deploy a preview version of the application without affecting the main link
---

To deploy a preview version of CIVICAI to a temporary link, follow these steps:

1. **Build the production bundle**
   ```bash
   npm run build
   ```

2. **Deploy to a preview channel**
   Run the following command, replacing `preview-name` with something descriptive (like `v2-test` or `ui-updates`):
   ```bash
   npx firebase hosting:channel:deploy preview-name
   ```

3. **View the link**
   Firebase will provide a temporary URL (valid for 7 days by default) that looks like:
   `https://civicai-india-4242--preview-name-xxxxxx.web.app`

This allows you to test changes without updating the main **[https://civicai-india-4242.web.app](https://civicai-india-4242.web.app)** link.
