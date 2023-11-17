import { config } from "@/config/prod.config";

export const fetchQuote = async () => {
    try {
        const fetchedQuote = await fetch(config.api.quote);
        return await fetchedQuote.json();
    } catch (error) {
        throw error;
    }
}