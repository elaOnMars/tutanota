"use strict";

tutao.provide('tutao.crypto.AesInterface');

/**
 * This Interface provides an abstraction of the AES cryptographic implementation.
 * A concrete instance is bound by the Locator.
 * @interface
 */
tutao.crypto.AesInterface = function() {};

tutao.crypto.AesInterface.IV_BYTE_LENGTH = 16;
tutao.crypto.AesInterface.IV_BIT_LENGTH = tutao.crypto.AesInterface.IV_BYTE_LENGTH * 8;
tutao.crypto.AesInterface.TAG_BYTE_LENGTH = 16;
tutao.crypto.AesInterface.TAG_BIT_LENGTH = tutao.crypto.AesInterface.TAG_BYTE_LENGTH * 8;

/**
 * Create a random 128 bit symmetric AES key.
 * @return {bitArray} The key.
 */
tutao.crypto.AesInterface.prototype.generateRandomKey = function() {};

/**
 * Converts the given key to a hex string.
 * @param {bitArray} key The key.
 * @return {String} The hex string representation of the key.
 */
tutao.crypto.AesInterface.prototype.keyToHex = function(key) {};

/**
 * Converts the given key to a base64 coded string.
 * @param {bitArray} key The key.
 * @return {String} The base64 coded string representation of the key.
 */
tutao.crypto.AesInterface.prototype.keyToBase64 = function(key) {};

/**
 * Converts the given hex string to a key.
 * @param {String} hex The hex string representation of the key.
 * @return {bitArray} The key.
 * @throws {tutao.crypto.CryptoError} If the conversion fails.
 */
tutao.crypto.AesInterface.prototype.hexToKey = function(hex) {};

/**
 * Converts the given base64 coded string to a key.
 * @param {String} base64 The base64 coded string representation of the key.
 * @return {bitArray} The key.
 * @throws {tutao.crypto.CryptoError} If the conversion fails.
 */
tutao.crypto.AesInterface.prototype.base64ToKey = function(base64) {};

/**
 * Encrypts an utf8 coded string with AES.
 * @param {bitArray} key The key to use for the encryption.
 * @param {String} utf8 Utf8 coded data.
 * @return {String} The encrypted text, base64 coded.
 * @throws {tutao.crypto.CryptoError} If the encryption fails.
 */
tutao.crypto.AesInterface.prototype.encryptUtf8 = function(key, utf8) {};

/**
 * Decrypts base64 coded binary data with AES to a utf8 string.
 * @param {bitArray} key The key to use for the decryption.
 * @param {String} base64 A base64 coded string that was encrypted with the same key before.
 * @return {String} The decrypted text, utf8 coded.
 * @throws {tutao.crypto.CryptoError} If the decryption fails.
 */
tutao.crypto.AesInterface.prototype.decryptUtf8 = function(key, base64) {};

/**
 * Encrypts an utf8 coded string with AES with a static initialization vector for search indices.
 * @param {bitArray} key The key to use for the encryption.
 * @param {String} utf8 Utf8 coded data.
 * @return {String} The encrypted text, base64 coded.
 * @throws {tutao.crypto.CryptoError} If the encryption fails.
 */
tutao.crypto.AesInterface.prototype.encryptUtf8Index = function(key, utf8) {};

/**
 * Decrypts base64 coded binary data with AES to a utf8 string with a static initialization vector for search indices.
 * @param {bitArray} key The key to use for the decryption.
 * @param {String} base64 A base64 coded string that was encrypted with the same key before.
 * @return {String} The decrypted text, utf8 coded.
 * @throws {tutao.crypto.CryptoError} If the decryption fails.
 */
tutao.crypto.AesInterface.prototype.decryptUtf8Index = function(key, base64) {};


/**
 * Encrypts bytes coded as base64 with AES.
 * @param {bitArray} key The key to use for the encryption.
 * @param {String} base64 Bas64 coded bytes.
 * @return {String} The encrypted bytes, base64 coded.
 * @throws {tutao.crypto.CryptoError} If the encryption fails.
 */
tutao.crypto.AesInterface.prototype.encryptBytes = function(key, base64) {};

/**
 * Decrypts base64 coded binary data with AES to bytes.
 * @param {bitArray} key The key to use for the decryption.
 * @param {String} base64 A base64 coded string that represents the encrypted bytes that weres encrypted with the same key before.
 * @return {String} The decrypted bytes, base64 coded.
 * @throws {tutao.crypto.CryptoError} If the decryption fails.
 */
tutao.crypto.AesInterface.prototype.decryptBytes = function(key, base64) {};

/**
 * Encrypts a hex coded key with AES.
 * @param {bitArray} key The key to use for the encryption.
 * @param {bitArray} keyToEncrypt The key that shall be encrypted.
 * @return {String} The encrypted key, base64 coded.
 * @throws {tutao.crypto.CryptoError} If the encryption fails.
 */
tutao.crypto.AesInterface.prototype.encryptKey = function(key, keyToEncrypt) {};

/**
 * Decrypts a base64 coded key with AES.
 * @param {bitArray} key The key to use for the decryption.
 * @param {String} base64 The key that shall be decrypted, base64 coded.
 * @return {bitArray} The decrypted key.
 * @throws {tutao.crypto.CryptoError} If the decryption fails.
 */
tutao.crypto.AesInterface.prototype.decryptKey = function(key, base64) {};

/**
 * Encrypts a hex coded RSA private key with AES.
 * @param {bitArray} key The key to use for the encryption.
 * @param {String} hexRsaPrivateKey The key that shall be encrypted, hex coded.
 * @return {String} The encrypted key, base64 coded.
 * @throws {tutao.crypto.CryptoError} If the encryption fails.
 */
tutao.crypto.AesInterface.prototype.encryptPrivateRsaKey = function(key, hexRsaPrivateKey) {};

/**
 * Decrypts an encrypted private RSA key with AES.
 * @param {bitArray} key The key to use for the decryption.
 * @param {String} base64 The key that shall be decrypted, base64 coded.
 * @return {String} The decrypted private RSA key, hex coded.
 * @throws {tutao.crypto.CryptoError} If the decryption fails.
 */
tutao.crypto.AesInterface.prototype.decryptPrivateRsaKey = function(key, base64) {};
