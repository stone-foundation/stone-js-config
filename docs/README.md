**Config Documentation v0.0.34**

***

# Stone.js: Config

[![npm](https://img.shields.io/npm/l/@stone-js/config)](https://opensource.org/licenses/Apache-2.0)
[![npm](https://img.shields.io/npm/v/@stone-js/config)](https://www.npmjs.com/package/@stone-js/config)
[![npm](https://img.shields.io/npm/dm/@stone-js/config)](https://www.npmjs.com/package/@stone-js/config)
![Maintenance](https://img.shields.io/maintenance/yes/2025)
[![Publish Package to npmjs](https://github.com/stonemjs/config/actions/workflows/release.yml/badge.svg)](https://github.com/stonemjs/config/actions/workflows/release.yml)
[![Dependabot Status](https://img.shields.io/badge/Dependabot-enabled-brightgreen.svg?logo=dependabot)](https://github.com/stonemjs/config/network/updates)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Fluent and simple API with deep dot access to manage configurations in any JavaScript project.

---

## Synopsis

`@stone-js/config` is a versatile configuration management library that supports both vanilla JavaScript and TypeScript. It allows developers to easily manage application settings with features like nested configuration access, default value management, and proxy-based custom behavior for configuration properties.

## Installation

The `Config` library is available from the [`npm registry`](https://www.npmjs.com/) and can be installed as follows:

```bash
npm i @stone-js/config
```

Yarn:

```bash
yarn add @stone-js/config
```

PNPM:

```bash
pnpm add @stone-js/config
```

> [!NOTE]
> This package is Pure ESM. If you are unfamiliar with what that means or how to handle it in your project, 
> please refer to [`this guide on Pure ESM packages`](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

Make sure your project setup is compatible with ESM. This might involve updating your `package.json` or using certain bundler configurations.

The `Config` module can only be imported via ESM import syntax:

```typescript
import { Config } from '@stone-js/config';
```

## Getting Started

The `Config` library is designed to simplify configuration management in JavaScript and TypeScript projects. The library provides a `Config` class that allows you to create, access, modify, and clear configuration values, while also providing utility methods for managing defaults and nested properties.

The library is compatible with both vanilla JavaScript and TypeScript, providing strong type safety when used in TypeScript projects.

## Usage

### Importing the Library
To use the `Config` library, import the `Config` class from the installed package:

```typescript
import { Config } from '@stone-js/config';
```

### Creating a Config Instance
You can create a `Config` instance with an initial set of configuration values using the `Config.create()` method:

```typescript
import { Config } from '@stone-js/config';

const config = Config.create({
  appName: 'MyApp',
  settings: {
    theme: 'dark',
    notifications: true
  }
});
```

### Accessing Configuration Values
You can access configuration values using the `get` method. The `get` method also allows you to specify a fallback value if the key does not exist:

```typescript
console.log(config.get('appName')); // Outputs: 'MyApp'
console.log(config.get('settings.theme')); // Outputs: 'dark'
console.log(config.get('settings.language', 'en')); // Outputs: 'en' (fallback value)
```

### Setting Configuration Values
You can add or update configuration values using the `set` method:

```typescript
config.set('settings.theme', 'light');
console.log(config.get('settings.theme')); // Outputs: 'light'
```

You can also set multiple values at once by passing an object:

```typescript
config.set({
  'settings.language': 'fr',
  'settings.notifications': false
});
console.log(config.get('settings.language')); // Outputs: 'fr'
```

### Checking for Configuration Values
To check if a particular configuration value exists, use the `has` method:

```typescript
console.log(config.has('settings.theme')); // Outputs: true
console.log(config.has('settings.nonExistentKey')); // Outputs: false
```

### Adding Configuration Values with Merge
The `add` method allows you to add configuration values. If the key already exists and both values are objects, they will be merged:

```typescript
config.add('settings', { notifications: false });
console.log(config.get('settings.notifications')); // Outputs: false
```

### Getting the First Match Configuration Value
The `firstMatch` method allows you to get the value of the first existing key from an array of keys:

```typescript
const value = config.firstMatch(['nonExistentKey', 'settings.theme'], 'defaultTheme');
console.log(value); // Outputs: 'light'
```

### Getting Multiple Configuration Values
The `getMany` method allows you to get multiple configuration values at once:

```typescript
const values = config.getMany(['appName', 'settings.theme']);
console.log(values); // Outputs: { appName: 'MyApp', 'settings.theme': 'light' }
```

### Clearing Configuration
You can clear all configuration values using the `clear` method:

```typescript
config.clear();
console.log(config.all()); // Outputs: {}
```

### Working with Nested Properties
The `Config` class supports accessing and setting nested properties. You can use dot-notation strings to manage nested properties effectively:

```typescript
console.log(config.get('settings.theme')); // Outputs: 'light'
config.set('settings.newFeature.enabled', true);
console.log(config.get('settings.newFeature.enabled')); // Outputs: true
```

## Summary
The `@stone-js/config` library is a powerful and flexible solution for managing configuration in JavaScript and TypeScript applications. With support for nested properties, default value handling, and proxy-based custom behaviors, it provides a robust toolset for configuration management.

Key Features:
- **Simple API**: Easy to use methods for creating, accessing, and modifying configuration values.
- **TypeScript Compatibility**: Full TypeScript support for type safety and better development experience.
- **Nested Properties**: Seamless handling of nested configuration values.
- **Default Value Management**: Easily set and manage default values for configuration keys.

Start using `@stone-js/config` to simplify your application's configuration management and bring flexibility and robustness to your codebase.

## API documentation

- [API](https://github.com/stonemjs/config/blob/main/docs/modules.md)

## Contributing

See [Contributing Guide](https://github.com/stonemjs/config/blob/main/CONTRIBUTING.md).

## Credits
- [Lodash](https://github.com/lodash/lodash)
- [Laravel Config](https://github.com/laravel/framework/blob/10.x/src/Illuminate/Config/Repository.php)
