#!/usr/bin/env node

async function validate(name) {
  console.group(`Validating ${name}`);

  const checks = new Map();

  checks.set(`require('${name}');`, () => {
    require(name);
  });

  checks.set(`import('${name}');`, async () => {
    await import(name);
  });

  for (const [name, fn] of checks) {
    try {
      await fn();

      console.log(`✅ ${name}`);
    } catch (error) {
      console.log(`❌ ${name}`);
      console.error(error);

      process.exitCode = 1;
    }
  }

  console.groupEnd();
}

if (typeof process.env.npm_package_name === 'string') {
  validate(process.env.npm_package_name).catch(error => console.error(error));
} else {
  console.error('Cannot find npm package name in your environment.');
  console.info('Run this script from your package.json scripts block.');
  console.info('Example: npm run validate');
}
