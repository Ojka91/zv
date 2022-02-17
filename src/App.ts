import "module-alias/register";

import { handler } from '@App/Bootstrapper';

(async () => {
  console.log('Setting up server...');
  const App = await handler();
  
  const port = parseInt(process.env.PORT) || 80;
  console.log(`App serving on port ${port}`);
  App.listen(port);
})();
