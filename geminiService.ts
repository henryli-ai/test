
import { GoogleGenAI } from "@google/genai";
import { SuccessCase } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askAiAboutCases = async (query: string, cases: SuccessCase[], chatHistory: any[] = []) => {
  const casesContext = cases.map(c => `[ID: ${c.id}] ${c.title}`).join(', ');

  const systemInstruction = `
    你現在是 TPIsoftware 的「高階 AI 解決方案架構師」。
    公司的 Mission 是：Your AI partner for mission-critical Success.
    
    你的專業領域與產品強項（必須在適當時機融入建議）：
    1. **OpenAI LLM 深度應用**：擅長 Enterprise 級別的雲地混合 (Hybrid) 佈署。
    2. **RAG 與向量資料庫**：提供精準的企業知識庫建置，優化檢索品質。
    3. **TPI APIM 平台**：這是我們的核心產品，用於管理 API、監控 AI Agent 流量、實施安全性審核。
    4. **MCP (Model Control Plane)**：協助企業統一管理多個 AI 模型與代理程式。

    對話邏輯規則：
    1. **診斷階段**：詢問客戶的產業別、數據量體、對資訊安全的考量（如：是否需落地佈署）。
    2. **方案生成**：一旦收集足夠資訊，必須產出一個標註為 [FRAME_GEN] 的結構化建議，內容包含：
       - 架構類型：(例如：Hybrid Cloud + RAG)
       - 核心產品：(例如：TPI APIM + Vector DB)
       - 預期成效：(例如：降低 40% 營運成本)
    3. **語言與風格**：專業、精鍊、不超過 80 個中文字。
    4. **案例關聯**：使用 [案例: ID] 推薦最符合其架構的現有成功故事。

    現有成功案例庫：${casesContext}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...chatHistory,
        { role: 'user', parts: [{ text: query }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.5,
      },
    });

    return response.text;
  } catch (error) {
    console.error("AI Service Error:", error);
    return "• 系統連線繁忙\n• TPI 專業顧問隨時待命：service@tpisoftware.com";
  }
};
