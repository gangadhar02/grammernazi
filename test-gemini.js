import { correctGrammar } from './src/lib/gemini.js';

async function test() {
    const text = "Me and him went to the store. It was fun—really fun.";
    console.log("Original:", text);
    try {
        const corrected = await correctGrammar(text);
        console.log("Corrected:", corrected);

        if (corrected.includes("—")) {
            console.error("FAILED: Output contains em-dash!");
        } else if (corrected.startsWith('"') || corrected.endsWith('"')) {
            console.error("FAILED: Output contains quotes!");
        } else {
            console.log("PASSED: No em-dashes and no quotes.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

test();
