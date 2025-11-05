import axios from "axios";
import { ChatMessage } from "../../model/ai/ai-model.js";

export const AIWork = async (req, res) => {
    try {
        const { userQuery } = req.body;
        const userId = req.userId
        const { chatId } = req.params

        if (!userQuery) {
            return res.status(400).json({ message: "Missing user query" });
        }

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized - Missing userId" });
        }

        // save user message
        await ChatMessage.create({
            chatId,
            userId,
            sender: 'user',
            text: userQuery
        })

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: userQuery
                            },
                        ],
                    },
                ],
            }
        );

        const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!aiText) {
            return res.status(404).json({ message: "No AI-generated response" });
        }

        // save ai message
        await ChatMessage.create({
            chatId,
            userId,
            sender: 'ai',
            text: aiText
        })

        res.status(200).json({ aiMessage: aiText });
    } catch (error) {
        console.error("AIWork Error:", error.response?.data || error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getChatMessage = async (req, res) => {
    try {
        const userId = req.userId
        const { chatId } = req.params


        const chatMessage = await ChatMessage.find({ chatId, userId })

        if (!chatMessage) {
            return res.status(404).json({ message: "chat not found" })
        }

        res.status(200).json(chatMessage)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });

    }
}