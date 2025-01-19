interface ChatPromptMetatdata {
    action: string;
    reference: string;
}

export interface ChatPrompt {
    id: string;
    role: string;
    text: string;
    metadata: ChatPromptMetatdata | null;
}