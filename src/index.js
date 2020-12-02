/**
 * MIT License
 * Copyright (c) 2020 Alessandro D'Antoni
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// Require @react-native-async-storage/async-storage to interact with AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Utility function to check if is JSON format
 * Return if is JSON string or not
 * @param {string} str
 */
export const isJSON = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

/**
 * Utility wrapper to interact with AsyncStorage in React Native projects
 */
export default class AsyncStorageAdapter {
  /**
   * @param {string} GlobalKeyName Required name for global key to store data e.g. `@MyAppName`
   */
  constructor(GlobalKeyName = null) {
    if (GlobalKeyName === null) throw new Error("`GlobalKeyName` is required in order to set keys in storage.");
    this.GLOBAL_KEY_NAME = GlobalKeyName;
  }

  /**
   * @param {string} key Set key to identify your data in storage
   * @param {any} value Value to save
   * @description Store data from async storage
   * @returns Boolean result of the save process
   */
  storeData = async (key, value) => {
    const parseToJson = typeof value === "object" || Array.isArray(value);
    try {
      const parsedValue = parseToJson ? JSON.stringify(value) : value;
      await AsyncStorage.setItem(`${this.GLOBAL_KEY_NAME}:${key}`, parsedValue);
    } catch (err) {
      // error saving value
      console.error(err);
      return false;
    }
    return true;
  }

  /**
   * @param {object} keyValues { key: value } to save in async storage
   * @description Take an object with multiple { key: value } pairing to save in async storage
   * @returns Boolean result of the save process
   */
  storeMultipleData = async (keyValues) => {
    const savePair = Object.keys(keyValues).map(key => {
      const value = keyValues[key];
      const parsedValue = parseToJson ? JSON.stringify(value) : value;
      return [key, parsedValue];
    });
    try {
      await AsyncStorage.multiSet(savePair)
    } catch (err) {
      //save error
      console.error(err)
      return false;
    }
    return true;
  }

  /**
   * @param {string} key Key to identify data from storage
   * @description Get data from async storage
   * @returns Data retrieved if key match
   */
  getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`${this.GLOBAL_KEY_NAME}:${key}`);
      return jsonValue != null && isJSON(jsonValue) ? JSON.parse(jsonValue) : null;
    } catch (err) {
      // error reading value
      console.error(err);
      return false;
    }
  }

  /**
   * @param {array} keys Key to identify data from storage
   * @description Get multiple data from async storage
   * @returns Object containing data retrieved if keys match
   */
  getMultipleData = async (keys) => {
    let values;
    let parsedValue = {};
    const parsedKeys = keys.map(key => `${this.GLOBAL_KEY_NAME}:${key}`);
    try {
      values = await AsyncStorage.multiGet(parsedKeys);
    } catch (err) {
      // read error
      console.error(err);
      return false;
    }
    values.forEach(el => { parsedValue[el[0].replace(`${this.GLOBAL_KEY_NAME}:`, "")] = isJSON(el[1]) ? JSON.parse(el[1]) : el[1]; });
    return parsedValue;
  }

  /**
   * @description Get all data from async storage
   * @returns Object containing all data in storage
   */
  getAllData = async () => {
    let values;
    let parsedValue = {};
    try {
      const allKeys = await getAllKeys();
      values = await getMultipleData(allKeys.map(key => key.replace(`${this.GLOBAL_KEY_NAME}:`, ""))); // Adapt keyname to logic
    } catch (err) {
      // read error
      console.error(err);
      return false;
    }
    Object.keys(values).forEach(key => { parsedValue[key.replace(`${this.GLOBAL_KEY_NAME}:`, "")] = isJSON(values[key]) ? JSON.parse(values[key]) : values[key]; });
    return parsedValue;
  }

  /**
   * @param {string} key Key to identify data from storage
   * @description Remove data from async storage
   * @return Boolean result of the remove process
   */
  removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(`${this.GLOBAL_KEY_NAME}:${key}`);
    } catch (err) {
      // error removing data
      console.error(err);
      return false;
    }
    return true;
  }

  /**
   * @param {array} keys Keys to identify data from storage
   * @description Remove multiple data from async storage
   * @return Boolean result of the remove process
   */
  removeMultipleData = async (keys) => {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (err) {
      // remove error
      console.error(err);
      return false;
    }
    return true;
  }

  /**
   * @description Get array of all keys from async storage
   * @returns Array of all keys from async storage
   */
  getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (err) {
      // read key error
      console.error(err);
      return false;
    }
    return keys
  }

  /**
   * @description Clear all data from async storage
   * @return Boolean result of the remove process
   */
  clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch (err) {
      // clear error
      console.error(err);
      return false;
    }
    return true;
  }

}
