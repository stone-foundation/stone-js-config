import deepmerge from 'deepmerge'
import { Proxiable } from './Proxiable'
import { get as lodashGet, set as lodashSet, has as lodashHas, isObjectLike } from 'lodash-es'

/**
 * Class representing a Config.
 *
 * @author Mr. Stone <evensstone@gmail.com>
 *
 * @template TObject
 */
export class Config<TObject extends object = Record<PropertyKey, unknown>> extends Proxiable {
  private items: TObject

  /**
   * Create a Config.
   *
   * @param items - Initial configuration items.
   * @returns A new Config instance.
   */
  static create<TObject extends object = Record<PropertyKey, unknown>>(items?: TObject): Config<TObject> {
    return new this(items)
  }

  /**
   * Create a Config.
   *
   * @param items - Initial configuration items.
   */
  protected constructor (items?: any) {
    super({
      get: (target: Config<TObject>, prop: PropertyKey, receiver: unknown): unknown => {
        if (Reflect.has(target, prop)) {
          return Reflect.get(target, prop, receiver)
        } else {
          return target.get(prop)
        }
      }
    })

    this.items = { ...items }
  }

  /**
   * Get the specified configuration value.
   *
   * @param key - The key or keys to retrieve from the configuration.
   * @returns The configuration value.
   */
  public get<TReturn = unknown>(key: PropertyKey): TReturn | undefined

  /**
   * Get the specified configuration value.
   *
   * @param key - The key or keys to retrieve from the configuration.
   * @param fallback - The fallback value if the key does not exist.
   * @returns The configuration value.
   */
  public get<TReturn = unknown>(key: PropertyKey, fallback: TReturn): TReturn

  /**
   * Get the specified configuration value.
   *
   * @param key - The key or keys to retrieve from the configuration.
   * @param fallback - The fallback value if the key does not exist.
   * @returns The configuration value.
   */
  public get<TReturn = unknown>(key: PropertyKey, fallback?: TReturn): TReturn | undefined {
    return lodashGet(this.items, key, fallback)
  }

  /**
   * Get the first match configuration value.
   *
   * @param keys - An array of keys to check.
   * @returns The first matching configuration value.
   */
  public firstMatch<TReturn = unknown>(keys: PropertyKey[]): TReturn | undefined

  /**
   * Get the first match configuration value.
   *
   * @param keys - An array of keys to check.
   * @param fallback - The fallback value if no key matches.
   * @returns The first matching configuration value.
   */
  public firstMatch<TReturn = unknown>(keys: PropertyKey[], fallback: TReturn): TReturn

  /**
   * Get the first match configuration value.
   *
   * @param keys - An array of keys to check.
   * @param fallback - The fallback value if no key matches.
   * @returns The first matching configuration value.
   */
  public firstMatch<TReturn = unknown>(keys: PropertyKey[], fallback?: TReturn): TReturn | undefined {
    const firstKey = keys.find((v) => this.has(v)) ?? []
    return lodashGet(this.items, firstKey, fallback)
  }

  /**
   * Get many configuration values.
   *
   * @param keys - The keys to retrieve from the configuration.
   * @returns An object containing the requested configuration values.
   */
  public getMany<TReturn = Record<PropertyKey, unknown>>(keys: PropertyKey[] | Record<PropertyKey, unknown>): TReturn {
    const defaults: any = {}
    const entries: Array<[PropertyKey, unknown]> = Array.isArray(keys) ? keys.map((v) => [v, undefined]) : Object.entries(keys)
    return entries.reduce((results: TReturn, [key, fallback]) => ({ ...results, [key]: lodashGet(this.items, key, fallback) }), defaults)
  }

  /**
   * Determine if the given configuration value exists.
   *
   * @param key - The key or keys to check.
   * @returns True if the key exists, false otherwise.
   */
  public has (key: PropertyKey | PropertyKey[]): boolean {
    return lodashHas(this.items, key)
  }

  /**
   * Set a given configuration value.
   *
   * @param key - The key or keys to set in the configuration.
   * @param value - The value to set.
   * @returns The current Config instance.
   */
  public set<TValue>(key: PropertyKey | PropertyKey[] | Record<PropertyKey, TValue>, value?: TValue): this {
    const entries: Array<[PropertyKey | PropertyKey[], unknown]> = !Array.isArray(key) && typeof key === 'object' ? Object.entries(key) : [[key, value]]

    for (const [name, val] of entries) {
      lodashSet(this.items, name, val)
    }

    return this
  }

  /**
   * Allows providers to define the default config for a module.
   *
   * @param key - The key or keys to set as defaults.
   * @param value - The value to set as default.
   * @returns The current Config instance.
   */
  public add<TValue>(key: PropertyKey, value: TValue): this {
    const items = this.get(key)

    if (Array.isArray(items)) {
      return this.set(key, items.concat(value))
    } else if (isObjectLike(items) && isObjectLike(value)) {
      return this.set(key, deepmerge(items as Record<PropertyKey, unknown>, value as Record<PropertyKey, unknown>))
    }

    return this.set(key, value)
  }

  /**
   * Get all of the configuration items as a literal object.
   *
   * @returns All configuration items.
   */
  public all (): TObject {
    return this.items
  }

  /**
   * Clear all of the configuration items.
   *
   * @returns The current Config instance.
   */
  public clear (): this {
    this.items = Object.create(null)
    return this
  }
}
