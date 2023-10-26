/* eslint-disable no-unused-vars */
import { useState } from 'react';
import coreClient from '../services/coreApi';
export function useRewriteData() {
    const [isLoading, setIsLoading] = useState(false);
    const [typingEffect, setTypingEffect] = useState(null);
    const [showTypinEffectBtn, setShowTypinEffectBtn] = useState(false);
    const [apiRewriteBulletPoints, setApiBulletPoints] = useState();

    const API_URL = process.env.REACT_APP_API_URL;
    const config = {};
    async function rewriteData(payload, highlightedText, updateTextContent) {

        try {
            setIsLoading(true);
            const { status, data } = await coreClient.post(`${API_URL}/rewrite`, payload, config);
            const generatedText = data.result;
            setApiBulletPoints(data?.result?.split('\n'));
            updateTextContent(highlightedText, generatedText);
            let i = 0;
            const typingEffect = setInterval(() => {
                // setFormData({
                //   ...formData,
                //   skills: formData.skills.replace(highlightedText, generatedText.slice(0, i) + '|')
                // });
                updateTextContent(highlightedText, generatedText, i);
                setShowTypinEffectBtn(!showTypinEffectBtn);
                i++;
                if (i > generatedText.length) {
                    clearInterval(typingEffect);
                    updateTextContent(highlightedText, generatedText, i);
                }
            }, 50);
            setTypingEffect(typingEffect);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    function stopTypingEffect() {
        clearInterval(typingEffect);
    }

    return { rewriteData, isLoading, stopTypingEffect, showTypinEffectBtn, apiRewriteBulletPoints };
}

