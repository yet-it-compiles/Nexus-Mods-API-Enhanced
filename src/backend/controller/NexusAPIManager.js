/**
 * @file NexusAPIManager.js
 *
 * @version 0.1.0
 *
 * @summary Client for interacting with Nexus Mods Public API.
 *
 * @description Provides an interface for interacting with the Nexus Mods API,
 * handling errors, and managing API requests efficiently.
 *
 * @requires axios - A promise-based HTTP client for Node.js and browsers, used
 * for making API requests.
 *
 * @see {@link https://tinyurl.com/NexusPublicAPI} - Official Nexus Mods Public
 * @see {@link https://next.nexusmods.com/settings/api-keys} - Link to official
 * Nexus Public API key generation.
 *
 * @exports NexusAPIManager
 */
import axios from 'axios';

dotenv.config();

export default class NexusAPIManager {
    static #instance;
    static #endpoints = Object.freeze({
        isValidUser: '/users/validate.json',
        fetchModCatalogue: '/games.json',
        fetchUnapprovedGames: '/games.json?include_unapproved=true',
        fetchModMetaData: (gameID, modID) =>
            `/games/${gameID}/mods/${modID}.json`,
    });

    static #client;

    static #validateConfiguration({ apiKey, baseURL }) {
        if (!baseURL) {
            throw new Error("ERROR: Missing required configuration");
        }
    }
    constructor({ apiKey = process.env.NEXUS_API_KEY, baseURL = process.env.NEXUS_API_BASE_URL } = {}) {
        NexusAPIManager.#validateConfiguration({ apiKey, baseURL });

        if (NexusAPIManager.#instance) {
            return NexusAPIManager.#instance;
        }

        NexusAPIManager.#client = axios.create({
            baseURL,
            headers: {
                accept: 'application/json',
                apikey: apiKey,
            },
            timeout: process.env.RETRY_DELAY,
        });

        NexusAPIManager.#instance = this;
    }

    static async #getRequest(endpoint) {
        try {
            console.log('Making Request:', {
                endpoint,
                clientExists: !!NexusAPIManager.#client,
                fullURL: `${NexusAPIManager.#client.defaults.baseURL}${endpoint}`,
            });
            const response = await NexusAPIManager.#client.get(endpoint);
            return response.data;
        } catch (error) {
            console.error('Request Error:', {
                message: error.message,
                code: error.code,
                endpoint,
                config: NexusAPIManager.#client?.defaults,
            });
            throw error;
        }
    }

    static async getSupportedGames() {
        return NexusAPIManager.#getRequest(NexusAPIManager.#endpoints.fetchModCatalogue);
    }

    static async getUnsupportedGames() {
        return NexusAPIManager.#getRequest(NexusAPIManager.#endpoints.fetchUnapprovedGames);
    }

    static async getModData(gameID, modID) {
        return NexusAPIManager.#getRequest(
            NexusAPIManager.#endpoints.fetchModMetaData(gameID, modID),
        );
    }
}
